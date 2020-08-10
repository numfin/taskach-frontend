<script lang="ts">
  import Theme from "./Theme.svelte";
  import Header from "./header/Header.svelte";
</script>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
  }
</style>

<main>
  <Header />
</main>

<Theme />
