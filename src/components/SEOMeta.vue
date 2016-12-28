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
				return {
					'seoType': this.$route.name,
					'seoIdentifier': this.$route.params.slug ? this.$route.params.slug : ""
				}
			}
		}
	}
</script>