<template>
  <main id="main" class="site-main" role="main">
	<article :id="post.ID" class="post type-post format-standard">
	    <header class="entry-header">
	      <span v-if="post.sticky" class="sticky-post">Featured</span>
	      <h2 class="entry-title">{{ post.title }}</h2>
	    </header>
	    <CImage v-if="hasFeaturedImage" :post="post"></CImage>
	    <div  class="entry-content" v-html="post.content">
	    </div>
	    <Footer :post="post"></Footer>
	</article>
  </main>
</template>

<script>

	export default {

		data() {
			return {
				post: this.$store.state.currentPost
			}
		},

		watch: {
			'$store.state.currentPost': function( val, oldVal ) {
				this.$nextTick( function() {
					this.post = val
				})
			}
		},

		computed: {
			hasFeaturedImage: function() {
		    	return typeof this.post.thumbnail_url === 'string'
		    }
		}

	}	

</script>