// pages/goods_detail/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsId: null,
    isCollected:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const id = Number(options.id)
    this.setData({
      goodsId: id
    },function(){
      
      const collectList=wx.getStorageSync('collectList') || []
      let index=collectList.findIndex(item=>item.id === this.data.goodsId)
      if(index === -1){
        this.setData({
          isCollected:false
        })
      }else{
        this.setData({
          isCollected:true
        })
      }

    })
    this.getGoodsDetail(id)
    
    





  },
  getGoodsDetail(id) {
    request({
      url: '/goods/detail', data: {
        goods_id: id
      }
    }).then(res => {
      // console.log(res)

      let pics=res.data.message.pics
      if(pics.length===0) {
        pics[0]={
          pics_mid:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1589843220&di=bfe35fafca44c25830c68b5b56f5d855&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg'
        }
      }

      let obj = {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        // iphone部分手机不支持webp图片格式
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics
      }



      this.setData({
        goodsDetail: obj,

      })
    })
  },
  previewImg(e) {
    // console.log(e)
    let imgArr = []
    this.data.goodsDetail.pics.forEach(item => {
      imgArr.push(item.pics_mid)
    })
    // console.log(imgArr)
    wx.previewImage({
      current: e.target.dataset.url,
      urls: imgArr
    })
  },
  joinCart() {
    console.log(this.data.goodsId)

    let cart = wx.getStorageSync('cartList') || []
    let goodsInfo = {
      goods_name: this.data.goodsDetail.goods_name,
      goods_price:this.data.goodsDetail.goods_price,
      goods_img:this.data.goodsDetail.pics[0].pics_sma,
    }
    goodsInfo.id = this.data.goodsId
    goodsInfo.isSelected=false
    let index = cart.findIndex(item => {
      return item.id == goodsInfo.id
    })

    if (index === -1) {
      goodsInfo.cartCount = 1
      cart.push(goodsInfo)
    } else {
      cart[index].cartCount++
    }
    wx.setStorageSync('cartList', cart)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true

    })

  },
  collectGoods(){
    // console.log(this.data.isCollected)
    const collectList=wx.getStorageSync('collectList')||[]
    let index=collectList.findIndex(item=>item.id === this.data.goodsId)
    console.log(index)
    if(index !== -1){
      collectList.splice(index,1)
      this.setData({
        isCollected:false
      })
    }else{
      let cartlist=this.data.goodsDetail
      cartlist.id=this.data.goodsId
      collectList.push(cartlist)
      this.setData({
        isCollected:true
      })

    }

    wx.setStorageSync('collectList', collectList)
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