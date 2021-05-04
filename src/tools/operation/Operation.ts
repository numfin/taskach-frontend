import { ComputedRef, Ref, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

import { Result } from "./Result";

export class Operation<ResultErr, ResultOk, OperationArgs extends unknown[]> {
  constructor(private operation: OperationFn<OperationArgs, ResultOk>) {
    this._pending = ref(false);
    this.pending = computed(() => this._pending.value);
  }

  private _pending: Ref<boolean>;
  public pending: ComputedRef<boolean>;

  async resolve(
    ...options: OperationArgs
  ): Promise<Result<true, ResultOk> | Result<false, ResultErr>> {
    this._pending.value = true;
    try {
      return {
        ok: true,
        data: await this.operation(...options),
      };
    } catch (result) {
      return { ok: false, data: result } as Result<false, ResultErr>;
    } finally {
      this._pending.value = false;
    }
  }
}

type OperationFn<Args extends unknown[], ResultOk> = (
  ...args: Args
) => Promise<ResultOk>;
