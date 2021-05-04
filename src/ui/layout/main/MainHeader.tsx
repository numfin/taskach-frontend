import { defineComponent } from "vue";

import { TaskachLogo } from "@/ui/brand/TaskachLogo";
import { UISelectFactory } from "@/ui/forms/select/UISelect";
import { Project } from "@/components/project/project.dto";

const UISelectProject = UISelectFactory((item: Project) => ({
  name: item.name,
  uniqueValue: item.id,
}));

export const MainHeader = defineComponent({
  name: "MainHeader",
  data() {
    return {
      isOpened: false,
    };
  },
  render() {
    return (
      <header class="py-4 px-14 flex justify-start bg-gray-100">
        <TaskachLogo />
        <div class="flex flex-wrap gap-3">
          <UISelectProject items={} />
          {/* <PickerProjects />
          <PickerSprints /> */}
        </div>
        {/* <HeaderUser /> */}
      </header>
    );
  },
});
