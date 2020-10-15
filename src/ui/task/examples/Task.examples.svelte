<script lang="ts">
  import faker from "faker";
  import Task from "../Task.svelte";
  let items = [
    {
      title: faker.name.firstName(),
      description: faker.lorem.sentences(2),
    },
    undefined,
    {
      description: faker.lorem.sentences(2),
    },
    {
      title: faker.name.firstName(),
    },
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
