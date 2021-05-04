import { concatArgs, SchemaArgument } from "./helpers/concat-args";
import { concatFields } from "./helpers/concat-fields";

export enum GQL_TYPE {
  query = "query",
  mutation = "mutation",
}

/** Build graphql string with parameters */
export function createSchema(action: SchemaAction, select: GqlSelect<unknown>) {
  const [type, domain, fn] = action;
  const fields = concatFields(select);

  return (args: SchemaArgument[]) => {
    return `${type} { ${domain} { ${fn}(${concatArgs(args)}) ${fields} } }`;
  };
}

/** Select fields, that you want to return
 * @example { field1: true, field2: { field3: true }}
 */
export type GqlSelect<Output> = {
  [name in keyof Output]?: Output[name] extends Record<string, unknown>
    ? GqlSelect<Output[name]>
    : Output[name] extends unknown[]
    ? GqlSelect<Output[name][0]>
    : boolean;
};
