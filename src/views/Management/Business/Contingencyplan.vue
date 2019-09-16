<!--后台管理--业务数据-应急预案-->
<template>
  <div class="contingencyplan">
    <!--右侧数据展示-->
    <div id="right">
      <div class="box">
        <div class="warning">
          <a>应急预案</a>
        </div>
      </div>
      <div class="search">
        <!---->
        <div class="block">
          <span class="demonstration">名称</span>
          <el-input v-model="GridOperator" placeholder="请输入内容"></el-input>
        </div>
        <!---->
        <div class="block">
          <span class="demonstration">日期</span>
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
          <el-button type="primary" class='btns' @click="publish">新增</el-button>
        </div>

      </div>
      <!--list-->
      <div class="box">
        <div class="warning">
          <a>列表</a>
        </div>
      </div>
        <!---->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="Title" label="应急预案"></el-table-column>
        <el-table-column label="操作" width="140">
          <template scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
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
        <el-dialog title="新增" :visible.sync="insetVisible" width="530px">
            <div class="content">
                <div class="block">
                    <span>标题</span>
                    <el-input v-model="titleName"  @blur="changeValue" placeholder="请输入内容"></el-input>
                </div>
                <div class="block kysay">
                    <span>内容</span>
                    <div class="cr_box">
                        <form id="Form_inset" name="fileForm" method="post" enctype="multipart/form-data" target="targetIfr">
                        <div class="cr_pdf">
                            <el-upload
                                    class="cr_pdf_sub"
                                    ref="uploadinset"
                                    action=""
                                    name="beautiful"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :before-upload="beforeAvatarInset"
                                    :limit="1"
                                    :auto-upload="false"
                                    :file-list="fileList">
                                <el-button size="small" type="primary">添加图片或者pdf格式文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片或者pdf文件，且不超过4MB</div>
                            </el-upload>
                        </div>
                        </form>
                    </div>
                </div>
                <el-row style='position: absolute;bottom: 20px;right: 30px;'>
                    <el-button type="primary" @click='subimtIset'>确定</el-button>
                    <el-button plain @click='insetVisible=false'>取消</el-button>
                </el-row>
            </div>
        </el-dialog>

      <!--编辑弹框部分-->
        <el-dialog title="编辑" :visible.sync="edioVisible" width="530px">
            <div class="content">
                <div class="block">
                    <span>标题</span>
                    <el-input v-model="titleName" @blur="changeValue" placeholder="请输入内容"></el-input>
                </div>
                <div class="block kysay">
                    <span>内容</span>
                    <div class="cr_box">
                        <form id="Form_ideo" name="fileForm"  method="post" enctype="multipart/form-data" target="targetIfr">
                        <div class="cr_pdf">
                            <el-upload
                                    class="cr_pdf_sub"
                                    ref="uploadeido"
                                    action=""
                                    name="beautiful"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :before-upload="beforeAvatarUpload"
                                    :auto-upload="false"
                                    :limit="1"
                                    :file-list="editfileList">
                                <el-button size="small" type="primary">添加图片或者pdf格式文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片或者pdf文件，且不超过4MB</div>
                            </el-upload>
                        </div>
                        </form>
                    </div>
                </div>
                <el-row style='position: absolute;bottom: 20px;right: 30px;'>
                    <el-button type="primary" @click='subimtIdeo'>确定</el-button>
                    <el-button plain @click='edioVisible=false'>取消</el-button>
                </el-row>
            </div>
        </el-dialog>
     
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index'

  export default {
    name: 'contingencyplan',
    data() {
      return {
        DutyMainVal: '',
        //
        bjzrztoff: false,
        //责任主体
        optionsDuty: [],
        //
        optionsDutycode: '',
        //
        GridOperator: '',
        //上传文件名称
        fileList:[],
        //编辑文件名称
        editfileList:[],
        //
        dialogVisible: false,
        //
        newpossword: '',
        //
        oldpossword: '',
        starttime:'',
        endtime:'',
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
        insetVisible: false,
        //
        title: '添加',
        //
        TotalRowsCount: null,
        InfoData: [],
        ListData: [],
        isend: false,
        //编辑
        Name: '',
        titleName:'',
        centDeeds:'',
        RecordId: '',
        edioVisible: false,
        //
        lodid: '',
        contente: 1,
        passwordcode: '',
        updataimgpdf:'',
        paramsinset:{
            Title:''
        },
        paramsideo:{
            Title:'',
            ID:''
        },
      }
    },
    created() {

    },
    mounted() {
        this.updataimgpdf = api.InsertEmergencyRes();
        this.getNotice();
    },
    computed: {},
    watch: {},
    methods: {
        //输入框失去焦点
        changeValue(val){
            console.log(val);
            const _this = this;
            _this.paramsinset = {Title:_this.titleName};
            _this.paramsideo = {Title:_this.titleName, ID:_this.RecordId};
        },
        //新增上传文件
        subimtIset() {
            const _this = this;
            let form = $("#Form_inset");
            let options = {
                url: _this.updataimgpdf,
                data:_this.paramsinset,
                type: 'post',
                success: function (data) {
                    //console.log(data)
                    if (data.Status < 0) {
                        _this.$message({message: '上传失败,请选择正确文件', type: 'warning', duration: 1500,});
                    } else {
                        _this.$message({message: '上传成功', type: 'success', duration: 1000});
                        _this.getNotice(_this.GridOperator, _this.contente);
                    }
                }
            };
            form.ajaxSubmit(options);
            setTimeout(()=>{
                _this.insetVisible = false;
            },1000);
        },
        //编辑上传文件
        subimtIdeo() {
            const _this = this;
            let form = $("#Form_ideo");
            let options = {
                url: _this.updataimgpdf,
                data:_this.paramsideo,
                type: 'post',
                success: function (data) {
                    let message = data.Message;
                    if (data.Status < 0) {
                        _this.$message({message: '修改失败,' + message, type: 'warning', duration: 1500,});
                    } else {
                        _this.$message({message: '修改成功', type: 'success', duration: 1000});
                        _this.getNotice(_this.GridOperator, _this.contente);
                    }
                }
            };
            form.ajaxSubmit(options);
            setTimeout(()=>{
                _this.edioVisible = false;
            },1000);
        },
        //添加上传验证
        beforeAvatarInset(file){
            console.log(file.type);
            const _this = this;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isPDF = file.type === 'application/pdf';
            const isLt2M = file.size / 1024 / 1024 < 4;
            !isJPG || !isPNG || !isPDF &&  _this.$message.error('上传只允许JPG,PNG,PDF格式文件!');
            if (!isLt2M) {
                _this.$message.error('上传文件大小不能超过 4MB!');
            }
            return isJPG||isPNG||isPDF&& isLt2M;

        },
        //编辑上传验证
        beforeAvatarUpload(file) {
            console.log('6')
            const _this = this;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isPDF = file.type === 'application/pdf';
            const isLt2M = file.size / 1024 / 1024 < 4;
            !isJPG || !isPNG || !isPDF &&  _this.$message.error('上传只允许JPG,PNG,PDF格式文件!');
            if (!isLt2M) {
                _this.$message.error('上传文件大小不能超过 4MB!');
            }
            return isJPG||isPNG||isPDF&& isLt2M;
        },
        //删除编辑名称
        handleRemove(file, fileList) {
            console.log('1')
            console.log(file, fileList);
        },
        //
        handlePreview(file) {
            console.log('2')
            console.log(file);
        },
        //上传之前验证错误是否删除
        beforeRemove(file, fileList) {
            console.log('4')
            return this.$confirm(`上传文件不符合规定，是否确定移除 ${ file.name }？`);
        },
      //查询
      QueryNeedsData() {
        let condata = this.GridOperator;
        this.getNotice(condata);
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
            api.DeleteEmergencyRes(id).then(res => {
              console.log(res);
              if (res.data.Status > 0) {
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
      //新增东西
      publish() {
        //
        this.insetVisible = true;
        this.edioVisible = false;
        this.titleName = '';
        this.Content = '';
        this.editfileList = [];
      },
      //编辑
      handleClick(row) {
        console.log(row);
        const _this = this;
          let id = row.Id;
          _this.edioVisible = true;
          _this.insetVisible = false;
          _this.editfileList = [];
          api.GetEmergencyDataRes(id).then(res=>{
             const deitdata ={name:''};
              let rowdata = res.data.Data;
              _this.RecordId = rowdata.Id;
              _this.Content = rowdata.Content;
              _this.titleName = rowdata.Title;
              deitdata.name = rowdata.Remarks;
              _this.paramsideo = {Title:_this.titleName, ID:_this.RecordId};
              deitdata.name &&  _this.editfileList.push(deitdata);
          });

      },
      //分页
      handleSizeChange(val) {
        this.pagesize = val;
      },
      //分页请求
      handleCurrentChange(val) {
        let contente = this.contente = val;
        let cona = this.GridOperator;
        this.getNotice(cona, contente);
      },

      //获取运维记录列表
      getNotice(name = '', pag = 1) {
        const _this = this;
        let Title = name;
        let PageIndex = pag;
        let BeginTime = _this.starttime || '';
        let EndTime = _this.endtime || '';
        this.tableData = [];
        api.GetEmergencyListsRes(Title,BeginTime,EndTime,PageIndex).then(result => {
          console.log(result);
          let InfoData = result.data.Data;
          _this.totalCount = result.data.TotalRowsCount;
          InfoData.forEach(item => {
            const tableData = {};
            tableData.Title = item.Title || '--';
            tableData.Id = item.ID;//
            tableData.Content = item.Content;
            _this.tableData.push(tableData);
          });
        });

      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import "../../../styles/houtaitanchuang";
 .contingencyplan {
     .el-input{
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
        .content{
            width: 100%;
            height: 200px;
            text-align: left;
            padding-left: 30px;
            .el-input{
                width: 325px;
            }
            span{
                display: inline-block;
                width: 60px;

            }
            .cr_box{
                width: 425px;
                height: 120px;
                padding-left: 64px;


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
                width: 215px;
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
