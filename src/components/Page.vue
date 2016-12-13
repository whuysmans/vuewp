<template>
  <div class="page">
    <h1 class="entry-title">{{ page.title }}</h1>
    <div class="entry-content" v-html="page.content">
    </div>
    <Footer :post="page"></Footer>
  </div>
</template>

  <script>

  import queries from '../queries'

  export default {
    created() {
      this.getPage( this.$route.params.slug )
    },

    data() {
      return {
        page: {
          ID: 0,
          slug: '',
          title: '',
          content: '',
          feaured_media: 0,
          author: null
        }
      }
    },

    watch: {
      '$route' ( to, from ) {
        this.getPage( this.$route.params.slug )
      }
    },

    methods: {
      getPage: function( slug ) {
        queries.getPage( slug ).then(
          ( response ) => {
            this.page = response.wp_query.posts[0]
          }
        )
      }
    }

  }

  </script>
