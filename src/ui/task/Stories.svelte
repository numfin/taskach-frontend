<script lang="ts">
  import type { IProcessShort, IStory, ITaskTypeShort } from "/src/ui/task";
  import TaskTypeStep from "../../ui/task/TaskProcess.svelte";
  import ArrowDown from "/src/icons/ArrowDown.svelte";

  export let stories: IStory[] = [];
  export let taskTypes: ITaskTypeShort[] = [];

  function filterTasksByProcess(
    story: IStory,
    taskType: ITaskTypeShort,
    process: IProcessShort
  ) {
    return story.tasks.filter(({ taskTypeId, processId }) => {
      return taskTypeId === taskType.id && processId === process.id;
    });
  }
</script>

<style lang="scss">
  .story {
    margin-top: 20px;
  }
  .task-type {
    display: flex;

    & + & {
      margin-top: 10px;
    }
  }
  .process {
    padding: 10px;
    width: 340px;
    max-width: 340px;
    min-width: 340px;
  }

  .story-header {
    display: flex;
    align-items: center;
  }
  .story-toggle {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background-color: var(--color-interactive-bg-normal);
    border: 1px solid var(--color-border-main);
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background-color: var(--color-interactive-bg-active);
    }
  }
  .story-name {
    position: relative;
    width: 100%;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      position: absolute;
      top: 50%;
      background-color: var(--color-interactive-bg-normal);
    }
  }
  .story-name-content {
    font: var(--header-level-2);
    color: var(--color-text-secondary);
    position: relative;
    background: var(--color-bg-behind);
    z-index: 1;
    display: inline-block;
    padding-right: 10px;
  }

  .task-type {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

{#each stories as story}
  <div class="story">
    <div class="story-header">
      <div class="story-toggle">
        <ArrowDown />
      </div>
      <div class="story-name">
        <div class="story-name-content">{story.name}</div>
      </div>
    </div>
    {#each taskTypes as taskType}
      <div class="task-type scrollable">
        {#each taskType.processes as process}
          <div class="process">
            <TaskTypeStep
              name={process.name}
              tasks={filterTasksByProcess(story, taskType, process)} />
          </div>
        {/each}
      </div>
    {/each}
  </div>
{/each}
