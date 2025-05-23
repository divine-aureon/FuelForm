import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { User } from "firebase/auth";
import { setGlobalDataStore ,getGlobalDataState} from "@/app/Global/store/globalStoreInstance";
import { sanitizeEmail } from "../lib/utils";


export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
      setLoading(false);

      // ✅ Now safe to run this, because `user` is defined inside the block
      if (user?.email) {
        const key = `BodySync_${sanitizeEmail(user.email)}`;
        setGlobalDataStore(key);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
