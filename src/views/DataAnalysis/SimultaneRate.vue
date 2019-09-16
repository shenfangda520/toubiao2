<template>
    <div class="Simultane-rate">
        <!--同期变化率-->
        <v-header></v-header>
        <!---->
        <div class="warp3">
            <div style="padding-top: 30px"></div>
            <!--查询条件-->
            <div class="chaxuntiaojian">
                <div class="float001">
                    <el-radio-group v-model="StatRankName" @change='clickChangeData'>
                        <el-radio-button label="日报"></el-radio-button>
                        <el-radio-button label="月报"></el-radio-button>
                        <el-radio-button label="年报"></el-radio-button>
                    </el-radio-group>
                </div>
                <!---->
                <div class="float003">
                    <el-button type="primary" @click='conExport'>导出</el-button>
                </div>
            </div>
            <!---->
            <div class="kass">
                <div class="wbiaoti">
                    <p>{{messagetip}}污染物浓度及综合指数同期变化率</p>
                </div>
            </div>
            <!--表格-->
            <div class="xuanxiantable">
                <el-table :data="tableData"  border style="width: 100%">
                    <el-table-column prop="Ranking" label="排名" width="160"></el-table-column>
                    <el-table-column prop="Name" label="名称"></el-table-column>
                    <el-table-column label="PM2.5">
                        <template slot-scope="scope">
                            <span>{{scope.row.Pm25}}</span>
                            <img v-if="StatesortChange(scope.row.Pm25)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                    <el-table-column label="PM10">
                        <template slot-scope="scope">
                            <span>{{scope.row.Pm10}}</span>
                            <img v-if="StatesortChange(scope.row.Pm10)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                    <el-table-column label="SO2">
                        <template slot-scope="scope">
                            <span>{{scope.row.So2}}</span>
                            <img v-if="StatesortChange(scope.row.So2)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                    <el-table-column label="NO2">
                        <template slot-scope="scope">
                            <span>{{scope.row.No2}}</span>
                            <img v-if="StatesortChange(scope.row.No2)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                    <el-table-column label="CO">
                        <template slot-scope="scope">
                            <span>{{scope.row.Co}}</span>
                            <img v-if="StatesortChange(scope.row.Co)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                    <el-table-column label="O3">
                        <template slot-scope="scope">
                            <span>{{scope.row.O3}}</span>
                            <img v-if="StatesortChange(scope.row.O3)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                    <el-table-column label="综合指数">
                        <template slot-scope="scope">
                            <span>{{scope.row.Com_Index}}</span>
                            <img v-if="StatesortChange(scope.row.Com_Index)" src="../../../static/imgs/colorimg/xiangshang.png">
                            <img v-else src="../../../static/imgs/colorimg/xiangxia.png">
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="block">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="pagesize"
                            layout="total, prev, pager, next, jumper"
                            :total="totalCount">

                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../../api/index'

    export default {
        name: 'Simultane-rate',
        data() {
            return {
                //
                tableData: [],
                //
                messagetip:'',
                //
                CityData: [],
                //
                pagesize: 10,
                //
                currentPage: 1,
                //数据量/分页
                totalCount: 11,
                //统计排名查询条件
                StatRankName: '日报'
            }
        },
        created() {

        },
        mounted() {
            this.clickChangeData('日报');
        },
        methods: {
            //
            clickChangeData(val){
                console.log(val);
                const _this = this;
                switch (val){
                    case '日报':
                        _this.getdatalist('0');
                        break;
                    case '月报':
                        _this.getdatalist('1');
                        break;
                    case '年报':
                        _this.getdatalist('2');
                        break;
                    default:
                        _this.getdatalist('0');
                        break;
                }

            },
        	//导出
        	conExport(){},
            //
            getdatalist(type){
                const _this = this;
                this.CityData = [];
        	    api.GetProportionRes(type).then(res =>{
        	        console.log(res);
                    let InfoData = res.data.Data;
                    this.messagetip = res.data.Message;
                    _this.totalCount = InfoData.length;
                    InfoData.forEach((item,index)=>{
                        let tableData = {};
                        tableData.Ranking = index++ +1;
                        tableData.Co = _this.replacementData(item.co);//巡查周期
                        tableData.Name = item.countyname || item.gridname;//用途描述
                        tableData.No2 = _this.replacementData(item.no2);//设备id
                        tableData.O3 = _this.replacementData(item.o3);//设备id
                        tableData.Pm10 = _this.replacementData(item.pm10);//设备更换情况
                        tableData.Pm25 = _this.replacementData(item.pm25);//设备参数
                        tableData.So2 = _this.replacementData(item.so2);//设备型号
                        tableData.Com_Index = _this.replacementData(item.complexindex);//负责人
                        _this.CityData.push(tableData);
                    })
                    this.setPageTable(10, 1);
                })

            },
            //
            replacementData(value){
                let rtvalue = null;
                if(value > 0){
                    rtvalue = value + '%'
                }else if (value < 0){
                    rtvalue = value.replace('-','') + '%'
                }else {
                    rtvalue = value + '%'
                }
                return rtvalue
            },
            //
            StatesortChange(value){
                let state = false;
                //上涨
                if(parseInt(value) > 0){
                    state = true;
                }
                //跌停
                else if(parseInt(value) < 0){
                    state = false
                }
                //
                else {
                    state = false
                }
                return state;
            },
            //每页显示数据量变更
            handleSizeChange(val) {

            },
            //点击页码换页
            handleCurrentChange(val) {
                this.currentPage = 1;
                this.setPageTable(10, val);
            },
            //分页数据
            setPageTable(pageSize, pageNum) {
                let i = 1;
                let rtValue = [];
                let startNum = pageSize * (pageNum - 1);
                for (let i = 0; i < pageSize; i++) {
                    if ((startNum + i + 1) > this.CityData.length)
                        break;
                    rtValue.push(this.CityData[startNum + i]);
                }
                this.tableData = rtValue;
            },
            //排序
            compare(propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName];
                    let value2 = object2[propertyName];
                    return value2 - value1
                }
            }
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .Simultane-rate {
        width: 100%;
        height: auto;
        //title标题
        .warp3 {
            width: 96%;
            height: auto;
            margin: 0 auto;
            .shituquxian{
                width: 100%;
                height: auto;
            }
            .xuanxiantable{
                .cell{
                    img{
                        width: 16px!important;
                    }
                }

            }
            .genduo {
                width: 100%;
                height: 34px;
                border: solid 1px #ccc;
                margin-top: 15px;
                line-height: 34px;
                cursor: pointer
            }
            .kass {
                width: 100%;
                height: auto;
                .wbiaoti {
                    a {
                        display: inline-block;
                        height: 20px;
                        border-left: solid 3px #428bca;
                        padding-left: 13px;
                        font-size: 16px;
                        line-height: 20px;
                    }
                    .ExportBtn{
                    	float: right;
                    	margin-right: 30px;
                    }
                    text-align: left;
                    border-bottom: solid 1px #ccc;
                    width: 100%;
                    height: 40px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    margin-left: 10px;
                    line-height: 40px;
                }
            }
            .chaxuntiaojian {
                width: 100%;
                height: 50px;
                .float001 {
                    float: left;
                }
                .float002 {
                    float: left;
                    margin-left: 40px;
                }
                .float003 {
                    float: left;
                    margin-left: 40px;
                }
            }

        }
    }
</style>
