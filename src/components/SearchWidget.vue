<template>
	<section id="search-2" class="widget widget_search">
		<form role="search" class="search-form" @submit.prevent="handleClick">
			<label>
				<span class="screen-reader-text">Search for:</span>
				<input type="search" v-model="searchText" 
					class="search-field" placeholder="Search..." >
			</label>
			<button type="submit" class="search-submit">...</button>
		</form>
	</section>
</template>
	

<script>
	import queries from '../queries'

	export default {
		created: function() {
			this.$on( 'pagination', this.doSearch )
		},

		data() {
			return {
				searchText: '',
				posts: [],
				allPages: 0
			}
		},
		methods: {
			handleClick: function() {
				this.doSearch( {
					params: {
						search: this.searchText,
						page: 1
					}
				} )
			},
			doSearch: function( options ) {
				Object.assign( options.params, { per_page: 5 } )
				queries.getSearchResults( options ).then( ( result ) => {
					this.$set( this, 'allPages', Math.ceil( result.wp_query.count / options.params.per_page ) )
          			this.$set( this, 'posts', result.wp_query.posts )
          			this.$store.commit( 'setSearchResults', result.wp_query.posts )
          			this.$router.push( { path: '/search' , query: { term: this.searchText } } )
          			this.searchText = ''
				} )
			}
		}
	}
</script>