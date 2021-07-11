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
  for (const field of Object.values(fields)) {
    if (field instanceof InputField) {
      if (!field.validate()) {
        valid = false;
      }
    } else {
      if (!validate(field)) {
        valid = false;
      }
    }
  }
  return valid;
}
