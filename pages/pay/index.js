// pages/pay/index.js

import {request} from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{},
    settleList:[],
    contentHeight:'',
    totalPrice:0,
    totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  setContentHeight(){
    const {windowHeight,windowWidth}=wx.getSystemInfoSync()
    console.log(windowHeight)

    let contentHeight=windowHeight*750/windowWidth - 137 - 90 - 90 + 'rpx'

    this.setData({
      contentHeight,
    })

  },
  calculateTotalPriceCount(){
    
    let totalPrice=0,
    totalCount=0;
    this.data.settleList.forEach(item=>{
        totalCount++;
        totalPrice += item.cartCount*item.goods_price
    })
    
    this.setData({
      totalCount,
      totalPrice
    })
  },

  onLoad: function (options) {
    // console.log(options)
    const addressObj=wx.getStorageSync('addressInfo')
   
    const settleList=options.settleGoods

    // 编译调试用
    // const settleList=wx.getStorageSync('cartList')

    // settleList.forEach(item=>{
    //   item.isSelected=true
    // })

    console.log(settleList)

    this.setData({
      addressInfo:addressObj,
      settleList:JSON.parse(settleList)
      // settleList
    },function(){
      this.calculateTotalPriceCount()
    })
    this.setContentHeight()
    
  },


  pay(){
    // 判断缓存中是否有token
    const token=wx.getStorageSync('token');
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
    //   return
    // }
    // 创建订单
    const header ={ Authorization:token};
    const order_price =this.data.totalPrice
    const consignee_addr = this.data.addressInfo.address
    let goods=[]
    const {settleList} = this.data
    settleList.forEach(item=>goods.push({
      goods_id:item.id,
      goods_number:item.cartCount,
      goods_price:item.goods_price
    }))
    const params={
      order_price,
      consignee_addr,
      goods
    }
    request({
      url:'/my/orders/create',
      method:"POST",
      data:params,
      header
    }).then(res=>{
      console.log(res)
      // 获取字符参数

      let order_number=res.order_number
      request({
        url:"/my/orders/req_unifiedorder",
        method:'POST',
        header,
        data:{order_number}
      }).then(res=>{
        // console.log(res)

       // 删除购物车中数据
       
       const cartList=wx.getStorageSync('cartList')

       let result=[]
       cartList.forEach(item=>{
           settleList.forEach(v=>{
             if(item.id !== v.id){
               result.push(item)
             }
           })
       })

       wx.setStorageSync('cartList', result)

        wx.navigateTo({
          url: '/pages/order/index',
        })


        // 发起支付请求
        // wx.requestPayment({
        //   nonceStr: '1',
        //   package: '1',
        //   paySign: '1',
        //   timeStamp: '1',
        //   complete(res){
        //     // console.log(res)
        //     //  查询后台订单状态
        //       request({
        //         url:'/my/orders/chkOrder',
        //         method:'POST',
        //         header,
        //         data:{order_number},
        //         success(res){
        //           console.log(res)
        //           wx.showToast({
        //             title: '支付成功',
        //             success(res){
        //               wx.navigateTo({
        //                 url: '/pages/order/index',
        //               })
        //             }
        //           })
        //         }

        //       })
        //   }
        // })

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