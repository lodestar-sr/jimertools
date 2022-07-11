<template>
  <div class="w-screen h-screen flex flex-col">
    <div class="bg-white flex items-center shadow-md px-6 py-4">
      <span class="text-blue-900 text-2xl font-bold">CHATROOM</span>
      <span class="text-gray-700 text-lg font-medium ml-auto">
        {{ user?.name || "" }}
      </span>
      <div
        class="text-gray-400 hover:text-gray-500 transition-all ml-4 cursor-pointer"
        @click="onLogout"
      >
        <LogoutIcon />
      </div>
    </div>

    <div
      class="scroll-container h-0 flex-grow flex flex-col items-start overflow-auto p-4"
    >
      <SmsBalloon
        v-for="message in messages"
        :key="message.id"
        class="mb-2"
        :message="message"
        :direction="message.senderId === user?.id ? 'out' : 'in'"
      />
    </div>

    <div class="bg-white flex p-4 shadow-md-top">
      <Input
        class="flex-grow !mb-0"
        type="textarea"
        name="content"
        @init="initControl"
      />
      <Button
        class="w-22 flex-center flex-col ml-4"
        :disabled="!length || length > 255"
        @click="sendMessage"
      >
        <SendIcon :size="40" />
        <span class="text-xs mt-1">
          (<span :class="['font-semibold', { 'text-red-500': length > 255 }]">{{
            length
          }}</span>/255)
        </span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { ROUTES } from "../../constants";
import router from "../../router";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import SmsBalloon from "../../components/SmsBalloon.vue";
import LogoutIcon from "../../icons/Logout.vue";
import SendIcon from "../../icons/Send.vue";
import { ChatService } from "../../services/chat.service";

export default {
  name: "Chatroom",
  components: { SmsBalloon, SendIcon, Button, Input, LogoutIcon },
  setup: () => {
    const store = useStore();
    const user = store.state.user;
    const messages = computed(() => store.state.messages);
    const control = ref();
    const chatService = ref(new ChatService(store));

    const length = computed(() => control.value?.getValue().length || 0);

    onMounted(() => {
      if (!user) {
        router.replace(ROUTES.AUTH.LOGIN);
        return;
      }
    });

    onUnmounted(() => {
      chatService.value.leave();
    });

    watch(messages, () => {
      setTimeout(() => {
        const el = document.querySelector(".scroll-container");
        if (el) {
          el.scrollTo({
            left: 0,
            top: el.scrollHeight
          });
        }
      }, 200);
    });

    const onLogout = () => {
      store.dispatch("logout");
    };

    const initControl = (formControl) => {
      control.value = formControl;
    };

    const sendMessage = () => {
      const text = control.value.getValue();
      if (text) {
        chatService.value.sendSms(text);
        control.value.reset();
      }
    };

    return {
      user,
      control,
      length,
      messages,
      onLogout,
      initControl,
      sendMessage
    };
  }
};
</script>

<style lang="css" scoped></style>
