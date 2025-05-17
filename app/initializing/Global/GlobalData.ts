import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from "@/lib/hooks/CoreData"

interface GlobalData {
    userProfile: UserProfile | null;
    setUserProfile: (userProfile: UserProfile) => void;

    latestSync: any | null;
    setLatestSync: (sync: any) => void;

    pageDefault: string;
    selectedPage: string;
    setSelectedPage: (value: string) => void;

    HomeDefault: string;
    selectedHomePage: string;
    setSelectedHomePage: (value: string) => void;

    // modal states

    isOpen: boolean;
    setIsOpen: (value: boolean) => void;

    isSettingsOpen: boolean;
    setSettingsOpen: (value: boolean) => void;

    isFitnessOpen: boolean;
    setFitnessOpen: (value: boolean) => void;

    isOverrideOpen: boolean;
    setOverrideOpen: (value: boolean) => void;

    isBioOpen: boolean;
    setBioOpen: (value: boolean) => void;

    isDawnOpen: boolean;
    setDawnOpen: (value: boolean) => void;

    isDuskOpen: boolean;
    setDuskOpen: (value: boolean) => void;

    isUnlockOpen: boolean;
    setUnlockOpen: (value: boolean) => void;

    isCoreOpen: boolean;
    setCoreOpen: (value: boolean) => void;

    hasDawnSyncedToday: boolean;
    setHasDawnSyncedToday: (value: boolean) => void;

    hasDuskSyncedToday: boolean;
    setHasDuskSyncedToday: (value: boolean) => void;
}

export const useGlobalData = create<GlobalData>()(
    persist(
        (set) => ({
            //SEED SYNC PROTOCOL


            userProfile: null,
            setUserProfile: (userProfile: UserProfile) => set({ userProfile }),

            latestSync: null,
            setLatestSync: (sync: any) => set({ latestSync: sync }),

            pageDefault: "bodysync",
            selectedPage: "bodysync",
            setSelectedPage: (value: string) => set({ selectedPage: value }),

            HomeDefault: "home",
            selectedHomePage: "home",
            setSelectedHomePage: (value: string) => set({ selectedHomePage: value }),

            isSettingsOpen: false,
            setSettingsOpen: (value) => set({ isSettingsOpen: value }),

            isOpen: false,
            setIsOpen: (value) => set({ isOpen: value }),

            isFitnessOpen: false,
            setFitnessOpen: (value) => set({ isFitnessOpen: value }),

            isOverrideOpen: false,
            setOverrideOpen: (value) => set({ isOverrideOpen: value }),

            isBioOpen: false,
            setBioOpen: (value) => set({ isBioOpen: value }),

            isDawnOpen: false,
            setDawnOpen: (value) => set({ isDawnOpen: value }),

            isDuskOpen: false,
            setDuskOpen: (value) => set({ isDuskOpen: value }),

            isUnlockOpen: false,
            setUnlockOpen: (value) => set({ isUnlockOpen: value }),

            isCoreOpen: false,
            setCoreOpen: (value) => set({ isCoreOpen: value }),

            hasDawnSyncedToday: false,
            setHasDawnSyncedToday: (value) => set({ hasDawnSyncedToday: value }),

            hasDuskSyncedToday: false,
            setHasDuskSyncedToday: (value) => set({ hasDuskSyncedToday: value }),

        }),
        {
            name: 'global-data',
        }
    )
);
