// src/scraper/components/LayoutPlan.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLayerGroup, FaTimes, FaGripVertical, FaDownload, FaTrash } from 'react-icons/fa';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Heading from '../../../components/demos/typography/Heading';
import Para from '../../../comman-components/Para';

interface LayoutSection {
    id: string;
    section_type: string;
    layout_structure: string;
    metadata: {
        insight: string;
        intent: string;
        tone: string;
    };
    preview?: string;
}

interface LayoutPlanProps {
    sections: LayoutSection[];
    onUpdateSections: (sections: LayoutSection[]) => void;
}

// Sortable Item Component
const SortableItem = ({ section, onRemove, isOverlay = false }: { section: LayoutSection; onRemove: (id: string) => void; isOverlay?: boolean }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <motion.div
            ref={!isOverlay ? setNodeRef : undefined}
            style={!isOverlay ? style : undefined}
            initial={!isOverlay ? { opacity: 0, y: 20 } : undefined}
            animate={!isOverlay ? { opacity: 1, y: 0 } : undefined}
            exit={!isOverlay ? { opacity: 0, x: -20 } : undefined}
            className={`bg-background-secondary border border-border-default rounded-xl p-sm sm:p-md transition-shadow select-none ${isDragging ? 'shadow-lg z-50' : 'hover:shadow-md'
                } ${isOverlay ? 'shadow-2xl border-accent-default' : ''}`}
            draggable={false} // Disable HTML5 drag
        >
            <div className="flex items-start gap-xs sm:gap-sm">
                <div
                    {...(!isOverlay ? attributes : {})}
                    {...(!isOverlay ? listeners : {})}
                    className="pt-1 cursor-grab active:cursor-grabbing touch-none"
                    draggable={false} // Disable HTML5 drag on grip
                >
                    <FaGripVertical className="text-text-tertiary text-sm sm:text-base" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-xs">
                        <div className="flex-1 min-w-0">
                            <Heading level="h6" className="truncate">
                                {section.section_type}
                            </Heading>
                            <div className="flex items-center gap-xs mt-xs flex-wrap">
                                <Para size="xs" color="secondary" className="truncate max-w-[120px]">
                                    {section.layout_structure}
                                </Para>
                                <span className="text-text-tertiary">•</span>
                                <Para size="xs" color="secondary" className="truncate max-w-[80px]">
                                    {section.metadata.intent}
                                </Para>
                            </div>
                        </div>
                        {!isOverlay && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onRemove(section.id);
                                }}
                                className="p-1 hover:bg-background-primary rounded transition-colors flex-shrink-0"
                                draggable={false} // Disable HTML5 drag
                            >
                                <FaTrash className="text-text-tertiary hover:text-red-500 text-xs sm:text-sm" />
                            </button>
                        )}
                    </div>
                    <Para size="xs" color="secondary" className="mt-xs sm:mt-sm line-clamp-2">
                        {section.metadata.insight}
                    </Para>
                </div>
            </div>
        </motion.div>
    );
};

