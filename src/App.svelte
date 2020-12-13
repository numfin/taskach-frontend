<script lang="ts">
  import Router from "/src/router/Router.svelte";
  import { router } from "/src/pages";
  import { profile } from "./modules/profile";
  import AuthForm from "./ui/forms/auth/AuthForm.svelte";
</script>

{#if $profile.user}
  <Router {router} />
{:else}
  <AuthForm />
{/if}
