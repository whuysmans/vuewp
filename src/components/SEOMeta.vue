<template></template>
<script>

	import queries from '../queries'
	import constants from '../constants'

	export default {

		created: function() {
			this.getSEO()
		},

		data() {
			return {
				html: ""
			}
		},

		methods: {
			getSEO: function() {
				queries.getSEO( this.parseUrl ).then( (result) => {
					this.html = result.wp_query.seo
					this.createMetas()
				} )
			},
			createMetas: function() {	
				let head = document.getElementsByTagName('head')[0]
				head.innerHTML += this.html;
			}
		},

		computed: {
			parseUrl: function() {
				let type = this.$route.name
				let slug = ""
				if( type === 'post' ) {
					type = "post_type"
					slug = "post"
				} else if( type === 'custom' ) {
					type = "post_type"
					slug = this.$route.params.custom
				} else if( type === 'author' ) {
					type = "author"
					slug = this.$route.params.slug
				} else {
					type = this.$route.name
					slug = this.$route.params.slug
				}
				return {
					'seoType': type,
					'seoSlug': slug
				}
			}
		}
	}
</script>