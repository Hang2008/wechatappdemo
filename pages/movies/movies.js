// movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(JSON.stringify(res));
      },
      fail: function () {

      }
    });
  }
})