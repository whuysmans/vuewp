<template>
  <router-link :to="{ path: '/categories/' + category.slug }">
    <span> 
      {{ category.slug }}
    </span>
  </router-link>
</template>

  <script>

  export default {
    props: ['category']
  }

  </script>
