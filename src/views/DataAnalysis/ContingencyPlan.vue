<template>
  <div class="ContingencyPlan">
    <!--今日数据-->
    <v-header></v-header>
    <div class="list">
      <span class="line">|</span>
      <span class="list_title">应急预案列表</span>
    </div>
    <ul>
      <!--<li v-for="item in circleTitle" @click="GetEmergency(item.ID)">{{item.Title}}</li>-->
      <li v-for="item in circleTitle">
        <span @click="GetEmergency(item)">{{item.Title}}</span>
      </li>
    </ul>
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
    <el-dialog :title=fileTitle :visible.sync="dialogTableVisible">
        <pdfshower
          :pdfurl="pdfurls"
          :scale="scale"
          @onErr="onErr"
        ></pdfshower>
    </el-dialog>
    <el-dialog
      :title=fileTitle
      :visible.sync="showImg"
      custom-class="imgDialog">
      <img :src="pdfurls"/>
    </el-dialog>
  </div>
</template>

<script>
  import {bus} from '@/js/bus.js'
  import api from '../../api/index'
  import pdfshower from 'vue-pdf-shower';

  export default {
    name: 'ContingencyPlan',
    data() {
      return {
        pageIndex: 1,
        currentPage: 1,
        totalCount: 1,
        pagesize: 10,
        circleTitle: [],
        fileUrl:'',
        pdfurls:'',
        scale: 1,
        dialogTableVisible:false,
        fileTitle:'',
        showImg:false
      }
    },
    created() {
      this.getList();
      this.fileUrl = api.GetEmergencyFile();
    },
    mounted() {

    },
    methods: {
      onErr(err) {
        console.log('pdf加载失败，请重试');
        console.log('错误信息：', err);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getList();
      },
      getList(){
        let t = this;
        let Title = '';
        let BeginTime = '';
        let EndTime = '';
        let PageIndex = this.pageIndex;
        let PageSize = 10;
        api.GetEmergencyPlanList(Title, BeginTime, EndTime, PageIndex, PageSize).then(res => {
          // console.log(res);
          t.circleTitle = res.data.Data;
          t.totalCount = res.data.TotalRowsCount;
        })
      },
      GetEmergency(param){
        // console.log(param)
        let that = this;
        let id = param.ID;
        that.fileTitle = param.Title;
        api.GetEmergency(id).then(res=>{
          console.log(res);
          let DestFile = res.data.Data.DestFile;
          let SourceName = res.data.Data.SourceName;
          let name = res.data.Data.TypeName;
          if(name=='.PDF'){
            that.dialogTableVisible = true;
          }else{
            that.showImg = true;
          }
          // window.open(that.fileUrl+DestFile+'/'+SourceName);
          that.pdfurls = that.fileUrl+DestFile+'/'+SourceName;
        })
      },
    },
    components: {pdfshower}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .ContingencyPlan {
    width: 100%;
    height: auto;
    padding: 40px;
    .list {
      text-align: left;
      width: 100%;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      .line {
        color: #2394f2;
        font-weight: bold;
        background-color: #fff;
        margin-right: 10px;
      }
      .list_title{
        font-size: 16px;
      }
    }
    ul{
      li{
        list-style: none;
        text-align: left;
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
      }
      :hover{
        cursor: pointer;
      }
    }
    .page {
      text-align: left;
    }
    .el-pagination {
      display: inline-block;
      margin-left: 170px;
    }
    .imgDialog img{
      width: 100%;
      height: 100%;
    }
  }
</style>
