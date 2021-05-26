const back = require("../../assets/variant/olympics/sound/back.mp3");
const clear = require("../../assets/variant/olympics/sound/clear.mp3");
const correct = require("../../assets/variant/olympics/sound/correct.mp3");
const finish = require("../../assets/variant/olympics/sound/finish.mp3");
const letter_select = require("../../assets/variant/olympics/sound/letter_select.mp3");
const proceed = require("../../assets/variant/olympics/sound/proceed.mp3");
const remove = require("../../assets/variant/olympics/sound/remove.mp3");
const select = require("../../assets/variant/olympics/sound/select.mp3");
const wrong = require("../../assets/variant/olympics/sound/wrong.mp3");
const backgroundMusic = require("../../assets/variant/olympics/music/background.mp3");

import AudioClass from "./AudioClass";

export const BackSound = new AudioClass({audioSrc:back});
export const ClearSound = new AudioClass({audioSrc:clear});
export const CorrectSound = new AudioClass({audioSrc:correct});
export const FinishSound = new AudioClass({audioSrc:finish});
export const LetterSelectSound = new AudioClass({audioSrc:letter_select});
export const ProceedSelectSound = new AudioClass({audioSrc:proceed});
export const RemoveSound = new AudioClass({audioSrc:remove});
export const SelectSound = new AudioClass({audioSrc:select});
export const WrongSound = new AudioClass({audioSrc:wrong});

export const BackgroundMusic = new AudioClass({audioSrc:backgroundMusic,type:"BACKGROUND",repeat:true});
