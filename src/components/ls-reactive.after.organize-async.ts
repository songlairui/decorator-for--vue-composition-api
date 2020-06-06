import { reactive, toRefs } from "@vue/composition-api";
import { syncPresist } from "./presist.util";

export const useState = function () {
  const state = reactive({
    field1_: syncPresist.get("field1_"),
    field1: {
      get() {
        return state.field1_;
      },
      set(val: any) {
        state.field1 = val;
        syncPresist.set("field1_", val);
        return true;
      },
    },
  });
  // maybe hide field_ with delete export
  return toRefs(state);
};
