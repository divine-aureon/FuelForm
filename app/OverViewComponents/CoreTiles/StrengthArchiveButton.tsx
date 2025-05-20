import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { Lock, Dumbbell } from "lucide-react";


export default function StrengthArchiveTile() {

    const selectedPage = useGlobalData((s) => s.selectedPage);
    const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
    const userProfile = useGlobalData((s) => s.userProfile);
    const setSelectedSector2 = useGlobalData((s) => s.setSelectedSector2);


    const setIsOpen = useGlobalData((s) => s.setIsOpen);
    return (

        <>
            {userProfile?.isPaid ? (
                <>
                    <button onClick={() => {
                        setSelectedPage("FitnessTracker");
                        setSelectedSector2("newsession");
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>
                        <div className="w-full h-[100px] bg-[url('/images/greyscale/fitness.jpg')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                className="w-full h-[100px] bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] h-[100px]  w-full rounded-xl py-4 leading-none justify-center flex flex-col items-center hover:bg-indigo-300/50 text-white shadow-md">
                                <div className=" flex leading-none justify-center flex-col items-center gap-2 font-semibold" >
                                     Fitness<br/>Tracker<br/>
                                    <Dumbbell size={36} />
                                   
                                </div>
                            </div>
                        </div>
                    </button>


                </>
            ) : (
                <>

                    <button 
                    disabled>
                        <div className="w-full h-[100px] bg-[url('/images/greyscale/fitness.jpg')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                className="w-full h-[100px] bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] h-[100px]  w-full rounded-xl py-4 leading-none justify-center flex flex-col items-center text-white shadow-md">
                                <div className="flex leading-none justify-center flex-col items-center gap-2 font-semibold" >
                                     Fitness<br/>Tracker<br/>
                                    <Lock size={36} />
                                   
                                </div>
                            </div>
                        </div>
                    </button>

                </>
            )}

        </>

    );
}
