import { defineComponent, Transition, TransitionProps } from 'vue';
import { RouteRecordNormalized, RouterView } from 'vue-router';

import { MainLayout } from './main/main.layout';
import appStyle from './app.module.css';

import { LoginLayout } from '~/routes/login/login.layout';
import { userStore } from '~/app/user/user.state';
import { User } from '~/app/user/user';
import LoginView from '~/routes/login/login.view';

export const App = defineComponent({
  name: 'App',
  setup() {
    userStore.checkAuth();

    return {
      userState: userStore.getState(),
    };
  },
  render() {
    const animation: TransitionProps = {
      appear: true,
      enterActiveClass: appStyle.fadeEnter,
      leaveActiveClass: appStyle.fadeLeave,
      mode: 'out-in',
    };
    if (this.userState.status === User.AuthState.Fetching) {
      return (
        <LoginLayout loading>
          <Transition {...animation}>
            <LoginView />
          </Transition>
        </LoginLayout>
      );
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
