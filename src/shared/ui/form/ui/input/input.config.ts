import { FieldInput, InputTypes, FieldSelect } from '../../lib';

export interface Slots<T = InputTypes> {
  input: (p: { value: T; set: (v: T) => void }) => JSX.Element;
  label?: JSX.Element | string;
}

export interface InputProps<T, ItemV> {
  field: FieldInput<T> | FieldSelect<T, ItemV>;
  slots: Slots<T>;
}
