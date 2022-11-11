import "./index.css";
import {Game} from "./Components/Game/Game";

// По сути можно в отдельный компонент вынести status и reload
let status = document.createElement('div')
let reload = document.createElement('button')
status.className = "status"
reload.className = "reload"
reload.innerHTML = "reload"

let game = new Game({
    cellsPerWidth:10,
    statusHTML: status,
    players: [
        {symbol:"I", name:"First player"},
        {symbol:"o", name:"Second player"},
        {symbol:"x", name:"Third player"},
    ],
    toWin:3,
    size:{
        width:500,
        height:500,
    },
})

document.body.append(status)
document.body.append(reload)
document.body.appendChild(game.init())

reload.addEventListener("click", () => {
    game.reload();
});
