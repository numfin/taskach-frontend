<script lang="ts">
  const themes = ["dark"] as const;
  export let theme: typeof themes[number] = "dark";

  $: {
    const html = document.querySelector("html");
    html.classList.remove(...themes);
    html.classList.add(theme);
  }
</script>

<style>
  :global(:root) {
    --font-family: "Overpass", sans-serif;
    --padding-layout-hz: 44px;
  }
  :global(:root.dark) {
    --color-bg-main: #2d3035;
    --color-bg-accent: #e26777;
    --color-bg-behind: #22252a;

    --color-text-primary: #f5f5f5;
    --color-text-secondary: #b6b6b6;

    --color-border-main: #1b1d21;
    --color-border-accent: #3f3f3f;

    --header-level-1: bold 24px/37px var(--font-family);
    --header-level-2: bold 18px/28px var(--font-family);
    --header-level-3: bold 14px/21px var(--font-family);

    --text-normal: 14px/21px var(--font-family);
    --text-small: 13px/20px var(--font-family);

    background-color: var(--color-bg-behind);
  }
</style>
