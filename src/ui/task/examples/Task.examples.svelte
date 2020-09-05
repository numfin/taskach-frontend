<script lang="ts">
  import { default as Task } from "../Task.svelte";
  let items = [
    {
      title: "Title 1",
      description: "I need smt that i don't know but it supposed to be cool",
    },
    {
      title: "Title 2",
      description:
        "I need something. Something i don't know yes. But it's going to be very cool. I hope... Or maybe not.",
    },
    undefined,
  ];
</script>

<style lang="scss">
  .shell {
    max-width: 320px;
    & + & {
      margin-top: 10px;
    }
  }
</style>

{#each items as item}
  <div class="shell">
    <Task {...item} />
  </div>
{/each}
