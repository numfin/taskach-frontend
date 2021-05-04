import { Operation } from "@/tools/operation/Operation";
import { HttpError } from "./error";

export function httpRequest<ServerOutput, ServerError>(
  method = HttpMethod.POST,
  abortController = new AbortController(),
): HttpRequest<ServerOutput, ServerError> {
  const request = new Operation(
    (path: string, { headers, params = {}, body }: FetchOptions) => {
      const url = new URL(path);
      Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

      return createRequest<ServerOutput, ServerError>({
        url: url.toString(),
        signal: abortController.signal,
        body: JSON.stringify(body),
        headers: new Headers(headers),
        method,
      });
    },
  );

  return {
    request,
    abort: abortController.abort,
  } as HttpRequest<ServerOutput, ServerError>;
}

interface FetchOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
}

interface HttpRequest<ResponseBody, ErrorBody> {
  abort: () => void;
  request: Operation<
    HttpError<ErrorBody>,
    ResponseBody,
    [string, FetchOptions]
  >;
}

export enum HttpMethod {
  POST = "POST",
}

async function createRequest<ServerOutput, ServerError>(fetchOptions: {
  url: string;
  headers: Headers;
  method: HttpMethod;
  body: string;
  signal: AbortSignal;
}): Promise<ServerOutput> {
  try {
    const response = await fetch(fetchOptions.url, {
      cache: "no-cache",
      headers: fetchOptions.headers,
      method: fetchOptions.method,
      body: fetchOptions.body,
      mode: "cors",
      redirect: "follow",
      signal: fetchOptions.signal,
    });
    if (response.ok) {
      const type = response.headers.get("content-type");
      const result =
        type === "application/json"
          ? await response.json()
          : await response.text();
      return result as ServerOutput;
    }
    throw new HttpError(response.statusText, response.json());
  } catch (err) {
    if (err.name === "AbortError") {
      return new Promise(() => undefined);
    } else if (err instanceof HttpError) {
      throw err as HttpError<ServerError>;
    } else {
      throw new HttpError(err.message, undefined, true);
    }
  }
}
