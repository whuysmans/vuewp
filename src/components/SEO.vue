<template></template>
<script>

	import queries from '../queries'

	export default {

		created: function() {
			this.getSEO()
		},

		data() {
			return {
				fields: []
			}
		},

		watch: {
		    '$route' ( to, from ) {
		      this.getSEO()
		    }
  		},

		methods: {
			getSEO: function() {
				this.fields = []
				let url = this.createBackendUrl()
				queries.getSEO( url ).then( (result) => {
					this.fields = this.parseResult( result.wp_query.yoast )
					this.createMetas()
				} )
			},
			createBackendUrl: function( url ) {
				return this.$route.params.slug ? 'http://vuetest.dev/' + this.$route.params.slug + '/' : 'http://vuetest.dev' + '/'
			},
			parseResult: function( result ) {
				return Object.assign(
					{}, ...Object.keys( result ).map( key => ( { [ this.changeKey( key )]: result[key]} ) )
				)
			},
			changeKey: function( key ) {
				return key.replace('_', ':')
			},
			createMetas: function() {
				let found = document.querySelectorAll('[data="seo"]')
				if( found ) {
					found.forEach( ( el ) => {
						el.parentElement.removeChild( el )
					})
				}
				let fragment = document.createDocumentFragment()
				Object.keys( this.fields ).map( ( key ) => {
					let meta = document.createElement('meta')
					if( key.indexOf('og') !== -1 ) {
						meta.setAttribute( 'property', key )
					} else {
						meta.setAttribute( 'name', key )
					}
					meta.setAttribute( 'content', this.fields[key] )
					meta.setAttribute( 'data', 'seo' )
					fragment.appendChild( meta )
				} ) 
				let head = document.getElementsByTagName('head')[0]
				head.appendChild( fragment )	
			}
		}
	}
</script>