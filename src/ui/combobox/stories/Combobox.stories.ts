import { createStory } from "/stories/createStory";

export const ComboboxStories = [
  createStory({
    name: "Combobox",
    component: () => import("./Combobox.stories.svelte"),
  }),
];
