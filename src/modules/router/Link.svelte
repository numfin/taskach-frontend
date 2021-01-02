<script lang="ts">
  import { router } from "../../router";
  import type { IQuery, Page } from "./CreatePage";
  import { onMount } from "svelte";

  interface Place<P extends Page<IQuery>> {
    page: P;
    params: P["query"];
  }

  function goto<P extends Page<IQuery>>(page: P, params: P["query"]): Place<P> {
    return { page, params };
  }

  export let to: (gotoCb: typeof goto) => Place<Page<IQuery>>;
  $: place = to(goto);

  function goToRoute() {
    const { page, params } = place;
    router.push(page, params);
  }

  $: query = new URLSearchParams(place.params as IQuery).toString();
  $: href = `${place.page.path}${query ? `?${query}` : ""}`;

  onMount(() => place.page.component());
</script>

<a {href} on:click|preventDefault={goToRoute}>
  <slot />
</a>
