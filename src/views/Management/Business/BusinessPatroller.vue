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
        <span>巡查员名称</span>
        <el-input v-model="departmentVal" placeholder="请输入内容"></el-input>
        <el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>
        <el-button type="primary" class='btns' @click="openWin">添加巡查员</el-button>
        <el-button type="primary" class='btns' @click="Export">导出</el-button>
      </div>
      <!--list-->
      <div class="box">
        <div class="warning">
          <a>列表</a>
        </div>
      </div>
      <el-table :data="tableData" border style="width: 100%">

        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="username" label="登录名"></el-table-column>
        <el-table-column prop="zrztname" label="责任主体"></el-table-column>
        <el-table-column prop="role" label="岗位"></el-table-column>
        <el-table-column prop="dlApp" label="登录APP"></el-table-column>
        <el-table-column prop="statusAj" label="处理案件"></el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
            <span style="color: #e0e0e0;">|</span>
            <el-button @click="changePassword(scope.row)" type="text" size="small" class='eidt'>重置密码</el-button>
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
              <el-input v-model="equipmentPerson1" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>登录名</span>
              <el-input v-model="equipmentPerson2" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>经度</span>
              <el-input v-model="equipmentPerson4" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>纬度</span>
              <el-input v-model="equipmentPerson5" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>联系方式</span>
              <el-input v-model="equipmentPerson6" placeholder="请输入内容"></el-input>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>登录权限</span>
              <el-select v-model="equipmentName1"
                         clearable
                         placeholder="请选择"
                         @change='DeviceNameChange1'>
                <el-option key="0" label="禁止" value="0"></el-option>
                <el-option key="1" label="允许" value="1"></el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>岗位</span>
              <el-select v-model="equipmentName2"
                         clearable
                         placeholder="请选择"
                         @change='DeviceNameChange2'>
                <el-option key="0" label="三级网格员" value="0"></el-option>
                <el-option key="1" label="三级网格长" value="1"></el-option>
                <el-option key="2" label="二级网格员" value="2"></el-option>
                <el-option key="3" label="二级网格长" value="3"></el-option>
                <el-option key="5" label="责任主体人员" value="5"></el-option>
                <el-option key="6" label="巡查员" value="6"></el-option>
                <el-option key="7" label="领导" value="7"></el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>选择上级</span>
              <el-select v-model="ParentVal" @change="selectParent" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsParent"
                  :key="item.value"
                  :label="item.name"
                  :value="item.userId">
                </el-option>
              </el-select>
            </div>
            <div class="block" v-show="equipmentName2 == 5" style="overflow: hidden;">
              <span>责任部门选择</span>
              <el-select v-model="DutyMainVal" @change="selectChangeDuty" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsDuty"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <el-row style='position: absolute;bottom: 20px;right: 30px;'>
              <el-button type="primary" @click='Insert'>确定</el-button>
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
              <el-input v-model="equipmentPerson1b" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>登录名</span>
              <el-input v-model="equipmentPerson2b" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>经度</span>
              <el-input v-model="equipmentPerson4b" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>纬度</span>
              <el-input v-model="equipmentPerson5b" placeholder="请输入内容"></el-input>
            </div>
            <div class="block">
              <span>联系方式</span>
              <el-input v-model="equipmentPerson6b" placeholder="请输入内容"></el-input>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>登录权限</span>
              <el-select v-model="equipmentName1b"
                         clearable
                         placeholder="请选择"
                         @change='DeviceNameChange3'>
                <el-option key="0" label="禁止" value="0"></el-option>
                <el-option key="1" label="允许" value="1"></el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>岗位</span>
              <el-select v-model="equipmentName2b"
                         clearable
                         placeholder="请选择"
                         @change='DeviceNameChange4'>
                <el-option key="0" label="三级网格员" value="0"></el-option>
                <el-option key="1" label="三级网格长" value="1"></el-option>
                <el-option key="2" label="二级网格员" value="2"></el-option>
                <el-option key="3" label="二级网格长" value="3"></el-option>
                <el-option key="5" label="责任主体人员" value="5"></el-option>
                <el-option key="6" label="巡查员" value="6"></el-option>
                <el-option key="7" label="领导" value="7"></el-option>
              </el-select>
            </div>
            <div class="block" style="overflow: hidden;">
              <span>选择上级</span>
              <el-select v-model="ParentVal" @change="selectParent" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsParent"
                  :key="item.value"
                  :label="item.name"
                  :value="item.userId">
                </el-option>
              </el-select>
            </div>
            <div class="block" v-show="bjzrztoff" style="overflow: hidden;">
              <span>责任主体选择</span>
              <el-select v-model="DutyMainVal" @change="selectChangeDuty" clearable placeholder="请选择">
                <el-option
                  v-for="item in optionsDuty"
                  :key="item.value"
                  :label="item.name"
                  :value="item.code">
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
          <div class="tishi" v-show="classts">{{tishiyu}}</div>
        </div>
        <div class="block" style="margin-top: 20px" v-show="classts2">
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
        //
        DutyMainVal: '',
        //
        bjzrztoff: false,
        //责任主体
        optionsDuty: [],
        //
        optionsDutycode: '',
        //
        departmentVal: '',
        //
        dialogVisible: false,
        //
        newpossword: '',
        //
        oldpossword: '',
        //
        tishiyu: '',
        //
        classts2: false,
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
        //添加
        equipmentPerson1: '',
        equipmentPerson2: '',
        equipmentPerson3: '',
        equipmentPerson4: '',
        equipmentPerson5: '',
        equipmentPerson6: '',
        equipmentPersonid: '',
        equipmentName1: '',
        equipmentName2: '',
        //编辑
        equipmentPerson1b: '',
        equipmentPerson2b: '',
        equipmentPerson3b: '',
        equipmentPerson4b: '',
        equipmentPerson5b: '',
        equipmentPerson6b: '',
        equipmentPersonidb: '',
        equipmentName1b: '',
        equipmentName2b: '',
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
      }
    },
    created() {},
    mounted() {
      this.getNotice();
      this.GetCaseAll();
    },
    computed: {},
    watch: {},
    methods: {
      //查询
      QueryNeedsData() {
        let condata = this.departmentVal;
        this.getNotice(condata);
      },
      //获取责任主体
      GetCaseAll() {
        const _this = this;
        api.GetCaseAll().then(result => {
          _this.optionsDuty = result.data.data;
        })
      },
      //责任主体选择
      selectChangeDuty(val) {
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
        let id = row.userId;
        this.$confirm('确认要删除本条数据吗？')
          .then(_ => {
            api.POSTsysUserdeletet(id).then(res => {
              console.log(res)
              if (res.data.message === 'true') {
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
      //修改密码初始化
      changePassword(row) {
        //console.log(row.userId);
        this.PasswordChangeSubmit(row.userId);
      },
      //修改(重置)密码提交
      PasswordChangeSubmit(id) {
          let userId = id;
          api.PostchangePassword(userId).then(res => {
            console.log(res);
            if (res.data.message === 'true') {
              this.$message({showClose: true, message: '重置密码成功', type: 'success'});
            } else {
              this.$message({showClose: true, message: '重置密码失败', type: 'error'});
            }
          })
      },
      //编辑
      handleClick(row) {
        console.log(row);
        this.isEdit = true;
        this.isNew = false;
        this.equipmentPersonidb = row.userId;
        this.equipmentPerson1b = row.name;
        this.equipmentPerson2b = row.username;
        this.equipmentPerson3b = row.role;
        this.equipmentPerson4b = row.longitude;//经度
        this.equipmentPerson5b = row.latitude;//纬度
        this.equipmentPerson6b = row.mobile;//联系方式
        this.equipmentName1b = row.dlApp;
        this.equipmentName2b = row.role;//岗位
        this.optionsDutycode = row.responsibilityDepartment;
        this.ParentVal = row.parentId;//上级
        //判断是否是责任主体人
        if (this.equipmentName2b === '责任主体人员') {
          this.bjzrztoff = true;
          this.hasParent = false;
          this.DutyMainVal = row.zrztname;
        }else if(this.equipmentName2b === '三级网格员'||this.equipmentName2b === '二级网格员') {
          this.bjzrztoff = false;
          this.hasParent = true;
        }else {
            this.bjzrztoff = false;
        }
        if(this.equipmentName2b==='三级网格员'){
          this.GetAllParent('3')
        }else if(this.equipmentName2b==='二级网格员'||this.equipmentName2b==='三级网格长'){
          this.GetAllParent('2');
        }else if(this.equipmentName2b==='责任主体人员'||this.equipmentName2b==='二级网格长'){
          this.GetAllParent('1');
        }
      },
      //编辑发布
      EditUpdate() {
        let _this = this;
        let userId = _this.equipmentPersonidb;
        let username = _this.equipmentPerson2b;
        let name = _this.equipmentPerson1b;
        let status =_this.contenterChange3(_this.equipmentName1b);
        let role = _this.contenterChange(_this.equipmentName2b);
        let longitude = _this.equipmentPerson4b;
        let latitude = _this.equipmentPerson5b;
        let mobile = _this.equipmentPerson6b;
        let responsibility = _this.optionsDutycode;
        let parentId = _this.selectParentCode || _this.ParentVal;
        //
        console.log(parentId)
        if(name&&username&&parentId&&role!==''){
          api.POSTsysUserupdatet(userId, username, status, role, name, longitude, latitude, mobile, responsibility,parentId).then(result => {
            _this.getNotice(_this.departmentVal, _this.contente);
          });
          _this.isEdit = false;
        }else{
          _this.$message({
            message:'姓名、登录名、岗位、上级必填！',
            type:'warning'
          })
        }

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
        }else if (keydata === '巡查员') {
          data = 6;
        }else if (keydata === '领导') {
          data = 7;
        }else {
          data = keydata;
        }
        return data;
      },
      changeListCode(val) {
          let rtval = '';
        switch (val) {
          case 0:
              rtval= '三级网格员';
            break;
          case 1:
              rtval= '三级网格长';
            break;
          case 2:
              rtval= '二级网格员';
            break;
          case 3:
              rtval= '二级网格长';
            break;
          case 5:
              rtval= '责任主体人员';
            break;
          case 6:
              rtval= '巡查员';
            break;
          case 7:
              rtval= '领导';
            break;
        }
        return rtval;
      },
      //转换状态传值
      contenterChange2(val) {
          let rtval = '允许'
        switch (val) {
          case 0:
              rtval= '禁止';
            break;
          case 2:
              rtval= '禁止';
            break;
        }
        return rtval
      },
      contenterChange3(val) {
          let rtval = '0'
          switch (val) {
            case '允许':
                rtval = '1';
              break;
            case '禁止':
                rtval = '0';
              break;
          }
          switch (val) {
              case '0':
                  rtval = '0';
                  break;
              case '1':
                  rtval = '1';
                  break;
          }
        return rtval
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
        let cona = this.departmentVal;
        this.getNotice(cona, contente);
      },
      //打开添加
      openWin() {
        this.isEdit = false;
        this.isNew = true;
        this.equipmentPersonid = '';
        this.equipmentPerson1 = '';
        this.equipmentPerson2 = '';
        this.equipmentPerson3 = '';
        this.equipmentPerson4 = '';//经度
        this.equipmentPerson5 = '';//纬度
        this.equipmentPerson6 = '';//联系方式
        this.equipmentName1 = '';
        this.equipmentName2 = '';
        this.DutyMainVal = '';
        this.ParentVal = '';
        this.selectParentCode = '';
      },
      //添加登录权限
      DeviceNameChange1(val) {
        //console.log(val);
        this.equipmentName1 = val;
      },
      //添加岗位选择
      DeviceNameChange2(val) {
        //console.log(val);
        this.selectParentCode = '';
        this.ParentVal = '';
        this.equipmentName2 = val;
        if(val==='0'){
          this.GetAllParent('3')
        }else if(val==='1'||val==='2'){
          this.GetAllParent('2');
        }else if(val==='3'||val==='5'||val==='6'||val==='7'){
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
        console.log(val);
        this.equipmentName1b = val;
      },
      //编辑处理权限
      DeviceNameChange4(val) {
        // console.log(val);
        this.selectParentCode = '';
        this.ParentVal = '';
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
        this.equipmentName2b = val;
      },
      //添加请求
      Insert() {
        const _this = this;
        let userId = _this.equipmentPersonid || '';
        let status = _this.equipmentName1;
        let role = _this.equipmentName2;
        let name = _this.equipmentPerson1;
        let username = _this.equipmentPerson2;
        let longitude = _this.equipmentPerson4 || '0';
        let latitude = _this.equipmentPerson5 || '0';
        let mobile = _this.equipmentPerson6;
        let responsibility = _this.optionsDutycode;
        let parentId = _this.selectParentCode;
        console.log(parentId);
        if(name&&username&&parentId&&role!==''){
          api.POSTsysUseraddt(userId, username, status, role, name, longitude, latitude, mobile, responsibility,parentId).then(result => {
            console.log(result);
            let mess = result.data.message;
            if(result.data.status>0){
              _this.$message({
                message: '添加成功',
                type: 'success'
              });

            }else{
              _this.$message({
                message: mess,
                type: 'warning'
              });
            }
            _this.isNew = false;
            _this.getNotice(_this.departmentVal, _this.contente);
          });
        }else{
          _this.$message({
            message:'姓名、登录名、岗位、上级必填！',
            type:'warning'
          })
        }

      },
      //获取运维记录列表
      getNotice(name = '', pag = 1) {
        let nm = name;
        let pageNo = pag;
        const _this = this;
        this.tableData = [];
        api.GetsysUserlistdt(nm, pageNo).then(result => {
          console.log(result);
          let InfoData = result.data.data.rows;
          _this.totalCount = result.data.data.total;
          InfoData.forEach(item => {
            let tableData = {};
            tableData.statusAj = _this.contenterChange2(item.role);//是否允许处理案件
            tableData.username = item.username;//登录名
            tableData.sex = item.sex;//
            tableData.zrztname = item.responsibilityDepartmentname;//
            tableData.responsibilityDepartment = item.responsibilityDepartment;//
            tableData.role = _this.changeListCode(item.role);//岗位
            tableData.parentId = item.parentId;//上级
            tableData.password = item.password;//
            tableData.name = item.name;//
            tableData.longitude = item.longitude;//
            tableData.latitude = item.latitude;//
            tableData.mobile = item.mobile;//
            tableData.dlApp = item.status ? '允许' : '禁止';
            tableData.email = item.email;//
            tableData.userId = item.userId;//
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
