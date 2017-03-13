// 单张卡牌数据
var Card = function (cfg) {
    this.id = cfg.id;
    this.suit = cfg.suit; // 花色
    this.num = cfg.num;

};



// 卡牌管理
var CardMgr = function () {
    this.cards = {};
};

CardMgr.prototype.init = function () {
    // this.cards = {};
    var cfgCards = cc.Game.dataMgr.card.all();
    var count = 0;
    this.keys = [];
    for (var id in cfgCards) {
        var cfg = cfgCards[id];
        this.cards[id] = new Card(cfg);
        this.keys.push(id);
        count++;
    }
    this.count = count;
};
CardMgr.prototype.random = function () {
    this.player = {};
    this.player[0] = [];
    this.player[1] = [];
    this.player[2] = [];
    this.player[3] = [];
    var curKeys = this.keys;
    while (curKeys.length > 8) {
        for (var i = 0; i < this.player.length; i++) {
            var random = parseInt(Math.random() * curKeys.length);
            var id = curKeys[random];
            curKeys.pop(id);
            this.player[i].push(getCardById(id));
        }
    }
}
CardMgr.prototype.getCardById = function (cardId) {
    return this.cards[cardId];
};

module.exports = function () {
    return new CardMgr();
};