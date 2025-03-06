<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed top-5 right-1/2 bg-[#F1F9EF] text-black px-4 py-2 rounded-lg shadow-lg flex flex-row"
    >
      <img src="../../assets//alert_icon.svg" alt="icon" class="mr-[14px]" />
      <span>
        {{ message }}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SuccessNotification",
  props: {
    message: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showToast() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000); // Toast akan hilang dalam 3 detik
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
