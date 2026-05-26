import React, { useEffect, useState } from 'react';
import { FaClock, FaComment, FaPaperPlane, FaEye, FaStar, FaDownload, FaShare, FaPlay, FaLock, FaChartLine, FaComments, FaCheck, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BrowserMockup from '../client-home/components/BroserMockup';
import { getProjectById, markProjectCompleted, markProjectHandoff } from '@/lib/requests/ProjectRequest';
import { useParams } from 'react-router-dom';
import { store } from '@/store';
import { ProjectOverviewSkeleton } from '@/dashboards/designer-dashboard/components/skeletons';
import {
  PIPELINE_ORDER,
  STATUS_TO_PROGRESS,
  STAGE_LABEL,
  getStatusLabel,
  deriveStageStatus,
  type ApiStatus,
} from '@/lib/config/projectStatus';

// ─── Stages template ──────────────────────────────────────────────────────────

const STAGES_TEMPLATE = PIPELINE_ORDER.map(id => ({
  id,
  name: STAGE_LABEL[id],
  description: {
    intake:               'Requirements',
    scraping:             'Best sites URL',
    swiping:              'Design exploration',
    embedded:             'Embedding complete',
    composing:            'Generate with idea',
    refining:             'Layout refinement',
    revisions:            'Client reviewing',
    'designer-feedback':  'Designer review',
    'platform-feedback':  'Platform review',
    completed:            'Client feedback',
    handoff:              'Final delivery',
  }[id] ?? '',
}));

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stage {
  id: string;
  name: string;
  status: 'pending' | 'current' | 'completed';
  description: string;
}

interface FeedbackItem {
  id: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'resolved';
  priority: 'low' | 'medium' | 'high';
}

interface ProjectOverviewUI {
  id: string;
  title: string;
  category: string;
  designer: string;
  designerImage: string;
  progress: number;
  apiStatus: string | null;
  currentStage: string;
  feedbackCount: number;
  createdAt: string;
  description: string;
  tags: string[];
  designerRating: number;
  completedStages: number;
  totalStages: number;
  stages: Stage[];
  feedback: FeedbackItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

const ProjectOverview: React.FC = () => {
  const { id } = useParams();
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [project, setProject] = useState<ProjectOverviewUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [actionLoading, setActionLoading] = useState<'complete' | 'handoff' | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchProject = async (projectId: string) => {
    setLoading(true);
    setFetchError(false);
    try {
      const response = await getProjectById({ id: projectId });
      const raw = response.data;

      const apiStatus: string | null = raw.status ?? null;
      const progress = apiStatus ? (STATUS_TO_PROGRESS[apiStatus as ApiStatus] ?? 0) : 0;
      const currentIdx = apiStatus ? PIPELINE_ORDER.indexOf(apiStatus as ApiStatus) : -1;
      const completedStages = currentIdx > 0 ? currentIdx : 0;

      setProject({
        id: raw.id,
        title: raw.project_name || 'Untitled Project',
        category: raw.project_type || 'General',
        designer: raw.designer_email,
        designerImage: '/images/avatar.png',
        progress,
        apiStatus,
        currentStage: apiStatus ?? 'Not started',
        feedbackCount: 0,
        createdAt: raw.last_updated,
        description: raw.business_description ?? '',
        tags: [raw.project_type, raw.budget, raw.not_ready_to_share ? 'private' : 'shared'].filter(Boolean),
        designerRating: 5.0,
        completedStages,
        totalStages: STAGES_TEMPLATE.length,
        stages: STAGES_TEMPLATE.map(s => ({
          ...s,
          status: deriveStageStatus(s.id, apiStatus),
        })),
        feedback: [],
      });
    } catch {
      setFetchError(true);
    }
    setLoading(false);
  };

  useEffect(() => { if (id) fetchProject(id); }, [id]);

  const handleMarkComplete = async () => {
    if (!project) return;
    const designer_email = store.getState().auth.user.email!;
    setActionLoading('complete');
    setActionError(null);
    try {
      await markProjectCompleted(project.id, designer_email);
      await fetchProject(project.id);
    } catch {
      setActionError('Failed to mark project as complete. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkHandoff = async () => {
    if (!project) return;
    const designer_email = store.getState().auth.user.email!;
    setActionLoading('handoff');
    setActionError(null);
    try {
      await markProjectHandoff(project.id, designer_email);
      await fetchProject(project.id);
    } catch {
      setActionError('Failed to confirm handoff. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) return;
    setIsSubmittingFeedback(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFeedbackText('');
    setIsSubmittingFeedback(false);
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FaCheck className="text-white text-icon-sm" />;
      case 'current': return (
        <div className="relative flex items-center justify-center">
          <motion.div className="w-3 h-3 bg-white rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      );
      default: return <FaLock className="text-white text-icon-sm opacity-60" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
      medium: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20',
      low: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getStatusBadge = (status: string) =>
    status === 'resolved'
      ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
      : 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20';

  if (loading) return <ProjectOverviewSkeleton />;
  if (fetchError) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-text-secondary text-para-lg">
        Failed to load project. Please refresh the page.
      </p>
    </div>
  );
  if (!project) return <ProjectOverviewSkeleton />;

  return (
    <div className="min-h-screen">
      {actionError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-lg py-sm rounded-xl bg-background-primary border border-border-default text-text-error text-para-sm shadow-md cursor-pointer"
          onClick={() => setActionError(null)}
        >
          {actionError}
        </motion.div>
      )}

      {/* Hero Section */}
      <div className="bg-background-primary">
        <div className="container mx-auto px-md py-xl sm:py-2xl lg:py-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg items-center">
            <div className="lg:col-span-2 space-y-lg">
              <div className="flex items-center gap-md">
                <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="px-md py-xs bg-accent-subtle text-accent-default rounded-full text-para-sm font-medium">
                  {project.category}
                </motion.span>
                <div className="flex items-center gap-xs text-text-secondary">
                  <FaClock className="text-icon-sm" />
                  <span className="text-para-sm">Started {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-h3-sm lg:text-h2-md font-bold text-text-primary leading-tight">
                {project.title}
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-md">
                {project.tags.map((tag, index) => (
                  <span key={index} className="px-sm py-xs bg-background-muted text-text-secondary text-para-sm rounded-lg border border-border-muted">{tag}</span>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-md">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-xs px-md py-sm bg-accent-default hover:bg-accent-hover text-accent-foreground rounded-xl transition-all duration-200 text-btn-md font-medium shadow-sm">
                  <FaPlay className="text-icon-sm" />Preview Project
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-xs px-md py-sm bg-background-secondary hover:bg-background-muted text-text-primary rounded-xl transition-all duration-200 text-btn-md border border-border-default shadow-sm">
                  <FaDownload className="text-icon-sm" />Download Files
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-xs px-md py-sm text-text-secondary hover:text-text-primary rounded-xl transition-all duration-200 text-btn-md hover:bg-background-muted">
                  <FaShare className="text-icon-sm" />Share
                </motion.button>
              </motion.div>
            </div>

            {/* Designer Card */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-background-secondary rounded-2xl p-xl border border-border-default shadow-sm">
              <div className="flex items-center gap-md mb-lg">
                <div className="relative">
                  <img src={project.designerImage} alt={project.designer} className="w-16 h-16 rounded-xl object-cover border-2 border-background-primary" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-background-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-para-lg font-semibold text-text-primary truncate">{project.designer}</h3>
                  <div className="flex items-center gap-xs">
                    <FaStar className="text-icon-sm text-amber-500 flex-shrink-0" />
                    <span className="text-para-sm text-text-secondary font-medium">{project.designerRating}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-xs text-center mb-lg">
                <div className="min-w-0">
                  <div className="text-h6-sm font-bold text-text-primary truncate">{project.progress}%</div>
                  <div className="text-para-xs text-text-tertiary">Progress</div>
                </div>
                <div className="min-w-0">
                  <div className="text-h6-sm font-bold text-text-primary truncate">{project.completedStages}</div>
                  <div className="text-para-xs text-text-tertiary">Stages Done</div>
                </div>
                <div className="min-w-0">
                  <div className="text-para-xs sm:text-h6-sm font-bold text-text-primary break-words leading-tight">
                    {getStatusLabel(project.apiStatus)}
                  </div>
                  <div className="text-para-xs text-text-tertiary">Status</div>
                </div>
              </div>

              <div className="pt-md border-t border-border-default">
                {project.apiStatus === 'handoff' ? (
                  <div className="w-full flex items-center justify-center gap-xs px-md py-sm rounded-xl bg-background-muted text-text-tertiary text-btn-sm font-medium">
                    <FaCheck className="text-icon-sm" />Delivered
                  </div>
                ) : project.apiStatus === 'completed' ? (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleMarkHandoff} disabled={actionLoading === 'handoff'} className="w-full flex items-center justify-center gap-xs px-md py-sm rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-btn-sm font-medium transition-all duration-200 shadow-sm">
                    {actionLoading === 'handoff' ? (<><FaSpinner className="text-icon-sm animate-spin" />Confirming...</>) : (<><FaCheck className="text-icon-sm" />Confirm Handoff</>)}
                  </motion.button>
                ) : (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleMarkComplete} disabled={actionLoading === 'complete'} className="w-full flex items-center justify-center gap-xs px-md py-sm rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-btn-sm font-medium transition-all duration-200 shadow-sm">
                    {actionLoading === 'complete' ? (<><FaSpinner className="text-icon-sm animate-spin" />Saving...</>) : (<><FaCheck className="text-icon-sm" />Mark as Complete</>)}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-md py-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-background-primary-2 rounded-2xl p-xl border border-border-default mb-xl shadow-sm">
          <div className="flex items-start gap-md mb-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-accent-default to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaChartLine className="text-icon-md text-white" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h2 className="text-h5-sm md:text-h4-md font-bold text-text-primary">Project Timeline</h2>
                <p className="text-para-md text-text-secondary mt-xs">Stage {project.completedStages + 1} of {project.totalStages}</p>
              </div>
              <div className="text-right">
                <div className="text-h4-sm md:text-h3-sm font-bold text-accent-default">{project.progress}%</div>
                <div className="text-para-sm text-text-secondary">Complete</div>
              </div>
            </div>
          </div>

          <div className="w-full bg-background-muted dark:bg-background-primary rounded-full h-2 mb-xl overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-accent-default to-accent-hover rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border-default hidden lg:block" />
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border-default lg:hidden" />
            <motion.div initial={{ width: 0 }} animate={{ width: `${(project.completedStages / (project.totalStages - 1)) * 100}%` }} transition={{ duration: 2, ease: "easeOut", delay: 0.5 }} className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-accent-default hidden lg:block z-10" />
            <motion.div initial={{ height: 0 }} animate={{ height: `${(project.completedStages / (project.totalStages - 1)) * 100}%` }} transition={{ duration: 2, ease: "easeOut", delay: 0.5 }} className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-emerald-500 to-accent-default lg:hidden z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-11 gap-md lg:gap-sm relative">
              {project.stages.map((stage, index) => (
                <motion.div key={stage.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.5 }} className="flex lg:items-center lg:text-center relative lg:flex-col flex-row items-start text-left">
                  <motion.div whileHover={{ scale: 1.05 }} className={`w-12 h-12 rounded-full flex items-center justify-center relative z-20 mb-xs lg:mb-xs mr-md lg:mr-0 cursor-pointer flex-shrink-0 ${stage.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : stage.status === 'current' ? 'bg-gradient-to-r from-accent-default to-purple-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                    {getStageIcon(stage.status)}
                  </motion.div>
                  <div className="flex-1 lg:flex-none">
                    <h3 className={`text-para-sm font-semibold mb-xs ${stage.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : stage.status === 'current' ? 'text-accent-default' : 'text-text-tertiary'}`}>{stage.name}</h3>
                    <p className="text-[10px] text-text-tertiary leading-relaxed lg:px-xs hidden lg:block">{stage.description}</p>
                    <p className="text-para-sm text-text-tertiary leading-relaxed lg:hidden">{stage.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-xl items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="xl:col-span-2 bg-background-primary-2 rounded-2xl p-xl border border-border-default shadow-sm">
            <div className="flex items-center gap-md mb-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaEye className="text-icon-md text-white" />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <h3 className="text-h5-sm md:text-h4-md font-bold text-text-primary">Preview</h3>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="text-para-sm text-text-secondary hover:text-text-primary transition-colors">Full Screen</motion.button>
              </div>
            </div>
            <BrowserMockup projectId={id} />
          </motion.div>

          <div className="space-y-md">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="bg-background-primary-2 rounded-2xl p-xl border border-border-default shadow-sm">
              <div className="flex items-center gap-sm mb-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaComment className="text-icon-sm text-white" />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <h3 className="text-h6-sm md:text-h5-md font-bold text-text-primary">Feedback</h3>
                  <span className="text-para-sm text-text-secondary">{project.feedbackCount} comments</span>
                </div>
              </div>
              <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Share your thoughts and suggestions..." className="w-full p-md bg-background-secondary border border-border-default rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-default focus:border-accent-default transition-all text-para-sm resize-none" rows={4} />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmitFeedback} disabled={!feedbackText.trim() || isSubmittingFeedback} className="w-full mt-md flex items-center justify-center gap-xs px-md py-sm bg-accent-default hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground rounded-xl transition-all text-btn-sm font-medium shadow-sm">
                <FaPaperPlane className="text-icon-sm" />
                {isSubmittingFeedback ? 'Sending...' : 'Send Feedback'}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-background-primary-2 rounded-2xl p-xl border border-border-default shadow-sm">
              <div className="flex items-center gap-sm mb-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaComments className="text-icon-sm text-white" />
                </div>
                <h4 className="text-para-lg font-semibold text-text-primary">Recent Comments</h4>
              </div>
              <div className="space-y-md max-h-80 overflow-y-auto pr-xs">
                {project.feedback.length === 0 ? (
                  <p className="text-para-sm text-text-tertiary text-center py-md">No comments yet</p>
                ) : (
                  project.feedback.map((feedback, index) => (
                    <motion.div key={feedback.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + index * 0.1 }} className="pb-md border-b border-border-default last:border-0 last:pb-0">
                      <div className="flex items-center gap-xs mb-xs">
                        <span className={`px-xs py-xs rounded-md text-para-xs font-medium border ${getPriorityBadge(feedback.priority)}`}>{feedback.priority}</span>
                        <span className={`px-xs py-xs rounded-md text-para-xs font-medium border ${getStatusBadge(feedback.status)}`}>{feedback.status}</span>
                        <span className="text-para-xs text-text-tertiary ml-auto">{new Date(feedback.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-para-sm text-text-primary leading-relaxed">{feedback.message}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
