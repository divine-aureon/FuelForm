// 🟢 Remove isOpen from props

interface UnlockModalProps {
    onClose: () => void;
    children: React.ReactNode;
  }
  
  export function UnlockModal({ onClose, children }: UnlockModalProps) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center pt-16 overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 backdrop-blur-md z-0"
          onClick={onClose}
        />
        {/* Modal */}
        <div className="relative z-60 w-full max-w-lg rounded-xl shadow-lg max-h-screen scrollbar-hide overflow-hidden p-4 pb-20">
          <button
            onClick={onClose}
            className="absolute z-30 top-5 right-8 text-white text-3xl hover:text-indigo-300"
          >
            ✕
          </button>
       
          {children}
     
        </div>
      </div>
    );
  }
  