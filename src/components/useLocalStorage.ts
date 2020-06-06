import { computed, reactive, toRefs } from "@vue/composition-api";

type State = {
  fieldstr: string;
  fieldnum: number;
  presistdStr: string;
  presistdStr_: string;
};

export default function () {
  const state: State = reactive({
    fieldstr: "",
    fieldnum: 0,
    presistdStr_: localStorage.getItem("_presist_") || "",
    presistdStr: computed({
      get() {
        return state.presistdStr_;
      },
      set(val: string) {
        state.presistdStr_ = val;
        localStorage.setItem("_presist_", val);
        return true;
      },
    }),
    sayHi: computed({
      get: () => `Hi, ${state.fieldstr} !`,
      set(val) {
        console.info("xx", val);
        state.fieldstr = val;
      },
    }),
  });

  return toRefs(state);
}
