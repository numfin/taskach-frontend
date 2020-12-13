import { writable } from "svelte/store";
import { loginMutation } from "./profile.service";
import type { Profile, ProfileStore } from ".";
import jwtDecode from "jwt-decode";

export function createProfileStore() {
  const { update, subscribe } = writable<ProfileStore>({
    loading: false,
    user: restoreUser(),
  });

  return {
    subscribe,
    async login(form: { email: string; password: string }) {
      update((store) => {
        store.loading = true;
        return store;
      });

      const request = await loginMutation(form).request;
      if (request.ok) {
        update((store) => {
          const { jwt } = request.result.data;
          store.user = jwtDecode<Profile>(jwt);
          saveUser(jwt);
          return store;
        });
      }

      update((store) => {
        store.loading = false;
        return store;
      });
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
