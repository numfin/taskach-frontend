import { defineComponent } from "vue";

export const AuthLayout = defineComponent({
  name: "AuthLayout",
  render() {
    return <div class="auth">{this.$slots.default?.()}</div>;
  },
});
