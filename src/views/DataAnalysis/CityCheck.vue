<template>
  <div class="CityCheck">
    <!--乡镇考核-->
    <v-header></v-header>
    <!---->
    <div class="warp3">
      <el-tabs v-model="TitleName" @tab-click="">
        <el-tab-pane label="乡镇考核" name="first">
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
                :picker-options="pickerOptions0">
              </el-date-picker>
            </div>
            <el-button class="SearchBtn" type="primary" @click='GetAssessment'>查询</el-button>
          </div>
          <!---->
          <div class="kass">
            <div class="wbiaoti">
              <i class="el-icon-caret-right"></i>
              <a>筛选区域</a>
            </div>
          </div>
          <!---->
          <div class="chaxuntiaojian">
            <div class="float001">
              <el-radio-group v-model="TownshipScreeningName" @change='clickChangeData'>
                <el-radio-button label="全市"></el-radio-button>
                <el-radio-button label="中部县区组"></el-radio-button>
                <el-radio-button label="广阳区"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
            <div id="allCity" style="width: 100%!important;height:1800px!important;"></div>
            <div id="Guang" style="width: 100%!important;height:400px!important;"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {bus} from '@/js/bus.js'
  import api from '../../api/index'

  export default {
    name: 'CityCheck',
    data() {
      return {
        //
        tabPosition: 'top',
        //
        fullscreenLoading: false,
        //
        tanchu: false,
        //
        currentPage4: 100,
        //
        tableData: [],
        //
        allData: [],
        //
        pickerOptions0: {},
        //
        currentRow: null,
        //
        pagesize: 10,
        pagesizeNor: 10,
        //
        currentPage: 1,
        currentPageNor: 1,
        //数据量/分页
        totalCount: 1000,
        totalCountNor: 100,
        totalCountMid: 100,
        totalCountSou: 100,
        //页面大标题
        TitleName: 'first',
        //乡镇考核筛选条件
        TownshipScreeningName: '全市',
        //
        pickerOptions0: {
//                  disabledDate(time) {
//                      return time.getTime() <= Date.now() - 8.64e7;
//                  }
        },
        //
        timevalue: '',
        //区县选项值
        Tjvalue: '',
        //片区选项值
        Pqvalue: '北部县区',
        //
        Optionvaluejb: [
          {
            value: '一季度',
            label: '一季度'
          },
          {
            value: '二季度',
            label: '二季度'
          },
          {
            value: '三季度',
            label: '三季度'
          },
          {
            value: '四季度',
            label: '四季度'
          }
        ],
        //乡镇区县列表 选择框部分
        Optionvaluexx: [],
        //数据1
        Xcvalue1: '月度',
        //数据2
        Xcvalue2: '',
        //数据3
        Xcvalue3: '',
        //
        Optionvaluebox: [{
          value: '季度',
          label: '季度'
        }, {
          value: '月度',
          label: '月度'
        }],
        //季度选项
        Optionvalue1: [
          {
            value: '一季度',
            label: '一季度'
          },
          {
            value: '二季度',
            label: '二季度'
          },
          {
            value: '三季度',
            label: '三季度'
          },
          {
            value: '四季度',
            label: '四季度'
          }
        ],
        //月度选项
        Optionvalue2: [
          {
            value: '1月',
            label: '1月'
          },
          {
            value: '2月',
            label: '2月'
          },
          {
            value: '3月',
            label: '3月'
          },
          {
            value: '4月',
            label: '4月'
          },
          {
            value: '5月',
            label: '5月'
          },
          {
            value: '6月',
            label: '6月'
          },
          {
            value: '7月',
            label: '7月'
          },
          {
            value: '8月',
            label: '8月'
          },
          {
            value: '9月',
            label: '9月'
          },
          {
            value: '10月',
            label: '10月'
          },
          {
            value: '11月',
            label: '11月'
          },
          {
            value: '12月',
            label: '12月'
          }
        ],
        //全市表格数据
        WholeCityData: [],
        CityTableData: [],
        //片区选项
        options: [{
          value: '北部县区',
          label: '北部县区'
        }, {
          value: '中部县区',
          label: '中部县区'
        }, {
          value: '南部县区',
          label: '南部县区'
        }],
        value4: '',
        //统计排名全市数据  实时数据
        CityData: [],
        gridData: [],
        //选择日期
        dateTime: '',
        //全市
        isQuarter: true,
        //
        page: 1,
        //北部县区
        NorthData: [],
        NorTableData: [],//北部县区列表数据
        //中部县区
        MiddleData: [],
        MidTableData: [],//中部县区列表数据
        //南部县区
        SouthData: [],
        SouTableData: [],//南部县区列表数据，
        area: '',
        isGuang:false,
        rangeTime:''
      }
    },
    created() {

    },
    mounted() {
      this.GetAssessment();

    },
    methods: {
      //全市
      allCity(data){
        let t = this;
        let Data = data;
        //console.log(data)
        var myChart = echarts.init(document.getElementById('allCity'));
        var option = {
          tooltip: {
            formatter: function (params) {
              //console.log(params);
              var paData = params.data.list;
              var rel = '';
              paData.forEach(item=>{
                rel+= `<tr class="tableBody"><td>${item.Name||'--'}</td><td>${item.Time}月倒排第${item.Rank_Num||'--'}</td><td>${item.Com_Index||'--'}</td></tr>`
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
          grid: {
            left: '3%',
            right: '8%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            name:this.rangeTime,
            type: 'value',
            min: 0,
            max: 8,
            interval: 1,
          },
          yAxis: {
            type: 'category',
            // data: ['巴西','印尼','美国','印度','中国','世界人口(万)','kk','ll'],
            data:t.WholeCityData,
            axisLabel: {
              interval: 0,
            },
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data:Data,
              //data: [1,3,4,7,4,3],
              barWidth:10,
              itemStyle:{
                normal:{
                  color:'#39c3f8'
                }
              },
            }
          ]
        };
        myChart.setOption(option);
        myChart.resize();
      },
      //获取乡镇考核数据
      GetAssessment() {
        switch (this.TownshipScreeningName) {
          case '全市':
            this.area = '';
            this.rangeTime = '累计进入倒排前十次数';
            $('#allCity').css({height:1800});
            break;
          case '中部县区组':
            this.area = '中';
            this.rangeTime = '累计进入倒排前三次数';
            $('#allCity').css({height:1000});
            break;
          case '广阳区':
            this.area = '广';
            this.rangeTime = '累计进入倒排第一次数';
            $('#allCity').css({height:400});
            break;
          default:
            break;
        }
        let t = this;
        let Time = $('.el-input__inner').val();
        let isQuarter = true;
        t.WholeCityData = [];
        let area = encodeURI(this.area);
        api.GetAssessment(Time, area, isQuarter).then(res => {
          let i = 1;
          if (res && isQuarter) {
            let allData = res.data.Data;
            this.totalCount = allData.length;
            this.totalCounts = allData.length;
            allData.sort(this.compare('Com_Index'));
            allData.forEach(item => {
              item.value = item.Waring_Num;
              t.WholeCityData.push(item.Name);
            });
            t.allCity(allData);
          }
        })
      },
      //详情
      handleClick(row) {
        this.gridData = [];
        this.gridData = row.list.map(v => {
          v['Rank_Num'] = v['Time'] + "月倒排第" + v['Rank_Num'];
          v['Name'] = row.Name;
          return v
        });
//	        	console.log(this.gridData)
      },
      clickChangeData() {
        this.GetAssessment();
      },
      getYesterday() {
        let d = new Date(new Date().getTime() - 86400000);
        let datetime;
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return datetime = year + '-' + month + '-' + day;
      },
      //获取当月第一天
      getCurrentMonth() {
        let d = new Date(new Date().getTime() - 86400000);
        let datetime;
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        return datetime = year + '-' + month + '-01';
      },
      //每页显示数据量变更
      handleSizeChange(val) {
      },
      //点击页码换页
      handleCurrentChange(val) {
        this.setPageTable(10, val);
      },
      handleCurrentChangeNor(val) {
        this.setPageTableNor(10, val);
      },
      //中部点击页码换页
      handleCurrentChangeMid(val) {
        this.setPageTableMid(10, val);
      },
      //南部点击页码换页
      handleCurrentChangeSou(val) {
        this.setPageTableSou(10, val);
      },
      //分页数据
      setPageTable(pageSize, pageNum) {
        let i = 1;
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.WholeCityData.length)
            break;
          rtValue.push(this.WholeCityData[startNum + i]);
        }
        this.CityTableData = rtValue;
      },
      //中部分页数据
      setPageTableMid(pageSize, pageNum) {
        let i = 1;
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.MiddleData.length)
            break;
          rtValue.push(this.MiddleData[startNum + i]);
        }
        this.MidTableData = rtValue;
      },
      //北部分页数据
      setPageTableNor(pageSize, pageNum) {
        let i = 1;
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.NorthData.length)
            break;
          rtValue.push(this.NorthData[startNum + i]);
        }
        this.NorTableData = rtValue;
      },
      //南部分页数据
      setPageTableSou(pageSize, pageNum) {
        let i = 1;
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.SouthData.length)
            break;
          rtValue.push(this.SouthData[startNum + i]);
        }
        this.SouTableData = rtValue;
      },
      compare(propertyName) {
        return function (object1, object2) {
          let value1 = object1[propertyName];
          let value2 = object2[propertyName];
          return value2 - value1
        }
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
  .CityCheck {
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
            .circleRed {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: red;
            }
            .circleOrange {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 5px;
              background: orange;
              margin-left: 20px;
            }
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
