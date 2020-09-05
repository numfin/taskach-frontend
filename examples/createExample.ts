export type Example = {
  name: string;
  component: () => Promise<typeof import("*.svelte")>;
};

export function createExample<T extends Example>(example: T): T {
  return example;
}
