export const PULSE_DROP_IDS = {
  WELCOME_DROP: "welcomeDrop",

} as const;

export type PulseDropId = typeof PULSE_DROP_IDS[keyof typeof PULSE_DROP_IDS];
