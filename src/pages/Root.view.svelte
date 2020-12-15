<script lang="ts">
  import MainLayout from "../layout/MainLayout.svelte";
  import Link from "../router/Link.svelte";
  import { SprintPage } from "./sprint/Sprint.page";
</script>

<MainLayout>
  Check
  <Link to={(to) => to(SprintPage, {})}>/sprint</Link>
  :)
</MainLayout>
