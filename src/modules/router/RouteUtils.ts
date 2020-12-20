import type { IQuery, Page } from "./CreatePage";

const BASE_URL = location.origin;

export function pathToUrl<P extends Page<IQuery>>(
  { path: pageUrl }: P,
  query: P["query"]
): URL {
  const q = formatQuery(query);
  const queryString = q ? `?${q}` : q;
  const path = pageUrl[0] === "/" ? pageUrl : `/${pageUrl}`;
  return new URL(`${BASE_URL}${path}${queryString}`);
}

/**
 * convert `{c: "some", a:1}`
 * to `a=1&c=some`
 */
export function formatQuery(params: Page<IQuery>["query"]): string {
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) {
      search.set(k, v);
    }
  }
  search.sort();
  return search.toString();
}
