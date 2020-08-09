<script lang="ts">

</script>

<style>
  .userpanel {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .user-name {
    color: var(--color-text-primary);
    font: var(--text-normal);
  }
  .user-surname {
    color: var(--color-text-secondary);
    font: var(--text-small);
  }
  .user-name,
  .user-surname {
    text-align: right;
  }
  .user-avatar {
    width: 34px;
    height: 34px;
    border: 1px solid var(--color-border-main);
    box-sizing: border-box;
    margin-left: 10px;
    border-radius: 4px;
  }
</style>

<div class="userpanel">
  <div class="user-data">
    <div class="user-name">Aleksandr Paramonov</div>
    <div class="user-surname">numfin@yandex.ru</div>
  </div>
  <div class="user-avatar" />
</div>
