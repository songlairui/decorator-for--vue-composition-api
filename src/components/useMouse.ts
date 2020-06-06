import { onMounted, onUnmounted, reactive, toRefs } from "@vue/composition-api";

export default function () {
  const state = reactive({ x: 0, y: 0 });
  const updateXY = (e: MouseEvent) => {
    state.x = e.x;
    state.y = e.y;
  };
  onMounted(() => {
    window.addEventListener("mousemove", updateXY);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", updateXY);
  });
  return toRefs(state);
}
