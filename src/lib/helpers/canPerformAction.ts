/**
 * canPerformAction
 *
 * Central gating helper for all project-status-based actions.
 * Returns { allowed: boolean; reason: string | null }
 *
 * Rule: allowed = true means the button is active.
 *       allowed = false means the button is disabled with a human-readable reason.
 *
 * Status pipeline (in order):
 * null → intake → scraping → swiping → embedded → composing → refining → revisions
 *      → designer-feedback → platform-feedback → completed → handoff
 */

export type ProjectStatus =
  | null
  | "intake"
  | "scraping"
  | "swiping"
  | "embedded"
  | "composing"
  | "refining"
  | "revisions"
  | "designer-feedback"
  | "platform-feedback"
  | "completed"
  | "handoff";

export type ActionType =
  | "edit_intake"
  | "start_scraper"
  | "start_swiping"
  | "start_composing"
  | "start_refining"
  | "restore_version"
  | "submit_designer_testimonial"
  | "submit_platform_testimonial"
  | "view_preview"
  | "continue_project";

interface GateResult {
  allowed: boolean;
  reason: string | null;
}

const PIPELINE: ProjectStatus[] = [
  null,
  "intake",
  "scraping",
  "swiping",
  "embedded",
  "composing",
  "refining",
  "revisions",
  "designer-feedback",
  "platform-feedback",
  "completed",
  "handoff",
];

/**
 * Returns true if current status is at or past the target stage.
 */
const isAtOrPast = (current: ProjectStatus, target: ProjectStatus): boolean => {
  return PIPELINE.indexOf(current) >= PIPELINE.indexOf(target);
};

/**
 * Returns true if current status is exactly at the target stage.
 */
const isAt = (current: ProjectStatus, target: ProjectStatus): boolean => {
  return current === target;
};

export const canPerformAction = (
  action: ActionType,
  status: ProjectStatus
): GateResult => {
  switch (action) {
    case "edit_intake":
      // Intake edit is always allowed per Syed's rule
      return { allowed: true, reason: null };

    case "start_scraper":
      if (status === null)
        return {
          allowed: false,
          reason: "Finish your intake form before scanning your site.",
        };
      if (isAt(status, "scraping"))
        return {
          allowed: false,
          reason: "Your site is currently being scanned. Check back shortly.",
        };
      if (isAtOrPast(status, "swiping"))
        return {
          allowed: false,
          reason: "Scraping is already complete for this project.",
        };
      return { allowed: true, reason: null };

    case "start_swiping":
      if (status === null || status === "intake")
        return {
          allowed: false,
          reason: "Complete the site scan before swiping.",
        };
      if (isAt(status, "scraping"))
        return {
          allowed: false,
          reason: "Your site is still being scanned. Swiping unlocks next.",
        };
      if (isAtOrPast(status, "composing"))
        return {
          allowed: false,
          reason: "Swiping is already complete for this project.",
        };
      return { allowed: true, reason: null };

    case "start_composing":
      if (!isAtOrPast(status, "embedded"))
        return {
          allowed: false,
          reason: "Complete swiping before generating your layout.",
        };
      if (isAt(status, "composing"))
        return {
          allowed: false,
          reason: "Your layout is currently being built. Check back shortly.",
        };
      if (isAtOrPast(status, "refining"))
        return {
          allowed: false,
          reason: "Layout is already generated. Head to Refine.",
        };
      return { allowed: true, reason: null };

    case "start_refining":
      if (!isAtOrPast(status, "refining"))
        return {
          allowed: false,
          reason: "Generate your layout before refining.",
        };
      return { allowed: true, reason: null };

    case "restore_version":
      if (!isAtOrPast(status, "refining"))
        return {
          allowed: false,
          reason: "Version history is available after your first refinement.",
        };
      return { allowed: true, reason: null };

    case "submit_designer_testimonial":
      if (!isAtOrPast(status, "designer-feedback"))
        return {
          allowed: false,
          reason: "Designer feedback unlocks once your project reaches the review stage.",
        };
      return { allowed: true, reason: null };

    case "submit_platform_testimonial":
      if (!isAtOrPast(status, "platform-feedback"))
        return {
          allowed: false,
          reason: "Platform feedback unlocks after the designer review stage.",
        };
      return { allowed: true, reason: null };

    case "view_preview":
      if (!isAtOrPast(status, "composing"))
        return {
          allowed: false,
          reason: "Your preview will be available once the layout is generated.",
        };
      return { allowed: true, reason: null };

    case "continue_project": {
      // Always allowed — navigates to the current active stage
      return { allowed: true, reason: null };
    }

    default:
      return { allowed: true, reason: null };
  }
};

/**
 * Maps the current project status to the correct next route.
 * Used by the "Continue Project" button.
 */
export const getNextRoute = (status: ProjectStatus): string => {
  switch (status) {
    case null:
      return "/dashboard/client/intake";
    case "intake":
      return "/dashboard/client/scraper";
    case "scraping":
      return "/dashboard/client/scraper";
    case "swiping":
      return "/dashboard/client/swiper";
    case "embedded":
      return "/dashboard/client/swiper";
    case "composing":
      return "/dashboard/client/compose";
    case "refining":
      return "/dashboard/client/compose";
    case "revisions":
      return "/dashboard/client/compose";
    case "designer-feedback":
      return "/dashboard/client/designer-testimonial";
    case "platform-feedback":
      return "/dashboard/client/final-testimonial";
    case "completed":
      return "/dashboard/client/designer-testimonial";
    case "handoff":
      return "/dashboard/client/final-testimonial";
    default:
      return "/dashboard/client";
  }
};
