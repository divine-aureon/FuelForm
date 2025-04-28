'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser, registerUser } from '../../lib/auth';
import { db } from '../../lib/firebase';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryMode = useSearchParams()?.get("querymode") ?? null;
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [height_cm, setHeightcm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [preferredHeightUnit, setPreferredHeightUnit] = useState("cm");
  const [preferredWeightUnit, setPreferredWeightUnit] = useState("lbs")

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');

  useEffect(() => {
    if (queryMode === 'register' || queryMode === 'login') {
      setMode(queryMode);
    }
  }, [queryMode]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      console.log("✅ grecaptcha found immediately, initializing...");
      window.grecaptcha.ready(() => {
        if (!document.querySelector("#recaptcha-container iframe")) {
          console.log("Rendering reCAPTCHA now...");
          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6Lfbtx4rAAAAACkf2TYkidh9FTFU0g_Ni6_FUeVj",
          });
        } else {
          console.log("reCAPTCHA already rendered.");
        }
      });
    } else {
      console.error("❌ grecaptcha not available immediately!");
    }
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
      if (mode === 'login') {
        // Login logic
        const userCred = await loginUser(email, password);
        const userRef = doc(db, 'users', userCred.user.uid);
        const userDoc = await getDoc(userRef);

        // Check if the user exists in Firestore
        if (userDoc.exists()) {
          const userData = userDoc.data();

          router.push('/loginaccess');  // Regular login access for everyone
        }
      } else {
        // Registration logic
        const userCred = await registerUser(email, password);

        // Height
        let finalHeightCm = 0;
        let finalFeet = 0;
        let finalInches = 0;

        if (preferredHeightUnit === "cm") {
          finalHeightCm = Number(height_cm);
          const { feet: convertedFeet, inches: convertedInches } = convertCmToFeetInches(finalHeightCm);
          finalFeet = convertedFeet;
          finalInches = convertedInches;
        } else {
          const feetNum = Number(heightFeet);
          const inchesNum = Number(heightInches);
          finalFeet = feetNum;
          finalInches = inchesNum;
          finalHeightCm = convertFeetInchesToCm(feetNum, inchesNum);
        }

        const finalBirthYear = birthYear || "0000";
        const finalBirthMonth = birthMonth || "00";
        const finalBirthDay = birthDay || "00";

        // 🗓 Build DateOfBirth
        const DateOfBirth = `${finalBirthYear.padStart(4, '0')}-${finalBirthMonth.padStart(2, '0')}-${finalBirthDay.padStart(2, '0')}`;

        // 🧠 Calculate age directly from birth values
        const birthY = Number(birthYear);
        const birthM = Number(birthMonth);
        const birthD = Number(birthDay);
        const today = new Date();

        let age = today.getFullYear() - birthY;
        const monthDiff = today.getMonth() + 1 - birthM;
        const dayDiff = today.getDate() - birthD;

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        await setDoc(doc(db, 'users', userCred.user.uid), {
          name,
          email: userCred.user.email,
          birthday: DateOfBirth,
          gender,
          preferredHeightUnit: 'cm',
          preferredWeightUnit: 'lbs',
          height_cm: finalHeightCm,
          height_ft_in: { feet: finalFeet, inches: finalInches },
          age,
          isPaid: false,
          calorieGoal: 0,
          createdAt: serverTimestamp(),
        });
        router.push('/loginaccess');
      }

    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <script
        src="https://www.google.com/recaptcha/api.js"
        async
        defer
      ></script>

      <main className="min-h-screen bg-[url('/images/login.webp')] bg-cover bg-center bg-no-repeat text-white flex justify-center px-4 pb-20">
        <div className="max-w-md w-full bg-black/70 p-8 rounded-2xl shadow-xl flex flex-col">
          <h1 className="text-4xl font-bold text-center  mb-6 pulse-glow">
            {mode === 'login' ? 'Enter Command Console' : 'Establishing Nueral Link...'}
          </h1>



          <form onSubmit={handleSubmit} className="space-y-1">
            <label htmlFor="email" className="block text-sm text-white  mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {mode === 'register' && (
              <>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />

                <fieldset className="mb-4">
                  <legend className="block text-sm text-gray-300 mb-1">Date of Birth</legend>

                  <div className="flex gap-2">
                    <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="p-3 rounded bg-gray-800 text-white w-1/3" required>
                      <option value="">Month</option>
                      {Array.from({ length: 12 }, (_, i) => {
                        const val = String(i + 1).padStart(2, '0');
                        return <option key={val} value={val}>{val}</option>;
                      })}
                    </select>

                    <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="p-3 rounded bg-gray-800 text-white w-1/3" required>
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => {
                        const val = String(i + 1).padStart(2, '0');
                        return <option key={val} value={val}>{val}</option>;
                      })}
                    </select>

                    <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="p-3 rounded bg-gray-800 text-white w-1/3" required>
                      <option value="">Year</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = String(new Date().getFullYear() - i);
                        return <option key={year} value={year}>{year}</option>;
                      })}
                    </select>
                  </div>
                </fieldset>


                <label htmlFor="gender" className="block text-sm text-gray-300 mb-1">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <fieldset className="mb-4">
                  <legend className="block text-sm text-gray-300 mb-1">Enter Height</legend>

                  {preferredHeightUnit === "ft" ? (
                    <div className="flex space-x-2">
                      <div className="w-1/2">
                        <label htmlFor="heightFeet" className="block text-xs text-gray-400 mb-1">Feet</label>
                        <input
                          id="heightFeet"
                          type="number"
                          placeholder="Feet"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(e.target.value)}
                          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div className="w-1/2">
                        <label htmlFor="heightInches" className="block text-xs text-gray-400 mb-1">Inches</label>
                        <input
                          id="heightInches"
                          type="number"
                          placeholder="Inches"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value)}
                          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="heightCm" className="block text-xs text-gray-400 mb-1">Height (cm)</label>
                      <input
                        id="heightCm"
                        type="number"
                        placeholder="Centimeters"
                        value={height_cm}
                        onChange={(e) => setHeightcm(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  )}
                </fieldset>


                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="text-sm block mb-1">Prefered Height Unit</label>
                    <select
                      value={preferredHeightUnit}
                      onChange={(e) => setPreferredHeightUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="cm">Centimeters</option>
                      <option value="ft">Feet/Inches</option>
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="text-sm block mb-1">Prefered Weight Unit</label>
                    <select
                      value={preferredWeightUnit}
                      onChange={(e) => setPreferredWeightUnit(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="lbs">Pounds</option>
                      <option value="kg">Kilograms</option>
                    </select>

                  </div>

                </div>

              </>

            )}
            {/* Optional: Future CAPTCHA container */}
            <div id="recaptcha-container" className="flex justify-center my-4 p-4"></div>

            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

            <p className="text-white"></p>

            <button
              type="submit"
              disabled={loading}

              className="w-full mt-6 py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold shadow"
            >
              {loading ? 'Engaging...' : mode === 'login' ? 'Login' : 'Register'}
            </button>

          </form>

          <div className="text-sm text-center mt-6">
            {mode === 'login' ? (
              <p>
                Dont Have an Account?{' '}
                <span
                  className=" text-indigo-400 hover:underline cursor-pointer"
                  onClick={() => setMode('register')}
                >
                  Register
                </span>
              </p>
            ) : (
              <p>
                Already Have an Account?{' '}
                <span
                  className="text-indigo-400 hover:underline cursor-pointer"
                  onClick={() => setMode('login')}
                >
                  Login
                </span>
              </p>
            )}
          </div>
          <div className="all-[unset]">
            <div className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-5 border-t border-white/20 z-50">
              <Link href="/" className="text-base text-[32px] hover:underline">
                Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
