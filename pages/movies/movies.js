var Utils = require("../../utils/utils");
var app = getApp();
Page({
    /**
     * 页面的初始数据
     * 如果页面上用到了数据, 一定要在这里初始化,否则页面渲染时会报错
     */
    data: {
        itMovies: {},
        csMovies: {},
        topMovies: {},
        searchResults: {},
        isSearchShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        var inTheatersUrl = app.globleData.baseUrl + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = app.globleData.baseUrl + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = app.globleData.baseUrl + "/v2/movie/top250" + "?start=0&count=3";
        // var itMoviesCache = wx.getStorageSync("itMovies");
        // var csMoviesCache = wx.getStorageSync("csMovies");
        // var topMoviesCache = wx.getStorageSync("topMovies");
        // if (!itMoviesCache.hasOwnProperty("itMovies")) {
        //   this.getMovieList(inTheatersUrl, "itMovies");
        // } else {
        //   this.setData(itMoviesCache);
        // }
        // if (!csMoviesCache.hasOwnProperty("csMovies")) {
        //   this.getMovieList(comingSoonUrl, "csMovies");
        // } else {
        //   this.setData(csMoviesCache);
        // }
        // if (!topMoviesCache.hasOwnProperty("topMovies")) {
        //   this.getMovieList(top250Url, "topMovies");
        // } else {
        //   this.setData(topMoviesCache);
        // }
        Utils.sendRequest(inTheatersUrl, function (response) {
            self.processData(response.subjects, "itMovies");
        });
        Utils.sendRequest(comingSoonUrl, function (response) {
            self.processData(response.subjects, "csMovies");
        });
        Utils.sendRequest(top250Url, function (response) {
            self.processData(response.subjects, "topMovies");
        });
    },

    processData: function (subjects, type) {
        var movies = [], header = "Title";
        switch (type) {
            case "itMovies":
                header = "正在热映";
                break;
            case "csMovies":
                header = "即将上映";
                break;
            case "topMovies":
                header = "豆瓣Top250";
                break;
            default:
                break;
        }
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
        var readyData = {};
        // 渲染页面时, 对于里层的循环数据,在外面包一层, 传到上层时通过...展开.
        readyData[type] = {
            movies: movies,
            header: header,
            category: type
        }
        // wx.setStorageSync(type, readyData);
        this.setData(readyData);
        wx.hideNavigationBarLoading();
    },

    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movies/more-movies?category=' + category
        })
    },

    onBindFocus: function (event) {
        console.log("onBindFocus");
        this.setData({
            isSearchShow: true
        });
    },

    onBindconfirm: function (event) {
        var text = event.detail.value;
        var searchUrl = app.globleData.baseUrl + "/v2/movie/search?q=" + text;
        console.log("text = " + text);
        Utils.sendRequest(searchUrl, this.showResults);
    },

    // 点击xx清除输入框文字还不知道怎么搞
    closeSearch: function () {
        this.setData({
            searchResults: {},
            isSearchShow: false
        });
    },

    showResults: function (response) {
        var movies = [], subjects = [];
        subjects = response.subjects;
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
            isSearchShow: false,
            searchResults: {
                movies: movies
            },
            isSearchShow: true
        });
        wx.hideNavigationBarLoading();
    },

    onMovieClick: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?movieId=' + movieId
        });
    }
})