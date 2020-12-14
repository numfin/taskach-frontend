import { concatArgs, concatFields } from "./utils";

export class GraphQLResponse<Data> {
  constructor(public data: Data) {}
}

export class GraphQLError<GqlErrorBody = unknown> {
  public name = "GraphQLError";
  constructor(
    public message: string,
    public panic: boolean,
    public extensions: GqlErrorBody
  ) {}
}

export enum SERVICE {
  users = "users",
  projecs = "projects",
}

export enum REQ_TYPE {
  query = "query",
  mutation = "mutation",
}

export type GqlArgument = [string, unknown];
export type GqlFields = {
  [name: string]: GqlFields | boolean;
};

export function createSchema(options: {
  type: REQ_TYPE;
  service: SERVICE;
  fn: string;
  args: GqlArgument[];
  fields: GqlFields;
}) {
  return {
    query: `${options.type} { ${options.service} { ${options.fn}(${concatArgs(
      options.args
    )}) ${concatFields(options.fields)} } }`,
    service: options.service,
    fn: options.fn,
  };
}
