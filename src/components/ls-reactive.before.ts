import { reactive, toRefs } from "@vue/composition-api";

export const useState = function () {
  const state = reactive({
    field1: "",
  });
  return toRefs(state);
};
