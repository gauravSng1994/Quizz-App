<template>
  <router-view/>
</template>

<script>
// import {BackgroundMusicStart} from "./services/audio";
export default {
  name: 'App',
  mounted() {
    // BackgroundMusicStart();
  },
  data: () => ({
    //
  }),
};
</script>
<style>
body{
  overflow: hidden;
}
.category-main-div{
  height:calc(100vh - 42px)!important;
}
</style>
