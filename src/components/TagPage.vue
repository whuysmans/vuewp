<template>
  <div id="content" class="site-content">
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main">
        <div class="posts">
          <Post v-for="post in posts" :post="post"></Post>
        </div>
        <Pagination :totalPages="allPages"></Pagination>
      </main>
    </div>
  </div>
</template>

<script>

import queries from '../queries'

export default {

  created: function() {
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

  methods: {

    fetchTagPosts: function( options ) {
      Object.assign( options.params, { per_page: 5, slug: this.$route.params.slug } )
      queries.getTagPosts( options ).then( ( result ) => 
        {
          this.$set( this, 'allPages', Math.ceil( result.wp_query.count / options.params.per_page ) )
          this.$set( this, 'posts', result.wp_query.posts )
        }
      )
    }

  }

}
</script>