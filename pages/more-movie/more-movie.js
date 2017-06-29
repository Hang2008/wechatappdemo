// pages/more-movie/more-movie.js,如果不加入下面的app=getapp的话会出现app is not defiend的错误
var util = require("../../utils/util.js");
var app = getApp();

Page({
  // data设置值的时候""是元素，而设置{}则是数组和对象
  data: {
    moreMovieTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true,
  },


  onLoad: function (options) {
    var tapurl = "";
    var category = options.category;
    this.setData({
      moreMovieTitle: category
    });
    switch (category) {
      case "正在热映": tapurl = app.globalData.g_doubanBase + "/v2/movie/in_theaters"
        break;
      case "即将上映": tapurl = app.globalData.g_doubanBase + "/v2/movie/coming_soon"
        break;
      case "Top250": tapurl = app.globalData.g_doubanBase + "/v2/movie/top250"
        break;
    };
    this.data.requestUrl = tapurl;
    this.getMoreMovieData(tapurl);
  },

  getMoreMovieData: function (url) {
    var that = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'json'
      },
      method: "GET",
      dataType: '',
      //使用success可以测试是否有返回值
      success: function (res) {
        console.log(res.data);
        that.processMoreMovieData(res.data);
      },
      fail: function (res) {
        console.log("failed")
      },
    })
  },

  onScrollLower: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20"
    this.getMoreMovieData(nextUrl);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function () {
    var refreshUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies={};
    this.data.isEmpty=true;
    this.getMoreMovieData(refreshUrl);
    wx.showNavigationBarLoading();
  },

  //以下函数具体内容需要修改
  processMoreMovieData: function (moviesDouban) {
    var movies = [];
    //这里不是太理解，后续加强学习!!!
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //[1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var totalMovies = {};
    if (!this.data.isEmpty) {
      // concat可以把两个数组加起来
      totalMovies = this.data.movies.concat(movies)
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false;
    };
    //这里是用的是javascript重要的方法，使用了它动态的性能
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
    this.data.totalCount += 20;
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      // 再取值的时候不能直接按照以下错误方法赋值。
      // title: 'moreMovieTitle'
      title: this.data.moreMovieTitle,
    })
  }


})