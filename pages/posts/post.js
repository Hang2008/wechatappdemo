// post.js
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
    var posts = [
      {
        date: "Nov 12, 2017",
        title: "风暴英雄是暴雪 的游戏",
        author_img: "/images/touxiang/tx1.png",
        post_img: "/images/post/post_fbyx1.jpg",
        post_text: "又一位英雄来到《风暴英雄》时空枢纽，而且这位新英雄冷酷无情，手段狠辣，他就是《暗黑破坏神III》中死亡的化身：马萨伊尔。此外，随着全新赛季的开始，《风暴英雄》和《暗黑破坏神III》的联动活动也正式展开，想要获得两款游戏丰厚奖励的玩家们千万不要错过",
        like: 12,
        view: 325,
        show_authorImg: true
      },
      {
        date: "Nov 15, 2017",
        title: "联动《暗黑破坏神》赢取丰厚奖励",
        author_img: "/images/touxiang/tx4.png",
        post_img: "/images/post/post_fbyx2.jpg",
        post_text: "在感知到一个恶魔腐蚀肆虐的新国度后，马萨伊尔的黑暗灵魂开始在时空枢纽中成型。《风暴英雄》中的马萨伊尔保留了他在《暗黑破坏神》中那所到之处便留下死亡的特性，这名刺客类近战英雄能够从远处标记目标，以便他切入收割敌人的灵魂，吸取受害者的生命。",
        like: 33,
        view: 425,
        show_authorImg: false
      }
    ];

    this.setData({ content: posts });
  }
})