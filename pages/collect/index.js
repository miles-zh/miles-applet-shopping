// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:[],
    tabs:[
      {
        id:0,
        value:'商品收藏',
        isActive:true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive:false
      },
      {
        id:2,
        value:'店铺收藏',
        isActive:false
      },
      {
        id:3,
        value:'浏览足迹',
        isActive:false
      }
    ],
    contentHeight:''
  },
  tabsItemChange(e){
    const index=e.detail.index
    let {tabs}=this.data
    tabs.forEach((item,i)=>i===index?item.isActive=true:item.isActive=false)
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {windowHeight,windowWidth}=wx.getSystemInfoSync()
    let contentHeight=windowHeight*750/windowWidth - 48.67*2 - 68.43 + 'rpx'

    this.setData({
      contentHeight
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
    const collectList=wx.getStorageSync('collectList') || []
    this.setData({
      collectList
    })
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