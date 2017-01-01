<template>
	<div v-if="show" class="single-featured-image-header">
    	<img :src="post.thumbnail_url" :alt="post.slug" width="1920" height="1200" class="attachment-twentyseventeen-featured-image size-twentyseventeen-featured-image wp-post-image" alt sizes="100vw">
  	</div>
</template>

<script>

	import { bus } from '../main'
	export default {

		data() {
			return {
				post: {},
				show: false
			}
		},
		created: function() {
			bus.$on( 'fi', ( post ) => {
				this.$set( this, 'post', post )
				this.$set( this, 'show', true )
			} ),
			bus.$on( 'leave', () => {
				this.$set( this, 'show', false )
			} )
		}
	}
</script>