import type { IStory } from ".";
import { gqlRequest } from "../graphql";
import { SchemaArgument } from "../graphql/schema";
import { REQ_TYPE } from "../graphql/REQ_TYPE";
import { SERVICE } from "../graphql/SERVICE";

function getById<T extends Partial<IStory>>() {
  return gqlRequest<T, unknown, { projectId: string }>(
    {
      type: REQ_TYPE.query,
      service: SERVICE.projects,
      fn: "getProjectStories",
    },
    ({ projectId }) => [new SchemaArgument("projectId", projectId)]
  );
}

export const story = {
  getById,
};
