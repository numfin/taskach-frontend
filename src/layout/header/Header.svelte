<script>
  import Logo from "./Logo.svelte";
  import Userpanel from "./userpanel/UserPanel.svelte";
</script>

<style>
  header {
    padding: 0 var(--padding-layout-hz);
    background-color: var(--color-bg-main);
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-with-project {
    display: flex;
  }
</style>

<header>
  <div class="logo-with-project">
    <Logo />
  </div>
  <Userpanel />
</header>
