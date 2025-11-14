interface ModalWrapperProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function ModalWrapper({ onClose, children }: ModalWrapperProps) {
    return (
        <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
