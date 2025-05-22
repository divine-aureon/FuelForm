import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, SyncData, FitnessSyncData } from "@/lib/hooks/CoreData";
import type { GlobalSTATE } from "../../initializing/Global/BodySyncManifest"
import { Niconne } from 'next/font/google';


export const useGlobalData = create<GlobalSTATE>()(
    persist(
        (set) => ({
            //CONNECTION GATE READY SET GO
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

            fitnessHistory: {} as { [date: string]: FitnessSyncData },

            setFitnessHistory: (data: { [date: string]: FitnessSyncData } | ((prev: { [date: string]: FitnessSyncData }) => { [date: string]: FitnessSyncData })) =>
                set((state) => ({
                    fitnessHistory: typeof data === "function" ? data(state.fitnessHistory) : data,
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

            liftIndex: {},
            setLiftIndex: (value) =>
                set((state) => ({
                    liftIndex: typeof value === "function" ? value(state.liftIndex) : value,
                })),

            workoutSessionData: {
                movements: [],
            },
            setWorkoutSessionData: (updater) =>
                set((state) => ({
                    workoutSessionData:
                        typeof updater === "function"
                            ? updater(state.workoutSessionData)
                            : updater,
                })),

                
            selectedSector2: "newsession",
            setSelectedSector2: (value: string) => set({ selectedSector2: value }),

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

        }),

        {
            name: 'global-data',
        }

    )

);


