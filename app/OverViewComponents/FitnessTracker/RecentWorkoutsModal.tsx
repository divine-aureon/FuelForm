import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { format } from "date-fns";

export default function RecentWorkoutsModal({ isWorkoutsOpen, onWorkoutsClose }: { isWorkoutsOpen: boolean; onWorkoutsClose: () => void }) {

    const fitnessHistory = useGlobalData((s) => s.fitnessHistory); // full fitness collection from ZenState

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

                {recentSessions.map(([date, session]: any) => (
                    <div key={date} className="mb-4">
                        <h3 className="text-lg font-semibold">{format(new Date(date), "MMM d, yyyy")}</h3>
                        {Object.entries(session)
                            .filter(([key]) => ![
                                "split",
                                "completed",
                                "fitnessSync",
                                "StartTime",
                                "EndTime",
                                "whichProfile",
                                "bodygroup"
                            ].includes(key))
                            .map(([movement, sets]: any) => (
                                <div key={movement} className="ml-2 mt-1">
                                    <p className="font-semibold">{movement}</p>
                                    {Object.entries(sets).map(([setKey, setData]: any) => (
                                        <p key={setKey} className="text-sm ml-2">
                                            Set {setKey}: {setData.reps} reps @ {setData.liftWeight_lbs} lbs
                                            {setData.locked && " (Locked)"}
                                        </p>
                                    ))}
                                </div>
                            ))}

                    </div>
                ))}
            </div>
        </div>
    );
}
