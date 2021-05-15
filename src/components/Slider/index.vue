<template>
    <div class="iphone">
        <div class="head"></div>
        <div class="home"></div>
        <div class="container">
            <div class="panels">
                <div class="panel"></div>
                <div class="panel"></div>
                <div class="panel"></div>
                <div class="panel"></div>
            </div>
        </div>
    </div>
</template>

<script>
import eg from ""
var iphone = new eg.Flicking(".iphone .panels", {
	circular: true,
	gap: 10,
});
export default iphone;
</script>

<style scoped>
body {
	background: #F2B51D;
}
.iphone {
  position: relative;
  width: 200px;
  height: 400px;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgba(100, 100, 100, 0.7) 5px 5px;
  margin: 0px auto;
}
.iphone .container {
  position: absolute;
  width: calc(100% - 10px);
  height: calc(100% - 100px);
  background:transparent;
  border: 2px solid #ddd;
  border-radius: 5px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 52px;
}
.iphone .head {
  position: absolute;
  width: 36px;
  height: 8px;
  top: 22px;
  left: 0;
  right: 0;
  border-radius: 4px;
  margin: auto;
  background: #ddd;
}
.iphone .home {
  position: absolute;
  width: 36px;
  height: 36px;
  border: 2px solid #ccc;
  border-radius: 50%;
  bottom: 6px;
  left: 0;
  right: 0;
  margin: auto;
}

.iphone .panels {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 150px;
}
.iphone .panel {
  position: relative;
  width: 80%;
  height: 100%;
  border-radius: 10px;
  background: #f55;
}
.iphone .panel:nth-child(4n + 1) {
  background-color:#78CAFF;
}
.iphone .panel:nth-child(4n + 2) {
  background-color:#FFD99D;
}
.iphone .panel:nth-child(4n + 3) {
  background-color:#FFB0B9;
}
.iphone .panel:nth-child(4n) {
  background-color:#B5F6B9;
}
</style>
