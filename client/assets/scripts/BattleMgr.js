var BattleMgr = function () {
    this.lastBattle = {};   //当前战斗数据
    this.playerOne = null;  //玩家1的数据
    this.playerTwo = null;  //玩家2的数据
    this.playerThree = null;  //玩家3的数据
    this.playerFour = null;  //玩家4的数据
    this.selfIndex = 0;     //自己的玩家编号
    this.battle = null;     //当前战场实例
    // this.canInput = false;  //当前是否可以输入
    // this.selfShoot = false; //是不是自己执行的操作
    // this.blueTurn = true;   //是否是蓝方回合 可以改成编号 0 1 2 可以避免一些bug
    // this.limitCtrlSid = 0;  //限制只能使用此球员进行操作
    // this.battleTimeLeft = 180;//战斗剩余时间
    // this.turnTimeLeft = 0;  //回合剩余时间
    // this.roundPlayer = 0;   //当前是谁的回合
    // this.revKickAction = false;//收到点球动作判断 如果没收到 要主动扣分
    // this.goal = 0;
    // this.matchType = cc.Game.Enum.MatchType.Fight_Arena;
    // this.isWatchBattle = false;// 是否是观战模式
};

