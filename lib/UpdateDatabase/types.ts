

export interface CustomSettingsData {
  background: string;
  navIcon: string;
  lightMode: boolean;
}

export interface StrengthData {
  isStrengthArchiveActive: boolean,
  currentSplit: string;
  activeSession: boolean;
}

export interface PrimeData {
  isPrimeTasksActive: boolean,
}

export interface MacroData {
  calorieGoal: number;
  isMacroVaultActive: boolean,
}

export interface PulseMemoryData {
 v1_welcomeDrop: boolean;
 v2_updateDrop1: boolean;
 Thanks4UpgradeDrop: boolean;
}

export interface PulseData {
  pulseMemory: PulseMemoryData;
  receivePulseDrops: boolean;
  tutorialDrops: boolean,
  motivationDrops: boolean,
  humourDrops: boolean,
}


export interface UserProfile {
  name: string;
  age: number;
  email: string;
  birthday: string;
  gender: string;

  height_cm: number;
  height_ft_in: {
    feet: number;
    inches: number;
  };
  preferredHeightUnit: string;
  preferredWeightUnit: string;

  lastKnownWeight_lbs: number;
  lastKnownWeight_kg: number;

  customSettings?: CustomSettingsData;
  strengthArchiveSettings?: StrengthData;
  primeTasksSettings?: PrimeData;
  macroVaultSettings?: MacroData;
  pulseSettings?: PulseData;

  isPaid: boolean;
  token: boolean;
}

export const defaultProfile: UserProfile = {
  name: "",
  age: 0,
  email: "",
  birthday: "",
  gender: "",

  height_cm: 0,
  height_ft_in: {
    feet: 0,
    inches: 0,
  },
  preferredHeightUnit: "",
  preferredWeightUnit: "",

  lastKnownWeight_lbs: 0,
  lastKnownWeight_kg: 0,

  isPaid: false,
  token: true,

  customSettings: {
    background: "NeuralLink",
    navIcon: "Atom",
    lightMode: true,
  },

  strengthArchiveSettings: {
    isStrengthArchiveActive: false,
    currentSplit: "",
    activeSession: false,
  },

  primeTasksSettings: {
    isPrimeTasksActive: false,
  },

  macroVaultSettings: {
    isMacroVaultActive: false,
    calorieGoal: 0,
  },
  pulseSettings: {
    pulseMemory: {
      v1_welcomeDrop: false,
      v2_updateDrop1: true,
      Thanks4UpgradeDrop: false,
    },
    receivePulseDrops: true,
    tutorialDrops: true,
    motivationDrops: true,
    humourDrops: true,
  },

};

