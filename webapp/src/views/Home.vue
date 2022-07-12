<template name="home">
  <div class="home-page relative">
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
        <Button class="bg-white text-white bg-opacity-25" :iconOnly="true">
          <img src="/assets/icons/movie-ticket.svg" alt="cartelera" class="w-5 h-5">
        </Button>
      </router-link>
    </NavBar>

    <!-- FEATURED -->
    <section class="w-full mb-6 lg:mb-10">
      <div
        class="swiper px-4 lg:px-10"
        ref="featured"
        v-show="featured.length > 0"
      >
        <div class="swiper-wrapper">
          <div
            class="swiper-slide cursor-pointer"
            v-for="item in featured"
            :key="item.id"
          >
            <router-link v-if="item" :to="'/peliculas/'+item.slug">
              <Banner :data="item" />
            </router-link>
          </div>
        </div>

        <!-- Swiper Nav -->
        <div class="swiper-button-prev text-purple-600 left-16 hidden md:block"></div>
        <div class="swiper-button-next text-purple-600 right-16 hidden md:block"></div>
      </div>

      <!-- Skeleton -->
      <div
        v-show="featured.length == 0"
        class="flex gap-2 px-4 animate-pulse lg:px-10"
      >
        <Banner />
      </div>
    </section>

    <!-- NOW PLAYING -->
    <section class="mb-6 lg:mb-10">
      <!-- Section Title -->
      <p
        class="
          px-4
          lg:px-10
          pb-2
          text-white text-lg
          font-bold
          lg:text-2xl lg:pb-6
        "
      >
        En Cartelera
      </p>
      <!-- Swiper -->
      <div
        class="swiper px-4 lg:px-10"
        ref="nowPlaying">
        <div class="swiper-wrapper" v-if="nowPlaying">
          <!-- items -->
          <div
            class="swiper-slide cursor-pointer"
            v-show="nowPlaying.length > 0"
            v-for="item in nowPlaying"
            :key="item.id"
          >
            <router-link v-if="item" :to="'/peliculas/'+item.slug">
              <MovieItem
                :showTitle="true"
                :movie="item"
                :showReleaseTag="false"
              />
            </router-link>
          </div>

          <!-- skeleton -->
          <div
            class="swiper-slide"
            :class="(nowPlaying.length === 0) ? 'block' : 'hidden'"
            v-for="index in 6"
            :key="index"
          >
            <MovieItem
              :showTitle="true"
              :showReleaseTag="false"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon -->
    <section class="mb-6 lg:mb-10">
      <!-- Section Title -->
      <p
        class="
          px-4
          lg:px-10
          pb-2
          text-white text-lg
          font-bold
          lg:text-2xl lg:pb-6
        "
      >
        Próximamente
      </p>
      <!-- Swiper -->
      <div class="swiper px-4 lg:px-10" ref="comingSoon">
        <div class="swiper-wrapper">
          <!-- items -->
          <div
            class="swiper-slide cursor-pointer"
            v-for="item in comingSoon"
            :key="item.id"
          >
            <router-link v-if="item" :to="'/peliculas/'+item.slug">
              <MovieItem
                :showTitle="true"
                :showDateTag="true"
                :movie="item"
              />
            </router-link>
          </div>
          <!-- skeleton -->
          <div
            class="swiper-slide"
            :class="(comingSoon.length === 0) ? 'block' : 'hidden'"
            v-for="index in 9"
            :key="index"
          >
            <MovieItem
              :showTitle="true"
              :showReleaseTag="false"
            />
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </section>

    <!-- News -->
    <section>
      <!-- Section Title -->
      <p
        class="
          px-4
          lg:px-10
          pb-2
          text-white text-lg
          font-bold
          lg:text-2xl lg:pb-6
        "
      >
        Noticias
      </p>
      <!-- Swiper -->
      <div class="swiper px-4 lg:px-10" ref="news">
        <div class="swiper-wrapper">
          <!-- items -->
          <div
            class="swiper-slide cursor-pointer"
            v-for="item in news"
            :key="item.id"
          >
            <router-link v-if="item" :to="'/noticias/'+item.slug">
              <NewsItem
                :item="item"
                class="mb-2"
              />
            </router-link>
          </div>
          <!-- skeleton -->
          <div
            class="swiper-slide"
            :class="(news.length === 0) ? 'block' : 'hidden'"
            v-for="index in 8"
            :key="index"
          >
            <NewsItem
                class="mb-2"
              />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities";

