import { defineComponent, Transition, TransitionProps } from 'vue';
import { RouteRecordNormalized, RouterView } from 'vue-router';

import appStyle from './app.module.css';

import { MainLayout, LoginLayout } from '~/features/theme';
import { User, userStore } from '~/entities/user';
import { LoginRoute } from '~/routes/login/login.route';

export const App = defineComponent({
  name: 'App',
  async beforeRouteEnter(to, from, next) {
    const isAuthorized = await userStore.checkAuth();
    if (isAuthorized) {
      next(to);
    } else {
      next({
        name: LoginRoute.name,
      });
    }
  },
  setup() {
    userStore.checkAuth();

    return {
      userState: userStore.getState(),
    };
  },
  render() {
    const animation: TransitionProps = {
      ...appStyle,
      appear: true,
      mode: 'out-in',
    };
    if (this.userState.status === User.AuthState.Fetching) {
      return <LoginLayout loading />;
    }

    return (
      <RouterView
        v-slots={{
          default({
            Component,
            route,
          }: {
            Component: unknown;
            route: RouteRecordNormalized;
          }) {
            const Layout = (route.meta.layout ??
              MainLayout) as () => JSX.Element;
            return (
              <Layout>
                <Transition {...animation}>{Component}</Transition>
              </Layout>
            );
          },
        }}
      />
    );
  },
});
