<template>
	<article :id="div-comment-{comment.comment_ID}" class="comment-body">
		<footer class="comment-meta">
			<div class="comment-author vcard">
				<b class="fn">
					<router-link :to="{ path: comment.comment_author_url }">
			            {{ comment.comment_author }}
			        </router-link>
				</b>
			</div>
		</footer>
	</article>
</template>

<script>
	export default {
		props: ['comment']
	}
</script>