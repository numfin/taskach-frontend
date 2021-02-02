<script lang="ts">
  import MainLayout from "/src/layout/MainLayout.svelte";
  import type { IStory, ITaskTypeShort } from "/src/components/task";
  import Stories from "/src/components/task/Stories.svelte";
  import { onMount } from "svelte";
  import { project } from "/src/modules/project/project.service";
  import { router } from "/src/router";

  let stories: IStory[] = [];
  let taskTypes: ITaskTypeShort[] = [];

  $: store = router.store;
  onMount(async () => {
    const request = await project.getById()(
      { id: $store.globalState.projectId },
      {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      }
    ).request;
    if (request.ok) {
      console.log(request.result);
    } else {
      console.log(request.error);
    }
  });
</script>

<style lang="scss">
  .container {
    padding: 20px var(--padding-layout-hz);
  }
</style>

<MainLayout>
  <div class="container">
    <Stories {stories} {taskTypes} />
  </div>
</MainLayout>
