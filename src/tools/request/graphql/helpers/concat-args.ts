import { objectToString } from "./object-to-string";

export class SchemaArgument {
  constructor(private key: string, private value: unknown) {}

  public toString() {
    return `${this.key}: ${objectToString(this.value)}`;
  }

  static from(key: string, value: unknown) {
    return new SchemaArgument(key, value);
  }
}

export function concatArgs(args: SchemaArgument[]) {
  return args.map((arg) => arg.toString()).join(", ");
}
