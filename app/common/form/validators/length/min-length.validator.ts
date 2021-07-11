import { Validator } from '../../validator';

export function MinLen(minlen: number, canBeEqual = true) {
  return class MinLenValidator<
    T extends string | unknown[],
  > extends Validator<T> {
    name = 'MinLen';

    validate(value: T) {
      if (value.length === 0) {
        return null;
      }
      const invalid = canBeEqual
        ? value.length < minlen
        : value.length <= minlen;

      if (invalid) {
        if (Array.isArray(value)) {
          return `Minimum items is: ${minlen}`;
        }
        return `Minimum length is: ${minlen}`;
      }
      return null;
    }
  };
}
