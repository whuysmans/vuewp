<template>
	<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="Primary Menu">
		<button class="menu-toggle" aria-controls="top-menu" aria-expanded="false">
			<svg class="icon icon-bars" aria-hidden="true" role="img">
				<use href="#icon-bars" xlink:href="#icon-bars"></use>
			</svg>
			<svg class="icon icon-close" aria-hidden="true" role="img">
				<use href="#icon-close" xlink:href="#icon-close"></use>
			</svg>
			Menu
		</button>
		<div id="menu" class="menu-empty-menu-container">
			<ul id="menu-empty-menu" class="primary-menu">
				<router-link tag="li" :to="{ path: '/' + fixRestUrl( item.url ) }" v-for="item in items" v-if="isTop(item)" 
						:id="item.id" class="menu-item menu-item-type-post_type menu-item-object-page"
								:class="{ 'menu-item-has-children': hasChildren(item) }">
					<a >{{ item.title }}</a>
					<button v-if="hasChildren(item)" class="dropdown-toggle" aria-expanded="false">
						<svg class="icon icon-angle-down" aria-hidden="true" role="img">
							<use href="#icon-angle-down" xlink:href="#icon-angle-down"></use>
						</svg>
						<span class="svg-fallback icon-angle-down"></span>
						<span class="screen-reader-text">expand child menu</span>
					</button>
					<ul class="submenu" v-if="hasChildren(item)">
						<li v-for="child in children(item)" class="menu-item menu-item-type-post_type menu-item-object-page">
							<router-link :to="{ path: '/' + fixRestUrl( child.url ) }">
								{{ child.title }}
							</router-link>
						</li>
					</ul>
				</router-link>
				<li class="menu-line"></li>
			</ul>
		</div>
		<a href="#content" class="menu-scroll-down">
			<svg class="icon icon-arrow-right" aria-hidden="true" role="img">
				<use href="#icon-arrow-right" xlink:href="#icon-arrow-right"></use>
			</svg>
			<span class="screen-reader-text">Scroll down to content</span>
		</a>
	</nav>
</template>

<script>
	import queries from '../queries'
	import constants from '../constants'

	export default {
		created: function() {
			this.getCustomPostTypes().then( ( result ) => {
				this.types = result.wp_query.post_types
				this.getMenu( constants.MENU_NAME )
			} )	
		},
		data() {
			return {
				items: [],
				types: []
			}
		},
		methods: {
			getMenu: function( name ) {
				queries.getMenu( name ).then( (result) => {
					this.$set( this, 'items', result.wp_query.menu )
				} )
			},
			fixRestUrl: function( url ) {
				if( !url ) return ''
				url = url.toString()
				if( !this.isCustomPost( url ) ) {
					return 'pages/' + url.split( this.backendUrl )[1]
				} else {
					return url.split(this.backendUrl)[1]
				}
				
			},
			isTop: function( item ) {
				return item.parent === 0
			},
			children: function( item ) {
				return this.items.filter( function( current ) {
					return item.ID === current.parent
				})
			},
			hasChildren: function( item ) {
				return this.children( item ).length > 0
			},
			getCustomPostTypes: function() {
				return new Promise( ( resolve, reject ) => {
					queries.getCustomPostTypes().then( ( result ) => {
						resolve( result )
					} )
				} )
			},
			isCustomPost: function( url ) {
				return this.types.find( ( el ) => {
					return url.indexOf( el ) !== -1
				} )
			}
		},
		computed: {
			backendUrl: function() {
				const parts = this.items[0].guid.split('?')
				return parts[0]
			}
		}

	}
</script>