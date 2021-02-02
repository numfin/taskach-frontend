<script lang="ts">
  import { router } from "../../../../router";
  import { SprintPage } from "../../../../domains/sprint/Sprint.page";
  import type { ComboboxItem } from "/src/components//ui/forms/combobox";

  import Combobox from "/src/components/ui/forms/combobox/Combobox.svelte";
  import InputGroup from "/src/components/ui/forms/inputgroup/InputGroup.svelte";

  let { store } = router;

  const sprints: ComboboxItem[] = [
    { title: "Sprint 1", value: "1" },
    { title: "Sprint 2", value: "2" },
  ];

  function onSprintChange({ detail }: CustomEvent<ComboboxItem>) {
    router.push(SprintPage, {
      sprintId: detail.value,
    });
  }

  $: value = sprints.find(({ value }) => {
    return $store.local.state.sprintId === value;
  });
</script>

<InputGroup label="Sprint:">
  <Combobox items={sprints} on:item={onSprintChange} {value} />
</InputGroup>
