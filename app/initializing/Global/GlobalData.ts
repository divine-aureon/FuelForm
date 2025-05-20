import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, SyncData, FitnessSyncData } from "@/lib/hooks/CoreData";
import { Niconne } from 'next/font/google';

type WorkoutSessionData = Record<
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

interface GlobalData {
    //CONNECTION GATE

    connectionReady: boolean;
    setConnectionReady: (value: boolean) => void;


    //USERID INFO
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile | ((prev: UserProfile | null) => UserProfile)) => void;

    syncHistory: SyncData[] | null;
    setSyncHistory: (data: SyncData[] | ((prev: SyncData[] | null) => SyncData[])) => void;

    fitnessHistory: FitnessSyncData[] | null;
    setFitnessHistory: (data: FitnessSyncData[] | ((prev: FitnessSyncData[] | null) => FitnessSyncData[])) => void;

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

    workoutSessionData: WorkoutSessionData;
    setWorkoutSessionData: (
        updater: WorkoutSessionData | ((prev: WorkoutSessionData) => WorkoutSessionData)
    ) => void;

    activeSessionStatus: boolean;
    setActiveSessionStatus: (value: boolean) => void;

    liftIndex: Record<string, any>;
    setLiftIndex: (
        value: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)
    ) => void;

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


    resetGlobalData: () => void;



}

export const useGlobalData = create<GlobalData>()(
    persist(
        (set) => ({
            //CONNECTION GATE READY SET GO
            connectionReady: false,
            setConnectionReady: (status: boolean) => set({ connectionReady: status }),


            //USERID INFO
            userProfile: null,
            setUserProfile: (profile) =>
                set((state) => ({
                    userProfile:
                        typeof profile === "function" ? profile(state.userProfile) : profile,
                })),

            syncHistory: null,
            setSyncHistory: (data) =>
                set((state) => ({
                    syncHistory:
                        typeof data === "function" ? data(state.syncHistory) : data,
                })),

            fitnessHistory: null,
            setFitnessHistory: (data) =>
                set((state) => ({
                    fitnessHistory:
                        typeof data === "function" ? data(state.fitnessHistory) : data,
                })),



            latestSync: null,
            setLatestSync: (sync: any) => set({ latestSync: sync }),

            latestFitnessSync: null,
            setLatestFitnessSync: (sync: any) => set({ latestFitnessSync: sync }),

            //FITNESS INFO
            activeSessionStatus: false,
            setActiveSessionStatus: (status: boolean) => set({ activeSessionStatus: status }),

            temporaryFitnessSync: null,
            setTemporaryFitnessSync: (fitnessSync: { profileSlot: string; bodygroup: string }) =>
                set({ temporaryFitnessSync: fitnessSync }),

            workoutSessionData: {},
            setWorkoutSessionData: (updater) =>
                set((state) => ({
                    workoutSessionData:
                        typeof updater === "function"
                            ? updater(state.workoutSessionData)
                            : updater,
                })),

            selectedSector2: "newsession",
            setSelectedSector2: (value: string) => set({ selectedSector2: value }),

            liftIndex: {},
            setLiftIndex: (value) =>
                set((state) => ({
                    liftIndex: typeof value === "function" ? value(state.liftIndex) : value,
                })),


            //OVERVIEW INFO
            pageDefault: "bodysync",
            selectedPage: "bodysync",
            setSelectedPage: (value: string) => set({ selectedPage: value }),

            HomeDefault: "home",
            selectedHomePage: "home",
            setSelectedHomePage: (value: string) => set({ selectedHomePage: value }),

            //CONTROL HUB INFO
            isOpen: false,
            setIsOpen: (value) => set({ isOpen: value }),


            //SYNC INFO
            hasDawnSyncedToday: false,
            setHasDawnSyncedToday: (value) => set({ hasDawnSyncedToday: value }),

            hasDuskSyncedToday: false,
            setHasDuskSyncedToday: (value) => set({ hasDuskSyncedToday: value }),

            hasFitnessSyncedToday: false,
            setHasFitnessSyncedToday: (value) => set({ hasFitnessSyncedToday: value }),

            //SYNC INFO
            DawnPoints: 0,
            setDawnPoints: (value) => set({ DawnPoints: value }),

            DuskPoints: 0,
            setDuskPoints: (value) => set({ DuskPoints: value }),

            FitnessPoints: 0,
            setFitnessPoints: (value) => set({ DawnPoints: value }),

            //RESET FUNCTION
            resetGlobalData: () => set({           
                liftIndex: {},
                syncHistory: null,
                hasDawnSyncedToday: false,
                hasDuskSyncedToday: false,
                hasFitnessSyncedToday: false,
                DawnPoints: 0,
                DuskPoints: 0,
                FitnessPoints: 0,
                fitnessHistory: null,
                latestSync: null,
                latestFitnessSync: null,
                selectedSector2: "newsession",
                pageDefault: "bodysync",
                selectedPage: "bodysync",
                isOpen: false,
            }),


        }),

        {
            name: 'global-data',
        }

    )

);


