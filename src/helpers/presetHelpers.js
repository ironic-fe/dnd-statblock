import { armorDefinitions } from "../constants";
import { getUnarmoredAc } from "./statHelpers";

export const parsePresetAc = (preset) => {
  let armorAcData = preset.armor_class;
  let armorDescData = preset.armor_desc ? preset.armor_desc.split(",") : null;
  let unarmoredAc = getUnarmoredAc(preset.dexterity);

  let shieldBonus = 0;
  let armorName = "none";
  let natArmorBonus = 0;
  let otherArmorDesc = "";

  // What type of armor do we have? If it doesn't match anything, use "other"
  if (armorDescData) {
    armorName = armorDescData[0];
    // If we have a shield and nothing else
    if (armorDescData.length == 1 && armorDescData[0].trim() == "shield") {
      shieldBonus = 2;
      armorName = "none";
    } else {
      // If we have a shield in addition to something else
      if (armorDescData.length > 1) {
        if (armorDescData[1].trim() == "shield") {
          shieldBonus = 2;
          armorName = armorDescData[0];
        }
        // Or if it's just weird
        else armorDescData = [armorDescData.join(",")];
      }

      // Is it natural armor?
      if (armorName == "natural armor") {
        let natArmorBonusCheck = armorAcData - (unarmoredAc + shieldBonus);
        if (natArmorBonusCheck > 0) natArmorBonus = natArmorBonusCheck;
        // Weird edge case where the monster has a natural armor bonus of <= 0
        else armorName = "other";
      }

      // Is it another type of armor we know?
      else if (armorDefinitions.hasOwnProperty(armorDescData[0].trim()))
        armorName = armorDescData[0].trim();
      // Is it mage armor?
      else if (armorName.includes("mage armor")) armorName = "mage armor";
      // We have no idea what this armor is
      else armorName = "other";
    }
  } else {
    armorName = armorAcData == unarmoredAc ? "none" : "other";
  }

  // In case it's an unknown armor type
  if (armorName == "other") {
    if (armorDescData) {
      otherArmorDesc = armorDescData[0].includes("(")
        ? armorDescData
        : armorAcData + " (" + armorDescData + ")";
    } else {
      otherArmorDesc = armorAcData + " (unknown armor type)";
    }

    // Set the nat armor bonus for convenience:
    // often the AC is for natural armor, but doesn't have it in the armor description.
    let natArmorBonusCheck = armorAcData - (unarmoredAc + shieldBonus);

    if (natArmorBonusCheck > 0) natArmorBonus = natArmorBonusCheck;
  } else {
    otherArmorDesc =
      armorAcData + (preset.armor_desc ? " (" + preset.armor_desc + ")" : "");
  }

  return { armorName, shieldBonus, natArmorBonus, otherArmorDesc };
};
