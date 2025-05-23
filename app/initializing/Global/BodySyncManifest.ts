export type GlobalSTORE = {

  //USERID INFO
  userProfileSTORE: UserProfile | null;
  setUserProfileSTORE: (profile: UserProfile | ((prev: UserProfile | null) => UserProfile)) => void;

  syncHistorySTORE: SyncData[] | null;
  setSyncHistorySTORE: (data: SyncData[] | ((prev: SyncData[] | null) => SyncData[])) => void;

  fitnessHistorySTORE: {};
  setFitnessHistorySTORE: (data: { [date: string]: FitnessSyncData }) => void;

  latestSyncSTORE: any | null;
  setLatestSyncSTORE: (sync: any) => void;

  latestFitnessSyncSTORE: any | null;
  setLatestFitnessSyncSTORE: (sync: any) => void;

};

export type GlobalSTATE = {

  //USERID INFO
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | ((prev: UserProfile | null) => UserProfile)) => void;

  syncHistory: SyncData[] | null;
  setSyncHistory: (data: SyncData[] | ((prev: SyncData[] | null) => SyncData[])) => void;

  fitnessHistory: {};
  setFitnessHistory: (data: { [date: string]: FitnessSyncData }) => void;

  latestSync: any | null;
  setLatestSync: (sync: any) => void;

  latestFitnessSync: any | null;
  setLatestFitnessSync: (sync: any) => void;


  //FITNESS INFO
  temporaryFitnessSync: any | null;
  setTemporaryFitnessSync: (data: {
    profileSlot: string;
    bodygroup: string;
  }) => void;

  liftIndex: Record<string, any>;
  setLiftIndex: (
    value: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)
  ) => void;

  workoutSessionData: WorkoutSessionData;
  setWorkoutSessionData: (
    updater: WorkoutSessionData | ((prev: WorkoutSessionData) => WorkoutSessionData)
  ) => void;

  activeSessionStatus: boolean;
  setActiveSessionStatus: (value: boolean) => void;

  //OVERVIEW INFO
  selectedSector2: string;
  setSelectedSector2: (value: string) => void;

  pageDefault: string;
  selectedPage: string;
  setSelectedPage: (value: string) => void;

  HomeDefault: string;
  selectedHomePage: string;
  setSelectedHomePage: (value: string) => void;

  //CONTROL HUB INFO
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;

  //SYNC INFO
  hasDawnSyncedToday: boolean;
  setHasDawnSyncedToday: (value: boolean) => void;

  hasDuskSyncedToday: boolean;
  setHasDuskSyncedToday: (value: boolean) => void;

  hasFitnessSyncedToday: boolean;
  setHasFitnessSyncedToday: (value: boolean) => void;

  //SYNC INFO
  DawnPoints: number;
  setDawnPoints: (value: number) => void;

  DuskPoints: number;
  setDuskPoints: (value: number) => void;

  FitnessPoints: number;
  setFitnessPoints: (value: number) => void;

};

//WORKOUT DATABASE
export type WorkoutSessionData = {
  movements: MovementEntry[];
}

export type MovementEntry = {
  name: string;
  sets: SetEntry[];
}

export type SetEntry = {
  setId: string;
  reps: number;
  liftWeight_lbs?: number;
  liftWeight_kg?: number;
  isDropset?: boolean;
  parentSetId?: string;
  locked?: boolean;
}
////////

type WorkoutSessionData2 = Record<
  string, // movement name
  Record<
    string, // set key (set1, set2)
    {
      reps?: number;
      liftWeight_lbs?: number;
      liftWeight_kg?: number;
      locked?: boolean;
      dropset?: boolean;
      dropsets?: Record<
        string, // drop key (drop1, drop2)
        {
          reps?: number;
          liftWeight_lbs?: number;
          liftWeight_kg?: number;
          locked?: boolean;
        }
      >;
    }
  >
>;


export type MovementLog = {
  name: string;
  setRecords: {
    [setKey: number]: {
      liftWeight_lbs: number;
      liftWeight_kg: number;
      reps: number;
      locked: boolean;
      dropset: boolean;
      dropsets: {
        [dropKey: number]: {
          liftWeight_lbs: number;
          liftWeight_kg: number;
          reps: number;
          locked: boolean;
        };
      };
    };
  };
};

//LATEST SYNC
export type SyncData = {
  id: string;
  date: string; 
  weight_lbs?: number;
  weight_kg?: number;
  steps?: number;
  exerciseMinutes?: number;
  exerciseIntensity?: string;
  recoveryMacros?: any[];
  activeMacros?: any[];
  vitamins?: any[];
  minerals?: any[];
  recoveryTDEE?: string;
  activeTDEE?: string;
  dawnSync?: boolean;
  duskSync?: boolean;
  dawnTimestamp?: any;
  duskTimestamp?: any;
  timestamp?: any;
};

