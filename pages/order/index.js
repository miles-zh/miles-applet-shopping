// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHeight:'',
    tabs:[
      {
        id:0,
        value:'全部订单',
        isActive:true
      },
      {
        id:1,
        value:'待付款',
        isActive:false
      },
      {
        id:2,
        value:'代发货',
        isActive:false
      },
      {
        id:3,
        value:'退货/退款',
        isActive:false
      }
    ],
    orders: [
      {
        order_id: 428,
        user_id: 23,
        order_number: "HMDD20190802000000000428",
        order_price: 13999,
        order_pay: 0,
        is_send: "否",
        trade_no: "",
        order_fapiao_title: "个人",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "广东省广州市海珠区新港中路397号",
        pay_status: "1",
        create_time: '2020-05-11 14:00',
        update_time: '2020-05-11 14:00',
        order_detail: null,
        goods: [
          {
            id: 717,
            order_id: 428,
            goods_id: 43986,
            goods_price: 13999,
            goods_number: 1,
            goods_total_price: 13999,
            goods_name: "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            goods_small_logo: "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
      },
      {
        order_id: 345,
        user_id: 20,
        order_number: "HMDD20190802000000000428",
        order_price: 13999,
        order_pay: 0,
        is_send: "否",
        trade_no: "",
        order_fapiao_title: "个人",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "广东省广州市海珠区新港中路397号",
        pay_status: "1",
        create_time: '2020-05-11 14:00',
        update_time: '2020-05-11 14:00',
        order_detail: null,
        goods: [
          {
            id: 717,
            order_id: 428,
            goods_id: 43986,
            goods_price: 13999,
            goods_number: 1,
            goods_total_price: 13999,
            goods_name: "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            goods_small_logo: "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
      }
    ]
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
    // 获取当前页面栈
    let pages=getCurrentPages()
    // console.log(pages)
    let type=pages[pages.length-1].options.type===undefined?1:pages[pages.length-1].options.type;
    // console.log(type)
    let {tabs}=this.data
    // let index = Number(type) - 1
    // console.log(index)
    tabs.forEach((item,i)=>{
      let index=++i;
      // console.log(index==type)
      index==type
      ?  
        item.isActive=true
      :
        item.isActive=false
      ;
    })
    // console.log(tabs)

    let {windowHeight,windowWidth}=wx.getSystemInfoSync()
    let contentHeight=windowHeight*750/windowWidth - 68.34 + 'rpx'

    this.setData({
      tabs,
      contentHeight
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