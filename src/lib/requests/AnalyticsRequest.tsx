import api from '@/lib/requests/Axios';

export const getDesignerStats = async (designerEmail: string) => {
    return await api.get(`/analytics/designer/stats?designer_email=${designerEmail}`);
};