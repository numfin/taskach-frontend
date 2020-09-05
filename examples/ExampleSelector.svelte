<script lang="ts">
  import Theme from "/src/layout/Theme.svelte";
  import { ComboboxExamples } from "/src/ui/combobox/examples/Combobox.examples";
  import { TaskExamples } from "/src/ui/task/examples/Task.examples";
  import type { Example } from "./createExample";

  const examples: Example[] = [...ComboboxExamples, ...TaskExamples];

  let activeExample: { name: string; component: any };

  async function setActiveExample(nextExample: Example) {
    sessionStorage.setItem("example", nextExample.name);
    activeExample = {
      component: (await nextExample.component()).default,
      name: nextExample.name,
    };
  }

  function setLastActiveExample() {
    const lastActive = sessionStorage.getItem("example");

    if (lastActive) {
      const foundExample = examples.find(({ name }) => name === lastActive);
      return setActiveExample(foundExample);
    }
    setActiveExample(examples[0]);
  }
  setLastActiveExample();
</script>

<style lang="scss">
  .svelte-examples {
    display: grid;
    grid-template-columns: 200px calc(100vw - 200px);
    min-height: 100vh;
  }
  .sidebar {
    display: grid;
    gap: 20px;
    padding: 0px;
    font-family: sans-serif;
    background: var(--color-bg-main);
  }
  .examples-viewer {
    height: 100%;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
    background-color: var(--color-bg-behind);
  }
  .navigation {
    display: grid;
    align-items: start;
    gap: 4px;
    padding: 10px;
    grid-template-rows: repeat(auto-fit, minmax(31px, max-content));
  }
  .navigation-item {
    padding: 5px 7px;
    cursor: pointer;
    color: var(--color-text-primary);

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    &.active {
      background-color: var(--color-bg-accent);
    }
  }
</style>

<div class="svelte-examples">
  <div class="sidebar">
    <div class="navigation">
      {#each examples as example}
        <div
          class="navigation-item"
          class:active={activeExample?.name === example.name}
          on:click={() => setActiveExample(example)}>
          {example.name}
        </div>
      {/each}
    </div>
  </div>

  <div class="examples-viewer">
    {#if activeExample}
      <svelte:component this={activeExample.component} />
    {/if}
  </div>
</div>

<Theme />
