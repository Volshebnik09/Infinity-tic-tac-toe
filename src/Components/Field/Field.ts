import {GameOptions} from "../../Types/Game";
import {Cells, cellsHTML} from "../../Types/Field";
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
    cellsHTML : cellsHTML = {};
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

        let cellsOffsetX = Math.floor(this.osX / this.cellSize)
        let cellsOffsetY = Math.floor(this.osY / this.cellSize)
        this.createCells(cellsOffsetX, cellsOffsetY)
    }

    get os(): HTMLElement {
        return this._os;
    }

    render(){
        let cellsOffsetX = Math.floor(this.osX / this.cellSize)
        let cellsOffsetY = Math.floor(this.osY / this.cellSize)

        for (let x in this.cellsHTML){
            for (let y in this.cellsHTML[x]){
                // Если в DOM нету клетки, вставляем
                if (this.cellsHTML[x]?.[y] && !this.cellsHTML[x][y].cellHTML.isConnected)
                    this._os.append(this.cellsHTML[x][y].cellHTML)

                if (this.cellsHTML[x]?.[y])
                    this.cellsHTML[x][y].symbol = this.cells[x]?.[y] ?? ''

               //  Ограничение по левой стороне
               if (parseInt(x) < -cellsOffsetX - 1) {
                   let temp = this.cellsHTML[x][y]
                   let newPosX = parseInt(x)+this.cellsPerWidth +1
                   if (!this.cellsHTML[newPosX]) this.cellsHTML[newPosX] = {}

                   this.cellsHTML[newPosX][y] = temp
                   this.cellsHTML[newPosX][y].changePos(newPosX,parseInt(y))

                   delete this.cellsHTML[x][y]
                   continue
               }

                //  Ограничение по правой стороне
                if (parseInt(x) > -cellsOffsetX + this.cellsPerWidth - 1) {
                    let temp = this.cellsHTML[x][y]
                    let newPosX = parseInt(x) - this.cellsPerWidth - 1

                    if (!this.cellsHTML[newPosX]) this.cellsHTML[newPosX] = {}

                    this.cellsHTML[newPosX][y] = temp
                    delete this.cellsHTML[x][y]
                    this.cellsHTML[newPosX][y].changePos(newPosX,parseInt(y))
                    continue

                }

                if (parseInt(y) < -cellsOffsetY - 1) {
                    let temp = this.cellsHTML[x][y]
                    let newPosY = parseInt(y)+this.cellsPerHeight +1
                    if (!this.cellsHTML[x]) this.cellsHTML[x] = {}
                    this.cellsHTML[x][newPosY] = temp
                    delete this.cellsHTML[x][y]
                    this.cellsHTML[x][newPosY].changePos(parseInt(x),newPosY)

                    continue

                }


                if (parseInt(y) > -cellsOffsetY + this.cellsPerHeight - 1) {
                    let temp = this.cellsHTML[x][y]
                    let newPosY = parseInt(y)-this.cellsPerHeight -1
                    if (!this.cellsHTML[x]) this.cellsHTML[x] = {}
                    this.cellsHTML[x][newPosY] = temp
                    delete this.cellsHTML[x][y]
                    this.cellsHTML[x][newPosY].changePos(parseInt(x),newPosY)
                }


            }
        }

    }

    private createCells(cellsOffestX: number, cellsOffestY: number){
        for (let x =-cellsOffestX-1;x<this.cellsPerWidth - cellsOffestX;x++){
            for (let y =-cellsOffestY-1; y<this.cellsPerHeight - cellsOffestY; y++){
                if (!this.cellsHTML[x]) this.cellsHTML[x] = {}
                this.cellsHTML[x][y] = new Cell(this.cellSize,x,y)
            }
        }
    }

    setSymbolInField(x:number,y:number,symbol:string){
        if (!this.cells[x]) this.cells[x] = {}
        this.cells[x][y] = symbol
    }
    getSymbolInField(x:number,y:number){
        return this.cells?.[x]?.[y]
    }
}