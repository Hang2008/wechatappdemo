var postsData = require("../../../data/post-data.js")


Page(
  {
    onLoad: function (option) {
      var postId = option.haha;
      // 以下引用数据方式再自己研究一下
      var postData = postsData.postList[postId];
      this.setData(
        { postData: postData }
      );
      // wx.setStorageSync('key',"风暴英雄")

      wx.setStorageSync(
        'key', {
          game: "风暴英雄",
          developer: "暴雪"
        }
      )

    },

    onShareTap: function (event) {
      var game = wx.getStorageSync('key');
      console.log(game)
    }

  }
)