import { PulseDropDefinition } from "../../../OverViewComponents/PulseDrops/Data/pulseTypes";
import { PULSE_DROP_IDS } from "../../../OverViewComponents/PulseDrops/Data/pulseDropIds";
import WelcomeDrop from "@/app/OverViewComponents/PulseDrops/WelcomeDrop";
import UpdateDrop1 from "@/app/OverViewComponents/PulseDrops/UpdateDrop1";
import Thanks4UpgradeDrop from "@/app/OverViewComponents/PulseDrops/Thanks4UpgradeDrop";

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

        {
    id: PULSE_DROP_IDS.THANKS4UPGRADE_DROP,
    component: Thanks4UpgradeDrop,
    type: "tutorial",
    condition: (profile, pulseSettings) => (
      pulseSettings.receivePulseDrops &&
      !pulseSettings.pulseMemory?.Thanks4UpgradeDrop
    )
  },
  
];
