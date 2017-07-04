var Utils = require("../../../../utils/utils");
class Movie {
    constructor(url, cb) {
        this.cb = cb;
        this.url = url;
    }

    getMovieData() {
        // 这边的代码是交叉引用: Utils, 其实也可以把Utils也写成一个class
        // processDetail中的cd输入class上下文 所以需要绑定this
        // ES6 没有改变js本质, 只是个语法糖
        Utils.sendRequest(this.url, this.processDetail.bind(this));
    }

    showUrl(fun) {
        fun("调用了回调函数传入参数bbbb");
    }

    processDetail(data) {
        if (!data) {
            return;
        }
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
        this.cb(movie);
    }
}

export { Movie }