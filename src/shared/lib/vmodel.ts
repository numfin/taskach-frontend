export function vModel<T, S extends (v: T) => void>(
  value: T,
  set: S,
): {
  modelValue: T;
  'update:modelValue': S;
} {
  return {
    modelValue: value,
    'update:modelValue': set,
  };
}
