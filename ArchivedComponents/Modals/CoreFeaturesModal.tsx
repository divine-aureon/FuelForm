// 🟢 Remove isOpen from props
import { CircleX } from 'lucide-react';

interface CoreFeaturesModalProps {
  onClose: () => void;
  children: React.ReactNode;

}

export function CoreFeaturesModal({ onClose, children }: CoreFeaturesModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center backdrop-blur-md justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-0"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-md rounded-xl max-h-screen scrollbar-hide overflow-hidden p-4 pb-20">
        <button
          onClick={onClose}
          className="absolute z-30 top-7 right-7  max-w-md  text-white text-3xl hover:text-indigo-300"
        >
          <CircleX size={35}/>
        </button>
        {children}
      </div>
    </div>
  );
}
