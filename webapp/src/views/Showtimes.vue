<template>
    <div class="showtimes-page px-4 md:px-8">
        <!-- standalone navbar -->
        <NavBar v-if="standalone">
            <!-- info -->
            <Button class="bg-white text-white bg-opacity-25" :iconOnly="true">
            <InfoPane />
            </Button>

            <!-- logo -->
            <img src="/img/logo.svg" alt="Logo" class="h-4">

            <!-- showtimes -->
            <router-link to="/cartelera">
                <!-- mobile version -->
                <Button class="bg-white text-white bg-opacity-25 lg:hidden" :iconOnly="true">
                <img src="/assets/icons/movie-ticket.svg" alt="cartelera" class="w-5 h-5">
                </Button>
            </router-link>
        </NavBar>

        <!-- Section Title -->
        <p v-if="!this.standalone" class="pb-2 text-white text-lg font-bold lg:text-2xl lg:pt-6 lg:pb-6">
        Cartelera
        </p>

        <!-- items -->
        <div class="items flex flex-col gap-4" v-if="cinemas.length > 0">
            <div class="cinema w-full text-white bg-white bg-opacity-25 rounded-md" v-for="(cinema,index) in cinemas" :key="index">
                <!-- header -->
                <div class="cinema-header p-4 cursor-pointer" @click="openItem(index)">
                    <p class="font-bold">{{cinema.nombre}}</p>
                    <p class="text-sm">{{cinema.direccion}}</p>
                </div>
                <!-- body -->
                <div class="cinema-body overflow-hidden" :class="(selectedItem == index) ? 'h-auto' : 'h-0'">
                    <div class="showtime-container p-4 flex gap-8 border-t border-opacity-10" v-for="showtime in cinema.cartelera" :key="showtime.id">
                        <!-- poster -->
                        <div class="poster hidden md:w-1/6 md:block">
                            <MovieItem
                                :showTitle="false"
                                :showReleaseTag="false"
                                :movie="showtime.pelicula"
                            />
                        </div>
                        
                        <!-- movie -->
                        <div class="showtime-data w-full flex flex-col gap-4 md:w-5/6" v-if="showtime.pelicula">
                            <p class="movie font-bold">{{showtime.pelicula.titulo_local}}</p>
                            <div class="showtimes flex flex-col gap-8">
                                <div class="showtime font-sm flex flex-col gap-2 border-l-2 pl-2" v-for="funciones in showtime.funciones" :key="funciones.id">
                                    <div class="labels flex gap-2">
                                        <!-- language -->
                                        <div class="text-xs px-2 py-1 border border-white rounded-md inline-flex">{{funciones.idioma}}</div>
                                        <!-- format -->
                                        <div class="text-xs px-2 py-1 border border-white rounded-md inline-flex" v-for="(format, index) in funciones.formato" :key="index">{{format}}</div>
                                    </div>
                                    <p>{{funciones.horarios}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- skeleton -->
        <div class="skeleton flex flex-col gap-4" v-if="cinemas.length == 0">
            <div class="cinema w-full bg-white bg-opacity-25 rounded-md h-20 animate-pulse" v-for="index in 6" :key="index">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities"

// Custom Components
import NavBar from "@/components/NavBar.vue"
import Button from "@/components/Button.vue"
import InfoPane from "@/components/InfoPane.vue"
import MovieItem from "@/components/MovieItem.vue"

import { Options, Vue } from "vue-class-component"

@Options({
  name: "Showtimes",
  components:{
      NavBar,
      Button,
      InfoPane,
      MovieItem
  },
  data(){
      return{
          loading: true,
          cinemas: [],
          selectedItem: null,
      }
  },
  async mounted(){
    // scroll to top
    window.scrollTo(0, 0)
    
    //set header
    utilities.setHeader()
    
    //get featured movies
    let cinemas = utilities.getItems("cartelera", "cines?fields=*,cartelera.*.*.*") as any;
    await Promise.resolve(cinemas).then((data) => {
        this.cinemas = data.data
    })
  },
  methods: {
      openItem: function(index:number){
          this.selectedItem = (this.selectedItem == null || this.selectedItem != index) ? index : null
      }
  }
})
export default class Showtimes extends Vue {}
</script>