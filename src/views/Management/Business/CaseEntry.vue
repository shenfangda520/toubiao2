<!--后台管理-案件录入-->
<template>
  <div class="CaseEntry">
    <div class="box">
      <div class="warning">
        <a>案件录入</a>
      </div>
    </div>
    <div id="CaseIn">
      <div class="CaseIn_left">
        <div class="CaseIn_left_cell">
          <span>案件类型</span>
          <el-select v-model="CaseInParam.type" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCaseReason"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="CaseIn_left_cell describe">
          <span class="left">案前图片</span>
          <div class="left">
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
              <div class="img-upload" v-if="!imagelist.length">
                <el-upload class="uploader"
                           ref="upload"
                           list-type="picture-card"
                           :show-file-list="false"
                           :action="imgUrl"
                           :data="params.data"
                           name='uploadFile'
                           :on-success="uploadOnSuccess">
                  <img src="../../../../static/imgs/main/点击添加图片.png"/>
                  <div class="el-upload__text">点击选择图片</div>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="CaseIn_add">
        <div class="CaseIn_add_cell">
          <span>反馈人</span>
          <el-input v-model="CaseInParam.returnName" placeholder="反馈人"></el-input>
        </div>
        <div class="CaseIn_add_cell">
          <span>企业名称</span>
          <el-autocomplete
            v-model="CaseInParam.company"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
        <div class="CaseIn_add_cell describe">
          <span class="left">案后图片</span>
          <div class="left">
            <div class="img-list">
              <div v-if="imagelistAfter">
                <div class="img-content" v-for="(item,key) in imagelistAfter" :key="key">
                  <img :src="item.url">
                  <div class="del">
                    <i @click="handleFileRemoveAfter(item,key)" class="el-icon-delete"></i>
                  </div>
                </div>
              </div>
              <div class="img-upload" v-if="!imagelistAfter.length">
                <el-upload class="uploader"
                           ref="upload"
                           list-type="picture-card"
                           :show-file-list="false"
                           :action="imgUrl"
                           :data="paramsAfter.data"
                           name='uploadFile'
                           :on-success="uploadOnSuccessAfter">
                  <img src="../../../../static/imgs/main/点击添加图片.png"/>
                  <div class="el-upload__text">点击选择图片</div>
                </el-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="CaseIn_mid">
        <div class="CaseIn_mid_cell">
          <span>发送人</span>
          <el-input v-model="CaseInParam.sendName" placeholder="发送人"></el-input>
        </div>
        <div class="CaseIn_mid_cell">
          <div class="block">
            <span class="demonstration">发送时间</span>
            <el-date-picker
              v-model="CaseInParam.sendTime"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </div>
        </div>
        <div class="CaseIn_mid_cell describe">
          <span>案件描述</span>
          <el-input type="textarea" :rows="9" v-model="CaseInParam.describe" placeholder="案件描述"></el-input>
        </div>
      </div>
      <div class="CaseIn_right">
        <div class="CaseIn_right_cell">
          <div class="block">
            <span class="demonstration">反馈时间</span>
            <el-date-picker
              v-model="CaseInParam.returnTime"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </div>
        </div>
        <div class="CaseIn_right_cell">
          <span>案件来源</span>
          <el-select v-model="CaseInParam.region" clearable placeholder="请选择">
            <el-option
              v-for="item in optionsCaseRegion"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="CaseIn_right_cell describe">
          <span>反馈结果</span>
          <el-input type="textarea" :rows="9" v-model="CaseInParam.returnRes" placeholder="反馈结果"></el-input>
        </div>
      </div>
    </div>
    <div class="case_submit">
      <el-button type="primary" class='btns' @click='addCase'>提交</el-button>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/index'
  export default {
    name: 'CaseEntry',
    data() {
      return {
        imgUrl: '',
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
        //案件录入
        optionsCompany: [],//企业
        CaseInParam: {
          name: '案件',
          type: '',
          sendName: '',
          sendTime: '',
          describe: '',
          returnName: '',
          returnTime: '',
          returnRes: '',
          company: '',
          region: '',
          companyId: '',
        },
        imagelist: [],
        imagelistAfter: [],
        fileUrl: '',
        fileUrlAfter: '',
        params: {
          data: {}
        },
        paramsAfter: {
          data: {}
        },
        restaurants: [],
        timeout: null,
      }
    },
    created() {
    },
    mounted() {
      this.getCompanys();
      this.imgUrl = api.CaseImgUp();
    },
    computed: {},
    methods: {
      uploadOnSuccess(e, file) {//上传附件
        this.fileUrl = file.response.data;
        this.$message.success("上传成功")
        this.imagelist.push({
          url: this.fileUrl,
          name: '新增图片'
        });
      },
      uploadOnSuccessAfter(e, file) {//上传附件
        this.fileUrlAfter = file.response.data;
        this.$message.success("上传成功")
        this.imagelistAfter.push({
          url: this.fileUrlAfter,
          name: '新增图片'
        });
      },
      handleFileRemove(file, i) {//删除图片
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
      handleFileRemoveAfter(file, i) {//删除图片
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
              that.imagelistAfter.splice(i, 1)
            }
          })
        }).catch((meg) => console.log(meg))
      },
      //获取企业列表
      getCompanys() {
        let t = this;
        api.getCompanys().then(result => {
          t.optionsCompany = result.data.data;
          t.optionsCompany.forEach(item => {
            item.value = item.name || '--';
          });
          t.restaurants = t.optionsCompany;
        })
      },
      //案件录入提交
      addCase() {
        let t = this;
        let addParam = this.CaseInParam;
        //console.log(addParam);
        let name = '案件';
        let sendPeople = addParam.sendName;
        let feedbackPeople = addParam.returnName;
        let caseType = addParam.type;
        let sendTime = addParam.sendTime;
        let feedbackTime = addParam.returnTime;
        let videoFootage = this.fileUrl;
        let feedbackFootage = this.fileUrlAfter;
        let caseDescript = addParam.describe;
        let feedbackDescript = addParam.returnRes;
        let companyId = addParam.companyId;
        let source = addParam.region;
        api.addCaseList(companyId, name, sendPeople, feedbackPeople, caseType, sendTime, feedbackTime, videoFootage, caseDescript, feedbackDescript, feedbackFootage, source).then(res => {
          //console.log(res)
          t.$message({
            message: '案件录入成功',
            type: 'success'
          });
          t.$parent.GetMonitoringDay();
          t.CaseInParam.name = '';
          t.CaseInParam.sendName = '';
          t.CaseInParam.returnName = '';
          t.CaseInParam.type = '';
          t.CaseInParam.sendTime = '';
          t.CaseInParam.returnTime = '';
          t.CaseInParam.describe = '';
          t.CaseInParam.returnRes = '';
          t.CaseInParam.company = '';
          t.CaseInParam.companyId = '';
          t.CaseInParam.region = '';
          t.imagelist = [];
          t.imagelistAfter = [];
          t.fileUrl = '';
          t.fileUrlAfter = '';
        })
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.CaseInParam.companyId = item.id;
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #right {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 0 20px;
    background-color: #f6fbff;
    .case_submit {
      text-align: right;
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
  }
  /*案件录入*/
  #CaseIn {
    width: 100%;
    text-align: left;
    overflow: hidden;
    .el-input, .el-input__inner {
      width: 200px;
    }
    .edit-input {
      width: 100px;
    }
    .CaseIn_left, .CaseIn_mid, .CaseIn_right, .CaseIn_add {
      float: left;
      width: 25%;
    }
    .CaseIn_left, .CaseIn_mid, .CaseIn_right, .CaseIn_add {
      .CaseIn_left_cell, .CaseIn_mid_cell, .CaseIn_right_cell, .CaseIn_add_cell {
        margin-top: 10px;
        span {
          display: inline-block;
          width: 60px;
          text-align: center;
        }
      }
    }
  }
  /*上传图片*/
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
  .img-list .img-content img {
    display: block;
    width: 100%;
    height: 200px;
    margin: 0 auto;
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
</style>
