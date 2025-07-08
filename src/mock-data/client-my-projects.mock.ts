import type { Project } from "../types/project.type";

export const mockProjects: Project[] = [
    {
        id: '1',
        title: 'E-commerce Platform Redesign',
        category: 'Web Design',
        designer: 'Sarah Johnson',
        designerImage: '/images/avatar.png',
        progress: 85,
        status: 'in-progress',
        currentStage: 'Review & Feedback',
        feedbackCount: 12,
        createdAt: '2024-01-15',
        description: 'Complete redesign of the e-commerce platform with modern UI/UX principles',
        tags: ['UI/UX', 'E-commerce', 'Responsive', 'Modern']
    },
    {
        id: '2',
        title: 'Mobile Banking App',
        category: 'Mobile App',
        designer: 'Michael Chen',
        designerImage: '/images/avatar.png',
        progress: 100,
        status: 'completed',
        currentStage: 'Project Delivered',
        feedbackCount: 8,
        createdAt: '2023-12-01',
        completedAt: '2024-01-20',
        description: 'Intuitive mobile banking application with advanced security features',
        tags: ['Mobile', 'Banking', 'Security', 'iOS', 'Android']
    },
    {
        id: '3',
        title: 'Corporate Website Revamp',
        category: 'Web Design',
        designer: 'Emily Rodriguez',
        designerImage: '/images/avatar.png',
        progress: 65,
        status: 'in-progress',
        currentStage: 'Design Development',
        feedbackCount: 5,
        createdAt: '2024-01-10',
        description: 'Professional corporate website with integrated CMS and SEO optimization',
        tags: ['Corporate', 'CMS', 'SEO', 'Professional']
    },
    {
        id: '4',
        title: 'SaaS Dashboard Interface',
        category: 'Web Application',
        designer: 'David Kim',
        designerImage: '/images/avatar.png',
        progress: 100,
        status: 'completed',
        currentStage: 'Project Delivered',
        feedbackCount: 15,
        createdAt: '2023-11-20',
        completedAt: '2024-01-05',
        description: 'Comprehensive dashboard interface for SaaS platform with analytics',
        tags: ['SaaS', 'Dashboard', 'Analytics', 'Data Visualization']
    },
    {
        id: '5',
        title: 'Healthcare Patient Portal',
        category: 'Web Application',
        designer: 'Lisa Thompson',
        designerImage: '/images/avatar.png',
        progress: 40,
        status: 'in-progress',
        currentStage: 'Wireframing',
        feedbackCount: 3,
        createdAt: '2024-01-25',
        description: 'Secure patient portal for healthcare providers with appointment scheduling',
        tags: ['Healthcare', 'Portal', 'Security', 'Appointments']
    },
    {
        id: '6',
        title: 'Food Delivery App Design',
        category: 'Mobile App',
        designer: 'James Wilson',
        designerImage: '/images/avatar.png',
        progress: 100,
        status: 'completed',
        currentStage: 'Project Delivered',
        feedbackCount: 10,
        createdAt: '2023-10-15',
        completedAt: '2023-12-20',
        description: 'User-friendly food delivery app with real-time tracking and payments',
        tags: ['Food', 'Delivery', 'Real-time', 'Payments']
    },
    {
        id: '7',
        title: 'Educational Platform UI',
        category: 'Web Application',
        designer: 'Maria Garcia',
        designerImage: '/images/avatar.png',
        progress: 75,
        status: 'in-progress',
        currentStage: 'UI Implementation',
        feedbackCount: 7,
        createdAt: '2024-01-05',
        description: 'Interactive educational platform with course management and progress tracking',
        tags: ['Education', 'E-learning', 'Interactive', 'Progress Tracking']
    },
    {
        id: '8',
        title: 'Real Estate Listing Platform',
        category: 'Web Design',
        designer: 'Robert Anderson',
        designerImage: '/images/avatar.png',
        progress: 100,
        status: 'completed',
        currentStage: 'Project Delivered',
        feedbackCount: 6,
        createdAt: '2023-09-10',
        completedAt: '2023-11-15',
        description: 'Comprehensive real estate platform with advanced search and filtering',
        tags: ['Real Estate', 'Search', 'Filtering', 'Property Management']
    }
];

export const mockProjectOverview = {
    id: '1',
    title: 'E-commerce Platform Redesign with Advanced Analytics Dashboard',
    category: 'Web Design',
    designer: 'Sarah Johnson',
    designerImage: '/images/avatar.png',
    designerRating: 4.9,
    progress: 80,
    createdAt: '2024-01-15',
    tags: ['UI/UX', 'E-commerce', 'Responsive', 'Analytics'],
    totalStages: 6,
    completedStages: 4,
    stages: [
        {
            id: 'intake',
            name: 'Intake',
            status: 'completed',
            description: 'Requirements'
        },
        {
            id: 'swiper',
            name: 'Swiper',
            status: 'completed',
            description: 'Design exploration'
        },
        {
            id: 'scraper',
            name: 'Scraper',
            status: 'completed',
            description: 'Data collection'
        },
        {
            id: 'testimonials',
            name: 'Testimonials',
            status: 'completed',
            description: 'Client feedback'
        },
        {
            id: 'review',
            name: 'Review',
            status: 'current',
            description: 'Final review'
        },
        {
            id: 'delivery',
            name: 'Project Delivered',
            status: 'pending',
            description: 'Final delivery'
        }
    ],
    feedbackCount: 8,
    feedback: [
        {
            id: '1',
            message: 'The new dashboard layout is fantastic! The data visualization is exactly what we needed.',
            timestamp: '2024-02-14T14:30:00Z',
            status: 'resolved',
            priority: 'high'
        },
        {
            id: '2',
            message: 'Mobile responsiveness looks perfect. Great attention to detail.',
            timestamp: '2024-02-13T09:15:00Z',
            status: 'resolved',
            priority: 'medium'
        },
        {
            id: '3',
            message: 'Could we adjust the color contrast on the secondary buttons?',
            timestamp: '2024-02-12T16:45:00Z',
            status: 'pending',
            priority: 'low'
        }
    ]
};