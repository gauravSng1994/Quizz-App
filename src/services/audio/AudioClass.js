export default class AudioClass{
    constructor(audio,repeat) {
        this.audio = audio;
        this.repeat = repeat;
    }
    start(){
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
    }
    stop(){
        this.audio.pause();
        this.audio.currentTime = 0;
    }
}
