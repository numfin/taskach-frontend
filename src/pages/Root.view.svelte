<script lang="ts">
  import Link from "../router/Link.svelte";
  import { SprintPage } from "./sprint/Sprint.page";
</script>

<div>
  Check
  <Link to={(to) => to(SprintPage, {})}>/sprint</Link>
  :)
</div>
