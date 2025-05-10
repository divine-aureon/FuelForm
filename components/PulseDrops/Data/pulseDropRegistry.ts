import { PulseDropDefinition } from "@/components/PulseDrops/Data/pulseTypes";
import { PULSE_DROP_IDS } from "@/components/PulseDrops/Data/pulseDropIds";

import CopyThisImportAndRename from "@/components/PulseDrops/TemplateDrop";
import WelcomeDrop from "@/components/PulseDrops/WelcomeDrop";

//"system" | "update" | "birthday" | "tutorial";

export const pulseDropRegistry: PulseDropDefinition[] = [

    {
    id: PULSE_DROP_IDS.WELCOME_DROP,
    component: WelcomeDrop,
    type: "system",
    condition: (profile, pulseSettings) => (
      pulseSettings.receivePulseDrops &&
      !pulseSettings.pulseMemory?.welcomeDrop2
    )
  },
  
  // 🔜 Future Drops Here
  // {
  //   id: PULSE_DROP_IDS.UPDATE_3,
  //   component: UpdateDropV3,
  //   type: "update",
  //   version: 3,
  //   condition: (profile, pulseSettings) => (
  //     pulseSettings.pulseUpdate < 3
  //   )
  // },
];
