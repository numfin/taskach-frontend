<script lang="ts">
  import { router } from "/src/pages";
  import type { Page } from "./CreatePage";
  import { onMount } from "svelte";

  interface Place<P extends Page<any>> {
    page: P;
    params?: P["query"];
  }

  function goto<P extends Page<any>>(page: P, params?: P["query"]): Place<P> {
    return { page, params };
  }

  export let to: (gotoCb: typeof goto) => Place<Page<any>>;
  $: place = to(goto);

  function goToRoute() {
    const { page, params } = place;
    router.push(page, params);
  }

  $: query = new URLSearchParams(place.params).toString();
  $: href = `${place.page.path}${query ? `?${query}` : ""}`;

  onMount(() => place.page.component());
</script>

<a {href} on:click|preventDefault={goToRoute}>
  <slot />
</a>
