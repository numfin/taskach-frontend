<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let type: "button" | "submit" | "reset" = "button";
  export let loading = false;
  export let disabled = false;

  $: isDisabled = disabled || loading;
</script>

<style lang="scss">
  .btn {
    color: var(--color-text-secondary);
    line-height: 33px;
    height: 35px;
    border: 1px solid var(--color-border-main);
    background-color: var(--color-interactive-bg-normal);
    border-radius: 3px;
    outline: none;
    padding: 0 12px;
    cursor: pointer;

    &:focus {
      color: var(--color-text-primary);
      background-color: var(--color-interactive-bg-active);
      border: 1px solid var(--color-border-accent);
    }
  }
</style>

<button
  class="btn"
  {type}
  on:click={() => dispatch('click')}
  disabled={isDisabled}>
  {#if loading}
    loading
  {:else}
    <slot />
  {/if}
</button>
