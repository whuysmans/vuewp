<template>
  <div class="changing-content">
  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">
      <article class="page type-page status-publish hentry">
        <header class="entry-header"> 
          <h1 class="entry-title">{{ post.title }}</h1>
        </header>
        <div class="entry-content" v-html="post.content">
        </div>
      </article>
    </main>
    <Footer :post="post"></Footer>
  </div>
  </div>
</template>

  <script>

  import queries from '../queries'
  import { bus } from '../main'

  export default {
    created: function() {
      let body = document.querySelector('body')
      body.className = '';
      body.classList.add( 'home', 'blog', 'page-template-default', 'group-blog', 'has-header-image',
       'colors-light', 'customize-support', 'has-sidebar' )
      this.getPage( this.$route.params.slug )
    },

    data() {
      return {
        post: {}
      }
    },

    watch: {
      '$route': function ( to, from ) {
        this.getPage( this.$route.params.slug )
      },
      'hasFeaturedImage': function(){
        bus.$emit( 'fi', this.post )
      }
    },

    beforeRouteLeave( to, from, next ) {
      bus.$emit( 'leave', '' )
      next()
    },

    methods: {
      getPage: function( slug ) {
        queries.getPage( slug ).then(
          ( response ) => {
            this.post = response.wp_query.posts[0]
          }
        )
      }
    },
    computed: {
      hasFeaturedImage: function() {
        return this.post.thumbnail_url !== null && typeof this.post.thumbnail_url === 'string'
      }
    }

  }

  </script>
