import { InputField, InputTypes } from './input-field';

type FormFields = Record<
  string,
  { [key: string]: FormFields } | FormFields[] | InputField<InputTypes>
>;

export function useForm<T>(fields: T) {
  return Object.assign(fields, {
    validate: () => validate(fields as unknown as FormFields),
  });
}

function validate(fields: FormFields | FormFields[]) {
  let valid = true;
  for (const entry of Object.values(fields)) {
    if (entry instanceof InputField) {
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
