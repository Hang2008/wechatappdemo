// pages/welcome/welcome.js
Page({
  onTextTap: function () {
    //跳转到tab选项卡页面要用switchTab
    wx.switchTab({
      url: '../posts/post',
    });
    // wx.redirectTo({
    //   url: '../posts/post'
    // });
  }
})