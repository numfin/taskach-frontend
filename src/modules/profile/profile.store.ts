import { writable } from "svelte/store";
import { loginMutation } from "./profile.service";
import type { Profile, ProfileStore } from ".";
import jwtDecode from "jwt-decode";

export function createProfileStore() {
  const { update, subscribe, set } = writable<ProfileStore>({
    loading: false,
    user: restoreUser(),
    errors: [],
  });

  return {
    subscribe,
    async login(form: { email: string; password: string }) {
      update((store) => (store.loading = true) && store);

      const request = await loginMutation(form).request;
      if (request.ok) {
        const { jwt } = request.result.data;
        set({
          errors: [],
          loading: false,
          user: jwtDecode<Profile>(jwt),
        });
        saveUser(jwt);
      } else {
        set({
          errors: [request.error.message],
          loading: false,
          user: null,
        });
      }
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
