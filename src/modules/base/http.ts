import { handlePromise, Result } from "./result";

export class HttpError<ErrorBody = unknown> {
  public name = "HttpError";
  constructor(
    public message: string,
    public panic: boolean,
    public body = {} as ErrorBody
  ) {}
}

export function makeRequest<
  Output,
  FinalOutput = Output,
  FinalError = HttpError
>(
  url: string,
  options: { headers: Record<string, string>; data: any },
  mapOk = (((data: Output) => data) as unknown) as (
    data: Output
  ) => FinalOutput,
  mapErr = (((err: HttpError) => err) as unknown) as (
    err: HttpError
  ) => FinalError
): { abort: () => void; request: Result<FinalOutput, FinalError> } {
  const abortController = new AbortController();
  const operation = fetch(url, {
    cache: "no-cache",
    headers: new Headers(options.headers),
    method: "POST",
    body: JSON.stringify(options.data),
    mode: "cors",
    redirect: "follow",
    signal: abortController.signal,
  })
    .then((response) => {
      if (response.ok) {
        const type = response.headers.get("content-type");
        return type === "application/json" ? response.json() : response.text();
      }
      throw new HttpError(response.statusText, true);
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        throw new HttpError("Request aborted", false);
      }
      console.log(err);
      throw new HttpError(err.message, true);
    });
  return {
    request: handlePromise<Output, HttpError, FinalOutput, FinalError>(
      operation,
      mapOk,
      mapErr
    ),
    abort: abortController.abort,
  };
}
