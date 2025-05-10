import { useEffect, useState } from 'react'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useAuth from '@/lib/useAuth'
import useCoreData from "@/lib/hooks/CoreData";


export default function WelcomeDrop2() {

    const { pulseSettings, profile } = useCoreData();
    const { user } = useAuth();
    const [dropSeen, setDropSeen] = useState(false)

    const currentDropStatus = pulseSettings?.pulseMemory.welcomeDrop2
    const [tempDropStatus, setTempDropStatus] = useState(false)

    useEffect(() => {

        if (!user) return

        if (!currentDropStatus) {
            setTempDropStatus(true)

            const run = async () => {
                await updateDoc(doc(db, 'users', user.uid), {
                    "pulseSettings.pulseMemory.welcomeDrop2": true
                })
            }
            run()
        }

    }, [profile, user, dropSeen, currentDropStatus, tempDropStatus])

    if (dropSeen) return null;

    if (!currentDropStatus)
        return (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center backdrop-blur-md">
                <div className="p-6 bg-[#0f172a] text-white rounded-2xl shadow-xl border border-indigo-500 max-w-sm w-full space-y-4 text-center">
                    <h2 className="text-3xl font-bold animate-pulse gap-2"> You did it, {profile.name} !</h2>
                    <p className="text-sm text-indigo-300">You successfully created a second PulseDrop!
                    </p>
                    <button
                        onClick={() => setDropSeen(true)}
                        className="mt-4 px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all font-semibold shadow-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        )
}
