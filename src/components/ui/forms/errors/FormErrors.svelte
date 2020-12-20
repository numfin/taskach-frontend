<script lang="ts">
  export let errors: string[] = [];
</script>

<style lang="scss">
  .error-message {
    color: var(--color-text-error);
    font: var(--text-small);
    margin-top: 4px;

    &:first-child {
      margin-top: 0;
    }
  }
</style>

{#each errors as error}
  <div class="error-message">{error}</div>
{/each}
