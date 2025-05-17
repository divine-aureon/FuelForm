export const PULSE_DROP_IDS = {
  WELCOME_DROP: "v1_welcomeDrop",
  UPDATE_DROP_1: "v2_updateDrop1",
  THANKS4UPGRADE_DROP: "Thanks4UpgradeDrop",

} as const;

export type PulseDropId = typeof PULSE_DROP_IDS[keyof typeof PULSE_DROP_IDS];
