<template>
	<article :id="post.ID" class="post type-post format-standard">
    <header class="entry-header">
      <span v-if="post.sticky" class="sticky-post">Featured</span>
      <h2 class="entry-title" v-if="this.single">{{ post.title }}</h2>
      <h2 class="entry-title" v-else><router-link :to="{ path: '/posts/' + post.slug }">{{ post.title }}</router-link></h2>
    </header>
      <CImage v-if="single && hasFeaturedImage" :post="post"></CImage>
      <router-link v-if="hasFeaturedImage && !single" :to="{ path: '/posts/' + post.slug }" rel="bookmark">
        <CImage :post="post"></CImage>
      </router-link>
    <div  class="entry-content" v-html="post.content">
    </div>
    <Footer :post="post"></Footer>
	</article>
</template>


<script>

import queries from '../queries'

	export default {

    props: ['post', 'msg'],

		created() {
      if( this.$route.params.slug && ( this.$route.path.indexOf('post') !== -1 ) ) {
        let postType = ( this.msg && this.msg === "event" ) ? "event" : "post"
        this.fetchPost( this.$route.params.slug, postType )
        this.single = true
        this.$on( 'pagination', this.fetchPost )
      }
      this.toggleBodyClasses()
		},

		data() {
			return {
				single: false,
        totalPosts: 0,
        test: this.msg
			}
		},

		methods: {
      fetchPost: function( slug, postType = "post") {
        queries.getPost( slug, postType ).then( ( result ) => {
          console.log(result)
          this.$set( this, 'post', result.wp_query.posts[0] )
        })

      },
      toggleBodyClasses: function() {
        let body = document.querySelector('body')
        body.className = '';
        if( !this.single ) {
          body.classList.add( 'home', 'blog', 'group-blog', 'hfeed' )
        } else {
          body.classList.add( 'single', 'single-post', 'single-format-standard', 'group-blog' )
        }
      }
		},

    computed: {
      hasFeaturedImage: function() {
        return typeof this.post.thumbnail_url === 'string'
      }
    }
	}

</script>
