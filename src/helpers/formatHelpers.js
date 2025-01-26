import { challengeRatings, sizeToHitDie } from "../constants";
import { pointsToBonus, getAcInteger } from "./statHelpers";

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
  let conBonus = pointsToBonus(mon.con);
  let hitDieSize = sizeToHitDie[mon.size];
  let conHp = mon.hitDice * conBonus;
  let avgHP = Math.floor(mon.hitDice * ((hitDieSize + 1) / 2)) + conHp;
  if (conBonus > 0) return `${avgHP} (${mon.hitDice}d${hitDieSize} + ${conHp})`;
  if (conBonus == 0) return `${avgHP} (${mon.hitDice}d${hitDieSize})`;
  return `${Math.max(avgHP, 1)} (${mon.hitDice}d${hitDieSize} - ${conHp})`;
};

export const displaySpeedDescription = (mon) => {
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

// export const getSenses = (mon) => {
//   let sensesDisplayArr = [];
//   if (mon.blindsight > 0)
//     sensesDisplayArr.push(
//       "blindsight " +
//         mon.blindsight +
//         " ft." +
//         (mon.blind ? " (blind beyond this radius)" : ""),
//     );
//   if (mon.darkvision > 0)
//     sensesDisplayArr.push("darkvision " + mon.darkvision + " ft.");
//   if (mon.tremorsense > 0)
//     sensesDisplayArr.push("tremorsense " + mon.tremorsense + " ft.");
//   if (mon.truesight > 0)
//     sensesDisplayArr.push("truesight " + mon.truesight + " ft.");

//   // Passive Perception
//   let ppData = ArrayFunctions.FindInList(mon.skills, "Perception"),
//     pp = 10 + MathFunctions.PointsToBonus(mon.wis);
//   if (ppData != null)
//     pp += CrFunctions.GetProf() * (ppData.hasOwnProperty("note") ? 2 : 1);
//   sensesDisplayArr.push("passive Perception " + pp);
//   return sensesDisplayArr.join(", ");
// };

export const getChallengeRating = (mon) => {
  if (mon.cr == "*") return mon.customCr.trim();
  return `${mon.cr} (${challengeRatings[mon.cr].xp} XP)`;
};
