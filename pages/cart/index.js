// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:{},
    cartList:[],
    isCheckedAll:false,
    totalPrice:0,
    totalCount:0,
    operationText:'管理',
    contentHeight:''
  },

  setContentHeight(){
    const {windowHeight,windowWidth}=wx.getSystemInfoSync()
    console.log(windowHeight)

    let contentHeight=windowHeight*750/windowWidth - 137 - 90 - 90 + 'rpx'

    this.setData({
      contentHeight,
    })

  },

  addRecieveAddress(){
    // 获取用户权限状态
    wx.getSetting({
      success: (res1) => {
        const scopeAddress=res1.authSetting['scope.address']
        if(scopeAddress ===true  || scopeAddress === undefined){
          wx.chooseAddress({
            success: (res2) => {
              this.setAddressInfo(res2)
            },
          })
        }else{
          // 诱导用户打开授权界面授权
          wx.openSetting({
            success:(res3)=>{
              wx.chooseAddress({
                success: (res4) => {
                  this.setAddressInfo(res4)
                },
              })
            }
          })
        }

      },
    })
  },

  setAddressInfo(res){
    let addressInfo={
      name:res.userName,
      phone:res.telNumber,
      address:res.provinceName+res.cityName+res.countyName+res.detailInfo
    }
    wx.setStorageSync('addressInfo',addressInfo)
    this.setData({
      addressInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setContentHeight()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 全选商品
  checkedAll(){
    this.setData({
      isCheckedAll:!this.data.isCheckedAll
    },function(){
      // console.log(this.data.isCheckedAll)
      let arr=[]
     
      arr=this.data.cartList.map(item=>{
        item.isSelected=this.data.isCheckedAll
        return item
      })
      
      this.setData({
        cartList:arr
      },function(){
        this.calculateTotalPriceCount()
      })
    })
  },

  deleteCartList(e){
    let operateText=e.target.dataset.text
    let _this=this
    let {cartList}=this.data
    if(operateText === '管理'){
      this.setData({
        operationText:'删除'
      })
    }else{

      if(cartList.length === 0) {
        wx.showToast({
          title: '选择要删除的商品',
        })
        return
      };


      wx.showModal({
        title:'商品移除购物车',
        content:"是否将选中商品从购物车中移除？",
        success(res){
          if(res.confirm){
            let arrStorage=[],
            arrShow=[]

            cartList.forEach(item=>{

              if(item.isSelected){
                item.cartCount=1
                arrStorage.push(item)
              }else{
                arrShow.push(item)
              }
            })
            arrStorage.length===cartList.length
            ?
              wx.removeStorageSync('cartList')
            :
            wx.setStorageSync('cartList', arrStorage);
            _this.setData({
              cartList:arrShow,
              operationText:'管理',
              isCheckedAll:false
            })
            _this.calculateTotalPriceCount()
            
          }
        }

      })
    }
  },

  // 选择商品
  selectedItem(e){
    let id=e.target.dataset.id
    console.log(id)
    let arr=this.data.cartList
    let index=arr.findIndex(item=>{
      return item.id===id
    })
    arr[index].isSelected=!arr[index].isSelected
    let status  = arr.every(item=>{
      return item.isSelected === true
    })
    this.setData({
      isCheckedAll:status,
      cartList:arr
    },function(){
      this.calculateTotalPriceCount()
    })
  },

  decrement(e){
    // console.log(e)
    let id=e.target.dataset.id
    // console.log(id)
    let arr=this.data.cartList
    let index=arr.findIndex(item=>{
      return item.id===id
    })
    
    arr[index].cartCount>1?arr[index].cartCount--:arr[index].cartCount=1;
    this.setData({
      cartList:arr
    },()=>{
      this.calculateTotalPriceCount()
    })
  },
  increment(e){
    // console.log(e)
    let id=e.target.dataset.id
    // console.log(id)
    let arr=this.data.cartList
    let index=arr.findIndex(item=>{
      return item.id===id
    })
    arr[index].cartCount++;
    this.setData({
      cartList:arr
    },()=>{
      this.calculateTotalPriceCount()
    })
  },
  calculateTotalPriceCount(){
    let totalPrice=0,
    totalCount=0;
    this.data.cartList.forEach(item=>{
      if(item.isSelected){
        totalCount++;
        totalPrice += item.cartCount*item.goods_price
      }
    })
    this.setData({
      totalCount,

      totalPrice
    })
  },

  goSettle(){
    if(!this.data.addressInfo.address){
      wx.showToast({
        title: '请添加收货地址',
      })
      return
    }
    if(this.data.totalCount === 0){
      wx.showToast({
        title: '请选择需要购买的商品',
      })
      return
    }
    let {cartList}=this.data,arr=[];
    cartList.forEach(item=>{
      if(item.isSelected){
        arr.push(item)
      }
    })
    // console.log(arr.toString())
    wx.navigateTo({
      url: '/pages/pay/index?settleGoods=' + JSON.stringify(arr),
    })
  },

  onShow: function () {
    const addressObj=wx.getStorageSync('addressInfo') || {}
    // console.log(JSON.stringify(addressObj))
    const cartList=wx.getStorageSync('cartList') || []
    
    

    this.setData({
      addressInfo:addressObj,
      cartList
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