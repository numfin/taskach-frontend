import jwtDecode from "jwt-decode";
import { writable } from "svelte/store";

import { auth } from "./auth.service";
import type { AuthenticationData, NewUserInput } from "./auth.service";
import type { Profile, ProfileStore } from ".";

export function createAuthStore() {
  const { update, subscribe, set } = writable<ProfileStore>({
    loading: false,
    user: restoreUser(),
    registeredUser: null,
    errors: [],
  });

  return {
    subscribe,
    async login(form: AuthenticationData) {
      update((store) => (store.loading = true) && store);

      const request = await auth.login()(form, { jwt: true }).request;
      if (request.ok) {
        const { jwt } = request.result.data;
        set({
          errors: [],
          loading: false,
          user: jwtDecode<Profile>(jwt),
          registeredUser: null,
        });
        saveUser(jwt);
      } else {
        set({
          errors: [request.error.message],
          loading: false,
          user: null,
          registeredUser: null,
        });
      }
    },
    async register(form: NewUserInput) {
      update((store) => (store.loading = true) && store);

      const request = await auth.register()(form, {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      }).request;
      if (request.ok) {
        set({
          loading: false,
          errors: [],
          user: null,
          registeredUser: request.result.data,
        });
      } else {
        set({
          errors: [
            request.error.message,
            ...Object.values(request.error.extensions ?? {}),
          ],
          loading: false,
          user: null,
          registeredUser: null,
        });
      }
      return request;
    },
  };
}

function restoreUser() {
  const jwt = localStorage.getItem("session");
  return jwt ? jwtDecode<Profile>(jwt) : null;
}
function saveUser(jwt: string) {
  localStorage.setItem("session", jwt);
}
