/**
 * projectStatusToClientProgress
 *
 * Maps backend project status to client-facing progress info.
 * Imports pipeline order and progress percentages from the single
 * source of truth — projectStatus.ts — instead of redefining them.
 *
 * Used by: ProgressCircle, ProgressChart, ClientDashHome, ProjectCard
 */

import type { ProjectStatus } from "@/lib/helpers/canPerformAction";
import { PIPELINE_ORDER, STATUS_TO_PROGRESS } from "@/lib/config/projectStatus";

export interface ProgressInfo {
  percentage: number;
  label: string;
  stage: ProjectStatus;
}

// ─── Client-facing labels ─────────────────────────────────────────────────────
// These are intentionally different from designer-facing STATUS_LABEL.
// They use simpler, client-friendly language.

const CLIENT_LABEL: Record<NonNullable<ProjectStatus>, string> = {
  intake:               'Brief received',
  scraping:             'Scanning site',
  swiping:              'Reviewing taste',
  embedded:             'Reviewing taste',
  composing:            'Building page',
  refining:             'Refining',
  revisions:            'Refining',
  'designer-feedback':  'Under review',
  'platform-feedback':  'Under review',
  completed:            'Ready',
  handoff:              'Delivered',
};

const NULL_PROGRESS: ProgressInfo = {
  percentage: 0,
  label: 'Getting started',
  stage: null,
};

export const projectStatusToClientProgress = (
  status: ProjectStatus
): ProgressInfo => {
  if (status === null) return NULL_PROGRESS;
  return {
    percentage: STATUS_TO_PROGRESS[status] ?? 0,
    label: CLIENT_LABEL[status] ?? status,
    stage: status,
  };
};

// ─── Chart stages ─────────────────────────────────────────────────────────────

export interface ChartStage {
  name: string;
  progress: number;
  status: ProjectStatus;
  isActive: boolean;
  isPast: boolean;
}

export const getChartStages = (currentStatus: ProjectStatus): ChartStage[] => {
  const currentIndex = PIPELINE_ORDER.indexOf(currentStatus as any);

  return PIPELINE_ORDER.map((s) => {
    const stageIndex = PIPELINE_ORDER.indexOf(s);
    return {
      name: CLIENT_LABEL[s],
      progress: STATUS_TO_PROGRESS[s],
      status: s as ProjectStatus,
      isActive: s === currentStatus,
      isPast: stageIndex < currentIndex,
    };
  });
};
