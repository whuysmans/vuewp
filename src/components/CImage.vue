<template>
  <div class="post-thumbnail" aria-hidden="true">
    <img :src="post.thumbnail_url" :alt="post.slug" class="attachment-post-thumbnail size-post-thumbnail wp-post-image">
  </div>
</template>

  <script>
    export default {
      props: ['post']

    }

  </script>
