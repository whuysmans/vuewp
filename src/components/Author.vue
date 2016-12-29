<template>
	<span class="byline">
		 by 
		<span class="author vcard">       
			<router-link :to="{ path: '/author/' + author.slug }" class="url fn n">
				{{ author.display_name }}
			</router-link>
		</span>
	</span>
</template>

<script>
	export default {
		props: ['author']
	}
</script>