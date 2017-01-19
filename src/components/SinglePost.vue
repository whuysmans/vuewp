<template>
  <div id="primary" class="content-area changing-content">
    <main id="main" class="site-main" role="main">
	  <article :id="post.ID" class="post type-post format-standard">
	    <header class="entry-header">
    	  <div class="entry-meta">
    	    <span class="screen-reader-text">Posted on</span>
      		  <router-link :to="{ path: '/posts/' + post.slug }">
        	    <time class="entry-date published" :datetime="post.date">{{ post.date }}</time>
      		  </router-link>
      		<Author v-if="hasAuthor" :author="post.author"></Author>
    	  </div>
	      <h1 class="entry-title">{{ post.title }}</h1>
	    </header>
	    <CImage v-if="hasFeaturedImage" :post="post"></CImage>
	    <div  class="entry-content" v-html="post.content">
	    </div>
	    <Footer :post="post"></Footer>
	  </article>
    </main>
  </div>
</template>

<script>

	import queries from '../queries'

	export default {

		created: function() {
			//fallback if store is empty, iow if user is linking directly to this detail
			if( !this.$store.state.currentPost.ID ) {
				queries.getPostByName(this.$route.params.slug).then( ( result ) => {
					this.$store.commit( 'setCurrentPost', result.wp_query.posts[0] )
					let body = document.querySelector('body')
					body.className = '';
					body.classList.add( 'home', 'blog', 'post-template-default', 'single', 'single-format-standard', 'group-blog', 'has-header-image', 'has-sidebar' )
				} )
			}
		},

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
		    },
		    hasAuthor: function() {
        		return this.post.author && this.post.author.slug && this.post.author.slug !== ''
      		}
		}

	}	

</script>