// Swiper
import { Swiper, Navigation, Autoplay } from "swiper";
Swiper.use([Navigation, Autoplay]);
import "swiper/swiper-bundle.css";

// Custom Components
import NavBar from "@/components/NavBar.vue";
import Banner from "@/components/Banner.vue";
import Card from "@/components/Card.vue";
import MovieItem from "@/components/MovieItem.vue";
import NewsItem from "@/components/NewsItem.vue";
import Button from "@/components/Button.vue";
import InfoPane from "@/components/InfoPane.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    NavBar,
    Banner,
    Card,
    MovieItem,
    NewsItem,
    Button,
    InfoPane
  },
  data() {
    return {
      featured: [],
      nowPlaying: [],
      comingSoon: [],
      news: [],
      selectedItem: [],
    };
  },
  mounted() {
    //scrollto top
    window.scrollTo(0, 0);

    //set header
    utilities.setHeader();

    //create featured swiper
    const featuredOpts = {
      centeredSlides: true,
      spaceBetween: 8,
      loop: true,
      loopAdditionalSlides: 2,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true
      },
      breakpoints: {
        768: {
          spaceBetween: 16,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };

    //create now playing swiper
    const nowPlayingOpts = {
      slidesPerView: 2,
      centeredSlides: false,
      spaceBetween: 8,
      resistanceRatio: 0.75,
      speed: 300,
      grabCursor: true,
      longSwipes: true,
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
    };

    new Swiper(this.$refs.nowPlaying as any, nowPlayingOpts);

    //create coming soon swiper
    const comingSoonOpts = {
      slidesPerView: 3,
      spaceBetween: 8,
      speed: 300,
      resistanceRatio: 0.75,
      grabCursor: true,
      longSwipes: true,
      breakpoints: {
        768: {
          slidesPerView: 6,
          spaceBetween: 16,
        },
      },
    };

    new Swiper(this.$refs.comingSoon as any, comingSoonOpts);

    //create news swiper
    const newsOpts = {
      slidesPerView: 2,
      spaceBetween: 8,
      speed: 300,
      resistanceRatio: 0.75,
      grabCursor: true,
      longSwipes: true,
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 16,
        },
      },
    };

    new Swiper(this.$refs.news as any, newsOpts);

    //get thu
    const thisThu = utilities.getThu();

    //get featured movies
    let featured = utilities.getItems(
      "peliculas",
      "peliculas_destacadas?fields=peliculas_id.*.*.*"
    ) as any;
    Promise.resolve(featured).then((data) => {
      data.data.forEach((item: any) => {
        item.peliculas_id.titulo = (item.peliculas_id.titulo_local) ? item.peliculas_id.titulo_local : item.peliculas_id.titulo_original
        this.featured.push(item.peliculas_id);
      });

      setTimeout(() => {
        new Swiper(this.$refs.featured as any, featuredOpts);
      }, 1);
    });

    //get now playing movies
    let nowPlaying = utilities.getItems(
      "peliculas",
      "peliculas?fields=*,poster.*&filter[funciones][nnull]&filter[fecha_local][lte]=" +
        thisThu +
        "&sort=-fecha_local"
    );
    Promise.resolve(nowPlaying).then((data) => {
      this.nowPlaying = data.data;
      setTimeout(() => {
        new Swiper(this.$refs.featured as any, featuredOpts);
      }, 1);
    });

    //get coming soon movies
    let comingSoon = utilities.getItems(
      "peliculas",
      "peliculas?fields=*,poster.*&filter[fecha_local][gt]=" +
        thisThu +
        "&sort=fecha_local&limit=9"
    );
    Promise.resolve(comingSoon).then((data) => {
      this.comingSoon = data.data;
      this.comingSoon.forEach((item: any, index: number) => {
        this.comingSoon[index].fecha_local = utilities.getFormatedDate(
          item.fecha_local
        );
      });
    });

    //get news
    let news = utilities.getItems(
      "noticias",
      "noticias?fields=*,portada.*&limit=8&sort=-id"
    ) as any;
    Promise.resolve(news).then((data) => {
      this.news = data.data;
    });
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
.main {
  top: 36em;
}
</style>
