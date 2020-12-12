<script lang="ts">
  import type { IProcessShort, IStory, ITaskTypeShort } from "/src/ui/task";
  import TaskTypeStep from "../../ui/task/TaskProcess.svelte";
  import ArrowDown from "/src/icons/ArrowDown.svelte";

  export let stories: IStory[] = [];
  export let taskTypes: ITaskTypeShort[] = [];

  const pressed = {
    container: null as HTMLDivElement | null,
    start: { x: 0 },
    status: false,
  };

  const hiddenStories: Record<string, boolean> = {};

  function initDragging(this: HTMLDivElement, event: PointerEvent) {
    if (event.buttons !== 4) {
      return;
    }
    pressed.start.x = event.pageX + this.scrollLeft;
    pressed.container = this;
    pressed.status = true;

    window.addEventListener("pointermove", moveContainer);
    window.addEventListener("pointerup", finishDragging);
  }
  function moveContainer(event: PointerEvent) {
    pressed.container?.scroll({
      left: pressed.start.x - event.pageX,
    });
  }
  function finishDragging() {
    pressed.container = null;
    pressed.start.x = 0;
    pressed.status = false;
    window.removeEventListener("pointermove", moveContainer);
    window.removeEventListener("pointerup", finishDragging);
  }

  function filterTasksByProcess(
    story: IStory,
    taskType: ITaskTypeShort,
    process: IProcessShort
  ) {
    return story.tasks.filter(({ taskTypeId, processId }) => {
      return taskTypeId === taskType.id && processId === process.id;
    });
  }

  function toggleStory(story: IStory) {
    hiddenStories[story.id] = !hiddenStories[story.id];
  }
</script>

<style lang="scss">
  .story {
    margin-top: 20px;
  }
  .task-type {
    display: flex;
    width: 100%;
    overflow-x: auto;

    & + & {
      margin-top: 10px;
    }

    &.pressed {
      pointer-events: none;
    }
  }
  .process {
    padding: 10px;
    width: 340px;
    max-width: 340px;
    min-width: 340px;
    scroll-snap-align: start;
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

    &.visible {
      transform: rotate(180deg);
    }

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
</style>

{#each stories as story}
  <div class="story">
    <div class="story-header">
      <div
        class="story-toggle"
        on:click={() => toggleStory(story)}
        class:visible={!hiddenStories[story.id]}>
        <ArrowDown />
      </div>
      <div class="story-name">
        <div class="story-name-content">{story.name}</div>
      </div>
    </div>
    {#if !hiddenStories[story.id]}
      {#each taskTypes as taskType}
        <div
          on:pointerdown={initDragging}
          class="task-type scrollable"
          class:pressed={pressed.status}>
          {#each taskType.processes as process}
            <div class="process">
              <TaskTypeStep
                name={process.name}
                tasks={filterTasksByProcess(story, taskType, process)} />
            </div>
          {/each}
        </div>
      {/each}
    {/if}
  </div>
{/each}
