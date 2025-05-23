import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";
import { format } from "date-fns";
import FitHistoryComponent from "./FitHistoryComponent"

export default function RecentWorkoutsModal({ isWorkoutsOpen, onWorkoutsClose }: { isWorkoutsOpen: boolean; onWorkoutsClose: () => void }) {

    const fitnessHistorySTORE = getGlobalDataState().fitnessHistorySTORE;

    const fitnessHistory = fitnessHistorySTORE;

    const recentSessions = Object.entries(fitnessHistory || {})
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .slice(0, 3);

    if (!isWorkoutsOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-black rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Workouts</h2>
                    <button onClick={onWorkoutsClose} className="text-sm hover:underline text-white/60">Close</button>
                </div>

                <FitHistoryComponent />
            </div>
        </div>
    );
}
