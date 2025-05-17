// 🟢 Remove isOpen from props
interface SettingsModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function SettingsModal({ onClose, children }: SettingsModalProps) {
  return (
    <div className="fixed inset-0 backdrop-blur-md z-40 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-md rounded-xl min-h-screen scrollbar-hide p-2 pb-20">
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
