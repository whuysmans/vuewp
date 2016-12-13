<template>
	<div id="content" class="site-content">
		<section id="primary" class="content-area">
			<main id="main" class="site-main" role="main">
				<header class="page-header">
					<h1 class="page-title">Search Results for: 
						<span>{{ this.$route.query.term }}</span>
					</h1>
				</header>
				<Post v-for="post in posts" :post="post"></Post>
			</main>
		</section>
	</div>
</template>

<script>
export default {
	created: function() {
		this.posts = this.$store.state.searchResults
	},
	watch: {
	    '$route' ( to, from ) {
	      this.posts = this.$store.state.searchResults
	    }
  	},
	data() {
		return {
			posts: []
		}
	}
}
</script>