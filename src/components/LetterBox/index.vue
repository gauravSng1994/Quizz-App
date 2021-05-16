<template>
    <div class="letterBox" @click="clickHandler">
        <img src="../../assets/variant/letterbox_background.svg"/>
        <div class="text">
            {{letter}}
        </div>
    </div>
</template>
<script>

export default {
  name:"LetterBox",
  props: ['letter'],
  methods:{
    clickHandler : function () {
      this.$emit('click',this.letter);
    }
  }
}
</script>

<style scoped>
.letterBox{
    width: 30px;
    height: 30px;
    position: relative;
    display: inline-block;
    margin: 0 1px;
    border: 1px solid transparent;
    border-image: url('../../assets/variant/letterbox_border_neutral.svg');
}
.letterBox > img{
    width: 100%;
    left: 0;
    position: absolute;
}
.letterBox > .text{
    position: absolute;
    left: 10px;
    top: 4px;
    color:white;
}
</style>
