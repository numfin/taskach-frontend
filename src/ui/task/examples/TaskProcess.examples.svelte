<script lang="ts">
  import TaskProcess from "../TaskProcess.svelte";
  let tasks = [
    {
      id: "1",
      title: "Title 1",
      description: "I need smt that i don't know but it supposed to be cool",
      taskTypeId: "1",
      processId: "1",
    },
    {
      id: "2",
      title: "Title 2",
      description:
        "I need something. Something i don't know yes. But it's going to be very cool. I hope... Or maybe not.",
      taskTypeId: "1",
      processId: "1",
    },
  ];
</script>

<style lang="scss">
  .shell {
    max-width: 320px;
  }
</style>

<div class="shell">
  <TaskProcess {tasks} name="To Do" />
</div>
