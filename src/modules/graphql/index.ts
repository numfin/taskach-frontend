import { API_HOST } from "/src/env";
import { IHttpError, httpRequest } from "/src/modules/base/http";
import {
  createSchema,
  GqlFieldSelect,
  GraphQLError,
  GraphQLResponse,
  Model,
  NonPrimitive,
  SchemaAction,
  SchemaArgument,
} from "./schema";
import type { SERVICE } from "./SERVICE";
import type { Result } from "/src/modules/base/result";

type GqlResponse<S extends SERVICE, Data, ErrorBody> = {
  data: {
    [s in S]: {
      [fn: string]: Data;
    };
  };
  errors?: {
    message: string;
    extensions?: ErrorBody;
  }[];
};
export function gqlRequest<
  Output extends Model<NonPrimitive>,
  GqlErrorBody extends unknown,
  Input extends unknown,
  Select = GqlFieldSelect<Output>
>(
  action: SchemaAction,
  createArgs: (input: Input) => SchemaArgument[]
): (
  args: Input,
  select: Select
) => {
  request: Result<GraphQLResponse<Output>, GraphQLError<GqlErrorBody>>;
  abort: () => void;
} {
  return function send(args: Input, select?: Select) {
    const schema = createSchema({
      action,
      args: createArgs(args),
      select,
    });

    const { abort, request } = httpRequest<
      GqlResponse<SERVICE, Output, GqlErrorBody>,
      IHttpError<GqlErrorBody>,
      GraphQLResponse<Output>,
      GraphQLError<GqlErrorBody>
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
          throw new IHttpError<GqlErrorBody>(
            v.errors[0].message,
            true,
            v.errors[0].extensions
          );
        }
        return new GraphQLResponse(v.data[schema.service][schema.fn]);
      },
      (err) => new GraphQLError<GqlErrorBody>(err.message, err.panic, err.body)
    );
    return {
      abort,
      request,
    };
  };
}
