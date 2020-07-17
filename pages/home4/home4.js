import * as echarts from '../../ec-canvas/echarts' 
const axios = require('../../utils/axios.js')
function initChart(canvas, width, height) {
  const url ='/admin/big_data/humidity_count';
  const body = {
    access_token:'aaaa'
  }
  axios.post(url,body).then((res)=>{
// console.log(res.data);
let xAxis_data=res.data.map((item)=>{
  // console.log(item.year);
  return item.year;
  })
  let yAxiswin_data=res.data.map((item)=>{
    // console.log(item.value);
    return item.value;
    })
    let yAxisshi_data=res.data.map((item)=>{
      // console.log(item.id);
      return item.id;
      })

const chart = echarts.init(canvas, null, {
  width: width,
  height: height
});
canvas.setChart(chart);

var option = {
  color: ['#3398DB','#90EE90'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
    }
},
  title:{
    text:'温湿度曲线',
    top:10,
    left:10
  },
  xAxis: {
    type: 'category',
    axisLabel: {    
      interval: 1,   
          rotate: 60,
     },
    data: xAxis_data
},
yAxis: [
    {
      type:'value',
      
    },
    {
      type:'value',
      
      // inverse:true
    }
],
series: [
  {
    name: '温度',
    data: yAxiswin_data,
    type: 'line',
    yAxisIndex: 0,
    smooth: true
},
{
  name: '湿度',
  data:yAxisshi_data,
  type:'line',
  yAxisIndex: 1,
  smooth: true
  }

]
  
};

chart.setOption(option);
return chart;

  })

}







function onitChart(canvas, width, height) {
  const url ='/admin/big_data/aqi_count';
  const body = {
    access_token:'aaaa'
  }
  axios.post(url,body).then((res)=>{
    console.log(res.data);
    let xAxis_data=res.data.map((item)=>{
      // console.log(item.year);
      return item.year;
      })
      let yAxis_data=res.data.map((item)=>{
        // console.log(item.value);
        return item.value;
        })
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
      color: ['#3398DB'],
      title:{
        text:'空气质量曲线',
        top:10,
        left:10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
      xAxis: {
        type: 'category',
        axisLabel: {    
          interval: 1,   
          rotate: 60,
  
         },
        alignWithLabel: true,
        data: xAxis_data
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name:'质量指数',
        data:  yAxis_data,
        type: 'line',
        smooth: true,
        
        
    }]
    };
    
    chart.setOption(option);
    return chart;
  })


 
  
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: onitChart
    },
    
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