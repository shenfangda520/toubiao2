<template>
    <div class="TodayData">
        <!--今日数据-->
        <v-header></v-header>
        <div class="warp3">
            <div class="chaxuntiaojian">
                <div class="float001">
                    <el-radio-group v-model="SelectVal" @change='GetHourData'>
                        <el-radio-button label="小时"></el-radio-button>
                        <el-radio-button label="当日累计"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="float002">
                    <div class="day01" v-show="SelectVal=='小时'">
                    	<span class="demonstration">选择时间</span>
                        <el-date-picker
                            v-model="timevalue"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </div>
                <div class="float003">
                    <el-button type="primary" @click='GetHourData' v-show="SelectVal=='小时'">查询</el-button>
                    <el-button type="primary" @click='ExportCountyHourRank'>导出</el-button>
                </div>
            </div>
            <div class="kass">
                <div class="wbiaoti"></div>
            </div>
	        <!--表格-->
	        <div class="xuanxiantable">
	            <el-table
	                    :data="statePageData"
	                    border
	                    ref="singleTable"
	                    @sort-change='StatesortChange'
	                    style="width: 100%">
	                <el-table-column
	                        prop="Ranking"
	                        label="排名"
	                        width="160">
	                </el-table-column>
	                <el-table-column
	                        prop="countyName"
	                        label="名称">
	                </el-table-column>
	                <el-table-column
	                        prop="PM25"
	                        label="PM2.5"
	                        column>
	                </el-table-column>
	                <el-table-column
	                        prop="PM10"
	                        label="PM10">
	                </el-table-column>
	                <el-table-column
	                        prop="SO2"
	                        label="SO2">
	                </el-table-column>
	                <el-table-column
	                        prop="NO2"
	                        label="NO2">
	                </el-table-column>
	                <el-table-column
	                        prop="CO"
	                        label="CO">
	                </el-table-column>
	                <el-table-column
	                        prop="O3"
	                        label="O3">
	                </el-table-column>
	                <el-table-column
	                        prop="Com_Index"
	                        label="综合指数">
	                </el-table-column>
	                <el-table-column
	                        prop="aqi"
	                        label="AQI">
	                </el-table-column>
	                <el-table-column
	                        prop="quality"
	                        label="等级">
	                </el-table-column>
	                <el-table-column
	                        prop="primaryPollution"
	                        label="首要污染物">
	                </el-table-column>
	            </el-table>
	            <!--分页-->
	            <div class="block">
	                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChangeState"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        layout="total, prev, pager, next, jumper"
                        :total="totalCountState">
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
        name: 'TodayData',
        data() {
            return {
                //每页数量
                pagesize: 10,
                page:1,
                //当前页
                currentPage: 1,
              pageindex:1,
                //数据量/分页
                totalCountState: 100,
                pickerOptions0: {},
		        //今日数据
		        SelectVal:'小时',//选择
		        timevalue:'',
		        tableStateData:[],
		        deadStateData:[],
		        statePageData:[]
            }
        },
        created() {
            this.GetHourData();
        },
        mounted() {
        	
        },
        methods: {
        	//小时数据
        	GetHourData(){
        		let t = this;
        		this.currentPage = 1;
        		let time = this.timevalue||'';
        		if(this.SelectVal=='小时'){
        			t.statePageData = [];
              let pageindex = this.pageindex;
        			api.GetCountyHourRank(time,pageindex).then(res=>{
	        			console.log(res)
	        			let allData = res.data.Data.Data;
	        			if(allData){
	        				this.totalCountState = res.data.Data.TotlePageNum;
			                allData.sort(this.compare('aqi'));
			                this.deadStateData = allData.map((v,i)=>{
			                	v['Ranking']=i+1;
			                	v['countyName']=v.gridname;
			                	v['Com_Index']=v.Com_Index;
			                	v['PM25']=v.pm25;
			                	v['SO2']=v.so2;
			                	v['PM10']=v.pm10;
			                	v['NO2']=v.no2;
			                	v['CO']=v.co;
			                	v['aqi']=v.aqi;
			                	v['O3']=v.o3;
			                	v['primaryPollution']=v.mainpoll;
			                	return v});
			                let i = 1;
			                allData.forEach(item => {
			                    let tableData = {};//数据
			                    tableData.Ranking = item.Ranking;//排名
			                    tableData.countyName = item.gridname||'--';//名称
			                    tableData.Com_Index = item.ComplexIndex||'--';//综合指数
			                    tableData.quality = item.quality||'--';//综合指数
			                    tableData.PM25 = item.PM25||'--';//Pm25
			                    tableData.SO2 = item.SO2||'--';//SO2
			                    tableData.PM10 = item.PM10||'--';//PM10
			                    tableData.NO2 = item.NO2||'--';//NO2
			                    tableData.CO = item.CO||'--';//CO
			                    tableData.O3 = item.O3||'--';//O3
			                    tableData.aqi = item.aqi||'--';//CO
			                     tableData.primaryPollution = item.mainpoll||'--';//CO
			                    t.statePageData.push(tableData);
			                })
			                // this.setStatePageTable(10, 1);
                  t.pageindex = 1;
	        			}
        			})
        		}else if(this.SelectVal=='当日累计'){
        			t.statePageData = [];
              let pageindex = this.pageindex;
        			api.GetCountyHourAccuRank(time,pageindex).then(res=>{
	        			console.log(res)
                let allData = res.data.Data.Data;
	        			if(allData){
                  this.totalCountState = res.data.Data.TotlePageNum;
			                allData.sort(this.compare('aqi'));
			                this.deadStateData = allData.map((v,i)=>{
			                	v['Ranking']=i+1;
			                	v['Name']=v.Name;
			                	v['Com_Index']=v.Com_Index;
			                	v['PM25']=v.pm25;
			                	v['SO2']=v.so2;
			                	v['PM10']=v.pm10;
			                	v['NO2']=v.no2;
			                	v['CO']=v.co;
			                	v['aqi']=v.aqi;
			                	v['O3']=v.o3;
			                	return v});
			                let i = 1;
			                allData.forEach(item => {
			                    let tableData = {};//数据
			                    tableData.Ranking = item.Ranking||'--';//排名
			                    tableData.countyName = item.gridname||'--';//名称
			                    tableData.Com_Index = item.ComplexIndex||'--';//综合指数
                          tableData.quality = item.quality||'--';//综合指数
			                    tableData.PM25 = item.PM25||'--';//Pm25
			                    tableData.SO2 = item.SO2||'--';//SO2
			                    tableData.PM10 = item.PM10||'--';//PM10
			                    tableData.NO2 = item.NO2||'--';//NO2
			                    tableData.CO = item.CO||'--';//CO
			                    tableData.O3 = item.O3||'--';//O3
			                    tableData.aqi = item.aqi||'--';//CO
			                     tableData.primaryPollution = item.mainpoll||'--';//CO
			                    t.statePageData.push(tableData);
			                })
			                this.setStatePageTable(10, 1);
	        			}
	        		})
        		}
        		
        	},
        	//导出
        	ExportCountyHourRank(){
        		let type;
        		switch (this.SelectVal){
        			case '小时':
        				type = '0';
        				break;
        			case '当日累计':
        				type = '1';
        				break;
        			default:
        				break;
        		};
            let time = this.timevalue;
            console.log(time);
            console.log(type);
        		api.ExportCountyHourRank(time,type);
        	},
          	//排序
            compare(propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName];
                    let value2 = object2[propertyName];
                    return value2 - value1
                }
            },
            //国控点排序
            StatesortChange(column, prop, order){
            	if(column.prop=='Com_Index'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData2 ] = this.deadStateData;
						this.statePageData=deadStateData2.sort(this.compare('Com_Index'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData3 ] = this.deadStateData;
						this.statePageData=deadStateData3.sort(this.compare('Com_Index')).reverse();
//						console.log(this.CityData);
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='O3'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData4 ] = this.deadStateData;
						this.statePageData=deadStateData4.sort(this.compare('O3'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData5 ] = this.deadStateData;
						this.statePageData=deadStateData5.sort(this.compare('O3')).reverse();
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='CO'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData6 ] = this.deadStateData;
						this.statePageData=deadStateData6.sort(this.compare('CO'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData7 ] = this.deadStateData;
						this.statePageData=deadStateData7.sort(this.compare('CO')).reverse();
//						console.log(this.CityData);
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='NO2'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData8 ] = this.deadStateData;
						this.statePageData=deadStateData8.sort(this.compare('NO2'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData9 ] = this.deadStateData;
						this.statePageData=deadStateData9.sort(this.compare('NO2')).reverse();
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='SO2'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData10 ] = this.deadStateData;
						this.statePageData=deadStateData10.sort(this.compare('SO2'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData11 ] = this.deadStateData;
						this.statePageData=deadStateData11.sort(this.compare('SO2')).reverse();
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='PM10'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData12 ] = this.deadStateData;
						this.statePageData=deadStateData12.sort(this.compare('PM10'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData13 ] = this.deadStateData;
						this.statePageData=deadStateData13.sort(this.compare('PM10')).reverse();
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='PM25'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData14 ] = this.deadStateData;
						this.statePageData=deadStateData14.sort(this.compare('PM25'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData15 ] = this.deadStateData;
						this.statePageData=deadStateData15.sort(this.compare('PM25')).reverse();
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
        		if(column.prop=='aqi'){
        			//倒序
	        		if(column.order=='descending'){
	        			var [ ...deadStateData16 ] = this.deadStateData;
						this.statePageData=deadStateData16.sort(this.compare('aqi'));
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}
               		//正序
	        		if(column.order=='ascending'){
	        			var [ ...deadStateData17 ] = this.deadStateData;
						this.statePageData=deadStateData17.sort(this.compare('aqi')).reverse();
						this.statePageData.map((v,i)=>{
		                	v['Ranking']=i+1;
		                	return v
						})
	        		}	
        			this.setStatePageTable(10, this.page);
        		}
            },
            //每页显示数据量变更
            handleSizeChange(val) {
            },
            //国控点点击页码换页
            handleCurrentChangeState(val) {
            	this.pageindex = val;
            	this.GetHourData();
            },
            setStatePageTable(pageSize, pageNum) {
                let i = 1;
                let rtValue = [];
                let startNum = pageSize * (pageNum - 1);
                for (let i = 0; i < pageSize; i++) {
                    if ((startNum + i + 1) > this.statePageData.length)
                        break;
                    rtValue.push(this.statePageData[startNum + i]);
                }
                this.tableStateData = rtValue;
            },
        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .TodayData {
        width: 100%;
        height: 100%;
        //title标题
        .warp3 {
			width: 100%;
			padding:0 3%;
			height: calc(100% - 64px);
			overflow-y:auto;
			overflow-x: hidden;
			margin: 0px auto;
			padding-top: 30px;
            .shituquxian{
                width: 100%;
                height: auto;
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
                    text-align: left;
                    border-bottom: solid 1px #ccc;
                    width: 100%;
                    height: 10px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    margin-left: 10px;
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
