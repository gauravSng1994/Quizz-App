<template>
  <div>
    <img src="./../assets/variant/olympics/static_preloader.png" @click="gotToCategoriesPage">
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {
    },
    methods : {
      gotToCategoriesPage(){
        this.$router.push('Categories')
      }
    }
  }
</script>
