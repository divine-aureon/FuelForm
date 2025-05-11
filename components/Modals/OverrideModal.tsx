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

    <div className="fixed inset-0 z-40  flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md  z-0"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-lg shadow-lg overflow-hidden max-h-screen scrollbar-hide pb-20 p-4">
        <button
          onClick={onClose}
          className="z-30 fixed top-12 right-8 text-white text-3xl hover:text-indigo-300"
        >
          ✕
        </button>
        {children}
      </div>
      
    </div>
  );
}
