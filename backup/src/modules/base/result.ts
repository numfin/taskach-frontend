export type Result<Data, CustomError> = Promise<
  { ok: true; result: Data } | { ok: false; error: CustomError }
>;

export async function handlePromise<
  Data,
  PromiseError,
  ResultData = Data,
  ResultError = PromiseError
>(
  operation: Promise<Data>,
  mapOk = (((data: Data) => data) as unknown) as (data: Data) => ResultData,
  mapErr = (((err: PromiseError) => err) as unknown) as (
    err: PromiseError,
  ) => ResultError,
): Result<ResultData, ResultError> {
  try {
    return Promise.resolve({ ok: true, result: mapOk(await operation) });
  } catch (error) {
    return { ok: false, error: mapErr(error as any) };
  }
}
