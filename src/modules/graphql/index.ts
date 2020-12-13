import { API_HOST } from "/src/env";
import { makeRequest } from "/src/modules/http";
import { GraphQLError, GraphQLResponse } from "./schema";
import type { Result } from "/src/modules/base";

export function gqlRequest<Output>(
  schema: string
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
        query: schema,
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
