import { armorDefinitions, challengeRatings } from "../constants";

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Compute ability bonuses based on ability scores
export const pointsToBonus = (points) => Math.floor(points / 2) - 5;

export const getUnarmoredAc = (dexPoints, shieldBonus = 0) => {
  let dexBonus = pointsToBonus(dexPoints);
  return 10 + dexBonus + shieldBonus;
};

export const getAcInteger = (mon) => {
  let { shieldBonus, natArmorBonus, dexPoints } = mon;
  let dexBonus = pointsToBonus(dexPoints);
  let armor = armorDefinitions[mon.armorName];

  if (armor) {
    if (armor.type == "light") return armor.ac + dexBonus + shieldBonus;
    if (armor.type == "medium")
      return armor.ac + Math.min(dexBonus, 2) + shieldBonus;
    if (armor.type == "heavy") return armor.ac + shieldBonus;
    if (mon.armorName == "natural armor")
      return 10 + dexBonus + natArmorBonus + shieldBonus;
    if (mon.armorName == "other") return "other";
  }

  return getUnarmoredAc(dexPoints, shieldBonus);
};

// These don't really fit anywhere else
export const getProficiencyBonus = (mon) => {
  if (mon.cr == "*") return mon.customProf;
  return challengeRatings[mon.cr].prof;
};
