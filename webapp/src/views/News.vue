<template name="news">
  <div class="news-page relative">
    <!-- standalone navbar -->
    <NavBar v-if="standalone">
      <p class="text-white text-lg font-extrabold lg:text-2xl">Noticias</p>
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
      Noticias
    </p>

    <!-- Section Content -->
    <section class="grid grid-cols-2 gap-2 px-4 cursor-pointer lg:px-10 lg:grid-cols-4 lg:gap-4">
      <router-link v-show="news.length > 0" v-for="item in news" :key="item.id" :to="'/noticias/'+item.slug">
        <NewsItem class="mb-2" :item="item"/>
      </router-link >
      <NewsItem v-show="news.length == 0" v-for="index in 12" :key="index" class="mb-2" />
    </section>

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
import NavBar from "@/components/NavBar.vue"
import NewsItem from "@/components/NewsItem.vue"
import Button from "@/components/Button.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  name: "News",
  components: {
    NavBar,
    NewsItem,
    Button
  },
  data() {
    return {
      news: [],
      page: 1,
      loadMoreStatus: false,
      isLoadingMore: false
    }
  },
  mounted() {
    //scrollto top
    window.scrollTo(0, 0)

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

      //get news
      let news = utilities.getItems("noticias", "noticias?fields=*,portada.*&limit=8&sort=-id&meta=total_count,result_count,filter_count&page="+this.page) as any;
      Promise.resolve(news).then((data) => {
        //push items
        data.data.forEach((item: any[any]) => {
          //data.data[index].fecha_local = utilities.getFormatedDate(item.fecha_local)
          this.news.push(item)
        })
        
        //check if more to load
        if(data.meta.filter_count > this.news.length){
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
export default class News extends Vue {}
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
