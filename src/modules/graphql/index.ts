import { API_HOST } from "/src/env";
import { makeRequest } from "/src/modules/base/http";
import { GraphQLError, GraphQLResponse, SERVICE } from "./schema";
import type { Result } from "/src/modules/base/result";

type GqlResponse<S extends SERVICE, Data extends unknown> = {
  data: {
    [s in S]: {
      [fn: string]: Data;
    };
  };
};

export function gqlRequest<Output>(schema: {
  query: string;
  service: SERVICE;
  fn: string;
}): {
  request: Result<GraphQLResponse<Output>, GraphQLError>;
  abort: () => void;
} {
  const { abort, request } = makeRequest<
    GqlResponse<SERVICE, Output>,
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
        query: schema.query,
        variables: {},
      },
    },
    (v) => new GraphQLResponse(v.data[schema.service][schema.fn]),
    (err) => new GraphQLError(err.message, err.panic)
  );
  return {
    abort,
    request,
  };
}
