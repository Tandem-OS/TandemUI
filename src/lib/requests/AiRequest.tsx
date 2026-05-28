import api from '@/lib/requests/Axios';

// ── Project Brief ─────────────────────────────────────────────────────────────

export interface ProjectBriefClientSnapshot {
    business_name: string;
    business_description: string;
    target_audience: string;
    primary_goal: string;
    timeline: string | null;
    budget_notes: string | null;
}

export interface ProjectBriefBrandDirection {
    colors: string[];
    logo_url: string | null;
    tone: string[];
    style_notes: string;
}

export interface ProjectBriefScrapedReference {
    url: string;
    dominant_style: string;
    key_sections: string[];
    what_client_liked: string;
}

export interface ProjectBriefTasteDirection {
    summary: string;
    liked_patterns: string[];
    disliked_patterns: string[];
    top_component_types: string[];
}

export interface ProjectBrief {
    project_id: string;
    client_snapshot: ProjectBriefClientSnapshot;
    pages_and_features: string[];
    brand_direction: ProjectBriefBrandDirection;
    scraped_references: ProjectBriefScrapedReference[];
    taste_direction: ProjectBriefTasteDirection;
    recommended_sections: string[];
    copy_direction: string;
    designer_notes: string;
    generated_at: string;
}

export const getProjectBrief = async (projectId: string): Promise<ProjectBrief> => {
    const response = await api.get(`/ai/project-brief/${projectId}`);
    return response.data;
};

export const refreshProjectBrief = async (projectId: string): Promise<void> => {
    await api.post(`/ai/project-brief/${projectId}/refresh`);
};