function convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        }
        else {
            array.push(0);
        }
    }
    return array;
}

function sendRequest(url, callback) {
    wx.showNavigationBarLoading();
    wx.request({
        url: url,
        header: {
            "Content-Type": "json"
        },
        success: function (res) {
            if (typeof (callback) == "function" && res.data) {
                callback(res.data);
            }
        },
        fail: function () {
        }
    });
}

function getByteLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i].match(/[^x00-xff]/ig) != null) //全角 
            len += 2;
        else
            len += 1;
    };
    return len;
}
module.exports = {
    convertToStarsArray: convertToStarsArray,
    sendRequest: sendRequest,
    getByteLen: getByteLen
}