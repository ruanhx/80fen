// require json files

/**
 * 用法
 * var character = dataApi.character.findById(roleId);
 */
// var path = require('path');

/**
 * Data model `new Data()`
 *
 * @param {Array}
 */

var utils = require('utils');

var Data = function (data) {

    data = data.split(/\r?\n/);
    var fields = {};
    data[1].split('\t').forEach(function (i, k) {
        fields[i] = k;
    });
    data.splice(0, 2);

    var result = {}, ids = [], item;
    data.forEach(function (k) {
        if (k.trim() == '') {
            return;
        }
        k = k.split('\t');
        item = mapData(fields, k);
        result[item.id] = item;
        ids.push(item.id);
    });
    this.data = result;
    this.ids = ids;
};

/**
 * map the array data to object
 *
 * @param {Object}
 * @param {Array}
 * @return {Object} result
 * @api private
 */
var mapData = function (fields, item) {
    var obj = {};
    for (var k in fields) {
        var va = item[fields[k]];
        // 解析成列表
        if (k.endsWith("List")) {
            if (va.length == 0) {
                va = [];
            }
            else {
                va = va.split(';');
                var temp = [];
                for (var index = 0; index < va.length; index++) {
                    var value = va[index];
                    if (utils.isNum(value)) {
                        value = Number(value);
                    }
                    temp.push(value);
                }
                va = temp;
            }
        }
        else {
            if (utils.isNum(va)) {
                va = Number(va);
            }
        }
        obj[k] = va;
    }
    return obj;
};


/**
 * find items by attribute
 *
 * @param {String} attribute name
 * @param {String|Number} the value of the attribute
 * @return {Array} result
 * @api public
 */
Data.prototype.findBy = function (attr, value) {
    var result = [];
    //cc.log(' findBy ' + attr + '  value:' + value + '  index: ' + index);
    var i, item;
    for (i in this.data) {
        item = this.data[i];
        if (item[attr] == value) {
            result.push(item);
        }
    }
    return result;
};

/**
 * find item by id
 *
 * @param id
 * @return {Obj}
 * @api public
 */
Data.prototype.findById = function (id) {
    return this.data[id];
};

Data.prototype.random = function () {
    var length = this.ids.length;
    var rid = this.ids[Math.floor(Math.random() * length)];
    return this.data[rid];
};

Data.prototype.getFirst = function () {
    var rid = this.ids[0];
    return this.data[rid];
};

/**
 * find all item
 *
 * @return {array}
 * @api public
 */
Data.prototype.all = function () {
    return this.data;
};

var DataMgr = function () {
};

DataMgr.prototype.tryLoadAllTable = function (node) {
    var self = this;
    if (!!this.hasLoad) {
        return;
    }
    this.hasLoad = true;
    this.curLoad = 0;
    this.loadTexts = [
        , 'card'
    ];

    this.notifyNode = node;
    this.maxLoad = this.loadTexts.length;

    // 加载表， 等读取路径接口，自动加载TODO
    this.tableCount = 0;
    this.stepToLoad();
};

DataMgr.prototype.stepToLoad = function () {
    for (var i = 0; i < 3; ++i) {
        if (this.tableCount >= this.maxLoad) {
            cc.log('分布加载表完成了')
            return;
        }
        cc.log('分步加载表 当前数量: ' + this.tableCount + '   当前表:' + this.loadTexts[this.tableCount])
        this.loadTable(this.loadTexts[this.tableCount]);
        ++this.tableCount;
    }
    cc.Game.scheduleOnce(this.stepToLoad.bind(this))
}

DataMgr.prototype.loadTable = function (filename, force) {
    var self = this;

    if (!force && self[filename]) {
        self.onLoadTable(filename);
        return;
    }
    cc.loader.loadRes('data/' + filename + '', function (err, string) {
        self[filename] = new Data(string);
        self.onLoadTable(filename);
    });
};

DataMgr.prototype.onLoadTable = function (filename) {
    this.curLoad += 1;
    var process = 1.0 * this.curLoad / this.maxLoad;
    cc.log('load:', filename, ' process:', process);
    this.notifyNode.emit('dataload', { filename, process });

    if (this.curLoad == this.maxLoad) {
        cc.Game.dataMgr.random_name = cc.Game.lang == 'zh' ? cc.Game.dataMgr.random_name_zh : cc.Game.dataMgr.random_name_en;
        this.notifyNode.emit('dataloadend');
    }
};


DataMgr.prototype.getTable = function (filename) {
    return this[filename];
};

DataMgr.prototype.getFactor = function (key, value) {
    var v = this.factor.findById(key);
    if (v !== undefined) {
        return isNaN(v.value) ? v.value : Number(v.value);
    }
    cc.error('factor缺少' + key + '的配置');
    return value;
}

module.exports = function () {
    return new DataMgr();
};
