<template>
  <main id="main" class="site-main" role="main">
    <div class="posts">
      <Post v-for="post in posts" :post="post"></Post>
    </div>
    <Pagination :totalPages="allPages"></Pagination>
  </main>
</template>

<script>

import queries from '../queries'

export default {

  created: function() {
    this.fetchCategoryPosts( { params: { page: 1 } } )
    this.$on( 'pagination', this.fetchCategoryPosts )
  },

  data() {
    return {
      posts: [],
      allPages: 0
    }
  },

  watch: {
    '$route' ( to, from ) {
      this.fetchCategoryPosts( { params: { page: 1 }} )
    }
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

  }

}
</script>