import {Player} from "./Player";

export interface GameOptions {
    cellsPerWidth:number,
    players: Player[],
    toWin:number,
    statusHTML?: HTMLElement;
    size:{
        width: number,
        height:number,
    }
    gameEnd?:boolean,
    root?: HTMLElement,
}
