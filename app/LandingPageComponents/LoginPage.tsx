'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import ScrollLoad from "@/Backgrounds/ScrollLoad"
import { getGlobalDataState } from "@/app/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/Global/GlobalData";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function LoginComponent() {

  const setSelectedHomePage = useGlobalData((s) => s.setSelectedHomePage);

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState('');



  useEffect(() => {
    const renderCaptcha = () => {
      if (
        typeof window !== 'undefined' &&
        window.grecaptcha &&
        document.getElementById('recaptcha-container') &&
        !document.querySelector('#recaptcha-container iframe')
      ) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.render('recaptcha-container', {
            sitekey: '6Lfbtx4rAAAAACkf2TYkidh9FTFU0g_Ni6_FUeVj',
          });
        });
      }
    };

    const checkInterval = setInterval(() => {
      if (window.grecaptcha && document.getElementById('recaptcha-container')) {
        clearInterval(checkInterval);
        renderCaptcha();
      }
    }, 0);

    return () => clearInterval(checkInterval);
  }, []);


  function convertCmToFeetInches(cm: number) {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return { feet, inches };
  }

  function convertFeetInchesToCm(feet: number, inches: number) {
    return feet * 30.48 + inches * 2.54;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Login logic
      const userCred = await loginUser(email, password);
      const userRef = doc(db, 'users', userCred.user.uid);
      const userDoc = await getDoc(userRef);

      // Check if the user exists in Firestore
      if (userDoc.exists()) {
        const userData = userDoc.data();

        setLoading(true); // 🧠 Start the NavLoad
        router.push('/syncing');
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };


  return (
    <>
      <ScrollLoad />

      <>

        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>

        <div className="mb-10">

          <div>

            <div className="relative h-32 bg-[url('/images/menus/loginimage.jpg')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-4xl glowing-button mb-2">
              <div className="absolute flex flex-col pb-2 items-center bg-indigo-500/30 justify-center inset-0 text-center rounded-xl">
                <div className="flex items-center gap-2 p-2 pulse-glow">Initializing BodySync...</div>
                <h2 className="text-sm font-bold text-white">
                  Progress isn&apos;t just tracked. It&apos;s honored.
                </h2>
              </div>
            </div>
          </div>


          <div className="p-3 rounded-2xl mb-16 shadow-xl bg-white/30">
            <form onSubmit={handleSubmit} className="space-y-1">
              <label htmlFor="email" className="block text-lg text-white  mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/70 text-lg rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              <label htmlFor="password" className="block text-lg text-white mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-800/70 text-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {/* Optional: Future CAPTCHA container */}

              <div id="recaptcha-container" className="flex justify-center my-4 p-4"></div>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

              <p className="text-white"></p>

              <div className="fixed bottom-16 left-0 w-full flex gap-2 justify-center z-30">

                <button
                  type="submit"
                  disabled={loading}

                  className="w-full mt-6 py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-300/70 
              transition text-white font-semibold shadow glowing-button"
                >
                  {loading ? 'Engaging...' : "Login"}
                </button>
              </div>
            </form>

            <div className="text-xl text-center mb-5">
              <p>
                Dont Have an Account?{' '}
                <span
                  className="text-indigo-500 pulse-glow hover:underline cursor-pointer"
                  onClick={() => setSelectedHomePage("register")}
                >
                  Register
                </span>
              </p>
            </div>
            <div className="all-[unset]">
            </div>
          </div>
        </div>

      </>

    </>
  )
};