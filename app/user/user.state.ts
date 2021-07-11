import { useRouter } from 'vue-router';

import { User } from './user';

import { Store } from '~/app/store';
import { LoginRoute } from '~/routes/login/login.route';

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

  checkAuth() {
    const router = useRouter();
    setTimeout(() => {
      this.state.status = User.AuthState.Unauthorized;
      router.push({
        name: LoginRoute.name,
      });
    }, 1000);
  }
}

export const userStore = new UserStore();
