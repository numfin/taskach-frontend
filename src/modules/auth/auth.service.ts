import type { IUser } from ".";
import { gqlRequest } from "../graphql";
import { createSchema, REQ_TYPE, SERVICE } from "../graphql/schema";

export interface AuthenticationData {
  email: string;
  password: string;
}
export interface NewUserInput extends AuthenticationData {
  firstName: string;
  lastName: string;
  phone: string;
}

export function loginMutation<T extends { jwt: string }>({
  email,
  password,
}: AuthenticationData) {
  const schema = createSchema({
    type: REQ_TYPE.mutation,
    service: SERVICE.users,
    fn: "login",
    args: [["auth", { email, password }]],
    fields: {
      jwt: true,
    },
  });
  return gqlRequest<T, unknown>(schema);
}

export interface RegisterErrors {
  email: string;
  password: string;
  phone: string;
}
export function registerMutation<T extends IUser>(args: NewUserInput) {
  const schema = createSchema({
    type: REQ_TYPE.mutation,
    service: SERVICE.users,
    fn: "register",
    args: [["newUser", args]],
    fields: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return gqlRequest<T, RegisterErrors>(schema);
}
