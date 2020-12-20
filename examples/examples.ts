import { ComboboxExamples } from "../src/components/ui/forms/combobox/examples/Combobox.examples";
import { TaskExamples } from "../src/components/task/examples/Task.examples";
import { ButtonExamples } from "../src/components/ui/buttons/examples/Btn.examples";

import type { Example } from "./createExample";
export const examples: Example[] = [
  ...ComboboxExamples,
  ...TaskExamples,
  ...ButtonExamples,
];
