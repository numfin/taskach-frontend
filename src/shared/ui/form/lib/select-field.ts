import { computed, ComputedRef, ref, Ref, watch } from 'vue';

import { ValidationRules } from './validator';

type FieldSelectOptions<V, ItemV> = {
  value: Ref<V>;
  validation?: ValidationRules<V>;
  items: Ref<ItemV[]>;
};

/** Field that contains value variants */
export class FieldSelect<V, ItemV> {
  private _isValid: ComputedRef<boolean>;
  private _isDirty = ref(false);
  private _variants: Ref<ItemV[]>;
  public set: (v: V) => void;

  constructor(private options: FieldSelectOptions<V, ItemV>) {
    this._isValid = computed(() => {
      if (options.validation && this._isDirty.value) {
        return options.validation.errors.value.length === 0;
      }
      return true;
    });
    this._variants = options.items;

    watch(options.value, (value) => {
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

  static new<
    V extends InputTypes = never,
    ItemV extends unknown = never,
    U extends V = V,
    X extends ItemV = ItemV,
  >(options: FieldSelectOptions<U, X>) {
    return new FieldSelect<U, X>(options);
  }

  set value(v: V) {
    this.set(v);
  }
  get value() {
    return this.options.value.value;
  }

  get variants(): ItemV extends never ? undefined : ItemV[] {
    return this._variants?.value as ItemV extends never ? undefined : ItemV[];
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
