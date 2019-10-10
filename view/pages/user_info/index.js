import { getUserInfo, userEdit} from '../../api/user.js';
import { setFormId } from '../../api/api.js';
import util from '../../utils/util.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '个人资料',
      'color': true,
      'class': '0'
    },
    userInfo:{},
    loginType: 'h5',//app.globalData.loginType
  },
  /**
   * 授权回调
  */
  onLoadFun:function(){
    this.getUserInfo();
  },

  /**
   * 退出登录
   * 
  */
  outLogin:function(){
    if (this.data.loginType == 'h5'){
      app.globalData.token = '';
      app.globalData.isLog = false;
      app.globalData.userInfo = {};
      app.globalData.expiresTime = 0;
      wx.showLoading({
        title: '正在退出登录',
      });
      return wx.switchTab({
        url: '/pages/index/index',
        success: function () {
          wx.hideLoading();
        }
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getPhoneNumber:function(e){
    var detail = e.detail, cache_key = wx.getStorageSync('cache_key'),that=this;
    if (detail.errMsg =='getPhoneNumber:ok'){
      if (!cache_key){
        app.globalData.token='';
        app.globalData.isLog=false;
        return false;
      }

    
      
    }else{
      app.Tips({ title:'取消授权'});
    }
  },

  /**
   * 获取用户详情
  */
  getUserInfo:function(){
    var that=this;
    getUserInfo().then(res=>{
      that.setData({ userInfo: res.data });
    });
  },

  /**
  * 上传文件
  * 
 */
  uploadpic: function () {
    var that = this;
    util.uploadImageOne('upload/image', function (res) {
      that.setData({ 'userInfo.avatar': res.data.url });
    });
  },

  /**
   * 提交修改
  */
  formSubmit:function(e){
    var that = this, value = e.detail.value, formId = e.detail.formId;
    if (!value.nickname) return app.Tips({title:'用户姓名不能为空'});
    value.avatar = that.data.userInfo.avatar;
    setFormId(formId);
    userEdit(value),then(res=>{
      return app.Tips({ title: res.msg, icon: 'success' }, { tab: 3, url: 1 });
    }).catch(msg=>{
      return app.Tips({ title: msg || '保存失败，您并没有修改' }, { tab: 3, url: 1 });
    });
  },

  

})