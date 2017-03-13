// callback util
exports.invokeCallback = function (cb) {
    if (!!cb && typeof cb == 'function') {
        cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};

//generate a random number between min and max
exports.rand = function (min, max) {
    var n = max - min;
    return min + Math.round(Math.random() * n);
};

// clone a object
exports.clone = function (o) {
    var n = {};
    for (var k in o) {
        n[k] = o[k];
    }
    return n;
};

exports.cloneTo = function (o, to) {
    for (var k in o) {
        to[k] = o[k];
    }
    return to;
};

// 判断是否是数字
exports.isNum = function (s) {
    if (typeof s == 'number')
        return true;
    if (typeof s != 'string')
        return false;

    if (s != null && s.length > 0) {
        var r, re;
        re = /-?\d*\.?\d*/i; //\d表示数字,*表示匹配多个数字
        r = s.match(re);
        return (r == s) ? true : false;
    }
    return false;
};


// 输出
exports.output = function (root, tab, index) {
    if (!tab) {
        tab = 0;
    }
    if (!root) {
        root = cc.director.getScene();
    }
    var getName = function () {
        return "[" + index + "]" + root.name + "(" + root.__instanceId + ")";
    }
    var value = {};
    var ret = {}
    ret[getName()] = value;
    for (var i = 0, l = root.children.length; i < l; i++) {
        var node = root.children[i];
        //value.push(this.output(node, tab+1));
        this.cloneTo(this.output(node, tab + 1, i), value);
    }
    return ret;
}
