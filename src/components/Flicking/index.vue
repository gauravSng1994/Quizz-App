<template>
  <flicking
      :options="{ gap: 10, moveType: 'freeScroll' }"
      :tag="'div'"
      :viewportTag="'div'"
      :cameraTag="'div'"
      :plugins="plugins"
      @need-panel="e => {
      // ADD PANELS
    }"
      @move-end="e => {
      // HANDLE INDEX CHANGE
    }"
  >
    <div>CONTENTS OF PANEL 0</div>
    <div>CONTENTS OF PANEL 1</div>
    <div>CONTENTS OF PANEL 2</div>
  </flicking>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { Fade } from "@egjs/flicking-plugins";

@Component({})
class DemoClass extends Vue {
  plugins = [
    new Fade(), 
    // new AutoPlay(2000, "NEXT")
    ];
    components:[]
  data(){
    return{

    }
  }

}
export default DemoClass;
// export default {
//   name: "Flicking",
//   components: {
//     Flicking: Flicking,
//   }
// }
</script>

<style scoped>

</style>
