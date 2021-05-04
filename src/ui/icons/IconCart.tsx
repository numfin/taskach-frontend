import { defineComponent } from "vue";

export const IconCart = defineComponent({
  name: "IconCart",
  props: {
    size: { type: Number, default: 24 },
  },
  render() {
    return (
      <svg
        width={this.size}
        height={this.size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  },
});
