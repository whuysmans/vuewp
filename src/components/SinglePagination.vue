<template>  
  <nav class="navigation pagination" role="navigation">
    <h2 class="screen-reader-text">Single Post navigation</h2>
      <div class="nav-links">
        <h3>{{ getCurrent }} of {{ totalPosts }}</h3>
        <button class="prev post-numbers" @click.prevent="fetch('prev', prev_post)" :disabled="!prev_post">
          Previous Post
        </button>
        <button class="next post-numbers" @click.prevent="fetch('next', next_post)" :disabled="!next_post">
          Next Post
        </button>
      </div>
  </nav>
</template>

<script>
  export default {
    created: function() {
      this.makePagination()
    },

    props: ['totalPosts'],

    data() {
      return {
        prev_post: '',
        next_post: ''
      }
    },

    methods: {
      makePagination: function() {
        if( this.getCurrent > 1 ) {
          this.$set( this, 'prev_post', this.getCurrent - 1 )
        } else {
          this.$set( this, 'prev_post', null )
        }
        if( this.getCurrent === parseInt( this.totalPosts ) ) {
          this.$set( this, 'next_post', null )
        } else {
          this.$set( this, 'next_post', this.getCurrent + 1 )
        }
      },
      fetch: function( direction, page ) {
        this.$parent.$emit( 'pagination', {
          params: {
            post: post
          }
        })
        if( direction === 'prev' ) {
          this.$store.commit( 'prevPost' )
        } else {
          this.$store.commit( 'nextPost' )
        }
        this.makePagination()
      }
    },

    computed: {
      getCurrent() {
        return this.$store.state.currentSingle
      }
    }

  }
</script>