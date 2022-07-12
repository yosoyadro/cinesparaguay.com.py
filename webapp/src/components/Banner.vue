<template>
  <!-- banner -->
  <div
    v-if="data"
    class="
      banner
      relative
      w-full
      bg-white
      bg-opacity-25
      rounded-md
      overflow-hidden"
    :style="(data.portada) ? { backgroundImage: 'url(' + data.portada.data.full_url+ ')' } : { backgroundImage: 'url(/assets/img/main.jpg)' }">
      <!-- gradient -->
      <div class="
        gradient
        absolute
        left-0
        bottom-0
        w-full
        h-3/4
        bg-gradient-to-b
        from-transparent
        to-black
        rounded-md
        overflow-hidden">
      </div>
      <!-- content -->
      <div class="banner-content text-white absolute left-0 bottom-0 p-8 w-full flex justify-center">
        <div class="banner-text flex flex-col gap-2 text-center lg:w-1/2">
          <!-- title -->
          <p v-if="showText" class="title text-xl font-bold lg:text-4xl">{{data.titulo}}</p>
          <!-- genres tags -->
          <div v-if="showText" class="genres flex gap justify-center">
            <div class="genre-item flex items-center" v-for="(item, index) in data.genero" :key="index">
              <p class="text-sm lg:text-lg flex items-center mb-2">{{item.generos_id.nombre}}</p>
              <div class="divider w-1 h-1 bg-white mx-2" v-if="index+1 < data.genero.length"></div>
            </div>
          </div>
          <!-- button -->
          <Button v-if="showButton" class="bg-purple-900 border-none mx-auto">Más Info</Button>
        </div>
      </div>
  </div>

  <!-- skeleton -->
  <div v-else
    class="
      banner
      w-full
      bg-white
      bg-opacity-25
      rounded-md"
  />
</template>

<script lang="ts">
import './components.css'
import Button from '@/components/Button.vue'

export default {
  name: "Banner",
  components:{
    Button
  },
  props:{
    data: {
			type: Object
    },
    showButton: {
      type: Boolean,
      default: true
    },
    showText:{
      type: Boolean,
      default: true
    }
  }
};
</script>


