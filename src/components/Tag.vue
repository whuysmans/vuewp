<template>
  <div>
    <router-link :to="{ path: '/tags/' + tag.slug }">
      <span> 
        {{ tag.slug }}
      </span>
    </router-link>
  </div>
</template>

  <script>
  
  export default {
    props: ['tag']
  }

  </script>
