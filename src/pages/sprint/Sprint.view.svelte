<script lang="ts">
  import { RootPage } from "../Root.page";

  import MainLayout from "/src/layout/MainLayout.svelte";
  import Link from "/src/router/Link.svelte";
</script>

<style lang="scss">
  div {
    color: white;
  }
</style>

<MainLayout>
  <div>
    Go back to
    <Link to={(to) => to(RootPage, { projectId: '' })}>/root</Link>
    :)
  </div>
</MainLayout>
