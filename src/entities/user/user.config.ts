export namespace User {
  export interface Body {
    name: string;
    surname: string;
    photo: string;
    email: string;
  }

  export enum AuthState {
    Fetching,
    Authorized,
    Unauthorized,
  }

  export interface AuthData {
    email: string;
    password: string;
  }
}
