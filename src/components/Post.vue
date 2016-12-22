<template>
	<article :id="post.ID" class="post type-post format-standard"
          :class="{ 'sticky': isSticky(), 'has-post-thumbnail': hasFeaturedImage }">
    <svg v-if="post.sticky" class="icon icon-thumb-tack" aria-hidden="true" role="img">
      <use href="#icon-thumb-tack" xlink:href="#icon-thumb-tack"></use>
    </svg>
    <header class="entry-header">
      <div class="entry-meta">
        <span class="screen-reader-text">Posted on</span>
          <router-link :to="{ path: '/posts/' + post.slug }">
            <time class="entry-date published" :datetime="post.date">{{ post.date }}</time>
          </router-link>
      </div>
      <h2 class="entry-title"><router-link :to="{ path: '/posts/' + post.slug }" @click.native="choosePost()">{{ post.title }}</router-link></h2>
    </header>
    <router-link v-if="hasFeaturedImage" :to="{ path: '/posts/' + post.slug }" @click.native="choosePost()">
        <CImage :post="post"></CImage>
    </router-link>
    <div  class="entry-content" v-html="post.excerpt">
    </div>
    <Footer :post="post"></Footer>
</transition>
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
          body.classList.add( 'home', 'blog', 'group-blog', 'hfeed', 'has-header-image', 'has-sidebar', 'colors-light', 'customize-support' )
        } else {
          body.classList.add( 'single', 'single-post', 'single-format-standard', 'group-blog' )
        }
      },
      choosePost: function() {
        this.$store.commit( 'setCurrentPost', this.post )
      },
      isSticky: function() {
        return this.post.sticky
      }
		},

    computed: {
      hasFeaturedImage: function() {
        return typeof this.post.thumbnail_url === 'string'
      }
    }
	}

</script>
