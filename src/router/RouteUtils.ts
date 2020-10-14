import type { Page } from "./CreatePage";

const BASE_URL = location.origin;

export function pathToUrl(pageUrl: string, query: string): URL {
  const queryString = query ? `?${query}` : query;
  const path = pageUrl[0] === "/" ? pageUrl : `/${pageUrl}`;
  return new URL(`${BASE_URL}${path}${queryString}`);
}

/**
 * convert `{c: "some", a:1}`
 * to `a=1&c=some`
 */
export function formatQuery(params?: Page<any>["query"]): string {
  const search = new URLSearchParams(params);
  search.sort();
  return search.toString();
}
