import type { REQ_TYPE } from "./REQ_TYPE";
import type { SERVICE } from "./SERVICE";
import { concatArgs, concatFields, objectToString } from "./utils";

export class GraphQLResponse<Data> {
  constructor(public data: Data) {}
}

export class GraphQLError<GqlErrorBody extends unknown> {
  public name = "GraphQLError";
  constructor(
    public message: string,
    public panic: boolean,
    public extensions?: GqlErrorBody
  ) {}
}

export type Primitive = string | number | boolean | undefined | null;
export type NonPrimitive = Array<Primitive> | Record<string, Primitive>;

export type Model<T extends NonPrimitive> = Record<string, Primitive | T> | T;

/** `query SomeQuery { someFn(SchemaArgument[]) {} }` */
export class SchemaArgument {
  constructor(private key: string, private value: unknown) {}

  public toString() {
    return `${this.key}: ${objectToString(this.value)}`;
  }
}

/** Select fields in `{ a: string, b: number }` with `{ a: true/false, b: true/false }` */
export type GqlFieldSelect<Output extends Model<NonPrimitive>> = {
  [name in keyof Output]?:
    | boolean
    | (Output[name] extends NonPrimitive
        ? GqlFieldSelect<Output[name]>
        : boolean);
};

/** Ex. Service `users` function `getAll` type `query` or `mutation` */
export interface SchemaAction {
  service: SERVICE;
  fn: string;
  type: REQ_TYPE;
}

interface SchemaOptions<Output extends Model<NonPrimitive>> {
  action: SchemaAction;
  args: SchemaArgument[];
  select?: GqlFieldSelect<Output>;
}

/** Build graphql string with parameters */
export function createSchema<Output extends Model<NonPrimitive>>({
  action,
  args,
  select,
}: SchemaOptions<Output>) {
  return {
    query: `${action.type} { ${action.service} { ${action.fn}(${concatArgs(
      args
    )}) ${concatFields(select)} } }`,
    service: action.service,
    fn: action.fn,
  };
}
