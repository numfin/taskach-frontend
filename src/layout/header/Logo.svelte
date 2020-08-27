<script lang="ts">
  import { Cart } from "/src/icons";
</script>

<style>
  .logo-container {
    cursor: pointer;
    box-sizing: border-box;
    padding: 5px 13px 0 10px;
    height: 34px;
    background-color: var(--color-bg-accent);
    color: var(--color-bg-main);
    display: flex;
  }
  .logo-text {
    margin-top: 1px;
    margin-left: 9px;
    font: var(--header-level-3);
    color: var(--color-bg-main);
    text-transform: uppercase;
  }
</style>

<div class="logo-container">
  <Cart />

  <div class="logo-text">Taskach</div>
</div>
