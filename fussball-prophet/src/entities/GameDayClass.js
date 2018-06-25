import Game from './GameClass';

export default class GameDay {

  constructor (gameDayNumber){
    this.gameDayNumber = gameDayNumber;
    this.games = [];
    this.question = null;
  }

  addGame(game){
    this.games.push(game);
  }
}
