<!--后台管理-业务数据-治理设备-->
<template>
  <div class="equipmentstatus">
    <!--右侧数据展示-->
    <div id="right">
      <div class="box">
        <div class="warning">
          <a>治理设备状态</a>
        </div>
      </div>
      <div class="search">
        <!---->
        <div class="block">
          <span class="demonstration">监控类型</span>
          <el-select v-model="levelName" @change="JBSelectName" placeholder="请选择">
            <el-option
                    v-for="item in levelOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!---->
        <div class="block">
          <span class="demonstration">设备名称</span>
          <el-input v-model="GridOperator" placeholder="请输入内容"></el-input>
        </div>
        <!---->
        <div class="block">
          <span class="demonstration">选择时间</span>
          <el-date-picker
                  v-model="starttime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
          </el-date-picker>
          --
          <el-date-picker
                  v-model="endtime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
          </el-date-picker>
          <el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>
          <el-button type="primary" class='btns' @click="Export">Excel导出</el-button>
          <el-button type="primary" class='btns' @click="openWin">下载图片</el-button>
        </div>
      </div>
      <!--list-->
      <div class="box">
        <div class="warning">
          <a>企业治理设备运行时间统计</a>
        </div>
      </div>
      <!--echars图-->
      <div class="echars">
        <div id="container"></div>
      </div>
      <!--分页-->
      <div class="page" style="">
        <span class="demonstration">共找到{{totalCount}}条记录</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
      </div>
  </div>
</template>

