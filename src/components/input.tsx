import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    value: {
      validator: () => true,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    return () => (
      <input
        value={props.value}
        onInput={(e: { target: { value: any } }) => {
          console.warn("input e", e);
          emit("input", e.target.value);
        }}
      />
    );
  },
});
