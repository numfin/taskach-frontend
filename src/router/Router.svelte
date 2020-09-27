<script lang="ts">
  import type { Router } from "./CreateRouter";
  export let router: Router;
  const { current } = router;
</script>

<svelte:component this={$current.view} />
