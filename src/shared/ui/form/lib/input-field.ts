import { computed, ComputedRef, ref, Ref, watch } from 'vue';

import { ValidationRules } from './validator';

export interface InputFieldOptions<V extends InputTypes> {
  value: Ref<V>;
  variants?: Ref<{ value: V; title: string }[]>;
  validation?: ValidationRules<V>;
}

export class InputField<V extends InputTypes> {
  private _isValid: ComputedRef<boolean>;
  private _isDirty = ref(false);
  public set: (v: V) => void;

  constructor(private options: InputFieldOptions<V>) {
    this._isValid = computed(() => {
      if (options.validation && this._isDirty.value) {
        return options.validation.errors.value.length === 0;
      }
      return true;
    });

    watch([options.value, () => options.variants?.value], ([value]) => {
      this.validate(value);
    });
    options.validation?.validate(options.value.value);

    this.set = (v: V) => {
      options.value.value = v;
    };
  }

  validate(forcedValue?: V): boolean {
    this._isDirty.value = true;
    const isValid = this.options.validation?.validate(
      forcedValue ?? this.value,
    );
    return !!isValid;
  }

  static new<V extends InputTypes = never, U extends V = V>(
    options: InputFieldOptions<U>,
  ): InputField<U> {
    return new InputField(options);
  }

  set value(v: V) {
    this.set(v);
  }
  get value() {
    return this.options.value.value;
  }

  get errors() {
    if (this._isDirty.value) {
      return this.options.validation?.errors.value ?? [];
    }
    return [];
  }
  get isValid() {
    return this._isValid.value;
  }
}

export type InputTypes = string | number | boolean | undefined;
