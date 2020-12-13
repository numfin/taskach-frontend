<script lang="ts">
  type InputType = "text" | "email" | "password";
  export let value = "";
  export let type: InputType = "text";
  export let placeholder = "";
  export let disabled = false;
</script>

<style lang="scss">
  .input-text {
    &,
    &::placeholder {
      color: var(--color-text-passive);
      font: var(--text-normal);
    }
    color: var(--color-text-secondary);
    line-height: 35px;
    height: 35px;
    border: 1px solid var(--color-border-main);
    background-color: var(--color-interactive-bg-normal);
    border-radius: 3px;
    outline: none;
    padding: 0 12px;

    &:focus {
      color: var(--color-text-primary);
      background-color: var(--color-interactive-bg-active);
      border: 1px solid var(--color-border-accent);
    }
  }
</style>

<input
  class="input-text"
  {type}
  {value}
  {placeholder}
  {disabled}
  on:input={(event) => (value = event.currentTarget.value)} />
