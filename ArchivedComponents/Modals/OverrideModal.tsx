
import { useGlobalData } from "@/app/initializing/Global/GlobalData";


interface OverrideModalProps {
  onOverrideDawn: () => void;
  onOverrideDusk: () => void;
  children: React.ReactNode;
}

export function OverrideModal({
  onOverrideDawn,
  onOverrideDusk,
  children,
}: OverrideModalProps) {

    const isOverrideOpen = useGlobalData((s) => s.isOverrideOpen);
  const setOverrideOpen = useGlobalData((s) => s.setOverrideOpen);

   return (

    <div className="fixed inset-0 z-40  flex items-center justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md  z-0"
        onClick={() => setOverrideOpen(false)}
      />
      {/* Modal */}
      <div className="relative z-60 w-full max-w-md overflow-hidden max-h-screen scrollbar-hide pb-20 p-2">
        <button
           onClick={() => setOverrideOpen(false)}
          className="z-30 fixed top-12 right-8 text-white text-3xl hover:text-indigo-300"
        >
          ✕
        </button>
        {children}
      </div>
      
    </div>
  );
}
