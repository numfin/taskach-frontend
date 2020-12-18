import {
  createEmptyPage,
  IQuery,
  Page,
  pageStateFromQuery,
} from "./CreatePage";
import { pathToUrl, formatQuery } from "./RouteUtils";
import { Writable, writable } from "svelte/store";
import { get_store_value } from "svelte/internal";

interface CurrentPage<State extends IQuery> {
  state: State;
  page: Page<State>;
  view: any;
}

export class Router<GlobalQuery extends IQuery> {
  constructor(private pages: Page<IQuery>[], globalState = {} as GlobalQuery) {
    this.initRoutes(pages);
    this.store = writable({
      globalState,
      local: {
        page: createEmptyPage(),
        state: {},
        view: null,
      },
    });
    this.store.subscribe((store) => {
      this.replace(store.local.page, store.local.state, store.globalState);
    });
  }
  public store: Writable<{
    globalState: GlobalQuery;
    local: CurrentPage<IQuery>;
  }>;
  private get globalState() {
    return get_store_value(this.store).globalState;
  }
  private set globalState(v) {
    this.store.update((store) => {
      store.globalState = v;
      return store;
    });
  }
  private get currentPage() {
    return get_store_value(this.store).local;
  }
  private set currentPage(v) {
    this.store.update((store) => {
      store.local = v;
      return store;
    });
  }

  private mapper: Record<string, Page<IQuery>> = {};

  public init() {
    window.addEventListener("popstate", () => this.setActiveView());
    this.setActiveView();
    return this.store;
  }

  private async setCurrentPage<P extends Page<any>>(
    page: P,
    state: P["query"]
  ) {
    const view = (await page.component()).default;
    this.currentPage = { state: state ?? {}, page, view };
  }

  private setActiveView() {
    this.globalState = pageStateFromQuery<GlobalQuery>(this.globalState);

    const mapped = this.mapper[location.pathname];
    if (mapped) {
      const currentState = history.state ?? pageStateFromQuery(mapped.query);
      return this.setCurrentPage(mapped, currentState);
    }
    const firstRoute = this.pages[0];
    history.replaceState(
      this.globalState,
      "",
      pathToUrl(firstRoute, this.globalState).href
    );
    this.setCurrentPage(firstRoute, {});
  }

  private initRoutes(pages: Page<any>[]) {
    for (const page of pages) {
      this.mapper[page.path] = page;
      if (page.children) {
        this.initRoutes(page.children);
      }
    }
  }

  /** Move to page with new history record */
  public push<P extends Page<IQuery>>(
    page: P,
    query: P["query"],
    globalState = this.globalState
  ) {
    const newState = { ...globalState, ...query };
    const oldState = { ...this.globalState, ...this.currentPage.state };
    if (page === this.currentPage.page) {
      const queryNext = formatQuery(newState);
      const queryLast = formatQuery(oldState);

      if (queryNext !== queryLast) {
        history.pushState(newState, "", pathToUrl(page, newState).href);
        this.setCurrentPage(page, query);
      }
    } else {
      history.pushState(newState, "", pathToUrl(page, newState).href);
      this.setCurrentPage(page, query);
    }
    this.globalState = globalState;
  }

  /** Change global state */
  public changeGlobalState(state: GlobalQuery) {
    this.push(this.currentPage.page, this.currentPage.state, state);
  }

  /** Replace state of current history record */
  public replace<P extends Page<IQuery>>(
    page: P,
    query: P["query"],
    globalState = this.globalState
  ) {
    const newState = { ...globalState, ...query };
    const oldState = { ...this.globalState, ...this.currentPage.state };
    const queryNext = formatQuery(newState);
    const queryLast = formatQuery(oldState);

    if (queryNext !== queryLast) {
      history.replaceState(newState, "", pathToUrl(page, newState).href);
      this.setCurrentPage(page, query);

      this.globalState = globalState;
    }
  }

  /** Replace global state */
  public replaceGlobalState(state: GlobalQuery) {
    this.replace(this.currentPage.page, this.currentPage.state, state);
  }
}
