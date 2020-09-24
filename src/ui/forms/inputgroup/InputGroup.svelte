<script lang="ts">
  export let label = "";
</script>

<style type="scss">
  .input-group {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    align-items: center;
  }
  .label {
    font: var(--text-normal);
    color: var(--color-text-secondary);
  }
</style>

<div class="input-group">
  <span class="label">{label}</span>
  <slot />
</div>
