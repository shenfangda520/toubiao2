<template>
    <div class="Cooking-fume-monitoring">
        <!--餐饮油烟监测-->
        <div class="main">
            <!--选项查询-->
            <div class="sousuo">
                <div class="sleft">
                    <el-input v-model="filters.name" @keyup.enter.native="searchData" placeholder="名称"></el-input>
                </div>
                <div class="sright">
                    <el-button type="primary" @click="searchData">搜索</el-button>
                </div>
            </div>
            <!--排名-->
            <div class="table_container">
                <el-table :data="tableData" border  :row-class-name="tableRowClassName" @current-change="RowCurrentChange" style="width:100%">
                    <el-table-column property="ranking" width="50" label="排名"></el-table-column>
                    <el-table-column property="gridName" label="网格名称" ></el-table-column>
                    <el-table-column property="name" label="名称" width="160"></el-table-column>
                    <el-table-column property="nongdu" width="60" label="出口浓度"></el-table-column>
                </el-table>

            </div>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'

    export default {
        name: 'onlinelist',
        data() {
            return {
                //
                type: 'PM2.5',
                //
                labelType: 'PM2.5',
                //
                tableData: [],
                //
                filters: {
                    name: ''
                },
                //
                currentRow: null,
                //
                pagesize: 10,
                //
                currentPage: 1,
                //
                totalCount: 0,
                //
                hisData: [],

            }
        },
        created() {},
        mounted() {
            //初始化数据接入
            this.InitializationDataMethod();
        },
        methods: {
            //颜色列表
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 === 0) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }
                return '';
            },
            //排序
            compare(propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value2 - value1
                }
            },
            //初数据始化列表
            InitializationDataMethod() {
                api.GetSootPointList().then(res => {
                    console.log(res);
                    let data = res.data.Data;
                    this.hisData = data;
                    this.SetDataList(data);
                })
            },
            //table点击事件
            RowCurrentChange(val) {
                this.currentRow = val;
                //地图联动
                bus.$emit('locationClick', 'layer_cy', this.currentRow ,this.type,true);
            },
            //设置表格
            SetDataList(data) {

                this.tableData = [];
                let i = 1;
                data.forEach(item => {
                    const tableData = {};
                    tableData.ranking = i++;//排名
                    tableData.name = item.name || '----';//类型
                    tableData.id = item.id;//城市id
                    tableData.latitude = item.latitude;//纬度
                    tableData.longitude = item.longitude;//经度
                    tableData.gridName = item.secondGridName || '----';//监测点类型 XH或开发区
                    tableData.nongdu = item.concentrationOut?item.concentrationOut:'----';
                    this.tableData.push(tableData);
                })
            },
            //
            searchData(){
                const _this = this;
                let data = _this.hisData;
                let gname = _this.filters.name;
                let rtValue = [];
                if (data) {
                    console.log(data);
                    for (let i = 0, length = data.length; i < length; i++) {
                        let item = data[i];
                        if (item.secondGridName.indexOf(gname) >= 0) {
                            rtValue.push(data[i]);
                        }
                    }
                };
                if(!gname) {
                    rtValue = data;
                };
                _this.SetDataList(rtValue);
            }

        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .Cooking-fume-monitoring {
        width: 430px;
        height: auto;
        img {
            position: absolute;
            top: 40%;
            left: -17px;
            cursor: pointer;
            float: left;
        }
        .main {
            height: auto;
            .sousuo {
                width: 96%;
                margin-top: 10px;
                margin-left: 4%;
                border-top: solid 1px #ccc;
                margin-bottom: 25px;
                height: 40px;
                padding-top: 15px;
                .sleft {
                    float: left;
                }
                .sright {
                    margin-left: 10px;
                    float: left;
                }
            }
            .table_container {
                margin-left: 6px;
            }
        }
    }
</style>
