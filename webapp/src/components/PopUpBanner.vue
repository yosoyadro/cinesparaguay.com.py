<template>
  <!-- banner -->
  <div
    class="
      pop-up-banner
      fixed
      top-0
      left-0
      w-full
      h-full
      p-8
      bg-black
      bg-opacity-75
      overflow-hidden
      z-40
      flex
      items-center
      justify-center
      md:p-32"
      :class="(open) ? 'block' : 'hidden'">
      <div class="image-container relative w-full md:w-1/2">
        <div class="image">
          <img :src="image" class="absolute top-0 left-0 w-full" alt="publicidad">
          <img src="/assets/icons/circle-xmark-regular.svg" class="close-button w-8 absolute top-2 right-2 cursor-pointer" @click="()=>{this.open = false}">
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import './components.css'

export default {
  name: "PopUpBanner",
  data(){
    return{
      open: true
    }
  },
  props:{
    image: {
			type: String
    }
  }
};
</script>

<style scoped>
.image{
  padding-top: 100%
}
</style>


