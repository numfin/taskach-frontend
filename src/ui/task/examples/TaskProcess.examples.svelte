<script lang="ts">
  import faker from "faker";
  import TaskProcess from "../TaskProcess.svelte";
  import { genItems } from "/examples/createExample";

  let tasks = genItems(
    () => ({
      id: faker.random.uuid(),
      title: faker.name.firstName(),
      description: faker.lorem.sentences(2),
      taskTypeId: faker.random.uuid(),
      processId: faker.random.uuid(),
    }),
    2
  );
</script>

<style lang="scss">
  .shell {
    max-width: 320px;
  }
</style>

<div class="shell">
  <TaskProcess {tasks} name="To Do" />
</div>
