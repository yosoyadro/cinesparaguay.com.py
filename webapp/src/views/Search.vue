<template>
  <div class="page-search relative px-4 mb-4 md:px-10 overflow-x-hidden">
    <!-- standalone navbar -->
    <NavBar v-if="standalone">  
      <input
      type="text"
      name="searchInput"
      ref="searchInput"
      placeholder="Ingrese título"
      class="
          w-full
          h-9
          rounded-lg
          p-2
          text-white
          bg-white
          bg-opacity-25"
      @input="searchItems($event.target.value)"
      />
  
      <div ref="menu">
        <div
            ref="clearSearch"
            @click="clearSearch()"
            class="w-9
                h-9 
                bg-white
                bg-opacity-25
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
            "
            >
              <img src="/assets/icons/close-outline.svg" alt="account" class="w-5 h-5">
          </div>
      </div>
    </NavBar>

    <div class="search-head mt-1" v-if="!standalone">
      <input
        type="text"
        name="searchInput"
        ref="searchInput"
        placeholder="Ingrese título"
        class="w-full h-9 rounded-lg p-2"
        @input="searchItems($event.target.value)"
      />
    </div>

    <!-- Section Title -->
    <p class="py-2 text-white text-lg font-bold lg:text-2xl lg:py-6">
      {{sectionTitle}}
    </p>

    <!-- items -->
    <div ref="searchBody" v-if="movies.length > 0" class="search-body grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-4">
      <router-link
        v-for="item in movies"
        :key="item.id"
        :to="'/peliculas/'+item.slug"
      >
        <SearchItem :movie="item"/>
      </router-link>
    </div>

    <!-- skeleton -->
    <div ref="searchBody" v-else class="search-body grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-4">
      <SearchItem
        v-for="index in 8"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities";

// Custom Components
import NavBar from "@/components/NavBar.vue";
import SearchItem from "@/components/SearchItem.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  name: "Search",
  components: {
    NavBar,
    SearchItem,
  },
  data() {
    return {
      sectionTitle: 'Lo Más Buscado',
      movies: [],
    };
  },
  mounted() {
    //scrollto top
    window.scrollTo(0, 0);

    //set header
    utilities.setHeader()

    //focus search input
    this.$refs.searchInput.focus()

    this.$refs.searchInput.addEventListener('focus', ()=>{
      window.scrollTo(0, 0)
    })

    document.addEventListener('touchstart', () => {
      this.$refs.searchInput.blur()
    })
  },
  created(){
    //get most visited items
    let movies = Promise;
    movies = utilities.getItems(
      "peliculas",
      "peliculas?fields=*.*.*&limit=8&order=-visualizaciones"
    ) as any;
    Promise.resolve(movies).then((data: any[any]) => {
      this.movies = data.data
      this.mostVisited = data.data
    });
  },
  methods: {
    searchItems: async function (query: string) {
      if (query.length > 0) {
        const items = utilities.getItems(
          "peliculas",
          "peliculas?fields=*.*.*&limit=6&q=" + query
        );

        Promise.resolve(items).then( (data)=>{
          this.movies = data.data
          this.sectionTitle = "Resultado de la búsqueda";
        })
      }
    },
    clearSearch(){
      this.$refs.searchInput.value = ''
      this.movies = this.mostVisited
      this.sectionTitle = "Lo más buscado"
    }
  },
})
export default class Search extends Vue {}
</script>
