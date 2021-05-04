import { TaskachDomain } from "./domains";
import { SchemaArgument } from "./helpers/concat-args";
import { GqlRemap } from "./remap";
import { GqlSelect, GQL_TYPE } from "./schema";

type GqlAction<Data> = {
  data: {
    [domain in keyof Data]: {
      [fn in keyof Data[domain]]: GqlSelect<Data[domain][fn]>;
    };
  };
};

type GqlError = {
  message: string;
}[];

export function gqlRequest<
  Data extends Record<TaskachDomain, Record<string, unknown>>,
  Input extends Record<string, unknown>
>(
  query: GQL_TYPE,
  createArgs: (input: Input) => SchemaArgument[],
): <Select extends GqlSelect<Data>>(
  actions: GqlAction<Data>,
  input: Input,
) => GqlRemap<Data, Select> {
  return () => {};
}
// const req = gqlRequest(GQL_TYPE.query);
// req({
//   [TaskachDomain.projects]: {
//     'getList': {}
//   }
// })
