export default {
    name:"Header",
    props: ['title','showBackButton'],
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
};
