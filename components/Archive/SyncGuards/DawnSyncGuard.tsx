'use client';

import  TodaysSync from '@/lib/hooks/TodaysSync'; // or wherever your custom hook is

export default function DawnSyncGuard() {

  const { hasDawnSyncedToday } = TodaysSync();

  if (!hasDawnSyncedToday) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/70 flex items-center justify-center text-white text-center px-4">
      <div className="bg-white/10 backdrop-blur p-6 rounded-xl shadow-xl max-w-md">
        <p className="text-lg font-bold mb-4">Already Synced</p>
        <p>Initiate DawnSync Override to Sync</p>
        <button
          onClick={() => window.location.href = '/neurosettings'}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Proceed to NeuroSettings
        </button>
      </div>
    </div>
  );
}
