import { reactive, ref } from 'vue';

export function useTask<Result, Err>(operation: () => Promise<Result>) {
  const pending = ref(false);
  const errors = ref<string[]>([]);

  return reactive({
    errors,
    pending,
    async run(): Promise<[Result, null] | [null, Err]> {
      try {
        pending.value = true;
        return [await operation(), null];
      } catch (err) {
        errors.value = [String(err)];
        return [null, err];
      } finally {
        pending.value = false;
      }
    },
  });
}
