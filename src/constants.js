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

export const abilityScores = [
  { shortLabel: "STR", value: "strPoints", label: "Strength" },
  { shortLabel: "DEX", value: "dexPoints", label: "Dexterity" },
  { shortLabel: "CON", value: "conPoints", label: "Constitution" },
  { shortLabel: "INT", value: "intPoints", label: "Intelligence" },
  { shortLabel: "WIS", value: "wisPoints", label: "Wisdom" },
  { shortLabel: "CHA", value: "chaPoints", label: "Charisma" },
];

export const challengeRatings = {
  0: {
    xp: "10",
    prof: 2,
  },
  "1/8": {
    xp: "25",
    prof: 2,
  },
  "1/4": {
    xp: "50",
    prof: 2,
  },
  "1/2": {
    xp: "100",
    prof: 2,
  },
  1: {
    xp: "200",
    prof: 2,
  },
  2: {
    xp: "450",
    prof: 2,
  },
  3: {
    xp: "700",
    prof: 2,
  },
  4: {
    xp: "1,100",
    prof: 2,
  },
  5: {
    xp: "1,800",
    prof: 3,
  },
  6: {
    xp: "2,300",
    prof: 3,
  },
  7: {
    xp: "2,900",
    prof: 3,
  },
  8: {
    xp: "3,900",
    prof: 3,
  },
  9: {
    xp: "5,000",
    prof: 4,
  },
  10: {
    xp: "5,900",
    prof: 4,
  },
  11: {
    xp: "7,200",
    prof: 4,
  },
  12: {
    xp: "8,400",
    prof: 4,
  },
  13: {
    xp: "10,000",
    prof: 5,
  },
  14: {
    xp: "11,500",
    prof: 5,
  },
  15: {
    xp: "13,000",
    prof: 5,
  },
  16: {
    xp: "15,000",
    prof: 5,
  },
  17: {
    xp: "18,000",
    prof: 6,
  },
  18: {
    xp: "20,000",
    prof: 6,
  },
  19: {
    xp: "22,000",
    prof: 6,
  },
  20: {
    xp: "25,000",
    prof: 6,
  },
  21: {
    xp: "33,000",
    prof: 7,
  },
  22: {
    xp: "41,000",
    prof: 7,
  },
  23: {
    xp: "50,000",
    prof: 7,
  },
  24: {
    xp: "62,000",
    prof: 7,
  },
  25: {
    xp: "75,000",
    prof: 8,
  },
  26: {
    xp: "90,000",
    prof: 8,
  },
  27: {
    xp: "105,000",
    prof: 8,
  },
  28: {
    xp: "120,000",
    prof: 8,
  },
  29: {
    xp: "135,000",
    prof: 9,
  },
  30: {
    xp: "155,000",
    prof: 9,
  },
};
