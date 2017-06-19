var data = require("../../../data/postsData");
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
    if (options.id) {
      this.setData({
        currentId: options.id - 1,
        detailInfo: data.postList[options.id - 1]
      });
      var allFavorite = wx.getStorageSync("all_favorite");
      if (allFavorite.hasOwnProperty(options.id - 1)) {
        this.setData({
          isFavorite: allFavorite[options.id - 1]
        });
      } else {
        var favorites = {};
        favorites[options.id - 1] = false;
        wx.setStorageSync("all_favorite", favorites);
      }
    }
  },

  saveFavorite: function () {
    var allFavorite = wx.getStorageSync("all_favorite");
    allFavorite[this.data.currentId] = !allFavorite[this.data.currentId];
    wx.setStorageSync("all_favorite", allFavorite);
    this.setData({
      isFavorite: allFavorite[this.data.currentId]
    });
  },

  shareToMoment: function () {
    wx.clearStorageSync();
  }
})