//LATEST FITNESS SYNC
export type FitnessSyncData = {
  id: string;
  split: string;
  bodygroup: string;
  whichProfile: string;
  completed: boolean;
  StartTime: any;
  EndTime: any;
  sessionData: SessionData;
  fitnessSync: Boolean;
};

export type SessionData = {
  [movementName: string]: {
    [setKey: string]: SetEntry;
  };
};

export type GoalSyncData = {
  liftWeight_lbs: number;
  liftWeight_kg: number;
  movements: any[];
};

export type NutritionSyncData = {
  liftWeight_lbs: number;
  liftWeight_kg: number;
  movements: any[];
};

//CUSTOM SETTINGS
export type CustomSettingsData = {
  background: string;
  navIcon: string;
  lightMode: boolean;
};

//FITNESSETTINGS
export type FitnessSettingsData = {
  currentSplit: string;
  lastBodygroup: string;
  fitnessToken: boolean;
  activeSession: boolean;
  totalWorkouts: number;
  totalPRs: number;
  liftIndex: LiftIndexData;
};

export type LiftIndexData = {
  [bodygroup: string]: BodygroupProfile;
};

//LIFT PROFILE INFO
export type Profile = {
  name: string;
  movements: string[];
};

//BODYGROUP PROFILE INFO
export type BodygroupProfile = {
  profile1?: Profile;
  profile2?: Profile;
  profile3?: Profile;
}

//DAILY GOAL SETTINGS
export type DailyGoalSettingsData = {
  dailyGoalToken: boolean;
};

//NUTRITION SETTINGS
export type NutritionSettingsData = {
  calorieGoal: number;
  nutritionToken: boolean;
};
//PULSE DROP SETTINGS
export type PulseMemoryData = {
  v1_welcomeDrop: boolean;
  v2_updateDrop1: boolean;
  Thanks4UpgradeDrop: boolean;
};

export type PulseSettingsData = {
  pulseMemory: PulseMemoryData;
  receivePulseDrops: boolean;
  tutorialDrops: boolean;
  motivationDrops: boolean;
  humourDrops: boolean;
};

// THE ONE AND ONLY USER PROFILE
export type UserProfile = {
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

  //SETTINGS
  customSettings?: CustomSettingsData;
  fitnessSettings?: FitnessSettingsData;
  dailyGoalSettings?: DailyGoalSettingsData;
  nutritionSettings?: NutritionSettingsData;
  pulseSettings?: PulseSettingsData;

  isPaid: boolean;
  token: boolean;

  //COLLECTIONS
  latestSync?: SyncData;
  latestFitnessSync?: FitnessSyncData;
};


export type AllTypes = {
  SetEntry: SetEntry;
  WorkoutSessionData: WorkoutSessionData;
  MovementLog: MovementLog;

  SyncData: SyncData;
  FitnessSyncData: FitnessSyncData;
  GoalSyncData: GoalSyncData;
  NutritionSyncData: NutritionSyncData;

  CustomSettingsData: CustomSettingsData;
  FitnessSettingsData: FitnessSettingsData;
  DailyGoalSettingsData: DailyGoalSettingsData;
  NutritionSettingsData: NutritionSettingsData;
  PulseMemoryData: PulseMemoryData;
  PulseSettingsData: PulseSettingsData;

  Profile: Profile;
  BodygroupProfile: BodygroupProfile;

  UserProfile: UserProfile;
};

export const TypeManifest: AllTypes = {
  SetEntry: {} as SetEntry,
  WorkoutSessionData: {} as WorkoutSessionData,
  MovementLog: {} as MovementLog,

  SyncData: {} as SyncData,
  FitnessSyncData: {} as FitnessSyncData,
  GoalSyncData: {} as GoalSyncData,
  NutritionSyncData: {} as NutritionSyncData,

  CustomSettingsData: {} as CustomSettingsData,
  FitnessSettingsData: {} as FitnessSettingsData,
  DailyGoalSettingsData: {} as DailyGoalSettingsData,
  NutritionSettingsData: {} as NutritionSettingsData,
  PulseMemoryData: {} as PulseMemoryData,
  PulseSettingsData: {} as PulseSettingsData,

  Profile: {} as Profile,
  BodygroupProfile: {} as BodygroupProfile,

  UserProfile: {} as UserProfile,
};
