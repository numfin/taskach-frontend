import type { AuthResponse, IUser } from ".";
import { gqlRequest } from "../graphql";
import { SchemaArgument } from "../graphql/schema";
import { REQ_TYPE } from "../graphql/REQ_TYPE";
import { SERVICE } from "../graphql/SERVICE";

export interface AuthenticationData {
  email: string;
  password: string;
}
export interface NewUserInput extends AuthenticationData {
  firstName: string;
  lastName: string;
  phone: string;
}

function login<T extends AuthResponse>() {
  return gqlRequest<T, unknown, AuthenticationData>(
    {
      type: REQ_TYPE.mutation,
      service: SERVICE.users,
      fn: "login",
    },
    ({ email, password }) => [new SchemaArgument("auth", { email, password })]
  );
}

export interface RegisterErrors {
  email: string;
  password: string;
  phone: string;
}
function register<T extends IUser>() {
  return gqlRequest<T, RegisterErrors, NewUserInput>(
    {
      type: REQ_TYPE.mutation,
      service: SERVICE.users,
      fn: "register",
    },
    (user) => [new SchemaArgument("newUser", user)]
  );
}

export const auth = {
  login,
  register,
};
