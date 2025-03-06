<template>
  <div class="flex justify-center items-center w-[343px] h-[368px] flex-col">
    <img
      src="../../assets/empty_icon.svg"
      alt="hero image"
      class="w-fit h-fit"
    />
    <div class="flex justify-center items-center flex-col mt-1 mb-[16px]">
      <span class="font-Nunito font-[700] text-[18px]">Catatan App</span>
      <span class="font-Nunito font-[400] text-[14px] text-[#6C6966]"
        >Buat Catatan Baru Sekarang, Yuk!</span
      >
    </div>
    <MainAddButton @activatedCreate="$emit('activatedCreate')" />
  </div>
</template>

<script>
import MainAddButton from "../Button/MainAddButton.vue";
export default {
  name: "EmptySection Component",
  components: {
    MainAddButton,
  },
  emits: ["activatedCreate"],
};
</script>
