<template>
    <div class="letterBox">
        <img src="../../assets/variant/letterbox_background.svg"/>
        <div class="text">
            {{letter}}
        </div>
    </div>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

// export default defineComponent({
//     setup() {
        
//     },
// })
export default {
    name:"LetterBox",
    props: ['letter'],
}
</script>

<style scoped>
.letterBox{
    width: 40px;
    height: 40px;
    position: relative;
    display: inline-block;
    margin: 0 1px;
    /* background-image: url('../../assets/variant/letterbox_background.svg'); */
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
    left: 12px;
    top:10px;
    color:white;
}
</style>