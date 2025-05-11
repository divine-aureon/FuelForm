// 🟢 Remove isOpen from props
interface FitnessModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function FitnessGoalsModal({ onClose, children }: FitnessModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0  backdrop-blur-md z-0"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-lg rounded-xl shadow-lg max-h-screen scrollbar-hide overflow-hidden p-4">
        <button
          onClick={onClose}
          className="absolute z-30 top-12 right-8 text-white text-3xl hover:text-indigo-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
