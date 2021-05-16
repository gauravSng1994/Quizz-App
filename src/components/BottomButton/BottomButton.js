export default {
    name:"BottomButton",
    props: ['buttonLabel'],
    methods:{
        clickHandler:function (){
            this.$emit('click');
        }
    }
};
