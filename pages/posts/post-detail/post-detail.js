var postsData = require("../../../data/post-data.js")



Page(
  {
    data: {

    },

    onLoad: function (option) {
      var postId = option.haha;
      this.setData({currentPostId:postId});
      // this.data.currentPostId = postId;
      // 以下引用数据方式再自己研究一下
      var postData = postsData.postList[postId];
      this.setData(
        { postData: postData }
      );
      // 以下代码拿到了所有的缓存的文章是否收藏的布尔值
      var postsCollected = wx.getStorageSync('posts_collected')
      if (postsCollected) {
        var postCollected = postsCollected[postId]
        this.setData({
          collected: postCollected
        })
      }
      else {
        var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync('posts_collected', postsCollected);
      }


      // wx.setStorageSync('key',"风暴英雄")

      // 这部分是学习缓存的方法，在onload的时候直接执行的！！！
      // wx.setStorageSync(
      //     'key', {
      //       game: "风暴英雄",
      //       developer: "暴雪"
      //     }
      //   )

      //   wx.setStorageSync(
      //     'key1', {
      //       game: "LOL",
      //       developer: "拳头"
      //     }
      //   )

    },

    // 这部分是通过按钮清楚缓存或输出缓存的方法，放在onload之外，点击按钮的时候才执行！！！
    // onCollectionTap: function (event) {
    //   var pig = wx.getStorageSync('key');
    //   console.log(pig)
    // },

    // onShareTap: function (event) {
    //   // wx.removeStorageSync()
    //   wx.clearStorage()
    // }

    onCollectionTap: function (event) {
      var postsCollected = wx.getStorageSync('posts_collected');
      // console.log("abcdefg" + JSON.stringify('postsColleted'));
      var postCollected = postsCollected[this.data.currentPostId];
      //收藏变未收藏，未收藏变收藏
      postCollected = !postCollected;
      postCollected[this.data.currentPostId]=postCollected;
      //更新了文章是否收藏的缓存值
      wx.setStorageSync('posts_collected', postsCollected);
      //更新数据绑定变量，从而实现切换图片
      this.setData({
        collected: postCollected[this.data.currentPostId]
      })
    }

  }
)