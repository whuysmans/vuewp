<template>
  <router-link :to="{ path: '/tags/' + tag.slug }">
    <span> 
      {{ tag.slug }}
    </span>
  </router-link>
</template>

  <script>
  
  export default {
    props: ['tag']
  }

  </script>
