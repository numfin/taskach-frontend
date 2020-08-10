<script lang="ts">
  import Combobox from "../Combobox.svelte";
  import Theme from "@/layout/Theme.svelte";
  import type { ComboboxItem } from "../Combobox.model";

  const items: ComboboxItem[] = [
    { title: "Title1", value: "Subtitle1" },
    { title: "Title2", value: "Subtitle2" },
    { title: "Title3", value: "Subtitle3" },
  ];
  let search = "";
  $: filteredItems = items.filter(({ title }) => {
    return title.toLowerCase().startsWith(search.toLowerCase());
  });
</script>

<Combobox bind:search items={filteredItems} />
<Theme />
