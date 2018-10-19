<template>
  <div style="background: #f5f5f5;padding-bottom: 30px">
    <Head-Top></Head-Top>
    <div class="top_title">
      <h3 style="color: #409EFF;width: 100px;display: flex;justify-content: flex-start;" class="head_h3">
        首页
      </h3>
      <div style="color: #409EFF;display: flex;justify-content: flex-start;font-size: 14px">
        日期：{{dateM}}
      </div>
    </div>
    <div class="echar_con" style="margin-top:0px;padding-top: 20px">
      <div class="chart" id="myChart1"></div>
      <div class="chart" id="myChart2"></div>
    </div>
    <div class="echar_con " style="margin-top:0px;padding-top: 20px">
      <div class="chart" id="myChart3"></div>
      <div class="chart" id="myChart4"></div>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../components/HeadTop'
  import {getHomeData} from "../api/getData";

  // let echarts = require('echarts/lib/echarts')
  // // 引入柱状图组件
  // require('echarts/lib/chart/bar')
  // require('echarts/lib/chart/line')
  // require('echarts/lib/chart/pie')
  // // 引入提示框和title组件
  // require('echarts/lib/component/tooltip')
  // require('echarts/lib/component/title')
  // require('echarts/lib/component/dataZoom')
  // require('echarts/lib/component/visualMap')
    export default {
        name: "Home",
        components: {
          HeadTop,
        },
      props: ['sevenDate', 'sevenDay'],
      data(){
        return{
          chart1:{
            xAxis:[],
            data:[]
          },
          chart2:{
            data:[
              {
                value:'',
                name:''
              }
            ]
          },
          chart3:{
            xAxis:[],
            data:[]
          },
          chart4:{
            data:[
              {
                value:'',
                name:''
              }
            ]
          },
          dateM:''
        }
      },
      methods: {

        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart1 = echarts.init(document.getElementById('myChart1'))
          let myChart2 = echarts.init(document.getElementById('myChart2'))
          let myChart3 = echarts.init(document.getElementById('myChart3'))
          let myChart4 = echarts.init(document.getElementById('myChart4'))
          // 绘制图表
          myChart1.setOption({
            title: { text: '金额变化走势图',left: 'center', top:0, textStyle: { color: '#0e8ad8'} },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              // type: 'category',
              data: this.chart1.xAxis
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              },
              splitLine: {
                show: true
              }
            },
            dataZoom: [{
              startValue: '2018-08'
            }, {
              type: 'inside'
            }],
            series: [{
              itemStyle: {
                normal: {
                  color: '#6ac7f2',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0)',
                  width:'100%',
                  height:400,
                  label : {show: true,position: 'outside'}
                }
              },
              name: '金额',
              type: 'line',
              data:this.chart1.data ,
              showSymbol:true,
              showAllSymbol:true,
            }
            ]
          });
          myChart2.setOption({

            title: { text: '各代理级别数量比例图',left: 'center', top: 0, textStyle: { color: '#0e8ad8'}},
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name:'各代理级别数量比例',
                type:'pie',
                // radius : '55%',
                center: ['50%', '60%'],
                data:this.chart2.data.sort(function (a, b) { return a.value - b.value; }),
                label: {
                  normal: {
                    textStyle: {
                      color: '#61bff5'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: '#1a1a1a'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    width:'100%',
                    height:400
                  }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ],
            color: ['#1945dc','#4becc0','#f09f2c','#ec4b80','#bf1bdc','#4bafec']
          });
          myChart3.setOption({

            title: { text: '会员数量直方图',left: 'center', top: 0, textStyle: { color: '#0e8ad8'}},

            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            dataZoom: [{
              // start: 50,
              startValue: '2018-08',
              // endValue:'2018-09',
            }, {
              type: 'inside'
            }],
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : this.chart3.xAxis,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'会员数量',
                type:'bar',
                barWidth: '60%',
                data:this.chart3.data,
                label: {
                  normal: {
                    show: true,
                    position: 'outside'
                  }
                },
              }
            ]
          });
          myChart4.setOption({

            title: { text: '各省会员数量比例图',left: 'center', top: 0,textStyle: { color: '#0e8ad8'}},
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series : [
              {
                name:'各省会员数量比例',
                type:'pie',
                // radius : '55%',
                center: ['50%', '60%'],
                data:this.chart4.data.sort(function (a, b) { return a.value - b.value; }),
                label: {
                  normal: {
                    textStyle: {
                      color: '#61bff5'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: '#1a1a1a'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    width:'100%',
                    height:400
                  },
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ],
            color: ['#1945dc','#4becc0','#f09f2c','#ec4b80','#bf1bdc','#4bafec']
          });
        }
      },
      mounted(){

        getHomeData()
          .done(res=>{
            let {diagram1,diagram2,diagram3,diagram4}=res

            this.dateM=`${this.$_.last(diagram1).month}月份`
              for(let item of diagram1){
                this.chart1.data.push(item.sumMoney)
                this.chart1.xAxis.push(item.month)
              }
            diagram2=diagram2.filter(item=>item.userType!=-1)
              for(let item of diagram2){
                item.value=item['COUNT(user_id)']
                if(item.userType==0){
                  item.name='注册会员'
                }
                if(item.userType==1){
                  item.name='省级代理'
                }
                if(item.userType==2){
                  item.name='市级代理'
                }
                if(item.userType==3){
                  item.name='县级代理'
                }
                if(item.userType==4){
                  item.name='VIP代理'
                }
                if(item.userType==5){
                  item.name='商务代理'
                }
                if(item.userType==6){
                  item.name='体验代理'
                }
              }
              this.chart2.data=diagram2
        //第三图
            for(let item of diagram3){
              this.chart3.data.push(item.count)
              this.chart3.xAxis.push(item.month)
            }
      //第四图
            diagram4=diagram4.filter(item=>item.count!=0)
            for(let item of diagram4){
              item.value=item.count
              item.name=item.provinceName
            }
            this.chart4.data=diagram4
            this.drawLine();
          })
      }
    }
</script>

<style lang="less" scoped>
  .top_title{
    height: 50px;
    border-radius: 10px;
    background: #fff;
    margin: 20px 50px 20px 20px;
    display: flex;
    align-items: center;
    padding:0 20px;
    justify-content: space-between;
  }
  .echar_con{
    margin: 20px 50px 20px 20px;
    overflow: hidden;
    background: #fff;
    padding-top: 10px;
  }
  .chart{
    margin-left: 20px;
    width: 45%;
    height: 400px;
    float: left;
  }
</style>
