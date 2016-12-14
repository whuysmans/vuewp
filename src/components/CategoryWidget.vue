<template>
	<section id="categories" class="widget widget_categories">
		<h2 class="widget-title">Categories</h2>
		<ul>
			<li v-for="cat in categories" class="cat-item">
				<router-link :to="{ path: '/categories/' + cat.slug }"
					:title="cat.description">{{ cat.slug }}
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
	import queries from '../queries'
	export default {
		created: function() {
			this.getCategories()
		},

		data() {
			return {
				categories: []
			}
		},

		methods: {
			getCategories: function() {
				queries.getTerms( 'category' ).then( ( result ) => {
					this.$set( this, 'categories', result.wp_query.terms )
				}) 
			}
		}
	}
</script>