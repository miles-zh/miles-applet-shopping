// pages/goods_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[]
  },
  // 接口要的参数
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10,
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.queryParams.cid=options.cid || ''
    this.queryParams.query=options.query || ''
    this.getGoodsList()
  },
  // 获取商品列表
  getGoodsList(callback){
    request({url:'/goods/search',data:this.queryParams}).then(res=>{
      console.log(res)
      let total=res.data.message.total
      this.totalPages=Math.ceil(total/this.queryParams.pagesize)
      // console.log(this.totalPages)
      this.setData({
        goodsList: [...this.data.goodsList,...res.data.message.goods]
      },function(){
        // console.log(this.data.goodsList)
        callback && callback()
      })
      
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  // 项目切换
  tabsItemChange(e){
    const index=e.detail.index
    let {tabs}=this.data
    tabs.forEach((item,i)=>i===index?item.isActive=true:item.isActive=false)
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.queryParams.pagenum=1
    this.setData({
      goodsList:[]
    },function(){
      this.getGoodsList(function(){
        wx.stopPullDownRefresh()
      })
    })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.queryParams.pagenum >this.totalPages-1){
      wx-wx.showToast({
        title: '数据已经加载完!!!',
      })
      return
    }else{
      this.queryParams.pagenum++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})