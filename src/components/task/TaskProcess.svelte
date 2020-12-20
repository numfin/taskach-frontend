<script lang="ts">
  import type { ITaskShort } from ".";

  import Task from "./Task.svelte";

  export let tasks: ITaskShort[];
  export let name: string;
</script>

<style lang="scss">
  .process-name {
    font: var(--header-level-2);
    color: var(--color-text-secondary);
  }
  .task-container {
    margin-top: 10px;
  }
</style>

<div class="process-name">{name}</div>
{#each tasks as task}
  <div class="task-container">
    <Task title={task.title} description={task.description} />
  </div>
{/each}
