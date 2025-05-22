'use client';
import { getGlobalDataState } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { UserProfile } from "../../initializing/Global/BodySyncManifest"

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import type { User } from 'firebase/auth';
import useAuth from '@/lib/useAuth';

function toSafeString(value: any): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  return "";
}

export default function BiometricsComponent() {

  const { user } = useAuth();
  const router = useRouter();

      const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE
  const setUserProfile = useGlobalData((s) => s.setUserProfile);
  const setUserProfileSTORE = getGlobalDataState().setUserProfileSTORE;

  const isOpen = useGlobalData((s) => s.isOpen);
  const setIsOpen = useGlobalData((s) => s.setIsOpen);
  const setSelectedPage = useGlobalData((s) => s.setSelectedPage);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");

  const [year, month, day] = (userProfile?.birthday || "--").split("-");

  const [name, setName] = useState(userProfile?.name);
  const [birthMonth, setBirthMonth] = useState(month);
  const [birthDay, setBirthDay] = useState(day);
  const [birthYear, setBirthYear] = useState(year);
  const [gender, setGender] = useState(userProfile?.gender);
  const [height_cm, setHeight_cm] = useState(userProfile?.height_cm);
  const [feet, setFeet] = useState(userProfile?.height_ft_in?.feet);
  const [inches, setInches] = useState(userProfile?.height_ft_in?.inches);

  const [heightUnit, setHeightUnit] = useState(userProfile?.preferredHeightUnit);
  const [weightUnit, setWeightUnit] = useState(userProfile?.preferredWeightUnit);


  const [String_height_cm, setString_Height_cm] = useState(toSafeString(height_cm));
  const [String_feet, setString_Feet] = useState(toSafeString(feet));
  const [String_inches, setString_Inches] = useState(toSafeString(inches));


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const FinalBirthday = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;
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


    //const calculatedHeightCm = parseInt(finalFeet, 10) * 30.48 + parseInt(finalInches, 10) * 2.54;
    let final_feet = 0;
    let final_inches = 0;
    let final_height_cm = 0;

    if (heightUnit === "cm") {

      const Number_height_cm = parseInt(String_height_cm, 10) || 0

      const Height_cm_conversion_Inches = Number_height_cm / 2.54;
      final_feet = Math.floor(Height_cm_conversion_Inches / 12);
      final_inches = Math.round(Height_cm_conversion_Inches % 12);

      final_height_cm = Number_height_cm

    }


    if (heightUnit === "ft/in") {

      const Number_feet = parseInt(String_feet, 10) || 0
      const Number_inches = parseInt(String_inches, 10) || 0

      const Height_inches_conversion_inches = (Number_feet * 12) + Number_inches

      final_height_cm = Height_inches_conversion_inches * 2.54;

      final_feet = Number_feet
      final_inches = Number_inches

    }


    const userId = auth.currentUser!.uid;
    const userRef = doc(db, "users", userId,);

    try {
      await setDoc(userRef, {
        name,
        birthday: FinalBirthday,
        age,
        preferredHeightUnit: heightUnit,
        preferredWeightUnit: weightUnit,
        gender,
        height_cm: final_height_cm,
        height_ft_in: {
          feet: final_feet,
          inches: final_inches,
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
        router.push('/initializing');
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [status , router]);


  return (

    <div className="flex items-center justify-center min-h-[80px] flex-col">

      <div className="h-32 relative w-full bg-[url('/images/menus/biometrics.webp')] bg-cover bg-center bg-no-repeat rounded-2xl border 
        border-white/30 shadow-xl text-white text-3xl glowing-button mb-2">
        <div className="absolute inset-0 pt-3 flex-col items-center bg-indigo-500/30 justify-center text-center rounded-xl">
          <div className="text-center gap-2 pulse-glow">Modify Biometrics</div>
          <h2 className="text-sm font-bold text-white">
            Before you can change, you must know where you are. These are your fundamentals.
          </h2>
        </div>
      </div>


      <div className="bg-white/30 text-left w-full rounded-xl p-3 mb-10">
        <p className=" text-lg text-white font-semibold">
          Name
        </p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white"
        />
        <p className="text-white font-semibold text-lg">
          Gender
        </p>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p className="text-white font-semibold text-lg">
          Birthday
        </p>
        <div className="flex gap-2 mb-2">
          <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="w-full p-2 rounded bg-gray-800/70 text-white">
            <option value="">Month</option>
            {[...Array(12)].map((_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              return <option key={i} value={month}>{month}</option>;
            })}
          </select>
          <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="w-full p-2 rounded bg-gray-800/70 text-white">
            <option value="">Day</option>
            {[...Array(31)].map((_, i) => {
              const day = (i + 1).toString().padStart(2, "0");
              return <option key={i} value={day}>{day}</option>;
            })}
          </select>
          <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="w-full p-2 rounded bg-gray-800/70 text-white">
            <option value="">Year</option>
            {[...Array(100)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={i} value={year.toString()}>{year}</option>;
            })}
          </select>
        </div>


        <p className="text-white font-semibold text-lg ">
          Calibrate Preferred Unit of Measure
        </p>
        <select
          value={heightUnit}
          onChange={(e) => setHeightUnit(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white"
        >
          <option value="cm">Centimeters (cm)</option>
          <option value="ft/in">Feet & Inches</option>
        </select>

        <select
          value={weightUnit}
          onChange={(e) => setWeightUnit(e.target.value)}
          className="w-full p-2 mb-2 rounded bg-gray-800/70 text-white"
        >
          <option value="lbs">Pounds (lbs)</option>
          <option value="kg">Kilograms (kg)</option>
        </select>


        <p className="text-white font-semibold text-lg">
          Set Height ({heightUnit === "cm" ? "cm" : "ft/in"})
        </p>

        {heightUnit === "cm" ? (
          <input
            type="number"
            placeholder={`Height (${heightUnit})`}
            value={String_height_cm}
            onChange={(e) => setString_Height_cm(e.target.value)}
            className="w-full p-2 rounded bg-gray-800/70 text-white"
            min="30"
            max="280"
          />
        ) : (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Feet"
              value={String_feet}
              onChange={(e) => setString_Feet(e.target.value)}
              className="w-1/2 p-2 rounded bg-gray-800/70 text-white"
              min="0"
            />
            <input
              type="number"
              placeholder="Inches"
              value={String_inches}
              onChange={(e) => setString_Inches(e.target.value)}
              className="w-1/2 p-2 rounded bg-gray-800/70 text-white"
              min="0"
              max="11"
            />
          </div>
        )}
        <div className="fixed bottom-16 px-2 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-center z-30">

          <button
            onClick={handleSubmit}
            className="max-w-md w-full bg-white text-xl text-black px-4 py-4 rounded-xl font-semibold hover:bg-gray-300 transition glowing-button"
            disabled={saving}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}