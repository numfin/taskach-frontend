import { ComboboxExamples } from "/src/ui/forms/combobox/examples/Combobox.examples";
import { TaskExamples } from "/src/ui/task/examples/Task.examples";
import { ButtonExamples } from "/src/ui/buttons/examples/Btn.examples";

import type { Example } from "./createExample";
export const examples: Example[] = [
  ...ComboboxExamples,
  ...TaskExamples,
  ...ButtonExamples,
];
