import {GameOptions} from "../../Types/Game";
import {Field} from "../Field/Field";
import "./index.css"
import {PlayersController} from "../PlayersController/PlayersController";

export class Game {
    gameOptions: GameOptions;
    gameHTML:HTMLElement;
    field: Field;
    playersController: PlayersController
    grabbed:boolean;

    constructor(gameOptions:GameOptions) {
        this.gameHTML = document.createElement('div');
        this.gameOptions = gameOptions;
        this.gameOptions.root = this.gameHTML;
        this.gameHTML.className = "game";
        this.gameHTML.style.width = gameOptions.size.width + "px";
        this.gameHTML.style.height = gameOptions.size.height + "px";
        this.gameHTML.style.position = "relative";
        this.field = new Field(gameOptions);
        this.playersController = new PlayersController(gameOptions.players)
        this.gameHTML.append(this.field.os);
        this.gameHTML.style.overflow = "unset"
    }

    init(){
        this.field.render();
        this.movementEventHandler(this.gameHTML);
        this.clickEventHandler(this.gameHTML);
        this.updateStatus("Игра создана")
        return this.gameHTML;
    }

    movementEventHandler(game: HTMLElement) {
        game.oncontextmenu = () => {
            return false;
        };
        game.addEventListener("mousedown", (e) => {
            if (e.button !== 2) return;
            this.grabbed = true;
        });
        document.addEventListener("mouseup", () => {
            this.grabbed = false;
        });
        document.addEventListener("mousemove", (e) => {
            if (!this.grabbed) return;
            this.field.osX += e.movementX;
            this.field.osY += e.movementY;
            this.field.os.style.transform = `translate(
                ${this.field.osX}px,
                ${this.field.osY}px)`;
            this.field.render()
        });
    }

    clickEventHandler(game: HTMLElement){
        game.addEventListener("click", (e) => {
            let target = e.target as HTMLDivElement;
            if (this.gameOptions.gameEnd) return;
            if (target.className !== "cell") return;
            let cellX = target.getBoundingClientRect().x - this.gameHTML.getBoundingClientRect().x;
            let cellY = target.getBoundingClientRect().y - this.gameHTML.getBoundingClientRect().y;

            let x = Math.floor((cellX - this.field.osX) / this.field.cellSize);
            let y = Math.floor((cellY - this.field.osY) / this.field.cellSize);
            if (this.field.getSymbolInField(x, y)) return;
            this.field.setSymbolInField(
                x,
                y,
                this.playersController.getCurrentPlayerSymbol()
            );
            if (this.checkWin(x, y)) {
                this.gameOptions.gameEnd = true;
                this.updateStatus(this.playersController.getCurrentPlayerName() + " победил")
                this.field.render();
                return;
            }
            this.playersController.nextPlayer()
            this.updateStatus(
                this.playersController.getCurrentPlayerName() + " делает ход"
            );
            this.field.render();
        });
    }

    checkWin(x: number, y: number) {
        let symbol = this.field.getSymbolInField(x, y);

        return (
            this.horizontalCheck(x, y, symbol) ||
            this.verticalCheck(x, y, symbol) ||
            this.diagCheck(x, y, symbol)
        );
    }

    horizontalCheck(x: number, y: number, symbol: string) {
        // горизонтальная проверка
        let toWin = this.gameOptions.toWin;
        let counter = 0;
        for (let n = -toWin + 1; n < toWin; n++) {
            if (symbol === this.field.getSymbolInField(x - n, y)) {
                counter++;
                if (counter === toWin) return true;
            } else counter = 0;
        }
        return false;
    }

    verticalCheck(x: number, y: number, symbol: string) {
        // горизонтальная проверка
        let toWin = this.gameOptions.toWin;
        let counter = 0;
        for (let n = -toWin + 1; n < toWin; n++) {
            if (symbol === this.field.getSymbolInField(x, y - n)) {
                counter++;
                if (counter === toWin) return true;
            } else counter = 0;
        }
        return false;
    }

    diagCheck(x: number, y: number, symbol: string) {
        for (let offset = -1; offset <= 1; offset += 2) {
            let toWin = this.gameOptions.toWin;
            let counter = 0;
            for (let n = -toWin + 1; n < toWin; n++) {
                if (symbol === this.field.getSymbolInField(x - n, y - n * offset)) {
                    counter++;
                    if (counter === toWin) return true;
                } else counter = 0;
            }
        }
        return false;
    }

    reload() {
        this.grabbed = false;
        this.gameOptions.gameEnd = false;

        this.gameHTML.innerHTML = "";
        Object.assign(this.gameHTML.style, {
            width: this.gameOptions.size.width + "px",
            height: this.gameOptions.size.height + "px"
        });
        this.playersController = new PlayersController(this.gameOptions.players);
        this.field = new Field(this.gameOptions);
        this.updateStatus(
            "Игра перезапущена, ходит " +
            this.playersController.getCurrentPlayerName()
        );
        this.gameHTML.append(this.field.os);
        this.field.render();
    }

    updateStatus(status: string) {
        if (this.gameOptions.statusHTML)
            this.gameOptions.statusHTML.innerHTML = status;
    }

    gameOverflowToggle(){
        if (this.gameHTML.style.overflow === "hidden" )
            this.gameHTML.style.overflow = "unset"
        else
            this.gameHTML.style.overflow = "hidden"
    }

}