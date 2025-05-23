import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile, SyncData, FitnessSyncData } from "@/lib/hooks/CoreData";
import type { GlobalSTATE } from "../Global/BodySyncManifest"
import { Niconne } from 'next/font/google';


export const useGlobalData = create<GlobalSTATE>()(
    persist(
        (set) => ({

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


