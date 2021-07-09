declare namespace User {
  interface Body {
    name: string;
    surname: string;
    photo: string;
    email: string;
  }

  interface AuthData {
    email: string;
    password: string;
  }
}
