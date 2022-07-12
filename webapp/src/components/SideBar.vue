<template>
    <div class="sidebar">
        <!-- button -->
        <Button class="bg-white bg-opacity-25" :iconOnly="true" @click="toggleSidebar()">
          <img src="/assets/icons/menu-outline.svg" alt="menu" class="w-5 h-6">
        </Button>
        <!-- backdrop -->
        <div class="backdrop fixed h-full w-full top-0 left-0 bg-black bg-opacity-80 ease-linear duration-100" :class="(open) ? 'block' : 'hidden'" @click="toggleSidebar()" />
        <!-- sidebar -->
        <div class="sidebar fixed top-0 w-3/4 h-full bg-purple-900 flex flex-col rounded-r-3xl text-white ease-linear duration-100 z-20 md:w-1/3 lg:w-1/4" :class="(open) ? 'left-0' : '-left-3/4'">
            <div class="menu-header p-4 flex items-center justify-between">
                <img src="/img/logo.svg" alt="logo" class="h-4">
                <img src="/assets/icons/circle-xmark-regular.svg" class="close-button w-6 cursor-pointer" @click="()=>{this.open = false}">
            </div>
            <div class="menu px-4 overflow-auto">
                <router-link :to="menuOption.link" v-for="(menuOption, index) in menuOptions" :key="index" @click="toggleSidebar()">
                    <div class="menu-option flex gap-4 items-center cursor-pointer">
                        <div class="icon w-4 h-4 bg-white" :style="'-webkit-mask-image: url('+menuOption.icon+'); -webkit-mask-repeat: no-repeat; -webkit-mask-position: center;'"></div>
                        <p class="py-4">{{menuOption.label}}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/Button.vue'

export default defineComponent({
    name: "SideBar",
    components: {
        Button
    },
    data(){
        return{
            open: false
        }
    },
    props:{
        menuOptions:{
            type: Array
        }
    },
    methods:{
        toggleSidebar: function(){
            this.open = !this.open
        }
    }
    
})
</script>
