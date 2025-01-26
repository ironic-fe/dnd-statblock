import { writable } from "svelte/store";
import { defaultStatblock } from "./constants";

export const statblockStore = () => {
  const { set, update, subscribe } = writable(
    structuredClone(defaultStatblock),
  );
  return {
    set,
    update,
    subscribe,
    reset: () => set(structuredClone(defaultStatblock)),
  };
};
