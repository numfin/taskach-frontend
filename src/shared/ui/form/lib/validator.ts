import { Ref, ref } from 'vue';

import { InputTypes } from './..';

export abstract class Validator<T> {
  /** Error = string; Success = null */
  abstract validate(value: T): null | string;
  abstract name: string;
}

/** Validation rules wrapper */
export class ValidationRules<T = InputTypes> {
  rules: Validator<T>[] = [];
  errors: Ref<string[]> = ref([]);

  constructor(rules: (new () => Validator<T>)[]) {
    this.rules = rules.map((rule) => new rule());
  }

  /** if valid = true */
  validate(v: T): boolean {
    this.errors.value = this.rules.flatMap((rule) => {
      const errmsg = rule.validate(v);
      return errmsg ? [errmsg] : [];
    });
    return this.errors.value.length === 0;
  }
}
