<template>
  <!--监测点面板-->
  <div class="main">
    <!--选项查询-->
    <div class="first">
      <div class="tables">
        <!--选项-->
        <a id="shishi" @click="RealTimeFatchtoo()" class="bai">实时</a>
        <a id="leiji" @click="CumulativeFatchtoo()">累计</a>
        <font class="time2">更新时间：{{NewUptime}}</font>
      </div>
    </div>
    <!--详细天气-->
    <div class="tqbiaoti">广阳区空气质量</div>
    <strong v-if="tianqiyuji" class="strong">今日空气质量预计为：{{Datalist.quality}}</strong>

    <div class="Second">
      <div class="tianqi">
        <!--天气-->
        <div class="tqbj">
          <img class="beijing" :src="'static/imgs/weather/'+ (Datalist.weather || '晴')+'.png'" :title="Datalist.weather">
        </div>
        <p>温度：{{Datalist.temp}}°C</p>
        <p>湿度：{{Datalist.humi}}%</p>
        <p>风力：{{Datalist.wl}}{{Datalist.wd}}</p>
        <p>降雨量：{{Datalist.rain}}mm</p>
      </div>
      <div class="yuanjindu">
        <div class="jdflaot">
          <div id="main_x" style="width: 90px;height: 90px"></div>
          <div class="texts">{{Datalist.aqi}}</div>
          <p>小时AQI</p>
        </div>
        <div class="jdflaot">
          <div id="main_y" style="width: 90px;height: 90px"></div>
          <div class="texts">{{Datalist.aqiAccu}}</div>
          <p>当日累计AQI</p>
        </div>
        <div class="jdflaot">
          <div id="main_z" style="width: 90px;height: 90px"></div>
          <div class="texts">{{Datalist.ComplexIndex}}</div>
          <p>小时综合指数</p>
        </div>
      </div>
      <div class="ph" style="margin-bottom:4px" v-show="shishi">
        <ul>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetPM25LevelIndex(Datalist.pm25)),color:Datalist.pm25 > 100?changeColor:''}">PM2.5</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetPM10LevelIndex(Datalist.pm10)),color:Datalist.pm10 > 150?changeColor:''}">PM10</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetSO2LevelIndex(Datalist.so2)),color:Datalist.so2 > 150?changeColor:''}">SO2</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetCOLevelIndex(Datalist.co)),color:Datalist.co > 150?changeColor:''}">CO</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetNO2LevelIndex(Datalist.no2)),color:Datalist.no2 > 100?changeColor:''}">NO2</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetO3LevelIndex(Datalist.o3)),color:Datalist.o3 > 150?changeColor:''}">O3</li>
        </ul>
        <ol>
          <li>{{Datalist.pm25}}</li>
          <li>{{Datalist.pm10}}</li>
          <li>{{Datalist.so2}}</li>
          <li>{{Datalist.co}}</li>
          <li>{{Datalist.no2}}</li>
          <li>{{Datalist.o3}}</li>
        </ol>
      </div>
      <div class="ph" style="margin-bottom:4px" v-show="leiji">
        <ul>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetPM25LevelIndex(Datalist.pm25))}">PM2.5</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetPM10LevelIndex(Datalist.pm10))}">PM10</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetSO2LevelIndex(Datalist.so2))}">SO2</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetCOLevelIndex(Datalist.co))}">CO</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetNO2LevelIndex(Datalist.no2))}">NO2</li>
          <li :style="{background:ROOTgetColorByIndex(ROOTgetO3LevelIndex(Datalist.o3))}">O3</li>
        </ul>
        <ol>
          <li>{{CumulativeData.pm25}}</li>
          <li>{{CumulativeData.pm10}}</li>
          <li>{{CumulativeData.so2}}</li>
          <li>{{CumulativeData.co}}</li>
          <li>{{CumulativeData.no2}}</li>
          <li>{{CumulativeData.o3}}</li>
        </ol>
      </div>
    </div>
    <!--选择项-->
    <div class="xuanzetbs">
      <div style="margin-top:0px">
        <el-radio-group v-model="shiquradio" size="small" @change="getMonitoring">
          <el-radio-button label="全市"></el-radio-button>
          <el-radio-button label="广阳区"></el-radio-button>
        </el-radio-group>
      </div>

      <div style="margin-top: 6px">
        <el-radio-group v-model="shibaoradio" size="small" @change="getMonitoring">
          <el-radio-button label="日报"></el-radio-button>
          <el-radio-button label="月报"></el-radio-button>
          <el-radio-button label="年报"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <!--table表格-->
    <div class="table">
      <el-table :data="tableData" :row-class-name="tableRowClassName" border @current-change="RowCurrentChange" style="width: 100%">
        <el-table-column prop="ranking" label="排名" width="52"></el-table-column>
        <el-table-column prop="pointname" label="国省控点" width="150"></el-table-column>
        <el-table-column prop="pointlevel" label="空气质量等级" width="75"></el-table-column>
        <el-table-column prop="aqi" :label="labelType" width="60"></el-table-column>
        <el-table-column prop="PrimaryPollutant" label="首要污染物"></el-table-column>
      </el-table>
      <!---->
    </div>
  </div>