<script>
  import api from '../../../api/index'

  export default {
    name: 'equipmentstatus',
    data() {
      return {
        //初始下拉部分
        levelOptions:[
            {value:'',name:'全部'},
            {value:'1',name:'VOCs企业'},
            {value:'2',name:'散乱污企业'},
            {value:'3',name:'餐饮油烟'},
            {value:'4',name:'秸秆焚烧'},
            {value:'5',name:'工地扬尘'},
            {value:'6',name:'河道'}
        ],
        levelName:'全部',
        //
        DutyMainVal: '',
        endtime:'',
        starttime:'',
        //
        bjzrztoff: false,
        //责任主体
        optionsDuty: [],
        //
        optionsDutycode: '',
        //
        GridOperator: '',
        //
        dialogVisible: false,
        //
        newpossword: '',
        //
        oldpossword: '',
        //
        tishiyu: '',
        //
        classts: false,
        //
        tableData: [{DeviceName: '00000'}],
        //
        currentPage: 1,
        //
        totalCount:1,
        //
        pagesize: 10,
        //
        isNew: false,
        //
        title: '添加',
        //
        TotalRowsCount: null,
        InfoData: [],
        ListData: [],
        isend: false,
        //编辑
        Name: '',
        LoginName: '',
        Longitude: '',
        Latitude: '',
        ContactInformation: '',
        RecordId: '',
        LoginPC: '',
        PostName: '',
        isEdit: false,
        //
        lodid: '',
        contente: 1,
        passwordcode: '',
        //上级
        ParentVal:'',
        selectParentCode:'',
        optionsParent:[],
        hasParent:false,
        jbObj:{},

      }
    },
    created() {

    },
    mounted() {
        this.getNotice();
    },
    computed: {},
    watch: {},
    methods: {
      //查询
      QueryNeedsData() {
        let condata = this.GridOperator;
        this.getNotice(condata);
      },
      //监控类型
      JBSelectName(val){
            this.jbObj = {};
            this.jbObj = this.levelOptions.find((item)=>{if (val === item.value) {return item}});
      },
      //下载图片
      openWin(){
          $('.highcharts-button-symbol').click();
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      //分页请求
      handleCurrentChange(val) {
        console.log(val)
        let contente = this.contente = val;
        let cona = this.GridOperator;
        this.getNotice(cona, contente);
      },
      //获取上级
      GetAllParent(type){
        let t = this;
        t.optionsParent = [];
          api.GetAllParent(type).then(result => {
            t.optionsParent = result.data.data;
            console.log(t.optionsParent);
        })
      },
        //图表
        HighchartsRange(data){
              let valuedata = data.seriesdata || [];
              let lenddata = data.ycategories || [];
              let maxdata = data.ymax || '1';
                (function (H) {
                    var defaultPlotOptions = H.getOptions().plotOptions,
                        columnType = H.seriesTypes.column,
                        each = H.each,
                        extendClass = H.extendClass,
                        Point = H.Point;
                    defaultPlotOptions.xrange = H.merge(defaultPlotOptions.column, {
                        tooltip: {
                            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.yCategory}</b><br/>'
                        }
                    });
                    H.seriesTypes.xrange = H.extendClass(columnType, {
                        pointClass: extendClass(Point, {
                            // Add x2 and yCategory to the available properties for tooltip formats
                            getLabelConfig: function () {
                                var cfg = Point.prototype.getLabelConfig.call(this);
                                cfg.x2 = this.x2;
                                cfg.yCategory = this.yCategory = this.series.yAxis.categories && this.series.yAxis.categories[this.y];
                                return cfg;
                            }
                        }),
                        type: 'xrange',
                        parallelArrays: ['x', 'x2', 'y'],
                        requireSorting: false,
                        animate: H.seriesTypes.line.prototype.animate,
                        /**
                         * Borrow the column series metrics, but with swapped axes. This gives free access
                         * to features like groupPadding, grouping, pointWidth etc.
                         */
                        getColumnMetrics: function () {
                            var metrics,
                                chart = this.chart;
                            function swapAxes() {
                                each(chart.series, function (s) {
                                    var xAxis = s.xAxis;
                                    s.xAxis = s.yAxis;
                                    s.yAxis = xAxis;
                                });
                            }
                            swapAxes();
                            this.yAxis.closestPointRange = 1;
                            metrics = columnType.prototype.getColumnMetrics.call(this);
                            swapAxes();
                            return metrics;
                        },
                        translate: function () {
                            columnType.prototype.translate.apply(this, arguments);
                            var series = this,
                                xAxis = series.xAxis,
                                metrics = series.columnMetrics;
                            H.each(series.points, function (point) {
                                var barWidth = xAxis.translate(H.pick(point.x2, point.x + (point.len || 0))) - point.plotX;
                                point.shapeArgs = {
                                    x: point.plotX,
                                    y: point.plotY + metrics.offset,
                                    width: barWidth,
                                    height: metrics.width
                                };
                                point.tooltipPos[0] += barWidth / 2;
                                point.tooltipPos[1] -= metrics.width / 2;
                            });
                        }
                    });
                    /**
                     * Max x2 should be considered in xAxis extremes
                     */
                    H.wrap(H.Axis.prototype, 'getSeriesExtremes', function (proceed) {
                        var axis = this,
                            dataMax = Number.MIN_VALUE;
                        proceed.call(this);
                        if (this.isXAxis) {
                            each(this.series, function (series) {
                                each(series.x2Data || [], function (val) {
                                    if (val > dataMax) {
                                        dataMax = val;
                                    }
                                });
                            });
                            if (dataMax > Number.MIN_VALUE) {
                                axis.dataMax = dataMax;
                            }
                        }
                    });
                }(Highcharts));
                // THE CHART
                $('#container').highcharts({
                    chart: {
                        type: 'xrange'
                    },
                    title: {
                        text: '设备统计'
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%m-%d',
                        }
                    },
                    yAxis: {
                        title: '',
                        categories:lenddata,
                        min: 0,
                        max: maxdata
                    },
                    series: [{
                        name: '运行时间',
                        // pointPadding: 0,
                        // groupPadding: 0,
                        borderRadius: 5,
                        pointWidth: 10,
                        data: valuedata
                    }],
                    exporting: {
                        chartOptions: {
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    }
                });
        },
      //获取运维记录列表
      getNotice(name = '', pag = 1) {
        const _this = this;
        let type = _this.jbObj.value || '';
        let PageIndex = pag;
        let kname = name || '';
        let starttime = _this.starttime || '';
        let endtime = _this.endtime || '';
        //this.tableData = [];
        api.GetDeviceStatus(type,kname,starttime,endtime,PageIndex).then(result => {
          console.log(result);
          let InfoData = result.data.Data;
          _this.totalCount = result.data.TotalRowsCount || 1;
          _this.HighchartsRange(InfoData);
        });

      },
      //导出
      Export() {
        //api.ExportInspectorExcel();
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #container {
    min-width: 300px;
    width: 100%;
    height: auto;
  }
  .equipmentstatus {
    .el-input {
      width: 215px;
    }
    #right {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      background-color: #f6fbff;
      .echars{
          width: 100%;
          height: auto;
      }
      .box {
        width: 100%;
        height: auto;
        .warning {
          text-align: left;
          border-bottom: solid 1px #ccc;
          width: 100%;
          height: 40px;
          margin-top: 10px;
          margin-bottom: 20px;
          margin-left: 10px;
          a {
            display: inline-block;
            height: 20px;
            border-left: solid 3px #428bca;
            padding-left: 13px;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
      .search {
        text-align: left;
        margin-bottom: 24px;
        .searchBox {
          display: inline-block;
          margin-right: 20px;
        }
        .block {
          display: inline-block;
          width: 100%;
          margin-top: 20px;
          .el-input{
            width: 200px;
          }
          span{
            display: inline-block;
            width: 80px;
            text-align:right;
            padding-right: 10px;
          }
        }
        .btns {
          margin-left: 40px;
        }
      }
      .page {
        text-align: left;
      }
      .eidt {
        color: #000;
        :hover {
          color: #20a0ff;
          text-decoration: underline;
        }
      }
      .InfoEnd {
        color: #000;
        :hover {
          color: #BF3831;
          text-decoration: underline;
        }
      }

      .el-pagination {
        display: inline-block;
        margin-left: 170px;
        padding-bottom: 90px;
      }

    }
  }
</style>
