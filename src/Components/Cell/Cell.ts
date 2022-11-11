import "./index.css"
export class Cell{
    private _symbol:string;

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
        this._cellHTML.style.transform = `translate(${x * size}px,${y*size}px)`
    }


}