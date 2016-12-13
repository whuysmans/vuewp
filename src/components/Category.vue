<template>
  <div>
    <router-link :to="{ path: '/categories/' + category.slug }">
      <span> 
        {{ category.slug }}
      </span>
    </router-link>
  </div>
</template>

  <script>

  export default {
    props: ['category']
  }

  </script>
