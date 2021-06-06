<template>
  <div>
    <Loader v-if="loading"/>
    <img v-else
         :src="backgroundImage"
         @click="gotToCategoriesPage"
         class="home-preloader"
    >
  </div>
</template>

<script>
import Loader from '../components/Loader'
import {downloadImage, GET} from "../services/image";
// import {downloadImage} from "../services/image";
import {downloadAdditionalResources} from "../services/AdditionalResources";
import {initialiseLocalStorage} from "../models";
// import jsonData from '../data/quiz_config_v2_full.json';
// import LocalStorage from "../services/LocalStorage";
  export default {
    name: 'Home',
    components: {
      Loader
    },
    data(){
      return{
        loading:true,
        backgroundImage:''
      }
    },
    async mounted() {
      console.log(this.$router.currentRoute);
      let json_url = this.$router.currentRoute.query.json_url || "https://raw.githubusercontent.com/gauravSng1994/Quizz-App/master/docs/kardashians.json";
      console.log(json_url);
      let data = await GET(json_url);
      initialiseLocalStorage(data);
      document.addEventListener("deviceready", ()=>downloadAdditionalResources(this.additionalResourcesDownloadCallback), false);
      let genericBackground = "https://theolympics.b-cdn.net/generic/default_background.png";
      let genericBackgroundImage = await downloadImage(genericBackground);
      this.backgroundImage = genericBackgroundImage;
      // this.additionalResourcesDownloadCallback(true);
      this.loading = false;
      // LocalStorage.setItem("GENERIC_BACKGROUND_IMAGE",genericBackgroundImage);
    },
    methods : {
      gotToCategoriesPage(){
        this.$router.push('/categories')
      },
      additionalResourcesDownloadCallback(res){
        console.log('got back in callback',res);
        this.loading = false;
        setTimeout(()=>{
          this.gotToCategoriesPage();
        },1000);
      }
    }
  }
</script>
<style scoped>
  .home-preloader{
    height: 100vh;
  }
</style>
