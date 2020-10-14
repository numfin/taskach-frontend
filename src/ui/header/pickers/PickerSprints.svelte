<script lang="ts">
  import { router } from "/src/pages";
  import type { IGlobalQuery } from "/src/pages";
  import type { ComboboxItem } from "/src/ui/forms/combobox";

  import Combobox from "/src/ui/forms/combobox/Combobox.svelte";
  import InputGroup from "/src/ui/forms/inputgroup/InputGroup.svelte";

  const sprints: ComboboxItem[] = [
    { title: "Sprint 1", value: "1" },
    { title: "Sprint 2", value: "2" },
  ];

  function onSprintChange({ detail }: CustomEvent<ComboboxItem>) {
    router.pushParams<Partial<IGlobalQuery>>({
      sprintId: detail.value,
    });
  }
</script>

<InputGroup label="Project:">
  <Combobox items={sprints} on:item={onSprintChange} />
</InputGroup>
