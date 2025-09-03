import {
    RiDashboardLine,
    RiProjectorLine,
    RiBriefcaseLine,
    RiBarChartLine,
    RiSwapLine,
    RiGlobalLine,
    RiChatQuoteLine,
    RiUserLine,
    RiBrain2Line 
} from 'react-icons/ri';
import { type IconType } from 'react-icons';

export interface MenuItem {
    id: string;
    name: string;
    icon: IconType;
    path: string;
    children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: RiDashboardLine,
        path: '/dashboard/designer'
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: RiProjectorLine,
        path: '/dashboard/designer/projects'
    },
    {
        id: 'my-projects',
        name: 'My Projects',
        icon: RiBriefcaseLine,
        path: '/dashboard/designer/my-project'
    },
    {
        id: 'briefs',
        name: 'Briefs',
        icon: RiBriefcaseLine,
        path: '/dashboard/designer/briefs'
    },
    {
        id: 'analytics',
        name: 'Analytics',
        icon: RiBarChartLine,
        path: '/dashboard/designer/analytics',
        children: [
            {
                id: 'analytics-overview',
                name: 'Overview',
                icon: RiBarChartLine,
                path: '/dashboard/designer/analytics/overview'
            },
            {
                id: 'analytics-performance',
                name: 'Performance',
                icon: RiBarChartLine,
                path: '/dashboard/designer/analytics/performance'
            },
            {
                id: 'analytics-reports',
                name: 'Reports',
                icon: RiBarChartLine,
                path: '/dashboard/designer/analytics/reports'
            }
        ]
    },
    {
        id: 'swiper',
        name: 'Swiper',
        icon: RiSwapLine,
        path: '/dashboard/designer/swiper'
    },
    {
        id: 'website-scraper',
        name: 'Website Scraper',
        icon: RiGlobalLine,
        path: '/dashboard/designer/website-scraper'
    },
    {
        id: 'testimonials',
        name: 'Testimonials',
        icon: RiChatQuoteLine,
        path: '/dashboard/designer/testimonials'
    },
    {
        id: 'aihelp',
        name: 'Ai Help',
        icon: RiBrain2Line,
        path: '/dashboard/designer/ai-help'
    },
    {
        id: 'daconsah',
        name: 'Daconsah',
        icon: RiUserLine,
        path: '/dashboard/designer/daconsah'
    },

];