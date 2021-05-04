export function objectToString(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(objectToString).join(", ")}]`;
  } else if (value instanceof Set) {
    return `[${[...value].map(objectToString).join(", ")}]`;
  } else if (typeof value === "object" && value !== null) {
    return `{${Object.entries(value).map(
      ([k, v]) => ` ${k}: ${objectToString(v)}`,
    )} }`;
  } else if (typeof value === "string") {
    return `"${value}"`;
  } else {
    return String(value);
  }
}
