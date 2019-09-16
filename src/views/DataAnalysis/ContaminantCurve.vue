<template>
    <div id="ContaminantCurve">
        <div class="timeChoose"><i></i>时间选择</div>

        <div class="inline">
            <el-date-picker
                v-model="dateVal"
                type="date"
                size="mini"
                @change="timeChangeData"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
        </div>

        <div class="chartBox">
            <div class="chars1" style="width: 75%;height: 96%;float: left" id="main-chaers-left">

            </div>
            <div class="chars2" style="width: 25%;height: 100%;float: left" id="main-chaers-right">

            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/index'
    export default {
        name: 'ContaminantCurve',
        props: [],
        data() {
            return {
                isChoose:1,
                isCustom:false,
                dateVal:'',
                timelist:[],
                customDateFrome:'',
                customDateTo:'',
                chartOptions:{},
                paramsData:[
                    {label:'综合指数'},
                    {label:'PM2.5'},
                    {label:'PM10'},
                    {label:'SO2'},
                    {label:'NO2'},
                    {label:'CO'},
                    {label:'O3'},
                ],
                isParams:0,
                name:'综合指数'
            }
        },
        computed: {},
        components: {},
        mounted() {
            this.GetChahersGraph();
        },
        methods: {
            timeClick(v,i){
                this.isChoose = i;
            },
            paramsClick(item,i){
                this.isParams = i;
                this.name = this.getChartName(i);
                this.chartOptions.yAxis.name = this.name;
            },
            //
            timeChangeData(){
                this.GetChahersGraph();
            },
            //获取现在时间
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            //
            GetChahersGraph(){
                let mmTime = this.dateVal|| this.getNowFormatDate();
                //时间戳
                api.GetCountySixHourResourcePersource(mmTime).then(res=>{
                    console.log(res.data.data)
                    let jsonFrom = res.data.data;
                        let timearr=[];
                        //aqi
                        let resjsonAQI={};resjsonAQI.name= 'AQI';resjsonAQI.smooth = true;resjsonAQI.type='line';resjsonAQI.stack='总量';resjsonAQI.data = [];
                        //
                        let resjsonCO={};resjsonCO.name= 'CO';resjsonCO.smooth = true;resjsonCO.type='line';resjsonCO.stack='总量';resjsonCO.data = [];
                        //
                        let resjsonINDX={};resjsonINDX.name= '综指';resjsonINDX.smooth = true;resjsonINDX.type='line';resjsonINDX.stack='总量';resjsonINDX.data = [];
                        //
                        let resjsonNO2={};resjsonNO2.name= 'NO2';resjsonNO2.smooth = true;resjsonNO2.type='line';resjsonNO2.stack='总量';resjsonNO2.data = [];
                        //
                        let resjsonO3={};resjsonO3.name= 'O3';resjsonO3.smooth = true;resjsonO3.type='line';resjsonO3.stack='总量';resjsonO3.data = [];
                        //
                        let resjsonPM10={};resjsonPM10.name= 'PM10';resjsonPM10.smooth = true;resjsonPM10.type='line';resjsonPM10.stack='总量';resjsonPM10.data = [];
                        //
                        let resjsonPM25={};resjsonPM25.name= 'PM2.5';resjsonPM25.smooth = true;resjsonPM25.type='line';resjsonPM25.stack='总量';resjsonPM25.data = [];
                        //
                        let resjsonSO2={};resjsonSO2.name= 'SO2';resjsonSO2.smooth = true;resjsonSO2.type='line';resjsonSO2.stack='总量';resjsonSO2.data = [];
                     for(var i=0,l=jsonFrom.length;i<l;i++){
                        let dataTmp=[];
                        for(var key in jsonFrom[i]){
                            if(key=='time'){
                                timearr[i] = jsonFrom[i][key];
                            }
                            if(key== 'aqi'){
                                resjsonAQI.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'co'){
                                resjsonCO.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'comIndex'){
                                resjsonINDX.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'no2'){
                                resjsonNO2.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'o3'){
                                resjsonO3.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'pm10'){
                                resjsonPM10.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'pm25'){
                                resjsonPM25.data[i]=jsonFrom[i][key];
                            }
                            if(key== 'so2'){
                                resjsonSO2.data[i]=jsonFrom[i][key];
                            }
                        }

                    }
                        // console.log(resjsonAQI);
                    this.timelist = timearr;
                    this.setCharsLeft([resjsonAQI,resjsonCO,resjsonSO2,resjsonNO2,resjsonO3,resjsonPM10,resjsonPM25,resjsonINDX])
                    // console.log(timearr);
                })
                //饼图
                api.GetGuangyangAirQualityBingResourcePersource(mmTime).then(res=>{
                    console.log(res.data.data)
                    let ListData = res.data.data;
                    this.setCharsRight(Object.keys(ListData).map((key, index)=>{
                            console.log(key, ListData[key])
                            return {
                                value:ListData[key],
                                name:this.futertext(key)
                            }

                        }
                    ))
                })

            },
            //过滤文字
            futertext(txt){
                let rtxt = '';
                switch (txt){
                    case 'qita':
                        rtxt = '其他';
                        break;
                    case 'yangchen':
                        rtxt = '扬尘';
                        break;
                    case 'shengwu':
                        rtxt = '生物质燃料';
                        break;
                    case 'qiche':
                        rtxt = '汽车尾气';
                        break;
                    case 'gongye':
                        rtxt = '工业工艺';
                        break;
                    case 'ranmei':
                        rtxt = '燃煤';
                        break;
                    case 'erci':
                        rtxt = '二次无机源';
                        break;
                }
                return rtxt
            },
            //
            setCharsLeft(dataarr){
                const _this = this;
                let daat = dataarr;
                let lengdata = dataarr.map(item=>{
                    return item.name;
                })
                let myChart = echarts.init(document.getElementById('main-chaers-left'));
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        textStyle: {
                            color: '#000'
                        },
                    },
                    // dataZoom: {
                    //     show: true,
                    //     realtime: true,
                    //     y: 36,
                    //     height: 20,
                    //     start: 20,
                    //     end: 80
                    // },
                    legend: {
                        //data: ['深州', '冀州', '桃城', '枣强', '武邑','武强','饶阳','安平','景县','故城','阜城','高新区','滨湖新区'],
                        data:lengdata,
                        itemWidth:30,
                        itemHeight:1,
                        textStyle:{
                            fontSize:12,
                            color:'#fff'
                        },
                        bottom:0
                    },
                    grid: {
                        left: '8%',
                        right: '0%',
                        bottom: '4%',
                        containLabel: true
                    },
                    toolbox: {
                        show:false,
                        feature: {
                            saveAsImage: {}
                        },
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:_this.timelist,
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                            },
                            interval: 0,
                            rotate: 35
                        }
                    },
                    yAxis: {
                        name:' ',
                        nameRotate:90,
                        nameTextStyle:{
                            color:'#12da88',
                            fontSize:14
                        },
                        nameGap:35,
                        nameLocation:'center',
                        type: 'value',
                        axisLine:{
                            show:false,
                            color:'#fff'
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',//坐标值得具体的颜色
                            }
                        },
                    },
                    series:daat
                    // series: [
                    //     {
                    //         name: '深州',
                    //         type: 'line',
                    //         stack: '总量',
                    //         data: [20, 32, 10, 14, 9, 20, 21,12, 13, 11, 14, 0, 23,12, 13, 11, 14, 9, 23,10, 12, 1, 14, 9],
                    //         smooth: true
                    //     },
                    //     {
                    //         name: '冀州',
                    //         type: 'line',
                    //         stack: '总量',
                    //         data: [22, 18, 11, 24, 20, 33, 3,20, 12, 11, 34, 9, 30, 10,20, 2, 11, 34, 20, 30, 10,20, 2, 19],
                    //         smooth: true
                    //     },
                    // ]
                };
                myChart.setOption(option);
            },
            //
            setCharsRight(val){
                let datavalue = val;
                let myChart = echarts.init(document.getElementById('main-chaers-right'));
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#ff0f01', '#ffaa1f', '#d20d40', '#9c0a4e', '#efdc31', '#33c633'],
                    series: [
                        {
                            name: '污染物',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '30%'],
                            data: datavalue,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                             labelLine:{
                                normal:{
                                    length:2,
                                },
                            },
                            label: {
                                normal: {
                                    textStyle: {
                                        fontSize : 8  // 改变标示文字的颜色
                                    }
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            },
            //
            getChartName(val){
                switch (val) {
                    case 1:
                        return 'PM2.5';
                        break;
                    case 2:
                        return 'PM10';
                        break;
                    case 3:
                        return 'SO2';
                        break;
                    case 4:
                        return 'NO2';
                        break;
                    case 5:
                        return 'CO';
                        break;
                    case 6:
                        return 'O3';
                        break;
                    default :
                        return '综合指数';
                        break;
                }
            }
        },
    }
</script>

<style lang="scss" scope>

    #ContaminantCurve {
        width: calc(100% - 116px);
        height:calc(100% - 86px);
        overflow-y: auto;
        box-sizing: border-box;
        padding: 30px;
        background-color: #141a38;
        float: left;
        text-align: left;
        .timeChoose{
            font-size:16px;
            font-family:MicrosoftYaHei-Bold;
            font-weight:bold;
            color:rgba(18,218,136,1);
            i{
                display: inline-block;
                font-style: normal;
                margin: -2px 8px;
                width:4px;
                height:15px;
                background:rgba(18,218,136,1);
            }
            span{
                font-size: 12px;
            }
        }
        .inline{
            margin-top: 20px;
            display: inline-block;
        }
        .chartBox{
            background:rgba(27,33,67,1);
            box-shadow:0px 1px 16px 2px rgba(27,33,67,0.8);
            margin-top: 20px;
            width: 100%;
            min-height: 380px;
            height: calc(100% - 160px);
            .chartLine{
                width: 100%;
                height: calc(100% - 60px);
            }
           .chars1{
                min-height: 350px;
           }
            .chars2{
                min-width: 280px;
            }
        }
    }
</style>
