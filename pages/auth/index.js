// pages/auth/index.js

import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  handleGetUserInfo(e){
    // 1.获取用户信息
    const {
      encryptedData,
      iv,
      rawData,
      signature
    } = e.detail
    // console.log(e)
    // 2.获取小程序登录成功后的code
    wx.login({
      success: (res) => {
        let code=res.code
        // 3.发送请求，获取用户的token值
        let params={
          encryptedData,
          code,
          iv,
          rawData,
          signature
        }
        request({
          url:'/users/wxlogin',
          data:params,
          method:'POST'
        }).then(res=>{
          console.log(res)
          wx.navigateBack(1)
        })
      },
    })
   

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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