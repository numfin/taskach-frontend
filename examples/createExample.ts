import lodash from "lodash";

export type Example = {
  name: string;
  component: () => Promise<typeof import("*.svelte")>;
};

export function createExample<T extends Example>(example: T): T {
  return example;
}

export function genItems<T extends unknown>(fn: () => T, count = 10) {
  return Array.from({ length: lodash.random(count, count + 3) }, fn);
}
