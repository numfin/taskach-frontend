<script lang="ts">
  import type { IStory, ITaskTypeShort } from "..";
  import Stories from "../Stories.svelte";
  import faker from "faker";
  import lodash from "lodash";
  import { genItems } from "/examples/createExample";

  const taskTypes: ITaskTypeShort[] = genItems(
    () => ({
      id: faker.random.uuid(),
      name: faker.name.firstName(),
      processes: genItems(
        () => ({ id: faker.random.uuid(), name: faker.name.lastName() }),
        3
      ),
    }),
    2
  );

  const stories: IStory[] = genItems(
    () => ({
      id: faker.random.uuid(),
      name: faker.name.jobTitle(),
      tasks: genItems(() => {
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
