import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { Lock , Dumbbell} from "lucide-react";


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
                        <div className="w-full h-32 bg-[url('/images/greyscale/strengtharchive.webp')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                className="w-full h-full bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] flex flex-col justify-center items-center text-center p-2">
                                <div
                                    className="flex text-3xl items-center gap-2 font-semibold" >
                                    <Dumbbell />
                                    FitnessTracker
                                </div>
                                <h2 className="text-md font-bold text-white">Log It. Lift It. Level Up.</h2>
                            </div>
                        </div>
                    </button>


                </>
            ) : (
                <>


                    <button onClick={() => {
                        setSelectedPage("FitnessTracker");
                        setSelectedSector2("newsession");
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>
                        <div className="w-full h-32 bg-[url('/images/greyscale/strengtharchive.webp')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                className="w-full h-full bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] flex flex-col justify-center items-center text-center p-2">
                                <div
                                    className="flex text-3xl items-center gap-2 font-semibold" >
                                    <Lock />
                                    FitnessTracker
                                </div>
                                <h2 className="text-md font-bold text-white">Access Restricted.</h2>
                            </div>
                        </div>
                    </button>

                </>
            )}

        </>

    );
}
