//index.js
//获取应用实例
// 引入用来发送请求的方法
import {request} from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    cateList:[],
    foorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getFoorList()
  },
// 获取轮播图数据
  getSwiperList(){
    request({url:'/home/swiperdata'}).then(res=>{
      let arr =res.data.message
      arr.forEach(item=>{
        item.navigator_url=item.navigator_url.replace('main','index')
        item.navigator_url=item.navigator_url.replace('goods_id','id')
      })
      this.setData({
        swiperList:arr
      })
    })
  },
  // 获取导航数据
  getCateList(){
    request({
      url:'/home/catitems'
    }).then(res=>{
      // console.log(res)
      this.setData({
        cateList:res.data.message
      })
    })
  },
  getFoorList(){
     request({url:'/home/floordata'}).then(res=>{
       
      let footerList=res.data.message
      // console.log(footerList)
      footerList.forEach(item=>{
        // console.log(item)
        let product_list =  item.product_list
        product_list.forEach(item2=>{
          // console.log(item2)
          let navigator_url=item2.navigator_url
         let navigator_url_arr=navigator_url.split('?')
          navigator_url_arr.splice(1,0,"/index")
          navigator_url_arr.splice(2,0,"?")
          // console.log(navigator_url_arr)
          navigator_url = navigator_url_arr.join("")
          // console.log(navigator_url)
          item2.navigator_url=navigator_url
        })
        item.product_list=product_list
      })

      this.setData({
        foorList:footerList
      })
     })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let _this=this
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success(res){ 
    //    _this.setData({
    //      swiperList:res.data.message
    //    })
    //   }
    // })

    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})


