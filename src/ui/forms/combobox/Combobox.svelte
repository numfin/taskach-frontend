<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { ComboboxItem } from ".";
  import ArrowDown from "/src/icons/ArrowDown.svelte";

  export let opened = false;

  export let items: ComboboxItem[] = [];
  export let search = "";

  export let defaultTitle = "Not chosen";
  export let defaultValue: ComboboxItem | null = null;

  export let value: ComboboxItem | null = defaultValue;

  const dispatch = createEventDispatcher();

  function pickItem(item: ComboboxItem) {
    value = item || defaultValue;
    dispatch("item", item);
    closeDropdown();
  }
  function openDropdown() {
    opened = true;
  }
  function closeDropdown() {
    opened = false;
  }
  function toggleDropdown() {
    opened ? closeDropdown() : openDropdown();
  }
  function handleWindowClick(e: MouseEvent) {
    if (container && !container.contains(e.target as Node)) {
      closeDropdown();
    }
  }

  let container: HTMLLabelElement;
</script>

<style type="text/scss">
  .combobox {
    position: relative;
    display: block;
  }
  .value-container {
    --combobox-value-width: 200px;
    --combobox-value-height: 34px;
    width: var(--combobox-value-width);
    height: var(--combobox-value-height);
    display: flex;
    justify-content: space-between;
    background-color: var(--color-interactive-bg-normal);
    border-radius: 3px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .value-container.opened {
    background: var(--color-interactive-bg-active);
  }
  .value {
    padding: 0 12px;
    color: var(--color-text-secondary);
    font: var(--text-normal);
    line-height: var(--combobox-value-height);
    width: calc(
      var(--combobox-value-width) - var(--combobox-value-height) - 4px
    );
    box-shadow: inset -1px 0 0 var(--color-border-main),
      1px 0 0 var(--color-border-secondary);
  }
  .button-toggle {
    width: var(--combobox-value-height);
    height: var(--combobox-value-height);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button-toggle.opened {
    transform: rotate(180deg);
  }

  .dropdown-container {
    width: 240px;
    background-color: var(--color-interactive-bg-active);
    border: 1px solid var(--color-border-main);
    position: absolute;
    top: 100%;
    transform: translateY(4px);
    border-radius: 3px;
    box-sizing: border-box;
  }
  .search-input {
    font: var(--text-normal);
    color: var(--color--text-primary);
    width: 225px;
    height: 28px;
    margin: 6px auto;
    display: block;
    border: 1px solid var(--color-border-main);
    border-radius: 3px;
    background: none;
    padding: 0 6px;
    box-sizing: border-box;
    color: var(--color-text-primary);
  }
  .dropdown-items {
    max-height: 245px;
    overflow-y: auto;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      background-color: var(--color-bg-main);
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-bg-accent);
      border-radius: 3px;
    }
  }
  .dropdown-item {
    height: 40px;
    width: 100%;
    padding: 2px 14px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .dropdown-item + .dropdown-item {
    margin-top: 1px;
  }
  .dropdown-item:hover {
    background-color: var(--color-interactive-bg-normal);
  }
  .item-title {
    font: var(--text-normal);
    color: var(--color-text-primary);
  }
  .item-subtitle {
    font: var(--text-small);
    color: var(--color-text-secondary);
  }
</style>

<label for="search-input" class="combobox" bind:this={container}>
  <div class="value-container" on:click={toggleDropdown} class:opened>
    <div class="value">{value?.title ?? defaultTitle}</div>
    <div class="button-toggle" class:opened>
      <ArrowDown />
    </div>
  </div>

  {#if opened}
    <div class="dropdown-container" class:opened>
      <input
        type="text"
        id="search-input"
        class="search-input"
        bind:value={search}
        placeholder="Write to filter" />

      <div class="dropdown-items">
        {#each items as item}
          <div class="dropdown-item" on:click={() => pickItem(item)}>
            <div class="item-title">{item.title}</div>
            <div class="item-subtitle">{item.value}</div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</label>

<svelte:window on:click={handleWindowClick} />
