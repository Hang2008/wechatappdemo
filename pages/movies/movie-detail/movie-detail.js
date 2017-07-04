import { Movie } from "class/Movie.js";
// var Utils = require("../../../utils/utils");
var app = getApp();
Page({
    name: "我是调用方属性",

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
        var movie = new Movie(url, this.processDetail);
        movie.getMovieData();
        // ES6 箭头函数的使用, 箭头函数里面的this就是调用方的this
        // 类似java lamda表达式
        movie.showUrl((args) => {
            console.log(this.name + " 这里的this是原调用方的this." + args);
        });
        // ES5版本 没有使用class
        // Utils.sendRequest(url, this.processDetail);
    },

    // ES5版本 没有使用class
    // processDetail: function (data) {
    //     if (!data) {
    //         return;
    //     }
    //     console.log("movie == " + JSON.stringify(data));
    //     wx.hideNavigationBarLoading();
    //     var director = {
    //         avatar: "",
    //         name: "",
    //         id: ""
    //     }
    //     if (data.directors[0] != null) {
    //         if (data.directors[0].avatars != null) {
    //             director.avatar = data.directors[0].avatars.large

    //         }
    //         director.name = data.directors[0].name;
    //         director.id = data.directors[0].id;
    //     }
    //     var movie = {
    //         movieImg: data.images ? data.images.large : "",
    //         country: data.countries[0],
    //         title: data.title,
    //         originalTitle: data.original_title,
    //         wishCount: data.wish_count,
    //         commentCount: data.comments_count,
    //         year: data.year,
    //         generes: data.genres.join("、"),
    //         stars: Utils.convertToStarsArray(data.rating.stars),
    //         score: data.rating.average,
    //         director: director,
    //         casts: Utils.convertToCastString(data.casts),
    //         castsInfo: Utils.convertToCastInfos(data.casts),
    //         summary: data.summary
    //     }
    //     this.setData({
    //         movie: movie
    //     });
    // },
    processDetail: function (data) {
        this.setData({
            movie: data
        });
        wx.hideNavigationBarLoading();
    },
    viewMoviePostImg: function (event) {
        var imgSrc = event.currentTarget.dataset.src;
        wx.previewImage({
            urls: [imgSrc]
        });
    }
})