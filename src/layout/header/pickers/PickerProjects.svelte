<script lang="ts">
  import type { ComboboxItem } from "/src/ui/combobox";

  import Combobox from "/src/ui/combobox/Combobox.svelte";
  import InputGroup from "/src/ui/forms/inputgroup/InputGroup.svelte";

  const projects: ComboboxItem[] = [
    { title: "Project 1", value: "1" },
    { title: "Project 2", value: "2" },
  ];
</script>

<InputGroup label="Project:">
  <Combobox items={projects} />
</InputGroup>
