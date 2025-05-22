import { useEffect, useState } from 'react'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useAuth from '@/lib/useAuth'
import useCoreData from "@/lib/hooks/CoreData";
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { UserProfile } from "../../initializing/Global/BodySyncManifest"

export default function Thanks4UpgradeDrop() {

          const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

    const { user } = useAuth();
    const [dropSeen, setDropSeen] = useState(false)

    //this will come in FALSE 
    const currentDropStatus = userProfile?.pulseSettings?.pulseMemory.Thanks4UpgradeDrop

    //if isPaid === true then set to ALSO FALSE SO THEY MATCH

    const [tempDropStatus, setTempDropStatus] = useState(false)


    useEffect(() => {

        if (!user) return

        if (dropSeen) {
            setTempDropStatus(true)

            const run = async () => {
                await updateDoc(doc(db, 'users', user.uid), {
                    "pulseSettings.pulseMemory.Thanks4UpgradeDrop": true
                })
            }
            run()
        }

    }, [userProfile, user, dropSeen, currentDropStatus, tempDropStatus])

    if (dropSeen) return null;

    // iF BOTH ARE FALSE SHOW THE DROP... once drop gets marked as true. statement becomes untrue.. and wont appear again..

    //IF PAIDSTATUS IS TRUE (user unpaid) STATEMENT is untrue and wont appear.
    // BOTH must be FALSE for it to appear..
    if (userProfile?.isPaid === true && currentDropStatus === false)
        return (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center backdrop-blur-md">
                <div className="pb-6 pt-4 bg-[#0f172a] text-white rounded-2xl shadow-xl border border-indigo-500 max-w-sm w-full space-y-4 text-center">
                    <div className="text-left text-lg text-gray-300 bg-black/30 pb-2 pt-1 pl-3 gap-3 items-center">Incoming PulseDrop...</div>
                    <h2 className="text-3xl px-3 font-bold pulse-glow gap-2"> Congratulations, Commander {userProfile?.name} — youve been promoted to 5-Star status. </h2>
                    <p className="text-sm px-6 text-indigo-300">
                        Your Command Center is now fully unlocked. In addition to PrimeTasks, you now have access to:
                        the StrengthArchive Workout Tracker, MacroVault Calorie Counter, and SyncReport Trends.
                        <br /><br />
                        Your first mission: complete your first DawnSync and DuskSync. These are your daily rituals — designed to calibrate
                        your RestDay and ActiveDay TDEE using real data from your weight, steps, and training.
                        <br /><br />
                        Fuel smart. Advance with intention.
                    </p>
                    <button
                        onClick={() => setDropSeen(true)}
                        className="mt-4 px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all font-semibold shadow-lg"
                    >
                        Begin DawnSync
                    </button>
                </div>
            </div>
        )
}
