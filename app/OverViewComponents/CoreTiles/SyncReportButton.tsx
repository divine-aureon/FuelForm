import { AutoClamp } from "@/lib/hooks/AutoClamp";
import { Rotate3d } from "lucide-react";
import Link from "next/link";

export default function SyncReportTile({ isPaidUser }: { isPaidUser: boolean }, { href, label }: { href: string; label: string }) {

    const { ref, isNarrow, width } = AutoClamp(225); // threshold can be adjusted

    return (

        <>
            {isPaidUser ? (
                <>


                    <Link href="/SyncReport">
                        <div className="w-full h-32 bg-[url('/images/greyscale/SyncReport.webp')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                ref={ref}
                                className="w-full h-full bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] flex flex-col justify-center items-center text-center p-2">
                                <div
                                    className={`flex items-center gap-2 font-semibold
                                        ${isNarrow ? "text-xl" : "text-2xl"
                                        }`}
                                >
                                    <Rotate3d />
                                    SyncReport

                                </div>
                                <h2 className="text-sm font-bold text-white">Log. Reflect. Evolve.</h2>
                            </div>
                        </div>
                    </Link>

                </>
            ) : (
                <>


                    <Link href="/SyncReport">
                        <div className="w-full h-32 bg-[url('/images/greyscale/SyncReport.webp')] bg-cover bg-center bg-no-repeat  glowing-button2">
                            <div
                                ref={ref}
                                className="w-full h-full bg-[rgba(43,0,255,0.3)] hover:bg-[rgba(101,70,255,0.3)] flex flex-col justify-center items-center text-center p-2">
                                <div
                                    className={`flex items-center gap-2 font-semibold
                                        ${isNarrow ? "text-xl" : "text-2xl"
                                        }`}
                                >
                                    <Rotate3d />
                                    SyncReport

                                </div>
                                <h2 className="text-sm font-bold text-white">Unlock to Start Tracking.</h2>
                            </div>
                        </div>
                    </Link>

                </>
            )}

        </>

    );
}
