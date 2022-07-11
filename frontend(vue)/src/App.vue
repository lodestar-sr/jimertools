<template>
  <AuthProvider>
    <router-view />
  </AuthProvider>
</template>

<script lang="ts">
import { AuthProvider } from "./providers";
export default {
  components: { AuthProvider }
};
</script>
