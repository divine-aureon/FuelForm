'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginUser, registerUser } from '../../lib/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import convertWeight from '../hooks/useFuelUnits';
import Link from "next/link";


export default function LoginPage() {
  const isLoggedIn = useIsLoggedIn(); // auto-redirect if needed
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryMode = useSearchParams()?.get("querymode") ?? null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [weight_lbs, setWeightlbs] = useState('');
  const [weight_kg, setWeightkg] = useState('');
  const [height_cm, setHeightcm] = useState('');
  const [feet, setHeightFeet] = useState('');
  const [inches, setHeightInches] = useState(''); 
  const [preferredHeightUnit, setPreferredHeightUnit] = useState('cm');
  const [preferredWeightUnit, setPreferredWeightUnit] = useState('lbs')


  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryMode === 'register' || queryMode === 'login') {
      setMode(queryMode);
    }
  }, [queryMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginUser(email, password);
      } else {
        const userCred = await registerUser(email, password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
          name: '',
          birthday: '',
          gender: '',
          preferredHeightUnit: 'cm',
          preferredWeightUnit: 'lbs',
          height_cm: 0,
          height_ft_in: { feet: 0, inches: 0 },
          heightUnit: 'cm',
          heightCm: 0,
          age: 0,
          weight_lbs,
          createdAt: serverTimestamp(),
        });
      }

      router.push('/commandcenter');
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>

    <main className="min-h-screen bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed text-white flex  justify-center px-4 pb-20">
      <div className="max-w-md w-full bg-black/70 p-8 rounded-2xl shadow-xl flex flex-col">
        <h1 className="text-4xl font-bold text-center  mb-6 pulse-glow">
          {mode === 'login' ? 'Enter Command Console' : 'Establishing Nueral Link...'}
        </h1>


        
        <form onSubmit={handleSubmit} className="space-y-1">
        <label className="block text-sm text-white  mb-1">Email Address</label>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

<label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            placeholder= ""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

{mode === 'register' && (
  <>
  <label className="block text-sm text-gray-300 mb-1">Name</label>
    <input
      type="text"
      placeholder=""
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />

<label className="block text-sm text-gray-300 mb-1">Date of Birth</label>
    <input
      type="date"
      placeholder="Birthday"
      value={birthday}
      onChange={(e) => setBirthday(e.target.value)}
      className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />

<label className="block text-sm text-gray-300 mb-1">Gender</label>
    <select
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>

    <label className="block text-sm text-gray-300 mb-1">Enter Weight</label>

    {preferredWeightUnit === "lbs" ? (
  <input
    type="number"
    placeholder="(lbs)"
    value={weight_lbs}
    onChange={(e) => setWeightlbs(e.target.value)}
    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
) : (
  <input
    type="number"
    placeholder="(kg)"
    value={weight_kg}
    onChange={(e) => setWeightkg(e.target.value)}
    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
)}

<label className="block text-sm text-gray-300 mb-1">Enter Height</label>

{/* Height Input */}
{preferredHeightUnit === "ft/in" ? (
  <div className="flex space-x-2">
    <input
      type="number"
      placeholder="(Feet)"
      value={feet}
      onChange={(e) => setHeightFeet(e.target.value)}
      className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />
    <input
      type="number"
      placeholder="(Inches)"
      value={inches}
      onChange={(e) => setHeightInches(e.target.value)}
      className="w-1/2 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />
  </div> ) : (
  <input
    type="number"
    placeholder="(cm)"
    value={height_cm}
    onChange={(e) => setHeightcm(e.target.value)}
    className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  />
)}

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
          <div id="recaptcha-container" className="mt-4" />

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
              Don't Have an Account?{' '}
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
