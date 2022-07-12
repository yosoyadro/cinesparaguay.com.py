<template>
    <!-- button -->
    <img src="/assets/icons/info-solid.svg" alt="cartelera" class="w-5 h-5" @click="openPane()">

    <!-- cupertino -->
    <div class="cupertino-container h-0 w-0 fixed overflow-hidden">
        <div class="cupertino-pane">
            <div class="content text-white flex flex-col gap-8 items-center justify-center pt-16 pb-8 opacity-50">
                <!-- logo -->
                <img src="/img/logo.svg" alt="Logo" class="h-4">
                <!-- social -->
                <div class="social flex gap-4">
                    <a v-if="home.twitter_link" :href="home.twitter_link" target="blank">
                        <div class="w-6 h-6 bg-white" :style="'-webkit-mask-image: url(/assets/icons/twitter-brands.svg);'"></div>
                    </a>
                    <a v-if="home.facebook_link" :href="home.facebook_link" target="blank">
                        <div class="icon w-6 h-6 bg-white" :style="'-webkit-mask-image: url(/assets/icons/facebook-f-brands.svg);'"></div>
                    </a>
                    <a v-if="home.instagram_link" :href="home.instagram_link" target="blank">
                        <div class="icon w-6 h-6 bg-white" :style="'-webkit-mask-image: url(/assets/icons/instagram-brands.svg);'"></div>
                    </a>
                </div>
                <span>Version {{ appVersion }}</span>
                <div class="developer flex flex-col text-center">
                    <span class="text-xs">Desarrollada por</span>
                    <a href="https://adro.studio" class="text-xl">adro.studio</a>
                </div>
            </div>   
        </div>
    </div>
</template>

<script lang="ts">
// Utils
import utilities from "../utilities";

// cupertino pane
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane'

import { Options, Vue } from "vue-class-component";

@Options({
    name: 'InfoPane',
    data(){
        return{
            appVersion: null,
            infoPane: null,
            home: [] as any[any]
        } 
    },
    mounted() {
        // get app verion
        this.appVersion = process.env.VUE_APP_VERSION

        // get home config
        let home = utilities.getItems('home', 'home?fields=*') as any
        Promise.resolve(home).then((data) => {
            this.home = data.data[0]
            this.initCupertino()
        })
    },
    methods:{
        initCupertino(){
            const cupertinoSettings: CupertinoSettings = { 
                parentElement: 'body',
                fitHeight: true,
                initialBreak: 'bottom',
                backdrop: true,
                animationType: 'ease',
                bottomClose: true,
                buttonDestroy: true,
                showDraggable: false,
                /*breaks: {
                middle: {
                    enabled: false
                },
                bottom: {
                    enabled: true,
                    height: 80
                }
                },*/
                //dragBy: ['.draggable']
            }
        
            this.infoPane = new CupertinoPane('.cupertino-pane', cupertinoSettings)
        },
        openPane(){
            this.infoPane.present({animate: true});
        }
    }
})
export default class InfoPane extends Vue {}
</script>

<style scoped>
.icon{
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>
