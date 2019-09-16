<template>
    <!--广阳-油品控制-->
    <div class="main">
        <!--标题-->
        <div class="gy_oils_piebox">
            <el-date-picker
                v-model="search_time"
                type="date"
                size="small"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
            <el-button  class="btn_search" @click="getSearchData">查询</el-button>
            <h4>油品合格率</h4>
            <div class="oils_chart">
                <chart ref="oilsChart" 
                    style="width: 100%;height: 180px" :auto-resize="false"
                    :options="oilsContrOpt"></chart>
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
                    prop="name"
                    label="加油站名称">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop="standard"
                    label="结果">
                    <template scope="scope">
                        <span v-if="scope.row.standard == 1">合格</span>
                        <span v-else>不合格</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    export default {
        name: 'OilGasRecoveryMonitoring',
        props: [],
        data() {
            return {
                oilsContrOpt: {},
                oilsContrData: [],
                tableData: [],
                search_time: ''
            }
        },
        computed: { },
        components: { },
        mounted() {
            this.getRequestData();
        },
        methods: {
            getRequestData: function () {
                let time = this.search_time || '';
                console.log('我是输出的查询time',this.search_time);
                api.getOilGasRecoveryChartData(time).then(res => { 
                    this.oilsContrData = res.data.data[0].data;
                    this.initOilsPie();
                });
                api.getOilGasRecoveryListData(time).then(res => {
                    this.tableData = res.data.data.rows;
                });
            },
            getSearchData: function () {
                this.getRequestData();
            },
            initOilsPie: function () {
                let that = this;
                this.oilsContrOpt = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#ff0f01', '#ffaa1f', '#d20d40', '#9c0a4e', '#efdc31', '#33c633'],
                    series: [{
                            name: '油品合格率',
                            type: 'pie',
                            radius: '68%',
                            center: ['50%', '50%'],
                            data: that.oilsContrData,
                            label: {
                                position: 'inner',
                                formatter: "{b}{d}%"
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                };
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
    .main{
        height: auto;
        width: 430px;
        .gy_oils_piebox{
            width: 100%;
            box-sizing: border-box;
            padding: 12px 15px;
            text-align: left;
            h4{
                font-weight: normal;
                font-size: 14px;
                color: #12DA88;
                padding: 15px 0;
            }
            .btn_search {
                border: none;
                width: 80px;
                height: 32px;
                background: #12DA88;
                line-height: 10px;
                color: #fff;
                border-radius: 4px;
            }
        } 
    }
</style>
