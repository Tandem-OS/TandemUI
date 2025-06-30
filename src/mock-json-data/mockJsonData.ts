
// Mock API Data Objects
export const mockDashboardData = {
    metrics: {
        progressPercentage: 73,
        avgCompletionTime: 4.2,
        conversionRate: {
            proposalsSent: 45,
            clientsOnboarded: 32,
            percentage: 71
        }
    },
    projectStats: {
        totalActive: 12,
        approvalRate: 87,
        avgProjectTime: 3.8
    },
    customerSatisfaction: {
        overall: 92,
        byStage: {
            intake: { happy: 45, total: 48, rating: 8.7 },
            swiper: { happy: 42, total: 45, rating: 8.3 },
            scraper: { happy: 38, total: 42, rating: 8.5 },
            complete: { happy: 35, total: 38, rating: 9.1 }
        },
        recentFeedback: [
            { stage: "swiper", happy: true, rating: 9, comment: "Love the design options!" },
            { stage: "complete", happy: true, rating: 10, comment: "Exceeded expectations" }
        ]
    },
    tasteTrend: {
        trend: "Warm Minimalist",
        percentage: 73,
        weeklyData: true
    },
    projects: [
        {
            id: '1',
            name: 'OrbitRed Website',
            status: 'in-progress',
            statusLabel: 'In Progress',
            progress: 85,
            stages: {
                intake: { completed: true, locked: false },
                swiper: { completed: true, locked: false },
                scraper: { completed: true, locked: false },
                testimonial: { completed: false, locked: false },
                finalReview: { completed: false, locked: true }
            },
            feedbackThreads: 3,
            currentStage: 'scraper'
        },
        {
            id: '2',
            name: 'AI-Powered Brief',
            status: 'reviewing',
            statusLabel: 'Reviewing',
            progress: 40,
            stages: {
                intake: { completed: true, locked: false },
                swiper: { completed: true, locked: false },
                scraper: { completed: true, locked: false },
                testimonial: { completed: false, locked: true },
                finalReview: { completed: false, locked: true }
            },
            feedbackThreads: 2,
            currentStage: 'swiper'
        },
        {
            id: '3',
            name: 'Evolve UI Redesign',
            status: 'final-review',
            statusLabel: 'Review',
            progress: 92,
            stages: {
                intake: { completed: true, locked: false },
                swiper: { completed: true, locked: false },
                scraper: { completed: true, locked: false },
                testimonial: { completed: true, locked: false },
                finalReview: { completed: false, locked: false }
            },
            feedbackThreads: 5,
            currentStage: 'finalReview'
        }
    ]
};