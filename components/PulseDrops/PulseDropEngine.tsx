"use client";

import  useCoreData  from "@/lib/hooks/CoreData";
import { pulseDropRegistry } from "@/components/PulseDrops/Data/pulseDropRegistry";
import { PULSE_DROP_IDS } from "@/components/PulseDrops/Data/pulseDropIds"; // optional for direct ID checks
import { useMemo } from "react";

export default function PulseDropEngine() {
  const { profile, pulseSettings } = useCoreData();

  const activeDrops = useMemo(() => {
    if (!profile || !pulseSettings) return [];
    return pulseDropRegistry.filter((drop) =>
      drop.condition(profile, pulseSettings)
    );
  }, [profile, pulseSettings]);

  return (
    <>
      {activeDrops.map((drop) => {
        const DropComponent = drop.component;
        return <DropComponent key={drop.id} />;
      })}
    </>
  );
}