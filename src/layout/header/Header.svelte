<script lang="ts">
  import Logo from "./Logo.svelte";
  import Userpanel from "./userpanel/UserPanel.svelte";
  import PickerProjects from "./pickers/PickerProjects.svelte";
</script>

<style lang="scss">
  header {
    padding: 15px var(--padding-layout-hz);
    box-sizing: border-box;
    background-color: var(--color-bg-main);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px 20px;
    flex-wrap: wrap;
  }
  .pickers {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .pickers-with-logo {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }
</style>

<header>
  <div class="pickers-with-logo">
    <Logo />
    <div class="pickers">
      <PickerProjects />
      <PickerProjects />
    </div>
  </div>
  <Userpanel />
</header>
