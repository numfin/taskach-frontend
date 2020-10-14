<script lang="ts">
  import type { IStory, ITaskTypeShort } from "..";
  import Stories from "../Stories.svelte";
  import faker from "faker";
  import lodash from "lodash";

  function gen<T extends unknown>(fn: () => T, count = 10) {
    return Array.from({ length: lodash.random(count, count + 3) }, fn);
  }

  const taskTypes: ITaskTypeShort[] = gen(
    () => ({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      processes: gen(
        () => ({ id: faker.random.uuid(), name: faker.name.lastName() }),
        3
      ),
    }),
    2
  );

  const stories: IStory[] = gen(
    () => ({
      id: faker.random.uuid(),
      name: faker.name.jobTitle(),
      tasks: gen(() => {
        const taskType = lodash.sample(taskTypes);
        const process = lodash.sample(taskType?.processes);

        return {
          id: faker.random.uuid(),
          description: faker.lorem.sentences(2),
          title: faker.lorem.sentence(),
          taskTypeId: taskType?.id ?? "",
          processId: process?.id ?? "",
        };
      }, 10),
    }),
    3
  );
</script>

<Stories {stories} {taskTypes} />