const LayoutPlan = ({ sections, onUpdateSections }: LayoutPlanProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [layoutSections, setLayoutSections] = useState<LayoutSection[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Update layoutSections when sections prop changes, avoiding duplicates
    useEffect(() => {
        setLayoutSections(prevSections => {
            const existingIds = new Set(prevSections.map(s => s.id));
            const newSections = sections.filter(section => !existingIds.has(section.id));

            if (newSections.length > 0) {
                return [...prevSections, ...newSections];
            }

            return prevSections;
        });
    }, [sections]);

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = layoutSections.findIndex((item) => item.id === active.id);
            const newIndex = layoutSections.findIndex((item) => item.id === over.id);

            const newSections = arrayMove(layoutSections, oldIndex, newIndex);
            setLayoutSections(newSections);
            onUpdateSections(newSections);
        }

        setActiveId(null);

        // Ensure pointer capture is released
        setTimeout(() => {
            document.querySelectorAll('*').forEach(el => {
                el.releasePointerCapture(1);
            });
        }, 100);
    };

    const removeSection = (id: string) => {
        const newSections = layoutSections.filter(section => section.id !== id);
        setLayoutSections(newSections);
        onUpdateSections(newSections);
    };

    const exportLayout = () => {
        const layoutData = {
            createdAt: new Date().toISOString(),
            sections: layoutSections,
            metadata: {
                totalSections: layoutSections.length,
                sectionTypes: [...new Set(layoutSections.map(s => s.section_type))]
            }
        };

        const blob = new Blob([JSON.stringify(layoutData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `layout-plan-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const activeSection = activeId ? layoutSections.find(s => s.id === activeId) : null;

    return (
        <>
            {/* Fixed Button - Mobile Responsive */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed top-16 sm:top-20 right-2 sm:right-6 bg-background-primary border border-border-default rounded-lg sm:rounded-xl px-sm sm:px-md py-xs sm:py-sm shadow-lg hover:shadow-xl transition-all z-40 flex items-center gap-xs sm:gap-sm"
                draggable={false} // Disable HTML5 drag
            >
                <FaLayerGroup className="text-accent-default text-icon-sm sm:text-icon-md" />
                <span className="text-text-primary font-medium text-para-sm sm:text-para-md hidden sm:inline">
                    Layout Plan
                </span>
                {layoutSections.length > 0 && (
                    <span className="bg-accent-default text-accent-foreground text-para-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                        {layoutSections.length}
                    </span>
                )}
            </motion.button>

            {/* Slide-out Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40"
                        />

                        {/* Panel - Mobile Responsive */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background-primary shadow-2xl z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-md sm:p-lg border-b border-border-default flex items-center justify-between">
                                <div>
                                    <Heading level="h5">Your Layout Draft</Heading>
                                    <Para size="sm" color="secondary" className="mt-xs">
                                        {layoutSections.length} section{layoutSections.length !== 1 ? 's' : ''} selected
                                    </Para>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-background-secondary rounded-lg transition-colors"
                                    draggable={false} // Disable HTML5 drag
                                >
                                    <FaTimes className="text-text-secondary text-icon-sm sm:text-icon-md" />
                                </button>
                            </div>

                            {/* Sections List */}
                            <div className="flex-1 overflow-y-auto p-md sm:p-lg">
                                {layoutSections.length === 0 ? (
                                    <div className="text-center py-lg sm:py-xl">
                                        <FaLayerGroup className="text-text-tertiary text-5xl sm:text-6xl mx-auto mb-md" />
                                        <Para color="secondary">No sections added yet</Para>
                                        <Para size="sm" color="tertiary" className="mt-sm">
                                            Click "Use this section" on any section you like
                                        </Para>
                                    </div>
                                ) : (
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                    >
                                        <SortableContext
                                            items={layoutSections.map(s => s.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            <div className="space-y-sm">
                                                {layoutSections.map((section) => (
                                                    <SortableItem
                                                        key={section.id}
                                                        section={section}
                                                        onRemove={removeSection}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>

                                        <DragOverlay>
                                            {activeSection && (
                                                <SortableItem
                                                    section={activeSection}
                                                    onRemove={() => { }} // No-op for overlay
                                                    isOverlay={true}
                                                />
                                            )}
                                        </DragOverlay>
                                    </DndContext>
                                )}
                            </div>

                            {/* Footer Actions */}
                            {layoutSections.length > 0 && (
                                <div className="p-md sm:p-lg border-t border-border-default space-y-sm">
                                    <button
                                        onClick={exportLayout}
                                        className="w-full bg-accent-default text-accent-foreground py-sm sm:py-md rounded-xl font-medium hover:bg-accent-hover transition-colors flex items-center justify-center gap-sm"
                                        draggable={false} // Disable HTML5 drag
                                    >
                                        <FaDownload className="text-icon-sm" />
                                        Export Layout Plan
                                    </button>
                                    <button
                                        onClick={() => {
                                            setLayoutSections([]);
                                            onUpdateSections([]);
                                        }}
                                        className="w-full bg-background-secondary text-text-secondary py-sm sm:py-md rounded-xl font-medium hover:bg-background-muted transition-colors"
                                        draggable={false} // Disable HTML5 drag
                                    >
                                        Clear All
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default LayoutPlan;