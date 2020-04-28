import config from './config.js'

export function _loadARData(id) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.APIROOT + '/api/resource/info/' + id,
      header: {
        "token": wx.getStorageSync('ar-token')
      },
      success: function(res) {
        const data = res.data
        if (data.retCode == 0) {
          if (data && data.item) {
            resolve(data.item)
          } else {
            reject('未编辑 AR 效果')
          }
        } else {
          reject('错误码：' + +data.retCode)
        }
      },
      error: function() {
        reject('网络或页面异常')
      },
    })
  })
}