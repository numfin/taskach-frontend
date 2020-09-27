export interface Page<QueryParams extends Record<string, string>> {
  id: Symbol;
  parent?: Symbol;
  path: string;
  query?: Partial<QueryParams>;
  component: () => Promise<typeof import("*.svelte")>;
  children?: Page<any>[];
}

export function createPage<
  QueryParams extends Record<string, string>
>(options: {
  path: string;
  query?: QueryParams;
  component: () => Promise<typeof import("*.svelte")>;
  children?: Page<Record<string, string>>[];
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

function attachParent(parent: Page<any>, children: Page<any>[]) {
  for (let child of children) {
    child.parent = parent.id;
    const parentPath = parent.path === "/" ? "" : parent.path;
    child.path = `${parentPath}${child.path}`;
    if (child.children) {
      attachParent(child, child.children);
    }
  }
}

export function pageStateFromUrl<P extends Page<any>>(page: P): P["query"] {
  const { searchParams } = new URL(location.href);
  const state: Record<string, string> = {};
  for (const param of Object.keys(page?.query || {})) {
    state[param] = searchParams.get(param) ?? "";
  }
  return state;
}

export function normalizePageState(
  page: Page<any>,
  state: Record<string, string>
) {
  for (const param of Object.keys(page?.query || {})) {
    const value = state[param];
    if (value) {
      state[param] = value;
    }
  }
  return state;
}

export function createEmptyPage() {
  return createPage({
    path: "",
    component: () => Promise.resolve({ default: {} }) as any,
  });
}
