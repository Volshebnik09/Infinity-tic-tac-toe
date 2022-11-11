import "./index.css"
export class Cell{
    private _symbol:string;
    size:number
    private readonly _cellHTML

    get symbol(): string {
        return this._symbol;
    }

    set symbol(value: string) {
        this._symbol = value;
        this._cellHTML.innerHTML = value
    }

    get cellHTML() {
        return this._cellHTML;
    }

    constructor(size:number,x:number,y:number) {
        this._cellHTML = document.createElement('div')
        this._cellHTML.className = "cell";
        this._cellHTML.style.width = size + "px";
        this._cellHTML.style.height = size + "px";
        this._cellHTML.style.fontSize = size +"px";
        this.cellHTML.style.position = "absolute";
        this.size = size
        this._cellHTML.style.transform = `translate(${x * size}px,${y*size}px)`
    }

    changePos(x:number,y:number){
        this._cellHTML.style.transform = `translate(${x * this.size}px,${y*this.size}px)`
    }

}