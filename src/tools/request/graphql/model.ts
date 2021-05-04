import { NonPrimitives } from "@/tools/types/NonPrimitives";
import { Primitives } from "@/tools/types/Primitives";

export type GqlModel<T extends NonPrimitives> =
  | Record<string, Primitives | T>
  | T;
