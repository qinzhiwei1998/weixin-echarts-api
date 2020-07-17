const baseURL = 'https://api.inno-we.cn:10001';

module.exports = {
  post: function(url,body){
    return new Promise((callBack, reject)=>{
      wx.request({
        url: baseURL + url,
        method:'POST',
        data: body,
        success:(res)=>{
          const r = res.data;
          callBack(r);
        },
        fail:(e)=>{
          reject(e);
        }
      })
    })
  },
  postWithToken: function (url, body = {}){
    body.access_token = wx.getStorageSync('access_token');
    // body.access_token = "aaaa";
    return new Promise((callBack, reject) => {
      wx.request({
        url: baseURL + url,
        method: 'POST',
        data: body,
        success: (res) => {
          const r = res.data;
          callBack(r);
        },
        fail: (e) => {
          reject(e);
        }
      })
    })
  },
  uploadFile: function(url, body, filePath){
    body.access_token = wx.getStorageSync('access_token');
    return new Promise((callBack, reject) => {
      wx.uploadFile({
        url: baseURL + url,
        filePath,
        name: 'file',  
        formData: body,
        success(res) {
          callBack(res);
        },
        fail:(res)=>{
          reject(res)
        }
      })
    });
  },
  uploadFiles: function(url, body,files){
    const tasks = files.map((file)=>{
      return this.uploadFile(url,body,file);
    });
    return Promise.all(tasks); 
  },
  
}