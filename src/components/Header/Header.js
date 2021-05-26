import {BackSound} from "../../services/audio";

export default {
    name:"Header",
    props: ['title','showBackButton'],
    methods:{
        goBack(){
            BackSound.start();
            this.$router.go(-1);
        }
    }
};
