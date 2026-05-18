import {
    RiDashboardLine,
    RiBriefcaseLine,
    RiGlobalLine,
    RiChatQuoteLine,
    RiCurrencyLine,
    RiSettings3Line,
    RiBankCardLine,
    RiShieldCheckLine,
    RiCalendarLine,
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
   {
id: 'subscription',
    name: 'Subscription Plans',
    icon: RiCurrencyLine,
    path: '',  
    children: [
        {
            id: 'billing-subscription',
            name: 'Subscription',
            icon: RiShieldCheckLine,
            path: '/dashboard/designer/billing/subscription'   
        },
        {
            id: 'billing-billing',
            name: 'Billing',
            icon: RiBankCardLine,
            path: '/dashboard/designer/billing/overview'       // SubscriptionOverviewPage
        },
        {
            id: 'billing-payment',
            name: 'Payment methods',
            icon: RiBankCardLine,
            path: '/dashboard/designer/billing/payment-methods' 
        },
        {
            id: 'billing-invoices',
            name: 'Invoices',
            icon: RiCalendarLine,
            path: '/dashboard/designer/billing/invoices'      
        },
        {
            id: 'billing-history',
            name: 'Billing history',
            icon: RiCalendarLine,
            path: '/dashboard/designer/billing/history'        
        },
        {
            id: 'billing-account',
            name: 'Account',
            icon: RiSettings3Line,
            path: '/dashboard/designer/billing/account'        
        },
    ]
},
];