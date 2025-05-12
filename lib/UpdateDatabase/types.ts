

export interface SettingsData {
  background: string;
  navIcon: string;
}

export interface FitData {
  calorieGoal: number;
  activeSplit: string;
}

export interface PulseMemoryData {
 v1_welcomeDrop: boolean;
 v2_updateDrop1: boolean;
}

export interface PulseData {
  pulseMemory: PulseMemoryData;
  receivePulseDrops: boolean;
  receiveTutorials: boolean;
  dailyMotivation: boolean;
}

export interface UserProfile {
  name: string;
  birthday: string;
  gender: string;
  height_cm: number;
  height_ft_in: {
    feet: number;
    inches: number;
  };
  preferredHeightUnit: string;
  preferredWeightUnit: string;
  age: number;
  email: string; // ✅ Add email here
  settings?: SettingsData;
  fitnessSettings?: FitData;
  pulseSettings?: PulseData;
  isStrengthActive: boolean;
  isMacroActive: boolean;
  isPrimeActive: boolean;
  isPaid: boolean;
  token: boolean;
    lastKnownWeight_lb: number;
  lastKnownWeight_kg: number;
}

export const defaultProfile: UserProfile = {
  name: "",
  birthday: "",
  gender: "",
  height_cm: 0,
  height_ft_in: {
    feet: 0,
    inches: 0,
  },
  preferredHeightUnit: "",
  preferredWeightUnit: "",
  age: 0,
  email: "", // ✅ Add email here
  isStrengthActive: false,
  isMacroActive: false,
  isPrimeActive: false,
  isPaid: false,
  token: true,
    lastKnownWeight_lb: 0,
  lastKnownWeight_kg: 0,

  settings: {
    background: "NeuralLink",
    navIcon: "Atom",
  },

  fitnessSettings: {
    calorieGoal: 0,
    activeSplit: "",
  },
  pulseSettings: {
    pulseMemory: {
      v1_welcomeDrop: false,
      v2_updateDrop1: true,
    },
    receivePulseDrops: true,
    receiveTutorials: true,
    dailyMotivation: true,
  }

};

