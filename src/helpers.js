import { armorDefinitions, sizeToHitDie } from "./constants";

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Compute ability bonuses based on ability scores
export const pointsToBonus = (points) => Math.floor(points / 2) - 5;

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

  return 10 + dexBonus + shieldBonus;
};

// Add a + if the ability bonus is non-negative
export const bonusFormat = (stat) => (stat >= 0 ? "+" + stat : stat);

export const formatAbilityScore = (stat) =>
  `${stat} (${bonusFormat(pointsToBonus(stat))})`;

// Get the string displayed for the monster's AC
export const getArmorData = (mon) => {
  if (mon.armorName == "other") return mon.otherArmorDesc;
  let ac = getAcInteger(mon);
  let hasShield = mon.shieldBonus > 0;
  if (mon.armorName == "mage armor") {
    return `${ac} (${hasShield ? "shield, " : ""}${ac + 3} with _mage armor_)`;
  }
  if (mon.armorName == "none") {
    return ac + (hasShield ? " (shield)" : "");
  }
  return `${ac} (${mon.armorName}${hasShield ? ", shield" : ""})`;
};

// Get the string displayed for the monster's HP
export const getHP = (mon) => {
  if (mon.customHP) return mon.hpText;
  let conBonus = pointsToBonus(mon.conPoints);
  let hitDieSize = sizeToHitDie[mon.size];
  let conHp = mon.hitDice * conBonus;
  let avgHP = Math.floor(mon.hitDice * ((hitDieSize + 1) / 2)) + conHp;
  if (conBonus > 0) return `${avgHP} (${mon.hitDice}d${hitDieSize} + ${conHp})`;
  if (conBonus == 0) return `${avgHP} (${mon.hitDice}d${hitDieSize})`;
  return `${Math.max(avgHP, 1)} (${mon.hitDice}d${hitDieSize} - ${conHp})`;
};

export const getSpeed = (mon) => {
  if (mon.customSpeed) return mon.speedDesc;
  let speedsDisplayArr = [mon.speed + " ft."];
  if (mon.burrowSpeed > 0)
    speedsDisplayArr.push("burrow " + mon.burrowSpeed + " ft.");
  if (mon.climbSpeed > 0)
    speedsDisplayArr.push("climb " + mon.climbSpeed + " ft.");
  if (mon.flySpeed > 0)
    speedsDisplayArr.push(
      "fly " + mon.flySpeed + " ft." + (mon.hover ? " (hover)" : ""),
    );
  if (mon.swimSpeed > 0)
    speedsDisplayArr.push("swim " + mon.swimSpeed + " ft.");
  return speedsDisplayArr.join(", ");
};

export const getSenses = (mon) => {
  let sensesDisplayArr = [];
  if (mon.blindsight > 0)
    sensesDisplayArr.push(
      "blindsight " +
        mon.blindsight +
        " ft." +
        (mon.blind ? " (blind beyond this radius)" : ""),
    );
  if (mon.darkvision > 0)
    sensesDisplayArr.push("darkvision " + mon.darkvision + " ft.");
  if (mon.tremorsense > 0)
    sensesDisplayArr.push("tremorsense " + mon.tremorsense + " ft.");
  if (mon.truesight > 0)
    sensesDisplayArr.push("truesight " + mon.truesight + " ft.");

  // Passive Perception
  let ppData = ArrayFunctions.FindInList(mon.skills, "Perception"),
    pp = 10 + MathFunctions.PointsToBonus(mon.wisPoints);
  if (ppData != null)
    pp += CrFunctions.GetProf() * (ppData.hasOwnProperty("note") ? 2 : 1);
  sensesDisplayArr.push("passive Perception " + pp);
  return sensesDisplayArr.join(", ");
};
