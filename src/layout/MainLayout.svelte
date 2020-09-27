<script lang="ts">
  import Theme from "./Theme.svelte";
  import Header from "/src/ui/header/Header.svelte";
</script>

<style>
  :global(:root.dark) {
    background-color: var(--color-bg-behind);
  }
</style>

<main>
  <Header />

  <slot />
</main>

<Theme />
