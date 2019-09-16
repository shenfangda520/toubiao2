<template>
    <div class="RankingStatistics">
        <!--今日数据-->
        <v-header></v-header>
        <div class="contentBox">
          <div class="searchBox">
            <el-radio-group v-model="searchClass" @change="getData">
              <!--<el-radio-button label="小时"></el-radio-button>-->
              <!--<el-radio-button label="日累计"></el-radio-button>-->
              <el-radio-button label="日报"></el-radio-button>
              <el-radio-button label="月报"></el-radio-button>
              <el-radio-button label="年报"></el-radio-button>
            </el-radio-group>
            <div class="block">
              <span class="demonstration">选择时间</span>
              <el-date-picker
                v-model="searchTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
            <el-row class="btnBox">
              <el-button type="primary" @click="getData">查询</el-button>
              <el-button type="primary" @click="ExportProportion">导出</el-button>
            </el-row>
          </div>
          <p>数据更新时间：{{updateTime}}</p>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="Ranking"
              label="排名">
            </el-table-column>
            <el-table-column
              prop="countyName"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="PM25"
              label="PM2.5">
            </el-table-column>
            <el-table-column
              prop="PM10"
              label="PM10">
            </el-table-column>
            <el-table-column
              prop="SO2"
              label="SO2">
            </el-table-column>
            <el-table-column
              prop="NO2"
              label="NO2">
            </el-table-column>
            <el-table-column
              prop="CO"
              label="CO">
            </el-table-column>
            <el-table-column
              prop="O3"
              label="O3">
            </el-table-column>
            <el-table-column
              prop="Com_Index"
              label="综合指数">
            </el-table-column>
            <el-table-column
              prop="AQI"
              label="AQI">
            </el-table-column>
            <el-table-column
              prop="Level"
              label="等级">
            </el-table-column>
            <el-table-column
              prop="primaryPollution"
              label="首要污染物">
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../../api/index'

    export default {
        name: 'RankingStatistics',
        data() {
            return {
              searchClass:'日报',
              searchTime:'',
              tableData: [],
              currentPage:1,
              totalCount:100,
              allPageData:[],
              updateTime:'',
            }
        },
        created() {
          this.getData();
        },
        mounted() {
        	
        },
        methods: {
          handleSizeChange(){
          },
          handleCurrentChange(val){
            this.currentPage = val;
            this.setPageTable(10, val);
          },
          getData() {
            let type = '';
            switch (this.searchClass) {
              case '日报':
                type = '0';
                break;
              case '月报':
                type = '1';
                break;
              case '年报':
                type = '2';
                break;
            }
            let t = this;
            this.currentPage = 1;
              t.allPageData = [];
              let time = t.searchTime||'';
              api.GetProportion(type,time).then(res=>{
                console.log(res)
                let allData = res.data.Data;
                if (res.data.Status) {
                  this.totalCount = allData.length;
                  this.updateTime = res.data.Message;
                  let i = 1;
                  allData.forEach(item => {
                    let tableData = {};//数据
                    tableData.Ranking = i++;//排名
                    tableData.countyName = item.countyname;//名称
                    tableData.Com_Index = item.complexindex;//综合指数
                    tableData.PM25 = item.pm25;//Pm25
                    tableData.SO2 = item.so2;//SO2
                    tableData.PM10 = item.pm10;//PM10
                    tableData.NO2 = item.no2;//NO2
                    tableData.CO = item.co;//CO
                    tableData.O3 = item.o3;//O3
                    tableData.AQI = item.aqi;//CO
                    tableData.Level = getQualityByAqi(item.aqi);
                    tableData.primaryPollution = item.primarypollution||'--';//CO
                    t.allPageData.push(tableData);
                  });
                  this.setPageTable(10, 1);
                }
              })
          },
          // 导出
          ExportProportion(){
            let type;
            switch (this.searchClass){
              case '日报':
                type = '0';
                break;
              case '月报':
                type = '1';
                break;
              case '年报':
                type = '2';
                break;
              default:
                break;
            }
            let time = this.searchTime||'';
            api.ExportProportion(type,time);
          },
          //小时，日累计数据导出
          ExportCountyHourRank(){
            let type;
            switch (this.searchClass){
              case '小时':
                type = '0';
                break;
              case '当日累计':
                type = '1';
                break;
              default:
                break;
            }
            api.ExportCountyHourRank(type);
          },
          // 设置分页
          setPageTable(pageSize, pageNum) {
            let i = 1;
            let rtValue = [];
            let startNum = pageSize * (pageNum - 1);
            for (let i = 0; i < pageSize; i++) {
              if ((startNum + i + 1) > this.allPageData.length)
                break;
              rtValue.push(this.allPageData[startNum + i]);
            }
            this.tableData = rtValue;
          },
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.RankingStatistics {
    width: 100%;
    height: auto;
    .contentBox{
      padding: 20px;
      .searchBox{
        width: 100%;
        padding-left: 20px;
        padding-bottom: 10px;
        text-align: left;
        border-bottom: 1px solid #eee;
        .block{
          margin-left: 20px;
          display: inline-block;
        }
        .btnBox{
          display: inline-block;
          margin-left: 40px;
        }
      }
      p{
        text-align: right;
        padding: 10px;
      }
    }
}
</style>
