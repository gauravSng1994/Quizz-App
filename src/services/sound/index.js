// export const ButtonSound = () => {
//     var audio = new Audio(require("../static/sounds/button-click.mp3"));
//     audio.play();
// };

const backgroundMusic = new Audio(require("../../assets/variant/olympics/music/background.mp3"));
// const audioSound = new Audio(require("../static/sounds/bg.mp3"));
export const BackgroundMusicStart = () => {
    backgroundMusic.addEventListener(
        "ended",
        function () {
            this.currentTime = 0;
            this.play();
        },
        false
    );
    backgroundMusic.autoplay = true;
    backgroundMusic.muted = false;
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();
};

export const BackgroundMusicStop = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
};
