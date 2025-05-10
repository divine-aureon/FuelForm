

export interface SettingsData {
  background: string;
  navIcon: string;
}

export interface FitData {
  calorieGoal: number;
}

export interface PulseMemoryData {
 welcomeDrop: boolean,
}

export interface PulseData {
  pulseMemory: PulseMemoryData
  receivePulseDrops: boolean,
  receiveTutorials: boolean,
  dailyMotivation: boolean,
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
  isFitnessActive: boolean,
  isMacroActive: boolean,
  isTasksActive: boolean,
  isPaid: boolean;
  token: boolean;
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
  isFitnessActive: false,
  isMacroActive: false,
  isTasksActive: false,
  isPaid: false,
  token: true,

  settings: {
    background: "NeuralLink",
    navIcon: "Atom",
  },

  fitnessSettings: {
    calorieGoal: 0,
  },
  pulseSettings: {
    pulseMemory: {
      welcomeDrop: false,
    },
    receivePulseDrops: true,
    receiveTutorials: true,
    dailyMotivation: true,
  }

  

};

