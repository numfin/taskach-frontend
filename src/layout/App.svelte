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

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap"
    rel="stylesheet" />
</svelte:head>
