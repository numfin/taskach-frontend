import { GqlSelect } from "./schema";

export type GqlRemap<M, S extends GqlSelect<M>> = {
  [name in keyof M & keyof S]: S[name] extends NonNullable<unknown>
    ? M[name] extends Record<string, unknown>
      ? GqlRemap<M[name], S[name]>
      : M[name] extends Record<string, unknown>[]
      ? GqlRemap<M[name][0], S[name]>[]
      : M[name]
    : undefined;
};
