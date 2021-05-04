import { defineComponent } from "vue";

import { IconCart } from "@/ui/icons/IconCart";

export const TaskachLogo = defineComponent({
  name: "TaskachLogo",
  render() {
    return (
      <div class="cursor-pointer bg-brand py-1 px-2 flex justify-start text-gray-800">
        <IconCart />

        <div class="mt-px ml-2 text font-bold uppercase">Taskach</div>
      </div>
    );
  },
});
