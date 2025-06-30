export interface MenuItem {
    id: string;
    name: string;
    path: string;
}

export const menuItems: MenuItem[] = [
    {
        id: 'projects',
        name: 'My Projects',
        path: '/client-dashboard'
    },
    {
        id: 'support',
        name: 'Support',
        path: '/support'
    }
];