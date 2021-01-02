<script lang="ts">
  import Router from "/src/modules/router/Router.svelte";
  import { router } from "/src/router";
  import { auth } from "/src/modules/auth";
  import AuthForm from "/src/components/ui/forms/auth/AuthForm.svelte";
</script>

{#if $auth.user}
  <Router {router} />
{:else}
  <AuthForm />
{/if}
