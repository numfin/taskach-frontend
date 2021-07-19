import { Validator } from '../validator';

export class IsRequired<
  T extends string | number | unknown[],
> extends Validator<T> {
  name = 'IsEmail';
  validate(value: T) {
    const invalidMsg = 'Field is required';
    if (value === undefined) {
      return invalidMsg;
    }
    let valid = false;
    if (typeof value === 'string' || Array.isArray(value)) {
      valid = value.length > 0;
    } else if (typeof value === 'number') {
      valid = isNumber(value);
    }
    return valid ? null : invalidMsg;
  }
}

function isNumber(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    value !== null &&
    isFinite(value) &&
    !isNaN(value)
  );
}
