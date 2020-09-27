<script lang="ts">
  import { router } from "/src/pages";
  import { RootPage } from "/src/pages/Root.page";

  import type { ComboboxItem } from "/src/ui/forms/combobox";

  import Combobox from "/src/ui/forms/combobox/Combobox.svelte";
  import InputGroup from "/src/ui/forms/inputgroup/InputGroup.svelte";

  const projects: ComboboxItem[] = [
    { title: "Project 1", value: "1" },
    { title: "Project 2", value: "2" },
  ];

  function onProjectChange({ detail }: CustomEvent<ComboboxItem>) {
    router.push(RootPage, { projectId: detail.value, sprintId: "" });
  }
</script>

<InputGroup label="Project:">
  <Combobox items={projects} on:item={onProjectChange} />
</InputGroup>
