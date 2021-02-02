<script lang="ts">
  import TaskachLogo from "./TaskachLogo.svelte";
  import Userpanel from "./userpanel/UserPanel.svelte";
  import PickerProjects from "./pickers/PickerProjects.svelte";
  import PickerSprints from "./pickers/PickerSprints.svelte";
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
    <TaskachLogo />
    <div class="pickers">
      <PickerProjects />
      <PickerSprints />
    </div>
  </div>
  <Userpanel />
</header>
