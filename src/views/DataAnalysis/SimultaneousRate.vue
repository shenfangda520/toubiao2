<template>
    <div id="SimultaneousRate">
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
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="更多日期">
                    </el-date-picker>-
                    <el-date-picker
                        v-model="customDateTo"
                        type="date"
                        size="mini"
                        @change="getCountyRateData"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="更多日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="export" @click="getCountyRateDataExcel">导出</div>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName"
            :cell-style="cellStyle">
            <el-table-column
                type="index"
                label="排名"
                width="50">
            </el-table-column>
            <el-table-column
                prop="cityname"
                label="区县"
                width="60">
            </el-table-column>
            <el-table-column label="综合指数">
                <el-table-column
                    prop="comindex"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="comindex_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column label="O3">
                <el-table-column
                    prop="o3"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="o3_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column label="SO2">
                <el-table-column
                    prop="so2"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="so2_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column label="NO2">
                <el-table-column
                    prop="no2"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="no2_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column label="PM10">
                <el-table-column
                    prop="pm10"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="pm10_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column label="PM2.5">
                <el-table-column
                    prop="pm25"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="pm25_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
            <el-table-column label="CO">
                <el-table-column
                    prop="co"
                    label="指数"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="co_rate"
                    label="变化率"
                    sortable>
                </el-table-column>
            </el-table-column>
        </el-table>
        <p class="declare" v-if="isChoose===0">廊坊市{{preDate}}同期变化率（数据来源于网络，未经审核仅供参考）</p>
        <p class="declare" v-if="isChoose===1">廊坊市{{nowMonth}}至{{preDate}}同期变化率（数据来源于网络，未经审核仅供参考）</p>
        <p class="declare" v-if="isChoose===2">廊坊市1月1日至{{preDate}}同期变化率（数据来源于网络，未经审核仅供参考）</p>
        <p class="declare" v-if="isChoose===3">廊坊市{{customDateFrome}}至{{customDateTo}}同期变化率（数据来源于网络，未经审核仅供参考）</p>
    </div>
</template>

<script>
    import api from '../../api/index'
    export default {
        name: 'SimultaneousRate',
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

        },
        computed: {},
        components: {},
        mounted() {
            this.getYesterday();
            this.getCountyRateData();
        },
        methods: {
            getCountyRateData(){
              let type = this.isChoose;
              let startTime = this.customDateFrome;
              let endTime = this.customDateTo;
              if((!this.customDateFrome&&!this.customDateTo)||(this.customDateFrome&&this.customDateTo)){
                api.getCountyRateData(type,startTime,endTime).then(res=>{
                  let ListData = res.data.data;
                  this.tableData = ListData;
                  console.log(res);
                })
              }

            },
            timeClick(v,i){
                this.isChoose = i;
                this.getCountyRateData();
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
            cellStyle(row,column,rowIndex,columnIndex){
                // console.log(row);
                if((row.row.comindex_rate.indexOf('-')==-1||row.row.comindex_rate=='0.0%')&&row.columnIndex===3){
                    return 'background:#DD1D1D'
                }else if(row.row.comindex_rate.indexOf('-')!=-1&&row.columnIndex===3){
                    return 'background:#12AC19'
                }
                if((row.row.o3_rate.indexOf('-')==-1||row.row.o3_rate=='0.0%')&&row.columnIndex===5){
                    return 'background:#DD1D1D'
                }else if(row.row.o3_rate.indexOf('-')!=-1&&row.columnIndex===5){
                    return 'background:#12AC19'
                }
                if((row.row.so2_rate.indexOf('-')==-1||row.row.so2_rate=='0.0%')&&row.columnIndex===7){
                    return 'background:#DD1D1D'
                }else if(row.row.so2_rate.indexOf('-')!=-1&&row.columnIndex===7){
                    return 'background:#12AC19'
                }
                if((row.row.no2_rate.indexOf('-')==-1||row.row.no2_rate=='0.0%')&&row.columnIndex===9){
                    return 'background:#DD1D1D'
                }else if(row.row.no2_rate.indexOf('-')!=-1&&row.columnIndex===9){
                    return 'background:#12AC19'
                }
                if((row.row.pm10_rate.indexOf('-')==-1||row.row.pm10_rate=='0.0%')&&row.columnIndex===11){
                    return 'background:#DD1D1D'
                }else if(row.row.pm10_rate.indexOf('-')!=-1&&row.columnIndex===11){
                    return 'background:#12AC19'
                }
                if((row.row.pm25_rate.indexOf('-')==-1||row.row.pm25_rate=='0.0%')&&row.columnIndex===13){
                    return 'background:#DD1D1D'
                }else if(row.row.pm25_rate.indexOf('-')!=-1&&row.columnIndex===13){
                    return 'background:#12AC19'
                }
                if((row.row.co_rate.indexOf('-')==-1||row.row.co_rate=='0.0%')&&row.columnIndex===15){
                    return 'background:#DD1D1D'
                }else if(row.row.co_rate.indexOf('-')!=-1&&row.columnIndex===15){
                    return 'background:#12AC19'
                }
            },
            getYesterday(){
                let time = (new Date).getTime() - 24 * 60 * 60 * 1000;
                let yesday = new Date(time);
                //前一天
                this.preDate = (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "月" +(yesday.getDate()> 9 ? (yesday.getDate()) : "0" + (yesday.getDate()+'日'));
                //当月1号
                this.nowMonth = (yesday.getMonth()> 9 ? (yesday.getMonth() + 1) : "0" + (yesday.getMonth() + 1)) + "月"+'1日';
            },
            getCountyRateDataExcel() {
                /*导出*/
                  let type = this.isChoose,
                    startTime = this.customDateFrome,
                    endTime = this.customDateTo;
                api.getCountyRateDataExcel(type,startTime,endTime);
            },
        },
    }
</script>

<style lang="scss" scope>
    #SimultaneousRate {
        width: calc(100% - 116px);
        height:calc(100% - 86px);
        overflow-y: auto;
        box-sizing: border-box;
        padding: 10px;
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
                width: 45px;
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
            margin-top: 50px;
        }
    }
</style>
