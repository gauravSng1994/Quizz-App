const back = new Audio(require("../../assets/variant/olympics/sound/back.mp3"));
const clear = new Audio(require("../../assets/variant/olympics/sound/clear.mp3"));
const correct = new Audio(require("../../assets/variant/olympics/sound/correct.mp3"));
const finish = new Audio(require("../../assets/variant/olympics/sound/finish.mp3"));
const letter_select = new Audio(require("../../assets/variant/olympics/sound/letter_select.mp3"));
const proceed = new Audio(require("../../assets/variant/olympics/sound/proceed.mp3"));
const remove = new Audio(require("../../assets/variant/olympics/sound/remove.mp3"));
const select = new Audio(require("../../assets/variant/olympics/sound/select.mp3"));
const wrong = new Audio(require("../../assets/variant/olympics/sound/wrong.mp3"));
const backgroundMusic = new Audio(require("../../assets/variant/olympics/music/background.mp3"));

import AudioClass from "./AudioClass";

export const BackSound = new AudioClass(back);
export const ClearSound = new AudioClass(clear);
export const CorrectSound = new AudioClass(correct);
export const FinishSound = new AudioClass(finish);
export const LetterSelectSound = new AudioClass(letter_select);
export const ProceedSelectSound = new AudioClass(proceed);
export const RemoveSound = new AudioClass(remove);
export const SelectSound = new AudioClass(select);
export const WrongSound = new AudioClass(wrong);

export const BackgroundMusic = new AudioClass(backgroundMusic);
