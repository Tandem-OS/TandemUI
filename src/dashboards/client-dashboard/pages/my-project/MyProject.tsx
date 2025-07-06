import React, { useState, useMemo } from 'react';
import { FaFilter, FaProjectDiagram, FaChartLine, FaSortAmountDown, FaPlus, FaClock, FaUser, FaFont, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from "../../../../components/demos/typography/Heading";
import ProjectCard from './components/ProjectCard';
import Dropdown from '../../../../comman-components/Dropdown';
import { mockProjects } from '../../../../mock-data/client-my-projects.mock';
import SearchBox from '../../../../comman-components/SearchBox';

type FilterType = 'all' | 'in-progress' | 'completed';

const MyProject: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'name' | 'designer'>('recent');

    // Filter and search logic
    const filteredProjects = useMemo(() => {
        let filtered = mockProjects;

        // Apply status filter
        if (activeFilter !== 'all') {
            filtered = filtered.filter(project => project.status === activeFilter);
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.designer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply sorting
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'progress':
                    return b.progress - a.progress;
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'designer':
                    return a.designer.localeCompare(b.designer);
                case 'recent':
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        return filtered;
    }, [searchTerm, activeFilter, sortBy]);

    // Statistics
    const stats = useMemo(() => {
        const total = mockProjects.length;
        const inProgress = mockProjects.filter(p => p.status === 'in-progress').length;
        const completed = mockProjects.filter(p => p.status === 'completed').length;
        const avgProgress = Math.round(
            mockProjects.reduce((sum, p) => sum + p.progress, 0) / total
        );

        return { total, inProgress, completed, avgProgress };
    }, []);

    const sortOptions = [
        { id: 'recent', label: 'Most Recent', icon: <FaCalendarAlt />, onClick: () => setSortBy('recent') },
        { id: 'progress', label: 'Progress', icon: <FaClock />, onClick: () => setSortBy('progress') },
        { id: 'name', label: 'Name', icon: <FaFont />, onClick: () => setSortBy('name') },
        { id: 'designer', label: 'Designer', icon: <FaUser />, onClick: () => setSortBy('designer') }
    ];

    const getSortLabel = (sortValue: string) => {
        const option = sortOptions.find(opt => opt.id === sortValue);
        return option ? option.label : 'Most Recent';
    };

    const handleViewProject = (projectId: string) => {
        console.log('View project:', projectId);
        // TODO: Navigate to project detail page
    };

    const filterButtons = [
        { key: 'all' as FilterType, label: 'All Projects', count: stats.total },
        { key: 'in-progress' as FilterType, label: 'In Progress', count: stats.inProgress },
        { key: 'completed' as FilterType, label: 'Completed', count: stats.completed }
    ];

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-lg py-xl sm:py-2xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-md sm:mb-xl lg:mb-3xl"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md md:gap-xl mb-md md:mb-xl">
                        <div>
                            <Heading level="h3" className="mb-sm">
                                My Projects
                            </Heading>
                            <p className="text-text-secondary text-para-md">
                                Manage and track your creative projects with our talented designers
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-md md:gap-xl">
                            <motion.div
                                whileHover={{
                                    y: -4,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                className="flex items-center gap-sm md:gap-md px-md md:px-lg py-sm md:py-md bg-background-primary-2 rounded-2xl border border-border-default hover:shadow-md transition-shadow duration-200"
                            >
                                <FaProjectDiagram className="text-icon-lg text-accent-default" />
                                <div>
                                    <p className="text-para-xs text-text-secondary">Total Projects</p>
                                    <p className="text-h6-sm font-bold text-text-primary">{stats.total}</p>
                                </div>
                            </motion.div>
                            <motion.div
                                whileHover={{
                                    y: -4,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                className="flex items-center gap-md px-lg py-md bg-background-primary-2 rounded-2xl border border-border-default hover:shadow-md transition-shadow duration-200"
                            >
                                <FaChartLine className="text-icon-lg text-text-success" />
                                <div>
                                    <p className="text-para-xs text-text-secondary">Avg Progress</p>
                                    <p className="text-h6-sm font-bold text-text-primary">{stats.avgProgress}%</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Search and Controls */}
                    <div className="flex flex-col lg:flex-row gap-md md:gap-lg mb-md md:mb-xl">
                        {/* Premium Search Bar */}
                        <SearchBox
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Search projects, designers, or categories..."
                            showClearButton
                            className="flex-1"
                        />

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-md max-lg:flex-row-reverse max-lg:justify-end">
                            <FaSortAmountDown className="text-icon-sm text-text-secondary" />
                            <Dropdown
                                trigger={
                                    <div className="flex items-center gap-md p-md bg-background-primary-2 border border-border-default rounded-2xl text-text-primary hover:shadow-md transition-shadow duration-200 cursor-pointer">
                                        <span className="text-para-md">{getSortLabel(sortBy)}</span>
                                        <FaChevronDown className="text-icon-sm text-text-secondary" />
                                    </div>
                                }
                                items={sortOptions}
                                align="right"
                                width="w-48"
                            />
                        </div>

                        {/* Filter Toggle (Mobile) */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-sm p-md bg-background-primary-2 border border-border-default rounded-2xl text-text-primary hover:shadow-md transition-shadow duration-200"
                        >
                            <FaFilter className="text-icon-sm" />
                            <span className="text-para-md">Filters</span>
                        </button>
                    </div>

                    {/* Filter Buttons */}
                    <div className={`flex flex-wrap gap-md ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                        {filterButtons.map(({ key, label, count }) => (
                            <motion.button
                                key={key}
                                whileHover={{
                                    y: -2,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                onClick={() => setActiveFilter(key)}
                                className={`px-lg py-sm rounded-2xl text-para-sm font-medium transition-all duration-300 border ${activeFilter === key
                                    ? 'bg-accent-default text-accent-foreground border-accent-default shadow-lg'
                                    : 'bg-background-primary-2 text-text-secondary hover:text-text-primary border-border-default hover:shadow-md hover:border-accent-default/30'
                                    }`}
                            >
                                {label}
                                <span className={`ml-sm px-sm py-xs rounded-full text-para-xs transition-all duration-300 ${activeFilter === key
                                    ? 'bg-accent-foreground/20 text-accent-foreground'
                                    : 'bg-background-muted text-text-tertiary'
                                    }`}>
                                    {count}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-5xl"
                        >
                            <FaProjectDiagram className="mx-auto text-icon-2xl text-text-tertiary mb-md md:mb-lg" />
                            <Heading level="h5" className="text-text-secondary mb-md text-center">
                                No projects found
                            </Heading>
                            <p className="text-text-tertiary text-para-md mb-md md:mb-lg max-w-md mx-auto">
                                {searchTerm
                                    ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                                    : 'Your projects will appear here once you start working with our designers.'}
                            </p>
                            <motion.button
                                whileHover={{
                                    y: -4,
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                className="flex items-center gap-sm mx-auto px-lg py-sm bg-accent-default hover:bg-accent-hover text-accent-foreground text-para-md font-medium rounded-2xl transition-colors duration-200 hover:shadow-md"
                            >
                                <FaPlus className="text-icon-sm" />
                                <span>Start New Project</span>
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <ProjectCard
                                        project={project}
                                        onViewProject={handleViewProject}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Summary */}
                {filteredProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-lg pt-3xl mt-3xl border-t border-border-default"
                    >
                        <p className="text-text-secondary text-para-md">
                            Showing <span className="font-medium text-text-primary">{filteredProjects.length}</span> of{' '}
                            <span className="font-medium text-text-primary">{stats.total}</span> projects
                            {searchTerm && (
                                <span className="text-text-tertiary">
                                    {' '}matching "<span className="font-medium text-text-primary">{searchTerm}</span>"
                                </span>
                            )}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyProject;