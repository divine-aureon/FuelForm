"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCoreData from "@/lib/hooks/CoreData";
import { CircleAlert, CircleCheckBig } from 'lucide-react';
import { useRouter } from "next/navigation";

import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function LiftIndexComponent() {
    const userProfile = useGlobalData((s) => s.userProfile);
    const strengthArchiveSettings = userProfile?.strengthArchiveSettings;


    const { user } = useAuth();

    const router = useRouter();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;


    const [activeSplit, setActiveSplit] = useState("");
    const [bodygroup, setBodygroup] = useState("");
    const [movements, setMovements] = useState("");

    const [profileSlot, setProfileSlot] = useState("");
    const [profileName, setProfileName] = useState("");


    const profile1 = strengthArchiveSettings?.liftIndex?.[bodygroup]?.profile1;
    const profile2 = strengthArchiveSettings?.liftIndex?.[bodygroup]?.profile2;
    const profile3 = strengthArchiveSettings?.liftIndex?.[bodygroup]?.profile3;


    const [movementLevels, setMovementLevels] = useState([""]);

    const allOptions = ["1", "2", "3", "4", "5"];

    const handleChange = (value: string, index: number) => {
        const updated = [...movementLevels];
        updated[index] = value;
        setMovementLevels(updated);
    };

    const usedOptions = movementLevels.filter((v) => v);
    const getAvailableOptions = (currentValue: string) => {
        return allOptions.filter(
            (option) => !usedOptions.includes(option) || option === currentValue
        );
    };

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

        fullBody: "FullBody",

        broLegs: "Legs",
        chest: "Chest",
        back: "Back",
        shoulders: "Shoulders",
        arms: "Arms",
    };

    const MovementProfileDisplayNames = {
        push: "Push",
        pull: "Pull",
        legs: "Legs",

        upper: "Upper",
        lower: "Lower",

        fullBody: "FullBody",

        broLegs: "Legs",
        chest: "Chest",
        back: "Back",
        shoulders: "Shoulders",
        arms: "Arms",
    };


    //NEW CURRENT ACTIVE SPLIT DETECTED

    const [warningSeen, setWarningSeen] = useState(false)
    useEffect(() => {
        if (
            activeSplit &&
            strengthArchiveSettings?.currentSplit &&
            activeSplit !== strengthArchiveSettings.currentSplit
        ) {
            if (!warningSeen) {
                setWarningSeen(true);
            }
        }
    }, [activeSplit, strengthArchiveSettings?.currentSplit]);


    if (!strengthArchiveSettings?.currentSplit) return;

    return (
        <>
            <ScrollLoad />
            <div>
                <div className="relative h-32 bg-[url('/images/menus/liftindex.png')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-5xl glowing-button mb-2">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                        <div className="flex items-center gap-2 pulse-glow">Lift Index</div>
                        <h2 className="text-lg font-bold text-white">
                            Define Custom Movement Profiles
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
                                        Current Active Split: {SplitDisplayNames[strengthArchiveSettings?.currentSplit]} <br />
                                        <div className="bg-white/40 rounded-xl mx-24 my-1 pb-1"></div>
                                        Selected Split: {SplitDisplayNames[activeSplit]}<br />

                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 left-0 ">
                                    <div className="">

                                        <button
                                            onClick={() => {
                                                setActiveSplit("pushpulllegs");
                                                handleSplitClick("pushpulllegs");
                                            }}
                                            className={`mb-2 p-2 w-full rounded-xl ${SplitButton === "pushpulllegs" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Push-Pull-Legs
                                        </button>

                                        <button
                                            onClick={() => {
                                                setActiveSplit("upperlower");
                                                handleSplitClick("upperlower");
                                            }}
                                            className={`mb-2 p-2 w-full rounded-xl ${SplitButton === "upperlower" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Upper-Lower
                                        </button>

                                    </div>
                                    <div className="" >


                                        <button
                                            onClick={() => {
                                                setActiveSplit("fullbody");
                                                handleSplitClick("fullbody");
                                            }}
                                            className={`mb-2 p-2 w-full rounded-xl ${SplitButton === "fullbody" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Full-Body
                                        </button>

                                        <button
                                            onClick={() => {
                                                setActiveSplit("brosplit5");
                                                handleSplitClick("brosplit5");
                                            }}
                                            className={`mb-2 p-2  w-full rounded-xl ${SplitButton === "brosplit5" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                            Bro-Split(5-Day)
                                        </button>
                                    </div>
                                </div>


                                {activeSplit && (
                                    <p className="text-green-300 text-center mb-2 font-semibold mt-2">
                                        Please proceed to Choose Bodygroup
                                    </p>
                                )}

                            </div>

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

                            <div className="p-2 backdrop-blur-sm mb-2 items-center rounded-lg shadow bg-indigo-300/50 text-white">


                                <div className="text-white mb-2 justify-center flex">

                                    <button className="w-full h-16 glowing-purple-button rounded-xl">
                                        Last Session: Pull<br /> May 10, 2025 6:52pm
                                    </button>
                                </div>

                                <div className="grid grid-cols gap-2 left-0 ">

                                    {activeSplit === "pushpulllegs" ? (
                                        <>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("push");
                                                    handleBodygroupClick("push");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "push" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Push
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("pull");
                                                    handleBodygroupClick("pull");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "pull" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Pull
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("legs");
                                                    handleBodygroupClick("legs");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "legs" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Legs
                                            </button>


                                        </>
                                    ) : activeSplit === "upperlower" ? (
                                        <>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("upper");
                                                    handleBodygroupClick("upper");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "upper" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Upper
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("lower");
                                                    handleBodygroupClick("lower");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "lower" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Lower
                                            </button>

                                        </>
                                    ) : activeSplit === "fullbody" ? (
                                        <>


                                            <button
                                                onClick={() => {
                                                    setBodygroup("fullbody");
                                                    handleBodygroupClick("fullbody");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "fullbody" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                FullBody
                                            </button>


                                        </>
                                    ) : activeSplit === "brosplit5" ? (
                                        <>


                                            <button
                                                onClick={() => {
                                                    setBodygroup("chest");
                                                    handleBodygroupClick("chest");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "chest" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Chest
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("back");
                                                    handleBodygroupClick("back");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "back" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Back
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setBodygroup("shoulders");
                                                    handleBodygroupClick("shoulders");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "shoulders" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Shoulders
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setBodygroup("brolegs");
                                                    handleBodygroupClick("brolegs");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "brolegs" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Legs
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setBodygroup("arms");
                                                    handleBodygroupClick("arms");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${bodygroupButton === "arms" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Arms
                                            </button>

                                        </>
                                    ) : (null)}


                                </div>
                                {bodygroup && (
                                    <p className="text-green-300 text-center mb-2 font-semibold mt-2">
                                        Please proceed to apply Movements
                                    </p>
                                )}
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



                            <div className="p-2 mb-10 bg-white/30 backdrop-blur-sm text-white rounded-lg flex flex-col mb-20">

                                <div className="text-white mb-2 justify-center flex">



                                </div>

                                <div className="grid grid-cols gap-2 left-0 ">
                                    <div>

                                        <div className="grid grid-cols gap-2 left-0 ">

                                            <button
                                                onClick={() => {
                                                    setProfileSlot("profile1");
                                                    handleMovementClick("profile1");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile1" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Edit {BodyGroupDisplayNames[bodygroup]} Profile 1
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setProfileSlot("profile2");
                                                    handleMovementClick("profile2");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile2" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>

                                                Edit {BodyGroupDisplayNames[bodygroup]} Profile 2
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setProfileSlot("profile3");
                                                    handleMovementClick("profile3");
                                                }}
                                                className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile3" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                Edit {BodyGroupDisplayNames[bodygroup]} Profile 3
                                            </button>



                                        </div>

                                        <input
                                            type="text"
                                            value={profileName}
                                            onChange={(e) => setProfileName(e.target.value)}
                                            placeholder="Enter a profile name"
                                            className="w-full mt-4 mb-2 p-2 rounded bg-gray-800 text-white border border-indigo-400 placeholder-gray-500"
                                        />

                                        {movementLevels.map((level, index) => {
                                            const availableOptions = getAvailableOptions(level);

                                            return (
                                                <select
                                                    key={index}
                                                    value={level}
                                                    onChange={(e) => handleChange(e.target.value, index)}
                                                    className="mb-2 w-full p-2 rounded bg-gray-800 text-white"
                                                >
                                                    <option value="">Choose a level</option>
                                                    {availableOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            );
                                        })}


                                        <button
                                            onClick={() => setMovementLevels([...movementLevels, ""])}
                                            className="mt-2 text-sm px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                                        >
                                            + Add Another
                                        </button>
                                    </div>





                                </div>

                                <div className="flex px-12 pt-3 justify-center">
                                    <button
                                        disabled={!(activeSplit && bodygroup && profileSlot && profileName)}
                                        className={`w-full text-md rounded-xl p-6 shadow transition-all duration-50
                                     ${!(activeSplit && bodygroup && profileSlot && profileName) ? "bg-gray-800 text-gray-400 cursor-not-allowed relative z-10 font-bold rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}
                                        onClick={async () => {
                                            if (!user) return;

                                            const userRef = doc(db, "users", user.uid);

                                            // Set meta initialized
                                            await setDoc(userRef, {
                                                strengthArchiveSettings: {
                                                    liftIndex: {
                                                        [bodygroup]: {
                                                            [profileSlot]: {
                                                                name: profileName,
                                                                movements: movementLevels, // ← this right here
                                                            }
                                                        }
                                                    }
                                                },
                                            }, { merge: true });
                                            window.location.reload();
                                        }}
                                    >
                                        Apply Movements to {BodyGroupDisplayNames[bodygroup]} LiftIndex
                                    </button>

                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="w-full fixed bottom-28 left-0 ">
                    <div className="grid grid-cols-3 gap-1 w-full rounded-xl">
                        <button
                            onClick={() => handleSetupClick("splits")}
                            className={`px-5 w-full text-md rounded-xl transition-all duration-50 shadow ${selectedSetup === "splits" ? "bg-indigo-300/50" : "glowing-purple-button"}`}>
                            Splits
                        </button>


                        <button
                            disabled={!activeSplit}
                            onClick={() => handleSetupClick("bodygroup")}
                            className={`w-full text-md rounded-xl shadow transition-all duration-50 ${!activeSplit ? "bg-gray-800 text-gray-400 cursor-not-allowed relative z-10 font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400"
                                : selectedSetup === "bodygroup" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}>
                            BodyGroup
                        </button>



                        <button
                            disabled={!bodygroup}
                            onClick={() => handleSetupClick("movements")}
                            className={`w-full text-md rounded-xl shadow transition-all duration-50 ${!bodygroup ? "bg-gray-800 text-gray-400 cursor-not-allowed relative z-10 font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400"
                                : selectedSetup === "movements" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}>
                            Movements
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
