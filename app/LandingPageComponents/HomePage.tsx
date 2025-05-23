'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Fingerprint } from 'lucide-react';
import NavPortalPublic from "./ControlHubPublic/ControlHubBarPublic"
import HomeLoad from "@/app/LoadingComponents/HomeLoad";
import PageFadeWrapper from "@/Backgrounds/PageFadeWrapper"
import { motion, AnimatePresence } from "framer-motion";
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";
import LoginComponent from "./LoginPage"
import RegisterComponent from "./RegisterPage"
import AboutComponent from "./AboutPage"
import InfoDexPublic from "../LandingPageComponents/InfoDexPublicPage"
import UnlockPage from "../OverViewComponents/CustomerPortal/UnlockPageComponent"
import SourcesComponent from "./SourcesPage"

export default function HomeComp() {

    const HomeDefault = useGlobalData((s) => s.HomeDefault);
    useEffect(() => {
        setSelectedHomePage(HomeDefault);
    }, []);


    const selectedHomePage = useGlobalData((s) => s.selectedHomePage);
    const pageView = selectedHomePage || "home";

    const setSelectedHomePage = useGlobalData((s) => s.setSelectedHomePage);

    const BG: Record<string, string> = {
        "homepage2": "/images/home2.jpg",
    };
    const backgroundURL = BG["homepage2"];

    return (
        <>
            <HomeLoad />
            <PageFadeWrapper>


                <div
                    className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${backgroundURL}')`,
                        minHeight: '100%',
                        height: '100%', // Not 100vh!
                    }}
                />




                <div className=" z-0 scrollbar-hide">
                    {/*PAGE ONE === Home*/}
                    <div className="rounded-xl z-50">
                        <AnimatePresence mode="wait">
                            {pageView === "home" && (
                                <motion.div
                                    key="home"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}>
                                    <>

                                        <div className="">
                                            <div className="z-10 flex justify-center">

                                                <div className="fixed top-4 px-2 w-full max-w-md">
                                                    <div className="h-32 bg-[url('/images/menus/biocard.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-7xl glowing-button2 mb-2">
                                                        <div className="h-32 flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                                                            <div className="flex items-center gap-2">BodySync</div>
                                                            <h2 className="text-lg font-bold text-white">
                                                                Adaptive Metabolic Interface v1.6.2
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="fixed inset-0 flex items-center justify-center z-10">
                                                <div className="w-40 h-40 bg-white/10 rounded-full flex flex-col items-center justify-center animate-pulse shadow-xl">
                                                    <span className="text-center text-2xl font-semibold text-white">Decrypting</span>
                                                    <Fingerprint size={64} className="mt-2 text-white cursor-pointer" />
                                                </div>
                                            </div>



                                            <div className="z-20 relative flex justify-center ">
                                                <div className="fixed bottom-14 px-2 w-full grid grid-cols-2 gap-3 max-w-md">
                                                    <button onClick={() => {
                                                        setSelectedHomePage("login");
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                    }}
                                                        className="block ">
                                                        <div className="relative h-16 bg-[url('/images/menus/loginimage.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border border-white/30 shadow-xl text-white text-2xl glowing-button mb-2 flex items-center justify-center">
                                                            Login
                                                        </div>
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setSelectedHomePage("register");
                                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                                        }}
                                                        className="block">
                                                        <div className="relative h-16 bg-[url('/images/menus/register.webp')] bg-cover bg-center bg-no-repeat rounded-2xl border border-white/30 shadow-xl text-white text-2xl glowing-button mb-2 flex items-center justify-center">
                                                            Sign Up
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                </motion.div>)}

                            {/*PAGE 2 - STATS ECHO*/}
                            {pageView === "login" && (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}>
                                    <>

                                        <LoginComponent />

                                    </>
                                </motion.div>)}

                            {pageView === "register" && (
                                <motion.div
                                    key="register"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}>
                                    <>
                                        <RegisterComponent />

                                    </>
                                </motion.div>)}




                            {/*PAGE THREE OF COMMAND CENTER*/}
                            {pageView === "about" && (
                                <motion.div
                                    key="about"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}>

                                    <AboutComponent />

                                </motion.div>
                            )}

                            {pageView === "sources" && (
                                <motion.div
                                    key="sources"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}>


                                    <SourcesComponent />
                                </motion.div>
                            )}


                            {pageView === "infodex" && (
                                <motion.div
                                    key="infodex"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}>


                                    <InfoDexPublic />
                                </motion.div>
                            )}


                            {pageView === "unlock" && (
                                <motion.div
                                    key="unlock"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}>


                                    <UnlockPage />
                                </motion.div>
                            )}




                        </AnimatePresence>

                        <footer className="pt-4 pb-2">
                            <NavPortalPublic />
                        </footer>

                    </div>

                </div>


            </PageFadeWrapper>
        </>
    )
};
