import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
// Toast Component
const Toast = ({ message, type = 'success' }: { message: string; type?: 'success' | 'error' }) => (
    <motion.div
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -20, x: '-50%' }}
        className={`fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 px-md sm:px-lg py-sm sm:py-md rounded-lg sm:rounded-xl shadow-xl flex items-center gap-sm z-50 ${type === 'success'
            ? 'bg-emerald-500 text-white'
            : 'bg-red-500 text-white'
            }`}
    >
        <FaCheck className="text-icon-sm sm:text-icon-md" />
        <span className="font-medium text-para-sm sm:text-para-md">{message}</span>
    </motion.div>
);

export default Toast