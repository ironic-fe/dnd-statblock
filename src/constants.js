export const open5eApi = "https://api.open5e.com/";

export const defaultStatblock = {
  name: "Monster",
  size: "medium",
  type: "humanoid",
  otherType: "",
  tag: "",
  alignment: "any alignment",
  hitDice: 5,
  hpText: "4 (1d8)",
  customHP: false,
  armorName: "none",
  shieldBonus: 0,
  natArmorBonus: 3,
  otherArmorDesc: "10 (armor)",
  speed: 30,
  burrowSpeed: 0,
  climbSpeed: 0,
  flySpeed: 0,
  hover: false,
  swimSpeed: 0,
  customSpeed: false,
  speedDesc: "30 ft.",
  strPoints: 10,
  dexPoints: 10,
  conPoints: 10,
  intPoints: 10,
  wisPoints: 10,
  chaPoints: 10,
  blindsight: 0,
  blind: false,
  darkvision: 0,
  tremorsense: 0,
  truesight: 0,
  telepathy: 0,
  cr: 1,
  customCr: "",
  customProf: 2,
  isLegendary: false,
  legendariesDescription: "",
  isLair: false,
  lairDescription: "",
  lairDescriptionEnd: "",
  isMythic: false,
  mythicDescription: "",
  isRegional: false,
  regionalDescription: "",
  regionalDescriptionEnd: "",
  properties: [],
  abilities: [],
  actions: [],
  bonusActions: [],
  reactions: [],
  legendaries: [],
  mythics: [],
  lairs: [],
  regionals: [],
  sthrows: [],
  skills: [],
  damagetypes: [],
  specialdamage: [],
  conditions: [],
  languages: [],
  understandsBut: "",
  shortName: "",
  pluralName: "",
  doubleColumns: false,
  separationPoint: 1,
};

export const sizes = [
  { value: "tiny", name: "Tiny" },
  { value: "small", name: "Small" },
  { value: "medium", name: "Medium" },
  { value: "large", name: "Large" },
  { value: "huge", name: "Huge" },
  { value: "gargantuan", name: "Gargantuan" },
];

export const types = [
  { value: "aberration", name: "Aberration" },
  { value: "beast", name: "Beast" },
  { value: "celestial", name: "Celestial" },
  { value: "construct", name: "Construct" },
  { value: "dragon", name: "Dragon" },
  { value: "elemental", name: "Elemental" },
  { value: "fey", name: "Fey" },
  { value: "fiend", name: "Fiend" },
  { value: "giant", name: "Giant" },
  { value: "humanoid", name: "Humanoid" },
  { value: "monstrosity", name: "Monstrosity" },
  { value: "ooze", name: "Ooze" },
  { value: "plant", name: "Plant" },
  { value: "undead", name: "Undead" },
  { value: "*", name: "Other" },
];

export const armorDefinitions = {
  none: {
    name: "None",
    type: "special",
  },
  "natural armor": {
    type: "special",
    name: "Natural Armor",
  },
  "mage armor": {
    type: "special",
    name: "Mage Armor",
  },
  "padded armor": {
    type: "light",
    name: "Padded",
    ac: 11,
  },
  "leather armor": {
    type: "light",
    name: "Leather",
    ac: 11,
  },
  "studded leather": {
    type: "light",
    name: "Studded Leather",
    ac: 12,
  },
  "hide armor": {
    type: "medium",
    name: "Hide",
    ac: 12,
  },
  "chain shirt": {
    type: "medium",
    name: "Chain Shirt",
    ac: 13,
  },
  "scale mail": {
    type: "medium",
    name: "Scale Mail",
    ac: 14,
  },
  breastplate: {
    type: "medium",
    name: "Breastplate",
    ac: 14,
  },
  "half plate": {
    type: "medium",
    name: "Half Plate",
    ac: 15,
  },
  "ring mail": {
    type: "heavy",
    name: "Ring Mail",
    ac: 14,
  },
  "chain mail": {
    type: "heavy",
    name: "Chain Mail",
    ac: 16,
  },
  splint: {
    type: "heavy",
    name: "Splint",
    ac: 17,
  },
  plate: {
    type: "heavy",
    name: "Plate",
    ac: 18,
  },
  other: {
    type: "special",
    name: "Other",
  },
};

export const armorTypes = Object.entries(armorDefinitions).map((definition) => {
  const value = definition[0];
  const properties = definition[1];
  return { value, name: properties["name"] };
});

export const sizeToHitDie = {
  tiny: 4,
  small: 6,
  medium: 8,
  large: 10,
  huge: 12,
  gargantuan: 20,
};
