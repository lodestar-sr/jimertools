import { Directive } from "vue";

export default {
  mounted: function (el, binding) {
    el.clickOutsideHandler = (event: MouseEvent) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideHandler, true);
  },
  unmounted: function (el) {
    document.removeEventListener("click", el.clickOutsideHandler);
  }
} as Directive;
