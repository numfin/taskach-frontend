<script lang="ts">
  import { auth } from "/src/modules/auth";
  $: user = $auth.user;
  $: username = `${user?.first_name} ${user?.last_name}`;
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
    margin-bottom: -4px;
  }
  .user-email {
    color: var(--color-text-secondary);
    font: var(--text-small);
    margin-bottom: -2px;
  }
  .user-name,
  .user-email {
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
    <div class="user-name">{username}</div>
    <div class="user-email">{$auth.user?.email}</div>
  </div>
  <div class="user-avatar" />
</div>
