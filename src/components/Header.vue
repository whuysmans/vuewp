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
    <div class="header-image">
      <router-link :to="{ path: '/' }">
        <img :src="this.headerImage">
      </router-link>
    </div>
  </header>
</template>

  <script>

  import queries from '../queries'

  export default {

    created() {
      this.getBlogInfo()
    },

    data() {
      return {
        name: '',
        description: '',
        headerImage: ''
      }
    },

    methods: {
      
      getBlogInfo() {
        queries.getBlogInfo().then( ( resp ) => {
          this.$set( this, 'name', resp.wp_query.bloginfo.blogname )
          this.$set( this, 'description', resp.wp_query.bloginfo.description )
          this.$set( this, 'headerImage', resp.wp_query.header_image )
        })
      }
    }

  }
  </script>
