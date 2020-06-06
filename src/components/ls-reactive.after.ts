import { reactive, toRefs } from "@vue/composition-api";

export const useState = function () {
  const state = reactive({
    field1_: localStorage.getItem("field1_"),
    field1: {
      get() {
        return state.field1_;
      },
      set(val: any) {
        state.field1 = val;
        localStorage.setItem("field1_", val);
        return true;
      },
    },
  });
  // maybe hide field_ with delete export
  return toRefs(state);
};
