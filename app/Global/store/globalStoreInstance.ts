
import { createGlobalDataStore } from "../../Global/createGlobalDataStore"
import type { GlobalSTORE } from "../../Global/BodySyncManifest"

let currentStore = createGlobalDataStore("BodySync_anon");

export const setGlobalDataStore = (key: string) => {
  currentStore = createGlobalDataStore(key);
};

export const getGlobalDataState = (): GlobalSTORE => {
  return currentStore.getState();
};

