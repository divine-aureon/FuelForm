// NavMenu.tsx

import Link from 'next/link';
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";
import { Lock, Rotate3d, CircleCheckBig, KeyRound, UserPlus , LogIn ,ListChecks, SmilePlus, Dumbbell, Utensils, Globe, LogOut } from 'lucide-react';
import { useGlobalData } from "@/app/initializing/Global/GlobalData";

export default function NavMenuPublic() {


  const isOpen = useGlobalData((s) => s.isOpen);
  const setIsOpen = useGlobalData((s) => s.setIsOpen);
  const setSelectedHomePage = useGlobalData((s) => s.setSelectedHomePage);



  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsOpen(false);
      router.push('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const [isUnlockOpen, setUnlockOpen] = useState(false);


  useEffect(() => {
    if (isUnlockOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isUnlockOpen]);




  return (
    <div className="flex flex-col gap-1 z-60 mb-4 mt-3">
       <div className="text-white rounded-lg p-2 text-center">
      {/*first row*/}
      <div className="grid grid-cols-3 gap-2 w-full rounded-xl mb-2 ">
        <button className="h-[100px]  w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/20 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
          onClick={() => {
            setSelectedHomePage("home");
            setIsOpen(false);
          }}
        >
          Home<Globe size={36} className=" mt-1 text-white transition cursor-pointer" />
        </button>

        <button className="h-[100px]  w-full rounded-xl py-4 leading-none glowing-button2 flex flex-col items-center bg-white/20 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
          onClick={() => {
            setSelectedHomePage("unlock");
            setIsOpen(false);
          }}
        >
          Unlock<KeyRound size={36} className=" mt-1 text-white transition cursor-pointer" />
        </button>

        <button className="h-[100px]  w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/20 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
          onClick={() => {
            setSelectedHomePage("infodex");
            setIsOpen(false);
          }}
        >
          InfoDex<SmilePlus size={36} className=" mt-1 text-white transition cursor-pointer" />
        </button>
      </div>
      {/*2nd row*/}
      <div className="grid grid-cols-2 gap-2 w-full rounded-xl mb-2 ">
        <button className="h-[100px]  w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/40 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
          onClick={() => {
            setSelectedHomePage("login");
            setIsOpen(false);
          }}
        >
          Login<LogIn size={36} className=" mt-1 text-white transition cursor-pointer" />
        </button>

        <button className="h-[100px]  w-full rounded-xl py-4 leading-none flex flex-col items-center bg-white/40 backdrop-blur justify-center hover:bg-indigo-300/50 text-white shadow-md"
          onClick={() => {
            setSelectedHomePage("register");
            setIsOpen(false);
          }}
        >
          Register<UserPlus size={36} className=" mt-1 text-white transition cursor-pointer" />
        </button>
      </div>
      </div>
    </div>
  );
}
