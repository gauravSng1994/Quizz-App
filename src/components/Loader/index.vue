<template>
  <div>
    <div class="loader-circular-div">
      <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>
    <v-sheet
        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
        class="pa-3"
    >
      <v-skeleton-loader
          class="mx-auto"
          min-width="100vw"
          min-height="100vh"
          type="image"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
<!--  <v-progress-circular :value="80"></v-progress-circular>-->
</template>

<script>
export default {
  name: "index",
  data(){
    return{
      theme:{
        isDark:false,
      }
    }
  }
}
</script>

<style>
.loader-circular-div{
  position: fixed;
  top: 45vh;
  left: 45vw;
}
.v-skeleton-loader__image {
  height: 100vh!important;
}
</style>
