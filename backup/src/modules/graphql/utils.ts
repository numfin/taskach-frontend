import type { SchemaArgument, GqlFieldSelect, Model } from "./schema";

export function concatArgs(args: SchemaArgument[]) {
  return args.map((arg) => arg.toString()).join(", ");
}

export function objectToString(value: unknown): string {
  if (typeof value === "object" && value !== null) {
    return `{ ${Object.entries(value).map(
      ([k, v]) => `${k}: ${objectToString(v)}`
    )} }`;
  } else if (Array.isArray(value)) {
    return `[${value.map(objectToString).join(", ")}]`;
  } else if (typeof value === "string") {
    return `"${value}"`;
  } else {
    return String(value);
  }
}

export function concatFields<T extends GqlFieldSelect<Model<{}>>>(
  fields?: T
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
