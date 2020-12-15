<script lang="ts">
  import Btn from "../../buttons/Btn.svelte";
  import FormErrors from "../errors/FormErrors.svelte";
  import InputGroup from "../inputgroup/InputGroup.svelte";
  import InputText from "../InputText/InputText.svelte";
  import AuthLayout from "/src/layout/AuthLayout.svelte";
  import { auth } from "/src/modules/auth";

  const form = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  };

  let registerSuccess = true;

  async function submit() {
    if (mode === MODE.login) {
      auth.login(form);
    } else {
      const request = await auth.register(form);
      if (request.ok) {
        registerSuccess = true;
      }
    }
  }

  enum MODE {
    login,
    register,
  }

  let mode = MODE.login;

  function toggleMode() {
    if (!$auth.loading) {
      mode = mode === MODE.login ? MODE.register : MODE.login;
    }
  }
  function reset() {
    mode = MODE.login;
    registerSuccess = false;
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
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .second-action {
    font: var(--text-normal);
    color: var(--color-text-secondary);
  }
  .second-action-link {
    color: var(--color-text-primary);
  }
  .success-register {
    padding: 20px 40px;
    background-color: var(--color-bg-main);
    color: var(--color-text-primary);
    text-align: center;
  }
  .thanks {
    font: var(--header-level-2);
  }
  .thanks-message {
    font: var(--text-normal);
  }
  .let-me-in {
    font: var(--text-normal);
    color: var(--color-bg-accent);
  }
</style>

<AuthLayout>
  <div class="auth-container">
    <h1 class="logo">Taskach</h1>
    {#if !registerSuccess}
      <form class="auth-form" on:submit|preventDefault={submit}>
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

        {#if mode === MODE.register}
          <InputGroup label="First name:" vertical>
            <InputText placeholder="Sasha" bind:value={form.firstName} />
          </InputGroup>
          <InputGroup label="Last name:" vertical>
            <InputText placeholder="Paramonov" bind:value={form.lastName} />
          </InputGroup>
          <InputGroup label="Phone:" vertical>
            <InputText placeholder="+79998887766" bind:value={form.phone} />
          </InputGroup>
        {/if}

        <FormErrors errors={$auth.errors} />

        <div class="actions">
          <Btn type="submit" loading={$auth.loading}>
            {mode === MODE.login ? `Login` : `Register`}
          </Btn>
          <div class="second-action">
            or
            <a
              class="second-action-link"
              href="/"
              on:click|preventDefault={toggleMode}>{mode === MODE.login ? `register` : `login`}</a>
          </div>
        </div>
      </form>
    {:else}
      <div class="success-register">
        <div class="thanks">Thank you!</div>
        <div class="thanks-message">
          We sent you an e-mail with confirmation link.
        </div>

        <a href="/" on:click|preventDefault={reset} class="let-me-in">Let me in!</a>
      </div>
    {/if}
  </div>
</AuthLayout>
