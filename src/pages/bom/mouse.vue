<template>
  <div>
    <h1>Mouse</h1>
    <pre>{{ x }} / {{ y }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useMouse from "@/components/useMouse";

export default defineComponent({
  name: "MouseXY",
  setup() {
    const { x, y } = useMouse();
    return {
      x,
      y,
    };
  },
});
</script>

<style scoped></style>
