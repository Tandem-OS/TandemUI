import {
    RiDashboardLine,
    RiBriefcaseLine,
    RiGlobalLine,
    RiChatQuoteLine,
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
        id: 'my-projects',
        name: 'My Projects',
        icon: RiBriefcaseLine,
        path: '/dashboard/designer/my-project'
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
];