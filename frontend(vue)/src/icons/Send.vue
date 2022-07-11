<template>
  <svg viewBox="0 0 24 24" :width="size" :height="size">
    <path
      :fill="color"
      d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
    />
  </svg>
</template>

<script lang="ts">
export default {
  name: "SendIcon",
  props: {
    size: {
      type: Number,
      required: false,
      default: 24
    },
    color: {
      type: String,
      required: false,
      default: "currentColor"
    }
  }
};
</script>

<style lang="css" scoped></style>
