interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function FreeModal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null; // 🛡️ don't render anything if closed

  
  return (

<div className="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto pointer-events-none">
  {/* 🔵 BACKDROP */}
  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 pointer-events-auto"></div>

  {/* 🔴 MODAL CONTAINER */}
  <div className="relative z-100 w-full max-w-lg rounded-xl shadow-lg max-h-screen
   scrollbar-hide overflow-y-auto p-4 mt-10 pb-20 pointer-events-auto">
    <button
      onClick={onClose}
      className="absolute top-4 right-6 text-gray-600 text-3xl hover:text-black"
    >
      ✕
    </button>

    {children}
  </div>
</div>
  );
}