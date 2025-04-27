'use client';

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from 'firebase/auth';
import { profile } from "console";


function toSafeString(value: any): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  return "";
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");

  const [weightUnit, setWeightUnit] = useState("lbs");

  const [originalName, setOriginalName] = useState("");
  const [originalBirthYear, setOriginalBirthYear] = useState("");
  const [originalBirthMonth, setOriginalBirthMonth] = useState("");
  const [originalBirthDay, setOriginalBirthDay] = useState("");
  const [originalGender, setOriginalGender] = useState("");
  const [originalHeightUnit, setOriginalHeightUnit] = useState("cm");
  const [originalHeightCm, setOriginalHeightCm] = useState("");
  const [originalHeightFeet, setOriginalHeightFeet] = useState("");
  const [originalHeightInches, setOriginalHeightInches] = useState("");
  const [originalWeightUnit, setOriginalWeightUnit] = useState("lbs");

  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");

          const [year, month, day] = (data.birthday || "--").split("-");
          setBirthYear(year || "");
          setBirthMonth(month || "");
          setBirthDay(day || "");

          setGender(data.gender || "");
          setHeightUnit(data.preferredHeightUnit || "cm");
          console.log("Loaded heightUnit:", data.heightUnit);

          setHeightCm(data.height_cm || "");
          setHeightFeet(data.height_ft_in?.feet || ""); // ✅ safer now
          setHeightInches(data.height_ft_in?.inches || "");
          setWeightUnit(data.preferredWeightUnit || "lbs");

          // 🛡️ Now setting original values for smart-change detection
          setOriginalName(data.name || "");
          setOriginalBirthYear(year || "");
          setOriginalBirthMonth(month || "");
          setOriginalBirthDay(day || "");
          setOriginalGender(data.gender || "");
          setOriginalHeightUnit(data.preferredHeightUnit || "cm");
          setOriginalHeightCm(data.height_cm || "");
          setOriginalHeightFeet(data.height_ft_in?.feet || "");
          setOriginalHeightInches(data.height_ft_in?.inches || "");
          setOriginalWeightUnit(data.preferredWeightUnit || "lbs");
        }
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    setError("");
    setStatus("Biometrics Confirmed!");

    try {
      let finalFeet = "";
      let finalInches = "";
      let finalCm = "";

      if (heightUnit === "ft") {
        const feetStr = toSafeString(heightFeet);
        const inchesStr = toSafeString(heightInches);

        finalFeet = feetStr.trim() === "" ? originalHeightFeet : feetStr;
        finalInches = inchesStr.trim() === "" ? originalHeightInches : inchesStr;
      }

      if (heightUnit === "cm") {
        const cmStr = toSafeString(heightCm);
        finalCm = cmStr.trim() === "" ? originalHeightCm : cmStr;
      }

      const updates: any = {};

      // Only save fields that can be edited in Biometrics
      if (name !== originalName) updates.name = name;

      if (birthYear !== originalBirthYear || birthMonth !== originalBirthMonth || birthDay !== originalBirthDay) {
        updates.birthday = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;
      }
      if (gender !== originalGender) updates.gender = gender;

      if (heightUnit !== originalHeightUnit) updates.preferredHeightUnit = heightUnit;

      if (weightUnit !== originalWeightUnit) {
        updates.preferredWeightUnit = weightUnit;
      }

      if (heightUnit === "ft") {
        if (finalFeet !== originalHeightFeet || finalInches !== originalHeightInches) {
          const calculatedHeightCm = parseInt(finalFeet, 10) * 30.48 + parseInt(finalInches, 10) * 2.54;

          updates.height_ft_in = {
            feet: parseInt(finalFeet, 10) || 0,
            inches: parseInt(finalInches, 10) || 0,
          };

          updates.height_cm = calculatedHeightCm; // 🔥 Always store cm too
        }
      }

      if (heightUnit === "cm") {
        if (parseFloat(finalCm) !== parseFloat(originalHeightCm)) {
          const cmValue = parseFloat(finalCm);

          const totalInches = cmValue / 2.54;
          const feet = Math.floor(totalInches / 12);
          const inches = Math.round(totalInches % 12); // 🔥 round to nearest inch

          updates.height_cm = cmValue; // 🔥 always store cm
          updates.height_ft_in = {    // 🔥 auto-calculate feet/inches too
            feet: feet,
            inches: inches,
          };
        }
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, "users", user.uid), updates);
        console.log("✅ Biometrics updated with:", updates);
      } else {
        console.log("ℹ️ No changes detected — skipping update.");
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Unable to update.");
    }

    setSaving(false);
  };

  useEffect(() => {
    if (status === "Biometrics Confirmed!") {
      const timeout = setTimeout(() => {
        router.push("/aegis/loadingpages/applyingchanges");
      }, 500); // optional delay (1 second)

      return () => clearTimeout(timeout);
    }
  }, [status, router]);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <>

      <main className="min-h-screen flex bg-[url('/images/bg.webp')] bg-cover bg-center bg-no-repeat items-start justify-center bg-black relative pt-5 mb-16">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="w-full max-w-md px-4 z-10">
          <h1 className="text-2xl font-bold mb-6 text-center">Modify Biometrics</h1>
          <p className="text-white font-semibold text-sm mb-2 mt-4">
            Designate Your Chosen Identity
          </p>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
          />
          <p className="text-white font-semibold text-sm mb-2 mt-4">
            Gender
          </p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p className="text-white font-semibold text-sm mb-2 mt-4">
            Incarnation Signature
          </p>
          <div className="flex gap-2 mb-4">
            <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="p-2 rounded bg-gray-800 text-white">
              <option value="">Month</option>
              {[...Array(12)].map((_, i) => {
                const month = (i + 1).toString().padStart(2, "0");
                return <option key={i} value={month}>{month}</option>;
              })}
            </select>
            <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className="p-2 rounded bg-gray-800 text-white">
              <option value="">Day</option>
              {[...Array(31)].map((_, i) => {
                const day = (i + 1).toString().padStart(2, "0");
                return <option key={i} value={day}>{day}</option>;
              })}
            </select>
            <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="p-2 rounded bg-gray-800 text-white">
              <option value="">Year</option>
              {[...Array(100)].map((_, i) => {
                const year = new Date().getFullYear() - i;
                return <option key={i} value={year}>{year}</option>;
              })}
            </select>
          </div>


          <p className="text-white font-semibold text-sm mb-2 mt-4">
            Calibrate Your Form of Measurement
          </p>
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          >
            <option value="cm">Centimeters (cm)</option>
            <option value="ft">Feet & Inches</option>
          </select>

          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
          >
            <option value="lbs">Pounds (lbs)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
          <p className="text-white font-semibold text-sm mb-2 mt-4">
            Set Height Parameter ({heightUnit === "cm" ? "cm" : "ft/in"})
          </p>

          {heightUnit === "cm" ? (
            <input
              type="number"
              placeholder={`Height (${heightUnit})`}
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
              min="30"
              max="280"
            />
          ) : (
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                placeholder="Feet"
                value={heightFeet}
                onChange={(e) => setHeightFeet(e.target.value)}
                className="w-1/2 p-2 rounded bg-gray-800 text-white"
                min="0"
              />
              <input
                type="number"
                placeholder="Inches"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
                className="w-1/2 p-2 rounded bg-gray-800 text-white"
                min="0"
                max="11"
              />
            </div>
          )}

          <div className="mt-6"></div>
          <button
            onClick={handleSave}
            className="w-full bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-gray-300 transition glowing-button"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </main>
    </>
  );
}