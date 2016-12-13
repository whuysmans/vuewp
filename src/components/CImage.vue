<template>
  <div class="post-thumbnail" aria-hidden="true">
    <img :src="post.thumbnail_url" alt="">
  </div>
</template>

  <script>
    export default {
      props: ['post'],
      created() {
        //this.fetchImage( this.post.featured_media)
      },
      data() {
        return {
          image: {}
        }
      },
      methods: {
        fetchImage: function( id ) {
          this.$http.get(
            'http://vuetest.dev/wp-json/wp/v2/media/' + id
          ).then( (response) =>
            this.image = response.data, 
              (error) => console.log('')
          )
        }
      }

    }

  </script>
