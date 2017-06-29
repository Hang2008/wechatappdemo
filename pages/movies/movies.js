var util = require("../../utils/util.js");
var app = getApp();

Page({
  //RESTFul API JSON
  //SOAP XML
  //粒度不是力度，数据力度的定制化设计
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  onLoad: function () {
    var inTheatersUrl = app.globalData.g_doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.g_doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.g_doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    //以下三个请求返回的数据请求不是同时响应的，因为这里是异步请求，所以三个返回值的时间顺序是不确定的
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "Top250");
  },

  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?category=' + category
    })
  },

  getMovieListData: function (url, settedKey, filmKind) {
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
        that.processDoubanData(res.data, settedKey, filmKind);


      },
      fail: function (res) {
        console.log("failed")
      },
    })
  },

  processDoubanData: function (moviesDouban, settedKey, filmKind) {
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
    //这里是用的是javascript重要的方法，使用了它动态的性能
    var readyData = {};
    readyData[settedKey] = {
      filmKind: filmKind,
      movies: movies
    }
    this.setData(readyData);
  }


})