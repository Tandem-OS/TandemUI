// src/dashboards/designer-dashboard/components/skeletons/index.tsx
// ─── Shared pulse wrapper ─────────────────────────────────────────────────────

import React from 'react';

const Pulse: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`bg-background-muted rounded animate-pulse ${className}`} />
);

// ─────────────────────────────────────────────────────────────────────────────
// 1. DASHBOARD HOME SKELETONS
// ─────────────────────────────────────────────────────────────────────────────

/** Matches the 3 stat cards (Approval Rate, Avg Days, Project Progression) */
export const DashboardStatCardSkeleton: React.FC = () => (
    <div className="relative bg-background-muted/30 border border-border-default rounded-2xl p-6 min-h-[200px] animate-pulse">
        <div className="absolute top-4 left-4 flex gap-2">
            <Pulse className="w-9 h-9 rounded-full" />
            <Pulse className="w-24 h-9 rounded-full" />
        </div>
        <div className="mt-12 space-y-xs">
            <Pulse className="w-28 h-10 rounded-lg" />
            <Pulse className="w-36 h-4 rounded" />
        </div>
        <div className="absolute right-4 bottom-4">
            <Pulse className="w-10 h-10 rounded-full" />
        </div>
    </div>
);

/** Matches a single active project row */
export const DashboardProjectRowSkeleton: React.FC = () => (
    <div className="bg-background-primary-2 rounded-xl p-md border border-border-default animate-pulse">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-md items-start lg:items-center">
            {/* Progress + name */}
            <div className="lg:col-span-3 flex gap-lg items-start w-full">
                <Pulse className="w-10 h-5 rounded" />
                <div className="flex-1 space-y-xs">
                    <Pulse className="w-32 h-4 rounded" />
                    <Pulse className="w-20 h-5 rounded-full" />
                </div>
            </div>
            {/* Timeline bar */}
            <div className="lg:col-span-5 w-full space-y-xs">
                <Pulse className="w-full h-3.5 rounded-full" />
                <div className="flex justify-between">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <Pulse key={i} className="w-6 h-2 rounded" />
                    ))}
                </div>
            </div>
            {/* Feedback */}
            <div className="lg:col-span-2 w-full lg:flex lg:justify-center">
                <Pulse className="w-20 h-4 rounded" />
            </div>
            {/* CTA */}
            <div className="lg:col-span-2 w-full">
                <Pulse className="w-full h-9 rounded-full" />
            </div>
        </div>
    </div>
);

/** Full dashboard home skeleton */
export const DashboardHomeSkeleton: React.FC = () => (
    <div className="min-h-screen space-y-xl animate-pulse">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            {Array.from({ length: 3 }).map((_, i) => (
                <DashboardStatCardSkeleton key={i} />
            ))}
        </div>
        {/* Active Projects card */}
        <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
            <div className="flex gap-4 items-center mb-lg">
                <Pulse className="w-10 h-10 rounded-full" />
                <Pulse className="w-40 h-6 rounded" />
            </div>
            <div className="space-y-md">
                {Array.from({ length: 3 }).map((_, i) => (
                    <DashboardProjectRowSkeleton key={i} />
                ))}
            </div>
        </div>
        {/* Project Overview card */}
        <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg">
            <div className="flex gap-4 items-center mb-md">
                <Pulse className="w-10 h-10 rounded-full" />
                <Pulse className="w-40 h-6 rounded" />
            </div>
            <div className="grid grid-cols-3 gap-md">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        <Pulse className="w-10 h-10 rounded-full flex-shrink-0" />
                        <div className="space-y-xs">
                            <Pulse className="w-12 h-7 rounded" />
                            <Pulse className="w-24 h-3 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. MY PROJECTS SKELETON
// ─────────────────────────────────────────────────────────────────────────────

/** Matches ProjectCard layout exactly */
export const ProjectCardSkeleton: React.FC = () => (
    <div className="bg-background-primary-2 rounded-2xl border border-border-default p-lg animate-pulse space-y-md">
        {/* Header row: avatar + title + status */}
        <div className="flex items-start gap-md">
            <Pulse className="w-10 h-10 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-xs">
                <Pulse className="w-3/4 h-4 rounded" />
                <Pulse className="w-1/2 h-3 rounded" />
            </div>
            <Pulse className="w-20 h-6 rounded-full flex-shrink-0" />
        </div>
        {/* Progress bar */}
        <div className="space-y-xs">
            <div className="flex justify-between">
                <Pulse className="w-16 h-3 rounded" />
                <Pulse className="w-8 h-3 rounded" />
            </div>
            <Pulse className="w-full h-2 rounded-full" />
        </div>
        {/* Stage pills */}
        <div className="flex gap-xs flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
                <Pulse key={i} className="w-14 h-6 rounded-full" />
            ))}
        </div>
        {/* Tags */}
        <div className="flex gap-sm">
            <Pulse className="w-16 h-5 rounded-full" />
            <Pulse className="w-12 h-5 rounded-full" />
            <Pulse className="w-14 h-5 rounded-full" />
        </div>
        {/* CTA */}
        <Pulse className="w-full h-9 rounded-xl" />
    </div>
);

