import { FieldInput } from './input-field';
import { InputTypes } from './..';

type FormFields = Record<
  string,
  { [key: string]: FormFields } | FormFields[] | FieldInput<InputTypes>
>;

export function useForm<T>(fields: T) {
  return Object.assign(fields, {
    validate: () => validate(fields as unknown as FormFields),
  });
}

function validate(fields: FormFields | FormFields[]) {
  let valid = true;
  for (const entry of Object.values(fields)) {
    if (entry instanceof FieldInput) {
      // validate field
      if (!entry.validate()) {
        valid = false;
      }
    } else {
      // validate inner obj
      if (!validate(entry)) {
        valid = false;
      }
    }
  }
  return valid;
}
