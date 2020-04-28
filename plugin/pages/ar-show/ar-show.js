import {
  _loadARData
} from '../../utils/loadARData'
import * as THREE from '../../utils/three.weapp';
import arLoader from '../../utils/arLoad'
import config from '../../utils/config.js'

Page({
  data: {
    wid: '',
    hei: ''
  },
  onLoad: function() {
    const info = wx.getSystemInfoSync();
    this.setData({
      wid: info.screenWidth,
      hei: info.screenHeight
    })

  },
  onShow() {
    var that = this
    this.getToken().then(token => {
      that.loadARData().then(arData => {
        const query = wx.createSelectorQuery().in(that)
        query.select('#canvas')
          .node()
          .exec(res => {
            const canvas = new THREE.global.registerCanvas(res[0].node);
            arLoader(canvas, THREE, arData)
          });
      })
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取token
  getToken() {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('ar-token')
      if (!token) {
        wx.request({
          url: config.APIROOT + '/account/signin',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: {
            account: '16675690867',
            password: '123456'
          },
          success: function(res) {
            if (res && res.data && res.data.token) {
              wx.setStorageSync('token', res.data.token)
              resolve(res.data.token)
            } else {
              reject()
            }
            resolve(res)
          },
          fail(err) {
            reject(err)
          }
        })
      } else {
        resolve(token)
      }
    })
  },
  // 加载数据
  loadARData() {
    return new Promise((resolve, reject) => {
      var that = this
      _loadARData().then((res) => {
        resolve(res)
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'none'
        });
        reject()
      })
    })
  },
  touchStart(e) {
    console.log('canvas', e);
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e, this);
  },
  touchMove(e) {
    console.log('canvas', e);
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e, this);
  },
  touchEnd(e) {
    console.log('canvas', e);
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e, this);
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
  }
});