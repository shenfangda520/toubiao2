<template>
    <div class="index-warp">
        <!--首页部分-->
        <v-header :isChoose="2"></v-header>
        <!--地图部分-->
        <main-map></main-map>
        <!--右侧面板-->
        <div class="right-pad" ref="rightpad">
            <div class="right-click">
                <i class="el-icon-d-arrow-right"></i>
            </div>
            <!--内容-->
            <div class="neirong">

                    <div class="kbiaoti">京津冀地区污染排放对廊坊的影响贡献及重点源分布</div>
                    <div class="bluexian"></div>
                    <!--排名-->
                    <div class="table_container">
                        <el-table
                                :data="tableData"
                                border
                                stripe
                                :row-class-name="tableRowClassName"
                                highlight-current-row
                                @current-change="RowCurrentChange"
                                >
                            <el-table-column
                                    property="InControl"
                                    label="名称"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    property="hangye"
                                    label="行业"
                                    width="140"
                                    >
                            </el-table-column>
                            <el-table-column
                                    property="actions"
                                    label="查看地址"
                                    >
                                <template scope="scope">
                                    <el-button @click="ChakanClick(scope.$index, scope.row)" type="text" size="small">
                                        <img class="mapdw" src="../assets/img/map.png" alt="">

                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="Pagination" style="text-align: left;margin-top: 10px;">
                            <el-pagination
                                    background
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-size="pagesize"
                                    layout="total, prev, pager, next"
                                    :total="totalCount">
                            </el-pagination>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</template>

<script>
    import MainMap from '@/map/GridMapMain' //0809
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    export default {
        name: 'gridmapview',
        data() {
            return {
                //
                zuo: false,
                //
                you: true,
                //
                tableData: [],
                //
                allData: [],
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
            }
        },

        mounted() {
            const _this = this;
            let flag = true;
            //右侧伸缩栏模块
            $('.right-click').on('click', function () {
                _this.$refs.rightpad.style.transition = "all 500ms"
                if (flag) {
                    _this.$refs.rightpad.style.WebkitTransform = "translate(398px)";
                    _this.$refs.rightpad.style.transform = "translate(398px)";
                    flag = false;
                } else {
                    _this.$refs.rightpad.style.WebkitTransform = "translate(0)";
                    _this.$refs.rightpad.style.transform = "translate(0)";
                    flag = true;
                }
            });
            bus.$on('getGridData',this.InitializationDataMethod);
        },
        methods: {
            //初始化页面数据
            InitializationDataMethod(data) {
                //初始化数据
                let sudata = data;
                this.SetDataList(sudata)
                this.totalCount = this.ALLdata.length;
                this.allData = this.ALLdata;
                this.setPageTable(10, 1);
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
                //console.log(this.currentRow)
            },
            //查看地址
            ChakanClick(index, item) {

                let citygid = item.citygid;//城市id
                let latitude = item.latitude;//纬度
                let longitude = item.longitude;//经度
                bus.$emit('locationGridPoint', longitude, latitude, citygid);
            },
            //每页显示数据量变更
            handleSizeChange(val) {
                //this.pagesize = val;
            },
            //页码变更
            handleCurrentChange(val) {
                this.setPageTable(10, val);
                //console.log(val)
            },
            //数据筛选
            getPointByType(type) {
                let rtValue = [];
                let dt = this.data;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
                        if (item.type === type) {
                            rtValue.push(dt[i]);
                        }
                    }
                }
                return rtValue;
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
            //
            setPageTable(pageSize, pageNum) {
                let rtValue = [];
                let startNum = pageSize * (pageNum - 1);
                for (let i = 0; i < pageSize; i++) {
                    if ((startNum + i + 1) > this.allData.length)
                        break;
                    rtValue.push(this.allData[startNum + i]);
                }
                this.tableData = rtValue;
            },
            //设置分页所需要数据
            SetDataList(data) {
                this.data = data;
                this.ALLdata = [];
                let i = 1;
                this.data.forEach(item => {
                    const tableData = {};
                    tableData.InControl = item.companyname;//类型
                    tableData.hangye = item.industry;//行业
                    tableData.citygid = item.id;//城市id
                    tableData.latitude = item.point_lat;//纬度
                    tableData.longitude = item.point_lng;//经度
                    this.ALLdata.push(tableData);
                })
            },
            //
        },
        components: {MainMap}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .index-warp {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        position: relative;
        .right-pad{
            width: 398px;
            height: calc(100% - 86px);
            background:rgba(27,33,67,0.6);
            top: 86px;
            right: 0;
            position: absolute;
            .neirong{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow-y: auto;
                background: #151A37;
                z-index: 1000;
                .kbiaoti {
                    padding: 10px 0px;
                    color: #12DA88;
                }
                .bluexian {
                    width: 26px;
                    border: 1px solid #12DA88;
                    margin: 0 auto;
                    margin-bottom: 16px;
                }
                .tqbiaoti {
                    width: 100%;
                    height: 22px;
                    padding-left: 20px;
                    text-align: left;
                    margin-left: 16px;
                    border-left: solid 3px #12DA88;
                }
                .table_container {
                    margin-left: 6px;
                    img{
                      height:24px;
                      width:24px;
                    }
                }
            }
            .right-click{
                position: absolute;
                top: calc(50% - 72px);
                left: -18px;
                width:48px;
                height:144px;
                line-height: 144px;
                cursor:pointer;
                background:linear-gradient(0deg,rgba(79,172,254,1),rgba(0,242,254,1));
                border-image:linear-gradient(0deg, rgba(148,207,255,1), rgba(162,249,254,1)) 1 1;
                box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
                border-radius:24px;
                i{
                    color: white;
                    text-align: left;
                    margin-left: -28px;
                }
            }
        }
        .index-tuli{
            width: 430px;
            height: 54px;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -240px;
            img{
                position: absolute;
                bottom:0;
                left: 0;
            }
        }
        .block{
            margin-top: 15px;
            .el-input{
                width: 220px;
            }
            .el-checkbox{
                text-align: left;
                width: 220px;
            }
            .el-textarea{
                width: 220px;
            }
        }

        .v-video {
            position: absolute;
            top: 200px;
            left: 200px;
        }
        .fliex {
            position: fixed;
            right: 50px;
            top: 68%;
        }
    }
</style>
