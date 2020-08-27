<script lang="ts">
  import Theme from "/src/layout/Theme.svelte";
  import { ComboboxStories } from "/src/ui/combobox/stories/Combobox.stories";
  import type { Story } from "./createStory";

  const stories: Story[] = [...ComboboxStories];

  let activeStory: { name: string; component: any };

  async function setActiveStory(nextStory: Story) {
    activeStory = {
      component: (await nextStory.component()).default,
      name: nextStory.name,
    };
  }
  setActiveStory(stories[0]);
</script>

<style type="text/scss">
  .svelte-stories {
    display: grid;
    grid-template-columns: 200px calc(100vw - 200px);
    min-height: 100vh;
  }
  .sidebar {
    display: grid;
    gap: 20px;
    padding: 20px;
    font-family: sans-serif;
    background: #f7f4e6;
  }
  .stories-viewer {
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
  }
  .navigation {
    display: grid;
    align-items: start;
    gap: 10px;
  }
  .navigation-item {
    padding: 5px 7px;
    cursor: pointer;

    &:hover,
    &.active {
      background: #e4dec5;
    }
  }
</style>

<div class="svelte-stories">
  <div class="sidebar">
    <div class="navigation">
      {#each stories as story}
        <div
          class="navigation-item"
          class:active={activeStory?.name === story.name}
          on:click={() => setActiveStory(story)}>
          {story.name}
        </div>
      {/each}
    </div>
  </div>

  <div class="stories-viewer">
    {#if activeStory}
      <svelte:component this={activeStory.component} />
    {/if}
  </div>
</div>

<Theme />
