<template>
  <div class="w-screen h-screen flex-center">
    <form
      class="w-full max-w-120 bg-white rounded-md shadow-md p-8"
      @submit="onSubmit"
    >
      <h1 class="text-4xl font-bold text-center mb-8">Login</h1>
      <Input
        name="username"
        label="Username"
        required
        @init="(control) => setFormControl('username', control)"
      />
      <Input
        name="chatroom"
        label="Chatroom"
        required
        @init="(control) => setFormControl('chatroom', control)"
      />
      <div
        v-if="error"
        class="border border-red-500 bg-red-100 text-red-500 text-center rounded-md px-4 py-2 mt-4"
      >
        {{ error }}
      </div>
      <Button class="ml-auto mt-8" type="submit">Login</Button>
    </form>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Button, Input } from "../../components";
import { ROUTES } from "../../constants";
import router from "../../router";
import { AuthService } from "../../services/auth.service";
import { IForm } from "../../types";
import { getFormData } from "../../utils/helpers";

export default {
  name: "Login",
  components: {
    Button,
    Input
  },
  setup: () => {
    const store = useStore();
    const form = ref<IForm>({});
    const error = ref();

    onMounted(() => {
      const user = store.state.user;
      if (user) {
        router.replace(ROUTES.CHATROOM);
      }
    });

    const setFormControl = (field, value) => {
      form.value = {
        ...form.value,
        [field]: value
      };
    };

    const onSubmit = (e) => {
      e.preventDefault();

      const data = getFormData(form.value);
      if (!data) {
        return;
      }

      AuthService.login(data.username, data.chatroom)
        .then((token) => {
          store.dispatch("setToken", token).then((user) => {
            if (user) {
              router.replace(ROUTES.CHATROOM);
            } else {
              error.value = "Login failed";
            }
          });
        })
        .catch((err) => {
          error.value = err.message || "Login failed";
        });
    };

    return {
      form,
      error,
      setFormControl,
      onSubmit
    };
  }
};
</script>

<style lang="css" scoped></style>
