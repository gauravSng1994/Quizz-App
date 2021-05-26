export default class AudioClass{
    constructor(obj) {
        let {audioSrc,repeat=false,type="SOUND"} = obj || {};
        this.audio = new Audio(audioSrc);
        this.repeat = repeat;
        this.type = type;
    }
    start(){
        if(this.type === "SOUND" && localStorage.getItem("IS_SOUND_OFF")) return false;
        if(this.repeat) this.audio.addEventListener(
            "ended",
            function () {
                this.currentTime = 0;
                this.play();
            },
            false
        );
        this.audio.autoplay = true;
        this.audio.muted = false;
        this.audio.volume = 0.2;
        this.audio.play();
        return true;
    }
    stop(){
        this.audio.pause();
        this.audio.currentTime = 0;
        return true;
    }
}
