<template>
	<article :id="post.ID" class="post type-post format-standard">
    <header class="entry-header">
      <span v-if="post.sticky" class="sticky-post">Featured</span>
      <h2 class="entry-title"><router-link :to="{ path: '/posts/' + post.slug }" @click.native="choosePost()">{{ post.title }}</router-link></h2>
    </header>
    <router-link v-if="hasFeaturedImage" :to="{ path: '/posts/' + post.slug }" @click.native="choosePost()">
        <CImage :post="post"></CImage>
    </router-link>
    <div  class="entry-content" v-html="post.content">
    </div>
    <Footer :post="post"></Footer>
	</article>
</template>


<script>

import queries from '../queries'

	export default {

    props: ['post'],

		created() {
      this.toggleBodyClasses()
		},

		data() {
			return {
        totalPosts: 0
			}
		},

		methods: {
      toggleBodyClasses: function() {
        let body = document.querySelector('body')
        body.className = '';
        if( !this.single ) {
          body.classList.add( 'home', 'blog', 'group-blog', 'hfeed' )
        } else {
          body.classList.add( 'single', 'single-post', 'single-format-standard', 'group-blog' )
        }
      },
      choosePost: function() {
        console.log('yes')
        this.$store.commit( 'setCurrentPost', this.post )
      }
		},

    computed: {
      hasFeaturedImage: function() {
        return typeof this.post.thumbnail_url === 'string'
      }
    }
	}

</script>
