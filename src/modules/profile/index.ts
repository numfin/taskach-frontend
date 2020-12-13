import { writable } from "svelte/store";
import { loginMutation } from "./profile.service";

export interface IUser {
  exp: number;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

function createProfileStore() {
  const { set, subscribe } = writable<IUser | null>(null);
  return {
    subscribe,
    async login(email: string, password: string) {
      const request = await loginMutation({ email, password }).request;
      if (request.ok) {
      }
    },
  };
}
export const profile = createProfileStore();
