import { GqlModel } from "../model";
import { GqlSelect } from "../schema";

export function concatFields<T extends GqlSelect<GqlModel<never>>>(
  fields?: T,
): string {
  if (!fields) {
    return ``;
  }
  return `{ ${Object.entries(fields)
    .map(([name, v]) => {
      return v === true
        ? name
        : typeof v === "object" && v !== null
        ? `${name} ${concatFields(v)}`
        : "";
    })
    .filter(Boolean)
    .join(", ")} }`;
}
