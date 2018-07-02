export default class TipTicket {
  constructor(gameDayId, season){
    this.season = season;
    this.gameDayId = gameDayId;
    this.player = null;
    this.tipps = [];
    this.answer = null;
  }
}
