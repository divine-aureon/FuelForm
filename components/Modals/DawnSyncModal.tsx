// 🟢 Remove isOpen from props
interface DawnModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function DawnSyncModal({ onClose, children }: DawnModalProps) {
  return (
    <div className="fixed inset-0 z-40 backdrop-blur-md flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-lg rounded-xl shadow-lg max-h-screen scrollbar-hide overflow-hidden p-4 pb-20">
        <button
          onClick={onClose}
          className="absolute z-30 top-9 right-7 text-white text-3xl hover:text-indigo-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
