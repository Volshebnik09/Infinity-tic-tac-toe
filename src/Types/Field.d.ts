import {Cell} from "../Components/Cell/Cell";

export interface Cells {
    [x: number]: {
        [y: number]: string;
    };
}

export interface cellsHTML {
    [x:number]:{
        [y:number]:Cell
    }
}