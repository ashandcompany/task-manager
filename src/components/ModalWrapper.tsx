import { motion } from "framer-motion";

interface ModalWrapperProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalWrapper({ onClose, children }: ModalWrapperProps) {
    return (
        <motion.div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
