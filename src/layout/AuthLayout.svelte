<script lang="ts">
  import Theme from "./Theme.svelte";
</script>

<style>
  :global(:root.dark) {
    background-color: var(--color-bg-behind);
  }
  .auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
</style>

<main class="auth-layout">
  <slot />
</main>

<Theme />
