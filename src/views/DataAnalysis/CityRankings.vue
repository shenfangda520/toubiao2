<template>
    <div id="CityRanking">
        <div class="timeChoose"><i></i>日期选择</div>
        <div>
            <div class="choose">
                <ul>
                    <li v-for="(v,i) in timeTabs" @click="timeClick(v,i)"><span :style='"color:"+(i===isChoose ? "#11DA88" : "#fff")'>{{v.label}}</span><div :class='i===isChoose && "checked"'></div></li>
                </ul>
                <div class="inline" :style="'display:'+(isCustom ? 'inline-block':'none')">
                    <el-date-picker
                        v-model="customDateFrome"
                        type="date"
                        size="mini"
                        @change="dateChenge"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="更多日期">
                    </el-date-picker>-
                    <el-date-picker
                        v-model="customDateTo"
                        type="date"
                        size="mini"
                        @change="dateChenge"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="更多日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="export" @click="exportCountData">导出</div>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
                type="index"
                label="排名">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称">
            </el-table-column>
            <el-table-column
                prop="complexindex"
                label="综合指数"
                sortable>
            </el-table-column>
            <el-table-column
                prop="co"
                label="CO"
                sortable>
            </el-table-column>
            <el-table-column
                prop="o3"
                label="O3"
                sortable>
            </el-table-column>
            <el-table-column
                prop="so2"
                label="SO2"
                sortable>
            </el-table-column>
            <el-table-column
                prop="no2"
                label="NO2"
                sortable>
            </el-table-column>
            <el-table-column
                prop="pm10"
                label="PM10"
                sortable>
            </el-table-column>
            <el-table-column
                prop="pm25"
                label="PM2.5"
                sortable>
            </el-table-column>
            <el-table-column
                prop="aqi"
                label="AQI"
                sortable>
            </el-table-column>
            <el-table-column
              prop="mainpoll"
              label="首要污染物"
              sortable>
            </el-table-column>
        </el-table>
        <p class="declare" v-if="isChoose===0">廊坊市{{preDate}}区县排名（数据来源于网络，未经审核仅供参考）</p>
        <p class="declare" v-if="isChoose===1">廊坊市{{nowMonth}}至{{preDate}}区县排名（数据来源于网络，未经审核仅供参考）</p>
        <p class="declare" v-if="isChoose===2">廊坊市1月1日至{{preDate}}区县排名（数据来源于网络，未经审核仅供参考）</p>
        <p class="declare" v-if="isChoose===3">廊坊市{{customDateFrome}}至{{customDateTo}}区县排名（数据来源于网络，未经审核仅供参考）</p>

    </div>
</template>

<script>
  import api from '../../api/index'
export default {
    name: 'CityRanking',
    props: [],
    data() {
        return {
            isChoose:0,
            isCustom:false,
            timeTabs:[
                {
                    label:'日报',
                },{
                    label:'月报',
                },{
                    label:'年报',
                },{
                    label:'自定义',
                },
            ],
            dateVal:'',
            tableData: [],
            customDateFrome:'',
            customDateTo:'',
            preDate:'',//前一天
            nowMonth:'',
        }
    },
    created(){
      this.getCountyRanking();
    },
    computed: {},
    components: {},
    mounted() {
        this.getYesterday();//获取前一天
    },
    methods: {
        getCountyRanking() {
          /*区县排名*/

          let chengeType = this.changeParams(this.isChoose);
          let [type,starttime,endtime] = [chengeType,this.customDateFrome,this.customDateTo];
          try {
            this.tableData = [];
                api.getCountyRanking(type,starttime,endtime).then(res=>{
                  console.log(res);
                  if(res.data.status === 1){
                    let listData = res.data.data;
                    this.tableData = listData;
                  }
                })
            } catch (error) {
                console.log(error);
            }
        },
        dateChenge(){
            if(this.customDateFrome&&this.customDateTo){
              this.getCountyRanking();
            }
        },
        timeClick(v,i){
            this.isChoose = i;
            this.customDateFrome = '';
            this.customDateTo = '';
            this.getCountyRanking();
            if(i=='3'){
                this.isCustom = true;
                if(!this.customDateFrome&&!this.customDateTo){
                    this.$message({
                        message:'请选择起止时间查询',
                        type:'warning'
                    })
                }
            }else{
                this.isCustom = false;
            }
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 0) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
            return '';
        },
        getYesterday(){
            let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
            let yesday = new Date(time);
            //前一天
            this.preDate = (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "月" +(yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate()+'日'));
            //当月1号
            this.nowMonth = (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "月"+'01日';
        },
        exportCountData() {
            /*导出*/
            let chengeType = this.changeParams(this.isChoose);
            let [type,starttime,endtime] = [chengeType,this.customDateFrome,this.customDateTo];
            api.exportCountData(type,starttime,endtime);
        },
        changeParams(val){
          switch (val) {
            case 0:
              return 'd';
              break;
            case 1:
              return 'm';
              break;
            case 2:
              return 'y';
              break;
            case 3:
              return 'di';
              break;
            default:
              return 'd';
              break;
          }
        },
    },
}
</script>

<style lang="scss" scope>
#CityRanking {
    width: calc(100% - 116px);
    height:calc(100% - 86px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 30px;
    background-color: #141a38;
    float: left;
    text-align: left;
    color: #fff;
    .el-table .sort-caret.descending,.el-table .sort-caret.ascending{
      display: none;
    }
    .caret-wrapper{
      background: url("../../../static/images/Logo/sort.png") right center no-repeat;
      background-size: 14px;
    }
    .timeChoose{
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color:rgba(18,218,136,1);
        i{
            display: inline-block;
            font-style: normal;
            margin: -2px 8px;
            width:4px;
            height:15px;
            background:rgba(18,218,136,1);
        }
    }
    ul{
        margin-left: 10px;
        margin: 20px 0;
        display: inline-block;
        border-bottom: 1px solid rgba(10,15,42,1);
        margin-right: 15px;
        li{
            width: 47px;
            display: inline-block;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            text-align: center;
            line-height: 36px;
            margin-right: 15px;
        }
        :hover{
            cursor: pointer;
        }
        li:last-child{
            margin-right: 0;
        }
    }
    .checked{
        border-bottom: 2px solid rgba(18,218,136,1);
    }
    .inline{
        display: inline-block;
    }
    .choose{
        float: left;
    }
    .export{
        width:64px;
        height:22px;
        background:linear-gradient(0deg,rgba(79,172,254,1),rgba(0,242,254,1));
        box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
        border-radius:11px;
        text-align: center;
        line-height: 22px;
        margin-top: 25px;
        float: right;
        font-size: 14px;
        &:hover{
            cursor: pointer;
        }
    }
    .declare{
        text-align: right;
        font-size: 12px;
        margin-top: 27px;
    }
}
</style>
