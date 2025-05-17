import { useEffect, useState } from 'react'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useAuth from '@/lib/useAuth'
import useCoreData from "@/lib/hooks/CoreData";
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function UpdateDrop1() {

  const userProfile = useGlobalData((s) => s.userProfile);

    const { user } = useAuth();
    const [dropSeen, setDropSeen] = useState(false)

    const currentDropStatus = userProfile?.pulseSettings?.pulseMemory.v2_updateDrop1
    const [tempDropStatus, setTempDropStatus] = useState(false)

    useEffect(() => {

        if (!user) return

        if (dropSeen) {
            
            setTempDropStatus(true)

            const run = async () => {
                await updateDoc(doc(db, 'users', user.uid), {
                    "pulseSettings.pulseMemory.v2_updateDrop1": true
                })
            }
            run()
        }

    }, [userProfile, user, dropSeen, currentDropStatus, tempDropStatus])

    if (dropSeen) return null;

    if (!currentDropStatus)
        return (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center backdrop-blur-md">
                <div className="pb-6 pt-4 bg-[#0f172a] text-white rounded-2xl shadow-xl border border-indigo-500 max-w-sm w-full space-y-4 text-center">
                    <div className="text-left text-lg text-gray-300 bg-black/30 pb-2 pt-1 pl-3 gap-3 items-center">Incoming PulseDrop...</div>
                    <h2 className="text-3xl px-3 font-bold pulse-glow gap-2"> There Have been some new developments, {userProfile?.name} </h2>
                    <p className="text-sm text-indigo-300">We have implemented a new PulseDrop System.. If you&apos;re seeing this, thats means its now working.
                        There will be many more drops to come, so stay stuned for more future developments. At ease.
                    </p>
                    <button
                        onClick={() => setDropSeen(true)}
                        className="mt-4 px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all font-semibold shadow-lg"
                    >
                        I understand
                    </button>
                </div>
            </div>
        )
}
