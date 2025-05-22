
import { createGlobalDataStore } from "../../../initializing/Global/createGlobalDataStore"
import type { GlobalSTORE } from "../../../initializing/Global/BodySyncManifest"

let currentStore = createGlobalDataStore("BodySync_anon");

export const setGlobalDataStore = (key: string) => {
  currentStore = createGlobalDataStore(key);
};

export const getGlobalDataState = (): GlobalSTORE => {
  return currentStore.getState();
};

