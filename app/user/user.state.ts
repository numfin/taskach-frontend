import { reactive } from 'vue';

export const UserState = {
  state: reactive({
    user: null as User.Body | null,
  }),

  async login(authData: User.AuthData) {
    return authData;
  },
};
