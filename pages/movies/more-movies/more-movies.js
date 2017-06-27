var Utils = require("../../../utils/utils");
var app = getApp();
Page({
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
        var url = "";
        switch (options.category) {
            case "itMovies":
                this.data.pageTitle = "正在热映";
                url = app.globleData.baseUrl + "/v2/movie/in_theaters";
                break;
            case "csMovies":
                this.data.pageTitle = "即将上映";
                url = app.globleData.baseUrl + "/v2/movie/coming_soon";
                break;
            case "topMovies":
                this.data.pageTitle = "豆瓣Top250";
                url = app.globleData.baseUrl + "/v2/movie/top250";
                break;
            default:
                break;
        }
        Utils.sendRequest(url, this.onGetMoreData);
    },

    onReady: function (event) {
        wx.setNavigationBarTitle({
            title: this.data.pageTitle
        });
    },

    onGetMoreData: function (response) {
        var movies = [];
        var subjects = response.subjects;
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
                stars: Utils.convertToStarsArray(subject.rating.stars)
            };
            movies.push(tempObj);
        }
        this.setData({
            movies: movies
        });
    }
})