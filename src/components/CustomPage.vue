<template>
  <main id="main" class="site-main" role="main">
    <div class="posts">
      <Post v-for="post in posts" :post="post" msg="event"></Post>
    </div>
    <Pagination :totalPages="allPages"></Pagination>
  </main>
</template>

<script>

import queries from '../queries'

	export default {
		created: function() {
      this.getCustomPost( { params: 
        {
          page: 1
        }
      } )
      this.$on( 'pagination', this.getCustomPost )
		},

		data() {
			return {
				posts: [],
        allPages: 0
			}
		},

    watch: {
      '$route' ( to, from ) {
        this.getCustomPost( { params: { page: 1 }} )
      }
    },

		methods: {
      getCustomPost: function( options ) {
        Object.assign( options.params, { per_page: 5 } )
        if( this.$route.params.slug ) {
          Object.assign( options.params, { name: this.$route.params.slug } )
        }
        if( this.$route.params.custom ) {
          Object.assign( options.params, { type: this.$route.params.custom } )
        }
        queries.getCustomType( options ).then( ( result ) => {
          this.$set( this, 'allPages', Math.ceil( result.wp_query.count / options.params.per_page ) )
          this.$set( this, 'posts', result.wp_query.posts )
          let body = document.querySelector('body')
          body.className = '';
          body.classList.add( 'archive', 'post-type-archive', 'has-header-image', 
            'has-sidebar', 'colors-light', 'customize-support' )
        } )
      }
		}
	}
</script>