// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectedCount:0
  },
  onShow(){
    const userInfo=wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })

    const collectList=wx.getStorageSync('collectList') || []
   
    this.setData({
      collectedCount:collectList.length
    })
    


  },

  
})