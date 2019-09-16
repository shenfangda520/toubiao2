<template>
  <div class="case-supervision">
    <!--督查案件统计-->
    <v-header></v-header>
    <!---->
    <div class="warp5">
      <div class="top-qurie">
        <div class="block">
          <span>案件来源</span>
          <el-select v-model="caseSource" @change="" placeholder="请选择">
            <el-option
              v-for="item in optionsCaseSource"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="block">
          <span>分类</span>
          <el-select v-model="typeoName" @change="AddSelect" placeholder="请选择">
            <el-option
              v-for="item in dataOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" class='btns' @click='CasesionInquiry'>查询</el-button>
        </div>
      </div>
      <!---->
      <div class="tabs-top">
        <el-radio-group v-model="timeRadio" size="small" @change="tiemChange">
          <el-radio-button label="上周"></el-radio-button>
          <el-radio-button label="本月"></el-radio-button>
        </el-radio-group>
      </div>
      <!---->
      <div class="chenter-intem">
        <div class="tubiao" id="echars_it"></div>
      </div>
      <!---->
      <div class="buttom-nr">
        <div>案件数量合计：{{sumgoos}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../api/index'

  export default {
    name: 'case-supervision',
    data() {
      return {
        typeoName: '',
        dataOptions: [
          {
            value: '',
            name: '全部'
          },
          {
            value: '2',
            name: '散乱污企业'
          },
          {
            value: '1',
            name: 'VOCs企业'
          },
          {
            value: '3',
            name: '餐饮企业'
          },
          {
            value: '4',
            name: '秸秆焚烧'
          }
        ],
        optionsCaseSource:[
          {
            value: '',
            name: '全部'
          },
          {
            value: '1',
            name: '指挥中心'
          },
          {
            value: '2',
            name: '大气办'
          },
          {
            value: '3',
            name: '双联办'
          },
        ],
        caseSource:'',
        AddObj: {},
        sumgoos: '',
        timeRadio: '上周',
        timeStatc: ''
      };
    },
    created() {
    },
    mounted() {
      this.initChangeGetData();
    },
    methods: {
      //初始化获取数据
      initChangeGetData() {
        const _this = this;
        let companyType = _this.AddObj.value || '';
        let type = _this.timeStatc || '0';
        let dataSource = _this.caseSource || '';
        api.SelectBigSuperviseCase(dataSource,companyType, type).then(res => {
          console.log(res.data.data);
          _this.SupervisionChars(res.data.data);
        })
      },
      //查询
      CasesionInquiry() {
        this.initChangeGetData();
      },
      //选择数据
      AddSelect(val) {
        console.log(val)
        this.AddObj = {};
        this.AddObj = this.dataOptions.find((item) => {
          return item.value === val
        });
      },
      //时间切换
      tiemChange(val) {
        console.log(val);
        if (this.timeRadio === '上周') {
          this.timeStatc = '0';
        } else {
          this.timeStatc = '1';
        }
        ;
        this.initChangeGetData();
      },
      //例图
      SupervisionChars(data) {
        const _this = this;
        let showData = data.map(function (v) {
          return v.casenum
        }) || [];
        let lenData = data.map(function (v) {
          return v.casetype
        }) || [];
        _this.sumgoos = showData.reduce((a, b) => {
          return parseInt(a) + parseInt(b);
        });
        let myChart = echarts.init(document.getElementById('echars_it'));
        // 指定图表的配置项和数据
        let option = {
          title: {},
          legend: {},
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: lenData
          },
          yAxis: {
            name: '案件数量',
            type: 'value',
            min: 0,
            max: 8,
            interval: 1,
            splitLine: {show: false},//去除网格线
          },
          series: [{
            name: '数量',
            type: 'bar',
            data: showData,
            barWidth:30,
            itemStyle: {
              normal: {
                color: '#39c3f8'
              }
            },
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
    }

  };
</script>
<style lang="scss" scoped>
  .case-supervision {
    width: 100%;
    height: 100%;
    //title标题
    .warp5 {
      width: 98%;
      height: calc(100% - 64px);
      margin: 0 auto;
      .top-qurie {
        width: 100%;
        text-align: left;
        padding-left: 50px;
        padding-top: 50px;
        padding-bottom: 20px;
        border-bottom: solid 1px #cccccc;
        .block{
          display: inline-block;
        }
      }
      .tabs-top {
        width: 100%;
        text-align: left;
        padding-left: 50px;
        padding-top: 15px;
      }
      .chenter-intem {
        width: 100%;
        height: calc(100% - 200px);
        .tubiao {
          width: 100%;
          height: 100%;
          min-height: 300px;
        }
      }
      .buttom-nr {
        width: 200px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        border: solid 1px #ccc;
      }
    }
    //媒体查询
    @media only screen and (min-width: 1400px) {

    }
  }
</style>
