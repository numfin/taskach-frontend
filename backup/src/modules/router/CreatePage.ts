export type IQuery = Record<string, string>;

export interface Page<QueryParams extends IQuery> {
  id: Symbol;
  parent?: Symbol;
  path: string;
  query: Partial<QueryParams>;
  component: () => Promise<typeof import("*.svelte")>;
  children?: Page<any>[];
}

export function createPage<QueryParams extends IQuery>(options: {
  path: string;
  query?: QueryParams;
  component: () => Promise<typeof import("*.svelte")>;
  children?: Page<IQuery>[];
}): Page<QueryParams> {
  const page = {
    id: Symbol(),
    path: options.path,
    query: (options.query ?? {}) as QueryParams,
    component: options.component,
    children: options.children,
  };
  if (options.children) {
    attachParent(page, options.children);
  }
  return page;
}

function attachParent(parent: Page<IQuery>, children: Page<IQuery>[]) {
  for (let child of children) {
    child.parent = parent.id;
    const parentPath = parent.path === "/" ? "" : parent.path;
    child.path = `${parentPath}${child.path}`;
    if (child.children) {
      attachParent(child, child.children);
    }
  }
}

export function pageStateFromQuery<Q extends IQuery>(query: Partial<Q>): Q {
  const { searchParams } = new URL(location.href);
  const state: IQuery = {};
  for (const param of Object.keys(query || {})) {
    state[param] = searchParams.get(param) ?? "";
  }
  return state as Q;
}

export function createEmptyPage() {
  return createPage({
    path: "",
    component: () => Promise.resolve({ default: {} }) as any,
  });
}
