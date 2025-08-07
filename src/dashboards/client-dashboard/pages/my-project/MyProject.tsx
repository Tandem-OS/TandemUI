import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FaFilter, FaProjectDiagram, FaChartLine, FaSortAmountDown, FaPlus, FaClock, FaUser, FaFont, FaCalendarAlt, FaChevronDown, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from "../../../../components/demos/typography/Heading";
import ProjectCard from './components/ProjectCard';
import Dropdown from '../../../../comman-components/Dropdown';
import SearchBox from '../../../../comman-components/SearchBox';
import { getAllProjectsByDesignerEmail } from '@/lib/requests/ProjectRequest';
import type { Project } from '@/types/project.type';
import GlobalSpinner from '@/components/ant-design-spinner/Spinner';
import MagicLinkModal from '@/dashboards/designer-dashboard/components/MagicLinkModal';

type FilterType = 'all' | 'in-progress' | 'completed';
type SortType = 'recent' | 'progress' | 'name' | 'designer';

const INITIAL_CARDS = 6;
const CARDS_PER_LOAD = 6;

const MyProject: React.FC = () => {
    const [state, setState] = useState({
        searchTerm: '',
        activeFilter: 'all' as FilterType,
        showFilters: false,
        sortBy: 'recent' as SortType,
        visibleCards: INITIAL_CARDS,
        isLoading: true
    });

    const [project, setProject] = useState<Project[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchProjects = async () => {
        setState(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await getAllProjectsByDesignerEmail();
            const data = response.data;

            const mapped = data.map((raw: any): Project => ({
                id: raw.id,
                title: raw.project_name,
                category: raw.project_type,
                designer: raw.designer_email,
                designerImage: "/images/avatar.png",
                progress: raw.intake_completed
                    ? 100
                    : raw.swiper_started
                        ? 50
                        : 10,
                status: raw.swiper_completed
                    ? 'completed'
                    : raw.swiper_started
                        ? 'in-progress'
                        : 'in-progress',
                currentStage: raw.status_note || 'Intake',
                feedbackCount: raw.notes ? raw.notes.length : 0,
                createdAt: new Date(raw.last_updated).toISOString().split("T")[0],
                description: raw.business_description,
                tags: [
                    raw.project_type,
                    raw.budget,
                    raw.not_ready_to_share ? "private" : "shared"
                ],
            }));

            setProject(mapped);
        } catch (err: any) {
            console.error("Failed to fetch projects:", err);
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [])

    const updateState = useCallback((updates: Partial<typeof state>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    // Memoized computations
    const { filteredProjects, stats } = useMemo(() => {
        const safeProjects = project || [];

        let filtered = [...safeProjects];

        if (state.activeFilter !== 'all') {
            filtered = filtered.filter(p => p.status === state.activeFilter);
        }

        if (state.searchTerm) {
            const term = state.searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                [p.title, p.category, p.designer, ...p.tags]
                    .some(text => text.toLowerCase().includes(term))
            );
        }

        // Sorting
        const sortFunctions = {
            progress: (a: Project, b: Project) => b.progress - a.progress,
            name: (a: Project, b: Project) => a.title.localeCompare(b.title),
            designer: (a: Project, b: Project) => a.designer.localeCompare(b.designer),
            recent: (a: Project, b: Project) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        };

        filtered.sort(sortFunctions[state.sortBy]);

        // Stats based on full project list (not just filtered)
        const stats = {
            total: safeProjects.length,
            inProgress: safeProjects.filter(p => p.status === 'in-progress').length,
            completed: safeProjects.filter(p => p.status === 'completed').length,
            avgProgress: Math.round(
                safeProjects.reduce((sum, p) => sum + p.progress, 0) / (safeProjects.length || 1)
            )
        };

        return { filteredProjects: filtered, stats };
    }, [project, state.searchTerm, state.activeFilter, state.sortBy]);

    const visibleProjects = filteredProjects.slice(0, state.visibleCards);
    const hasMore = state.visibleCards < filteredProjects.length;


    // Reset visible cards on filter change
    React.useEffect(() => {
        updateState({ visibleCards: INITIAL_CARDS });
    }, [state.searchTerm, state.activeFilter, state.sortBy, updateState]);

    // Handlers
    const handleLoadMore = async () => {
        updateState({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 800));
        updateState({
            visibleCards: Math.min(state.visibleCards + CARDS_PER_LOAD, filteredProjects.length),
            isLoading: false
        });
    };

    // Configuration
    const sortOptions = [
        { id: 'recent', label: 'Most Recent', icon: <FaCalendarAlt /> },
        { id: 'progress', label: 'Progress', icon: <FaClock /> },
        { id: 'name', label: 'Name', icon: <FaFont /> },
        { id: 'designer', label: 'Designer', icon: <FaUser /> }
    ].map(opt => ({ ...opt, onClick: () => updateState({ sortBy: opt.id as SortType }) }));

    const filterButtons = [
        { key: 'all', label: 'All Projects', count: stats.total },
        { key: 'in-progress', label: 'In Progress', count: stats.inProgress },
        { key: 'completed', label: 'Completed', count: stats.completed },
    ];

    // Shared styles
    const cardStyle = "flex items-center gap-md sm:gap-lg px-md sm:px-lg lg:px-xl py-md sm:py-lg bg-background-primary-2 rounded-xl sm:rounded-2xl border border-border-default hover:shadow-lg transition-all duration-300";
    const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.98 } };

    // Components
    const StatCard = ({ icon, iconClass, label, value }: any) => (
        <motion.div whileHover={{ y: -4 }} className={cardStyle}>
            <div className={`p-sm sm:p-md ${iconClass} rounded-lg sm:rounded-xl flex-shrink-0`}>
                {icon}
            </div>
            <div>
                <p className="text-para-xs sm:text-para-sm text-text-secondary mb-xs">{label}</p>
                <p className="text-h6-sm sm:text-h5-sm font-bold text-text-primary">{value}</p>
            </div>
        </motion.div>
    );

    const EmptyState = () => (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-5xl">
            <div className="p-2xl bg-background-muted rounded-full w-fit mx-auto mb-lg">
                <FaProjectDiagram className="text-icon-2xl text-text-tertiary" />
            </div>
            <Heading level="h4" className="text-text-secondary mb-lg text-center">
                {state.searchTerm ? 'No projects found' : 'No projects yet'}
            </Heading>
            <p className="text-text-tertiary text-para-lg mb-2xl max-w-lg mx-auto leading-relaxed">
                {state.searchTerm
                    ? 'Try adjusting your search terms or filters.'
                    : 'Your projects will appear here once you start working with our designers.'}
            </p>
            <motion.button {...motionProps} className="flex items-center gap-md mx-auto px-2xl py-lg bg-accent-default hover:bg-accent-hover text-accent-foreground text-para-lg font-medium rounded-xl transition-all duration-200 hover:shadow-lg">
                <FaPlus className="text-icon-sm" />
                <span>Start New Project</span>
            </motion.button>
        </motion.div>
    );

    return (
        <>
            {state.isLoading ?
                <GlobalSpinner /> :
                <div className="min-h-screen">
                    <div className="container mx-auto px-md sm:px-lg lg:px-xl py-lg sm:py-xl lg:py-2xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                            className="mb-lg sm:mb-2xl lg:mb-3xl">
                            <div className="flex max-lg:flex-col lg:justify-between gap-lg sm:gap-xl mb-lg sm:mb-2xl">
                                <div>
                                    <Heading level="h3" className="mb-sm sm:mb-md">My Projects</Heading>
                                    <p className="text-text-secondary text-para-md sm:text-para-lg">
                                        Manage and track your creative projects with our talented designers
                                    </p>
                                </div>
                                <div>
                                    <motion.button
                                        {...motionProps}
                                        onClick={() => setModalOpen(true)}
                                        className="flex items-center gap-md px-2xl py-lg bg-accent-default hover:bg-accent-hover text-accent-foreground text-para-lg font-medium rounded-xl transition-all duration-200 hover:shadow-lg"
                                    >
                                        <FaPlus className="text-icon-sm" />
                                        <span>Send Magic Link</span>
                                    </motion.button>
                                    {modalOpen && (<MagicLinkModal isOpen={modalOpen} setIsOpen={setModalOpen} />)}
                                </div>
                                <div className="grid grid-cols-2 lg:flex lg:justify-center xl:justify-start gap-md sm:gap-lg">
                                    <StatCard
                                        icon={<FaProjectDiagram className="text-icon-md sm:text-icon-lg text-accent-default" />}
                                        iconClass="bg-accent-subtle"
                                        label="Total Projects"
                                        value={stats.total}
                                    />
                                    <StatCard
                                        icon={<FaChartLine className="text-icon-md sm:text-icon-lg text-text-success" />}
                                        iconClass="bg-background-success"
                                        label="Avg Progress"
                                        value={`${stats.avgProgress}%`}
                                    />
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col lg:flex-row gap-lg mb-lg">
                                <SearchBox
                                    value={state.searchTerm}
                                    onChange={(searchTerm) => updateState({ searchTerm })}
                                    placeholder="Search projects, designers, or categories..."
                                    showClearButton
                                    className="flex-1"
                                />
                                <div className="flex items-center gap-lg max-lg:pl-sm">
                                    <div className="flex items-center gap-sm text-text-secondary">
                                        <FaSortAmountDown className="text-icon-sm" />
                                        <span className="text-para-sm font-medium">Sort by:</span>
                                    </div>
                                    <Dropdown
                                        trigger={
                                            <motion.div {...motionProps} className="flex items-center gap-md px-lg py-md bg-background-primary-2 border border-border-default rounded-xl text-text-primary hover:shadow-md transition-all duration-200 cursor-pointer min-w-[140px]">
                                                <span className="text-para-sm font-medium">
                                                    {sortOptions.find(opt => opt.id === state.sortBy)?.label}
                                                </span>
                                                <FaChevronDown className="text-icon-sm text-text-secondary" />
                                            </motion.div>
                                        }
                                        items={sortOptions}
                                        align="right"
                                        width="w-48"
                                    />
                                </div>
                                <motion.button
                                    {...motionProps}
                                    onClick={() => updateState({ showFilters: !state.showFilters })}
                                    className="lg:hidden flex items-center gap-sm px-lg py-md bg-background-primary-2 border border-border-default rounded-xl text-text-primary hover:shadow-md transition-all duration-200"
                                >
                                    <FaFilter className="text-icon-sm" />
                                    <span className="text-para-sm font-medium">Filters</span>
                                </motion.button>
                            </div>

                            {/* Filters */}
                            <div className={`flex flex-wrap gap-md ${state.showFilters ? 'block' : 'hidden lg:flex'}`}>
                                {filterButtons.map(({ key, label, count }) => (
                                    <motion.button
                                        key={key}
                                        {...motionProps}
                                        onClick={() => updateState({ activeFilter: key as FilterType })}
                                        className={`px-md md:px-xl py-sm md:py-md rounded-xl text-para-sm font-medium transition-all duration-300 border ${state.activeFilter === key
                                            ? 'bg-accent-default text-accent-foreground border-accent-default shadow-lg'
                                            : 'bg-background-primary-2 text-text-secondary hover:text-text-primary border-border-default hover:shadow-md hover:border-accent-default/30'
                                            }`}
                                    >
                                        {label}
                                        <span className={`ml-sm px-sm md:px-md py-xs rounded-full text-para-xs font-medium ${state.activeFilter === key
                                            ? 'bg-accent-foreground/20 text-accent-foreground'
                                            : 'bg-background-secondary-2 text-text-tertiary'
                                            }`}>
                                            {count}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            {filteredProjects.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2xl">
                                        {visibleProjects.map((project, index) => (
                                            <motion.div
                                                key={project.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                                            >
                                                <ProjectCard
                                                    project={project}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Footer */}
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-lg pt-2xl mt-3xl border-t border-border-default">
                                        <p className="text-text-secondary text-para-md max-md:text-center">
                                            {hasMore ? (
                                                <>Showing <span className="font-semibold text-text-primary">{visibleProjects.length}</span> of </>
                                            ) : 'All '}
                                            <span className="font-semibold text-text-primary">{filteredProjects.length}</span> projects
                                            {hasMore ? '' : ' displayed'}
                                            {state.searchTerm && (
                                                <span className="text-text-tertiary">
                                                    {' '}matching "<span className="font-semibold text-text-primary">{state.searchTerm}</span>"
                                                </span>
                                            )}
                                        </p>
                                        {hasMore && (
                                            <motion.button
                                                {...motionProps}
                                                onClick={handleLoadMore}
                                                disabled={state.isLoading}
                                                className={`flex items-center gap-md px-lg py-md rounded-lg text-para-sm font-medium transition-all duration-200 max-md:justify-center ${state.isLoading
                                                    ? 'bg-background-muted text-text-tertiary cursor-not-allowed'
                                                    : 'bg-background-primary-2 border border-border-default hover:border-accent-default hover:shadow-md text-text-primary'
                                                    }`}
                                            >
                                                {state.isLoading ? (
                                                    <>
                                                        <FaSpinner className="text-icon-xs animate-spin" />
                                                        <span>Loading...</span>
                                                    </>
                                                ) : 'Load More'}
                                            </motion.button>
                                        )}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            }
        </>
    );
};

export default MyProject;