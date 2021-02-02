<script lang="ts">
  import type { IQuery } from "./CreatePage";

  import type { Router } from "./CreateRouter";
  export let router: Router<IQuery>;
  const store = router.init();
</script>

<svelte:component this={$store.local.view} />
