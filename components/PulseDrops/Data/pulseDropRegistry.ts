import { PulseDropDefinition } from "@/components/PulseDrops/Data/pulseTypes";
import { PULSE_DROP_IDS } from "@/components/PulseDrops/Data/pulseDropIds";
import WelcomeDrop from "@/components/PulseDrops/WelcomeDrop";
import UpdateDrop1 from "@/components/PulseDrops/UpdateDrop1";

//"system" | "update" | "birthday" | "tutorial";

export const pulseDropRegistry: PulseDropDefinition[] = [

    {
    id: PULSE_DROP_IDS.WELCOME_DROP,
    component: WelcomeDrop,
    type: "system",
    condition: (profile, pulseSettings) => (
      pulseSettings.receivePulseDrops &&
      !pulseSettings.pulseMemory?.v1_welcomeDrop
    )
  },

      {
    id: PULSE_DROP_IDS.UPDATE_DROP_1,
    component: UpdateDrop1,
    type: "system",
    condition: (profile, pulseSettings) => (
      pulseSettings.receivePulseDrops &&
      !pulseSettings.pulseMemory?.v2_updateDrop1
    )
  },
  
];
