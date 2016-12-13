<template>
  <header class="site-header">
    <div class="site-header-main">
      <div class="site-branding">
        <router-link :to="{ path: '/' }"><h1 class="site-title">{{ this.name }}</h1></router-link>
        <p class="site-description">{{ this.description }}</p>
      </div>
      <div id="site-header-menu" class="site-header-menu">
        <Menu></Menu>
      </div>
    </div>
  </header>
</template>

  <script>

  import queries from '../queries'

  export default {

    created() {
      this.getPages()
    },

    data() {
      return {
        pages: [],
        name: '',
        description: ''
      }
    },

    methods: {
      getPages() {
        queries.getPages().then( 
          ( response ) => this.pages = response.wp_query.posts
        ).then( queries.getBlogInfo().then(
            ( resp ) => { 
              this.name = resp.wp_query.bloginfo.blogname
              this.description = resp.wp_query.bloginfo.description
            }
          ) )
      }
    }

  }
  </script>
