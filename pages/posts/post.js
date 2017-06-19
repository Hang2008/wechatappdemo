var postData = require("../../data/postsData");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ content: postData.postList });
  },

  onContentTap: function (event) {
    var postid = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../posts/post-detail/post-detail?id=' + postid
    });
  }
})