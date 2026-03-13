import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompose } from '@/lib/requests/CompositionRequest';
import HeroRenderer from '@/pages/Renderer/HeroRenderer';
import NavRenderer from '@/pages/Renderer/NavRenderer';
import type { ComposeSection } from '@/pages/Renderer/CompositionType';

// ── CompositionRenderer
const CompositionRenderer: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [sections, setSections] = useState<ComposeSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getCompose(id);
                setSections(result?.page_schema?.sections ?? []);
            } catch (err) {
                console.error('[CompositionRenderer] fetch failed:', err);
                setError('Failed to load composition.');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <div className="w-10 h-10 border-4 border-border-muted border-t-accent-default rounded-full animate-spin" />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <p className="text-text-secondary">{error}</p>
        </div>
    );

    if (sections.length === 0) return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <p className="text-text-secondary">No sections found in this composition.</p>
        </div>
    );

    const heroSections = sections.filter(s => s.category === 'hero');
    const navSections  = sections.filter(s => s.category === 'nav');

    return (
        <>
            <NavRenderer sections={navSections} />
            <HeroRenderer sections={heroSections} />
        </>
    );
};

export default CompositionRenderer;