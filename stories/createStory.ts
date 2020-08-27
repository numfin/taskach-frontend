export type Story = {
  name: string;
  component: () => Promise<typeof import("*.svelte")>;
};

export function createStory<T extends Story>(story: T): T {
  return story;
}
