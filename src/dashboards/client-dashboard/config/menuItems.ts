export interface MenuItem {
    id: string;
    name: string;
    path: string;
}

export const menuItems: MenuItem[] = [
    {
        id: 'projects',
        name: 'My Projects',
        path: '/dashboard/client/my-project'
    },
    {
        id: 'support',
        name: 'Support',
        path: '/dashboard/client/support'
    },
    {
        id: 'swiper',
        name: 'Swiper',
        path: '/dashboard/client/swiper'
    }
];