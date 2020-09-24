import {
  createEmptyPage,
  normalizePageState,
  Page,
  pageStateFromUrl,
} from "./CreatePage";
import { pathToUrl, formatQuery } from "./RouteUtils";
import { readable } from "svelte/store";

type StringRecord = Record<string, string>;

interface ICurrent {
  state: Record<string, string>;
  page: Page<any>;
  view: any;
}

export class Router {
  private _current: ICurrent = {
    page: createEmptyPage(),
    state: {},
    view: null,
  };
  private setCurrent = (_: ICurrent) => {};
  private mapper: Record<string, Page<any>> = {};

  public current = readable(this._current, (set) => {
    this.setCurrent = set as any;
    return () => {};
  });

  constructor(private pages: Page<any>[]) {
    this.initRoutes(pages);
    window.addEventListener("popstate", () => this.setActiveView());
    this.setActiveView();
  }

  private async setCurrentPage<P extends Page<any>>(
    page: P,
    state?: P["query"]
  ) {
    const view = (await page.component()).default;

    this._current = { state: state ?? {}, page, view };
    this.setCurrent(this._current);
  }

  private setActiveView() {
    const mapped = this.mapper[location.pathname];
    if (mapped) {
      const currentState = history.state ?? pageStateFromUrl(mapped);
      return this.setCurrentPage(mapped, currentState);
    }
    const firstRoute = this.pages[0];
    history.replaceState(null, "", pathToUrl(firstRoute.path, "").href);
    this.setCurrentPage(firstRoute, normalizePageState(firstRoute, {}));
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
  public push<P extends Page<StringRecord>>(page: P, query?: P["query"]) {
    const pathNext = pathToUrl(page.path, formatQuery(query));
    const pathBefore = pathToUrl(
      this._current?.page.path,
      formatQuery(this._current?.state)
    );

    if (pathNext.href !== pathBefore.href) {
      history.pushState(query, "", pathNext.href);
      this.setCurrentPage(page, query);
    }
  }

  /** Only change state of current history record */
  public replace<P extends Page<StringRecord>>(
    page: P,
    query: P["query"] = {}
  ) {
    const pathNext = pathToUrl(page.path, formatQuery(query));
    history.pushState(query, "", pathNext.href);
    this.setCurrentPage(page, query);
  }
}
