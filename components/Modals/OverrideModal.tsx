// 🟢 Remove isOpen from props
interface OverrideModalProps {
  onClose: () => void;
  onOverrideDawn: () => void;
  onOverrideDusk: () => void;
  children: React.ReactNode;
}

export function OverrideModal({
  onClose,
  onOverrideDawn,
  onOverrideDusk,
  children,
}: OverrideModalProps) {
   return (

    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-lg rounded-xl shadow-lg max-h-screen scrollbar-hide overflow-y-auto p-4 pb-20">
        <button
          onClick={onClose}
          className="absolute z-30 top-3 right-5 text-white text-3xl hover:text-indigo-300"
        >
          ✕
        </button>
        {children}
      </div>
      
    </div>
  );
}
