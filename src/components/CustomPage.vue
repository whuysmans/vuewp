<template>
  <div class="changing-content">
    <header class="page-header">
      <h1 class="page-title">Archive: {{ this.$route.params.custom }}</h1>
    </header>
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <div class="posts">
          <Post v-for="post in posts" :post="post" msg="event"></Post>
        </div>
        <Pagination :class="{ 'hidden': hidePagination }" :totalPages="allPages" ></Pagination>
      </main>
    </div>
  </div>
</template>

<script>

import queries from '../queries'

	export default {
		created: function() {
      let body = document.querySelector('body')
      // if( body.classList.length === 0 ) {
        body.className = '';
        body.classList.add( 'home', 'blog', 'archive', 'post-type-archive', 'has-header-image', 
          'has-sidebar', 'colors-light', 'customize-support' )
      // }
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
        } )
      }
		},

    computed: {
      hidePagination: function() {
        return this.posts.length < 5
      }
    }
	}
</script>