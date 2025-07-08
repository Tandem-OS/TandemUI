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
                    // Softer colors for dark mode compatibility
                    color: 'text-amber-600 dark:text-amber-400',
                    bg: 'bg-amber-50 dark:bg-amber-900/20',
                    border: 'border-amber-200 dark:border-amber-800/30',
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

    const statusConfig = getStatusConfig(project.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-background-primary-2 border border-border-default rounded-xl sm:rounded-2xl px-lg py-lg sm:px-xl sm:py-xl lg:px-2xl lg:py-2xl hover:shadow-xl shadow-sm relative overflow-hidden group"
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background-primary-2 via-background-primary-2 to-background-secondary/20 rounded-xl sm:rounded-2xl" />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-md mb-lg sm:mb-xl">
                    <div className="flex-1">
                        <h3 className="text-h6-sm sm:text-h5-sm font-semibold text-text-primary mb-sm line-clamp-2 leading-tight">
                            {project.title}
                        </h3>
                        <div className="flex items-center gap-sm text-text-secondary">
                            <FaTag className="text-icon-sm flex-shrink-0" />
                            <span className="text-para-sm truncate">{project.category}</span>
                        </div>
                    </div>
                    <div className={`flex items-center gap-sm px-md py-sm rounded-lg text-para-xs font-medium border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.color} flex-shrink-0 w-fit`}>
                        {statusConfig.icon}
                        <span className="whitespace-nowrap">{project.status === 'completed' ? 'Completed' : 'In Progress'}</span>
                    </div>
                </div>

                {/* Designer Info */}
                <div className="flex items-center gap-md sm:gap-lg mb-lg sm:mb-xl">
                    <div className="relative">
                        <img
                            src={project.designerImage}
                            alt={project.designer}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-border-default"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-text-success rounded-full border-2 border-background-primary-2"></div>
                    </div>
                    <div>
                        <p className="text-para-sm sm:text-para-md font-medium text-text-primary">{project.designer}</p>
                        <p className="text-para-xs sm:text-para-sm text-text-secondary">Designer</p>
                    </div>
                </div>

                {/* Progress - Simplified to brand purple only */}
                <div className="mb-lg sm:mb-xl">
                    <div className="flex items-center justify-between mb-sm sm:mb-md">
                        <span className="text-para-xs sm:text-para-sm font-medium text-text-primary">Progress</span>
                        <span className="text-para-xs sm:text-para-sm font-bold text-accent-default">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-background-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="h-2 rounded-full bg-accent-default"
                        />
                    </div>
                </div>

                {/* Current Stage */}
                <div className="mb-lg sm:mb-xl">
                    <p className="text-para-xs text-text-secondary mb-xs sm:mb-sm">Current Stage</p>
                    <p className="text-para-xs sm:text-para-sm font-medium text-text-primary">{project.currentStage}</p>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md pt-lg sm:pt-xl border-t border-border-default">
                    <div className="flex items-center gap-lg sm:gap-xl">
                        <div className="flex items-center gap-sm">
                            <FaComment className="text-icon-sm text-text-secondary" />
                            <span className="text-para-xs sm:text-para-sm text-text-secondary">{project.feedbackCount}</span>
                        </div>
                        <div className="text-para-xs sm:text-para-sm text-text-tertiary">
                            {new Date(project.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{
                            y: -2,
                            scale: 1.02,
                            transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onViewProject(project.id)}
                        className="flex items-center justify-center gap-sm px-lg py-sm sm:px-xl sm:py-md bg-accent-default hover:bg-accent-hover text-accent-foreground text-para-xs sm:text-para-sm font-medium rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg group-hover:shadow-xl w-full sm:w-auto"
                    >
                        <span>View</span>
                        <FaArrowRight className="text-icon-sm transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;