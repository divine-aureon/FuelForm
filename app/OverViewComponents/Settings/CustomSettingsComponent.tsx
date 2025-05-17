'use client';
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuth from "@/lib/useAuth";
import useCoreData from "@/lib/hooks/CoreData";





export default function SettingsPageComponent() {
   const userProfile = useGlobalData((s) => s.userProfile);

    const router = useRouter();
    const [status, setStatus] = useState("");

    const [background, setBackground] = useState("");

    const [navIcon, setNavIcon] = useState("");
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const userId = auth.currentUser!.uid;
        const userRef = doc(db, "users", userId,);
        try {
            await setDoc(userRef, {
                customSettings: {
                    background,
                    navIcon,
                }
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

        <div className="flex items-center justify-center flex-col">

            <div className="h-32 relative w-full bg-[url('/images/menus/settings.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl 
         text-white text-3xl glowing-button mb-2">
                <div className="absolute inset-0 pt-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
                    <div className="text-center gap-2 pulse-glow mb-2">Customize Settings</div>
                    <h2 className="text-sm font-bold text-white">
                        Optimize the interface to align with your rhythm, pace, and focus.
                    </h2>
                </div>
            </div>


            <div className="bg-white/30 w-full text-left rounded-xl p-3 mb-[110px]">
                <form onSubmit={handleSubmit} className="">
                    <p className="text-lg text-white font-semibold mb-1">
                        Overview Background
                         </p>
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
                                        <div className=" bg-black text-white w-full rounded grid grid-cols-3 p-1 gap-1">
                                            {["NeuralLink", "StarVeil", "QuantumFade" , "CircuitRift", "DarkFirewall", "DataDrift"
                                                , "HexPulse", "ObsidianProtocol"].map((bg) => (
                                                    <div
                                                        key={bg}
                                                        className="bg-gray-800 rounded cursor-pointer hover:bg-indigo-300/30 transition transform duration-150 flex flex-col items-center p-2"
                                                        onClick={() => {
                                                            setBackground(bg); // Set the selected background
                                                            setDropdownOpen(false); // Close dropdown

                                                        }}
                                                    >
                                                        {/* Replace these with actual image paths */}
                                                        <img
                                                            src={bg === "NeuralLink" ? "/images/dropdownmenu/neurallink.webp" :
                                                                bg === "StarVeil" ? "/images/dropdownmenu/starveil.jpg" :
                                                                    bg === "QuantumFade" ? "/images/dropdownmenu/quantumfade.jpg" :
                                                                            bg === "CircuitRift" ? "/images/dropdownmenu/circuitrift.jpg" :
                                                                                bg === "DarkFirewall" ? "/images/dropdownmenu/darkfirewall.jpg" :
                                                                                    bg === "DataDrift" ? "/images/dropdownmenu/datadrift.jpg" :
                                                                                        bg === "HexPulse" ? "/images/dropdownmenu/hexpulse.jpg" :
                                                                                           
                                                                                                bg === "ObsidianProtocol" ? "/images/dropdownmenu/obsidianprotocol.jpg" :


                                                                                                    "/images/default-image.jpg"}
                                                            alt={bg}

                                                         className=" w-[60px] h-[60px] object-cover rounded mb-1"
                                                  
                                                        />
                                                        <span className="text-xs text-center w-full mt-1 ">{bg}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                   
                    <p className="text-lg text-white font-semibold mb-1">
                        ControlHub Icon 
                        </p>
                        <div className="flex text-md mb-1">
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
                   
                    <p className="text-lg text-white font-semibold mb-1">
                        Light/Dark Mode - Coming Soon!
                        </p>
                        <div className="flex mb-1">
                            <select
                                className="w-full p-2 rounded bg-gray-800/70 text-white"
                            >
                                <option value="">Choose a Style</option>
                                {["Coming Soon!"].map((theme) => (
                                    <option key={theme} value={theme}>
                                        {theme}
                                    </option>
                                ))}
                            </select>
                        </div>
                    
                    <p className="text-lg text-white font-semibold mb-1">
                        Colour Theme - Coming Soon!
                        </p>
                        <div className="flex">
                            <select
                                className="w-full p-2 rounded bg-gray-800/70 text-white"
                            >
                                <option value="">Choose a Theme</option>
                                {["Coming Soon!"].map((fastlink) => (
                                    <option key={fastlink} value={fastlink}>
                                        {fastlink}
                                    </option>
                                ))}
                            </select>
                        </div>
                    


                    <div className="fixed bottom-16 max-w-md w-full left-1/2 -translate-x-1/2 px-2 flex justify-center z-30">
                        <button
                            type="submit"
                            className="text-xl bg-white text-black hover:bg-indigo-300/50 px-4 py-3 w-full rounded-lg font-semibold glowing-button"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );

}