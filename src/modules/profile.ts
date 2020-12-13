import { writable } from "svelte/store";

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
    login,
  };
}
export const profile = createProfileStore();

function login(email: String, password: String) {}
