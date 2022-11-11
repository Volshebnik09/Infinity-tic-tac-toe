import "./index.css";
import {Game} from "./Components/Game/Game";

// По сути можно в отдельный компонент вынести status и reload
let desc = document.createElement("div")
let status = document.createElement('div')
let reload = document.createElement('button')
let gameOverflowToggle = document.createElement('button')
gameOverflowToggle.className ="gameOverflowToggle";
gameOverflowToggle.innerHTML = "gameOverflowToggle"

status.className = "status"
reload.className = "reload"
reload.innerHTML = "reload"
desc.className ="desc"
desc.innerHTML ="// Перемещение с помощью ПКМ"

let game = new Game({
    cellsPerWidth:20,
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

document.body.append(desc)
document.body.append(status)
document.body.append(reload)
document.body.append(game.init())
document.body.append(gameOverflowToggle)

reload.addEventListener("click", () => {
    game.reload();
});

gameOverflowToggle.addEventListener('click',()=>{
    game.gameOverflowToggle()
})