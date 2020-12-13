<script lang="ts">
  import Btn from "../../buttons/Btn.svelte";
  import InputGroup from "../inputgroup/InputGroup.svelte";
  import InputText from "../InputText/InputText.svelte";
  import AuthLayout from "/src/layout/AuthLayout.svelte";
  import { profile } from "/src/modules/profile";

  const form = {
    email: "",
    password: "",
  };
  function login() {
    profile.login(form);
  }
</script>

<style lang="scss">
  .auth-container {
    width: 100%;
    max-width: 300px;
  }
  .logo {
    text-align: center;
    margin-bottom: 20px;
    font: var(--header-level-1);
    color: var(--color-text-primary);
    font-size: 48px;
  }
  .actions {
    margin-top: 20px;
  }
</style>

<AuthLayout>
  <div class="auth-container">
    <h1 class="logo">Taskach</h1>
    <form class="auth-form" on:submit|preventDefault={login}>
      <InputGroup label="E-mail:" vertical>
        <InputText
          type="email"
          placeholder="user@mail.com"
          bind:value={form.email} />
      </InputGroup>
      <InputGroup label="Password:" vertical>
        <InputText
          type="password"
          placeholder="••••••••"
          bind:value={form.password} />
      </InputGroup>

      <div class="actions">
        <Btn type="submit" loading={$profile.loading}>Login</Btn>
      </div>
    </form>
  </div>
</AuthLayout>
