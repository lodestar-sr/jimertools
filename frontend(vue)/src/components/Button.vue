<template>
  <button
    :class="[
      'block bg-blue-600 text-white uppercase px-6 py-2 rounded-md !outline-none transition-all',
      disabled ? 'opacity-80 cursor-default' : 'hover:shadow-md'
    ]"
    :type="type"
    :disabled="disabled"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      required: false,
      default: "button"
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["click"],
  setup: (props, { emit }) => {
    const onClick = () => {
      emit("click");
    };

    return {
      onClick
    };
  }
};
</script>

<style lang="css" scoped></style>
