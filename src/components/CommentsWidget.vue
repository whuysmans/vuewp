<template>
	<section class="widget widget_recent_comments">
		<h2 class="widget-title">Recent Comments</h2>
		<ul id="recentcomments">
			<li v-for="comment in comments" class="recentcomments">
				<span class="comment-author-link">
					<a :href="comment.comment_author_url" rel="external nofollow" class="url">
						{{ comment.comment_author}}
					</a>
				</span>
				 on 
				<router-link :to="{ path: '/posts/' + comment.comment_post_url }">
					{{ comment.comment_post_title }}
				</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
	import queries from '../queries'

	export default {

		data() {
			return {
				comments: []
			}
		},

		created: function() {
			this.getComments()
		},

		methods: {
			getComments: function() {
				queries.getComments().then( ( result ) => {
					this.$set( this, 'comments', result.wp_query.comments.slice( 0, 5 ) )
				} )
			}
		}

	}

</script>