var utils = require("../../utils/utils");
var app = getApp();
Page({
  /**
   * 页面的初始数据
   * 如果页面上用到了数据, 一定要在这里初始化,否则页面渲染时会报错
   */
  data: {
    itMovies: {},
    csMovies: {},
    topMovies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globleData.baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globleData.baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globleData.baseUrl + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieList(inTheatersUrl, "itMovies");
    this.getMovieList(comingSoonUrl, "csMovies");
    this.getMovieList(top250Url, "topMovies");
  },

  getMovieList: function (url, type) {
    var self = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        self.processData(res.data.subjects, type);
      },
      fail: function () {
      }
    });
  },

  processData: function (subjects, type) {
    var movies = [];
    for (var idx in subjects) {
      var subject = subjects[idx];
      var title = subject.original_title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var tempObj = {
        title: title,
        average: subject.rating.average,
        coverImg: subject.images.large,
        movieId: subject.id,
        stars: utils.convertToStarsArray(subject.rating.stars)
      };
      movies.push(tempObj);
    }
    var readyData = {};
    // 渲染页面时, 对于里层的循环数据,在外面包一层, 传到上层时通过...展开.
    readyData[type] = {
      movies: movies
    }
    this.setData(readyData);
  }
})