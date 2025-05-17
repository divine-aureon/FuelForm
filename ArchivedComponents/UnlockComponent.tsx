'use client';

import UpgradeButton from "@/app/OverViewComponents/CustomerPortal/UpgradeButton"

const UnlockComponent = () => {

  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col pb-32">
        <div className="bg-white/30 rounded-3xl p-3">

          <div className="grid grid-cols-2 gap-3">

            <div className="relative flex justify-center h-32 bg-[url('/images/menus/unlock.jpg')] bg-cover bg-center bg-no-repeat rounded-3xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button mb-2 p-3">

              <div className="absolute inset-0 flex items-center bg-indigo-500/30 justify-center text-center rounded-3xl">
                <div className="flex items-center pulse-glow rounded-xl">Upgrade Access Codes</div>
              </div>

            </div>
            <div className="relative flex justify-center h-32 bg-[url('/images/menus/price.png')] bg-cover bg-center bg-no-repeat rounded-3xl border 
      border-white/30 shadow-xl text-white text-3xl glowing-button mb-2 p-3">

              <div className="absolute inset-0 flex items-center justify-center text-center rounded-xl">
                <div className=" bg-cover bg-center bg-no-repeat text-4xl h-32 w-32 flex justify-center rounded-3xl font-bold text-white"></div>
              </div>

            </div>
          </div>

          <div className="relative bg-[url('/images/menus/cardbio.jpg')] bg-cover bg-center mb-2 overflow-hidden bg-no-repeat text-lg bg-white/30 rounded-3xl font-bold text-white text-center">
            <div className="inset-0  bg-indigo-300/30 p-6">
              <div className="text-3xl pulse-glow">
                Get 1 Month <br />
                AT NO COST with PromoCode: <br />
                ACCESSCODES <br />
              </div>
              <br />

              Upgrade to gain access to your Blueprint, track your Syncs, log your workouts, build meal plans, and watch your progress unfold — all in one adaptive system.
          <div className="mb-6"></div>
            <UpgradeButton />
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default UnlockComponent;
