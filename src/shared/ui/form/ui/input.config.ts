import { InputField, InputTypes } from '../lib';

export interface Slots<T extends InputTypes> {
  input: (p: { value: T; onInput: (v: T) => void }) => JSX.Element;
  label: JSX.Element | string;
}

export interface InputProps<T extends InputTypes> {
  field: InputField<T>;
  slots: Slots<T>;
}
