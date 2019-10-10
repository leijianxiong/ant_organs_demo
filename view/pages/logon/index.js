import { getLogo, phoneLogin, loginMobile, registerVerify, phoneRegister, phoneRegisterReset, switchH5Login} from '../../api/api.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '手机登录',
      'color': true,
      'class': '3'
    },
    formItem: 1,
    disabled: false,
    active: false,
    timetext: '获取验证码',
    navList: ['账号登录', '手机登录'],
    current: 0,
    logo_url:'',
  },
  inputgetName(e) {
    let that = this;
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    if (name.indexOf('.') != -1) {
      let nameList = name.split('.')
      if (that.data[nameList[0]]) {
        nameMap[nameList[0]] = that.data[nameList[0]]
      } else {
        nameMap[nameList[0]] = {}
      }
      nameMap[nameList[0]][nameList[1]] = e.detail.value
    } else {
      nameMap[name] = e.detail.value
    }
    that.setData(nameMap)
  },
  onLoadFun:function(){
    this.get_logo_url();
  },
  get_logo_url: function () {
    let that = this;
    if (wx.getStorageSync('logo_url')) return this.setData({ logo_url: wx.getStorageSync('logo_url') });
    getLogo().then(res => {
      wx.setStorageSync('logo_url', res.data.logo_url);
      that.setData({ logo_url: res.data.logo_url });
    });
  },
  navTap: function (e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  code: function (e) {
    let that = this;
    let name = e.currentTarget.dataset.name;
    if (!that.data[name]) return app.Tips({title:'请输入手机号码！'});
    if(!(/^1[3456789]\d{9}$/.test(that.data[name]))) return app.Tips({title:'请输入正确的手机号码！'});
    registerVerify(that.data[name]).then(res=>{
      that.setData({disabled: true,active: true});
      app.Tips({title:'发送成功',icon:'success'});
      let n = 60;
      let run = setInterval(function () {
        n --;
        if (n < 0) clearInterval(run);
        that.setData({timetext: "剩余 " + n + "s"})
        if (that.data.timetext < "剩余 " + 0 + "s") {
          that.setData({ disabled: false, active: false, timetext: '重新获取' })
        }
      }, 1000);
    }).catch(err=>{
      return app.Tips({title:err});
    });
  },
  /**
   * 手机号码注册
   * 
  */
  PhoneRegister:function(){
    let that = this;
    if (!this.data.account) return app.Tips({title:'请输入手机号码！'});
    if (!this.data.captcha) return app.Tips({title:'请输入验证码！'});
    if (!this.data.password) return app.Tips({title:'请输入密码！'});
    if (!this.data.qr_password) return app.Tips({title:'请输入确认密码！'});
    if (this.data.password != this.data.qr_password) return app.Tips({title:'两次输入的密码不一致！'});
    wx.showLoading({ title: '正在注册'})
    phoneRegister({
      account: this.data.account,
      captcha: this.data.captcha,
      password: this.data.password
    }).then(res=>{
      wx.hideLoading();
      that.setData({ formItem: 1, password: '', qr_password: '', captcha: '', account:''});
      return app.Tips({title:res.msg});
    }).catch(err=>{
      wx.hideLoading();
      return app.Tips({title:err});
    })
  },
  /**
   * 手机号码 + 密码登录 | 手机号码 + 验证码登录
   * 
  */
  login:function(){
    let that = this; 
    if (!that.data.account) return app.Tips({ title: '请输入手机号码' });
    if (!(/^1[3456789]\d{9}$/.test(that.data.account))) return app.Tips({ title: '请输入正确的手机号码！' });
    if (!this.data.current){
      if (!that.data.password) return app.Tips({title:'请输入登录密码'});
      wx.showLoading({ title: '正在登录' })
      switchH5Login({
        phone: that.data.account,
        password: that.data.password,
        'from':'routine'
      }).then(res=>{
        wx.hideLoading();
        app.globalData.token = res.data.token;
        app.globalData.expires_time = res.data.time;
        app.globalData.loginType = 'h5';
        app.globalData.userInfo = res.data.userInfo;
        return app.Tips({ title: res.msg }, { tab: 1, url: '/pages/user/user' });
      }).catch(err=>{
        wx.hideLoading();
        return app.Tips({ title: err });
      });
    }else{
      if (!that.data.captcha) return app.Tips({title:'请输入验证码'});
      wx.showLoading({ title: '正在登录' });
      switchH5Login({
        phone: that.data.account,
        captcha: that.data.captcha,
        'from':'routine'
      }).then(res=>{
        wx.hideLoading();
        app.globalData.token = res.data.token;
        app.globalData.expires_time = res.data.time;
        app.globalData.loginType = 'h5';
        app.globalData.userInfo = res.data.userInfo;
        return app.Tips({ title: res.msg }, { tab: 1, url: '/pages/user/user' });
      }).catch(err=>{
        wx.hideLoading();
        return app.Tips({ title: err });
      });
    }
  },
  /**
   * 修改密码
   * 
  */
  resetPwd:function(){
    if (!this.data.account) return app.Tips({ title: '请输入手机号码' });
    if (!(/^1[3456789]\d{9}$/.test(this.data.account))) return app.Tips({ title: '请输入正确的手机号码！' });
    if (!this.data.captcha) return app.Tips({ title: '请输入验证码' });
    if (!this.data.password) return app.Tips({ title:'请输入密码！'});
    if (!this.data.qr_password) return app.Tips({ title: '请输入确认密码！' });
    if (this.data.password != this.data.qr_password) return app.Tips({ title: '两次输入的密码不一致！' });
    let that = this;
    wx.showLoading({title: '正在修改密码' })
    phoneRegisterReset({
      account: this.data.account,
      captcha: this.data.captcha,
      password: this.data.password
    }).then(res=>{
      wx.hideLoading();
      that.setData({ formItem: 1, password: '', qr_password: '', captcha: '', account: '' });
      return app.Tips({ title: res.msg });
    }).catch(err=>{
      wx.hideLoading();
      return app.Tips({ title: err });
    })
  },

  register:function(){
    this.setData({
      formItem:2
    })
  },
  logon:function(){
    this.setData({
      formItem: 1
    })
  },
  forgetPwd: function () {
    this.setData({
      formItem: 3
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

  }

})