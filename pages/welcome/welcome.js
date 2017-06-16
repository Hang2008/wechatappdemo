// pages/welcome/welcome.js
Page({
  onTap: function() {
    console.log("aaa");
    // wx.navigateTo({
    //   url: '../posts/post',
    //   success: function() {
    //   },
    //   fail: function() {
    //   },
    //   complete: function() {
    //   }
    // });
  },

  onTextTap: function() {
    wx.redirectTo({
      url: '../posts/post'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("welcome onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("welcome onUnload");
  }
})