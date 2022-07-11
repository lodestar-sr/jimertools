<template>
  <slot v-if="!loading" />
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "AuthProvider",
  setup: () => {
    const store = useStore();
    const loading = ref(true);

    onMounted(() => {
      const token = localStorage.getItem("token");
      store.dispatch("setToken", token).then(() => {
        loading.value = false;
      });
    });

    return {
      loading
    };
  }
};
</script>

<style lang="css" scoped></style>
