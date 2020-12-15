<script lang="ts">
  import Theme from "../layout/Theme.svelte";
  import Link from "../router/Link.svelte";
  import { SprintPage } from "./sprint/Sprint.page";
</script>

<div>
  Check
  <Link to={(to) => to(SprintPage, {})}>/sprint</Link>
  :)
</div>

<Theme />
