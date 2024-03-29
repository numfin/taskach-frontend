import { computed, ComputedRef, ref, Ref, watch } from 'vue';

import { InputTypes } from './..';
import { ValidationRules } from './validator';

interface FieldInputOptions<V = InputTypes> {
  value: Ref<V>;
  variants?: Ref<{ value: V; title: string }[]>;
  validation?: ValidationRules<V>;
}

export class FieldInput<V = InputTypes> {
  private _isValid: ComputedRef<boolean>;
  private _isDirty = ref(false);
  public set: (v: V) => void;

  constructor(private options: FieldInputOptions<V>) {
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
    options: FieldInputOptions<U>,
  ): FieldInput<U> {
    return new FieldInput(options);
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
