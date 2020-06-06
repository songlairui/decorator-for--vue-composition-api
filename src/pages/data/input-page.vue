<template>
  <div>
    <TheInput v-model="delta" />
    <TheInput v-model="fieldstr" />
    <TheInput v-model="fieldnum" />
    <TheInput v-model="sayHi" />
    <TheInput v-model="presistdStr" />
    <hr />
    <pre>result:{{ this.delta }}</pre>
    <hr />
    <pre>{{ sayHi }}</pre>
    <hr />
    <button @click="randomChange">更改 delta</button>
  </div>
</template>
<script>
import TheInput from "@/components/input";
import { defineComponent, ref } from "@vue/composition-api";
import useLocalStorage from "@/components/useLocalStorage";

export default defineComponent({
  components: { TheInput },
  name: "InputPage",
  setup() {
    const delta = ref("");
    const randomChange = function () {
      delta.value = Math.round(Math.random() * 1000);
    };
    const { fieldstr, fieldnum, sayHi, presistdStr } = useLocalStorage();
    return { delta, randomChange, fieldstr, fieldnum, sayHi, presistdStr };
  },
});
</script>
