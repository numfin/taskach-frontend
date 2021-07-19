import { User } from './user.config';

import { Store } from '~/shared/lib/store';

interface StoreState {
  status: User.AuthState;
  user: null | User.Body;
}

class UserStore extends Store<StoreState> {
  protected data() {
    return {
      status: User.AuthState.Fetching,
      user: null,
    };
  }

  async login(authData: User.AuthData): Promise<boolean> {
    if (authData) {
      await new Promise((r) => setTimeout(r, 1000));
      this.state.status = User.AuthState.Authorized;
      return true;
    }
    return false;
  }

  async checkAuth() {
    const success = await new Promise((r) => setTimeout(() => r(false), 100));

    if (success) {
      this.state.status = User.AuthState.Authorized;
    } else {
      this.state.status = User.AuthState.Unauthorized;
    }
    return success;
  }
}

export const userStore = new UserStore();
