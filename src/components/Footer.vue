<template>
  <footer class="entry-footer">
    <span class="byline">
      <span v-if="hasAuthor" class="author vcard" v-html="post.author.avatar">       
      </span>
      <span v-if="hasAuthor">
        <router-link :to="{ path: '/author/' + post.author.id, query: { name: post.author.name } }" class="url fn n">
          {{ post.author.name }}
        </router-link>
      </span>
    </span>

    <span class="posted-on">
      <span>Posted on</span>
      <router-link :to="{ path: '/posts/' + post.slug }">
        <time class="entry-date published" :datetime="post.date">{{ post.date }}</time>
      </router-link>
    </span>

    <span v-if="hasCategories" class="cat-links">
      <Category v-for="category in post.terms" :category="category"></Category>
    </span>

    <span v-if="hasTags" class="tag-links">
      <Tag v-for="tag in post.tags" :tag="tag"></Tag>
    </span>
  </footer>
</template>


<script>

	export default {
    props: ['post'],
		data() {
      return {
        date: '',
        terms: [] 
      }
		},
    computed: {
      hasAuthor: function() {
        return this.post.author && this.post.author.name !== ''
      },
      hasCategories: function() {
        return this.post.terms && this.post.terms.length > 0
      },
      hasTags: function() {
        return this.post.tags && this.post.tags.length > 0
      }
    }
	}
</script>

