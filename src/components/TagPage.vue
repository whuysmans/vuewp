<template>
  <div class="changing-content">
    <header class="page-header">
      <h1 class="page-title">Tag: {{ this.$route.params.slug }}</h1>
    </header>
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <div class="posts">
          <Post v-for="post in posts" :post="post"></Post>
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
      body.classList.add( 'home', 'blog', 'archive', 'tag', 'group-blog', 'has-header-image', 'colors-light', 'customize-support', 'has-sidebar' )
    // }
    this.fetchTagPosts( { params: { page: 1 } } )
    this.$on( 'pagination', this.fetchTagPosts )
  },

  data() {
    return {
      posts: [],
      allPages: 0
    }
  },

  watch: {
    '$route' ( to, from ) {
      this.fetchTagPosts( { params: { page: 1 }} )
    }
  },

  beforeRouteLeave( to, from, next ) {
    this.$store.commit( 'resetCurrentPage' )
    next()
  },

  methods: {

    fetchTagPosts: function( options ) {
      Object.assign( options.params, { per_page: 5, slug: this.$route.params.slug } )
      queries.getTagPosts( options ).then( ( result ) => 
        {
          this.$set( this, 'allPages', Math.ceil( result.wp_query.count / options.params.per_page ) )
          this.$set( this, 'posts', result.wp_query.posts )
          let body = document.querySelector('body')
          body.className = '';
          body.classList.add( 'archive', 'tag', 'group-blog', 'has-header-image', 
            'has-sidebar', 'colors-light', 'customize-support' )
        }
      )
    }

  },

  computed: {
    hidePagination: function() {
      return this.posts.length < 5
    }
  }


}
</script>