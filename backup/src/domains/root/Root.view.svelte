<script lang="ts">
  import Theme from "/src/layout/Theme.svelte";
  import Link from "/src/modules/router/Link.svelte";
  import { SprintPage } from "/src/domains/sprint/Sprint.page";
</script>

<div>
  Check
  <Link to={(to) => to(SprintPage, {})}>/sprint</Link>
  :)
</div>

<Theme />
