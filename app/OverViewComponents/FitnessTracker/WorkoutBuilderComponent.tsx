"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleAlert, CircleCheckBig } from 'lucide-react';
import { useRouter } from "next/navigation";

import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function CoreStackComponent() {

    const userProfile = useGlobalData((s) => s.userProfile);
    const setUserProfile = useGlobalData((s) => s.setUserProfile);
    const setSelectedPage = useGlobalData((s) => s.setSelectedPage);
    const activeSessionStatus = useGlobalData((s) => s.activeSessionStatus);
    const setActiveSessionStatus = useGlobalData((s) => s.setActiveSessionStatus);
    const liftIndex = useGlobalData((s) => s.liftIndex);

    const setTemporaryFitnessSync = useGlobalData((s) => s.setTemporaryFitnessSync);
    const setWorkoutSessionData = useGlobalData((s) => s.setWorkoutSessionData); // read live

    const { user } = useAuth();

    const router = useRouter();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;


    const [activeSplit, setActiveSplit] = useState("");
    const [activeBodygroup, setActiveBodygroup] = useState("");
    const [activeProfile, setActiveProfile] = useState("");

    const profile1 = liftIndex?.[activeBodygroup]?.profile1;
    const profile2 = liftIndex?.[activeBodygroup]?.profile2;
    const profile3 = liftIndex?.[activeBodygroup]?.profile3;


    //Workout selector view pages NEXT BACK BUTTONS/ 

    const [selectedSetup, setSelectedSetup] = useState<"splits" | "bodygroup" | "movements">("splits");


    const handleSetupClick = (page: "splits" | "bodygroup" | "movements") => {
        setSelectedSetup(page); // No toggling, just always set the new one
    };

    //SPLIT SELECTOR BUTTONS

    const [SplitButton, setSplitButton] = useState<"pushpulllegs" | "fullbody" | "brosplit5" | "upperlower" | "brosplit3" | null>(null);

    const handleSplitClick = (selection: "pushpulllegs" | "fullbody" | "brosplit5" | "upperlower" | "brosplit3") => {
        setSplitButton(selection); // No toggling, just always set the new one
    };

    //BODYGROUP SELECTOR BUTTONS

    const [bodygroupButton, setBodygroupButton] = useState<"push" | "pull" | "legs" | "upper" | "lower" | "fullbody" | "chest" | "back" | "shoulders" | "brolegs" | "arms" | null>(null);

    const handleBodygroupClick = (selection: "push" | "pull" | "legs" | "upper" | "lower" | "fullbody" | "chest" | "back" | "shoulders" | "brolegs" | "arms") => {
        setBodygroupButton(selection); // No toggling, just always set the new one
    };

    //MOVEMENT SELECTOR BUTTONS

    const [movementButton, setMovementButton] = useState<"profile1" | "profile2" | "profile3" | null>(null);

    const handleMovementClick = (selection: "profile1" | "profile2" | "profile3") => {
        setMovementButton(selection); // No toggling, just always set the new one
    };

    const SplitDisplayNames: { [key: string]: string } = {
        pushpulllegs: "Push-Pull-Legs",
        upperlower: "Upper-Lower",
        fullbody: "Full Body",
        brosplit5: "5-Day Bro Split",
        brosplit3: "3-Day Bro Split",

    };

    const BodyGroupDisplayNames: { [key: string]: string } = {
        push: "Push",
        pull: "Pull",
        legs: "Legs",
        upper: "Upper",
        lower: "Lower",
        fullbody: "FullBody",
        broLegs: "Legs",
        chest: "Chest",
        back: "Back",
        shoulders: "Shoulders",
        arms: "Arms",
    };

    //NEW CURRENT ACTIVE SPLIT DETECTED

    //NEW CURRENT ACTIVE SPLIT DETECTED
    const [warningSeen, setWarningSeen] = useState(false)
    useEffect(() => {
        if (
            activeSplit &&
            userProfile?.fitnessSettings?.currentSplit &&
            activeSplit !== userProfile?.fitnessSettings.currentSplit
        ) {
            if (!warningSeen) {
                setWarningSeen(true);
            }
        }
    }, [activeSplit, userProfile?.fitnessSettings?.currentSplit]);



    useEffect(() => {
        if (userProfile?.fitnessSettings?.activeSession) {
            setActiveSessionStatus(userProfile.fitnessSettings.activeSession);
        }
    }, [userProfile?.fitnessSettings?.activeSession]);


    const [activeSessionWarningSeen, setActiveSessionWarningSeen] = useState(false)
    useEffect(() => {
        if (

            activeSessionStatus === true
        ) {
            if (!activeSessionWarningSeen) {
                setActiveSessionWarningSeen(true);
            }
        }
    }, []);


    if (!userProfile?.fitnessSettings?.currentSplit) return;

    return (
        <>
            <ScrollLoad />
            <div>
                <div className="relative z-0 h-32 bg-[url('/images/menus/register.webp')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-5xl glowing-button mb-2">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                        <div className="flex items-center gap-2 pulse-glow ">CoreStack</div>
                        <h2 className="text-lg font-bold text-white">
                            Workout Builder
                        </h2>
                    </div>
                </div>
            </div>

            <div className="relative w-full rounded-xl ">
                <AnimatePresence mode="wait">

                    {selectedSetup === "splits" && (
                        <motion.div
                            key="splits"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >



                            <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">


                                <div className="text-white mb-2 justify-center flex">

                                    <div className="w-full glowing-purple-button text-center rounded-xl">
                                        Current Active Split: {SplitDisplayNames[userProfile?.fitnessSettings?.currentSplit]} <br />
                                        <div className="bg-white/40 rounded-xl mx-24 my-1 pb-1"></div>
                                        {activeSplit && (
                                            <p className="text-green-300 text-center font-semibold">
                                                Please proceed to define your BodyGroup
                                            </p>)}
                                        {!activeSplit && (
                                            <p className="text-yellow-300 text-center font-semibold">
                                                Please Choose a split
                                            </p>)}

                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 left-0 ">
                                    <div className="">

                                        <button
                                            onClick={() => {
                                                setActiveSplit("pushpulllegs");
                                                handleSplitClick("pushpulllegs");
                                            }}
                                            className={`mb-2 p-2 w-full rounded-xl ${SplitButton === "pushpulllegs" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Push-Pull-Legs
                                        </button>

                                        <button
                                            onClick={() => {
                                                setActiveSplit("upperlower");
                                                handleSplitClick("upperlower");
                                            }}
                                            className={`mb-2 p-2 w-full rounded-xl ${SplitButton === "upperlower" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Upper-Lower
                                        </button>

                                    </div>
                                    <div className="" >


                                        <button
                                            onClick={() => {
                                                setActiveSplit("fullbody");
                                                handleSplitClick("fullbody");
                                            }}
                                            className={`mb-2 p-2 w-full rounded-xl ${SplitButton === "fullbody" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Full-Body
                                        </button>

                                        <button
                                            onClick={() => {
                                                setActiveSplit("brosplit5");
                                                handleSplitClick("brosplit5");
                                            }}
                                            className={`mb-2 p-2  w-full rounded-xl ${SplitButton === "brosplit5" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Bro-Split(5-Day)
                                        </button>

                                    </div>
                                </div>




                            </div>

                            {warningSeen && (

                                <div className="absolute inset-0 mt-24 z-100 text-center flex justify-center items-center flex-col font-semibold">
                                    <div className="bg-black/40 max-w-xs rounded-3xl p-3 py-10 backdrop-blur-lg border border-indigo-300 ">
                                        <div className=" text-yellow-400 flex justify-center items-center flex-col mb-5">
                                            <div className="flex justify-center pulse-glow text-3xl items-center flex-col mb-3">

                                                <CircleAlert size={30} /> Warning <br />
                                            </div>
                                            {SplitDisplayNames[activeSplit || "None"]} Will Overwrite Current Active Split {SplitDisplayNames[userProfile?.fitnessSettings?.currentSplit]} in UserProfile.
                                            Are you sure you want to continue?
                                        </div>
                                        <button
                                            onClick={() => {
                                                setWarningSeen(false);
                                            }}
                                            className="mb-2 p-2 w-full rounded-xl glowing-button">
                                            Continue
                                        </button>
                                    </div>
                                </div>

                            )}


                            {activeSessionWarningSeen === true && (


                                <div className="absolute inset-0 mt-24 z-100 text-center flex justify-center items-center flex-col font-semibold">
                                    <div className="bg-black/40 max-w-xs rounded-3xl p-3 py-10 backdrop-blur-lg border border-indigo-300 ">
                                        <div className=" text-yellow-400 flex justify-center items-center flex-col mb-5">
                                            <div className="flex justify-center pulse-glow text-3xl items-center flex-col mb-3">

                                                <CircleAlert size={30} /> Warning <br />
                                            </div>
                                            Active Workout Session Detected. Would you like to continue your progress?..
                                        </div>
                                        <div className="flex gap-2 justify-center">

                                            <button
                                                onClick={() => {
                                                    setActiveSessionWarningSeen(false);
                                                    setSelectedPage("RepSync");
                                                }}
                                                className="mb-2 p-2 w-full rounded-xl glowing-button">
                                                Resume RepSync
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    if (!user) return;

                                                    const userRef = doc(db, "users", user.uid);

                                                    // Set meta initialized
                                                    await setDoc(userRef, {
                                                        fitnessSettings: {
                                                            activeSession: false,
                                                        },
                                                    }, { merge: true });

                                                    const strengthRef = collection(db, "users", user.uid, "fitness");
                                                    const strengthDocRef = doc(strengthRef, dateString);

                                                    // Set meta initialized
                                                    await setDoc(strengthDocRef, {
                                                        completed: false,
                                                        EndTime: serverTimestamp(),
                                                    }, { merge: true });
                                                    setActiveSessionWarningSeen(false);
                                                    setActiveSessionStatus(false);
                                                    setWorkoutSessionData({});

                                                }}
                                                className="mb-2 p-2 w-full rounded-xl glowing-button">
                                                Cancel Active Session
                                            </button>
                                        </div>


                                    </div>
                                </div>

                            )}

                        </motion.div>
                    )}
                    {selectedSetup === "bodygroup" && (
                        <motion.div
                            key="bodygroup"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >

                            <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/70 text-white">


                                <div className="w-full glowing-purple-button text-center rounded-xl mb-2">
                                    Last Active Session: {BodyGroupDisplayNames[userProfile?.fitnessSettings?.lastBodygroup]} <br />
                                    <div className="bg-white/40 rounded-xl mx-24 my-1 pb-1"></div>
                                    {activeBodygroup && (
                                        <p className="text-green-300 text-center font-semibold">
                                            Please proceed to apply your Movements
                                        </p>)}
                                    {!activeBodygroup && (
                                        <p className="text-yellow-300 text-center font-semibold">
                                            Please choose a BodyGroup
                                        </p>)}

                                </div>

                                <div className="grid grid-cols gap-2 left-0 ">


                                    {activeSplit === "pushpulllegs" ? (
                                        <>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("push");
                                                    handleBodygroupClick("push");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "push" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Push
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("pull");
                                                    handleBodygroupClick("pull");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "pull" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Pull
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("legs");
                                                    handleBodygroupClick("legs");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "legs" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Legs
                                            </button>


                                        </>
                                    ) : activeSplit === "upperlower" ? (
                                        <>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("upper");
                                                    handleBodygroupClick("upper");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "upper" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Upper
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("lower");
                                                    handleBodygroupClick("lower");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "lower" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Lower
                                            </button>

                                        </>
                                    ) : activeSplit === "fullbody" ? (
                                        <>


                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("fullbody");
                                                    handleBodygroupClick("fullbody");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "fullbody" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                FullBody
                                            </button>


                                        </>
                                    ) : activeSplit === "brosplit5" ? (
                                        <>


                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("chest");
                                                    handleBodygroupClick("chest");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "chest" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Chest
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("back");
                                                    handleBodygroupClick("back");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "back" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Back
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("shoulders");
                                                    handleBodygroupClick("shoulders");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "shoulders" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Shoulders
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("brolegs");
                                                    handleBodygroupClick("brolegs");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "brolegs" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Legs
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setActiveBodygroup("arms");
                                                    handleBodygroupClick("arms");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "arms" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Arms
                                            </button>

                                        </>
                                    ) : (null)}

                                </div>
                            </div>
                        </motion.div>
                    )}


                    {selectedSetup === "movements" && (
                        <motion.div
                            key="movements"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >



                            <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col">


                                <div className="text-white mb-2 justify-center flex">



                                </div>

                                <div className="grid grid-cols gap-2 left-0 ">

                                    <button
                                        onClick={() => {
                                            setActiveProfile("profile1");
                                            handleMovementClick("profile1");
                                        }}
                                        className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile1" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                        {activeBodygroup}:{profile1?.name}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setActiveProfile("profile2");
                                            handleMovementClick("profile2");
                                        }}
                                        className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile2" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                        {activeBodygroup} {profile2?.name}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setActiveProfile("profile3");
                                            handleMovementClick("profile3");
                                        }}
                                        className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile3" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                        {activeBodygroup} {profile3?.name}
                                    </button>



                                </div>

                                <div className="flex px-12 pt-3 justify-center">
                                    <button
                                        disabled={!(activeSplit && activeBodygroup && activeProfile)}
                                        className={`w-full text-md rounded-xl p-6 shadow transition-all duration-50
                                     ${!(activeSplit && activeBodygroup && activeProfile) ? "bg-gray-800 text-gray-400 cursor-not-allowed relative z-10 font-bold rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}
                                        onClick={async () => {
                                            if (!user) return;

                                            const userRef = doc(db, "users", user.uid);

                                            // Set meta initialized
                                            await setDoc(userRef, {
                                                fitnessSettings: {
                                                    currentSplit: activeSplit,
                                                    activeSession: true,
                                                    lastBodygroup: activeBodygroup,
                                                    lastMovements: activeProfile
                                                },
                                            }, { merge: true });

                                            const strengthRef = collection(db, "users", user.uid, "fitness");
                                            const strengthDocRef = doc(strengthRef, dateString);

                                            // Set meta initialized
                                            await setDoc(strengthDocRef, {
                                                split: activeSplit,
                                                bodygroup: activeBodygroup,
                                                whichProfile: activeProfile,
                                                completed: false,
                                                StartTime: serverTimestamp(),
                                            }, { merge: true });
                                            setSelectedPage("RepSync");
                                            setActiveSessionStatus(true);
                                            setTemporaryFitnessSync({
                                                profileSlot: activeProfile,
                                                bodygroup: activeBodygroup,
                                            });

                                        }}


                                    >
                                        Have a good Workout!
                                    </button>

                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="w-full max-w-md fixed bottom-28 px-2 left-1/2 -translate-x-1/2">
                    <div className="grid grid-cols-3 gap-1 w-full rounded-xl">
                        <button
                            onClick={() => handleSetupClick("splits")}
                            className={`px-5 w-full text-md rounded-xl transition-all duration-50 shadow ${selectedSetup === "splits" ? "bg-indigo-300/70" : "glowing-purple-button"}`}>
                            Splits
                        </button>


                        <button
                            disabled={!activeSplit}
                            onClick={() => handleSetupClick("bodygroup")}
                            className={`w-full text-md rounded-xl shadow transition-all duration-50 ${!activeSplit ? "bg-gray-800 text-gray-400 cursor-not-allowed relative z-10 font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400"
                                : selectedSetup === "bodygroup" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}>
                            BodyGroup
                        </button>



                        <button
                            disabled={!activeBodygroup}
                            onClick={() => handleSetupClick("movements")}
                            className={`w-full text-md rounded-xl shadow transition-all duration-50 ${!activeBodygroup ? "bg-gray-800 text-gray-400 cursor-not-allowed relative z-10 font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400"
                                : selectedSetup === "movements" ? "bg-indigo-300/70 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}>
                            Movements
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
