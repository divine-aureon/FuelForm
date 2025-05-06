'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuth from "@/lib/useAuth";

export default function SettingsPageComponent() {

    const router = useRouter();
    const [status, setStatus] = useState("");

    const [background, setBackground] = useState("");

    const [navIcon, setNavIcon] = useState("");
    const { user } = useAuth();


    useEffect(() => {
        const fetchNeuroSettings = async () => {
            if (!user?.uid) return;

            const preferencesRef = doc(db, "users", user.uid, "neuro", "preferences");

            const [preferencesSnap,] = await Promise.all([
                getDoc(preferencesRef),
            ]);

            if (preferencesSnap.exists()) {
                const data = preferencesSnap.data();
                setBackground(data.background || 0);
                setNavIcon(data.navIcon || 0);
            }

        };

        fetchNeuroSettings(); // ✅ call only once user is defined
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const userId = auth.currentUser!.uid;
        const preferencesRef = doc(db, "users", userId, "neuro", "preferences");
        try {
            await setDoc(preferencesRef, {
                background,
                navIcon
            }, { merge: true });

            setStatus("success");
        } catch (error) {
            setStatus("failiure");
        }
    };

    useEffect(() => {
        if (status === "success") {
            const timeout = setTimeout(() => {
                window.location.reload(); // hard refresh
            }, 0);

            return () => clearTimeout(timeout);
        }
    }, [status, router]);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (

        <>
            <div>
                <div className="relative h-32 bg-[url('/images/menus/settings.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
                    <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                        <div className="flex items-center gap-2 pulse-glow mb-2">Neuro Settings..</div>
                        <h2 className="text-sm font-bold text-white">
                            “Optimize the interface to align with your rhythm, pace, and focus.”
                        </h2>
                    </div>
                </div>
            </div>

            <div className="bg-white/30 rounded-xl p-3 shadow-lg mb-[110px]">
                <form onSubmit={handleSubmit} className="">
                    <p className="text-lg text-white font-semibold mb-1">
                        Customize Background
                        <div className="flex">


                            <div className="flex w-full">
                                {/* Custom Dropdown replacing the select */}
                                <div className="custom-dropdown w-full">
                                    <div
                                        className="dropdown-btn w-full rounded text-white cursor-pointer"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        style={{ backgroundColor: 'rgba(31, 41, 55, 0.7)', padding: '6px 10px', boxSizing: 'border-box' }}
                                        
                                    >
                                        <span className="p-0 text-white">{background || "Customize Background"}</span>
                                        
                                    </div>

                                    {/* Dropdown Content with Image Options */}
                                    {dropdownOpen && (
                                        <div className="dropdown-content bg-black  text-white w-full rounded">
                                            {["NeuralLink", "StarVeil", "QuantumFade"].map((bg) => (
                                                <div
                                                    key={bg}
                                                    className="option bg-gray-800 flex items-center cursor-pointer"
                                                    onClick={() => {
                                                        setBackground(bg); // Set the selected background
                                                        setDropdownOpen(false); // Close dropdown
                                                    
                                                    }}
                                                >
                                                    {/* Replace these with actual image paths */}
                                                    <img
                                                        src={bg === "NeuralLink" ? "/images/backgrounds/neurallink.webp" :
                                                            bg === "StarVeil" ? "/images/backgrounds/starveil.jpg" :
                                                                bg === "QuantumFade" ? "/images/backgrounds/quantumfade.jpg" :
                                                                    "/images/default-image.jpg"}
                                                        alt={bg}
                                                        width="70"
                                                        height="70"
                                                        className="mr-2"
                                                        style={{width: "160px", height: "80px", objectFit: "cover" }}
                                                    />
                                                    {bg}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </p>
                    <p className="text-lg text-white font-semibold mb-1">
                        NavPortal Icon
                        <div className="flex mb-1">
                            <select
                                value={navIcon}
                                onChange={(e) => setNavIcon(e.target.value)}
                                className="w-full p-2 rounded bg-gray-800/70 text-white"
                            >
                                <option value="">Choose an Icon</option>
                                {["Atom", "Crown", "Flame", "Zap", "Star", "Shield", "Heart", "Bird"].map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </p>
                    <p className="text-lg text-white font-semibold mb-1">
                        Light or Dark Mode - Coming Soon!
                        <div className="flex mb-1">
                            <select
                                className="w-full p-2 rounded bg-gray-800/70 text-white"
                            >
                                <option value="">Choose an Icon</option>
                                {["Coming Soon!"].map((theme) => (
                                    <option key={theme} value={theme}>
                                        {theme}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </p>
                    <p className="text-lg text-white font-semibold mb-1">
                        FastLink Order - Coming Soon!
                        <div className="flex">
                            <select
                                className="w-full p-2 rounded bg-gray-800/70 text-white"
                            >
                                <option value="">Choose an Icon</option>
                                {["Coming Soon!"].map((fastlink) => (
                                    <option key={fastlink} value={fastlink}>
                                        {fastlink}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </p>


                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-center z-30">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black hover:bg-indigo-300/50 px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Link Settings!
                        </button>
                    </div>
                </form>
            </div>
        </>

    );

}