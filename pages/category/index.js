// pages/category/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    rightContentScrollTop:0
  },
categoryList:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const categoryList=wx.getStorageSync('categoryList')
    // console.log(categoryList)
    if(!categoryList){
      this.getCategoryList()
    }else{
      if(Date.now()-categoryList.time>1000*5*60){
        this.getCategoryList()
      }else{
        this.categoryList=categoryList.data
      let leftMenuList=this.categoryList.map(item=>item.cat_name)
      let rightContent=this.categoryList[0].children
      this.setData({
        leftMenuList:leftMenuList,
        rightContent
      })
      }
      
    }
  },
  handleItemTap(e){
    console.log(e)
    const index=e.currentTarget.dataset.index;
    let rightContent=this.categoryList[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      rightContentScrollTop:0
    })
  },
  getCategoryList(){
    request({url:'/categories'}).then(res=>{
      // console.log(res)
      
        this.categoryList=res.data.message
      // console.log(this.categoryList)
      wx.setStorageSync('categoryList', {time:Date.now(),data:this.categoryList})
      let leftMenuList=this.categoryList.map(item=>item.cat_name)
      let rightContent=this.categoryList[0].children
      this.setData({
        leftMenuList:leftMenuList,
        rightContent
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