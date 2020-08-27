<script lang="ts">
  import Combobox from "../Combobox.svelte";
  let items = [
    { title: "item 1", value: "1" },
    { title: "item 2", value: "2" },
    { title: "item 3", value: "3" },
    { title: "item 4", value: "4" },
    { title: "item 5", value: "5" },
    { title: "item 6", value: "6" },
    { title: "item 7", value: "7" },
  ];
  let search = "";
  let value = null;
  $: filteredItems = items.filter((item) => item.title.startsWith(search));
</script>

<Combobox items={filteredItems} bind:search bind:value />
