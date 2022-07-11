<template>
  <div :class="direction === 'in' ? 'mr-40' : 'self-end ml-40'">
    <div :class="direction === 'in' ? 'mx-3' : 'mx-3 text-right'">
      <span class="text-gray-600 text-xs">{{ message.sender }}</span>
      <span class="text-gray-400 text-xs ml-2">{{ timestamp }}</span>
    </div>
    <div
      :class="[
        'rounded-md shadow px-4 py-2',
        direction === 'in'
          ? 'bg-yellow-300 rounded-bl-none'
          : 'bg-blue-300 rounded-br-none'
      ]"
      v-html="html"
    />
  </div>
</template>

<script lang="ts">
import moment from "moment";

export default {
  name: "SmsBalloon",
  props: {
    message: {
      type: Object,
      required: true
    },
    direction: {
      type: String,
      required: false,
      default: "out"
    }
  },
  setup: (props) => {
    return {
      html: props.message.content.replace(/\r?\n/g, "<br />"),
      timestamp: moment(props.message.createdAt).format("LLL")
    };
  }
};
</script>

<style lang="css" scoped></style>
