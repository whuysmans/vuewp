<template>  
  <nav class="navigation pagination" role="navigation">
    <h2 class="screen-reader-text">Posts navigation</h2>
      <div class="nav-links">
        <h3>{{ getCurrent }} of {{ totalPages }}</h3>
        <button class="prev page-numbers" @click.prevent="fetch('prev', prev_page)" :disabled="!prev_page">
          Previous Page
        </button>
        <button class="next page-numbers" @click.prevent="fetch('next', next_page)" :disabled="!next_page">
          Next Page
        </button>
      </div>
  </nav>
</template>

<script>
  import constants from '../constants'
  export default {

    created: function() {
      this.makePagination()
    },
   
    mounted() {
      this.$watch( this.pagesReady, function() {
        this.makePagination()
      } )
    },

    props: ['totalPages'],

    data() {
      return {
        prev_page: '',
        next_page: ''
      }
    },

    methods: {
      makePagination: function() {
        if( this.getCurrent > 1 ) {
          this.$set( this, 'prev_page', this.getCurrent - 1 )
        } else {
          this.$set( this, 'prev_page', null )
        }
        if( this.getCurrent == this.totalPages ) {
          this.$set( this, 'next_page', null )
        } else {
          this.$set( this, 'next_page', this.getCurrent + 1 )
        }
      },
      fetch: function( direction, page ) {
        this.$parent.$emit( 'pagination', {
          params: {
            page: page
          }
        })
        if( direction === 'prev' ) {
          this.$store.commit( 'prev' )
        } else {
          this.$store.commit( 'next' )
        }
        this.makePagination()
      },
      pagesReady() {
        return this.totalPages > 0
      }
    },

    computed: {
      getCurrent() {
        return this.$store.state.currentPage
      }
    }

  }
</script>