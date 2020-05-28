// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'体验问',
        isActive:true
      },
      {
        id:1,
        value:'商品 / 商家投诉',
        isActive:false
      }
     
    ],
    selectedImgs:[],
    contentValue:''
  },
  tabsItemChange(e){
    const index=e.detail.index
    let {tabs}=this.data
    tabs.forEach((item,i)=>i===index?item.isActive=true:item.isActive=false)
    this.setData({
      tabs
    })
  },
  deleteImg(e){
    console.log(e)
    let index=e.target.dataset.itemindex
    console.log(e)
    let {selectedImgs} = this.data
    selectedImgs.splice(index,1)

    this.setData({
      selectedImgs
    })

  },
  uploadImg(){
    wx.chooseImage({
      success: (res) => {
        // console.log(res)
        this.setData({
          selectedImgs:[...this.data.selectedImgs,...res.tempFilePaths]
        })
      },
    })
  },

  submitContent(){
   let text=this.data.contentValue.trim()

   if(!text){
     wx.showToast({
       title: '请输入内容',
       mask:true
     })
     return
   }

   let imgs=this.data.selectedImgs

  //  上传图片到服务器
  // 不支持多张图片上传

  imgs.forEach((item,i)=>{
    wx.uploadFile({
      filePath: item,
      // 文件名
      name: 'file'+i,
      // 上传的服务器地址
      url: 'http://up.imgapi.com/',
      data:{
        deadline:new Date().getTime()+60,
        aid:1642127,
        from:'web'
      },
      header:{
        Token:'91177a605aa2fdaec3eb33dd0ac9db83dec51b72:3vSAMUEY8RHD34LKpfntolXk42U=:eyJkZWFkbGluZSI6MTU4OTgwODM4NiwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzAyODE0IiwiYWlkIjoiMTY0MjEyNyIsImZyb20iOiJmaWxlIn0'
      },
      success(res){
        console.log(res)
      }
    })
  })

  this.setData({
    contentValue:'',
    selectedImgs:[]
  })

  

  },

  getContentValue(e){
    // console.log(e)
    let v=e.detail.value
    this.setData({
      contentValue:v
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