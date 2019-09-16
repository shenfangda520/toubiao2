<!--后台管理-巡查员管理-->
<template>
  <div class="businessOperation">
    <!--右侧数据展示-->
    <div id="right">
      <div class="box">
        <div class="warning">
          <a>巡查员管理</a>
        </div>
      </div>
      <div class="search">
        <div class="block">
          <span class="demonstration">网格员名称</span>
          <el-input v-model="GridOperator" placeholder="请输入内容"></el-input>
          <span class="demonstration">级别</span>
          <el-select v-model="levelName" @change="JBSelectName" placeholder="请选择">
            <el-option
                    v-for="item in levelOptions"
                    :key="item.value"
                    :label="item.Name"
                    :value="item.Id">
            </el-option>
          </el-select>
          <el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>
          <el-button type="primary" class='btns' @click="openWin">添加巡查员</el-button>
        </div>
        <div class="block">
          <span class="demonstration">组织</span>
          <el-select v-model="OrgSelectBoxName" filterable  @change="ZZSelectName" placeholder="请选择">
            <el-option
                    v-for="item in OrgSelectBoxOptions"
                    :key="item.value"
                    :label="item.Name"
                    :value="item.Id">
            </el-option>
          </el-select>
          <span class="demonstration">岗位</span>
          <el-select v-model="SelectBoxName" @change="GWSelectName" placeholder="请选择">
            <el-option
                    v-for="item in SelectBoxOptions"
                    :key="item.value"
                    :label="item.Name"
                    :value="item.Id">
            </el-option>
          </el-select>
          <el-button type="primary" class='btns' @click="Export">导出</el-button>
        </div>

      </div>
      <!--list-->
      <div class="box">
        <div class="warning">
          <a>列表</a>
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="Name"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          prop="LoginName"
          label="登录名"
        >
        </el-table-column>
        <el-table-column
          prop="OrgName"
          label="组织"
        >
        </el-table-column>
        <el-table-column
          prop="PostName"
          label="岗位"
        >
        </el-table-column>
        <el-table-column
          prop="LoginApp"
          label="登录APP"
        >
        </el-table-column>
        <el-table-column
          prop="IsHandling"
          label="处理案件"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width="260">
          <template scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
            <span style="color: #e0e0e0;">|</span>
            <el-button @click="resetPassword(scope.row)" type="text" size="small" class='eidt'>重置密码</el-button>
            <span style="color: #e0e0e0;">|</span>
            <el-button @click="changePassword(scope.row)" type="text" size="small" class='eidt'>修改密码</el-button>
            <span style="color: #e0e0e0;">|</span>
            <el-button @click="DeleteOperatorInfo(scope.row)" type="text" size="small" class='eidt'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      <!--添加弹框部分-->
      <div class="popUp" v-show="isNew">
        <div class="mask"></div>
        <div class="succ-pop">
          <div class="title">
            <a>添加</a>
            <div class="el-icon-close" @click="isNew=false"></div>
          </div>
          <div class="content">
            <div class="block">
              <span>姓名</span>
              <el-input v-model="Name" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>登录名</span>
              <el-input v-model="LoginName" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>经度</span>
              <el-input v-model="Longitude" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>纬度</span>
              <el-input v-model="Latitude" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>联系方式</span>
              <el-input v-model="ContactInformation" placeholder="请输入内容"></el-input>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>登录权限</span>
              <el-select v-model="LoginPC"
                         clearable
                         placeholder="请选择"
                         @change='DeviceNameChange1'>
                <el-option key="0" label="禁止" value="0"></el-option>
                <el-option key="1" label="允许" value="1"></el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>选择组织</span>
              <el-select v-model="reOrgSelectBoxName" filterable  @change="ZZreSelectName" placeholder="请选择">
                <el-option
                        v-for="item in reOrgSelectBoxOptions"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.Id">
                </el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>岗位</span>
              <el-select v-model="reSelectBoxName" @change="GWreSelectName" placeholder="请选择">
                <el-option
                        v-for="item in reSelectBoxOptions"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.Id">
                </el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>级别选择</span>
              <el-select v-model="relevelName" @change="JBreSelectName" placeholder="请选择">
                <el-option
                        v-for="item in relevelOptions"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.Id">
                </el-option>
              </el-select>
            </div>
            <el-row style='position: absolute;bottom: 20px;right: 30px;'>
              <el-button type="primary" @click='publish'>确定</el-button>
              <el-button plain @click='isNew=false'>取消</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!--编辑弹框部分-->
      <div class="popUp" v-show="isEdit">
        <div class="mask"></div>
        <div class="succ-pop">
          <div class="title">
            <a>编辑</a>
            <div class="el-icon-close" @click="isEdit=false"></div>
          </div>
          <div class="content">
            <div class="block">
              <span>姓名</span>
              <el-input v-model="Name" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>登录名</span>
              <el-input v-model="LoginName" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>经度</span>
              <el-input v-model="Longitude" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>纬度</span>
              <el-input v-model="Latitude" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>联系方式</span>
              <el-input v-model="ContactInformation" placeholder="请输入内容"></el-input>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>登录权限</span>
              <el-select v-model="LoginPC"
                         clearable
                         placeholder="请选择"
                         @change='DeviceNameChange3'>
                <el-option key="0" label="禁止" value="0"></el-option>
                <el-option key="1" label="允许" value="1"></el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>选择组织</span>
              <el-select v-model="reOrgSelectBoxName" filterable  @change="ZZreSelectName" placeholder="请选择">
                <el-option
                        v-for="item in reOrgSelectBoxOptions"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.Id">
                </el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>岗位</span>
              <el-select v-model="reSelectBoxName" @change="GWreSelectName" placeholder="请选择">
                <el-option
                        v-for="item in reSelectBoxOptions"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.Id">
                </el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>级别选择</span>
              <el-select v-model="relevelName" @change="JBreSelectName" placeholder="请选择">
                <el-option
                        v-for="item in relevelOptions"
                        :key="item.value"
                        :label="item.Name"
                        :value="item.Id">
                </el-option>
              </el-select>
            </div>
            <el-row style='position: absolute;bottom: 20px;right: 30px;'>
              <el-button type="primary" @click='EditUpdate'>确定</el-button>
              <el-button plain @click='isEdit=false'>取消</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <!--修改密码-->
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
        <!---->
        <div class="block">
          <span>旧密码：</span>
          <el-input v-model="oldpossword" placeholder="请输入旧密码"></el-input>
        </div>
        <div class="block" style="margin-top: 20px">
          <span>新密码：</span>
          <el-input v-model="newpossword" placeholder="请输入新密码"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="PasswordChangeSubmit">确 定</el-button>
			  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index'

  export default {
    name: 'businessOperation',
    data() {
      return {
          //初始下拉部分
          levelOptions:[{Id:'1',Name:'全部'}],
          levelName:'全部',
          OrgSelectBoxOptions:[],
          OrgSelectBoxName:'全部',
          SelectBoxOptions:[],
          SelectBoxName:'全部',
          //编辑下拉部分
          relevelOptions:[{Id:'1',Name:'全部'}],
          relevelName:'全部',
          reOrgSelectBoxOptions:[],
          reOrgSelectBoxName:'全部',
          reSelectBoxOptions:[],
          reSelectBoxName:'全部',
        //
        DutyMainVal: '',
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
        totalCount: 1,
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
          zzObj:{},
          gwObj:{},
          rejbObj:{},
          rezzObj:{},
          regwObj:{},
      }
    },
    created() {

    },
    mounted() {
      //
      this.getNotice();
      //
      this.GetCaseAll();
    },
    computed: {},
    watch: {},
    methods: {
      //查询
      QueryNeedsData() {
        let condata = this.GridOperator;
        this.getNotice(condata);
      },
        //级别change
        JBSelectName(val){
            this.jbObj = {};
            this.jbObj = this.levelOptions.find((item)=>{if (val === item.Id) {return item}});
        },
        //组织change
        ZZSelectName(val){
          const _this = this;
            this.zzObj = {};
            this.zzObj = _this.OrgSelectBoxOptions.find((item)=>{if (val === item.Id) {return item}});
            //获取岗位下拉
            api.GetPostSelectBoxRe(_this.zzObj.Id).then(res =>{
                console.log(res.data)
                _this.SelectBoxOptions = res.data.Data;
            });
        },
        //岗位change
        GWSelectName(val){
            this.gwObj = {};
            this.gwObj = this.SelectBoxOptions.find((item)=>{if (val === item.Id) {return item}});
        },
        //级别change
        JBreSelectName(val){
            this.rejbObj = {};
            this.rejbObj = this.relevelOptions.find((item)=>{if (val === item.Id) {return item}});
        },
        //组织change
        ZZreSelectName(val){
            const _this = this;
            this.rezzObj = {};
            this.rezzObj = _this.reOrgSelectBoxOptions.find((item)=>{if (val === item.Id) {return item}});
            //获取岗位下拉
            api.GetPostSelectBoxRe(_this.rezzObj.Id).then(res =>{
                console.log(res.data)
                _this.reSelectBoxOptions = res.data.Data;
            });
        },
        //岗位change
        GWreSelectName(val){
            this.regwObj = {};
            this.regwObj = this.reSelectBoxOptions.find((item)=>{if (val === item.Id) {return item}});
        },
      //获页面基础数据
      GetCaseAll() {
        const _this = this;
          //获取组织下拉
          api.GetOrgSelectBoxfd().then(res =>{
              console.log(res.data)
              _this.OrgSelectBoxOptions = res.data.Data;
              _this.reOrgSelectBoxOptions = res.data.Data;
          })
      },
      //责任主体选择
      selectChangeDuty(val) {
        //console.log(val);
        this.optionsDutycode = val;
      },
      //上级选择
      selectParent(val){
        this.selectParentCode = val;
        console.log(val);
      },
      //列表删除
      DeleteOperatorInfo(row) {
        const _this = this;
        console.log(row)
        let id = row.Id;
        this.$confirm('确认要删除本条数据吗？')
          .then(_ => {
            // done();
            console.log('删除成功')
            api.POSTsysUserdeletet(id).then(res => {
              console.log(res)
              if (res.data.Data === 'true') {
                _this.$message({showClose: true, message: '删除成功', type: 'success'});
              } else {
                _this.$message({showClose: true, message: '删除失败', type: 'error'});
              }
            })
            //
            setTimeout(() => {
              _this.getNotice();
            }, 200)
          })
          .catch(_ => {
            console.log('删除失败')
          });
      },
      ///新建预警信息发布
      publish() {
        //
        this.Insert();
        this.isNew = false;
      },
      //重置密码
      resetPassword(row){
          let id = row.Id;
            api.ResetPassword(id).then(res =>{
                //console.log(res.data.Data)
                if (res.data.Data === 'true') {
                    this.$message({showClose: true, message: '重置密码成功', type: 'success'});
                } else {
                    this.$message({showClose: true, message: '重置密码失败', type: 'error'});
                }
            });
        },
      //修改密码初始化
      changePassword(row) {
        this.oldpossword = '';
        this.newpossword = '';
        this.lodid = row.Id;
        this.dialogVisible = true;
      },
      //修改密码提交
      PasswordChangeSubmit() {

        let Id = this.lodid;
        let OldPassword = this.oldpossword;
        let NewPassword = this.newpossword;
        if (OldPassword&&NewPassword) {
          api.PostchangePassword(Id, OldPassword,NewPassword).then(res => {
            console.log(res);
            if (res.data.Data === 'true') {
              this.$message({showClose: true, message: '修改密码成功', type: 'success'});
            } else {
              this.$message({showClose: true, message: '修改密码失败', type: 'error'});
            }
          })
        }else {
            this.$message({showClose: true, message: '缺少填写项,重新填写', type: 'error'});
        }

        this.dialogVisible = false;

      },
      //编辑
      handleClick(row) {
        console.log(row);
        const _this = this;
        let id = row.Id;
        _this.isEdit = true;
        _this.isNew = false;
        api.GetGridMemberSingledata(id).then(res=>{
            console.log(res.data.Data);
            let rowdata = res.data.Data;
            this.RecordId = rowdata.Id;
            this.Name = rowdata.Name;
            this.LoginName = rowdata.LoginName;
            this.IsHandling = rowdata.IsHandling;
            this.Longitude = rowdata.Longitude;//经度
            this.Latitude = rowdata.Latitude;//纬度
            this.ContactInformation = rowdata.ContactInformation;//联系方式
            this.LoginPC = rowdata.LoginApp;
            this.PostName = rowdata.LoginPC;//岗位

        })

      },
      //编辑发布
      EditUpdate() {
        let _this = this;
          let LoginName = '';
          let Sex = '';
          let Birthday = '';
          let Nation = '';
          let Address = '';
          let Id = _this.RecordId || '';
          let LoginPC = _this.LoginPC;
          let IsHandling = _this.PostName;
          let LoginApp = '';
          let Name = _this.Name;
          let Email = _this.Email;
          let Longitude = _this.Longitude || '0';
          let Latitude = _this.Latitude || '0';
          let ContactInformation = _this.ContactInformation;
          let PostId = _this.regwObj.Id || '';
          let OrgId = _this.rezzObj.Id || '';
        //
        api.POSTsysUserupdatet(Id,LoginName, Name, Sex, Birthday, Nation, OrgId, PostId, Longitude, Latitude,Email,Address, LoginApp,LoginPC,ContactInformation,IsHandling).then(result => {
          //console.log(result);
          _this.getNotice(_this.GridOperator, _this.contente);
        });
        _this.isEdit = false;
      },
      //转换状态传值
      contenterChange(val) {
        let keydata = val;
        let data = null;
        if (keydata === '责任主体人员') {
          data = 5;
        } else if (keydata === '三级网格员') {
          data = 0;
        } else if (keydata === '三级网格长') {
          data = 1;
        }else if (keydata === '二级网格员') {
          data = 2;
        }else if (keydata === '二级网格长') {
          data = 3;
        }else {
          data = keydata;
        }
        //isNaN(val) === true && return val;
        return data;
      },
      changeListCode(val) {
        switch (val) {
          case 0:
            return '三级网格员';
          break;
          case 1:
            return '三级网格长';
            break;
          case 2:
            return '二级网格员';
            break;
          case 3:
            return '二级网格长';
            break;
          case 5:
            return '责任主体人员';
            break;
        }
      },
      //转换状态传值
      contenterChange2(val) {
        switch (val) {
          case true:
            return '允许';
            break;
          case false:
            return '禁止';
            break;
        }
      },
      contenterChange3(val) {
        switch (val) {
          case '允许':
            return true;
            break;
          case '禁止':
            return false;
            break;
        }
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
      //打开添加
      openWin() {
        this.isEdit = false;
        this.isNew = true;
        this.RecordId = '';
        this.Name = '';
        this.Longitude = '';
        this.Longitude = '';//经度
        this.Latitude = '';//纬度
        this.ContactInformation = '';//联系方式
        this.LoginPC = '';
        this.PostName = '';
        this.DutyMainVal = '';
        this.ParentVal = '';
        this.selectParentCode = '';
      },
      //添加登录权限
      DeviceNameChange1(val) {
        //console.log(val);
        this.LoginPC = val;
      },
      //添加岗位选择
      DeviceNameChange2(val) {
        //console.log(val);
        this.PostName = val;
        if(val==='0'){
          this.GetAllParent('3')
        }else if(val==='1'||val==='2'){
          this.GetAllParent('2');
        }else if(val==='3'||val==='5'){
          this.GetAllParent('1');
        }
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
      //编辑登录权限
      DeviceNameChange3(val) {
        //console.log(val);
        this.LoginPC = val;
      },
      //编辑处理权限
      DeviceNameChange4(val) {
        // console.log(val);
        if (val == 0||val == 2) {
          this.bjzrztoff = false;
          this.hasParent = true;
        } else if(val == 5) {
          this.bjzrztoff = true;
          this.hasParent = false;
        }else{
          this.bjzrztoff = false;
          this.hasParent = false;
        }
        if(val==='0'){
          this.GetAllParent('3')
        }else if(val==='1'||val==='2'){
          this.GetAllParent('2');
        }else if(val==='3'||val==='5'){
          this.GetAllParent('1');
        }
        this.PostName = val;
      },
      //添加请求
      Insert() {
        const _this = this;
        let LoginName = '';
        let Sex = '';
        let Birthday = '';
        let Nation = '';
        let Address = '';
        let Id = _this.RecordId || '';
        let LoginPC = _this.LoginPC;
        let IsHandling = _this.PostName;
        let LoginApp = '';
        let Name = _this.Name;
        let Email = _this.Email;
        let Longitude = _this.Longitude || '0';
        let Latitude = _this.Latitude || '0';
        let ContactInformation = _this.ContactInformation;
        let PostId = _this.regwObj.Id || '';
        let OrgId = _this.rezzObj.Id || '';
        console.log(parentId);
        api.POSTsysUseraddt(LoginName, Name, Sex, Birthday, Nation, OrgId, PostId, Longitude, Latitude,Email,Address, LoginApp,LoginPC,ContactInformation,IsHandling).then(result => {
          console.log(result);
          let mess = result.data.errorDesc;
          if(result.data.status===-1){
            _this.$message({
              message: mess,
              type: 'warning'
            });
          }
          _this.getNotice(_this.GridOperator, _this.contente);
        });
      },
      //获取运维记录列表
      getNotice(name = '', pag = 1) {
        const _this = this;
        let MemberName = name;
        let PageIndex = pag;
        let OrgId = _this.zzObj.Id || '';
        let PostId = _this.gwObj.Id || '';
        this.tableData = [];
        api.GetsysUserlistdt(MemberName,OrgId,PostId, PageIndex).then(result => {
          console.log(result);
          let InfoData = result.data.Data;
          _this.totalCount = result.data.TotalRowsCount;
          InfoData.forEach(item => {
            let tableData = {};
            tableData.IsHandling = item.IsHandling ?'允许':'禁止';//是否允许处理案件
            tableData.LoginName = item.LoginName;//登录名
            //tableData.sex = item.sex;//
            tableData.OrgName = item.OrgName;//组织
            tableData.PostName = item.PostName;//岗位
            //tableData.parentId = item.parentId;//上级
            //tableData.password = item.password;//
            tableData.Name = item.Name;//
            //tableData.longitude = item.longitude;//
            //tableData.latitude = item.latitude;//
            //tableData.mobile = item.mobile;//
            tableData.LoginApp = item.LoginApp ? '允许' : '禁止';
            //tableData.email = item.email;//
            tableData.Id = item.Id;//
            _this.tableData.push(tableData);
          });
        });

      },
      //时间戳转换时间
      timestampToTime(timestamp) {
        let date = new Date(timestamp);//如果date为10位不需要乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
      },
      //导出
      Export() {
        api.ExportInspectorExcel();
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../../styles/houtaitanchuang";

  .businessOperation {
    .el-input {
      width: 215px;
    }
    #right {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      background-color: #f6fbff;
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
