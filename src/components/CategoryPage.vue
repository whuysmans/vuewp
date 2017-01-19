<template>
  <div class="changing-content">
    <header class="page-header">
      <h1 class="page-title">Category: {{ this.$route.params.slug }}</h1>
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
      body.classList.add( 'home', 'blog', 'archive', 'category', 'group-blog', 'has-header-image', 'colors-light', 'customize-support', 'has-sidebar' )
    // }
    this.fetchCategoryPosts( { params: { page: 1 } } )
    this.$on( 'pagination', this.fetchCategoryPosts )
  },

  data() {
    return {
      posts: [],
      allPages: 0,
      name: ''
    }
  },

  watch: {
    '$route' ( to, from ) {
      this.fetchCategoryPosts( { params: { page: 1 }} )
    }
  },

  beforeRouteLeave( to, from, next ) {
    this.$store.commit( 'resetCurrentPage' )
    next()
  },

  methods: {

    fetchCategoryPosts: function( options ) {
      Object.assign( options.params, { per_page: 5, slug: this.$route.params.slug } )
      queries.getCategoryPosts( options ).then( ( result ) =>
        {
          this.$set( this, 'allPages', Math.ceil( result.wp_query.count / options.params.per_page ) )
          this.$set( this, 'posts', result.wp_query.posts )
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