<template>
    <div class="page px-4 lg:px-10 text-white">
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
        <div class="main-image w-full mb-4 md:mb-8">
            <Banner v-if="item" :data="item" :showButton="false"/>
        </div>

        <!-- content -->
        <div class="content w-full mx-auto md:w-3/4">
            <div class="text" v-html="item.contenido"></div>
        </div>
    </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities";

// custom components
import Banner from "@/components/Banner.vue";
import NavBar from "@/components/NavBar.vue";
import Button from "@/components/Button.vue";
import InfoPane from "@/components/InfoPane.vue"

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Noticia',
    components: {
        Banner,
        NavBar,
        Button,
        InfoPane
    },
    data(){
        return{
            item: []
        }
    },
    mounted() {
        const slug = this.$route.params.slug

        let newsItem = utilities.getItems('noticias', 'noticias?fields=*.*.*&filter[slug][eq]='+slug) as any;
        Promise.resolve(newsItem).then((data: any[any]) => {
            this.item = data.data[0]

            //set header
            utilities.setHeader('noticias', this.item)
        })
    },
})
</script>
