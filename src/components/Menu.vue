<template>
	<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="Primary Menu">
		<div class="menu-empty-menu-container">
			<ul id="menu-empty-menu" class="primary-menu">
				<li v-for="item in items" v-if="isTop(item)" 
						:id="item.id" class="menu-item menu-item-type-post_type menu-item-object-page"
								:class="{ 'menu-item-has-children': hasChildren(item) }">
					<router-link :to="{ path: '/' + fixRestUrl( item.url ) }">{{ item.title }}</router-link>
					<button v-if="hasChildren(item)" class="dropdown-toggle" aria-expanded="false">
						<span class="screen-reader-text">expand child menu</span>
					</button>
					<ul class="submenu" v-if="hasChildren(item)">
						<li v-for="child in children(item)" class="menu-item menu-item-type-post_type menu-item-object-page">
							<router-link :to="{ path: '/' + fixRestUrl( child.url ) }">
								{{ child.title }}
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
	import queries from '../queries'

	export default {
		created: function() {
			this.getCustomPostTypes().then( ( result ) => {
				this.types = result.wp_query.post_types
				this.getMenu( 'Empty Menu' )
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