import { writable } from "svelte/store";
import { defaultStatblock } from "./constants";

export const statblockStore = () => {
  const { set, update, subscribe } = writable(structuredClone(defaultStatblock));
  return {
    set,
    update,
    subscribe,
    reset: () => set(structuredClone(defaultStatblock)),
  };
};

export function processOpen5ePreset(preset) {
  const statblock = {};
  // Name and type
  statblock.name = preset.name.trim();
  statblock.size = preset.size.trim().toLowerCase();
  statblock.type = preset.type.trim();
  statblock.tag = preset.subtype.trim();
  statblock.alignment = preset.alignment.trim();
  
  // Stats
  statblock.strPoints = preset.strength;
  statblock.dexPoints = preset.dexterity;
  statblock.conPoints = preset.constitution;
  statblock.intPoints = preset.intelligence;
  statblock.wisPoints = preset.wisdom;
  statblock.chaPoints = preset.charisma;
  
  // CR
  statblock.cr = preset.challenge_rating;
  return statblock;
  statblock.customCr = CrFunctions.GetString();
  statblock.customProf = CrFunctions.GetProf();

  // Armor Class
  let armorAcData = preset.armor_class,
    armorDescData = preset.armor_desc ? preset.armor_desc.split(",") : null;

  // What type of armor do we have? If it doesn't match anything, use "other"
  statblock.shieldBonus = 0;
  if (armorDescData) {
    statblock.armorName = armorDescData[0];
    // If we have a shield and nothing else
    if (armorDescData.length == 1 && armorDescData[0].trim() == "shield") {
      statblock.shieldBonus = 2;
      statblock.armorName = "none";
    } else {
      // If we have a shield in addition to something else
      if (armorDescData.length > 1) {
        if (armorDescData[1].trim() == "shield") {
          statblock.shieldBonus = 2;
          statblock.armorName = armorDescData[0];
        }
        // Or if it's just weird
        else armorDescData = [armorDescData.join(",")];
      }

      // Is it natural armor?
      if (statblock.armorName == "natural armor") {
        let natArmorBonusCheck = armorAcData - MathFunctions.GetAC("none");
        if (natArmorBonusCheck > 0)
          statblock.natArmorBonus = natArmorBonusCheck;
        // Weird edge case where the monster has a natural armor bonus of <= 0
        else statblock.armorName = "other";
      }

      // Is it another type of armor we know?
      else if (data.armors.hasOwnProperty(armorDescData[0].trim()))
        statblock.armorName = armorDescData[0].trim();
      // Is it mage armor?
      else if (statblock.armorName.includes("mage armor"))
        statblock.armorName = "mage armor";
      // We have no idea what this armor is
      else statblock.armorName = "other";
    }
  } else
    statblock.armorName =
      armorAcData == MathFunctions.GetAC("none") ? "none" : "other";

  // In case it's an unknown armor type
  if (statblock.armorName == "other") {
    if (armorDescData)
      statblock.otherArmorDesc = armorDescData[0].includes("(")
        ? armorDescData
        : armorAcData + " (" + armorDescData + ")";
    else statblock.otherArmorDesc = armorAcData + " (unknown armor type)";

    // Set the nat armor bonus for convenience- often the AC is for natural armor, but doesn't have it in the armor description
    let natArmorBonusCheck = armorAcData - MathFunctions.GetAC("none");

    if (natArmorBonusCheck > 0)
      statblock.natArmorBonus = natArmorBonusCheck;
  } else
    statblock.otherArmorDesc =
      armorAcData + (preset.armor_desc ? " (" + preset.armor_desc + ")" : "");

  // Hit Dice
  statblock.hitDice = parseInt(preset.hit_dice.split("d")[0]);
  statblock.hpText = statblock.hitDice.toString();
  statblock.customHP = false;

  // Speeds
  let GetSpeed = (speedList, speedType) =>
    speedList.hasOwnProperty(speedType) ? parseInt(speedList[speedType]) : 0;

  statblock.speed = GetSpeed(preset.speed, "walk");
  statblock.burrowSpeed = GetSpeed(preset.speed, "burrow");
  statblock.climbSpeed = GetSpeed(preset.speed, "climb");
  statblock.flySpeed = GetSpeed(preset.speed, "fly");
  statblock.swimSpeed = GetSpeed(preset.speed, "swim");
  statblock.hover = preset.speed.hasOwnProperty("hover");

  if (preset.speed.hasOwnProperty("notes")) {
    statblock.customSpeed = true;
    statblock.speedDesc =
      preset.speed.walk + " ft. (" + preset.speed.notes + ")";
  } else {
    statblock.customSpeed = false;
    statblock.speedDesc = StringFunctions.GetSpeed();
  }

  // Saving Throws
  statblock.sthrows = [];
  if (preset.strength_save) this.AddSthrow("str");
  if (preset.dexterity_save) this.AddSthrow("dex");
  if (preset.constitution_save) this.AddSthrow("con");
  if (preset.intelligence_save) this.AddSthrow("int");
  if (preset.wisdom_save) this.AddSthrow("wis");
  if (preset.charisma_save) this.AddSthrow("cha");

  // Skills
  statblock.skills = [];
  if (preset.skills) {
    for (let index = 0; index < data.allSkills.length; index++) {
      let currentSkill = data.allSkills[index],
        skillCheck = StringFunctions.StringReplaceAll(
          currentSkill.name.toLowerCase(),
          " ",
          "_"
        );
      if (preset.skills[skillCheck]) {
        let expectedExpertise =
            MathFunctions.PointsToBonus(mon[currentSkill.stat + "Points"]) +
            Math.ceil(CrFunctions.GetProf() * 1.5),
          skillVal = preset.skills[skillCheck];
        this.AddSkill(
          data.allSkills[index].name,
          skillVal >= expectedExpertise ? " (ex)" : null
        );
      }
    }
  }

  // Conditions
  statblock.conditions = [];
  let conditionsPresetArr = ArrayFunctions.FixPresetArray(
    preset.condition_immunities
  );
  for (let index = 0; index < conditionsPresetArr.length; index++)
    this.AddCondition(conditionsPresetArr[index]);

  // Damage Types
  statblock.damagetypes = [];
  statblock.specialdamage = [];
  this.AddPresetDamage(preset.damage_vulnerabilities, "v");
  this.AddPresetDamage(preset.damage_resistances, "r");
  this.AddPresetDamage(preset.damage_immunities, "i");

  // Languages
  statblock.languages = [];
  statblock.telepathy = 0;
  statblock.understandsBut = "";
  if (preset.languages.includes("understands")) {
    let speaksUnderstandsArr = preset.languages.split("understands"),
      speaks =
        speaksUnderstandsArr[0].length > 0
          ? speaksUnderstandsArr[0].trim().split(",")
          : [],
      understands = speaksUnderstandsArr[1].split(" but "),
      understandsLangs = understands[0]
        .replace(", and ", ",")
        .replace(" and ", ",")
        .split(","),
      understandsBut = understands.length > 1 ? understands[1].trim() : "";

    for (let index = 0; index < speaks.length; index++)
      this.AddLanguage(speaks[index], true);
    for (let index = 0; index < understandsLangs.length; index++)
      this.AddLanguage(understandsLangs[index], false);

    if (understandsBut.toLowerCase().includes("telepathy")) {
      statblock.telepathy = parseInt(understandsBut.replace(/\D/g, ""));
      understandsBut = understandsBut.substr(
        0,
        understandsBut.lastIndexOf(",")
      );
    }
    statblock.understandsBut = understandsBut;
  } else {
    let languagesPresetArr = preset.languages.split(",");
    for (let index = 0; index < languagesPresetArr.length; index++) {
      let languageName = languagesPresetArr[index].trim();
      languageName.toLowerCase().includes("telepathy")
        ? (statblock.telepathy = parseInt(languageName.replace(/\D/g, "")))
        : this.AddLanguage(languageName, true);
    }
  }

  // Senses
  statblock.blindsight = 0;
  statblock.blind = false;
  statblock.darkvision = 0;
  statblock.tremorsense = 0;
  statblock.truesight = 0;
  let sensesPresetArr = preset.senses.split(",");
  for (let index = 0; index < sensesPresetArr.length; index++) {
    let senseString = sensesPresetArr[index].trim().toLowerCase(),
      senseName = senseString.split(" ")[0],
      senseDist = StringFunctions.GetNumbersOnly(senseString);
    switch (senseName) {
      case "blindsight":
        statblock.blindsight = senseDist;
        statblock.blind = senseString
          .toLowerCase()
          .includes("blind beyond");
        break;
      case "darkvision":
        statblock.darkvision = senseDist;
        break;
      case "tremorsense":
        statblock.tremorsense = senseDist;
        break;
      case "truesight":
        statblock.truesight = senseDist;
        break;
    }
  }

  // This
  statblock.shortName = "";
  statblock.pluralName = "";

  // Legendary?
  statblock.isLegendary = Array.isArray(preset.legendary_actions);
  if (preset.legendary_desc == null || preset.legendary_desc.length == 0)
    this.LegendaryDescriptionDefault();
  else statblock.legendariesDescription = preset.legendary_desc;
  FormFunctions.SetLegendaryDescriptionForm();

  // Mythic?
  statblock.isMythic = Array.isArray(preset.mythic_actions);
  if (preset.mythicy_desc == null || preset.mythic_desc.length == 0)
    this.MythicDescriptionDefault();
  else statblock.legendariesDescription = preset.mythic_desc;
  FormFunctions.SetMythicDescriptionForm();

  // Lair?
  statblock.isLair = Array.isArray(preset.lair_actions);
  if (preset.lair_desc == null || preset.lair_desc.length == 0) {
    this.LairDescriptionDefault();
    this.LairDescriptionEndDefault();
  } else {
    statblock.lairDescription = preset.lair_desc;
    statblock.lairDescriptionEnd = preset.lair_desc_end;
  }
  FormFunctions.SetLairDescriptionForm();

  // Regional Effects?
  statblock.isRegional = Array.isArray(preset.regional_actions);
  if (preset.regional_desc == null || preset.regional_desc.length == 0) {
    this.RegionalDescriptionDefault();
    this.RegionalDescriptionEndDefault();
  } else {
    statblock.regionalDescription = preset.regional_desc;
    statblock.regionalDescriptionEnd = preset.regional_desc_end;
  }
  FormFunctions.SetRegionalDescriptionForm();
  FormFunctions.SetRegionalDescriptionEndForm();

  // Abilities
  statblock.abilities = [];
  statblock.actions = [];
  statblock.bonusActions = [];
  statblock.reactions = [];
  statblock.legendaries = [];
  statblock.mythics = [];
  statblock.lairs = [];
  statblock.regionals = [];
  let abilitiesPresetArr = preset.special_abilities,
    actionsPresetArr = preset.actions,
    bonusActionsPresetArr = preset.bonusActions,
    reactionsPresetArr = preset.reactions,
    legendariesPresetArr = preset.legendary_actions,
    mythicPresetArr = preset.mythic_actions,
    lairsPresetArr = preset.lair_actions,
    regionalsPresetArr = preset.regional_actions;

  let self = this,
    AbilityPresetLoop = function (arr, name) {
      if (Array.isArray(arr)) {
        for (let index = 0; index < arr.length; index++)
          self.AddAbilityPreset(name, arr[index]);
      }
    };

  AbilityPresetLoop(abilitiesPresetArr, "abilities");
  AbilityPresetLoop(actionsPresetArr, "actions");
  AbilityPresetLoop(bonusActionsPresetArr, "bonusActions");
  AbilityPresetLoop(reactionsPresetArr, "reactions");
  if (statblock.isLegendary)
    AbilityPresetLoop(legendariesPresetArr, "legendaries");
  if (statblock.isMythic) AbilityPresetLoop(mythicPresetArr, "mythics");
  if (statblock.isLair) AbilityPresetLoop(lairsPresetArr, "lairs");
  if (statblock.isRegional)
    AbilityPresetLoop(regionalsPresetArr, "regionals");

  statblock.separationPoint = undefined; // This will make the separation point be automatically calculated in UpdateStatblock
}
