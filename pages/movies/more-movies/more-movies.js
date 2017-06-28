var Utils = require("../../../utils/utils");
var app = getApp();
Page({
    start: 0,
    currentUrl: "",
    /**
     * 页面的初始数据
     */
    data: {
        pageTitle: "",
        movies: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        switch (options.category) {
            case "itMovies":
                this.data.pageTitle = "正在热映";
                this.currentUrl = app.globleData.baseUrl + "/v2/movie/in_theaters";
                break;
            case "csMovies":
                this.data.pageTitle = "即将上映";
                this.currentUrl = app.globleData.baseUrl + "/v2/movie/coming_soon";
                break;
            case "topMovies":
                this.data.pageTitle = "豆瓣Top250";
                this.currentUrl = app.globleData.baseUrl + "/v2/movie/top250";
                break;
            default:
                break;
        }
        Utils.sendRequest(this.currentUrl, this.onGetMoreData);
    },

    onReady: function (event) {
        wx.setNavigationBarTitle({
            title: this.data.pageTitle
        });
    },

    onGetMoreData: function (response) {
        var movies = [];
        if (this.data.movies.length > 0) {
            movies = this.data.movies;
        }
        var subjects = response.subjects;
        for (var idx in subjects) {
            var subject = subjects[idx];
            var title = subject.original_title;
            if (Utils.getByteLen(title) > 14) {
                title = title.substring(0, 7) + "...";
            }
            var tempObj = {
                title: title,
                average: subject.rating.average,
                coverImg: subject.images.large,
                movieId: subject.id,
                stars: Utils.convertToStarsArray(subject.rating.stars)
            };
            movies.push(tempObj);
        }
        this.setData({
            movies: movies
        });
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        this.start += 20;
    },

    onReachBottom: function () {
        var finalUrl = this.currentUrl + "?start=" + this.start + "&count=20";
        Utils.sendRequest(finalUrl, this.onGetMoreData);
    },

    onPullDownRefresh: function (event) {
        this.data.movies = {};
        this.start = 0;
        var finalUrl = this.currentUrl + "?start=0&count=20";
        Utils.sendRequest(finalUrl, this.onGetMoreData);
        wx.showNavigationBarLoading();
    }
})