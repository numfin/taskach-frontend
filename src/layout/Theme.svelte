<script lang="ts">
  const themes = ["dark"] as const;
  export let theme: typeof themes[number] = "dark";

  $: {
    const html = document.querySelector("html");
    html?.classList.remove(...themes);
    html?.classList.add(theme);
  }
</script>

<style lang="scss">
  :global(:root) {
    --font-family: "Overpass", sans-serif;
    --padding-layout-hz: 44px;

    :global(.scrollable) {
      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        -webkit-overflow-scrolling: touch;
      }

      &::-webkit-scrollbar-track {
        border-radius: 3px;
        background-color: var(--color-interactive-bg-active);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--color-interactive-bg-normal);
        outline: 1px solid --color-interactive-bg-active;
        border-radius: 3px;
      }
    }
  }
  :global(:root.dark) {
    --color-bg-main: #2d3035;
    --color-bg-accent: #e26777;
    --color-bg-behind: #22252a;

    --color-interactive-bg-normal: #3c4452;
    --color-interactive-bg-active: #2e3541;

    --color-text-primary: #f5f5f5;
    --color-text-secondary: #b6b6b6;

    --color-border-main: #1b1d21;
    --color-border-secondary: #3f3f3f;
    --color-border-accent: #e26777;

    --header-level-1: bold 24px/37px var(--font-family);
    --header-level-2: bold 18px/28px var(--font-family);
    --header-level-3: bold 14px/21px var(--font-family);

    --text-normal: 14px/20px var(--font-family);
    --text-small: 13px/20px var(--font-family);
  }

  :global(*) {
    margin: 0;
    padding: 0;
  }
  :global(button) {
    padding: 0;
  }
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap"
    rel="stylesheet" />
</svelte:head>
