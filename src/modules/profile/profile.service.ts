import { gqlRequest } from "../graphql";
import { createSchema, REQ_TYPE, SERVICE } from "../graphql/schema";

export function loginMutation<T extends { jwt: string }>(args: {
  email: string;
  password: string;
}) {
  const schema = createSchema({
    type: REQ_TYPE.mutation,
    service: SERVICE.users,
    fn: "login",
    args: [["auth", args]],
    fields: {
      jwt: true,
    },
  });
  return gqlRequest<T>(schema);
}
