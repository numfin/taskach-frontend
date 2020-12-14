import { API_HOST } from "/src/env";
import { HttpError, makeRequest } from "/src/modules/base/http";
import { GraphQLError, GraphQLResponse, SERVICE } from "./schema";
import type { Result } from "/src/modules/base/result";

type GqlResponse<S extends SERVICE, Data, ErrorBody> = {
  data: {
    [s in S]: {
      [fn: string]: Data;
    };
  };
  errors?: {
    message: string;
    extensions: ErrorBody;
  }[];
};

export function gqlRequest<Output, GqlErrorBody = unknown>(schema: {
  query: string;
  service: SERVICE;
  fn: string;
}): {
  request: Result<GraphQLResponse<Output>, GraphQLError>;
  abort: () => void;
} {
  const { abort, request } = makeRequest<
    GqlResponse<SERVICE, Output, GqlErrorBody>,
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
    (v) => {
      if (v.errors && v.errors.length > 0) {
        throw new HttpError<GqlErrorBody>(
          v.errors[0].message,
          true,
          v.errors[0].extensions
        );
      }
      return new GraphQLResponse(v.data[schema.service][schema.fn]);
    },
    (err) => new GraphQLError(err.message, err.panic, err.body)
  );
  return {
    abort,
    request,
  };
}
