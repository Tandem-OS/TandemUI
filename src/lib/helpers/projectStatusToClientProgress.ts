/**
 * projectStatusToClientProgress
 *
 * Single source of truth for mapping backend project status
 * to a human-readable label and percentage.
 *
 * Used by: ProgressCircle, ProgressChart, ClientDashHome, ProjectCard
 */

import type { ProjectStatus } from "@/lib/helpers/canPerformAction";

export interface ProgressInfo {
  percentage: number;
  label: string;
  stage: ProjectStatus;
}

const PROGRESS_MAP: Record<NonNullable<ProjectStatus>, ProgressInfo> = {
  intake: {
    percentage: 10,
    label: "Brief received",
    stage: "intake",
  },
  scraping: {
    percentage: 20,
    label: "Scanning site",
    stage: "scraping",
  },
  swiping: {
    percentage: 35,
    label: "Reviewing taste",
    stage: "swiping",
  },
  embedded: {
    percentage: 45,
    label: "Reviewing taste",
    stage: "embedded",
  },
  composing: {
    percentage: 55,
    label: "Building page",
    stage: "composing",
  },
  refining: {
    percentage: 65,
    label: "Refining",
    stage: "refining",
  },
  revisions: {
    percentage: 75,
    label: "Refining",
    stage: "revisions",
  },
  completed: {
    percentage: 90,
    label: "Ready",
    stage: "completed",
  },
  handoff: {
    percentage: 100,
    label: "Delivered",
    stage: "handoff",
  },
};

const NULL_PROGRESS: ProgressInfo = {
  percentage: 0,
  label: "Getting started",
  stage: null,
};

export const projectStatusToClientProgress = (
  status: ProjectStatus
): ProgressInfo => {
  if (status === null) return NULL_PROGRESS;
  return PROGRESS_MAP[status] ?? NULL_PROGRESS;
};

/**
 * Full ordered list for ProgressChart rendering.
 * Each entry includes whether it's the current active stage.
 */
export interface ChartStage {
  name: string;
  progress: number;
  status: ProjectStatus;
  isActive: boolean;
  isPast: boolean;
}

const PIPELINE_STAGES: { status: NonNullable<ProjectStatus>; name: string; progress: number }[] = [
  { status: "intake",    name: "Brief received",   progress: 10 },
  { status: "scraping",  name: "Scanning site",    progress: 20 },
  { status: "swiping",   name: "Reviewing taste",  progress: 35 },
  { status: "embedded",  name: "Taste locked",     progress: 45 },
  { status: "composing", name: "Building page",    progress: 55 },
  { status: "refining",  name: "Refining",         progress: 65 },
  { status: "revisions", name: "Revisions",        progress: 75 },
  { status: "completed", name: "Ready",            progress: 90 },
  { status: "handoff",   name: "Delivered",        progress: 100 },
];

const PIPELINE_ORDER: ProjectStatus[] = [
  null,
  "intake",
  "scraping",
  "swiping",
  "embedded",
  "composing",
  "refining",
  "revisions",
  "completed",
  "handoff",
];

export const getChartStages = (currentStatus: ProjectStatus): ChartStage[] => {
  const currentIndex = PIPELINE_ORDER.indexOf(currentStatus);

  return PIPELINE_STAGES.map((stage) => {
    const stageIndex = PIPELINE_ORDER.indexOf(stage.status);
    return {
      name: stage.name,
      progress: stage.progress,
      status: stage.status,
      isActive: stage.status === currentStatus,
      isPast: stageIndex < currentIndex,
    };
  });
};