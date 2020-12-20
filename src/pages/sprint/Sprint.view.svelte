<script lang="ts">
  import MainLayout from "/src/layout/MainLayout.svelte";
  import type { IStory, ITaskTypeShort } from "/src/components/task";
  import Stories from "/src/components/task/Stories.svelte";

  let stories: IStory[] = [];
  let taskTypes: ITaskTypeShort[] = [];
</script>

<MainLayout>
  <Stories {stories} {taskTypes} />
</MainLayout>
