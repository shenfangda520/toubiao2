<template>
    <!--餐饮油烟视频监控右侧面板-->
    <div class="main">
        <div class="sousuo">
            <div class="sleft">
                <el-input v-model="filters.name" @keyup.enter.native="searchData" placeholder="名称"></el-input>
            </div>
            <div class="sright">
                <el-button type="primary" @click="searchData()">搜索</el-button>
            </div>
        </div>
        <div class="table_video">
            <el-table :data="tableData" border @current-change="RowCurrentChange" style="width: 100%">
                <el-table-column width="50" label="开关">
                    <template slot-scope="scope">
                        <img v-show="scope.row.videoOff=='1'" src="../../static/imgs/tuli/start.png" alt="">
                        <img v-show="scope.row.videoOff=='0'" src="../../static/imgs/tuli/stop.png" alt="">
                    </template>
                </el-table-column>
                <el-table-column width="50" property="SerialNumber" label="序号"></el-table-column>
                <el-table-column property="gridName" label="网格名称"></el-table-column>
                <el-table-column prop="name" width="160" label="视频名称"></el-table-column>
                <el-table-column prop="TypeName" label="视频状态"></el-table-column>
            </el-table>

        </div>
    </div>
</template>
<!---->
<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'

    export default {
        name: 'vocvideo',
        data() {
            return {
                //
                tableData: [],
                //
                currentRow: null,
                //
                pagesize: 10,
                //
                currentPage: 1,
                //
                totalCount: 0,
                //
                value2: '',
                //
                type: 'VOCs企业',
                //
                filters: {
                    name: ''
                },

            }
        },
        created() {},
        mounted() {
            //页面初始化数据
            api.GetSootPointListData('').then(res => {
                console.log(res);
                let shoulist = res.data.data;
                this.InitializationDataMethod(shoulist);
            })
        },
        methods: {
            //初始化数据
            InitializationDataMethod(data) {
                this.SetDataList(data)
            },
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
            //table行点击
            RowCurrentChange(val) {
                this.currentRow = val;
                // 地图联的
                bus.$emit('locationClick', 'layer_sp_cy', this.currentRow ,this.type);
            },

            //设置分页所需要数据
            SetDataList(data) {
                this.tableData = [];
                let i = 1;
                data.forEach(item => {
                    const tableData = {};
                    tableData.SerialNumber = i++;//序号
                    tableData.name = item.name;//类型
                    tableData.id = item.id;//城市id
                    tableData.latitude = item.latitude;//纬度
                    tableData.longitude = item.longitude;//经度
                    tableData.TypeName = item.videoStatus ?'开启':'关闭'
                    tableData.gridName = item.gridName || '----';//监测点类型 XH或开发区
                    tableData.videoOff = item.alarmStatus;
                    this.tableData.push(tableData);
                })
            },
            //搜索过滤数据
            filterTimeConversion(data) {
                const t = this;
                this.allData = [];
                let rtValue = [];
                let dt = data;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
                        if (item.CamName.indexOf(t.filters.name) >= 0) {
                            rtValue.push(dt[i]);
                        }
                    }
                }
                return rtValue;
            },
            //搜索事件
            searchData() {
                let gname = this.filters.name;
                api.GetSootPointListData(gname).then(res => {
                    console.log(res);
                    let data = res.data.data;
                    this.SetDataList(data);
                });
            },

        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .mapdw {
        width: 25px;
        height: 25px;
        display: block;
        margin: -5px 43px;
    }

    .main {
        width:430px;
        height: auto;
        .tables {
            width: 100%;
            line-height: 38px;
            a {
                margin-left: -270px;
                display: inline-block;
                font-size: 16px;
                color: #4696FF;
                border-bottom: solid 2px #4696FF;
                padding: 0 20px;
                margin-bottom: -2px;
            }
            .xian {
                width: 100%;
                border: solid 1px #ccc;
            }
        }
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
    }
</style>
