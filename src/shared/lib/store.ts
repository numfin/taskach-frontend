import { DeepReadonly, reactive, UnwrapRef } from 'vue';

export abstract class Store<T> {
  protected state: UnwrapRef<T> | T;
  protected abstract data(): T;

  constructor() {
    this.state = reactive(this.data() as RR) as T;
  }

  public getState() {
    return this.state as DeepReadonly<T>;
  }
}

type RR = Record<string, unknown>;
