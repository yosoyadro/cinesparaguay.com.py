<template>
  <div ref="root">
    <NavBar v-if="!standalone">
      <!-- mobile menu -->
      <SideBar v-if="!this.standalone && menuOptions" :menuOptions="menuOptions" class="lg:hidden"/>
        
      <!-- logo -->
      <router-link to="/">
        <img src="/img/logo.svg" alt="Logo" class="h-4">
      </router-link>

      <!-- menu -->
      <div class="left-menu h-full items-center text-white text-sm font-semibold hidden lg:flex">
        <router-link v-for="(item, index) in menuOptions" :key="index" :to="item.link" class="h-full px-4 flex gap-2 items-center hover:bg-white hover:bg-opacity-5">
          <img name="icon" :src="item.icon" class="w-4 h-4">
          <p>{{item.label}}</p>
        </router-link>
      </div>

      <!-- showtimes -->
      <router-link to="/cartelera">
        <!-- desktop version -->
        <Button class="bg-white text-white bg-opacity-25 hidden lg:flex">
          <img src="/assets/icons/movie-ticket.svg" alt="cartelera" class="w-5 h-5">
          <p class="hidden lg:block">Cartelera</p>
        </Button>

        <!-- mobile version -->
        <Button class="bg-white text-white bg-opacity-25 lg:hidden" :iconOnly="true">
          <img src="/assets/icons/movie-ticket.svg" alt="cartelera" class="w-5 h-5">
          <p class="hidden lg:block">Cartelera</p>
        </Button>
      </router-link>
    </NavBar>

    <main
      class="
        min-h-screen
        pt-16
        lg:pb-10
      "
      :class="this.standalone ? 'pb-14' : 'pb-4'">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>

    </main>

    <!-- tabbar -->
    <TabBar v-show="this.standalone"/>

    <!-- FOOTER -->
    <section class="footer bg-black p-10 flex flex-col gap-8 items-center justify-center" v-show="!this.standalone">
      <!-- logo -->
      <img src="/img/logo.svg" alt="Logo" class="h-4 opacity-25">
      <!-- social -->
      <div class="social flex gap-4 opacity-25">
        <a v-if="home.twitter_link" :href="home.twitter_link" target="blank">
          <img class="w-5 h-5" src="/assets/icons/twitter-brands.svg" alt="instagram">
        </a>
        <a v-if="home.facebook_link" :href="home.facebook_link" target="blank">
          <img class="w-5 h-5" src="/assets/icons/facebook-f-brands.svg" alt="facebook">
        </a>
        <a v-if="home.instagram_link" :href="home.instagram_link" target="blank">
          <img class="w-5 h-5" src="/assets/icons/instagram-brands.svg" alt="twitter">
        </a>
      </div>

      <div class="developer flex flex-col text-center text-white opacity-25">
          <span class="text-xs">Desarrollada por</span>
          <a href="https://adro.studio" class="text-xl">adro.studio</a>
      </div>
    </section>

    <PopUpBanner v-if="home.banner" :image="home.banner.data.full_url"/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Utils
import utilities from "./utilities";

// custom components
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
import Button from '@/components/Button.vue'
import SideBar from '@/components/SideBar.vue'
import PopUpBanner from '@/components/PopUpBanner.vue'

export default defineComponent({
  name: 'Inicio',
  components:{
    NavBar,
    TabBar,
    Button,
    SideBar,
    PopUpBanner
  },
  data(){
    return{
      home: [],
      menuOptions:[
        {
          label: "Inicio",
          icon: "/assets/icons/home.svg",
          link: "/inicio"
        },
        {
          label: "Próximamente",
          icon: "/assets/icons/albums-outline.svg",
          link: "/proximamente"
        },
        {
          label: "Noticias",
          icon: "/assets/icons/chatbubble-ellipses-outline.svg",
          link: "/noticias"
        },
        {
          label: "Buscar",
          icon: "/assets/icons/search-outline.svg",
          link: "buscar"
        }
      ]
    }
  },
  mounted() {
    let home = utilities.getItems('home', 'home?fields=*,banner.*.*') as any;
    Promise.resolve(home).then((data) => {
        this.home = data.data[0]
    })
  }
})
</script>

<style>
*{
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
}

/*-- Transition --*/
.fade-enter-active, .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
  position: absolute;
  width: 100%;
  left: 0;
}

/*-- Content --*/
.content p{
    margin-bottom: 16px;
}

.content img{
    max-width: 100%;
    height: auto;
    margin: 0 auto;
}

.content p iframe {
    display: block;
    margin: 0 auto;
    max-width: 100% !important;
}


.fade-enter-active{
  animation: enter .3s linear;
}

.fade-leave-active{
  opacity: 0;
}

@keyframes enter {
  0% {
    opacity: 0;
    padding-top: 64px;
  }
  50% {
    opacity: 0;
    padding-top: 64px;
  }
  100% {
    opacity: 100;
    padding-top: 0px;
  }
}

@keyframes leave {
  0% {
    opacity: 100;
  }
  100% {
    opacity: 0;
    }
}


/*-- cupertino pane --*/
.pane{
  overflow: hidden;
  background: #212121 !important;
  padding-top: 0 !important;
  max-width: 850px !important;
}

.pane [name="card"]{
  position: sticky;
  top: 0;
}

.pane p{
  margin-bottom: 1rem;
}
</style>

