import {GameOptions} from "../../Types/Game";
import {Cells} from "../../Types/Field";
import {Cell} from "../Cell/Cell";




export class Field {

    private readonly _os:HTMLElement;
    osX: number;
    osY: number;
    cellsOffsetXPrev:number;
    cellsOffsetYPrev:number;
    cellsPerWidth;
    cellsPerHeight;
    cells: Cells = {};
    gameOptions;
    cellSize:number

    constructor(gameOptions:GameOptions) {
        this._os = document.createElement('div');
        this._os.className = 'os';
        this._os.style.position ="relative";
        this.osX = 0;
        this.osY = 0;
        this.gameOptions = gameOptions;
        this.cellSize = this.gameOptions.size.width / this.gameOptions.cellsPerWidth
        this.cellsPerWidth = this.gameOptions.cellsPerWidth
        this.cellsPerHeight = this.gameOptions.size.height / this.cellSize
    }

    get os(): HTMLElement {
        return this._os;
    }
    render(){
        let cellsOffsetX = Math.floor(this.osX / this.cellSize)
        let cellsOffsetY = Math.floor(this.osY / this.cellSize)

        this.renderCells(cellsOffsetX, cellsOffsetY)
        this.clearCells2(cellsOffsetX, cellsOffsetY)

        this.cellsOffsetXPrev = Math.floor(this.osX / this.cellSize)
        this.cellsOffsetYPrev = Math.floor(this.osY / this.cellSize)

    }

    // Не производительный способ
    private clearCells(cellsOffsetX: number, cellsOffsetY: number){
        for (let cellsX in this.cells) {
            for (let cellsY in this.cells[cellsX]) {

                if (parseInt(cellsX)+1 < -cellsOffsetX){
                    this.cells[cellsX][cellsY].cellHTML.remove()
                }

                if (parseInt(cellsX)+1 > -cellsOffsetX + this.cellsPerWidth){
                    this.cells[cellsX][cellsY].cellHTML.remove()
                }

                if (parseInt(cellsY)+1 < -cellsOffsetY){
                    this.cells[cellsX][cellsY].cellHTML.remove()
                }

                if (parseInt(cellsY) > -cellsOffsetY + this.cellsPerHeight){
                    this.cells[cellsX][cellsY].cellHTML.remove()
                }
            }
        }
    }

    private clearCells2(cellsOffsetX: number, cellsOffsetY: number){
        for (let x = this.cellsOffsetXPrev; x<cellsOffsetX;x++){
            for (let cellKey in this.cells[this.cellsPerWidth - cellsOffsetX]) {
                this.cells[this.cellsPerWidth-cellsOffsetX][cellKey]?.cellHTML.remove()
            }
        }

        for (let x = this.cellsOffsetXPrev; x>cellsOffsetX;x--){
            for (let cellKey in this.cells[-2 - cellsOffsetX]) {
                this.cells[-2 - cellsOffsetX][cellKey]?.cellHTML.remove()
            }
        }

        for (let y = this.cellsOffsetYPrev; y<cellsOffsetY;y++){
            for (let cellKey in this.cells) {
                this.cells[cellKey][this.cellsPerHeight - cellsOffsetY]?.cellHTML.remove()
            }
        }

        for (let y = this.cellsOffsetYPrev; y>cellsOffsetY;y--){
            for (let cellKey in this.cells) {
                this.cells[cellKey][-2- cellsOffsetY]?.cellHTML.remove()
            }
        }

    }

    private renderCells(cellsOffestX: number, cellsOffestY: number){
        for (let x =-cellsOffestX-1;x<this.cellsPerWidth - cellsOffestX;x++){
            for (let y =-cellsOffestY-1; y<this.cellsPerHeight - cellsOffestY; y++){
                if (!this.cells?.[x]?.[y]) {
                    let cell = new Cell(this.cellSize,x,y)
                    if (!this.cells[x]) this.cells[x] = {}
                    this.cells[x][y] = cell
                    this._os.append(cell.cellHTML)
                    continue;
                }
                this._os.append(this.cells[x][y].cellHTML)
            }
        }
    }

    setSymbolInField(x:number,y:number,symbol:string){
        this.cells[x][y].symbol = symbol
    }
    getSymbolInField(x:number,y:number){
        return this.cells?.[x]?.[y]?.symbol
    }
}