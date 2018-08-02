export default class TipTicket {
  constructor(gameDayId, season, player, tips){
    this.season = season;
    this.gameDayId = gameDayId;
    this.player = player;
    this.tips = tips;
  }
}
