<template>
  <button
    class="w-fit h-fit text-center ml-3 bg-[#00A2B9] rounded-lg px-[16px] py-[10px]"
    @click="$emit('activatedCreate')"
  >
    <span class="font-Nunito text-[14px] font-[600] text-white"
      >Buat Catatan</span
    >
  </button>
</template>

<script>
export default {
  name: "MainAddButton",
  emits: ["activatedCreate"],
};
</script>
