"use client";

import { useState } from "react";

export default function TestWebhookPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleTestWebhook = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "stripe-signature": "test-signature", // not used for mock
      },
      body: JSON.stringify({
        id: "evt_test_webhook",
        type: "checkout.session.completed",
        data: {
          object: {
            metadata: {
              userId: "zoxRyDivqdSjiqo8GNvAwwzPyUn2", // 🔥 use a valid test UID here
            },
          },
        },
      }),
    });

    const data = await res.json();
    setResult(`✅ Response: ${JSON.stringify(data)}`);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Stripe Webhook</h1>
      <button
        onClick={handleTestWebhook}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        {loading ? "Sending..." : "Trigger Webhook"}
      </button>

      {result && <pre className="mt-4 bg-gray-100 p-4 rounded">{result}</pre>}
    </div>
  );
}
