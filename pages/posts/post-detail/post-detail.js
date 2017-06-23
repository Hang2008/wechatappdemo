var data = require("../../../data/postsData");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  shareItemList: ['分享到微信', '分享到微博', '分享到QQ'],
  currentPostId: null,
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    if (options.id) {
      self.setData({
        isPlaying: app.globleData.isPlaying,
        currentId: options.id - 1,
        detailInfo: data.postList[options.id - 1]
      });
      wx.getStorage({
        key: 'all_favorite',
        success: function (res) {
          var allFavorite = res.data;
          if (allFavorite) {
            if (!allFavorite[options.id - 1]) {
              allFavorite[options.id - 1] = false;
              wx.setStorageSync("all_favorite", allFavorite);
            }
            self.setData({
              isFavorite: allFavorite[options.id - 1]
            });
          }
        },
        fail: function () {
          var favorites = {};
          favorites[options.id - 1] = false;
          wx.setStorageSync("all_favorite", favorites);
        }
      });
    }
    this.setAudioListner();
  },

  setAudioListner: function () {
    var self = this;
    wx.onBackgroundAudioPlay(function () {
      app.globleData.isPlaying = true;
      self.setData({
        isPlaying: true
      });
    });

    wx.onBackgroundAudioPause(function () {
      app.globleData.isPlaying = false;
      self.setData({
        isPlaying: false
      });
    });
  },
  saveFavorite: function () {
    var allFavorite = wx.getStorageSync("all_favorite");
    if (allFavorite) {
      allFavorite[this.data.currentId] = !allFavorite[this.data.currentId];
      wx.setStorageSync("all_favorite", allFavorite);
      this.setData({
        isFavorite: allFavorite[this.data.currentId]
      });
      this.showMyToast(allFavorite[this.data.currentId] ? '收藏成功' : '取消收藏');
    }
  },

  shareToMoment: function () {
    var self = this;
    wx.showActionSheet({
      itemList: self.shareItemList,
      success: function (res) {
        // self.showMyToast(self.shareItemList[res.tapIndex] + "成功!");
        self.showMyModal(self.shareItemList[res.tapIndex]);
      },
      fail: function (res) {
        self.showMyToast(res.errMsg);
      },
      itemColor: "#405f80"
    });
  },

  showMyToast: function (string) {
    wx.showToast({
      title: string,
      duration: 2000
    });
  },

  showMyModal: function (title) {
    wx.showModal({
      title: title,
      content: '我的天哪 分享功能用不鸟 呜呜呜呜呜...'
    })
  },

  audioIconClick(event) {
    if (!app.globleData.isPlaying) {
      wx.playBackgroundAudio({
        dataUrl: event.target.dataset.audioSrc,
        title: event.target.dataset.audioTitle,
        coverImgUrl: ""
      });
      app.globleData.playingId =
        app.globleData.isPlaying = true;
    } else {
      wx.pauseBackgroundAudio();
      app.globleData.isPlaying = false;
    }
    this.setData({
      isPlaying: app.globleData.isPlaying
    });
  }
})