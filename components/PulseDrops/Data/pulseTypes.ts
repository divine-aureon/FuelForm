import { UserProfile, PulseData } from "@/lib/UpdateDatabase/types";
import {
  PULSE_DROP_IDS,
  PulseDropId
} from "@/components/PulseDrops/Data/pulseDropIds";

export type PulseDropType = "system" | "update" | "birthday" | "tutorial";

export interface PulseDropDefinition {
  id: PulseDropId;
  component: React.FC;
  type: PulseDropType;
  condition: (profile: UserProfile, pulseSettings: PulseData) => boolean;
  version?: number; // optional for versioned drops
}
