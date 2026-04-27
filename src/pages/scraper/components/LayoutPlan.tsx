// src/scraper/components/LayoutPlan.tsx

import { useState, useEffect, useCallback } from 'react';
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
import Para from '../../../common-components/Para';

interface LayoutSection {
    id: string;
    section_type?: string
    layout_structure?: string;
    metadata?: {
        insight?: string;
        intent?: string;
        tone?: string;
        layout_structure?: string;
        section_type?: string;
        tags?: string[];
    };
    preview?: string;
}

interface LayoutPlanProps {
    sections: LayoutSection[];
    onUpdateSections: (sections: LayoutSection[]) => void;
}

const SortableItem = ({ section, onRemove, isOverlay = false }: {
    section: LayoutSection;
    onRemove: (id: string) => void;
    isOverlay?: boolean
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id, disabled: isOverlay });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || 'none',
    };

    const handleDelete = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(section.id);
    }, [section.id, onRemove]);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={isDragging ? 'z-50' : ''}
        >
            <motion.div
                initial={!isOverlay ? { opacity: 0, y: 10 } : {}}
                animate={!isOverlay ? { opacity: 1, y: 0 } : {}}
                exit={!isOverlay ? { opacity: 0, x: -20 } : {}}
                // ✅ FIX: Hover effects moved here to avoid conflicts and ensure smoothness.
                whileHover={!isOverlay ? {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    borderColor: 'var(--border-hover)'
                } : {}}
                transition={{ duration: 0.2, ease: "easeOut" }}
                // ✅ FIX: Removed "transition-all duration-200" and CSS hover classes.
                // dnd-kit will now handle the settling animation smoothly.
                className={`bg-background-secondary border border-border-default rounded-xl p-sm sm:p-md ${isDragging ? 'opacity-50 shadow-lg' : ''
                    } ${isOverlay ? 'shadow-2xl border-accent-default scale-105' : ''}`}
            >
                <div className="flex items-start gap-xs sm:gap-sm">
                    <div
                        {...attributes}
                        {...listeners}
                        className="pt-1 cursor-grab active:cursor-grabbing touch-none flex-shrink-0 p-1 hover:bg-background-primary rounded transition-colors duration-150"
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
                                    {section.metadata?.intent && (
                                        <Para size="xs" color="secondary" className="truncate max-w-[80px]">
                                            {section.metadata.intent}
                                        </Para>
                                    )}
                                </div>
                            </div>
                            {!isOverlay && (
                                <button
                                    onClick={handleDelete}
                                    className="p-1 hover:bg-background-primary rounded transition-colors duration-150 flex-shrink-0 group"
                                    type="button"
                                >
                                    <FaTrash className="text-text-tertiary group-hover:text-red-500 text-xs sm:text-sm transition-colors duration-150" />
                                </button>
                            )}
                        </div>
                        {section.metadata?.insight && (
                            <Para size="xs" color="secondary" className="mt-xs sm:mt-sm line-clamp-2">
                                {section.metadata.insight}
                            </Para>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// ... baaki poora component neeche waisa hi hai, usmein koi change nahi hai ...

const LayoutPlan = ({ sections, onUpdateSections }: LayoutPlanProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [layoutSections, setLayoutSections] = useState<LayoutSection[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        setLayoutSections(prevSections => {
            const existingIds = new Set(prevSections.map(s => s.id));
            const newSections = sections.filter(section => !existingIds.has(section.id));
            if (newSections.length > 0) {
                return [...prevSections, ...newSections];
            }
            const parentIds = new Set(sections.map(s => s.id));
            const keptSections = prevSections.filter(s => parentIds.has(s.id));
            if (keptSections.length !== prevSections.length) {
                return keptSections;
            }
            return prevSections;
        });
    }, [sections]);

    useEffect(() => {
        return () => {
            setActiveId(null);
        };
    }, []);

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setLayoutSections(prevSections => {
                const oldIndex = prevSections.findIndex((item) => item.id === active.id);
                const newIndex = prevSections.findIndex((item) => item.id === over.id);
                if (oldIndex === -1 || newIndex === -1) return prevSections;
                const newSections = arrayMove(prevSections, oldIndex, newIndex);
                onUpdateSections(newSections);
                return newSections;
            });
        }
        setActiveId(null);
    }, [onUpdateSections]);

    const removeSection = useCallback((id: string) => {
        setLayoutSections(prevSections => {
            const newSections = prevSections.filter(section => section.id !== id);
            onUpdateSections(newSections);
            return newSections;
        });
    }, [onUpdateSections]);

    const exportLayout = useCallback(() => {
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
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    }, [layoutSections]);

    const clearAll = useCallback(() => {
        setLayoutSections([]);
        onUpdateSections([]);
    }, [onUpdateSections]);

    const handleClose = useCallback(() => {
        setActiveId(null);
        setIsOpen(false);
    }, []);

    const activeSection = activeId ? layoutSections.find(s => s.id === activeId) : null;

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed top-16 sm:top-20 right-2 sm:right-6 bg-background-primary border border-border-default rounded-lg sm:rounded-xl px-sm sm:px-md py-xs sm:py-sm shadow-lg z-40 flex items-center gap-xs sm:gap-sm will-change-transform"
                type="button"
            >
                <FaLayerGroup className="text-accent-default text-icon-sm sm:text-icon-md" />
                <span className="text-text-primary font-medium text-para-sm sm:text-para-md hidden sm:inline">
                    Layout Plan
                </span>
                {layoutSections.length > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
                        className="bg-accent-default text-accent-foreground text-para-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                    >
                        {layoutSections.length}
                    </motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -30, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -30, x: '-50%' }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-20 left-1/2 transform bg-emerald-500 text-white px-lg py-md rounded-xl shadow-lg z-50 flex items-center gap-sm"
                    >
                        <FaDownload className="text-white" />
                        <span className="font-medium">Layout exported successfully!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/50 z-40"
                            style={{ pointerEvents: 'auto' }}
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background-primary shadow-2xl z-50 flex flex-col"
                            style={{ pointerEvents: 'auto' }}
                        >
                            <div className="p-md sm:p-lg border-b border-border-default flex items-center justify-between">
                                <div>
                                    <Heading level="h5">Your Layout Draft</Heading>
                                    <Para size="sm" color="secondary" className="mt-xs">
                                        {layoutSections.length} section{layoutSections.length !== 1 ? 's' : ''} selected
                                    </Para>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-background-secondary rounded-lg transition-colors duration-150"
                                    type="button"
                                >
                                    <FaTimes className="text-text-secondary text-icon-sm sm:text-icon-md" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-md sm:p-lg">
                                {layoutSections.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center py-lg sm:py-xl"
                                    >
                                        <FaLayerGroup className="text-text-tertiary text-5xl sm:text-6xl mx-auto mb-md opacity-50" />
                                        <Heading level="h6" color="secondary" className="mb-sm">
                                            No sections added yet
                                        </Heading>
                                        <Para size="sm" color="tertiary" className="mb-md">
                                            Click "Use this section" on any section you like
                                        </Para>
                                        <div className="bg-background-secondary rounded-lg p-sm border border-border-default">
                                            <Para size="xs" color="secondary">
                                                💡 Tip: Build your layout by selecting sections that match your vision
                                            </Para>
                                        </div>
                                    </motion.div>
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
                                                <AnimatePresence>
                                                    {layoutSections.map((section) => (
                                                        <SortableItem
                                                            key={section.id}
                                                            section={section}
                                                            onRemove={removeSection}
                                                        />
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </SortableContext>

                                        <DragOverlay>
                                            {activeSection && (
                                                <SortableItem
                                                    section={activeSection}
                                                    onRemove={() => { }}
                                                    isOverlay={true}
                                                />
                                            )}
                                        </DragOverlay>
                                    </DndContext>
                                )}
                            </div>

                            {layoutSections.length > 0 ? (
                                <div className="p-md sm:p-lg border-t border-border-default space-y-sm">
                                    <button
                                        onClick={exportLayout}
                                        className="w-full bg-accent-default text-accent-foreground py-sm sm:py-md rounded-xl font-medium hover:bg-accent-hover transition-all duration-200 flex items-center justify-center gap-sm hover:scale-[1.02]"
                                        type="button"
                                    >
                                        <FaDownload className="text-icon-sm" />
                                        Export Layout Plan
                                    </button>
                                    <button
                                        onClick={clearAll}
                                        className="w-full bg-background-secondary text-text-secondary py-sm sm:py-md rounded-xl font-medium hover:bg-background-muted transition-all duration-200"
                                        type="button"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            ) : (
                                <div className="p-md sm:p-lg border-t border-border-default">
                                    <button
                                        disabled
                                        className="w-full bg-background-muted text-text-tertiary py-sm sm:py-md rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-sm opacity-50"
                                        type="button"
                                    >
                                        <FaDownload className="text-icon-sm" />
                                        Export Layout Plan
                                    </button>
                                    <Para size="xs" color="tertiary" align="center" className="mt-sm">
                                        Select sections to build your layout
                                    </Para>
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