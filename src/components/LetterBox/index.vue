<template>
    <div
        :class="{'neutral-border':border==='neutral','correct-border':border==='correct','wrong-border':border==='wrong', 'letterBox':true}"
        @click="clickHandler">
        <img src="../../assets/variant/olympics/letterbox_background.svg"/>
        <div class="text" >
            {{letter}}
        </div>
    </div>
</template>
<script>

export default {
  name:"LetterBox",
  props: ['letter','border'],
  mounted(){
    console.log('this.border',this.border);
  },
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
    text-transform: uppercase;
}
.neutral-border{
  border: 1px solid transparent;
  border-image: url('../../assets/variant/olympics/letterbox_border_neutral.svg') 5 stretch;
}
.correct-border{
  border: 1px solid transparent;
  border-image: url('../../assets/variant/olympics/letterbox_border_correct.svg')  5 stretch;
}
.wrong-border{
  border: 1px solid transparent;
  border-image: url('../../assets/variant/olympics/letterbox_border_wrong.svg') 5 stretch;
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
