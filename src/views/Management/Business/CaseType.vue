<!--后台管理-案件类型占比-->
<template>
  <div class="CaseType">
    <div id="right">
      <!----------案件类型占比-->
      <div class="box">
        <div class="warning">
          <a>案件类型占比</a>
        </div>
      </div>
      <!-----------查询部分------->
      <div class="search">

        <div class="block" style="margin-top: 20px;">
          <span class="demonstration">起始时间</span>
          <el-date-picker
            v-model="CaseStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间"
            @change='startChange'>
          </el-date-picker>
          -
          <el-date-picker
            v-model="CaseEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间"
            @change='endChange'>
          </el-date-picker>
          <div class="searchBox">
            <span>责任部门</span>
            <el-select v-model="DutyMainVal" @change="selectChangeDuty" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsDuty"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
          <div class="InsertOrOut">
						<span>
							<el-button type="primary" @click="GetExportCase">Excel导出</el-button>
						</span>
          </div>
        </div>
      </div>

      <!--------------列表部分---------->
      <div class="box">
        <div class="warning">
          <a>列表</a>
        </div>
      </div>
      <el-table
        :data="ListData"
        style="width: 100%">
        <el-table-column
          prop="sumnum"
          label="案件数量">
        </el-table-column>
        <el-table-column
          prop="casetype1per"
          label="未开治理设备">
        </el-table-column>
        <el-table-column
          prop="casetype2per"
          label='设备故障'
          width="">
        </el-table-column>
        <el-table-column
          prop="casetype3per"
          label="未营业">
        </el-table-column>
        <el-table-column
          prop="casetype4per"
          label="误报">
        </el-table-column>
        <el-table-column
          prop="casetype5per"
          label="厂区停电">
        </el-table-column>
        <el-table-column
          prop="casetype6per"
          label="扑灭火点">
        </el-table-column>
        <el-table-column
          prop="casetype7per"
          label="监控恢复">
        </el-table-column>
        <el-table-column
          prop="casetype8per"
          label="未作业/停电">
        </el-table-column>
      </el-table>
      <!--<div class="page">
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
         </div>-->
    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui';
  import api from '../../../api/index'

  export default {
    name: 'CaseReview',
    data() {
      return {
        progress: 0,//上传进度
        pass: null,//是否上传成功
        isEnlargeImage: false,//放大图片
        //			enlargeImage: '',//放大图片地址
        imagelist: [],
        params: {
//						action: 
//						'http://gkpt.zq12369.com:8013/servicePlatform/admin/caseData/uploadAnalysisFile',
          data: {}
        },
        //上传图片
        dialogImageUrl: '',
        dialogVisible: false,
        //案件状态
        optionsCase: [{
          value: '0',
          label: '未处理'
        }, {
          value: '1',
          label: '处理完毕'
        }],
        //责任主体
        optionsDuty: [],
        //污染类别
        optionsPollution: [],
        //分配弹框责任主体选择
        optionsDistributePop: [],
        //县市区选择
        options: [],
        gridCode: '',
        value1: '',//县(市、区)
        value2: '',//开始时间
        value3: '',//结束时间
        value4: '',
        value5: '',
        value6: '',
        tableData: [],
        currentPage: 1,
        pagesize: 10,
        isConfirm: false,
        Upload: false,
        //查询
        startTime: '',
        endTime: '',
        TotalRowsCount: null,
        totalCount: '',
        InfoData: [],
        ListData: [],
        Id: '',
        fileList: [],
        isEdit: false,
        SO2: '',
        NO2: '',
        PM10: '',
        CO: '',
        O3: '',
        PM25: '',
        pageNo: 1,
        //案件状态
        CaseStatusVal: '',
        //责任主体
        DutyMainVal: '',
        //污染类别
        PollutionClassVal: '',
        //案件时间
        CaseStartTime: '',
        CaseEndTime: '',
        //回复提交弹框
        isUpdate: false,
        PollutionClassPop: '',//污染类别
        CaseTimePop: '',//案发时间
        CasePositionPop: '',//位置
        CaseStatusPop: '',//案件状态
        CaseDutyPop: '',//责任主体
        textarea: '',//内容
        CaseDealPop: '',//处理结果
        //分配弹框
        isDistribute: false,
        distributePopVal: '',
        //查看
        Examine: false,
        PollutionClassPopExamine: '',//污染类别
        CaseTimePopExamine: '',//案发时间
        CasePositionPopExamine: '',//位置
        CaseStatusPopExamine: '',//案件状态
        CaseDutyPopExamine: '',//责任主体
        textareaExamine: '',//内容
        CaseDealPopExamine: '',//处理结果
        tupian: [],
        status: '',
        departmenttype: '',
        pollutiontype: '',
        id: '',
        zrxtCode: '',
        afterCaseImg: '',
        imgUrl: '',
        caseKindsNumRespList: [],
        perData: []
      }
    },
    created() {

    },
    mounted() {
      this.GetMonitoringDay();
      this.GetCaseAll();//责任主体
      console.log(this.imgUrl)
    },
    computed: {},
    methods: {
      //开始时间选择
      startChange(val) {
        this.startTime = val;
      },
      //结束时间选择
      endChange(val) {
        this.endTime = val;
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
//      		this.GetMonitoringDay(10,val);
      },
      //责任主体选择
      selectChangeDuty(val) {
        this.departmenttype = val;
      },
      //污染类型选择
      selectChangePollution(val) {
        this.pollutiontype = val;
      },
      //获取责任主体
      GetCaseAll() {
        let t = this;
        api.GetCaseAll().then(result => {
          t.optionsDuty = result.data.data;
          t.optionsDistributePop = result.data.data;
        })
      },
      //获取列表
      GetMonitoringDay() {
        let t = this;
        let startTime = this.CaseStartTime ? this.CaseStartTime : '';
        let endTime = this.CaseEndTime ? this.CaseEndTime : '';
        let responsibilityid = this.DutyMainVal;
        this.ListData = [];
        api.GetCaseTypeList(startTime, endTime, responsibilityid).then(result => {
          console.log(result)
          if (result) {
            let InfoData = result.data.data;
            // t.totalCount = result.data.data.count;
            console.log(InfoData)
            console.log('11');
            if (InfoData) {
              InfoData.forEach(item => {
                let tableData = [];
                tableData.sumnum = item.sumnum;
                tableData.casetype1per = item.casetype1per;
                tableData.casetype2per = item.casetype2per;
                tableData.casetype3per = item.casetype3per;
                tableData.casetype4per = item.casetype4per;
                tableData.casetype5per = item.casetype5per;
                tableData.casetype6per = item.casetype6per;
                tableData.casetype7per = item.casetype7per;
                tableData.casetype8per = item.casetype8per;
                t.ListData.push(tableData);
              })
            }
//						this.setPageTable(10000, 1);
          }
        });
      },
      //导出
      GetExportCase() {
        let t = this;
        let startTime = this.CaseStartTime ? this.CaseStartTime : '';
        let endTime = this.CaseEndTime ? this.CaseEndTime : '';
        let responsibilityid = this.DutyMainVal;
        api.GetCaseTypeExcel(startTime, endTime, responsibilityid);
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

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  .img-list {
    overflow: hidden;
    width: 100%;
  }

  .img-list .img-content {
    float: left;
    text-align: left;
    position: relative;
    display: inline-block;
    width: 200px;
    height: 200px;
    /*padding:5px;*/
    /*margin:5px 20px 20px 0;*/
    border: 1px solid #d1dbe5;
    /*border-radius:4px;*/
    /*transition:all .3s;*/
    /*box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);*/
  }

  .img-list .img-upload {
    float: left;
    width: 200px;
    height: 200px;
    display: table;
    text-align: center;
  }

  .img-list .uploader {
    width: 100%;
    display: table-cell;
    vertical-align: middle;
  }

  .img-list .img-progress {
    text-align: center;
    padding-top: 30px;
  }

  .img-list .img-content img {
    display: block;
    width: 100%;
    height: 200px;
    margin: 0 auto;
    /*border-radius:4px;*/
  }

  .img-list .img-content .name {
    margin-top: 10px;
  }

  .img-list .img-content .name > div {
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 25px;
    line-height: 25px;
  }

  .img-list .img-content:hover .del,
  .img-list .img-content:hover .layer {
    opacity: 1;
  }

  .img-list .img-content .del,
  .img-list .img-content .layer {
    opacity: 0;
    transition: all .3s;
  }

  .img-list .img-content .del {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #8492a6;
    cursor: pointer;
    font-size: 1.1em;
  }

  .img-list .img-content .layer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 200px;
    color: #fff;
    text-align: center;
    z-index: 5;
    background-color: rgba(0, 0, 0, .4);
  }

  .img-list .img-content .layer i {
    font-size: 1.6em;
    margin-top: 80px;
  }

  .el-input, .el-input__inner {
    width: 200px;
  }

  .edit-input {
    width: 100px;
  }
  .CaseType{
    height:100%;
  }
  #right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    background-color: #f6fbff;
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
      padding-bottom: 90px;
    }
    /*************弹出框**********/
    .popUp {
      /*灰色遮罩层*/
      .mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 998;
      }
      /*****回复弹出框内容********/
      .reply {
        width: 655px;
        height: 690px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -327px;
        margin-top: -345px;
        z-index: 999;
        border-radius: 10px;
        .title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: left;
          border-bottom: 2px solid #3a90b3;
          a {
            color: #3a90b3;
            font-size: 18px;
            padding-left: 20px;
          }
          div {
            margin-top: 15px;
            float: right;
            width: 24px;
            height: 24px;
            color: #363636;
            margin-right: 6px;
          }
        }
        .content {
          padding: 0 40px;
          text-align: right;
          .block {
            float: left;
            margin-top: 20px;
            span {
              display: inline-block;
              width: 60px;
              text-align: right;
            }
          }
          .el-textarea {
            width: 506px;
          }
          .el-upload .el-upload--picture-card {
            width: 200px !important;
            height: 200px !important;

          }
        }

      }
      /*//分配弹框*/
      .distribute {
        width: 400px;
        height: 224px;
        margin-left: -200px;
        margin-top: -112px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 999;
        border-radius: 10px;
        .title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: left;
          border-bottom: 2px solid #3a90b3;
          /*margin-bottom:26px;*/
          a {
            color: #3a90b3;
            font-size: 18px;
            padding-left: 20px;
          }
          div {
            margin-top: 15px;
            float: right;
            width: 24px;
            height: 24px;
            color: #363636;
            margin-right: 6px;
          }
        }
        .content {
          margin-left: 30px;
          margin-top: 20px;
        }
      }
      /*查看弹框*/
      .examine {
        width: 655px;
        height: 690px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -327px;
        margin-top: -345px;
        z-index: 999;
        border-radius: 10px;
        .title {
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: left;
          border-bottom: 2px solid #3a90b3;
          /*margin-bottom:26px;*/
          a {
            color: #3a90b3;
            font-size: 18px;
            padding-left: 20px;
          }
          div {
            margin-top: 15px;
            float: right;
            width: 24px;
            height: 24px;
            color: #363636;
            margin-right: 6px;
          }
        }
        .content {
          padding: 0 40px;
          text-align: right;
          .block {
            float: left;
            margin-top: 20px;
            span {
              display: inline-block;
              width: 60px;
              text-align: right;
            }
          }
          .el-textarea {
            width: 506px;
          }
        }

      }
      .imgBox {
        img {
          width: 200px;
          height: 200px;
        }
        span {
          vertical-align: top;
        }

      }
      .secSpan {
        margin-left: 35px;
      }
    }

  }
</style>