/** Full My Projects page skeleton — header stays visible, only card grid pulses */
export const MyProjectsSkeleton: React.FC = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2xl">
        {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
        ))}
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. PROJECT OVERVIEW SKELETON
// ─────────────────────────────────────────────────────────────────────────────

export const ProjectOverviewSkeleton: React.FC = () => (
    <div className="min-h-screen animate-pulse">
        {/* Hero */}
        <div className="bg-background-primary">
            <div className="container mx-auto px-md py-xl sm:py-2xl lg:py-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg items-center">
                    {/* Left — title + tags + actions */}
                    <div className="lg:col-span-2 space-y-lg">
                        <div className="flex items-center gap-md">
                            <Pulse className="w-24 h-6 rounded-full" />
                            <Pulse className="w-32 h-5 rounded" />
                        </div>
                        <Pulse className="w-3/4 h-10 rounded-lg" />
                        <div className="flex gap-md">
                            <Pulse className="w-16 h-6 rounded-lg" />
                            <Pulse className="w-20 h-6 rounded-lg" />
                            <Pulse className="w-14 h-6 rounded-lg" />
                        </div>
                        <div className="flex gap-md">
                            <Pulse className="w-36 h-10 rounded-xl" />
                            <Pulse className="w-36 h-10 rounded-xl" />
                            <Pulse className="w-20 h-10 rounded-xl" />
                        </div>
                    </div>
                    {/* Right — designer card */}
                    <div className="bg-background-secondary rounded-2xl p-xl border border-border-default">
                        <div className="flex items-center gap-md mb-lg">
                            <Pulse className="w-16 h-16 rounded-xl flex-shrink-0" />
                            <div className="space-y-xs">
                                <Pulse className="w-28 h-4 rounded" />
                                <Pulse className="w-16 h-3 rounded" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-md mb-lg">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="space-y-xs text-center">
                                    <Pulse className="w-12 h-5 rounded mx-auto" />
                                    <Pulse className="w-14 h-3 rounded mx-auto" />
                                </div>
                            ))}
                        </div>
                        <Pulse className="w-full h-9 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>

        {/* Timeline card */}
        <div className="container mx-auto px-md py-2xl">
            <div className="bg-background-primary-2 rounded-2xl p-xl border border-border-default mb-xl">
                <div className="flex items-start gap-md mb-lg">
                    <Pulse className="w-12 h-12 rounded-xl flex-shrink-0" />
                    <div className="flex-1 flex justify-between">
                        <div className="space-y-xs">
                            <Pulse className="w-40 h-6 rounded" />
                            <Pulse className="w-24 h-4 rounded" />
                        </div>
                        <div className="space-y-xs text-right">
                            <Pulse className="w-16 h-8 rounded ml-auto" />
                            <Pulse className="w-20 h-3 rounded ml-auto" />
                        </div>
                    </div>
                </div>
                {/* Progress bar */}
                <Pulse className="w-full h-2 rounded-full mb-xl" />
                {/* Stage dots */}
                <div className="hidden lg:grid grid-cols-9 gap-sm">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-xs">
                            <Pulse className="w-12 h-12 rounded-full" />
                            <Pulse className="w-10 h-3 rounded" />
                            <Pulse className="w-14 h-2 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Content grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-xl items-start">
                {/* Preview */}
                <div className="xl:col-span-2 bg-background-primary-2 rounded-2xl p-xl border border-border-default">
                    <div className="flex items-center gap-md mb-lg">
                        <Pulse className="w-12 h-12 rounded-xl flex-shrink-0" />
                        <Pulse className="w-24 h-6 rounded" />
                    </div>
                    <Pulse className="w-full h-64 rounded-xl" />
                </div>
                {/* Feedback + comments */}
                <div className="space-y-md">
                    <div className="bg-background-primary-2 rounded-2xl p-xl border border-border-default space-y-md">
                        <div className="flex items-center gap-sm mb-lg">
                            <Pulse className="w-10 h-10 rounded-lg flex-shrink-0" />
                            <Pulse className="w-24 h-5 rounded" />
                        </div>
                        <Pulse className="w-full h-24 rounded-xl" />
                        <Pulse className="w-full h-9 rounded-xl" />
                    </div>
                    <div className="bg-background-primary-2 rounded-2xl p-xl border border-border-default space-y-md">
                        <div className="flex items-center gap-sm mb-lg">
                            <Pulse className="w-10 h-10 rounded-lg flex-shrink-0" />
                            <Pulse className="w-32 h-5 rounded" />
                        </div>
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="space-y-xs pb-md border-b border-border-default last:border-0">
                                <div className="flex gap-xs">
                                    <Pulse className="w-14 h-5 rounded" />
                                    <Pulse className="w-14 h-5 rounded" />
                                </div>
                                <Pulse className="w-full h-3 rounded" />
                                <Pulse className="w-3/4 h-3 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
