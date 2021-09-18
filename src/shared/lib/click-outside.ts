import { App } from 'vue';

export function registerClickOutside(app: App) {
  app.directive('click-outside', {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = (event: Event) => {
        if (!(el == event.target || el.contains(event.target))) {
          binding.value();
        }
      };
      document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: (el) => {
      document.removeEventListener('click', el.clickOutsideEvent);
    },
  });
}
