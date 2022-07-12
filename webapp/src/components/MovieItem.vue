<template>
	<!-- movie -->
	<div v-if="movie" class="movieItem">
		<div class="poster relative bg-white bg-opacity-25 rounded-md" :style="movie.poster ? { backgroundImage: 'url(' + movie.poster.data.thumbnails[5].url+ ')' } : null">
			<div v-if="movie.estreno" class="estreno absolute top-0 left-0 bg-yellow-500 px-2 pt-1 pb-3 text-lg text-black font-bold lg:px-4 lg:pt-2 lg:pb-5 lg:text-xl">E</div>
		</div>
		<p v-if="showTitle" class="text-white truncate font-semibold text-sm mt-2 opacity-75 lg:text-lg">{{ movie.titulo_local }}</p>
		<p v-if="showDateTag" class="date-tag text-white capitalize text-xs mt-2 opacity-50 lg:text-md">{{movie.fecha_local}}</p>
		<div v-if="showReleaseTag && movie.estreno" class="text-xs px-2 py-1 border border-white rounded-md text-white w-max mt-2 mb-1">Estreno</div>
	</div>

	<!-- skeleton -->
	<div v-else class="movieItem animate-pulse">
		<div class="poster bg-white bg-opacity-25 rounded-md">
		</div>
		<p v-if="showTitle" class="h-4 w-full bg-white bg-opacity-25 rounded-sm mt-3"></p>
		<span class="h-4 w-3/4 bg-white bg-opacity-25 rounded-sm mt-3" v-if="showDateTag"></span>
		<span class="h-4 w-1/2 bg-white bg-opacity-25 rounded-sm mt-3" v-if="showDateTag"></span>
	</div>        
</template>

<script>
import './components.css'

export default {
	name: 'MovieItem',
	props: {
		showPlay: {
			type: Boolean
		},
		showTitle: {
			type: Boolean
		},
		showDateTag: {
			type: Boolean
		},
		showReleaseTag: {
			type: Boolean,
			default: true
		},
		movie: Object
	},

	methods: {
		trimTitle: function(title){
			if(title.length > 30){
				return title.substring(0, 30) + '...'
			}else{
				return title
			}
		}
	}
}
</script>

<style scoped>
.poster{
	width: 100%;
	padding-top: 142.8%;
	position: relative;
	background-size: cover;
	background-position: center;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.2)
}

.estreno{
	-webkit-mask-image: url('/assets/icons/bookmark-solid.svg');
	mask-image: url('/assets/icons/bookmark-solid.svg');
	-webkit-mask-repeat: no-repeat;
	mask-repeat: no-repeat; 
	mask-position: center;
	mask-size: cover;
}
</style>
