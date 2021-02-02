import type { IProject } from ".";
import { gqlRequest } from "../graphql";
import { SchemaArgument } from "../graphql/schema";
import { REQ_TYPE } from "../graphql/REQ_TYPE";
import { SERVICE } from "../graphql/SERVICE";

interface ProjectQueryInput {
  id: string;
}
function getById<T extends Partial<IProject>>() {
  return gqlRequest<T, unknown, ProjectQueryInput>(
    {
      type: REQ_TYPE.query,
      service: SERVICE.projects,
      fn: "getById",
    },
    (input) => [new SchemaArgument("projectId", input.id)]
  );
}

export const project = {
  getById,
};
