import { defineComponent, PropType } from 'vue';
import { RouteLocationRaw, RouterLink } from 'vue-router';

export const ButtonLink = defineComponent({
  name: 'ButtonLink',
  props: {
    to: {
      type: Object as PropType<RouteLocationRaw>,
      required: true,
    },
  },
  render() {
    return (
      <RouterLink to={this.to} {...this.$attrs}>
        {this.$slots.default?.()}
      </RouterLink>
    );
  },
});
