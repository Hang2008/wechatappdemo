Page(
  {
    onTap:function(event){
      // wx.navigateTo({
      //   url: "../posts/post"
      // });
      wx.redirectTo({
        url: "../posts/post",
      })
    },

    // onSupTap(event){
    //        console.log("execute onSupTap")
    // },

    // onUnload:function(){
    //     //  console.log("onUnload")
    // },


    // onHide:function(){
    //     //  console.log("onHide")
    // }
  }
)