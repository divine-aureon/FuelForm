'use client';

export default function SuccessLoad() {

  return (
    <div className="fixed inset-0 bg-[url('/images/loading.jpg')] 
    bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
    <p className="text-xl font-bold text-white animate-pulse">Upgrading Access Codes...</p>
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping" />
      <div className="relative w-16 h-16 rounded-full bg-blue-500 animate-pulse" />
    </div>
  </div>
  );
}
