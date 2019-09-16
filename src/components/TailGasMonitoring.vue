<template>
    <!--广阳-油品控制-->
    <div  class="main">
        <section class="tailtest_scroll">
            <el-date-picker
                v-model="search_time"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
            <el-button class="btn_search" size="small" @click="dataChangeSearch">查询</el-button>
            <div class="tail_chart_wrap">
                <div class="chart_box" v-for="(item,index) in tailGasChartList">
                    <h4>{{item.title}}</h4>
                    <!-- <chart 
                        style="width: 100%;height: 100%" :auto-resize="false"
                        :options="item.configOpt"></chart> -->
                        <div style="width: 100%;height: 100%" :id="'chart_'+index"></div>
                </div>
            </div>
            <!--表格-->
            <div class="table_container">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        prop="id"
                        label="序号">
                    </el-table-column>
                    <el-table-column
                        prop="licence"
                        label="车牌号">
                    </el-table-column>
                    <el-table-column
                        label="时间"
                        width="140px"
                    >
                        <template scope="scope">
                            <span>{{dateFormat(scope.row.time)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gas"
                        label="结果">
                        <template scope="scope">
                        <span v-if="scope.row.gas == 1">合格</span>
                        <span v-else>不合格</span>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </section>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'

    export default {
        name: 'TailGasMonitoring',
        props: [],
        data() {
            return {
                tailGasChartOpt: {},
                tailGasChartList: [],
                tableData: [],
                search_time: ''
            }
        },
        computed: { },
        components: { 
            // 'chart': ECharts
        },
        mounted() {
            this.getRequestData();
        },
        methods: {
            getRequestData: function () {
                let time = this.search_time || '';
                console.log('我是输出的查询time',this.search_time);
                api.getTailGasMonitoringCharsData(time).then(res => { 
                    this.resetChartsData(res.data.data);
                });
                api.getTailsGasMonitoringListData(time).then(res => {
                    this.tableData = res.data.data.rows;
                });
            },
            resetChartsData: function (data){

                let that = this;
                let tmpArray = [];
                for (let i =0;i<data.length;i++) {
                    let tmp = {};
                    tmp.title = data[i].title;
                    let chartData = data[i].data
                    tmp.configOpt = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)",
                            show: false
                        },
                        color: ['#DE2159', '#ffaa1f', '#d20d40', '#9c0a4e', '#efdc31', '#33c633'],
                        series: [{
                            name: '',
                            type: 'pie',
                            radius: '60%',
                            center: ['50%', '50%'],
                            data: chartData,
                            label: {
                                position: 'inner',
                                formatter: "{b}{d}%"
                            },
                          itemStyle:{
                              normal:{
                                labelLine:{
                                  length:10,
                                  length2: 10
                                }
                              }
                          }
                        }]
                    };
                    tmpArray.push(tmp); 
                }
                that.tailGasChartList = tmpArray;
                setTimeout(()=>{
                    that.setchars();
                },600)
                
            },
            //
            setchars:function(){
                const _this = this;
                let data = _this.tailGasChartList;
                for (let i =0;i<data.length;i++) {
                    let tmp = {};
                    let chartName = 'chart_'+i;
                    tmp.myChart = echarts.init(document.getElementById(chartName));
                    console.log(tmp.myChart)
                    tmp.myChart.setOption(data[i].configOpt);
                }
            },
            dateFormat(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            },
            //
            dataChangeSearch: function () {
                this.getRequestData();
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 === 0) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }
                return '';
            },
        },
    }
</script>

<style lang="scss" scope>
 
    .main {
        height: auto;
        width: 430px;
        .tailtest_scroll{
            width: 100%;
            overflow-y: auto;
            box-sizing: border-box;
            padding: 12px 15px;
            text-align: left;
            h4{
                font-weight: normal;
                font-size: 14px;
                color: #12DA88;
                padding: 15px 0 0;
            }
            .btn_search {
                border: none;
                width: 80px;
                height: 32px;
                background: #12DA88;
                color: #fff;
                line-height: 10px;
                border-radius: 4px;
            }
            .tail_chart_wrap{
                font-size: 0;
                text-align: center;
                padding: 18px 0;
                .chart_box{
                    text-align: center;
                    width: 50%;
                    display: inline-block;
                    height: 140px;
                }
            }
        }
        
    }
</style>
