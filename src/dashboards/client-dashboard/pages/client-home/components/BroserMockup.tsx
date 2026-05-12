import { motion } from 'framer-motion';
import { RiWindowLine, RiMore2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { getAllProjectCompose } from '@/lib/requests/CompositionRequest';
import CompositionRenderer from '@/pages/Renderer/CompositionRenderer';
import type { ComposeResponse } from '@/lib/requests/CompositionRequest';


const BrowserMockup: React.FC = () => {
    const [compose, setCompose] = useState<ComposeResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProjectCompose()
            .then((data) => setCompose(data))
            .catch(() => setCompose(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <motion.div
            className="h-full min-h-[300px] sm:min-h-[400px] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ willChange: 'opacity' }}
        >
            {/* Browser Chrome — untouched */}
            <div className="bg-gradient-to-r from-background-muted to-background-secondary rounded-t-xl sm:rounded-t-2xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-b border-border-default">
                <div className="flex gap-1.5 sm:gap-2">
                    {['bg-red-500', 'bg-yellow-500', 'bg-green-500'].map((color) => (
                        <motion.div
                            key={color}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${color} shadow-sm`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
                <div className="flex-1 mx-2 sm:mx-4">
                    <div className="bg-background-primary-2 rounded-md sm:rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 shadow-inner">
                        <RiWindowLine className="text-text-tertiary text-xs sm:text-sm hidden sm:block" />
                        <span className="text-xs sm:text-sm text-text-secondary font-medium truncate">
                            tandem.design/preview
                        </span>
                        <motion.div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full ml-auto"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </div>
                <RiMore2Fill className="text-text-tertiary text-sm sm:text-base" />
            </div>

            {/* Browser Content — only this div's children change */}
            <div className="flex-1 bg-gradient-to-br from-background-secondary via-background-muted to-background-secondary rounded-b-xl sm:rounded-b-2xl flex items-center justify-center relative overflow-hidden">

                {loading ? (
                    /* Spinner while fetching */
                    <div className="w-8 h-8 border-4 border-border-muted border-t-accent-default rounded-full animate-spin" />

                ) : compose?.page_schema?.sections?.length ? (
                    /* Compose exists — zoom shrinks layout + visual, no phantom space, no horizontal scroll */
                    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
                        <div
                            style={{
                                zoom: 0.35,
                                width: '100%',
                                pointerEvents: 'none',
                            }}
                        >
                            <CompositionRenderer
                                compositionId={compose.composition_id}
                            />
                        </div>
                    </div>

                ) : (
                    /* No compose — original mockup content, untouched */
                    <div className="p-6 sm:p-8 lg:p-12 w-full h-full flex items-center justify-center relative">
                        <motion.div
                            className="absolute top-4 left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-4 right-4 w-5 h-5 sm:w-6 sm:h-6 bg-purple-500/20 rounded-full"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                        <div className="text-center relative z-10">
                            <motion.div
                                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-background-muted to-background-secondary rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                            <motion.h3
                                className="text-lg sm:text-xl lg:text-2xl font-bold text-text-secondary mb-2 sm:mb-3"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Live Preview Loading...
                            </motion.h3>
                            <motion.p
                                className="text-xs sm:text-sm text-text-tertiary max-w-xs mx-auto px-4"
                                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                                animate={{ opacity: 1, transform: 'translateY(0)' }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                style={{ willChange: 'transform, opacity' }}
                            >
                                Your website design will appear here as our team builds it
                            </motion.p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default BrowserMockup;