var Utils = require("../../../utils/utils");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: {}
    },

    /**
     * 生命周期函数--监听页面加载 
     */
    onLoad: function (options) {
        var url = app.globleData.baseUrl + "/v2/movie/subject/" + options.id;
        Utils.sendRequest(url, this.processDetail);
    },

    processDetail: function (data) {
        if (!data) {
            return;
        }
        wx.hideNavigationBarLoading();
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large

            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: Utils.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: Utils.convertToCastString(data.casts),
            castsInfo: Utils.convertToCastInfos(data.casts),
            summary: data.summary
        }
        console.log("movie == " + JSON.stringify(movie));
        this.setData({
            movie: movie
        });
    }
})