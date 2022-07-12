<template>
    <div class="page relative px-4 lg:px-10 text-white">
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

        <!-- main image -->
        <div class="main-image relative w-full">
            <Banner v-if="item" :data="item" :showText="false" :showButton="false"/>
            <div class="video-player">
                <!-- play icon -->
                <img v-if="item.trailer && item.trailer != ''" class="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" src="/assets/icons/play.svg" alt="play" @click="playVideo(item.trailer)">
                <!-- player -->
                <div class="player fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-10 flex items-center justify-center transition" v-show="videoId !== ''" :class="(videoId !== '') ? 'opacity-100' : 'opacity-0'">
                    <div class="video-container relative w-full bg-black md:w-3/4">
                        <div class="player-header relative p-4 flex justify-between border-b border-gray-800">
                            <p>{{item.titulo}}</p>
                            <img src="/assets/icons/close-outline.svg" alt="cerrar" class="cursor-pointer w-6 h-6" @click="stopVideo()">
                        </div>
                        <div ref="youtube" class="video-body relative w-full" style="padding-top: 56.25%;">
                            <!--YoutubeVue3 ref="youtube" class="w-full h-full position absolute top-0 left-0" :videoid="videoId" controls="1" /-->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DESKTOP -->
        <div class="desktop hidden md:block">
            <div class="movie relative w-full grid grid-cols-4 gap-8 p-8 -mt-44">
                <!-- poster -->
                <div class="poster">
                    <MovieItem
                        :showTitle="false"
                        :showReleaseTag="false"
                        :movie="item"
                    />
                </div>

                <div class="data col-span-3">
                    <!-- head -->
                    <div class="flex flex-col gap-4 mb-8">
                        <p class="title text-4xl font-bold truncate overflow-ellipsis" v-if="item.titulo">{{item.titulo}}</p>
                        <p class="title truncate overflow-ellipsis" v-if="item.titulo_original">{{item.titulo_original}}</p>

                        <div class="flex justify-between mb-4 text-xs">
                            <!-- runtime / rating -->
                            <div class="runtime-rating flex gap-2 font-light">
                                <span class="text-sm" v-if="item.duracion">{{item.duracion}}</span>
                                <span class="text-sm" v-if="item.calificacion">/</span>
                                <span class="text-sm" v-if="item.calificacion">{{item.calificacion}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- body -->
                    <div class="flex flex-col gap-4">
                        <!-- sinopsis -->
                        <div class="sinopsis flex gap-4" v-if="item.sinopsis" v-html="item.sinopsis"></div>
                        
                        <!-- cast -->
                        <div class="cast" v-if="item.elenco">
                            <span class="text-sm font-bold block">Elenco</span>
                            <span>{{item.elenco}}</span>
                        </div>
                        
                        <!-- director -->
                        <div class="director" v-if="item.dirigida_por">
                            <span class="text-sm font-bold block">Dirigida por</span>
                            <span>{{item.dirigida_por}}</span>
                        </div>
                        
                        <!-- distributor -->
                        <div class="distributor" v-if="item.distribuidora">
                            <span class="text-sm font-bold block">Distribuidora</span>
                            <span>{{item.distribuidora.nombre}}</span>
                        </div>

                        <!-- genres -->
                        <div class="genres mb-4" v-if="item.genero">
                            <span class="text-sm font-bold block mb-1">Géneros</span>
                            <div class="genres-container flex gap-2">
                                <div class="text-xs px-2 py-1 border border-white rounded-md inline-flex" v-for="(genero,index) in item.genero" :key="index">{{genero.generos_id.nombre}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section Title -->
            <div class="show" v-if="cinemas.length > 0">
                <p v-if="!this.standalone" class="pb-2 text-white text-lg font-bold lg:text-2xl lg:px-10 lg:pt-6 lg:pb-6">
                    Funciones
                </p>

                <!-- items -->
                <div class="items flex flex-col gap-4 lg:px-10" v-if="cinemas.length > 0">
                    <div class="cinema w-full text-white bg-white bg-opacity-25 rounded-md" v-for="(cinema,index) in cinemas" :key="index">
                        <!-- header -->
                        <div class="cinema-header p-4 cursor-pointer" @click="openItem(index)">
                            <p class="font-bold">{{cinema.nombre}}</p>
                            <p class="text-sm">{{cinema.direccion}}</p>
                        </div>
                        <!-- body -->
                        <div class="cinema-body overflow-hidden" :class="(selectedItem == index) ? 'h-auto' : 'h-0'">
                            <div class="showtime-data p-4 flex flex-col gap-4 border-t border-opacity-10" v-for="showtime in cinema.cartelera" :key="showtime.id">
                                <!-- movie -->
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

                <!-- skeleton -->
                <div class="skeleton flex flex-col gap-4 lg:px-10" v-if="cinemas.length == 0">
                    <div class="cinema w-full bg-white bg-opacity-25 rounded-md h-20 animate-pulse" v-for="index in 6" :key="index">
                    </div>
                </div>
            </div>
        </div>

        <!-- MOBILE -->
        <div class="mobile md:hidden">
            <!-- tab bar -->
            <div class="tabs w-full flex font-semibold mb-4">
                <span class="tab w-1/2 text-xs text-center py-4 border-b cursor-pointer" :class="(tab != 'info') ? 'border-gray-500 text-gray-500' : null" @click="setTab('info')">INFORMACIÓN</span>
                <span class="tab w-1/2 text-xs text-center py-4 border-b cursor-pointer" :class="(tab != 'showtimes') ? 'border-gray-500 text-gray-500' : null" @click="setTab('showtimes')">FUNCIONES</span>
            </div>

            <!-- TAB 1 -->
            <div class="tab-content flex flex-col gap-4" v-show="tab == 'info'">
                <div class="movie-header flex gap-4 items-center mb-4">
                    <!-- poster -->
                    <div class="poster w-1/3">
                        <MovieItem
                            :showTitle="false"
                            :showReleaseTag="false"
                            :movie="item"
                        />
                    </div>
                    <!-- text -->
                    <div class="text w-2/3 flex flex-col gap-4">
                        <!-- local title -->
                        <p class="title text-2xl font-bold truncate overflow-ellipsis" v-if="item.titulo">{{item.titulo}}</p>
                        <!-- original title -->
                        <p class="title truncate overflow-ellipsis" v-if="item.titulo_original">{{item.titulo_original}}</p>
                        <!-- runtime / rating -->
                        <div class="runtime-rating flex gap-2 font-light">
                            <span class="text-sm" v-if="item.duracion">{{item.duracion}}</span>
                            <span class="text-sm" v-if="item.calificacion">/</span>
                            <span class="text-sm" v-if="item.calificacion">{{item.calificacion}}</span>
                        </div>
                        <!-- genres -->
                        <div class="genres mb-4 flex gap-4" v-if="item.genero">
                            <div class="text-xs px-2 py-1 border border-white rounded-md inline-flex" v-for="(genero,index) in item.genero" :key="index">{{genero.generos_id.nombre}}</div>
                        </div>
                    </div>
                </div>
            
                <!-- sinopsis -->
                <div class="sinopsis mb-4" v-if="item.sinopsis" v-html="item.sinopsis"></div>
                <!-- cast -->
                <div class="cast mb-4">
                    <span class="text-sm font-bold block" v-if="item.elenco">Elenco</span>
                    <span>{{item.elenco}}</span>
                </div>
                <!-- director -->
                <div class="director mb-4" v-if="item.dirigida_por">
                    <span class="text-sm font-bold block">Dirigida por</span>
                    <span>{{item.dirigida_por}}</span>
                </div>
                <!-- distributor -->
                <div class="distributor" v-if="item.distribuidora">
                    <span class="text-sm font-bold block">Distribuidora</span>
                    <span>{{item.distribuidora.nombre}}</span>
                </div>
            </div>

            <!-- TAB 2 -->
            <div class="tab-content flex flex-col gap-4" v-show="tab == 'showtimes'">
                <!-- items -->
                <div class="items flex flex-col gap-4 lg:px-10" v-if="cinemas.length > 0">
                    <div class="cinema w-full text-white bg-white bg-opacity-25 rounded-md" v-for="(cinema,index) in cinemas" :key="index">
                        <!-- header -->
                        <div class="cinema-header p-4 cursor-pointer" @click="openItem(index)">
                            <p class="font-bold">{{cinema.nombre}}</p>
                            <p class="text-sm">{{cinema.direccion}}</p>
                        </div>
                        <!-- body -->
                        <div class="cinema-body overflow-hidden" :class="(selectedItem == index) ? 'h-auto' : 'h-0'">
                            <div class="showtime-data p-4 flex flex-col gap-4 border-t border-opacity-10" v-for="showtime in cinema.cartelera" :key="showtime.id">
                                <!-- movie -->
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

                <div v-else class="no-items py-16 flex flex-col gap-4 items-center justify-center">
                    <img src="/assets/icons/face-sad-tear-regular.svg" alt="sad" class="w-16">
                    <p class="font-bold">No hay funciones para esta película</p>
                </div>

                <!-- skeleton -->
                <!--div class="skeleton flex flex-col gap-4 lg:px-10" v-if="cinemas.length == 0">
                    <div class="cinema w-full bg-white bg-opacity-25 rounded-md h-20 animate-pulse" v-for="index in 6" :key="index">
                    </div>
                </div-->
            </div>

        </div>
    </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities"

// custom components
import Banner from "@/components/Banner.vue"
import MovieItem from "@/components/MovieItem.vue"
import NavBar from "@/components/NavBar.vue"
import Button from "@/components/Button.vue"
import InfoPane from "@/components/InfoPane.vue"

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Película',
    components: {
        Banner,
        MovieItem,
        NavBar,
        Button,
        InfoPane
    },
    data(){
        return{
            tab: 'info',
            item: [] as any[any],
            cinemas: [],
            videoId: '',
            selectedItem: null,
        }
    },
    mounted() {
        //scrollto top
        window.scrollTo(0, 0)

        // get slug
        const slug = this.$route.params.slug

        // get item
        let item = utilities.getItems('peliculas', 'peliculas?fields=*.*.*&filter[slug][eq]='+slug) as any;
        Promise.resolve(item).then((data: any[any]) => {
            this.item = data.data[0]

            console.log(this.item)

            //get showtimes
            let showtimes = utilities.getItems('peliculas', 'cines?fields=*,cartelera.*.*&filter[cartelera.pelicula.id][eq]='+data.data[0].id) as any;
            Promise.resolve(showtimes).then((data) => {
                let cinemas:any[any] = data.data
    
                cinemas.forEach( (cinema: any[any], cinemaIndex: number) => {
                    showtimes = []
                    
                    cinema.cartelera.forEach( (showtime: any[any]) => {
                        if(showtime.pelicula && showtime.pelicula.id == this.item.id){
                            showtimes.push(showtime)
                        }
                    })

                    data.data[cinemaIndex].cartelera = showtimes
                });

                this.cinemas = data.data
            })

            //set header
            utilities.setHeader('peliculas', this.item)
        })
    },
    methods: {
        playVideo (url: string){
            let link = new URL(url);
            const domain = link.hostname;

            let id

            if(domain == 'youtu.be'){
                id= link.pathname.replace('/', '')
            }else{
                id= link.searchParams.get("v")
            }

            this.videoId =  id as string

            (this.$refs.youtube as HTMLElement).innerHTML = '<iframe width="560" height="315" class="youtube w-full h-full position absolute top-0 left-0" src="https://www.youtube.com/embed/'+this.videoId+'?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        },
        stopVideo (){
                        (this.$refs.youtube as HTMLElement).innerHTML = ''
            this.videoId = ''
        },
        openItem (index:number){
            this.selectedItem = (this.selectedItem == null || this.selectedItem != index) ? index : null as any
        },
        setTab(tabName: string){
            this.tab = tabName
        }
    }
})
</script>
