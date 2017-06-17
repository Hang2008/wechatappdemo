// pages/welcome/welcome.js
Page({
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