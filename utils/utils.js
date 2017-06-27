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
module.exports = {
    convertToStarsArray: convertToStarsArray,
    sendRequest: sendRequest
}