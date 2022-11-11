import {Player} from "../../Types/Player";

export class PlayersController {
    players: Player[];
    currentPlayerId: number;
    constructor(players: Player[]) {
        this.players = players;
        this.currentPlayerId = 0;
    }

    nextPlayer() {
        this.currentPlayerId++;
        if (this.currentPlayerId >= this.players.length) {
            this.currentPlayerId = 0;
        }
    }

    getCurrentPlayerSymbol() {
        return this.players[this.currentPlayerId].symbol;
    }
    getCurrentPlayerName() {
        return this.players[this.currentPlayerId].name;
    }
}