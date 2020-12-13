import { API_HOST } from "../env";
import type { Result } from "./base";
import { makeRequest } from "./http";

class GraphQLResponse<Data> {
  constructor(public data: unknown) {}
}
class GraphQLError {
  public name = "GraphQLError";
  constructor(public message: string, public panic: boolean) {}
}

export function gqlRequest<
  Output,
  Schema extends (params: SchemaParams) => Output,
  SchemaParams = Record<string, any>
>(
  schema: Schema,
  params: SchemaParams
): {
  request: Result<GraphQLResponse<Output>, GraphQLError>;
  abort: () => void;
} {
  const { abort, request } = makeRequest<
    Output,
    GraphQLResponse<Output>,
    GraphQLError
  >(
    API_HOST,
    {
      headers: {
        "content-type": "application/json",
      },
      data: {
        operationName: null,
        query: schema(params),
        variables: {},
      },
    },
    (v) => new GraphQLResponse(v),
    (err) => new GraphQLError(err.message, err.panic)
  );
  return {
    abort,
    request,
  };
}
