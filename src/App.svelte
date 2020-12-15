<script lang="ts">
  import Router from "/src/router/Router.svelte";
  import { router } from "/src/pages";
  import { auth } from "./modules/auth";
  import AuthForm from "./ui/forms/auth/AuthForm.svelte";
</script>

{#if $auth.user}
  <Router {router} />
{:else}
  <AuthForm />
{/if}
