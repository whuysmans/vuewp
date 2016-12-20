<template>
  <footer class="entry-footer">
    <span class="cat-tag-links">
      <span v-if="hasCategories" class="cat-links">
        <svg class="icon icon-folder-open" aria-hidden="true" role="img">
          <use href="#icon-folder-open" xlink:href="#icon-folder-open"></use>
        </svg>
        <Category v-for="category in post.terms" :category="category"></Category>
      </span>
      <span v-if="hasTags" class="tag-links">
        <svg class="icon icon-folder-open" aria-hidden="true" role="img">
          <use href="#icon-folder-open" xlink:href="#icon-folder-open"></use>
        </svg>
        <Tag v-for="tag in post.tags" :tag="tag"></Tag>
      </span>
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
      hasCategories: function() {
        return this.post.terms && this.post.terms.length > 0
      },
      hasTags: function() {
        return this.post.tags && this.post.tags.length > 0
      }
    }
	}
</script>

