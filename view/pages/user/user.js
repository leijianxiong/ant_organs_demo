const app = getApp();

import { getMenuList, getUserInfo, login} from '../../api/user.js';
import { switchH5Login } from '../../api/api.js';
import authLogin from '../../utils/autuLogin.js';

import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '0',
      'title': '个人中心',
      'color': true,
      'class': '0'
    },
    userInfo:{},
    MyMenus:[],
    isGoIndex:false,
    iShidden:true,
    switchActive:false,
    loginType: app.globalData.loginType,
    orderStatusNum:{},
  },

  close:function(){
    this.setData({ switchActive:false});
  },
  /**
   * 授权回调
  */
  onLoadFun:function(e){
    this.getUserInfo();
    this.getMyMenus();
  },
  /**
   * 
   * 获取个人中心图标
  */
  getMyMenus: function () {
    var that = this;
    if (this.data.MyMenus.length) return;
    getMenuList().then(res=>{
      that.setData({ MyMenus: res.data.routine_my_menus });
    });
  },
  /**
   * 小程序设置
  */
  Setting:function(){
    wx.openSetting({
      success:function(res){
        console.log(res.authSetting)
      }
    });
  }, 
  /**
   * 获取个人用户信息
  */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      that.setData({ userInfo: res.data, loginType: res.data.login_type, orderStatusNum: res.data.orderStatusNum});
    });
  },
  /**
   * 页面跳转
  */
  goPages:function(e){
    if(app.globalData.isLog){
      if (e.currentTarget.dataset.url == '/pages/user_spread_user/index' && this.data.userInfo.statu==1) {
        if (!this.data.userInfo.is_promoter) return app.Tips({ title: '您还没有推广权限！！' });
      }
      if (e.currentTarget.dataset.url == '/pages/logon/index') return this.setData({ switchActive:true});
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }else{
      this.setData({ iShidden:false});
    }
  },
  /**
   * 切换账号
   * 
  */
  goLogin:function(){
    let that = this;
    if (this.data.loginType == 'h5'){
      authLogin('routine').then(res=>{
        that.getUserInfo();
        that.setData({ switchActive: false, loginType: 'routine' });
      });
    }else{
      wx.showLoading({title: '正在切换中'});
      switchH5Login().then(res=>{
        wx.hideLoading();
        app.globalData.token = res.data.token;
        app.globalData.expires_time = res.data.time;
        app.globalData.loginType = 'h5';
        app.globalData.userInfo = res.data.userInfo;
        that.getUserInfo();
        that.setData({ switchActive: false, loginType:'h5'});
      }).catch(err=>{
        return app.Tips({title:err});
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ MyMenus:app.globalData.MyMenus});
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ switchActive: false });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  onShow:function(){
    let that = this;
    if (app.globalData.isLog) this.getUserInfo();
  },

  /**
  * 生命周期函数--监听页面卸载
  */
  onUnload: function () {

  },
})