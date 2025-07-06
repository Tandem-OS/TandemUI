import React from 'react';
import { FaComment, FaArrowRight, FaCheckCircle, FaClock, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import type { Project } from '../../../../../types/project.type';

interface ProjectCardProps {
    project: Project;
    onViewProject: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewProject }) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'completed':
                return {
                    color: 'text-text-success',
                    bg: 'bg-background-success',
                    border: 'border-border-success',
                    icon: <FaCheckCircle className="text-icon-sm" />
                };
            case 'in-progress':
                return {
                    color: 'text-text-warning',
                    bg: 'bg-background-warning',
                    border: 'border-border-warning',
                    icon: <FaClock className="text-icon-sm" />
                };
            default:
                return {
                    color: 'text-text-secondary',
                    bg: 'bg-background-muted',
                    border: 'border-border-muted',
                    icon: <FaClock className="text-icon-sm" />
                };
        }
    };

    const getProgressConfig = (progress: number) => {
        if (progress >= 100) return 'bg-text-success';
        if (progress >= 75) return 'bg-text-warning';
        if (progress >= 50) return 'bg-text-info';
        return 'bg-accent-default';
    };

    const statusConfig = getStatusConfig(project.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-background-primary-2 border border-border-default rounded-2xl px-lg py-xl hover:shadow-xl shadow-sm relative overflow-hidden"
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background-primary-2 via-background-primary-2 to-background-secondary/30 rounded-2xl" />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-xl">
                    <div className="flex-1 mr-lg">
                        <h3 className="text-h5-sm font-semibold text-text-primary mb-sm line-clamp-1">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-sm text-text-secondary">
                            <FaTag className="text-icon-sm" />
                            <span className="text-para-sm">{project.category}</span>
                        </div>
                    </div>
                    <div className={`flex items-center gap-sm px-md py-xs rounded-full text-para-xs font-medium border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.color}`}>
                        {statusConfig.icon}
                        <span>{project.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                    </div>
                </div>

                {/* Designer Info */}
                <div className="flex items-center gap-md mb-xl">
                    <div className="relative">
                        <img
                            src={project.designerImage}
                            alt={project.designer}
                            className="w-10 h-10 rounded-full object-cover border-2 border-border-default"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-text-success rounded-full border-2 border-background-primary-2"></div>
                    </div>
                    <div>
                        <p className="text-para-sm font-medium text-text-primary">{project.designer}</p>
                        <p className="text-para-xs text-text-secondary">Designer</p>
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-lg">
                    <div className="flex items-center justify-between mb-md">
                        <span className="text-para-sm font-medium text-text-primary">Progress</span>
                        <span className="text-para-sm font-bold text-accent-default">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-background-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className={`h-2 rounded-full ${getProgressConfig(project.progress)}`}
                        />
                    </div>
                </div>

                {/* Current Stage */}
                <div className="mb-lg">
                    <p className="text-para-xs text-text-secondary mb-xs">Current Stage</p>
                    <p className="text-para-sm font-medium text-text-primary">{project.currentStage}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-lg border-t border-border-default">
                    <div className="flex items-center gap-lg">
                        <div className="flex items-center gap-xs">
                            <FaComment className="text-icon-sm text-text-secondary" />
                            <span className="text-para-xs text-text-secondary">{project.feedbackCount}</span>
                        </div>
                        <div className="text-para-xs text-text-tertiary">
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{
                            y: -2,
                            transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        onClick={() => onViewProject(project.id)}
                        className="flex items-center gap-sm px-lg py-sm bg-accent-default hover:bg-accent-hover text-accent-foreground text-para-sm font-medium rounded-xl transition-colors duration-200 hover:shadow-md"
                    >
                        <span>View</span>
                        <FaArrowRight className="text-icon-sm" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;