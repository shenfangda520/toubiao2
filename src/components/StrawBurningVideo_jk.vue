<template>
    <!--秸秆焚烧视频监控右侧面板-->
    <div class="main">

        <div class="sousuo">
            <div class="sleft">
                <el-input v-model="filters.name" @keyup.enter.native="searchData" placeholder="名称"></el-input>
            </div>
            <div class="sright">
                <el-button type="primary" @click="searchData">搜索</el-button>
            </div>
        </div>
        <div class="table_video">
            <el-table :data="tableData" :row-class-name="tableRowClassName" border @current-change="RowCurrentChange" style="width: 100%">
                <el-table-column prop="SerialNumber" label="排名"></el-table-column>
                <el-table-column property="name" label="二级网格名称"></el-table-column>
                <el-table-column prop="casenum" label="案件数量"></el-table-column>
            </el-table>
            <!--分页条-->
            <!--<div class="Pagination" style="text-align: left;margin-top: 10px;">-->
                <!--<el-pagination background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="totalCount"></el-pagination>-->
            <!--</div>-->
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
                filters: {
                    name: ''
                },

            }
        },
        created() {
        },
        mounted() {
            //页面初始化数据
          let companyType = '4';
            api.SuperviseCaseGridRatio('4','','','').then(res =>{
                console.log(res.data)
                let shoulist= res.data.data;
                this.InitializationDataMethod(shoulist);
            })
        },
        methods: {
            //初始化数据
            InitializationDataMethod(data) {
                this.SetDataList(data);
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
                bus.$emit('locationClick', 'layer_sp_jg', this.currentRow ,this.type ,true);
            },
            //页码变更
            handleCurrentChange(val) {
                this.setPageTable(10, val);
                //console.log(val)
            },
            //分页部分功能
            getPointByType(type, data) {
                let rtValue = [];
                let dt = data;
                //console.log(dt)
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
                        if (item.TypeName === type || item.TypeName ==='VOC企业') {
                            rtValue.push(dt[i]);
                        }
                    }
                }
                return rtValue;
            },
            //筛选数据
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
               this.tableData = [];
                let i = 1;
                let vdata  = data.sort(this.compare('casenum'));
                vdata.forEach(item => {
                    const tableData = {};
                    tableData.SerialNumber = i++;//序号
                    tableData.name = item.name;//行业
                    tableData.casenum = item.casenum;//类型
                    tableData.id = item.id;//城市id
                    tableData.latitude = item.latitude;//纬度
                    tableData.longitude = item.longitude;//经度
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
                // 声明变量
                let gsname =  this.filters.name;
                api.SuperviseCaseGridRatio('4', '', '',gsname).then(res =>{
                    //console.log(res);
                    let shoulist= res.data.data;
                    this.InitializationDataMethod(shoulist);
                })

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
  img {
     position: absolute;
     top: 40%;
     left: -17px;
     cursor: pointer;
     float: left;
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
      .yuanzhan {
                    /*APP写进去*/
                    width: 100%;
                    height: 150px;
                    .jdflaot {
                        margin-top: 25px;
                        margin-bottom: 25px;
                        float: left;
                        margin-left: 40px;
                        p {
                            text-align: center;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                    div {
                        margin-bottom: 8px;
                        position: relative;
                        .texts {
                            width: 100%;
                            height: 30px;
                            position: absolute;
                            top: 32px;
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                        }
                    }
                }
   }
</style>
