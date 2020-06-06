<template>
  <div>
    <TheInput v-model="delta" />
    <hr />
    <pre>result:{{ this.delta }}</pre>
    <hr />
    <button @click="randomChange">更改 delta</button>
  </div>
</template>
<script>
import TheInput from "@/components/input";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  components: { TheInput },
  name: "InputPage",
  setup() {
    const delta = ref("");
    const randomChange = function () {
      delta.value = Math.round(Math.random() * 1000);
    };
    return { delta, randomChange };
  },
});
</script>
