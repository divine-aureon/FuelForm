"use client";

import  useCoreData  from "@/lib/hooks/CoreData";
import { pulseDropRegistry } from "../../../OverViewComponents/PulseDrops/Data/pulseDropRegistry";
import { PULSE_DROP_IDS } from "../../../OverViewComponents/PulseDrops/Data/pulseDropIds"; // optional for direct ID checks
import { useMemo } from "react";
import { getGlobalDataState  } from "@/app/initializing/Global/store/globalStoreInstance";
import { useGlobalData } from "@/app/initializing/Global/GlobalData";
import { UserProfile } from "@/app/initializing/Global/BodySyncManifest";



export default function PulseDropEngine() {
      const userProfileSTORE = getGlobalDataState().userProfileSTORE;
    const userProfile = userProfileSTORE

const activeDrops = useMemo(() => {
  if (!userProfile || !userProfile.pulseSettings) return [];

  const { pulseSettings } = userProfile;

  return pulseDropRegistry.filter((drop) =>
    drop.condition(userProfile, pulseSettings)
  );
}, [userProfile]);

  return (
    <>
      {activeDrops.map((drop) => {
        const DropComponent = drop.component;
        return <DropComponent key={drop.id} />;
      })}
    </>
  );
}