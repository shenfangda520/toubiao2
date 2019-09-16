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
          <span>案件序号</span>
          <el-input v-model='CaseCode' clearable placeholder="请输入内容"></el-input>
        </div>
        <div>
          <div style="margin-top: 10px;">
            <div class="searchBox">
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
            <span>乡镇名称</span>
            <el-input v-model='cityName' clearable placeholder="请输入内容"></el-input>
          </div>
          <div class="block" style="margin-top: 10px;">
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
            <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
            <div class="InsertOrOut">
              <span>
                <el-button type="primary" @click="GetExportCase">Excel导出</el-button>
              </span>
            </div>
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
          prop="casecode"
          label="案件序号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="datasource"
          label="案件来源"
          width="100">
        </el-table-column>
        <el-table-column
          prop="pollutiontype"
          label="污染类别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="type"
          label="处理状态"
          width="150">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="案发时间">
        </el-table-column>
        <el-table-column
          prop="location"
          label="位置">
        </el-table-column>
        <el-table-column
          prop="departmenttype"
          label="责任部门"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template scope="scope">
            <span v-if="scope.row.status==='未处理'&&dealStatus!=='已提交'">
              <el-button @click="handleExamineClick(scope.row)"
                         type="text" size="small" class='eidt'>分配
              </el-button>
            </span>
            <span v-else>
              <el-button @click="handleExamineClick(scope.row)" type="text" size="small" class='eidt'>查看</el-button>
            </span>
            <span>
              <el-button @click="deleteCase(scope.row)" type="text" size="small">删除</el-button>
            </span>
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
              <span>序号</span>
              <el-input v-model="Order" placeholder="" disabled></el-input>
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
              <span>案件序号</span>
              <el-input v-model="CaseOrder" placeholder="" disabled></el-input>
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
            <div class="block" style="margin-bottom: 5px;">
              <span class="left">内容</span>
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="textareaExamine"
                disabled>
              </el-input>
            </div>
            <div class="special" v-if="CaseStatusPopExamine=='未处理'||CaseStatusPopExamine=='已处理'">
              <span>指派</span>
              <el-select v-model="distributePopVal" placeholder="请选择" @change="selectFenPeiChangeDuty">
                <el-option
                  v-for="item in optionsDistributePop"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <div style="display: inline-block;margin-left: 35px;" v-if="CaseStatusPopExamine=='已处理'">
                <span>派发时间</span>
                <el-input v-model="DispatchTimePopExamine" placeholder="" disabled></el-input>
              </div>
            </div>
            <div class="special" v-if="CaseStatusPopExamine=='已指派'||CaseStatusPopExamine=='已结案'">

              <div style="display: inline-block;" v-if="CaseStatusPopExamine=='已结案'">
                <span>案发时间</span>
                <el-input v-model="CaseTimePopExamine" placeholder="" disabled></el-input>
              </div>
              <div style="display: inline-block;margin-left: 35px;" v-if="CaseStatusPopExamine=='已结案'">
                <span>派发时间</span>
                <el-input v-model="DispatchTimePopExamine" placeholder="" disabled></el-input>
              </div>
              <div style="display: inline-block;" v-if="CaseStatusPopExamine=='已指派'">
                <span>派发时间</span>
                <el-input v-model="DispatchTimePopExamine" placeholder="" disabled></el-input>
              </div>
            </div>
            <div class="special" v-if="CaseStatusPopExamine=='已结案'">
              <span>结案时间</span>
              <el-input v-model="closeTime" placeholder="" disabled></el-input>
              <div style="display: inline-block;margin-left: 35px;">
                <span>案件用时</span>
                <el-input v-model="CaseTime" placeholder="" disabled></el-input>
              </div>
            </div>
            <div class="special" >
              <span>上报人</span>
              <el-input v-model="creater" placeholder="" disabled></el-input>
              <div style="display: inline-block;margin-left: 35px;">
                <span>乡镇名称</span>
                <el-input v-model="netname" placeholder="" disabled></el-input>
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
            <el-row style='position: absolute;bottom: 10px;right: 55px;'>
              <el-button type="primary" @click='GetEditCase'
                         v-if="CaseStatusPopExamine=='未处理'||CaseStatusPopExamine=='已处理'">派发
              </el-button>
              <el-button type="primary" @click='GetEditResult' v-if="CaseStatusPopExamine=='已处理'">确定</el-button>
              <el-button plain @click='Examine=false'>取消</el-button>
            </el-row>

          </div>
        </div>
      </div>
      <!-- 案件录入 -->
      <div class="box">
        <div class="warning">
          <a>案件录入</a>
        </div>
      </div>
      <!--参数录入-->
      <div id="CaseIn" style="overflow: hidden;">
        <!-- 左侧内容 -->
        <div class="CaseIn_left">
          <div class="CaseIn_left_cell">
            <span>上报人</span>
            <el-input v-model="CaseInParam.creater" placeholder="名称"></el-input>
          </div>
          <div class="CaseIn_left_cell">
            <div class="block">
              <span class="demonstration">案发时间</span>
              <el-date-picker v-model="CaseInParam.createtime" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </div>
          <div class="CaseIn_left_cell">
            <span>地址</span>
            <el-input v-model="CaseInParam.location" placeholder="地址"></el-input>
          </div>
          <div class="CaseIn_left_cell describe">
            <span>案前描述</span>
            <el-input type="textarea" :rows="6" v-model="CaseInParam.description" placeholder="案前描述"></el-input>
          </div>
          <div class="CaseIn_mid_cell">
            <span style="float: left">案前照片</span>
            <div style="float: left">
              <div class="img-list">
                <div v-if="imagelist">
                  <div class="img-content" v-for="(item,key) in imagelist" :key="key">
                    <img :src="item.url">
                    <!-- 删除icon -->
                    <div class="del">
                      <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
                    </div>
                  </div>
                </div>
                <div class="img-upload" v-if="imagelist.length<5">
                  <el-upload class="uploader" ref="upload" list-type="picture-card"
                             :show-file-list="false"
                             :action="imgUrl"
                             :data="params.data"
                             name='file_list'
                             :before-upload="beforeAvatarUpload"
                             :on-change="uploadOnChange"
                             :on-success="uploadOnSuccess"
                             :on-error="uploadOnError"
                             :on-progress="uploadOnProgress">
                    <img src="../../../../static/imgs/main/点击添加图片.png"/>
                    <!--<div class="el-upload__text">点击选择图片</div>-->
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="CaseIn_mid">
          <div class="CaseIn_mid_cell">
            <span>案件序号</span>
            <el-input placeholder="D00001" v-model="CaseInParam.casecode"></el-input>
          </div>
          <div class="CaseIn_mid_cell">
            <div class="block">
              <span class="demonstration">派发时间</span>
              <el-date-picker v-model="CaseInParam.dispatchTime" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </div>
          </div>
          <div class="CaseIn_mid_cell">
            <span>责任部门</span>
            <el-select v-model="CaseInParam.fkDepartmenttype" clearable placeholder="请选择"
                       @change="selectChangefkDepartmenttype">
              <el-option v-for="item in optionsDuty" :key="item.id" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </div>
          <div class="CaseIn_mid_cell describe">
            <span>案后描述</span>
            <el-input type="textarea" :rows="6" v-model="CaseInParam.handlingResult" placeholder="案后描述"
            ></el-input>
          </div>
          <div class="CaseIn_mid_cell">
            <span style="float: left">案后照片</span>
            <div style="float: left">
              <div class="img-list">
                <div v-if="imagelist1">
                  <div class="img-content" v-for="(item,key) in imagelist1" :key="key">
                    <img :src="item.url">
                    <!-- 删除icon -->
                    <div class="del">
                      <i @click="handleFileRemove1(item,key)" class="el-icon-delete"></i>
                    </div>
                  </div>
                </div>
                <div class="img-upload" v-if="imagelist1.length<2">
                  <el-upload class="uploader" ref="upload" list-type="picture-card"
                             :show-file-list="false"
                             :action="imgUrl"
                             :data="params1.data"
                             name='file_list'
                             :before-upload="beforeAvatarUpload1"
                             :on-change="uploadOnChange1"
                             :on-success="uploadOnSuccess1"
                             :on-error="uploadOnError1"
                             :on-progress="uploadOnProgress1">
                    <img src="../../../../static/imgs/main/点击添加图片.png"/>
                    <!--<div class="el-upload__text">点击选择图片</div>-->
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="CaseIn_right">
          <div class="CaseIn_right_cell">
            <span>乡镇名称</span>
            <el-input v-model="CaseInParam.netname" placeholder="乡镇名称"></el-input>
          </div>
          <div class="CaseIn_right_cell">
            <div class="block">
              <span class="demonstration">结案时间</span>
              <el-date-picker v-model="CaseInParam.closeTime" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm:ss">
                >
              </el-date-picker>
            </div>
          </div>
          <div class="CaseIn_right_cell">
            <span>污染类别</span>
            <el-select v-model="CaseInParam.fkPollutiontype" clearable placeholder="请选择"
                       @change="selectChangefkPollutiontype">
              <el-option v-for="item in optionsPollution" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="case_submit">
        <el-button type="primary" class='btns' @click='addCase'>确定</el-button>
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
        optionsCase: [
          {
            value: '0',
            label: '全部'
          },{
          value: '1',
          label: '已提交'
        },
          {
            value: '21',
            label: '待分配'
          },
          {
            value: '22',
            label: '待审核'
          },
          {
            value: '3',
            label: '已结案'
          },
          {
            value: '4',
            label: '已派发'
          },
          {
            value: '5',
            label: '误报'
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
        CaseStatusVal: '全部',
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
          {
            value: '1',
            label: 'app'
          },
          {
            value: '2',
            label: '微信'
          },
        ],
        CaseOriginVal: '',
        origin: '',
        cityName: '',
        DispatchTimePopExamine: '',//派发时间
        closeTime: '',
        DispatchTime: '',//审核派发时间
        dealStatus: '',
        //案发原因选择
        optionsCaseReason: [{
          value: '1',
          label: '未开治理设备'
        }, {
          value: '2',
          label: '设备故障'
        }, {
          value: '3',
          label: '搬迁'
        }, {
          value: '4',
          label: '查封'
        }, {
          value: '5',
          label: '摄像头被遮挡'
        }, {
          value: '6',
          label: '未营业'
        }, {
          value: '7',
          label: '误报'
        }],
        isDistort:'',
        //案件录入
        optionsCompany: [], //企业
        CaseInParam: {
          creater: '',//上报人
          casecode: '',//案件序号
          netname: '',//乡镇名称
          createtime: '',//案发时间
          dispatchTime: '',//派发时间
          closeTime: '',//结案时间
          fkDepartmenttype: '',//责任主体
          fkPollutiontype: '',//污染类型
          description: '',//案前描述
          handlingResult: '',//案后描述
          location: '',//地址
        },
        imagelist: [],//案前照片
        pass: null,
        fileUrl: '',
        params: {
          //						action:
          //						'http://gkpt.zq12369.com:8013/servicePlatform/admin/caseData/uploadAnalysisFile',
          data: {}
        },
        imagelist1: [],//案后照片
        pass: null,
        fileUrl1: '',
        params1: {
          //						action:
          //						'http://gkpt.zq12369.com:8013/servicePlatform/admin/caseData/uploadAnalysisFile',
          data: {}
        },
        CaseTime: '',//案件用时
        CaseOrder: '',//案件序号
        CaseCode: '',//案件序号查询
        creater: '',//上报人
        netname: '',//乡镇名称
      }
    },
    created() {

    },
    mounted() {
      this.CaseStatusVal = '0';
      this.GetMonitoringDay();
      this.GetCaseAll();//责任部门
      this.GetPollutionType();//污染类别
      this.imgUrl = api.CaseImgUp();
      // console.log(this.imgUrl)
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
      //上传案前图片
      uploadOnProgress(e, file) { //开始上传
        console.log(e.percent, file)
        this.progress = Math.floor(e.percent)
      },
      uploadOnChange(file) {
        console.log("——————————change——————————")
        // console.log(file)
        if (file.status == 'ready') {
          console.log("ready")
          this.pass = null;
          //this.progress = 0;
        } else if (file.status == 'fail') {
          this.$message.error("图片上传出错，请刷新重试！")
        }
      },
      uploadOnSuccess(e, file) { //上传附件
        console.log("——————————success——————————")
        console.log(file)
        this.fileUrl = file.response.data;
        console.log(this.fileUrl)
        this.pass = true;
        this.$message.success("上传成功")
        this.imagelist.push({
          url: this.fileUrl,
          name: 'before'
        })
        console.log(this.imagelist)
      },
      uploadOnError(e, file) {
        console.log("——————————error——————————")
        console.log(e)
        this.pass = false;
      },
      handleFileRemove(file, i) { //删除图片
        console.log(file, i)
        if (!file.url) {
          return false;
        }
        let that = this;
        this.$confirm('是否删除此图片？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //可添加ajax
          this.$message.success("删除成功")
          this.$message({
            type: 'success',
            message: '删除成功',
            onClose: () => {
              that.imagelist.splice(i, 1)
            }
          })
        }).catch((meg) => console.log(meg))
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },

      //上传案后图片
      uploadOnProgress1(e, file) { //开始上传
        console.log(e.percent, file)
        this.progress = Math.floor(e.percent)
      },
      uploadOnChange1(file) {
        console.log("——————————change——————————")
        // console.log(file)
        if (file.status == 'ready') {
          console.log("ready")
          this.pass = null;
          //this.progress = 0;
        } else if (file.status == 'fail') {
          this.$message.error("图片上传出错，请刷新重试！")
        }
      },
      uploadOnSuccess1(e, file) { //上传附件
        console.log("——————————success——————————")
        console.log(file)
        this.fileUrl1 = file.response.data;
        this.pass = true;
        this.$message.success("上传成功")
        this.imagelist1.push({
          url: this.fileUrl1,
          name: 'after'
        })
        console.log(this.imagelist1)
      },
      uploadOnError1(e, file) {
        console.log("——————————error——————————")
        console.log(e)
        this.pass = false;
      },
      handleFileRemove1(file, i) { //删除图片
        console.log(file, i)
        if (!file.url) {
          return false;
        }
        let that = this;
        this.$confirm('是否删除此图片？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //可添加ajax
          this.$message.success("删除成功")
          this.$message({
            type: 'success',
            message: '删除成功',
            onClose: () => {
              that.imagelist1.splice(i, 1)
            }
          })
        }).catch((meg) => console.log(meg))
      },
      beforeAvatarUpload1(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
      //案件审核结案
      GetEditResult() {
        let t = this;
        let id = this.id;
        let handlingResult = '';
        let afterPath = '';
        api.GetEditResult(id, handlingResult, afterPath).then(res => {
          // console.log(res)
          if (res.data.status > 0) {
            t.GetMonitoringDay();
            t.$message.success("处理成功")
            t.Examine = false;
          }

        })
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
        this.CaseOrder = row.casecode;//案件序号
        this.CaseTime = row.casejlsj;//案件用时
        this.creater = row.sysUser.name;//上报人
        this.netname = row.netname;//乡镇名称
        this.isDistort = row.isDistort;//乡镇名称
        //console.log(this.hjwfBusCaseattachList)
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
        let type = this.CaseStatusVal ? this.CaseStatusVal : -1;
        let datasource = this.origin;//案件来源
        let fkDepartmenttype = this.DutyMainVal ? this.DutyMainVal : -1;
        let location = this.cityName;
        let fkPollutiontype = this.PollutionClassVal ? this.PollutionClassVal : -1;
        let startTime = this.CaseStartTime ? this.CaseStartTime : '';
        let endTime = this.CaseEndTime ? this.CaseEndTime : '';
        let pageSize = 10;
        let pageNo = this.pageNo;
        let casecode = this.CaseCode;
        this.ListData = [];
        let deal;
        switch (type) {
          case '0':
            deal = '';
            break;
          case '1':
            deal = '已提交';
            break;
          case '21':
            deal = '待分配';
            break;
          case '22':
            deal = '待审核';
            break;
          case '3':
            deal = '已结案';
            break;
          case '4':
            deal = '已派发';
            break;
          case '5':
            deal = '误报';
            break;
        }
        this.dealStatus = deal;
        api.GetCaseList(userId, type, datasource, fkDepartmenttype, fkPollutiontype, location, startTime, endTime, pageSize, pageNo, casecode).then(result => {
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
                tableData.casecode = item.casecode;//案件序号
                tableData.sysUser = item.sysUser;//上报人
                tableData.netname = item.netname;//乡镇名称
                tableData.isDistort = item.isDistort;//乡镇名称
                tableData.datasource = t.GetCaseDatasource(item.datasource);//案件来源
                tableData.type = deal||this.StatusDeal(item.status);
                tableData.casejlsj = item.casejlsj ? item.casejlsj.replace(/\-/g, '') : '--';
                t.ListData.push(tableData);
              })
            }
          }
        });
      },
      //案件来源
      GetCaseDatasource(val) {
        switch (val) {
          case '1':
            return 'app';
            break;
          case '2':
            return '微信';
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
        api.GetExportCase(userId, status, datasource, fkDepartmenttype, fkPollutiontype, location, startTime, endTime, pageSize, pageNo);
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
      //选择信息来源
      selectChangedatasource(val) {
        this.CaseInParam.datasource = val;
      },
      //选择责任部门
      selectChangefkDepartmenttype(val) {
        this.CaseInParam.fkDepartmenttype = val;
      },
      //选择污染类别
      selectChangefkPollutiontype(val) {
        this.CaseInParam.fkPollutiontype = val;
      },

      //案件录入提交
      addCase() {
        if (this.CaseInParam.creater === "") {
          this.$message({
            message: '上报人不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.casecode === "") {
          this.$message({
            message: '案件序号不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.netname === "") {
          this.$message({
            message: '乡镇名称不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.createtime === "") {
          this.$message({
            message: '案发时间不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.dispatchTime === "") {
          this.$message({
            message: '派发时间不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.closeTime === "") {
          this.$message({
            message: '结案时间不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.location === "") {
          this.$message({
            message: '地址不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.fkDepartmenttype === "") {
          this.$message({
            message: '责任部门不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.fkPollutiontype === "") {
          this.$message({
            message: '污染类别不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.description === "") {
          this.$message({
            message: '案前描述不能为空',
            type: 'error'
          });
          return;
        }
        if (this.CaseInParam.handlingResult === "") {
          this.$message({
            message: '案后描述不能为空',
            type: 'error'
          });
          return;
        }
        if (this.imagelist === "") {
          this.$message({
            message: '案前照片不能为空',
            type: 'error'
          });
          return;
        }
        if (this.imagelist1 === "") {
          this.$message({
            message: '案前照片不能为空',
            type: 'error'
          });
          return;
        }

        let t = this;
        let addParam = this.CaseInParam;
        console.log(this.imagelist);
        let creater = addParam.creater;
        let casecode = addParam.casecode;
        let netname = addParam.netname;
        let createtime = addParam.createtime;
        let dispatchTime = addParam.dispatchTime;
        let closeTime = addParam.closeTime;
        let datasource = 2;
        let fkDepartmenttype = addParam.fkDepartmenttype;
        let fkPollutiontype = addParam.fkPollutiontype;
        let description = addParam.description;
        let handlingResult = addParam.handlingResult;
        let url = '';
        this.imagelist.forEach(item => {
          url += item.url[0] + ',';
        });
        let urls = url.slice(0, url.length - 1);
        let aftercase = '';
        this.imagelist1.forEach(item => {
          aftercase += item.url[0] + ',';
        });
        let aftercaseimg = aftercase.slice(0, aftercase.length - 1);
        // let urls = this.imagelist[0].url;
        // let aftercaseimg = this.imagelist1[0].url;
        let location = addParam.location;
        let status = 4;
        let userId = t.$cookies.get('auth');
        api.addCaseList(userId, creater, casecode, netname, createtime, dispatchTime, closeTime, datasource, fkDepartmenttype, fkPollutiontype, description, handlingResult, urls, aftercaseimg, location, status).then(res => {
          console.log(res)
          t.$message({
            message: '案件录入成功',
            type: 'success'
          });
          t.GetMonitoringDay();
          t.CaseInParam.creater = '';
          t.CaseInParam.casecode = '';
          t.CaseInParam.netname = '';
          t.CaseInParam.createtime = '';
          t.CaseInParam.dispatchTime = '';
          t.CaseInParam.closeTime = '';
          t.CaseInParam.fkDepartmenttype = '';
          t.CaseInParam.fkPollutiontype = '';
          t.CaseInParam.description = '';
          t.CaseInParam.handlingResult = '';
          t.fileUrl = '';
          t.fileUrl1 = '';
          t.CaseInParam.location = '';
          t.imagelist = [];
          t.imagelist1 = [];
        })
      },
      //删除案件
      deleteCase(row){
        let id = row.id;
        this.$confirm('此操作将删除此条案件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          api.deletedHjwfBusCaseinfo(id).then(res=>{
            console.log(res);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.GetMonitoringDay();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  #CaseIn {
    .el-textarea {
      width: 200px !important;
      resize: none !important;
      display: block;
      margin-left: 65px;
    }

    .el-date-editor.el-input {
      width: 200px !important;
    }

    .el-select {
      width: 200px !important;
    }
    .img-list {
      overflow: hidden;
      width: 100%;
      position: relative;
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

    .el-upload__text {
      position: absolute;
      top: 60px;
      left: 60px;
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
        /*margin-right: 20px;*/
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

    ::-webkit-scrollbar {
      width: 1px;
      height: 16px;
      background-color: #F5F5F5;
    }
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
        width: 640px;
        height: 500px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -320px;
        margin-top: -250px;
        z-index: 999;
        border-radius: 10px;
        .title {
          width: 100%;
          height: 40px;
          line-height: 40px;
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
          padding: 0 20px;
          text-align: right;
          height: 400px;
          overflow-y: scroll;
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
            margin-top: 5px;
            span {
              display: inline-block;
              width: 60px;
              text-align: right;
            }
          }
          .el-textarea {
            width: 506px !important;
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
    /*案件录入*/

    #CaseIn {
      width: 100%;
      text-align: left;
      .CaseIn_left,
      .CaseIn_mid,
      .CaseIn_right {
        float: left;
        /*margin-left: 220px;*/
        width: 33%;
      }
      .CaseIn_left,
      .CaseIn_mid,
      .CaseIn_right {
        .CaseIn_left_cell,
        .CaseIn_mid_cell,
        .CaseIn_right_cell {
          margin-top: 10px;
          span {
            display: inline-block;
            width: 60px;
            text-align: center;
          }
        }
      }
    }
    .case_submit {
      text-align: right;
    }

  }
</style>
