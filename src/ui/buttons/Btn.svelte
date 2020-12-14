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
    position: relative;
    color: var(--color-text-primary);
    line-height: 33px;
    height: 35px;
    border: 1px solid var(--color-border-main);
    background-color: var(--color-interactive-bg-normal);
    border-radius: 3px;
    outline: none;
    padding: 0 12px;
    cursor: pointer;
    overflow: hidden;

    &:focus {
      background-color: var(--color-interactive-bg-active);
      border: 1px solid var(--color-border-accent);
    }
    &:disabled {
      cursor: default;
    }
  }
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    &::before,
    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      width: 200%;
      height: 2px;
      background-color: var(--color-text-primary);
      transform: translateX(-100%);

      animation: line 1s ease-in-out infinite;
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
      animation-delay: 0.25s;
    }
  }
  @keyframes line {
    0% {
      transform: translateX(-100%);
    }
    80% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>

<button
  class="btn"
  {type}
  on:click={() => dispatch('click')}
  disabled={isDisabled}>
  {#if loading}
    <div class="loader" />
    <div class="hidden-content">
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
</button>
