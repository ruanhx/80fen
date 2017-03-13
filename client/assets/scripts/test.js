/**
 * Created by max on 2017/3/9.
 */
this.cards = {};
this.keys = [];
for (var k = 0; k < 100; k++) {
    this.keys.push(k);
    this.cards[k] = "a" + k;
}
this.player = {};
this.player[0] = [];
this.player[1] = [];
this.player[2] = [];
this.player[3] = [];
var curKeys = this.keys;
while (curKeys.length > 8) {
    for (var i = 0; i < Object.getOwnPropertyNames(this.player).length; i++) {
        var random = parseInt(Math.random() * curKeys.length);
        var id = curKeys[random];
        curKeys.pop(id);
        this.player[i].push(this.cards[id]);
    }

}
console.info(this.player);