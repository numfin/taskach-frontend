<script lang="ts">
  import { router } from "../../../../router";
  import type { ComboboxItem } from "/src/components/ui/forms/combobox";

  import Combobox from "/src/components/ui/forms/combobox/Combobox.svelte";
  import InputGroup from "/src/components/ui/forms/inputgroup/InputGroup.svelte";

  const projects: ComboboxItem[] = [
    { title: "Project 1", value: "ckjfwt9eg0000znjeodixic9l" },
    { title: "Project 2", value: "2" },
  ];

  function onProjectChange({ detail }: CustomEvent<ComboboxItem>) {
    router.changeGlobalState({ projectId: detail.value });
  }

  let { store } = router;
  $: value = projects.find(({ value }) => {
    return value === $store.globalState.projectId;
  });
</script>

<InputGroup label="Project:">
  <Combobox items={projects} on:item={onProjectChange} {value} />
</InputGroup>
