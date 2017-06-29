var postsData = require("../../data/post-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //小程序总会读取data对象来做数据绑定，这个动作我们称为动作A
    //而动作A的执行，是在onLoad执行之后发生的

    this.setData({
      post_key: postsData.postList
    });
  },

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is"+postId)
    wx.navigateTo({
      url: "post-detail/post-detail?haha=" + postId
    })

  },

  //使用冒泡机制来定义总的swiper组件，而不单独定义swiper-item
  //target这里指的是image，而currenttarget指的是swiper组件
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postid;
    // console.log("on post id is"+postId)
    wx.navigateTo({
      url: "post-detail/post-detail?haha=" + postId
    })
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  // onUnload: function () {
  //   console.log("onunload");
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})