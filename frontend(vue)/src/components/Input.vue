<template>
  <div class="relative mb-6">
    <label
      v-if="label"
      class="absolute -top-2 left-6 bg-white text-xs text-gray-500 px-1"
      :class="{ '!text-red-500': error }"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      v-if="type !== 'textarea'"
      :class="className"
      :id="id"
      :name="name"
      v-model="model"
      :placeholder="placeholder"
      @change="onChange"
      @blur="onBlur"
    />
    <textarea
      v-else
      :class="className"
      :id="id"
      :name="name"
      v-model="model"
      :placeholder="placeholder"
      :rows="5"
      @change="onChange"
      @blur="onBlur"
    />
    <p v-if="error" class="text-xs text-red-500 ml-3 mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, toRefs, watch } from "vue";

export default {
  name: "Input",
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: ""
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["init", "change"],
  setup: (props, { emit }) => {
    const { name, value, required } = toRefs(props);

    const id = ref(`${name.value}-${Math.floor(Math.random() * 10000)}`);
    const model = ref(value.value);
    const dirty = ref(false);
    const error = ref();

    const className = computed(() => [
      "block w-full bg-white text-black border border-gray-300 px-4 py-2 rounded-md outline-none transition-all",
      "focus:border-gray-400 hover:shadow-md focus:shadow-md",
      { "!border-red-500": error.value }
    ]);

    onMounted(() => {
      emit("init", {
        name,
        validate,
        getValue() {
          return model.value;
        },
        reset
      });
    });

    watch(value, (value) => {
      model.value = value;
    });

    watch([model, dirty, required], () => {
      validate();
    });

    const validate = () => {
      dirty.value = true;

      if (required.value && !model.value) {
        error.value = "This field is required.";
        return false;
      }

      error.value = "";
      return true;
    };

    const reset = () => {
      dirty.value = false;
      model.value = "";
      error.value = "";
    };

    const onBlur = () => {
      validate();
    };

    const onChange = (e) => {
      dirty.value = true;
      emit("change", e.target.value);
    };

    return {
      className,
      id,
      model,
      error,
      onBlur,
      onChange
    };
  }
};
</script>

<style lang="css" scoped></style>
