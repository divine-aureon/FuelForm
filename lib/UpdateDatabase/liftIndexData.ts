// This file can live in /core or /lib

export const AllLiftProfile = {
  name: "Create a Profile",
  movements: [],
};

export function liftIndexData() {
  const splits = [
    "push", "pull", "legs", "upper", "lower",
    "fullbody", "chest", "back", "brolegs", "shoulders", "arms"
  ];

  const liftProfiles: Record<string, any> = {};

  splits.forEach(split => {
    liftProfiles[split] = {
      profile1: { ...AllLiftProfile },
      profile2: { ...AllLiftProfile },
      profile3: { ...AllLiftProfile },
    };
  });

  return liftProfiles;
}
