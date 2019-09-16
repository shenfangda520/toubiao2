<template>
   <div class="CaseSupervision">
       <div class="main">
           <!--选项查询-->
           <div class="first">
               <div class="shijian">
                   <div class="block">
                       <el-date-picker
                               v-model="starttime"
                               type="date"
                               placeholder="选择日期"
                               :picker-options="pickerOptions0"
                               format="yyyy-MM-dd"
                               value-format="yyyy-MM-dd">
                       </el-date-picker>
                   </div>
                   <div style="float: left;line-height: 34px;padding: 0 3px">-</div>
                   <div class="block">
                       <el-date-picker
                               v-model="endtime"
                               type="date"
                               placeholder="选择日期"
                               :picker-options="pickerOptions1"
                               format="yyyy-MM-dd"
                               value-format="yyyy-MM-dd">
                       </el-date-picker>
                   </div>
               </div>
               <div class="btnns">
                   <button @click="btnClickEvent">查询</button>
               </div>
           </div>
           <!--图表-->
           <div class="chars-tubiao">
               <!--责任主体占比-->
               <div class="title-daqi">
                   <div class="shuxian"></div>
                   <div class="title-text">
                       <div class="bing_text">责任主体占比</div>
                   </div>
               </div>
               <div class="">
                   <div id="bing_item_1p" style="width: 390px;height: 180px;padding-left: 14px"></div>
               </div>
           </div>
           <!--图表-->
           <div class="chars-tubiao">
               <!--网格占比-->
               <div class="title-daqi">
                   <div class="shuxian"></div>
                   <div class="title-text">
                       <div class="bing_text">网格占比</div>
                   </div>
               </div>
               <div class="">
                   <div id="bing_item_2p" style="width: 390px;height: 180px;padding-left: 14px"></div>
               </div>
           </div>
           <!--选项-->
           <div class="search">
               <div class="block" style="margin-top: 20px;">
                   <span class="demonstration">责任主体</span>
                   <el-select v-model="EventSourceVal" @change="AddSelectName1" placeholder="请选择">
                       <el-option
                               v-for="item in EventSources"
                               :key="item.Code"
                               :label="item.Name"
                               :value="item.Code">
                       </el-option>
                   </el-select>
                   <span class="demonstration">网格占比</span>
                   <el-select v-model="EventTypeVal" @change="AddSelectName2" placeholder="请选择">
                       <el-option
                               v-for="item in EventTypes"
                               :key="item.Code"
                               :label="item.Name"
                               :value="item.Code">
                       </el-option>
                   </el-select>
               </div>
           </div>
           <!--排名-->
           <div class="table_container">
               <el-table
                       :data="tableData"
                       border
                       style="width: 100%">
                   <el-table-column
                           prop="sunnum"
                           label="违规次数"
                   >
                   </el-table-column>
                   <el-table-column
                           prop="name"
                           label="企业名称"
                           >
                   </el-table-column>
                   <el-table-column
                           prop="gridName"
                           label="所属乡镇"
                           >
                   </el-table-column>
                   <el-table-column
                           prop="responsibilityName"
                           label="责任主体">
                   </el-table-column>
               </el-table>
           </div>
       </div>
   </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'

    export default {
        name: 'Reportpeople',
        data() {
            return {
                //列表数据
                tableData: [],
                //存储分页数据
                alldata: [],
                //
                currentRow: null,
                //分页每页
                pageSize: 10,
                //当前页码
                currentPage: 1,
                //分页总数量
                totalCount: 10,
                //开始时间控制区
                pickerOptions0: {},
                //结束时间控制区
                pickerOptions1: {},
                //开始时间
                starttime: '',
                //结束时间
                endtime: '',
                pageNo:1,
                AddObj1:{},
                AddObj2:{},
                EventSourceVal:'',
                EventSources:[
                    {Code:'', Name:'全部'}
                ],
                EventTypeVal:'',
                EventTypes:[
                    {Code:'', Name:'全部'}
                ],
            }
        },
        created() {

        },
        mounted() {
            //
            const _this = this;
            _this.GetCaseNum();
            _this.GetCaseType();
            _this.GetCaseDate();
            _this.GetSlecetList();
        },
        methods: {
            //选择责任主体
            AddSelectName1(val){
                this.AddObj1 = {};
                this.AddObj1 = this.EventSources.find((item)=>{if (val === item.Code) {return item;}});
                this.GetCaseDate()
            },
            //选择网格占比
            AddSelectName2(val){
                this.AddObj2 = {};
                this.AddObj2 = this.EventTypes.find((item)=>{if (val === item.Code) {return item;}});
                this.GetCaseDate()
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
            //获取下拉列表
            GetSlecetList(){
                const _this = this;
                //获取所有责任主体
                api.GetCaseAll().then(result=>{
                    console.log(result.data.data);
                    _this.EventSources = result.data.data.map(v=>{
                        return{
                            Code:v.id,
                            Name:v.name
                        }
                    })

                });
                //查询所有网格信息
                api.GetIGyGridinfo().then(result=>{
                    console.log(result.data.data);
                    _this.EventTypes = result.data.data.map(v=>{
                        return{
                            Code:v.id,
                            Name:v.name
                        }
                    })
                });
            },
            //排序
            compare(propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName]
                    let value2 = object2[propertyName]
                    return value2 - value1
                }
            },
            //案件列表
            GetCaseDate(){
            	const _this = this;
                let type = '';
                let companyName = '';
                let gridName = '';
                let gridid = _this.AddObj2.Code || '';
                let responsibilityid = _this.AddObj1.Code || '';
                let startTime = _this.starttime ? _this.starttime : '';
                let endTime = _this.endtime ? _this.endtime : '';
                //
	            api.GetCompanysList(companyName,gridid,gridName,responsibilityid,startTime,endTime,type).then(res =>{
                    _this.InitializationDataMethod(res.data.data);
                });
            },
            //责任主体占比
            GetCaseNum(){
            	const _this = this;
            	let companyType = '';
            	let startTime = this.starttime?this.starttime:'';
                let endTime = this.endtime?this.endtime:'';
            	api.SupResponsibilityRatio(companyType, startTime, endTime).then(res=>{
            		console.log(res);
            		let data = res.data.data;
            		_this.NumberCasesChars(data);
            	})
            },
            //网格员占比
            GetCaseType(){
                const _this = this;
            	let companyType = '';
            	let startTime = this.starttime?this.starttime:'';
                let endTime = this.endtime?this.endtime:'';
            	api.SuperviseCaseGridRatio(companyType,startTime,endTime).then(res=>{
            		console.log(res);
            		let data = res.data.data;
                    _this.TypeCasesChars(data);
            	})
            },
            //初数据始化列表
            InitializationDataMethod(data) {
                const _this = this;
                _this.tableData = [];
                data.forEach(item => {
                    const tableData = {};
                    tableData.responsibilityName = item.responsibilityName;//
                    tableData.name = item.name;//
                    tableData.gridName = item.gridName;//
                    tableData.latitude = item.latitude;//纬度
                    tableData.longitude = item.longitude;//经度
                    tableData.id = item.id;//
                    tableData.sunnum = item.sunnum;
                    _this.tableData.push(tableData);
                })

            },
            //table点击事件
            RowCurrentChange(val) {
                // this.currentRow = val;
                // console.log(val)
                // //地图联动
                bus.$emit('locationClick', 'layer_qm', this.currentRow ,this.type);
            },

            //查询事件
            btnClickEvent() {
                const _this = this;
                _this.GetCaseDate();
            },
            //责任主体占比
            NumberCasesChars(data){
                // console.log(data);
                let showData = data.map(function (v) {
                    return {value: v.casenum, name: v.name}
                }) || [];
                let lenData = data.map(function (v) {
                    return {name: v.name}
                }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item_1p'));
                // 指定图表的配置项和数据
                let option = {

                    legend: {
                        orient: 'right',
                        y:'center',
                        left:160,
                        //data: ['广阳区','安次区','开发区']
                        data:lenData
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '责任主体占比',
                            type: 'pie',
                            radius: '70%',
                            center: ['20%', '50%'],
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data: [
                                    {value: 335, name: '开发区'},
                                    {value: 310, name: '广阳区'},
                                    {value: 234, name: '安次区'}
                                ]
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
                    series: [{
                       data: showData,
                        color: [
                            '#08a1ed',
                            '#a2c73b',
                            '#f2cd49',
                            '#85dbce',
                            '#ce93e3',
                            '#6c68e1',
                            '#e5763f'
                        ]
                    }]
                })
            },
            //网格员占比
            TypeCasesChars(data){
                let showData = data.map(function (v) {
                    return {value: v.casenum, name: v.name}
                }) || [];
                let lenData = data.map(function (v) {
                    return {name: v.name}
                }) || [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bing_item_2p'));
                // 指定图表的配置项和数据
                let option = {

                    legend: {
                        type: 'scroll',
                        left: 170,
                        orient: 'vertical',
                        top:10,
                        right:30,
                        bottom:0,
                        //data: ['垃圾堆放','土壤裸露','露天烧烤','垃圾焚烧','餐饮油烟','建筑扬尘','废气排放','汽车尾气']
                        data:lenData
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '网格占比',
                            type: 'pie',
                            radius: '70%',
                            center: ['20%', '50%'],
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            data: [
                                // {value: 335, name: '垃圾堆放'},
                                // {value: 310, name: '土壤裸露'},
                                // {value: 234, name: '露天烧烤'},
                                // {value: 135, name: '垃圾焚烧'},
                                // {value: 548, name: '餐饮油烟'},
                                // {value: 500, name: '建筑扬尘'},
                                // {value: 500, name: '废气排放'},
                                // {value: 300, name: '汽车尾气'}
                            ],

                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                //动态设置参数
                myChart.setOption({
                    series: [{
                       data: showData,
                        color: [
                            '#08a1ed',
                            '#a2c73b',
                            '#f2cd49',
                            '#85dbce',
                            '#ce93e3',
                            '#6c68e1',
                            '#e5763f'
                        ]
                    }]
                })
                //触动当前方法
                // myChart.on('legendselectchanged', function(obj) {
                //     let selected = obj.selected;
                //     let legend = obj.name;
                //     if(selected[legend] == false){
                //         console.log(legend);
                //     }
                // });
            },
            //
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .CaseSupervision {
        width: 430px;
        height: auto;
        .search{
            margin-left: 20px;
            text-align: left;
            margin-bottom: 24px;
            .searchBox{
                display: inline-block;
                margin-right: 20px;
            }
            .block{
                display: inline-block;
                width: 100%;
                .el-select{
                    margin-right: 30px;
                    margin-left: 10px;
                }
                .el-date-editor{
                    width: 514px;
                    margin-left: 10px;
                    margin-right: 20px;
                }
                .el-input{
                    margin-left: 10px;
                }
            }
            .btns{
                margin-left: 30px;
            }
        }
        .title-daqi{
            width: 100%;
            height: 36px;
            .shuxian{
                width: 3px;
                height: 24px;
                background: #1FA1FF;
                float: left;
                margin-left: 10px;
            }
            .title-text{
                float: left;
                font-weight: bold;
                line-height: 24px;
                padding-left: 10px;
                text-align: left;
            }
        }
        img {
            position: absolute;
            top: 40%;
            left: -17px;
            cursor: pointer;
            float: left;
        }
        .main {
            height: auto;
            .pan-anniu{
                width: 100%;
                height: 40px;
                text-align: right;
                padding: 10px 20px;
            }
            .kbiaoti {
                padding: 10px 0px;
            }

            .bluexian {
                width: 26px;
                border: 1px solid #1080cc;
                margin: 0 auto;
            }

            .first {
                width: 100%;
                height: 44px;
                margin-top: 30px;

                .tables {
                    float: left;
                    margin-left: 14px;

                    a {
                        padding: 0 15px;
                        float: left;
                        text-decoration: none;
                        color: #666;
                        display: inline-block;
                        line-height: 34px;
                        width: 100px;
                        height: 34px;
                        margin-right: 16px;
                        border: solid 1px #ccc;
                        background: #fff;
                        border-radius: 2px;
                    }

                }
                .shijian {
                    float: left;
                    margin-left: 10px;
                   // margin-right: 20px;
                    .block{
                        width: 150px;
                        float: left;
                    }
                }

                .btnns {
                    float: left;
                    margin-left: 6px;

                    button {
                        border: none;
                        width: 80px;
                        height: 34px;
                        background: #1FA1FF;
                        color: #fff;
                        border-radius: 4px;
                    }

                }
            }
            .tqbiaoti {
                width: 100%;
                height: 22px;
                padding-left: 20px;
                text-align: left;
                margin-left: 16px;
                border-left: solid 3px #2a6496;
            }

            .table_container {
                margin-left: 6px;
            }

        }
    }
</style>
