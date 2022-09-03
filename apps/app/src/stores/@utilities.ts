import { atom } from "nanostores";
import { persistentAtom, persistentMap } from "@nanostores/persistent";

function createStoreName(name: string) {
  return `bundlesphobia-store@${name}`;
}

function createAtomName(name: string) {
  return `${createStoreName(name)}`;
}

function createMapName(name: string) {
  return `${createStoreName(name)}:`;
}

function createAtom<Value, StoreExt = {}>(...args: undefined extends Value ? [] | [Value] : [Value]) {
  return atom<Value, StoreExt>(...args);
}

function createPersistentAtom<T extends any>(name: string, initial: T) {
  return persistentAtom<T>(createAtomName(name), initial, { encode: JSON.stringify, decode: JSON.parse, listen: false });
}

function createPersistentMap<T extends Record<string, string>>(name: string, initial: T) {
  return persistentMap<T>(createMapName(name), initial, { listen: false });
}

export { createAtom };
export { createPersistentAtom, createPersistentMap };
