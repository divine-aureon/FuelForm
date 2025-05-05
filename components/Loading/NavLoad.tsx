'use client';
export default function NavLoad() {

  return (

    <div className="fixed inset-0 bg-[url('/images/loading.jpg')] 
    bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
    <p className="text-3xl font-bold text-white animate-pulse">Teleporting...</p>
  </div>
  );
}
