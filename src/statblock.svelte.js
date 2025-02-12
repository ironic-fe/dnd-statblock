import { writable } from "svelte/store";

export const statblockStore = () => {
  const { set, update, subscribe } = writable(getStatblockTemplate());
  return {
    set,
    update,
    subscribe,
    reset: () => set(getStatblockTemplate()),
  };
};

// eslint-disable-next-line no-undef
export const sthrows = $state([]);

export const getStatblockTemplate = () => {
  const statblock = structuredClone(defaultStatblock);
  // Assign property to store.
  statblock.sthrows = sthrows;
  // Reset store value to empty array.
  statblock.sthrows = [];
  return statblock;
};

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
  str: 10,
  dex: 10,
  con: 10,
  int: 10,
  wis: 10,
  cha: 10,
  blindsight: 0,
  blind: false,
  darkvision: 0,
  tremorsense: 0,
  truesight: 0,
  telepathy: 0,
  pb: 3,
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
