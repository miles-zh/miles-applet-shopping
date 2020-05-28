// pages/search/index.js


import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult:[],
    isFocus:false,
    inputValue:''
  },
  timeId:-1,
  search(e){
    // console.log(e)
    let v=e.detail.value.trim()
    if(!v){
      this.setData({
        isFocus:false,
      })
      return
    };
    this.setData({
      isFocus:true
    })
    clearInterval(this.timeId)
    this.timeId=setTimeout(()=>{
      this.searchRequest(v)
    },1000)

  },
  hideCancelButton(){
    this.setData({
      isFocus:false,
      searchResult:[],
      inputValue:''
    })
  },
  searchRequest(value){
    let _this=this
    request({url:'/goods/qsearch',data:{query:value}}).then(res=>{
      let  {data} =res
      if(data.meta.status !== 200){
        wx.showToast({
          title: '获取数据失败',
        })
        return
      }
      _this.setData({
        searchResult:data.message
      })
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {windowHeight,windowWidth}=wx.getSystemInfoSync()
    let contentHeight=windowHeight*750/windowWidth - 120 + 'rpx'

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