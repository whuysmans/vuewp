<template>
  <header class="site-header" role="banner">
    <div class="custom-header">
      <div class="custom-header-media">
        <div class="wp-custom-header">
          <router-link :to="{ path: '/' }">
            <img :src="this.headerImage">
          </router-link>
        </div>
      </div>
      <div class="site-branding">
        <div class="wrap">
          <div class="site-branding-text">
            <p class="site-title">
              <router-link :to="{ path: '/' }">{{ this.name }}</router-link>
            </p>
            <p class="site-description">{{ this.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="site-header-menu" class="navigation-top">
      <div class="wrap">
         <Menu></Menu>
      </div>
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
