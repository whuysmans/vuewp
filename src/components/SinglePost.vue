<template>
  <main id="main" class="site-main" role="main">
	<article :id="post.ID" class="post type-post format-standard">
	    <header class="entry-header">
	    	<div class="entry-meta">
	    		<span class="screen-reader-text">Posted on</span>
          		<router-link :to="{ path: '/posts/' + post.slug }">
            		<time class="entry-date published" :datetime="post.date">{{ post.date }}</time>
          		</router-link>
          		<span class="byline">
          			 by 
        			<span v-if="hasAuthor" class="author vcard">       
          				<router-link :to="{ path: '/author/' + post.author.id, query: { name: post.author.name } }" class="url fn n">
            				{{ post.author.name }}
          				</router-link>
        			</span>
      			</span>
	    	</div>
	      <h1 class="entry-title">{{ post.title }}</h1>
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
		    },
		    hasAuthor: function() {
        		return this.post.author && this.post.author.name !== ''
      		}
		}

	}	

</script>