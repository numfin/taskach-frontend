import type { GqlArgument, GqlFields } from "./schema";

export function concatArgs(args: GqlArgument[]) {
  return args
    .map(([name, value]) => `${name}: ${objectToString(value)}`)
    .join(", ");
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

export function concatFields(fields: GqlFields): string {
  return `{ ${Object.entries(fields)
    .map(([name, v]) => {
      return v === true
        ? name
        : typeof v === "object"
        ? `${name} ${concatFields(v)}`
        : "";
    })
    .filter(Boolean)
    .join(", ")} }`;
}
