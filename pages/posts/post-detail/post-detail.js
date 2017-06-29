var postsData = require("../../../data/post-data.js");
var app = getApp();
Page(
  {
    data: {
      isPlayingMusic: false,
    },

    onLoad: function (option) {
      var globalData = app.globalData;
      var postId = option.haha;
      this.setData({ currentPostId: postId });
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
      };

      if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
        // this.data.isPlayingMusic = true;
        this.setData({
          isPlayingMusic: true,
        });
      };

      this.setMusicMonitor();

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


    //以下为监听函数
    setMusicMonitor: function () {
      var that = this;
      wx.onBackgroundAudioPlay(function () {
        that.setData(
          { isPlayingMusic: true }
        )
        app.globalData.g_isPlayingMusic = true;
        app.globalData.g_currentMusicPostId = that.data.currentPostId;
      }
      );

      wx.onBackgroundAudioPause(function () {
        that.setData(
          {
            isPlayingMusic: false
          }
        ),
          app.globalData.g_isPlayingMusic = false;
        app.globalData.g_currentMusicPostId = null;
      })

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

      this.getPostsCollectedSyc();
      // this.getPostsCollectedAsy()
    },

    // 下面为京东用户提交购物单等待京东商城回复的过程，使用异步处理，可减轻服务器压力，属于个性的业务逻辑，一般在小程序中很少使用
    // getPostsCollectedAsy: function () {
    // var that=this;
    //   wx.getStorage({
    //     key: 'posts_collected',
    //     success: function (res) {
    //       var postsCollected=res.data;
    //       var postCollected = postsCollected[that.data.currentPostId];
    //       //收藏变未收藏，未收藏变收藏
    //       postCollected = !postCollected;
    //       postsCollected[that.data.currentPostId] = postCollected;
    //       that.showToast(postsCollected, postCollected)
    //      },
    //   })
    // },

    getPostsCollectedSyc: function (event) {
      var postsCollected = wx.getStorageSync('posts_collected');
      // console.log("abcdefg" + JSON.stringify('postsColleted'));
      var postCollected = postsCollected[this.data.currentPostId];
      //收藏变未收藏，未收藏变收藏
      postCollected = !postCollected;
      postsCollected[this.data.currentPostId] = postCollected;
      this.showToast(postsCollected, postCollected)
    },

    // 以下方法是让用户点击收藏按钮之后再次出现选择按钮并存入缓存的方法实例，不适合这个地方的业务逻辑
    // showModal: function (postsCollected, postCollected) {
    //   var that=this;
    //   wx.showModal({
    //     title: '收藏',
    //     content: postCollected?'收藏该文章？':'取消收藏该文章？',
    //     showCancel: "true",
    //     cancelText: "取消",
    //     cancelColor: '#3CC51F',
    //     confirmText: "确认",
    //     confirmColor: '#3CC51F',
    //     success: function (res) {
    //       if (res.confirm) {
    //         //更新了文章是否收藏的缓存值
    //         wx.setStorageSync('posts_collected', postsCollected);
    //         //更新数据绑定变量，从而实现切换图片
    //         that.setData({
    //           collected: postCollected
    //         });
    //       }
    //     }
    //   })
    // },

    showToast: function (postsCollected, postCollected) {
      //更新了文章是否收藏的缓存值
      wx.setStorageSync('posts_collected', postsCollected);
      //更新数据绑定变量，从而实现切换图片
      this.setData({
        collected: postCollected
      });

      wx.showToast({
        title: postCollected ? '收藏成功' : '取消成功',
        duration: 1000,
        icon: "success"
      })
    },

    onShareTap: function () {

      var itemList = ['分享给好友',
        '分享到朋友圈',
        '分享到QQ',
        '分享到微博']

      wx.showActionSheet
        ({
          itemList: itemList,
          itemColor: "#405f80",
          success: function (res) {
            // res.cancel用户是不是点击了鼠标
            // res.tapIndex数组元素的序号，从0开始
            wx.showModal({
              title: '用户' + itemList[res.tapIndex],
              content: '用户是否取消' + res.cancel + '现在无法实现分享功能，什么时候能支持呢',
            })

          }

        })
    },

    onMusicTap: function () {
      var currentPostId = this.data.currentPostId;
      var isPlayingMusic = this.data.isPlayingMusic;
      if (isPlayingMusic) {
        wx.pauseBackgroundAudio();
        this.setData({
          isPlayingMusic: false,
        })
      }
      else {
        wx.playBackgroundAudio({
          dataUrl: postsData.postList[this.data.currentPostId].music.url,
          title: postsData.postList[this.data.currentPostId].music.title,
          coverImgUrl: postsData.postList[this.data.currentPostId].music.coverImg,
        });
        this.setData({
          isPlayingMusic: true,
        });
      }
    }
  }
)