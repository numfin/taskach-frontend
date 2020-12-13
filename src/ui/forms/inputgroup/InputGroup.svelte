<script lang="ts">
  export let label = "";
  export let vertical = false;
</script>

<style type="scss">
  .input-group {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    align-items: center;
    &.vertical {
      grid-template-columns: auto;
      grid-template-rows: auto auto;
      gap: 5px;
      & + & {
        margin-top: 10px;
      }
    }
  }
  .label {
    font: var(--text-normal);
    color: var(--color-text-secondary);
  }
</style>

<div class="input-group" class:vertical>
  <span class="label">{label}</span>
  <slot />
</div>
