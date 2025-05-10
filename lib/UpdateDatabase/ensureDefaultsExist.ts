import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile , defaultProfile } from "@/lib/UpdateDatabase/types"; // or wherever you defined it

export async function ensureDefaultsExist(userId: string, currentProfile: UserProfile) {
  const ref = doc(db, "users", userId);
  const updates: Record<string, any> = {};

  const flatten = (obj: any, prefix = ""): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(result, flatten(obj[key], fullKey));
      } else {
        result[fullKey] = obj[key];
      }
    }
    return result;
  };

  const defaultFlat = flatten(defaultProfile);
  const currentFlat = flatten(currentProfile);

  for (const key in defaultFlat) {
    if (!(key in currentFlat)) {
      updates[key] = defaultFlat[key];
    }
  }

  if (Object.keys(updates).length > 0) {
    await updateDoc(ref, updates);
    console.log("⚙️ Patched missing fields:", updates);
  } else {
    console.log("✅ No updates needed.");
  }
}
