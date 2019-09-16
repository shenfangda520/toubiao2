<!--后台管理-案件处理-->
<template>
  <div class="CaseReview">
    <!--------------案件处理右侧数据展示------>
    <div id="right">
      <!----------案件处理-->
      <div class="box">
        <div class="warning">
          <a>案件督查</a>
        </div>
      </div>
      <!-----------查询部分------->
      <div class="search">
        <div class="searchBox">
          <span>案件来源</span>
          <el-select v-model="CaseSearch.region" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCaseRegion"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="searchBox">
          <span>案件类型</span>
          <el-select v-model="CaseSearch.reason" @change="selectChangeOrigin" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCaseReason"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="searchBox">
          <span>责任部门</span>
          <el-select v-model="CaseSearch.zr" @change="selectChangeDuty" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCaseZr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="block">
          <span class="demonstration">案件时间</span>
          <el-date-picker
            v-model="CaseSearch.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
          -
          <el-date-picker
            v-model="CaseSearch.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
          <div class="InsertOrOut">
						<span>
							<el-button type="primary" @click="GetExportCase">Excel导出</el-button>
						</span>
          </div>
        </div>
      </div>
      <div class="radioChange">
        <el-radio-group v-model="radio" @change="GetMonitoringDay">
          <el-radio-button label="VOCs企业"></el-radio-button>
          <el-radio-button label="散乱污"></el-radio-button>
          <el-radio-button label="餐饮"></el-radio-button>
          <el-radio-button label="秸秆焚烧"></el-radio-button>
          <el-radio-button label="工地"></el-radio-button>
          <el-radio-button label="河道管理"></el-radio-button>
        </el-radio-group>
      </div>
      <el-table
        :data="ListData"
        style="width: 100%"
        class="table_case">
        <el-table-column
          prop="Range"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="sourceString"
          label="案件来源"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="企业名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gridname"
          label="所属乡镇"
          width="150">
        </el-table-column>
        <el-table-column
          prop="caseDescript"
          label="案情描述"
          width="100"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="sendPeople"
          label="发送人">
        </el-table-column>
        <el-table-column
          prop="sendTime"
          label="发送时间">
        </el-table-column>
        <el-table-column
          prop=""
          label="视频画面">
          <template slot-scope="scope">
            <img :src="scope.row.videoFootage" alt="" title="案前图片">
            <img :src="scope.row.feedbackFootage||''" alt="" title="案后图片">
          </template>
        </el-table-column>
        <el-table-column
          prop="feedbackPeople"
          label="反馈人">
        </el-table-column>
        <el-table-column
          prop="feedbackTime"
          label="反馈时间">
        </el-table-column>
        <el-table-column
          prop="feedbackDescript"
          label="反馈结果"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="caseTypeString"
          label="案件类型">
        </el-table-column>
      </el-table>
      <div class="page">
        <span class="demonstration">共找到{{totalCount}}条记录</span>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
      <case-entry></case-entry>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index'
  import caseEntry from './CaseEntry'

  export default {
    name: 'CaseReview',
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pagesize: 10,
        TotalRowsCount: null,
        totalCount: 1,
        InfoData: [],
        ListData: [],
        CaseSearch: {
          reason: '',//案发原因
          zr: '',//责任主体
          startTime: '',//开始时间
          endTime: '',//结束时间
          region: '',//案件来源
        },
        //案发原因选择
        optionsCaseReason: [{
          value: '1',
          label: '未开治理设备'
        }, {
          value: '2',
          label: '设备故障'
        }, {
          value: '3',
          label: '未营业'
        }, {
          value: '4',
          label: '误报'
        }, {
          value: '5',
          label: '厂区停电'
        }, {
          value: '6',
          label: '扑灭火点'
        }, {
          value: '7',
          label: '监控恢复'
        }, {
          value: '8',
          label: '未作业/停产'
        }],
        //案发来源选择
        optionsCaseRegion: [{
          value: '1',
          label: '指挥中心'
        }, {
          value: '2',
          label: '大气办'
        }, {
          value: '3',
          label: '双联办'
        }],
        //责任部门
        optionsCaseZr: [],//责任主体选择
        pageNo: 1,
        radio: 'VOCs企业',//案件列表切换
        //案件录入
        optionsCompany: [],//企业
      }
    },
    created() {
    },
    mounted() {
      this.GetMonitoringDay();
      this.GetCaseAll();//责任部门
    },
    computed: {},
    components: {caseEntry},
    methods: {
      //企业类型转换
      companyType(radio) {
        switch (radio) {
          case 'VOCs企业':
            return '1';
            break;
          case '散乱污':
            return '2';
            break;
          case '餐饮':
            return '3';
            break;
          case '秸秆焚烧':
            return '4';
            break;
          case '工地':
            return '5';
            break;
          case '河道管理':
            return '6';
            break;
        }
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.GetMonitoringDay();
      },
      //案件来源选择
      selectChangeOrigin(val) {
        this.origin = val;
      },
      //责任部门选择
      selectChangeDuty(val) {
        this.CaseSearch.zr = val;
      },
      //获取责任部门
      GetCaseAll() {
        let t = this;
        api.GetCaseAll().then(result => {
          t.optionsCaseZr = result.data.data;
        })
      },
      //获取列表
      GetMonitoringDay() {
        let t = this;
        let caseSearch = t.CaseSearch;
        let caseType = caseSearch.reason;
        let responsibilityid = caseSearch.zr;
        let startTime = caseSearch.startTime;
        let endTime = caseSearch.endTime;
        let source = caseSearch.region;
        let companytype = t.companyType(t.radio);
        let pageSize = 10;
        let pageNo = this.pageNo;
        this.ListData = [];
        let i = 1;
        api.GetCaseList(caseType, responsibilityid, startTime, endTime, pageSize, pageNo, companytype, source).then(result => {
          if (result) {
            let InfoData = result.data.data.rows;
            t.totalCount = result.data.data.total;
            if (InfoData) {
              InfoData.forEach(item => {
                let tableData = {};
                tableData.Range = i++;//序号
                tableData.name = item.companyname;//名称
                tableData.gridname = item.gridname;//所属乡镇
                tableData.caseDescript = item.caseDescript;//案件描述
                tableData.departmenttype = item.departmenttype;//责任部门
                tableData.sendPeople = item.sendPeople;//发送人
                tableData.sendTime = item.sendTime;//发送时间
                tableData.feedbackPeople = item.feedbackPeople;//反馈人
                tableData.feedbackTime = item.feedbackTime;//反馈时间
                tableData.afterCaseImg = item.aftercaseimg ? item.aftercaseimg.split(',') : [];//安后图片
                tableData.feedbackDescript = item.feedbackDescript;//反馈结果
                tableData.caseTypeString = item.caseTypeString;//案件类型
                tableData.videoFootage = item.videoFootage;//案前图片
                tableData.feedbackFootage = item.feedbackFootage;//案后图片
                tableData.sourceString = item.sourceString;//案件来源
                t.ListData.push(tableData);
              })
            }
          }
        });
      },
      //导出
      GetExportCase() {
        let t = this;
        let caseSearch = t.CaseSearch;
        let caseType = caseSearch.reason;
        let responsibilityid = caseSearch.zr;
        let startTime = caseSearch.startTime;
        let endTime = caseSearch.endTime;
        let companytype = t.companyType(t.radio);
        let pageSize = 10;
        let pageNo = this.pageNo;
        api.GetExportCase(caseType, responsibilityid, startTime, endTime, pageSize, pageNo, companytype);
      },
      //分页数据
      setPageTable(pageSize, pageNum) {
        let i = 1;
        let rtValue = [];
        let startNum = pageSize * (pageNum - 1);
        for (let i = 0; i < pageSize; i++) {
          if ((startNum + i + 1) > this.ListData.length)
            break;
          rtValue.push(this.ListData[startNum + i]);
        }
        this.tableData = rtValue;
      },
    },
  }
</script>
<style lang="scss" scoped>
  .CaseReview {
    height: 100%;
  }
  #right {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 0 20px;
    background-color: #f6fbff;
    .radioChange {
      text-align: left;
      margin-bottom: 10px;
    }
    .case_submit {
      text-align: right;
    }
    .table_case {
      img {
        width: 50px;
        height: 30px;
        margin-bottom: 3px;
      }
    }
    .left {
      float: left;
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
      margin-left: 20px;
      text-align: left;
      margin-bottom: 24px;
      .searchBox {
        display: inline-block;
        margin-right: 20px;
      }
      .block {
        display: inline-block;
        margin-top: 20px;
      }
      .btns {
        margin-left: 40px;
      }
      .InsertOrOut {
        display: inline-block;
        margin-left: 40px;
        span {
          a {
            color: #000000;
            font-size: 14px;
            margin-right: 40px;
          }
          :hover {
            cursor: pointer;
            color: #1797ff;
            text-decoration: underline;
          }
        }

      }
    }
    .page {
      text-align: left;
    }
    .el-pagination {
      display: inline-block;
      margin-left: 170px;
      margin-bottom: 20px;
    }
  }
</style>
