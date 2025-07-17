export interface Project {
    id: string;
    title: string;
    category: string;
    designer: string;
    designerImage: string;
    progress: number;
     status: 'completed' | 'in-progress' | 'not-started';
    currentStage: string;
    feedbackCount: number;
    createdAt: string;
    completedAt?: string;
    description: string;
    tags: string[];
}
