<!--后台管理-案件处理-->
<template>
  <div class="CaseReview">
    <!--------------案件处理右侧数据展示------>
    <div id="right">
      <!----------案件处理-->
      <div class="box">
        <div class="warning">
          <a>案件处理</a>
        </div>
      </div>
      <!-----------查询部分------->
      <div class="search">
        <div class="searchBox">
          <span>案件来源</span>
          <el-select v-model="CaseOriginVal" @change="selectChangeOrigin" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCaseOrigin"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="searchBox">
          <span>处理状态</span>
          <el-select v-model="CaseStatusVal" @change="selectChangeStatus" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCase"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="searchBox" v-show="false">
          <span>责任部门</span>
          <el-select v-model="DutyMainVal" @change="selectChangeDuty" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsDuty"
              :key="item.value"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="searchBox">
          <span>污染类别</span>
          <el-select v-model="PollutionClassVal" @change="selectChangePollution" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsPollution"
              :key="item.value"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="block" style="margin-top: 20px;">
          <span class="demonstration">案件时间</span>
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
          <span>乡镇名称</span>
          <el-input v-model='cityName' placeholder="请输入内容"></el-input>
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
          prop="datasource"
          label="案件来源"
          width="200">
        </el-table-column>
        <el-table-column
          prop="pollutiontype"
          label="污染类别"
          width="150">
        </el-table-column>
        <el-table-column
          prop="type"
          label="处理状态"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="案发时间"
          width="">
        </el-table-column>
        <el-table-column
          prop="location"
          label="位置">
        </el-table-column>
        <el-table-column
          prop="departmenttype"
          label="责任部门">
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template scope="scope">
            <div v-if="scope.row.status==='未处理'&&dealStatus!=='已提交'">
              <el-button v-show="$store.state.responsibility === false" @click="handleExamineClick(scope.row)"
                         type="text" size="small" class='eidt'>分配
              </el-button>
            </div>
            <div v-else>
              <el-button @click="handleExamineClick(scope.row)" type="text" size="small" class='eidt'>查看</el-button>
            </div>
            <!--<div v-if="scope.row.status=='处理完毕'||scope.row.status=='未通过'||scope.row.status=='已派发'">-->
            <!--<el-button @click="handleExamineClick(scope.row)" type="text" size="small" class='eidt'>查看</el-button>-->
            <!--</div>-->
            <!--<div v-if="scope.row.status=='待审核'">-->
            <!--<el-button @click="handleReplyClick(scope.row)" type="text" size="small" class='eidt'>审核</el-button>-->
            <!--</div>-->
          </template>
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
      <!--------------审核弹框部分--------------->
      <div class="popUp" v-if="isUpdate">
        <div class="mask"></div>
        <div class="succ-pop reply">
          <div class="title">
            <a>案件详情</a>
            <div class="el-icon-close" @click="isUpdate=false"></div>
          </div>
          <div class="content">
            <div class="block" style="margin-right: 40px;">
              <span>污染类别</span>
              <el-input v-model="PollutionClassPop" placeholder="" disabled></el-input>
            </div>
            <div class="block">
              <span>案发时间</span>
              <el-input v-model="CaseTimePop" placeholder="" disabled></el-input>
            </div>
            <div class="block">
              <span>位置</span>
              <el-input v-model="CasePositionPop" placeholder="" style='width:504px' disabled></el-input>
            </div>
            <div class="block" style="margin-right: 40px;">
              <span>案件状态</span>
              <el-input v-model="CaseStatusPop" placeholder="" disabled></el-input>
            </div>
            <div class="block">
              <span>责任部门</span>
              <el-input v-model="CaseDutyPop" placeholder="" disabled></el-input>
            </div>
            <div class="block" style="margin-bottom: 10px;">
              <span class="left">描述</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder=""
                v-model="textarea"
                disabled>
              </el-input>
            </div>
            <div class="special" style="margin-bottom: 20px;">
              <span>派发时间</span>
              <el-input v-model="DispatchTime" placeholder="" disabled></el-input>
            </div>
            <div>
              <div class="block imgBox left" style="margin:0;">
                <span class="left">案件照片</span>
                <el-carousel height="200px">
                  <el-carousel-item v-for="(item,index) in hjwfBusCaseattachList" :key="index">
                    <img :src="item.attachment"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="block imgBox left" style="margin:0;">
                <span class="left">案后照片</span>
                <el-carousel height="200px">
                  <el-carousel-item v-for="(item,index) in afterCaseImg" :key="index">
                    <img :src="item"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <!--<span class="left" style="margin-left: 50px;">案后照片</span>
                            <el-carousel height="200px">
                              <el-carousel-item v-for="(item,index) in afterCaseImg" :key="index">
                                <img :src="item" />
                              </el-carousel-item>
                            </el-carousel>-->
              <!--<div class="left">-->
              <!--<div class="img-list">
                                  <div v-if="imagelist">
                                      <div class="img-content" v-for="(item,key) in imagelist" :key="key">
                                          <img :src="item.url" >-->
              <!-- 删除icon
                                    <!--<div class="del">
                                        <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
                                    </div>

                                </div>
                            </div>-->
              <!--<div class="img-upload" v-if="!imagelist.length">
                                    <el-upload class="uploader"
                                      ref="upload"
                                      list-type="picture-card"
                                      :show-file-list="false"
                                      :action="imgUrl"
                                      :data="params.data"
                                      name='uploadFile'
                                      :before-upload="beforeAvatarUpload"
                                      :on-change="uploadOnChange"
                                      :on-success="uploadOnSuccess"
                                      :on-error="uploadOnError"
                                      :on-progress="uploadOnProgress">
                                    <img src="../../../../static/imgs/main/点击添加图片.png" />
                                    <div class="el-upload__text">点击选择图片<br>支持jpg/png格式<br>不超过5M</div>
                                    </el-upload>
                                </div>-->

              <!--</div>-->
              <!--</div>-->
            </div>
            <div class="special">
              <span>审核</span>
              <el-button type="primary" plain @click="GetCaseAduit(0)">通过</el-button>
              <el-button type="primary" plain @click="GetCaseAduit(1)">不通过</el-button>
            </div>
            <!--<div class="block">
                            <span>处理结果</span>
                            <el-input v-model="CaseDealPop" placeholder="" style='width:504px'></el-input>
                          </div>
                        <el-row style='position: absolute;bottom: 30px;right: 30px;'>
                            <el-button type="primary" @click='GetEditResult'>发布</el-button>
                            <el-button plain @click='isUpdate=false'>取消</el-button>
                        </el-row>-->
          </div>
        </div>
      </div>
      <!--------------查看弹框部分--------------->
      <div class="popUp" v-if="Examine">
        <div class="mask"></div>
        <div class="succ-pop examine">
          <div class="title">
            <a>案件详情</a>
            <div class="el-icon-close" @click="Examine=false"></div>
          </div>
          <div class="content">
            <div class="block" style="margin-right: 40px;">
              <span>污染类别</span>
              <el-input v-model="PollutionClassPopExamine" placeholder="" disabled></el-input>
            </div>
            <div class="block">
              <span>案发时间</span>
              <el-input v-model="CaseTimePopExamine" placeholder="" disabled></el-input>
            </div>
            <div class="block">
              <span>位置</span>
              <el-input v-model="CasePositionPopExamine" placeholder="" style='width:504px' disabled></el-input>
            </div>
            <div class="block" style="margin-right: 40px;">
              <span>案件状态</span>
              <el-input v-model="CaseStatusPopExamine" placeholder="" disabled></el-input>
            </div>
            <div class="block">
              <span>责任部门</span>
              <el-input v-model="CaseDutyPopExamine" placeholder="" disabled></el-input>
            </div>
            <div class="block" style="margin-bottom: 10px;">
              <span class="left">内容</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textareaExamine"
                disabled>
              </el-input>
            </div>
            <div class="special" v-if="CaseStatusPopExamine=='未处理'">
              <span>指派</span>
              <el-select v-model="distributePopVal" placeholder="请选择" @change="selectFenPeiChangeDuty">
                <el-option
                  v-for="item in optionsDistributePop"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="special" v-else>
              <span>派发时间</span>
              <el-input v-model="DispatchTimePopExamine" placeholder="" disabled></el-input>
              <div style="display: inline-block;margin-left: 35px;" v-if="CaseStatusPopExamine=='已结案'">
                <span>结案时间</span>
                <el-input v-model="closeTime" placeholder="" disabled></el-input>
              </div>
            </div>

            <div class="block imgBox">
              <span>案件照片</span>
              <el-carousel height="200px">
                <el-carousel-item v-for="(item,index) in hjwfBusCaseattachList" :key="index">
                  <img v-if='item.attachment' :src="item.attachment"/>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="block imgBox secSpan" v-if="CaseStatusPopExamine=='已处理'||CaseStatusPopExamine=='已结案'">
              <span>案后照片</span>
              <el-carousel height="200px">
                <el-carousel-item v-for="(item,index) in afterCaseImg" :key="index">
                  <img :src="item"/>
                </el-carousel-item>
              </el-carousel>
            </div>
            <!--<div class="block">
                            <span>处理结果</span>
                            <el-input v-model="CaseDealPopExamine" placeholder="" style='width:504px;' disabled></el-input>
                          </div>-->
            <el-row style='position: absolute;bottom: 20px;right: 50px;'>
              <el-button type="primary" @click='GetEditCase' v-if="CaseStatusPopExamine=='未处理'">确定</el-button>
              <el-button plain @click='Examine=false'>取消</el-button>
            </el-row>

          </div>
        </div>
      </div>
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
        //案件状态
        optionsCase: [{
          value: '1',
          label: '已提交'
        },
          {
            value: '2',
            label: '未处理'
          },
          {
            value: '3',
            label: '已结案'
          }],
        //责任部门
        optionsDuty: [],
        //污染类别
        optionsPollution: [],
        //分配弹框责任部门选择
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
        totalCount: 1,
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
        CaseStatusVal: '未处理',
        //责任部门
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
        CaseDutyPop: '',//责任部门
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
        CaseDutyPopExamine: '',//责任部门
        textareaExamine: '',//内容
        CaseDealPopExamine: '',//处理结果
        hjwfBusCaseattachList: [],
        status: '',
        departmenttype: '',
        pollutiontype: '',
        id: '',
        zrxtCode: '',
        afterCaseImg: '',
        imgUrl: '',
        //案件来源
        optionsCaseOrigin: [
//	         	{
//		          value: '1',
//		          label: '领导督办'
//		        }, 
          {
            value: '2',
            label: '巡查'
          },
//	         	{
//		          value: '3',
//		          label: '市民投诉'
//		        },
//	         	{
//		          value: '4',
//		          label: '信访'
//		        }
        ],
        CaseOriginVal: '',
        origin: '',
        cityName: '',
        DispatchTimePopExamine: '',//派发时间
        closeTime: '',
        DispatchTime: '',//审核派发时间
        dealStatus:''
      }
    },
    created() {

    },
    mounted() {
      this.CaseStatusVal = '2';
      this.GetMonitoringDay();
      this.GetCaseAll();//责任部门
      this.GetPollutionType();//污染类别
      this.imgUrl = api.CaseImgUp();
//      	console.log(this.imgUrl)
      //console.log(this.$store.state.Superadministrator)
    },
    computed: {
      proStatus() {//上传状态
        if (this.pass) {
          return 'success'
        } else if (this.pass == false) {
          return 'exception'
        } else {
          return ''
        }
      }
    },
    methods: {
      //处理结果
      GetEditResult() {
        let t = this;
        let id = this.id;
        let handlingResult = this.CaseDealPop;
        let afterPath = this.fileUrl;
        api.GetEditResult(id, handlingResult, afterPath).then(res => {
          console.log(res)
          if (res.data.status) {
            t.GetMonitoringDay();
            t.$message.success("填写处理结果成功")
            t.isUpdate = false;
          }

        })
      },
      //点击审核
      handleReplyClick(row) {
        console.log(row)
        this.isUpdate = true;
        this.PollutionClassPop = row.pollutiontype;//污染类别
        this.CaseTimePop = row.createtime;//案发时间
        this.CasePositionPop = row.location;//位置
        this.CaseStatusPop = row.status;//案件状态
        this.CaseDutyPop = row.departmenttype;//责任部门
        this.textarea = row.description;//内容
        this.hjwfBusCaseattachList = row.hjwfBusCaseattachList;
        this.afterCaseImg = row.afterCaseImg;
        this.DispatchTime = row.dispatchTime;
        this.id = row.id;
      },
      //点击查看
      handleExamineClick(row) {
        this.Examine = true;
        this.distributePopVal = '';
        console.log(row);
        this.id = row.id;
        let casecode = row.casecode;
        this.PollutionClassPopExamine = row.pollutiontype;//污染类别
        this.CaseTimePopExamine = row.createtime;//案发时间
        this.CasePositionPopExamine = row.location;//位置
        this.CaseStatusPopExamine = row.status;//案件状态
        this.CaseDutyPopExamine = row.departmenttype;//责任部门
        this.textareaExamine = row.description;//内容
        this.CaseDealPopExamine = row.handlingResult;//处理结果
        this.hjwfBusCaseattachList = row.hjwfBusCaseattachList;
        this.afterCaseImg = row.afterCaseImg;
        this.DispatchTimePopExamine = row.dispatchTime;
        this.closeTime = row.closeTime;
        console.log(this.hjwfBusCaseattachList)
      },
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
      handleCurrentChange(val) {
        this.pageNo = val;
        this.GetMonitoringDay();
      },
      //关闭分配提示
      closeWin() {
        this.isUpdate = false;
      },
      //案件状态选择
      selectChangeStatus(val) {
        this.status = val;
      },
      //案件来源选择
      selectChangeOrigin(val) {
        this.origin = val;
      },
      //责任部门选择
      selectChangeDuty(val) {
        this.departmenttype = val;
      },
      //分配责任部门选择
      selectFenPeiChangeDuty(val) {
        this.zrxtCode = val;
      },
      //污染类型选择
      selectChangePollution(val) {
        this.pollutiontype = val;
      },
      //获取责任部门
      GetCaseAll() {
        let t = this;
        api.GetCaseAll().then(result => {
          t.optionsDuty = result.data.data;
          t.optionsDistributePop = result.data.data;
        })
      },
      //获取污染类型
      GetPollutionType() {
        api.GetPollutionType().then(result => {
          let t = this;
          console.log(result)
          t.optionsPollution = result.data.data;
//    				t.optionsDistributePop = result.data.data;
        })
      },
      //获取列表
      GetMonitoringDay() {
        let t = this;
        //let userId = this.$store.state.userId;
        let userId = t.$cookies.get('auth');
        let status = this.CaseStatusVal ? this.CaseStatusVal : -1;
        let datasource = this.origin;//案件来源
        let fkDepartmenttype = this.DutyMainVal ? this.DutyMainVal : -1;
        let location = this.cityName;
        let fkPollutiontype = this.PollutionClassVal ? this.PollutionClassVal : -1;
        let startTime = this.CaseStartTime ? this.CaseStartTime : '';
        let endTime = this.CaseEndTime ? this.CaseEndTime : '';
        let pageSize = 10;
        let pageNo = this.pageNo;
        this.ListData = [];
        let deal;
        switch (status) {
          case '1':
            deal = '已提交';
            break;
          case '2':
            deal = '未处理';
            break;
          case '3':
            deal = '已结案';
            break;
        }
        this.dealStatus = deal;
        api.GetCaseList(userId, status, datasource, fkDepartmenttype, fkPollutiontype, location, startTime, endTime, pageSize, pageNo).then(result => {
          //console.log(result)
          if (result) {
            let InfoData = result.data.data.rows;
            t.totalCount = result.data.data.total;
            if (InfoData) {
              InfoData.forEach(item => {
                let tableData = {};
                tableData.casecode = item.casecode;//案件编码
                tableData.createtime = item.createtime;//案发时间
                tableData.description = item.description;//案件内容
                tableData.departmenttype = item.departmenttype;//责任部门
                tableData.location = item.location;//位置
                tableData.pollutiontype = item.pollutiontype;//污染类型
                tableData.status = this.StatusDeal(item.status);//处理状态
                tableData.hjwfBusCaseattachList = item.hjwfBusCaseattachList;//图片
                tableData.afterCaseImg = item.aftercaseimg ? item.aftercaseimg.split(',') : [];//安后图片
                tableData.username = item.username;
                tableData.id = item.id;
                tableData.handlingResult = item.handlingResult;//处理结果
                tableData.dispatchTime = item.dispatchTime;//派发时间
                tableData.closeTime = item.closeTime;//结案时间
                tableData.datasource = t.GetCaseDatasource(item.datasource);//案件来源
                tableData.type = deal;//结案时间
                t.ListData.push(tableData);
              })
            }
          }
        });
      },
      //案件审核
      GetCaseAduit(val) {
        let t = this;
        let id = this.id;
        let state = val;
        api.GetCaseAduit(id, state).then(res => {
          this.GetMonitoringDay();
          t.isUpdate = false;
        })
      },
      //案件来源
      GetCaseDatasource(val) {
        switch (val) {
          case '1':
            return '领导督办';
            break;
          case '2':
            return '巡查';
            break;
          case '3':
            return '市民投诉';
            break;
          case '4':
            return '信访';
            break;
          default:
            break;
        }
      },
      //分配责任部门
      GetEditCase() {
        let t = this;
        let id = this.id;
        let zrxtCode = this.zrxtCode;
        api.GetEditCase(id, zrxtCode).then(res => {
          t.Examine = false;
          t.GetMonitoringDay();
        })
      },
      //导出
      GetExportCase() {
        let t = this;
        let userId = t.$cookies.get('auth');
        let status = this.CaseStatusVal ? this.CaseStatusVal : -1;
        let datasource = this.origin;//案件来源
        let fkDepartmenttype = this.DutyMainVal ? this.DutyMainVal : -1;
        let location = this.cityName;
        let fkPollutiontype = this.PollutionClassVal ? this.PollutionClassVal : -1;
        let startTime = this.CaseStartTime ? this.CaseStartTime : '';
        let endTime = this.CaseEndTime ? this.CaseEndTime : '';
        let pageSize = 10;
        let pageNo = this.pageNo;
        api.GetExportCase(userId,status, datasource, fkDepartmenttype, fkPollutiontype, location, startTime, endTime, pageSize, pageNo);
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
      //获取县市区数据（下拉框）
      GetFirstGridDropDown() {
        let t = this;
        api.GetFirstGridDropDown().then(res => {
          t.options = res.data.Data;
        })
      },
      //将时间戳转化为时间格式
      Format(timestamp) {
        var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year + '-' + month + '-' + day;
      },
      //案件状态判断
      StatusDeal(val) {
        switch (val) {
          case 1:
            return '未处理'
            break;
          case 2:
            return '已指派'
            break;
          case 3:
            return '已处理'
            break;
          case 4:
            return '已结案'
            break;
          default:
            break;
        }
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
    border: 1px solid #d1dbe5;

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

  #right {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 0 20px;
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
          height: 40px;
          line-height: 40px;
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
          .special {
            text-align: left;
            span {
              margin-top: 20px;
              display: inline-block;
              width: 60px;
              text-align: right;
            }
            button {
              margin-left: 20px;
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
            margin-top: 10px;
            float: right;
            width: 24px;
            height: 24px;
            color: #363636;
            margin-right: 6px;
          }
        }
        .content {
          margin-left: 30px;
          margin-top: 10px;
        }
      }
      /*查看弹框*/
      .examine {
        width: 655px;
        height: 620px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -327px;
        margin-top: -310px;
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
            margin-top: 10px;
            span {
              display: inline-block;
              width: 60px;
              text-align: right;
            }
          }
          .special {
            text-align: left;
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
