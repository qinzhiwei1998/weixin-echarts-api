// pages/home/home.js
import * as echarts from '../../ec-canvas/echarts' 
const axios = require('../../utils/axios.js')
function initChart(canvas, width, height) {

  const url ='/admin/big_data/height_count';
  const body = {
    access_token:'aaaa'
  }
  axios.post(url,body).then((res)=>{
    // console.log(res.data);
    let xAxis_data=res.data.map((item)=>{
      // console.log(item.height);
      return item.height;
      })
    // console.log(xAxis_data);
    let yAxis_data=res.data.map((item)=>{
      // console.log(item.count);
      return item.count   
    })
    // console.log(yAxis_data);
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
      title:{
        text:'树高分别柱状图',
        top:10,
        left:10
      },
      color: ['#3398DB'],
      tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          { 
              data:xAxis_data,
              type: 'category',
              axisLabel: {    
                interval: 1,   
          rotate: 60,
        
               },
             
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '直接访问',
              type: 'bar',
              barWidth: '50%',
              data: yAxis_data
          }
      ]
    };
    
    chart.setOption(option);
    return chart;
  })

 
  
}




function onitChart(canvas, width, height) {
  const url ='/admin/big_data/tree_name_count1';
  const body = {
    access_token:'aaaa'
  }
  axios.post(url,body).then((res)=>{
    console.log(res.data);
    let xAxis_data=res.data.map((item)=>{
      console.log(item.item);
      return item.item;
      })
      let count_data=res.data.map((item)=>{
        console.log(item.count);
        return item.count;
        })
        let percent_data=res.data.map((item)=>{
          console.log(item.percent);
          return item.percent;
          })
      var count_data1=[]
      for (let i = 0 ; i< count_data.length;i++){
        count_data1[i] = xAxis_data[i]+" "+count_data[i]+'棵'+parseInt(percent_data[i]*100)+'% ';

      }
      var dw = []
      for (let c=0; c<count_data1.length;c++){
        dw[c]=
        {
          value:0,
          name:''
        }
        for (let s = 0;s<2;s++){
          dw[c].value=count_data[c]
          dw[c].name = count_data1[c]
        }
      }
      let color_data=res.data.map((item)=>{
        return item.color
      })
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
      title:{
        text:'树种分别图',
        top:10,
        left:10
      },
      color:color_data,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        right: 10,
        top:60,
        data: count_data1
    },
    series: [
        {
          right:110,
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '80%'],
            center:['40%','50%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            
            data: dw
           
        }
    ]
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
    }
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