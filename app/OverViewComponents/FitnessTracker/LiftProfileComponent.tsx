"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCoreData from "@/lib/hooks/CoreData";
import { CircleAlert, CircleCheckBig } from 'lucide-react';
import { useRouter } from "next/navigation";
import NavLoad from "../../initializing/LoadingComponents/SystemLoad";
import { collection, getDocs, getDoc, addDoc, setDoc, updateDoc, doc, query, where, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/lib/useAuth";
import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { useGlobalData } from "@/app/initializing/Global/GlobalData";


import { EstablishConnection } from "../../initializing/Global/EstablishConnection";
import { AllTypes, TypeManifest, UserProfile, FitnessSettingsData, LiftIndexData } from "@/app/initializing/Global/BodySyncManifest";
import SystemLoad from "@/app/initializing/Global/SystemLoad";

export default function LiftIndexComponent() {


    const { user } = useAuth();


    const userProfile = useGlobalData((s) => s.userProfile) as UserProfile
    const setUserProfile = useGlobalData((s) => s.setUserProfile);
    const setConnectionReady = useGlobalData((s) => s.setConnectionReady)


    useEffect(() => {
        if (user?.uid) {
            EstablishConnection(user?.uid);
            setConnectionReady(true);
        }
    }, [user?.uid]);

    const fitnessSettings = userProfile?.fitnessSettings ?? ({} as FitnessSettingsData);
    const liftIndex = fitnessSettings?.liftIndex ?? ({} as LiftIndexData);

    const setSelectedSector2 = useGlobalData((s) => s.setSelectedSector2);
    // const liftIndex = useGlobalData((s) => s.liftIndex);
    const setLiftIndex = useGlobalData((s) => s.setLiftIndex);


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


    const profile1 = liftIndex?.[bodygroup]?.profile1;
    const profile2 = liftIndex?.[bodygroup]?.profile2;
    const profile3 = liftIndex?.[bodygroup]?.profile3;


    const [movementLevels, setMovementLevels] = useState<any[]>([]);

    const allOptions = [
        "Incline Bench Press",
        "Bench Press",
        "Lat Pulldown",
        "HackSquat",
        "Chest Fly",
        "Dumbell Chest Fly",
        "Cable Chest Fly",
        "RearDelt Fly",
        "Chest Targeted Pullover",
        "Shoulder Press",
        "Dumbell Shoulder Press",
        "Barbell Shoulder Press",
        "Machine Lateral Raise",
        "Dumbell Lateral Raise",
        "Katana Extension",
        "Overhead Dumbell Tricep Extension",
        "Skull Crusher",
        "Tricep Press Machine",
        "Dips",
        "Cable Shoulder Flexion",
        "Cable Internal Rotation",
        "Cable External Rotation",
        "Cable Overhead External Rotation",
    ];


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
            fitnessSettings?.currentSplit &&
            activeSplit !== fitnessSettings.currentSplit
        ) {
            if (!warningSeen) {
                setWarningSeen(true);
            }
        }
    }, [activeSplit, fitnessSettings?.currentSplit]);

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
                                        Current Active Split: {SplitDisplayNames[fitnessSettings?.currentSplit]} <br />
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


                                <div className="w-full glowing-purple-button text-center rounded-xl mb-2">
                                    Last Active Session: {SplitDisplayNames[fitnessSettings?.currentSplit]} <br />
                                    <div className="bg-white/40 rounded-xl mx-24 my-1 pb-1"></div>
                                    {bodygroup && (
                                        <p className="text-green-300 text-center font-semibold">
                                            Please proceed to apply your Movements
                                        </p>)}
                                    {!bodygroup && (
                                        <p className="text-yellow-300 text-center font-semibold">
                                            Please choose a BodyGroup
                                        </p>)}

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

                             

                                    <div className="w-full glowing-purple-button text-center rounded-xl mb-2">
                                        Choose a {BodyGroupDisplayNames[bodygroup]} profile to edit  <br />
                                        <div className="bg-white/40 rounded-xl mx-24 my-1 pb-1"></div>
                                        {profileSlot && (
                                            <p className="text-green-300 text-center font-semibold">
                                                Proceed to Movement Selection
                                            </p>)}
                                        {!profileSlot && (
                                            <p className="text-yellow-300 text-center font-semibold">
                                                No profile selected
                                            </p>)}

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
                                                    Edit {BodyGroupDisplayNames[bodygroup]}: {profile1?.name}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setProfileSlot("profile2");
                                                        handleMovementClick("profile2");
                                                    }}
                                                    className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile2" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>

                                                    Edit {BodyGroupDisplayNames[bodygroup]}: {profile2?.name}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setProfileSlot("profile3");
                                                        handleMovementClick("profile3");
                                                    }}
                                                    className={`mb-2 p-2 w-full rounded-xl ${movementButton === "profile3" ? "bg-indigo-300/50 relative z-10 text-white font-bold px-4 py-2 rounded-xl overflow-hidden border border-indigo-400" : "glowing-button"}`}>
                                                    Edit {BodyGroupDisplayNames[bodygroup]}: {profile3?.name}
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
                                            className={`w-full text-md rounded-xl p-2 shadow transition-all duration-50
                                     ${!(activeSplit && bodygroup && profileSlot && profileName) ? "bg-gray-800/80 text-gray-400 cursor-not-allowed relative z-10 font-bold rounded-xl overflow-hidden border border-indigo-400" : "glowing-purple-button cursor-pointer"}`}
                                            onClick={async () => {
                                                if (!user) return;

                                                const userRef = doc(db, "users", user.uid);

                                                // Set meta initialized
                                                await setDoc(userRef, {
                                                    fitnessSettings: {
                                                        liftIndex: {
                                                            [bodygroup]: {
                                                                [profileSlot]: {
                                                                    name: profileName,
                                                                    movements: movementLevels,
                                                                }
                                                            }
                                                        }
                                                    }
                                                }, { merge: true });
                                                setLiftIndex((prev) => ({
                                                    ...prev,
                                                    [bodygroup]: {
                                                        ...prev[bodygroup],
                                                        [profileSlot]: {
                                                            name: profileName,
                                                            movements: movementLevels,
                                                        },
                                                    },
                                                }));
                                                setSelectedSector2("newsession");
                                            }}
                                        >
                                            Apply Chosen Lift Index
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
