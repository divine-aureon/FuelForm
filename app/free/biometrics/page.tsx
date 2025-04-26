'use client';

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { User } from 'firebase/auth';

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

  const [originalHeightFeet, setOriginalHeightFeet] = useState("");
  const [originalHeightInches, setOriginalHeightInches] = useState("");
  const [originalHeightCm, setOriginalHeightCm] = useState("");

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
          setHeightUnit(data.heightUnit || "cm");
          setHeightCm(data.height_cm || "");
          setHeightFeet(data.height_ft_in.feet || "");
          setHeightInches(data.height_ft_in.inches || "");
          setWeightUnit(data.preferredWeightUnit || "lbs");

          setHeightFeet(data.height_ft_in?.feet || "");
          setHeightInches(data.height_ft_in?.inches || "");
          setHeightCm(data.height_cm || "");

          setOriginalHeightFeet(data.height_ft_in?.feet || "");
          setOriginalHeightInches(data.height_ft_in?.inches || "");
          setOriginalHeightCm(data.height_cm || "");
        }
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {

    if (!user) return; // 🛡️ Make TS happy, and prevent crashes

    setSaving(true);
    setError("");
    setStatus("Biometrics Confirmed!");

    try {
      const finalFeet = heightFeet.trim() === "" ? originalHeightFeet : heightFeet;
      const finalInches = heightInches.trim() === "" ? originalHeightInches : heightInches;
      const finalCm = heightCm.trim() === "" ? originalHeightCm : heightCm;

      await updateDoc(doc(db, "users", user.uid), {
        name,
        birthday: `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`,
        gender,
        heightUnit,
        heightCm: heightUnit === "cm"
          ? parseFloat(finalCm)
          : (parseInt(finalFeet) * 30.48 + parseInt(finalInches) * 2.54),
        height_ft_in: {
          feet: finalFeet,
          inches: finalInches,
          preferredWeightUnit: weightUnit,
        },
      });
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
        router.push("/free/applyingchanges");
      }, 500); // optional delay (1 second)

      return () => clearTimeout(timeout);
    }
  }, [status, router]);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <>

      <div className="min-h-screen flex bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed items-start justify-center bg-black relative pt-5 mb-16">
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
              {[...Array(31)].map((_, i) =>{ 
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
      </div>
    </>
  );
}