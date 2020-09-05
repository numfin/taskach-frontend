<script lang="ts">
  export let title: string = "No title";
  export let description: string = "No description";
</script>

<style>
  .task_item {
    padding: 20px;
    background-color: var(--color-bg-main);
    border: 1px solid var(--color-border-main);
    border-radius: 3px;
    font: var(--text-normal);
    cursor: pointer;
  }
  .task_item:focus,
  .task_item:hover {
    outline: none;
    border-color: var(--color-border-accent);
  }
  .title {
    font-weight: bold;
    color: var(--color-text-primary);
  }
  .description {
    margin-top: 8px;
    color: var(--color-text-secondary);
  }
</style>

<div class="task_item" tabindex="0">
  <div class="title">{title}</div>
  <div class="description">{description}</div>
</div>
