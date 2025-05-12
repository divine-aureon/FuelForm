
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

export default function CancelButton() {

    const [loading, setLoading] = useState(false);

    const handleCancelSubscription = async () => {

        setLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;


        const res = await fetch("/api/create-portal-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid }), // replace with your current UID
        });

        const data = await res.json();
        if (data?.url) window.location.href = data.url;
    };

    return (
        <button onClick={handleCancelSubscription} className="text-white text-xl">
            Revoke Access Codes..
        </button>
    );
}
