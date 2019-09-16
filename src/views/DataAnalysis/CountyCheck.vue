<template>
  <div class="AirStation">
    <!--区县考核-->
    <v-header></v-header>
    <!---->
    <div class="warp3">
      <el-tabs v-model="TitleName" @tab-click="">
        <el-tab-pane label="区县考核" name="first">
          <div class="kass">
            <div class="wbiaoti">
              <i class="el-icon-caret-right"></i>
              <a>查询条件</a>
            </div>
          </div>
          <div class="chaxuntiaojian">
            <div class="float001">
              <span>选择时间</span>
              <el-date-picker
                v-model="dateTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                class="SearchData">
              </el-date-picker>
            </div>
            <el-button class="SearchBtn" type="primary" @click="GetMonthCheck">查询</el-button>
          </div>

          <div class="shituquxian">
            <div class="kass">
              <div class="wbiaoti">
                <i class="el-icon-caret-right"></i>
                <a>市区组</a>
              </div>
            </div>
            <div id="main" style="width: 100%!important;height:400px!important;"></div>
            <div class="kass">
              <div class="wbiaoti">
                <i class="el-icon-caret-right"></i>
                <a>环京县市组</a>
              </div>
            </div>
            <div id="mainHuan" style="width: 100%!important;height:400px!important;"></div>

            <div class="kass">
              <div class="wbiaoti">
                <i class="el-icon-caret-right"></i>
                <a>南部县市组</a>
              </div>
            </div>
            <div id="mainNan" style="width: 100%!important;height:400px!important;"></div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {bus} from '@/js/bus.js'
  import api from '../../api/index'

  export default {
    name: 'AirStation',
    data() {
      return {
        pickerOptions0: {
//		            disabledDate(time) {
//		                return time.getTime() < Date.now() - 8.64e7;
//		            }
        },
        fullscreenLoading: false,
        //页面大标题
        TitleName: 'first',
        //详情数据
        gridData: [],
        //市区组数据
        shiQuData: [],
        shiQuxAxis:[],
        //环京县市组数据
        huanJingData: [],
        huanJingxAxis:[],
        //南部县市组数据
        nanBuData: [],
        nanBuxAxis:[],
        //选择日期
        dateTime: '',
        shiData:[],
      }
    },
    created() {
    },
    mounted() {
      this.GetMonthCheck();

    },
    methods: {
      //详情
      handleClick(row) {
//	        	console.log(row)
        this.gridData = [];
        this.gridData = row.details;
      },
      shiQu(data){
        //console.log(data)
        let Data = data;
        var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            // text: '累计进入倒排第一次数'
          },
          tooltip: {
            formatter: function (params) {
              //console.log(params);
              var paData = params.data.details;
              var rel = '';
              paData.forEach(item=>{
                rel+= `<tr class="tableBody" style=""><td>${item.gridname||'--'}</td><td>${item.detail||'--'}</td><td>${item.complexindex||'--'}</td></tr>`
              });
              var res=`
                   <table class="barTable">
                      <tr class="tableHead">
                        <th>乡镇</th>
                        <th>倒排详情</th>
                        <th>综合指数</th>
                      </tr>
                      ${rel}
                    </table>
                  `;
              return res;
            },
            backgroundColor:'#fff',
            textStyle:{
              color:'#000'
            }
          },
          legend: {
            // data:['销量']
          },
          xAxis: {
            data: this.shiQuxAxis
          },
          yAxis: {
            name:'累计进入倒排第一次数',
            type: 'value',
            min: 0,
            max: 8,
            interval: 1,
            splitLine:{show: false},//去除网格线
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: Data,
            barWidth:30,
            itemStyle:{
              normal:{
                color:'#39c3f8'
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      //环京县市组
      shiQuHuan(data){
        //console.log(data)
        let Data = data;
        var myChart = echarts.init(document.getElementById('mainHuan'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            // text: '累计进入倒排第一次数'
          },
          tooltip: {
            formatter: function (params) {
              //console.log(params);
              var paData = params.data.details;
              var rel = '';
              paData.forEach(item=>{
                rel+= `<tr class="tableBody"><td>${item.gridname||'--'}</td><td>${item.detail||'--'}</td><td>${item.complexindex||'--'}</td></tr>`
              });
              var res=`
                   <table class="barTable">
                      <tr class="tableHead" style="">
                        <th>乡镇</th>
                        <th>倒排详情</th>
                        <th>综合指数</th>
                      </tr>
                      ${rel}
                    </table>
                  `;
              return res;
            },
            backgroundColor:'#fff',
            textStyle:{
              color:'#000'
            }
          },
          xAxis: {
            data: this.huanJingxAxis
          },
          yAxis: {
            name:'累计进入倒排第一次数',
            type: 'value',
            min: 0,
            max: 8,
            interval: 1,
            splitLine:{show: false},//去除网格线
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: Data,
            barWidth:30,
            itemStyle:{
              normal:{
                color:'#39c3f8'
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      //南部县市组
      shiQuNan(data){
        //console.log(data)
        let Data = data;
        var myChart = echarts.init(document.getElementById('mainNan'));
        // 指定图表的配置项和数据
        var option = {
          title: {},
          tooltip: {
            formatter: function (params) {
              //console.log(params);
              var paData = params.data.details;
              var rel = '';
              paData.forEach(item=>{
                rel+= `<tr class="tableBody"><td>${item.gridname||'--'}</td><td>${item.detail||'--'}</td><td>${item.complexindex||'--'}</td></tr>`
              });
              var res=`
                 <table class="barTable">
                    <tr class="tableHead">
                      <th>乡镇</th>
                      <th>倒排详情</th>
                      <th>综合指数</th>
                    </tr>
                    ${rel}
                  </table>
                 `;
              return res;
            },
            backgroundColor:'#fff',
            textStyle:{
              color:'#000'
            }
          },
          xAxis: {
            data: this.nanBuxAxis
          },
          yAxis: {
            name:'累计进入倒排第一次数',
            type: 'value',
            min: 0,
            max: 8,
            interval: 1,
            splitLine:{show: false},//去除网格线
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: Data,
            barWidth:30,
            itemStyle:{
              normal:{
                color:'#39c3f8'
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      //获取区县考核列表数据
      GetMonthCheck() {
        let time = $('.el-input__inner').val();
        //let time = '2018-06-04';
        let t = this;
        t.shiQuxAxis=[];
        t.huanJingxAxis=[];
        t.nanBuxAxis=[];
        api.GetMonthCheck(time).then(res => {
          let allData = res.data.Data;
          t.shiQuData = [];
          t.huanJingData = [];
          t.nanBuData = [];
          let shiData = [];
          let huanData = [];
          let nanData = [];
          if (allData) {
            allData.forEach(item => {
              if (item.group == '市区组') {
                shiData.push(item);
                t.shiQuxAxis.push(item.gridname);
              }
              if (item.group == '环京县(市)组') {
                huanData.push(item);
                t.huanJingxAxis.push(item.gridname);
              }
              if (item.group == '南部县(市)') {
                nanData.push(item);
                t.nanBuxAxis.push(item.gridname);
              }
            });
            shiData.forEach(item => {
              item.value = item.lastonetime;
            });
            huanData.forEach(item => {
              item.value = item.lastonetime;
            });
            nanData.forEach(item => {
              item.value = item.lastonetime;
            });
            t.shiQu(shiData);
            t.shiQuHuan(huanData);
            t.shiQuNan(nanData);
          }
        })
      },
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .hasColor {
    color: #c1c1c1;
  }
  .barTable{
    width: 400px;
    .tableHead{
      height: 40px;
      line-height: 40px;
      background: #eee;
    }
    .tableBody{
      height: 40px;
      line-height: 40px;
    }
  }
  .AirStation {
    width: 100%;
    height: 100%;
    //title标题
    /*红圆*/
    .circleRed {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: red;
    }
    /*橙圆*/
    .circleOrange {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: orange;
    }
    .warp3 {
      width: 100%;
      padding:0 3%;
      height: calc(100% - 64px);
      overflow-y:auto;
      overflow-x: hidden;
      margin: 0 auto;
      .shituquxian {
        width: 100%;
        height: auto;
      }
      .genduo {
        width: 100%;
        height: 34px;
        border: solid 1px #ccc;
        margin-top: 15px;
        line-height: 34px;
        cursor: pointer
      }
      .kass {
        width: 100%;
        height: auto;
        .wbiaoti {
          i {
            color: #009688;
            font-size: 18px;
          }
          a {
            display: inline-block;
            height: 20px;
            /*border-left: solid 3px #428bca;*/
            /*padding-left: 13px;*/
            font-size: 16px;
            line-height: 20px;
            color: #009688;
          }
          .legend {
            float: right;
            margin-right: 30px;
          }
          text-align: left;
          border-bottom: solid 1px #ccc;
          width: 100%;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          margin-bottom: 20px;
          margin-left: 10px;
        }
      }
      .chaxuntiaojian {
        width: 100%;
        height: 50px;
        .float001 {
          margin-left: 20px;
          float: left;
        }
        .float002 {
          float: left;
          margin-left: 40px;
        }
        .float003 {
          float: left;
          margin-left: 40px;
        }
        .SearchBtn {
          float: left;
          margin-left: 20px;
        }
      }

    }
  }

</style>
