<template>
    <div class="Warn" id="Warn">
		<div class="num-z-top">
	        <div class="title">
	            <span class="line"></span> 时间选择 
	        </div>
	        <div class="tab">
	            <el-tabs v-model="activeTab" @tab-click="handleClick">
	                <el-tab-pane label="日报" name="first" v-model="controlData">
	                    <div class="everyday">
	                        <div class="left">
	                            <ul class="row">
	                                <li>参数</li>
	                                <li>PM2.5</li>
	                                <li>PM10</li>
	                                <li>S02</li>
	                                <li>NO2</li>
	                                <li>CO</li>
	                                <li>O3</li>
	                            </ul>
	                            <ul class="row">
	                                <li>广阳区</li>
	                                <li v-if="controlData.pm25Ljz">{{controlData.pm25Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm10Ljz">{{controlData.pm10Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.so2Ljz">{{controlData.so2Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.no2Ljz">{{controlData.no2Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.coLjz">{{controlData.coLjz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.o3Ljz">{{controlData.o3Ljz}}</li>
	                                <li v-else>--</li>
	                            </ul>
	                            <ul class="row" id="borderRow">
	                                <li>剩余每小时控制值</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.pm25Kzz>0?'green':'red'">{{controlData.pm25Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.pm10Kzz>0?'green':'red'">{{controlData.pm10Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.so2Kzz>0?'green':'red'">{{controlData.so2Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.no2Kzz>0?'green':'red'">{{controlData.no2Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.coKzz" :class="controlData.coKzz>0?'green':'red'">{{controlData.coKzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.o3Kzz" :class="controlData.o3Kzz>0?'green':'red'">{{controlData.o3Kzz}}</li>
	                                <li v-else>--</li>
	                            </ul>
	                            <div class="title" style="">
	                                <span class="line"></span> 竞争区县 &nbsp;
	                                <el-select v-model="cityCode" placeholder="请选择" @change="selCompareCity">
	                                    <el-option
	                                        size="mini"
	                                        v-for="item in citysData"
	                                        :key="item.citycode"
	                                        :label="item.area"
	                                        :value="item.citycode">
	                                    </el-option>
	                                </el-select> 
	                            </div>
	                            <div v-model="cityControlData">
	                                <ul class="row">
	                                    <li>剩余每小时控制值</li>
	                                    <li v-if="cityControlData.pm25Kzz" :class="cityControlData.pm25Kzz>0?'green':'red'">{{cityControlData.pm25Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.pm10Kzz" :class="cityControlData.pm10Kzz>0?'green':'red'">{{cityControlData.pm10Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.so2Kzz" :class="cityControlData.so2Kzz>0?'green':'red'">{{cityControlData.so2Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.no2Kzz" :class="cityControlData.no2Kzz>0?'green':'red'">{{cityControlData.no2Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.coKzz" :class="cityControlData.coKzz>0?'green':'red'">{{cityControlData.coKzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.o3Kzz" :class="cityControlData.o3Kzz>0?'green':'red'">{{cityControlData.o3Kzz}}</li>
	                                    <li v-else>--</li>
	                                </ul>
	                                <ul class="row">
	                                    <li>每小时比竞争城市需低</li>
	                                    <li v-if="cityControlData.pm25Kzz" >{{(controlData.pm25Kzz-cityControlData.pm25Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.pm10Kzz" >{{(controlData.pm10Kzz-cityControlData.pm10Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.so2Kzz"> {{(controlData.so2Kzz-cityControlData.so2Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.no2Kzz" >{{(controlData.no2Kzz-cityControlData.no2Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.coKzz"> {{(controlData.coKzz-cityControlData.coKzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.o3Kzz">{{(controlData.o3Kzz-cityControlData.o3Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                </ul>
	                            </div>  
	                        </div>
	                        <div class="right">
	                            <div class="squares">
	                                <div>截止时间：</div>
	                                <div>{{timeData.time}}</div>
	                            </div>
	                            <div class="squares">
	                                <div>累积AQI：</div>
	                                <div>{{timeData.aqi}}</div>
	                            </div>
	                            <div class="squares" v-if="timeData.mainpoll">
	                                <div>首要污染物：</div>
	                                <div>{{timeData.mainpoll}}</div>
	                            </div>
	                        </div>
	                    </div>
	                </el-tab-pane>
	                <el-tab-pane label="月报" name="second">
	                    <div class="everyday">
	                        <div class="left">
	                            <ul class="row">
	                                <li>参数</li>
	                                <li>PM2.5</li>
	                                <li>PM10</li>
	                                <li>S02</li>
	                                <li>NO2</li>
	                                <li>CO</li>
	                                <li>O3</li>
	                            </ul>
	                            <ul class="row">
	                                <li>广阳区</li>
	                                <li v-if="controlData.pm25Ljz">{{controlData.pm25Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm10Ljz">{{controlData.pm10Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.so2Ljz">{{controlData.so2Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.no2Ljz">{{controlData.no2Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.coLjz">{{controlData.coLjz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.o3Ljz">{{controlData.o3Ljz}}</li>
	                                <li v-else>--</li>
	                            </ul>
	                            <ul class="row" id="borderRow">
	                                <li>剩余每小时控制值</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.pm25Kzz>0?'green':'red'">{{controlData.pm25Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.pm10Kzz>0?'green':'red'">{{controlData.pm10Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.so2Kzz>0?'green':'red'">{{controlData.so2Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.no2Kzz>0?'green':'red'">{{controlData.no2Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.coKzz" :class="controlData.coKzz>0?'green':'red'">{{controlData.coKzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.o3Kzz" :class="controlData.o3Kzz>0?'green':'red'">{{controlData.o3Kzz}}</li>
	                                <li v-else>--</li>
	                            </ul>
	                            <div class="title" style="">
	                                <span class="line"></span> 竞争区县 &nbsp;
	                                <el-select v-model="cityCode" placeholder="请选择" @change="selCompareCity">
	                                    <el-option
	                                        size="mini"
	                                        v-for="item in citysData"
	                                        :key="item.citycode"
	                                        :label="item.area"
	                                        :value="item.citycode">
	                                    </el-option>
	                                </el-select> 
	                            </div>
	                            <div v-model="cityControlData">
	                                <ul class="row">
	                                    <li>剩余每小时控制值</li>
	                                    <li v-if="cityControlData.pm25Kzz" :class="cityControlData.pm25Kzz>0?'green':'red'">{{cityControlData.pm25Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.pm10Kzz" :class="cityControlData.pm10Kzz>0?'green':'red'">{{cityControlData.pm10Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.so2Kzz" :class="cityControlData.so2Kzz>0?'green':'red'">{{cityControlData.so2Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.no2Kzz" :class="cityControlData.no2Kzz>0?'green':'red'">{{cityControlData.no2Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.coKzz" :class="cityControlData.coKzz>0?'green':'red'">{{cityControlData.coKzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.o3Kzz" :class="cityControlData.o3Kzz>0?'green':'red'">{{cityControlData.o3Kzz}}</li>
	                                    <li v-else>--</li>
	                                </ul>
	                                <ul class="row">
	                                    <li>每小时比竞争城市需低</li>
	                                    <li v-if="cityControlData.pm25Kzz" >{{(controlData.pm25Kzz-cityControlData.pm25Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.pm10Kzz" >{{(controlData.pm10Kzz-cityControlData.pm10Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.so2Kzz"> {{(controlData.so2Kzz-cityControlData.so2Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.no2Kzz" >{{(controlData.no2Kzz-cityControlData.no2Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.coKzz"> {{(controlData.coKzz-cityControlData.coKzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.o3Kzz">{{(controlData.o3Kzz-cityControlData.o3Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                </ul>
	                            </div>  
	                        </div>
	                        <div class="right">
	                            <div class="squares">
	                                <div>截止时间：</div>
	                                <div>{{timeData.time}}</div>
	                            </div>
	                            <div class="squares">
	                                <div>累积AQI：</div>
	                                <div>{{timeData.aqi}}</div>
	                            </div>
	                            <div class="squares" v-if="timeData.mainpoll">
	                                <div>首要污染物：</div>
	                                <div>{{timeData.mainpoll}}</div>
	                            </div>
	                        </div>
	                    </div>
	                </el-tab-pane>
	                <el-tab-pane label="年报" name="third">
	                    <div class="everyday">
	                        <div class="left">
	                            <ul class="row">
	                                <li>参数</li>
	                                <li>PM2.5</li>
	                                <li>PM10</li>
	                                <li>S02</li>
	                                <li>NO2</li>
	                                <li>CO</li>
	                                <li>O3</li>
	                            </ul>
	                            <ul class="row">
	                                <li>广阳区</li>
	                                <li v-if="controlData.pm25Ljz">{{controlData.pm25Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm10Ljz">{{controlData.pm10Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.so2Ljz">{{controlData.so2Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.no2Ljz">{{controlData.no2Ljz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.coLjz">{{controlData.coLjz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.o3Ljz">{{controlData.o3Ljz}}</li>
	                                <li v-else>--</li>
	                            </ul>
	                            <ul class="row" id="borderRow">
	                                <li>剩余每小时控制值</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.pm25Kzz>0?'green':'red'">{{controlData.pm25Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.pm10Kzz>0?'green':'red'">{{controlData.pm10Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.so2Kzz>0?'green':'red'">{{controlData.so2Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.pm25Kzz" :class="controlData.no2Kzz>0?'green':'red'">{{controlData.no2Kzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.coKzz" :class="controlData.coKzz>0?'green':'red'">{{controlData.coKzz}}</li>
	                                <li v-else>--</li>
	                                <li v-if="controlData.o3Kzz" :class="controlData.o3Kzz>0?'green':'red'">{{controlData.o3Kzz}}</li>
	                                <li v-else>--</li>
	                            </ul>
	                            <div class="title" style="">
	                                <span class="line"></span> 竞争区县 &nbsp;
	                                <el-select v-model="cityCode" placeholder="请选择" @change="selCompareCity">
	                                    <el-option
	                                        size="mini"
	                                        v-for="item in citysData"
	                                        :key="item.citycode"
	                                        :label="item.area"
	                                        :value="item.citycode">
	                                    </el-option>
	                                </el-select> 
	                            </div>
	                            <div v-model="cityControlData">
	                                <ul class="row">
	                                    <li>剩余每小时控制值</li>
	                                    <li v-if="cityControlData.pm25Kzz" :class="cityControlData.pm25Kzz>0?'green':'red'">{{cityControlData.pm25Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.pm10Kzz" :class="cityControlData.pm10Kzz>0?'green':'red'">{{cityControlData.pm10Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.so2Kzz" :class="cityControlData.so2Kzz>0?'green':'red'">{{cityControlData.so2Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.no2Kzz" :class="cityControlData.no2Kzz>0?'green':'red'">{{cityControlData.no2Kzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.coKzz" :class="cityControlData.coKzz>0?'green':'red'">{{cityControlData.coKzz}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.o3Kzz" :class="cityControlData.o3Kzz>0?'green':'red'">{{cityControlData.o3Kzz}}</li>
	                                    <li v-else>--</li>
	                                </ul>
	                                <ul class="row">
	                                    <li>每小时比竞争城市需低</li>
	                                    <li v-if="cityControlData.pm25Kzz" >{{(controlData.pm25Kzz-cityControlData.pm25Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.pm10Kzz" >{{(controlData.pm10Kzz-cityControlData.pm10Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.so2Kzz"> {{(controlData.so2Kzz-cityControlData.so2Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.no2Kzz" >{{(controlData.no2Kzz-cityControlData.no2Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li  v-if="cityControlData.coKzz"> {{(controlData.coKzz-cityControlData.coKzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                    <li v-if="cityControlData.o3Kzz">{{(controlData.o3Kzz-cityControlData.o3Kzz).toFixed(2)}}</li>
	                                    <li v-else>--</li>
	                                </ul>
	                            </div>  
	                        </div>
	                        <div class="right">
	                            <div class="squares">
	                                <div>截止时间：</div>
	                                <div>{{timeData.time}}</div>
	                            </div>
	                            <div class="squares">
	                                <div>累积AQI：</div>
	                                <div>{{timeData.aqi}}</div>
	                            </div>
	                            <div class="squares" v-if="timeData.mainpoll">
	                                <div>首要污染物：</div>
	                                <div>{{timeData.mainpoll}}</div>
	                            </div>
	                        </div>
	                    </div>
	                </el-tab-pane>
	            </el-tabs>
	        </div>
        </div>
    </div>
</template>

<script>

    import api from '../../api/index'
    export default {
        name: "controlValue",
        data() {
            return {
                activeTab: "first",
                citysData: [],
                timeType: 0, // 默认日报
                cityCode: '',
                controlData:{},
                cityControlData: {},
                timeData:{}
            }
        },
        mounted() {
            this.getControlData();
            this.getCitysData();
            this.getTimeData();
        },
        methods: {
            handleClick(tab, event) {
                this.timeType = tab.index;
                this.getControlData();
                this.cityCode = '';
                this.cityControlData ={};
            },
            selCompareCity(val){
                this.cityCode = val;
                this.getCityCompareData();
            },
            getControlData() {
                let that = this;
                let type = that.timeType;
                try {
	                api.GetGuangyangControllValueResource(type).then(res=>{
	                 	console.log(res);
	                 	if(res.data.status === 1){
	                    	let listData = res.data.data;
	                    	that.controlData = listData;
	                  	}
	                })
	            } catch (error) {
	                console.log(error);
	            }
                
            },
            async getTimeData() {
                let that = this;
                try {
                    api.GetGuangyangCityListTimeDataResource().then(res=>{
	                 	console.log(res);
	                 	if(res.data.status === 1){
	                    	let listData = res.data.data;
	                    	that.timeData = listData;
	                  	}
	                })
                } catch (error) {
                    console.log(error);
                }
            },
            
            getCityCompareData() {
                let that = this;
                try {
                    api.GetGuangyangCompareKzhResource(that.timeType,that.cityCode).then(res=>{
	                 	console.log(res);
	                 	if(res.data.status === 1){
	                    	let listData = res.data.data;
	                    	that.cityControlData = listData;
	                  	}
	                })
                } catch (error) {
                    console.log(error);
                }
            },

            getCitysData() {
                let that = this;
                try {
	                api.GetLFGuangyangCityListResource().then(res=>{
	                 	console.log('444',res);
	                 	if(res.data.status === 1){
	                    	let listData = res.data.data;
	                    	that.citysData = listData;
	                  	}
	                })
	            } catch (error) {
	                console.log(error);
	            } 
            }
        },
    }
</script>
<style >
	#Warn  .el-tabs__nav-scroll{background: none !important;}
	#Warn .el-tabs__header{
		width: 165px;
		margin-bottom: 30px !important;
	}
	#Warn .el-input--suffix .el-input__inner {width: 180px;}
	/*.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background-color:#1B2143;
        color:#12DA88;
        border-left: 1px #12DA88 solid;
    }
    .el-select-dropdown__item.selected{
        color: #12DA88
    }
    .el-select-dropdown{
        border: 1px #12D887 solid;
        background-color: #1B2143;
    }*/
</style>
<style lang="scss" scoped="scoped">

    .Warn{
        width: calc(100% - 116px);
        height: calc(100% - 86px);
        background: url('../../../static/imgs/kongzhi/controlValue.png') no-repeat;
        overflow-y: auto;
        background-size: 100% 100%;
        color: #0A0F2A;
        .num-z-top{
            width: 95%;
            height: 460px;
            margin: 0 auto;
            .title {
                text-align: left;
                margin-top: 20px;
                height: 36px;
                font-size: 16px;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                color: #1B2143;
                line-height: 36px;
                text-shadow: 0px 2px 2px rgba(27, 33, 67, 0.4);
                span.line {
                    display: inline-block;
                    width: 4px;
                    height: 15px;
                    background: #1B2143;
                    box-shadow: 0px 2px 2px 0px rgba(27, 33, 67, 0.4);
                    margin-right: 8px;
                }
            }
            .tab {
                margin-top: 19px;
                .el-tabs__header{
						width: 165px;
                }
                .everyday {
                    display: flex;
                    align-items: flex-start;
                    
                    .title{
                        display: block;
                        min-height: 50px;
                        margin-bottom: 20px;
                        .el-select{
                        	width: 180px;
                        }
                    }
                    .left {
                        .green{
                            box-sizing: border-box;
                            border: 3px solid #12DA88;
                            line-height: 42px;
                        }
                        .red{
                            box-sizing: border-box;
                            border: 3px solid #FF4242;
                        }
                        .row {
                        	list-style: none;
                            margin-top: 29px;
                            margin-bottom: 13px;
                            font-size: 14px;
                            display: flex;
                            font-weight: bold;
                            height: 70px;
                            
                            li {
                                margin-right: 40px;
                                width: 110px;
                                color: #FFFFFF;
                                background: #1B2143;
                                height: 48px;
                                line-height: 48px;
                            }
                            li:nth-child(1) {
                                text-align: left;
                                width: 180px;
                                padding-left: 20px;
                                color: #12DA88;
                                box-shadow: 0px 0px 18px 0px rgba(27, 33, 67, 0.4);
                            }
                            input {
                                text-align: center;
                                width: 90px;
                                background-color: #1B2143;
                                color: white;
                                font-size: 14px;
                                border: none;
                            }
                        }
                    }
                    .right {
                        margin-top: 29px;
                        text-align: left;
                        .squares {
                            margin-bottom: 30px;
                            font-size: 16px;
                            color: #1B2143;
                            white-space: nowrap;
                            div:nth-child(1) {
                                margin-bottom: 14px;
                                font-weight: bold;
                                text-shadow: 0px 2px 2px rgba(27, 33, 67, 0.4);
                            }
                        }
                    }
                }
            }	
        }
       
    }
    
</style>