</template>

<script>
  import {bus} from '@/js/bus.js'
  import api from '../api/index'
  export default {
    name: 'monitoring',
    data() {
      return {
        //
        shiquradio: '全市',
        //
        shibaoradio: '日报',
        //默认选中国控点
        activeName: 'guokongdian',
        //
        changeColor: '#fff',
        //tables数据
        ptType: '国控点',
        //
        type: 'AQI',
        //
        labelType: 'AQI',
        //
        ClabelType: 'AQI',
        //国省控点排名
        tableData: [],
        //京津冀排名
        tableCityData: [],
        //区县数据
        DistrictCountyData: [],
        //
        allData: [],
        //
        value1: '',
        //
        histrData: '',
        //
        value2: '',
        //实时数据
        Datalist: {},
        //预计天气状态
        tianqiyuji: true,
        //累计数据
        CumulativeData: {},
        //实时展示
        shishi: true,
        //累计展示
        leiji: false,
        //更新数据
        NewUptime: '',
      }
    },
    created() {
      this.getMonitoring();
    },
    mounted() {
      //右侧收放
      const _this = this;
      //实时累计切换样式
      $('.first .tables a').on('click', function () {
        $(this).addClass('bai').siblings().removeClass('bai')
      })
      //列表1
      api.GetLfAirData().then(res => {
        let shoulist = res.data.Data;
        this.Datalist = shoulist;
        console.log(shoulist);
        // 跟新时间
          _this.newUptimesData(_this.Datalist.time);
        //小时AQI
          _this.GetHourAPIcolortu();
        //小时累计AQI
          _this.GetCumulativeAPIcolortu();
        //小时综合指数
          _this.GetcompositeIndexcolortu();
      })
    },
    methods: {
      //跟新数据时间
      newUptimesData(times) {
        //
        let timevale = times.replace("T", " ");
        let keytime = timevale.replace("Z", " ");
        this.NewUptime = keytime;
      },
      //排序
      compare(propertyName) {
        return function (object1, object2) {
          let value1 = object1[propertyName];
          let value2 = object2[propertyName];
          return value2 - value1
        }
      },
      //列表数据
      getMonitoring() {
        let cityType;
        let t = this;
        switch (this.shiquradio) {
          case '全市':
            cityType = '1';
            break;
          case '广阳区':
            cityType = '2';
            break;
        }
        let dataType;
        switch (this.shibaoradio) {
          case '日报':
            dataType = '1';
            break;
          case '月报':
            dataType = '2';
            break;
          case '年报':
            dataType = '3';
            break;
        }
        api.GetMonitoringRank(cityType, dataType).then(res => {
          // console.log(res)
          let result = res.data.Data;
          let i = 1;
          t.tableData = [];
          result.forEach(item => {
            let table = {};
            table.ranking = i++;
            table.pointname = item.pointname || '--';
            table.pointlevel = getQualityByAqi(item.aqi) || '--';
            table.aqi = item.aqi || '--';
            table.PrimaryPollutant = item.primaryPollution || '--';
            t.tableData.push(table);
          })

        })
      },
      //table点击事件
      RowCurrentChange(val) {
      },
      //渲染
      switchRender(type) {
      },
      //转列表显示值
      Tochangelabeltype(type) {
        let rtValue = type;
        //
        switch (type.toUpperCase()) {
          case 'AQI':
            rtValue = 'AQI';
            break;
          case 'PM25':
            rtValue = 'PM2.5';
            break;
          case 'PM10':
            rtValue = 'PM10';
            break;
          case 'SO2':
            rtValue = 'SO2';
            break;
          case 'NO2':
            rtValue = 'NO2';
            break;
          case 'CO':
            rtValue = 'CO';
            break;
          case 'O3':
            rtValue = 'O3';
            break;
          case 'COMPLEXINDEX':
            rtValue = '综指';
            break;
          case 'TEMP':
            rtValue = '温度';
            break;
          case 'HUMI':
            rtValue = '湿度';
            break;
          case 'WINDANGLE':
            rtValue = '风向';
            break;
          case 'WINDSPEED':
            rtValue = '风力';
            break;
        }
        return rtValue;
      },
      //
      getPollution(type) {
        let rtValue = type;
        switch (type.toUpperCase()) {
          case 'PM2.5':
            rtValue = 'pm25';
            break;
          case 'INDEX':
            rtValue = 'complexindex';
            break;
          case 'WS':
            rtValue = 'windspeed';
            break;
          case 'WD':
          case 'WINDANGLE':
            rtValue = 'winddirection';
            break;
        }
        return rtValue;
      },
      //
      getPollutionTarget(type) {
        let rtValue = type;
        switch (type.toUpperCase()) {
          case 'INDEX':
            rtValue = '综指';
            break;
          case 'TEMP':
            rtValue = '温度';
            break;
          case 'HUMI':
            rtValue = '湿度';
            break;
          case 'WS':
            rtValue = '风级';
            break;
          case 'WD':
            rtValue = '风向';
            break;
        }
        return rtValue;
      },
      //切换
      handleClick(tab, event) {
        this.ptType = tab.label;
      },
      //圆图api
      GetHourAPIcolortu() {
        let Datavlue = 500 - this.Datalist.aqi;
        let Bianvlue = this.Datalist.aqi;
        let Color = this.ROOTgetColorByIndex(this.ROOTgetAQILevelIndex(this.Datalist.aqi));
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('main_x'));
        app.title = '';
        // 指定图表的配置项和数据
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',

          },
          series: [
            {
              name: '小时AQI',
              type: 'pie',
              radius: ['100%', '90%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //动态设置参数
        myChart.setOption({
          series: [{
            data: [
              {value: Datavlue, name: '占比'},
              {value: Bianvlue, name: 'AQI'}

            ],
            color: [
              '#ccc',
              Color
            ]
          }]
        })
      },
      //圆图累计api
      GetCumulativeAPIcolortu() {
        let Datavlue = 500 - this.Datalist.aqiAccu;
        let Bianvlue = this.Datalist.aqiAccu;
        let Color = this.ROOTgetColorByIndex(this.ROOTgetAQILevelIndex(this.Datalist.aqiAccu));
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main_y'));
        app.title = '';
        // 指定图表的配置项和数据

        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
          },
          series: [
            {
              name: '累计AQI',
              type: 'pie',
              radius: ['100%', '90%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //动态设置参数
        myChart.setOption({
          series: [{
            data: [
              {value: Datavlue, name: '占比'},
              {value: Bianvlue, name: '累计AQI'}

            ],
            color: [
              '#ccc',
              Color
            ]
          }]
        })
      },
      //圆图综合
      GetcompositeIndexcolortu() {
        let Datavlue = 112.53 - this.Datalist.ComplexIndex;
        let Bianvlue = this.Datalist.ComplexIndex;
        let Color = this.ROOTgetColorByIndex(this.ROOTgetAQILevelIndex(this.Datalist.aqi));
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main_z'));
        app.title = '';
        // 指定图表的配置项和数据
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',

          },
          series: [
            {
              name: '综合指数',
              type: 'pie',
              radius: ['100%', '90%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //动态设置参数
        myChart.setOption({
          series: [{
            data: [
              {value: Datavlue, name: '占比'},
              {value: Bianvlue, name: '综合指数'}

            ],
            color: [
              '#ccc',
              Color
            ]
          }]
        })
      },
        //颜色列表
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 0) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
      //每页显示数据量变更
      handleSizeChange(val) {
        //this.pagesize = val;
      },
      //页码变更
      handleCurrentChange(val) {
        this.setPageTable(10, val);
        //console.log(val)
      },
      //页码分组
      setPageTable(pageSize, pageNum) {
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.allData.length)
            break;
          rtValue.push(this.allData[startNum + i]);
        }
        this.tableData = rtValue;
      },
      //实时切换请求
      RealTimeFatchtoo() {
        const t = this;
        this.leiji = false;
        this.shishi = true;
        this.tianqiyuji = true;
        api.GetMonitoringPointReal().then(res => {
          let shoulist = res.data.Data;
          //t.ObjectFactoryData(shoulist, t.type);
          // 地图切换
          bus.$emit('loadCumulative', shoulist, 'layer_gs', t.type,'pointname');
        })

      },
      //累计切换请求
      CumulativeFatchtoo() {
        const t = this;
        this.leiji = true;
        this.shishi = false;
        this.tianqiyuji = false;
        //国省控空气质量颜色列表
        api.GetLfAirPollution().then(res => {
          let shoulist = res.data.Data;
          this.CumulativeData = shoulist
        })
        //累计列表数据
        api.GetMonitoringPointAccu().then(res => {
            let shoulist = res.data.Data;
          //t.ObjectFactoryData(shoulist, t.type);
        //地图切换
        bus.$emit('loadCumulative', shoulist, 'layer_gs', t.type,'pointname');
        })

      },
       //获取颜色等级
        ROOTgetColorByIndex (index) {
            let color = '';
            switch (index) {
                case 0:
                    color = '#999'
                    break
                case 1:
                    color = '#43ce17'
                    break
                case 2:
                    color = '#efdc31'
                    break
                case 3:
                    color = '#fa0'
                    break
                case 4:
                    color = '#ff401a'
                    break
                case 5:
                    color = '#d20040'
                    break
                case 6:
                    color = '#9c0a4e'
                    break
                default:
                    color = '#43ce17';
                    break;
            }
            return color
        },
        //AQI
        ROOTgetAQILevelIndex (aqi) {
            let level = 0;
            if (aqi == 0) {
                level = 0
            }
            else if (aqi <= 200) {
                level = Math.ceil(aqi / 50)
                if (level < 0) {
                    level = 1
                }
            }
            else if (aqi < 300) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //PM25
        ROOTgetPM25LevelIndex (pm2_5) {
            let level = 0;
            if (pm2_5 == 0) {
                level = 0
            }
            else if (pm2_5 <= 35) {
                level = 1
            }
            else if (pm2_5 <= 75) {
                level = 2
            }
            else if (pm2_5 <= 115) {
                level = 3
            }
            else if (pm2_5 <= 150) {
                level = 4
            }
            else if (pm2_5 <= 250) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //PM10
        ROOTgetPM10LevelIndex (pm10) {
            let level = 0;
            if (pm10 == 0) {
                level = 0
            }
            else if (pm10 <= 50) {
                level = 1
            }
            else if (pm10 <= 150) {
                level = 2
            }
            else if (pm10 <= 250) {
                level = 3
            }
            else if (pm10 <= 350) {
                level = 4
            }
            else if (pm10 <= 420) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //SO2
        ROOTgetSO2LevelIndex (so2) {
            let level = 0;
            if (so2 == 0) {
                level = 0
            }
            else if (so2 <= 50) {
                level = 1
            }
            else if (so2 <= 150) {
                level = 2
            }
            else if (so2 <= 475) {
                level = 3
            }
            else if (so2 <= 800) {
                level = 4
            }
            else if (so2 <= 1600) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //NO2
        ROOTgetNO2LevelIndex (no2) {
            let level = 0;
            if (no2 == 0) {
                level = 0
            }
            else if (no2 <= 40) {
                level = 1
            }
            else if (no2 <= 80) {
                level = 2
            }
            else if (no2 <= 180) {
                level = 3
            }
            else if (no2 <= 280) {
                level = 4
            }
            else if (no2 <= 565) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //O3
        ROOTgetO3LevelIndex (o3) {
            let level = 0;
            if (o3 == 0) {
                level = 0
            }
            else if (o3 <= 160) {
                level = 1
            }
            else if (o3 <= 200) {
                level = 2
            }
            else if (o3 <= 300) {
                level = 3
            }
            else if (o3 <= 400) {
                level = 4
            }
            else if (o3 <= 800) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //O3
        ROOTgetCOLevelIndex (co) {
            let level = 0;
            if (co == 0) {
                level = 0
            }
            else if (co <= 2) {
                level = 1
            }
            else if (co <= 4) {
                level = 2
            }
            else if (co <= 14) {
                level = 3
            }
            else if (co <= 24) {
                level = 4
            }
            else if (co <= 36) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        },
        //综指
        ROOTgetComplexIndex(index) {
            let level = 0;
            if (index == 0) {
                level = 0
            }
            else if (index <= 4) {
                level = 1
            }
            else if (index <= 6) {
                level = 2
            }
            else if (index <= 8) {
                level = 3
            }
            else if (index <= 10) {
                level = 4
            }
            else if (index <= 12) {
                level = 5
            }
            else {
                level = 6
            }
            return level
        }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .main {
    width: 430px;
    height: auto;
    .strong {
      width: 100%;
      padding: 10px 0;
      display: inherit;
      margin-left: 18px;
      text-align: left;
    }
    .xuanzetbs {
      width: 100%;
      text-align: left;
      padding-left: 10px;
    }
    img {
      position: absolute;
      top: 40%;
      left: -17px;
      cursor: pointer;
      float: left;
    }
    .kbiaoti {
      padding: 10px 0px;
    }
    .bluexian {
      width: 26px;
      border: 1px solid #12DA88;
      margin: 0 auto;
    }
    .first {
      width: 100%;
      //height: 90px;
      height: 50px;
      margin-top: 10px;
      .tables {
        float: left;
        margin-left: 14px;
        //margin-top: 44px;
        margin-top: 0px;
        width: 100%;
        border-bottom: solid 1px #000;
        .bai {
          color: #12DA88;
          border-bottom: solid 2px #12DA88;
        }
        a {
          float: left;
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          display: inline-block;
          line-height: 34px;
          padding: 0 30px;
          width: auto;
          height: 34px;
        }
        :hover {
          cursor: pointer;
        }
        .time2 {
          line-height: 34px;
          padding-right: 20px;
          font-size: 12px;
          color: #12DA88;
        }
      }
      .shijian {
        float: left;
        margin-left: 6px;
      }
      .btnns {
        float: left;
        margin-left: 6px;
        button {
          border: none;
          width: 80px;
          height: 34px;
          background: #12DA88;
          color: #fff;
          border-radius: 4px;
        }
      }
    }
    .tqbiaoti {
      width: 100%;
      height: 22px;
      padding-left: 20px;
      text-align: left;
      color: #12DA88;
      margin-left: 16px;
      border-left: solid 3px #12DA88;

    }
    .strong{
      color: #12DA88;
    }
    .Second {
      width: 100%;
      height: auto;
      .tianqi {
        float: left;
        margin-left: 20px;
        /*margin-right: 20px;*/
        .tqbj {
          width: 64px;
          height: 64px;
          position: relative;
          .beijing {
            width: 45px;
            position: absolute;
            top: 10px;
            left: 12px;
          }
        }
        p {
          text-align: left;
          font-size: 12px;
          margin: 0 !important;
        }
      }
      .yuanjindu {
        /*APP写进去*/
        width: 100%;
        height: 150px;
        .jdflaot {
          margin-top: 15px;
          margin-bottom: 8px;
          float: left;
          margin-left: 8px;
          p {
            text-align: center;
            font-size: 14px;
          }
        }
        div {
          margin-bottom: 8px;
          position: relative;
          .texts {
            width: 100%;
            height: 30px;
            position: absolute;
            top: 32px;
            text-align: center;
            font-size: 18px;
          }
        }
      }
      .ph {
        width: 100%;
        height: auto;
        padding-bottom: 15px;
        ul {

          width: 100%;
          height: 20px;
          padding-bottom: 0;
          li {
            font-size: 14px;
            width: 60px;
            height: 20px;
            line-height: 20px;
            float: left;
            list-style: none;
            margin-left: 10px;
          }
        }
        ol {

          width: 100%;
          height: 26px;
          margin-bottom: 6px;
          li {
            margin-top: 1px;
            font-size: 14px;
            width: 60px;
            height: 26px;
            line-height: 26px;
            float: left;
            list-style: none;
            margin-left: 10px;
            background:rgba(27,33,67,0.8);
            border:1px solid rgba(26, 36, 88, 1);
            box-shadow:0px 6px 13px 0px #000;
          }
        }
      }
      .wrjingdu {
        width: 100%;
        height: auto;
        p {
          text-align: left;
          padding: 4px 20px;
        }
        .jdhezi {
          height: 24px;
          overflow: hidden;
          .font {
            margin-left: 30px;
            margin-right: 10px;
            text-align: center;
            width: 45px;
            font-size: 14px;
            float: left;
          }
          .tiaojd {
            float: left;
            width: 300px;
          }
        }
      }
    }
    .table {
      //表格部分 overflow: auto;
      font-size: 10px !important;
    }
  }
</style>
