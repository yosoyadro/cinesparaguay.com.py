<template>
  <div class="comingSoon-page relative mb-4">
    <!-- standalone navbar -->
    <NavBar v-if="standalone">
      <p class="text-white text-lg font-extrabold lg:text-2xl">Próximamente</p>
      <div ref="menu">
        <div
          ref="button"
          class="
            w-9
            h-9
            bg-white
            bg-opacity-25
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          <img src="/assets/icons/filter-outline.svg" alt="account" class="w-5 h-5">
        </div>
      </div>
    </NavBar>

    <!-- Section Title -->
    <p v-if="!this.standalone" class="px-4 pb-2 text-white text-lg font-bold lg:text-2xl lg:px-10 lg:pt-6 lg:pb-6">
      Próximamente
    </p>

    <!-- Items -->
    <div class="grid grid-cols-3 gap-x-2 gap-y-4 px-4 lg:px-10 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-6" v-if="comingSoon.length > 0">
      <router-link class="item" v-for="item in comingSoon" :key="item.id" :to="'/peliculas/'+item.slug">
        <MovieItem
          :key="item.id"
          :movie="item"
          :showTitle="true"
          :showDateTag="true"
        />
      </router-link>
    </div>

    <!-- Skeleton -->
    <div v-if="comingSoon.length === 0" class="grid grid-cols-3 gap-x-2 gap-y-4 px-4 lg:px-10 lg:mb-10 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-6">
      <div class="skeleton" v-for="index in 18" :key="index">
        <MovieItem
          :showTitle="true"
          :showDateTag="true"
        />
      </div>
    </div>

    <!-- Load More -->
    <div v-if="loadMoreStatus" class="loadMore flex justify-center pt-16 pb-8">
      <!-- Load More -->
      <Button v-if="!isLoadingMore" @click="loadMore()">Cargar Más</Button>
      <!-- Loading More -->
      <Button v-else>
        <div class="dot-pulse">
          <div class="dot-pulse__dot"></div>
        </div>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities";

// Custom Components
import NavBar from "@/components/NavBar.vue";
import MovieItem from "@/components/MovieItem.vue";
import Button from "@/components/Button.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  name: "ComingSoon",
  components: {
    NavBar,
    MovieItem,
    Button
  },
  data() {
    return {
      comingSoon: [],
      page: 1,
      loadMoreStatus: false,
      isLoadingMore: false
    }
  },
  mounted() {
    //scrollto top
    window.scrollTo(0, 0);

    //set header
    utilities.setHeader()
  },
  created(){
    this.loadMore()
  },
  methods:{
    loadMore(){
      //set is loading more flag
      this.isLoadingMore = true

      //get thu
      const thisThu = utilities.getThu()

      //get coming soon movies
      let comingSoon = utilities.getItems("peliculas", "peliculas?fields=*,poster.*&filter[fecha_local][gt]="+thisThu+"&sort=fecha_local&limit=18&meta=total_count,result_count,filter_count&page="+this.page) as any;
      Promise.resolve(comingSoon).then((data) => {
        //get formatted date
        data.data.forEach((item: any, index: number) => {
          data.data[index].fecha_local = utilities.getFormatedDate(item.fecha_local)
          this.comingSoon.push(item)
        })

        //check if more to load
        if(data.meta.filter_count > this.comingSoon.length){
          this.page++
          this.loadMoreStatus = true
        }else{
          this.loadMoreStatus = false
        }

        //unset is loading more flag
        this.isLoadingMore = false
      });
    }
  }
})
export default class ComingSoon extends Vue {}
</script>

<style scoped>
.dot-pulse {
  --uib-size: 40px;
  --uib-speed: 1.3s;
  --uib-color: #4c1d95;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: var(--uib-size);
  height: calc(var(--uib-size) * 0.27);
}

.dot-pulse__dot,
.dot-pulse::before,
.dot-pulse::after {
  content: '';
  display: block;
  height: calc(var(--uib-size) * 0.18);
  width: calc(var(--uib-size) * 0.18);
  border-radius: 50%;
  background-color: var(--uib-color);
  transform: scale(0);
}

.dot-pulse::before {
  animation: pulse var(--uib-speed) ease-in-out infinite;
}

.dot-pulse__dot {
  animation: pulse var(--uib-speed) ease-in-out
    calc(var(--uib-speed) * 0.125) infinite both;
}

.dot-pulse::after {
  animation: pulse var(--uib-speed) ease-in-out
    calc(var(--uib-speed) * 0.25) infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.5);
  }
}
</style>
