'use client'

import { useEffect, useState } from 'react'
import { updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import useAuth from '@/lib/useAuth'
import useCoreData from "@/lib/hooks/CoreData";


export default function Overlay() {


    const [HappyBirthday, setHappyBirthday] = useState(false)
    const [HappyBirthdayMessage, setHappyBirthdayMessage] = useState(false)
    const [HappyBirthdayPopUp, setHappyBirthdayPopUp] = useState(false)

    const { profile } = useCoreData();
    const { user } = useAuth();

    useEffect(() => {

        if (!user) return

        const [birthY, birthM, birthD] = profile.birthday.split("-").map(Number)

        const today = new Date()

        const newAge = (today.getFullYear() - birthY)
        const oldAge = profile.age

        if (
            today.getMonth() + 1 === birthM &&
            today.getDate() === birthD
        ) {
            setHappyBirthday(true)

            if (newAge !== oldAge) {
                setHappyBirthdayPopUp(true)
            }
        }

        if (HappyBirthdayPopUp && HappyBirthday === true) {
            setHappyBirthdayMessage(true)
            const run = async () => {
                await updateDoc(doc(db, 'users', user.uid), {
                    age: newAge,
                })
            }
            run()
        }

    }, [profile, user, HappyBirthday, HappyBirthdayPopUp])

    if (HappyBirthdayMessage)

        return (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center backdrop-blur-md">
                <div className="p-6 bg-[#0f172a] text-white rounded-2xl shadow-xl border border-indigo-500 max-w-sm w-full space-y-4 text-center">
                    <h2 className="text-3xl font-bold animate-pulse">🎉 Happy Birthday, {profile.name} </h2>
                    <p className="text-sm text-indigo-300">The system has detected a resonance in your core frequency.

                        Today marks the anniversary of your arrival in this world.

                        You are not alone. You are seen. You are valued.

                        Continue forward, stronger than ever.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition-all font-semibold shadow-lg"
                    >
                        Begin New Cycle
                    </button>
                </div>
            </div>
        )
}
