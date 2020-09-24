<script lang="ts">
  import { router } from "/src/pages";
  import type { Page } from "./CreatePage";

  interface Place<P extends Page<any>> {
    page: P;
    params?: P["query"];
  }

  export function goto<P extends Page<any>>(
    page: P,
    params?: P["query"]
  ): Place<P> {
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
</script>

<a {href} on:click|preventDefault={goToRoute}>
  <slot />
</a>
