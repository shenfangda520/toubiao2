<template>
    <div class="warp-calendar">
        <div class="calendar_header">
        </div>
        <div class="conta calendar_mom">
            <!--日历-->
            <div class="calendar_mom_juchang">
                <div id="calendar_calendar" class="calendar_exaCalendar1"></div>
                <ul class="exacal-dw class2016">
                    <bottomstic :BottomStatistics="Reproduction16"></bottomstic>
                </ul>
                <div id="calendar_calendar2" class="calendar_exaCalendar2"></div>
                <ul class="exacal-dw class2017">
                    <bottomstic :BottomStatistics="Reproduction17"></bottomstic>
                </ul>
                <div id="calendar_calendar3" class="calendar_exaCalendar3"></div>
                <ul class="exacal-dw class2018">
                    <bottomstic :BottomStatistics="Reproduction18"></bottomstic>
                </ul>
                <div id="calendar_calendar4" class="calendar_exaCalendar4"></div>
                <ul class="exacal-dw class2019">
                    <bottomstic :BottomStatistics="Reproduction19"></bottomstic>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/index';
    import bottomstic from './components/bottomstic'
    export default {
        name: "yearyaerhandle",
        data(){
            return{
                Reproduction16:[],
                Reproduction17:[],
                Reproduction18:[],
                Reproduction19:[],
                afData:{},
                mothData:{},
            }
        },
        created(){

        },
        mounted (){
            this.YearYearRequest('2017','2020');
        },
        methods:{
            //同比处理数据
            YearYearDataHandle(){
                const _this = this;
                const tongji = [];
                _this.mothData.Data.forEach(item =>{
                    // console.log(item)
                    if (item.child[0]) {tongji.push(item.child[0].days);}
                });
                //统计月数据
                let falldata = Object.values(tongji).reduce((a,b) => [...a, ...b], [])
                // 创造需要数据格式
                _this.showMothCalendar(falldata.map(item =>{
                    return{
                        aqi:item.aqi,
                        aqic:item.aqic,
                        co:item.co,
                        coc:item.coc,
                        day:item.day,
                        humi:item.humi,
                        no2:item.no2,
                        no2c:item.no2c,
                        o3:item.o3,
                        o3c:item.o3c,
                        pm10:item.pm10,
                        pm10c:item.pm10c,
                        pm25:item.pm25,
                        pm25c:item.pm25c,
                        primarypollute:item.primarypollute,
                        so2:item.so2,
                        so2c:item.so2c,
                        temp:item.temp,
                        weather:item.weather,
                        winddirect:item.winddirect,
                        windlevel:item.windlevel,
                        startDate:new Date(item.day.replace(/\\/g, ',')),
                        endDate:new Date(item.day.replace(/\\/g, ','))
                    }
                }))
            },

            //同比数据请求
            YearYearRequest(start,end){
                api.GetPolluteCalendartb(start,end).then(res =>{
                    console.log(res);
                    const _this = this;
                    _this.mothData = res.data;
                    _this.Reproduction16 = [];
                    _this.Reproduction17 = [];
                    _this.Reproduction18 = [{}];
                    _this.Reproduction19 = [];
                    //
                    res.data.Data.forEach(item =>{
                        console.log('sss');
                        if(item.child==false){
                            _this.Reproduction16.push({});
                            _this.Reproduction17.push({});
                            _this.Reproduction18.push({});
                            _this.Reproduction19.push({});
                        }else {
                            item.child.forEach(icod =>{
                                switch (icod.year){
                                    case 2016:
                                        _this.Reproduction16.push(icod.count);
                                        break;
                                    case 2017:
                                        _this.Reproduction17.push(icod.count);
                                        break;
                                    case 2018:
                                        _this.Reproduction18.push(icod.count);
                                        break;
                                    case 2019:
                                        _this.Reproduction19.push(icod.count);
                                        break;
                                };
                            });
                        };
                    })
                    console.log(_this.Reproduction18);
                });
                setTimeout(()=>{
                    this.YearYearDataHandle();
                    //重置页面
                    this.reset();
                },1000);

            },
            //重构页面
            reset() {
                //去掉插件同比月份和年份
                $(".calendar_mom_juchang .panel-default,.calendar_mom_juchang .month-title").hide();
                //头部四个年份
                let currentYear=new Date().getFullYear();
                let html="";
                for(let i=0;i<4;i++) {
                    html ="<div class='caldenar_headerYear' style='width: 22.5%;float: left;text-align: center;line-height: 40px'>"+(currentYear-i)+"</div>"+html;
                }
                html="<div class='caldenar_headerYear' style='width: 10%;float: left;text-align: center;line-height: 40px'>月份</div>"+html;
                $(".calendar_header").html(html);
                let mom_text='<div class="calendar_mom_text">';
                for(let j=1;j<=12;j++) {
                    mom_text+='<div class="mon_text" style="width: 100%;height: 280px;margin-top: 10px;border: solid 1px #e3e3e3;border-radius: 4px;"><div style="width: 10%;"><span class="calendar_mom_month" style="display: block;margin: 120px 70px;width: 40px;line-height: 40px;height: 40px;background: #e2e2e2">'+j+"</span></div></div>";
                }
                $("#calendar_calendar").append(mom_text+"</div>");
            },
            //同比日历
            showMothCalendar(data) {
                let colordata = data;
                //整理2016日历
                $('#calendar_calendar').calendar({
                    style:'background',
                    enableContextMenu: true,
                    enableRangeSelection: true,
                    //鼠标滑过弹窗设置
                    mouseOnDay: function(e) {
                        if(e.events.length > 0) {
                            let content = '';
                            for(let i in e.events) {
                                content += '<div class="event-tooltip-content">'
                                    + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].day + '</div>'
                                    + '<div class="event-location">' +'AQI: '+ e.events[i].aqi + '</div>'
                                    + '<div class="event-location">' +'O3: '+ e.events[i].o3 + '</div>'
                                    + '<div class="event-location">' +'NO2: '+ e.events[i].no2 + '</div>'
                                    + '<div class="event-location">' +'SO2: '+ e.events[i].so2 + '</div>'
                                    + '<div class="event-location">' +'CO: '+ e.events[i].co + '</div>'
                                    + '<div class="event-location">' +'PM2.5: '+ e.events[i].pm25 + '</div>'
                                    + '<div class="event-location">' +'PM10: '+ e.events[i].pm10 + '</div>'
                                    + '<div class="event-location">' +'首要污染物: '+ e.events[i].primarypollute + '</div>'
                                    + '<div class="event-location">' +'天气: '+ e.events[i].weather + '</div>'
                                    + '<div class="event-location">' +'温度: '+ e.events[i].temp + '</div>'
                                    + '<div class="event-location">' +'湿度: '+ e.events[i].humi + '</div>'
                                    + '<div class="event-location">' +'风向: '+ e.events[i].winddirect + '</div>'
                                    + '<div class="event-location">' +'风级: '+ e.events[i].windlevel + '</div>'
                                    + '</div>';
                            };
                            $(e.element).popover({
                                trigger: 'manual',
                                container: 'body',
                                html:true,
                                content: content
                            });

                            $(e.element).popover('show');
                        }
                    },
                    mouseOutDay: function(e) {
                        if(e.events.length > 0) {
                            $(e.element).popover('hide');
                        }
                    },
                    dayContextMenu: function(e) {
                        $(e.element).popover('hide');
                    },
                    //需要的数据格式
                    dataSource: colordata
                }).setYear('2016');
                //整理2017日历
                $('#calendar_calendar2').calendar({
                    style:'background',
                    enableContextMenu: true,
                    enableRangeSelection: true,
                    //鼠标滑过弹窗设置
                    mouseOnDay: function(e) {
                        if(e.events.length > 0) {
                            let content = '';
                            for(let i in e.events) {
                                content += '<div class="event-tooltip-content">'
                                    + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].day + '</div>'
                                    + '<div class="event-location">' +'AQI: '+ e.events[i].aqi + '</div>'
                                    + '<div class="event-location">' +'O3: '+ e.events[i].o3 + '</div>'
                                    + '<div class="event-location">' +'NO2: '+ e.events[i].no2 + '</div>'
                                    + '<div class="event-location">' +'SO2: '+ e.events[i].so2 + '</div>'
                                    + '<div class="event-location">' +'CO: '+ e.events[i].co + '</div>'
                                    + '<div class="event-location">' +'PM2.5: '+ e.events[i].pm25 + '</div>'
                                    + '<div class="event-location">' +'PM10: '+ e.events[i].pm10 + '</div>'
                                    + '<div class="event-location">' +'首要污染物: '+ e.events[i].primarypollute + '</div>'
                                    + '<div class="event-location">' +'天气: '+ e.events[i].weather + '</div>'
                                    + '<div class="event-location">' +'温度: '+ e.events[i].temp + '</div>'
                                    + '<div class="event-location">' +'湿度: '+ e.events[i].humi + '</div>'
                                    + '<div class="event-location">' +'风向: '+ e.events[i].winddirect + '</div>'
                                    + '<div class="event-location">' +'风级: '+ e.events[i].windlevel + '</div>'
                                    + '</div>';
                            };
                            $(e.element).popover({
                                trigger: 'manual',
                                container: 'body',
                                html:true,
                                content: content
                            });

                            $(e.element).popover('show');
                        }
                    },
                    mouseOutDay: function(e) {
                        if(e.events.length > 0) {
                            $(e.element).popover('hide');
                        }
                    },
                    dayContextMenu: function(e) {
                        $(e.element).popover('hide');
                    },
                    //需要的数据格式
                    dataSource: colordata
                }).setYear('2017');
                //整理2018日历
                $('#calendar_calendar3').calendar({
                    style:'background',
                    enableContextMenu: true,
                    enableRangeSelection: true,
                    //鼠标滑过弹窗设置
                    mouseOnDay: function(e) {
                        if(e.events.length > 0) {
                            let content = '';
                            for(let i in e.events) {
                                content += '<div class="event-tooltip-content">'
                                    + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].day + '</div>'
                                    + '<div class="event-location">' +'AQI: '+ e.events[i].aqi + '</div>'
                                    + '<div class="event-location">' +'O3: '+ e.events[i].o3 + '</div>'
                                    + '<div class="event-location">' +'NO2: '+ e.events[i].no2 + '</div>'
                                    + '<div class="event-location">' +'SO2: '+ e.events[i].so2 + '</div>'
                                    + '<div class="event-location">' +'CO: '+ e.events[i].co + '</div>'
                                    + '<div class="event-location">' +'PM2.5: '+ e.events[i].pm25 + '</div>'
                                    + '<div class="event-location">' +'PM10: '+ e.events[i].pm10 + '</div>'
                                    + '<div class="event-location">' +'首要污染物: '+ e.events[i].primarypollute + '</div>'
                                    + '<div class="event-location">' +'天气: '+ e.events[i].weather + '</div>'
                                    + '<div class="event-location">' +'温度: '+ e.events[i].temp + '</div>'
                                    + '<div class="event-location">' +'湿度: '+ e.events[i].humi + '</div>'
                                    + '<div class="event-location">' +'风向: '+ e.events[i].winddirect + '</div>'
                                    + '<div class="event-location">' +'风级: '+ e.events[i].windlevel + '</div>'
                                    + '</div>';
                            };
                            $(e.element).popover({
                                trigger: 'manual',
                                container: 'body',
                                html:true,
                                content: content
                            });

                            $(e.element).popover('show');
                        }
                    },
                    mouseOutDay: function(e) {
                        if(e.events.length > 0) {
                            $(e.element).popover('hide');
                        }
                    },
                    dayContextMenu: function(e) {
                        $(e.element).popover('hide');
                    },
                    //需要的数据格式
                    dataSource: colordata
                }).setYear('2018');
                //整理2019日历
                $('#calendar_calendar4').calendar({
                    style:'background',
                    enableContextMenu: true,
                    enableRangeSelection: true,
                    //鼠标滑过弹窗设置
                    mouseOnDay: function(e) {
                        if(e.events.length > 0) {
                            let content = '';
                            for(let i in e.events) {
                                content += '<div class="event-tooltip-content">'
                                    + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].day + '</div>'
                                    + '<div class="event-location">' +'AQI: '+ e.events[i].aqi + '</div>'
                                    + '<div class="event-location">' +'O3: '+ e.events[i].o3 + '</div>'
                                    + '<div class="event-location">' +'NO2: '+ e.events[i].no2 + '</div>'
                                    + '<div class="event-location">' +'SO2: '+ e.events[i].so2 + '</div>'
                                    + '<div class="event-location">' +'CO: '+ e.events[i].co + '</div>'
                                    + '<div class="event-location">' +'PM2.5: '+ e.events[i].pm25 + '</div>'
                                    + '<div class="event-location">' +'PM10: '+ e.events[i].pm10 + '</div>'
                                    + '<div class="event-location">' +'首要污染物: '+ e.events[i].primarypollute + '</div>'
                                    + '<div class="event-location">' +'天气: '+ e.events[i].weather + '</div>'
                                    + '<div class="event-location">' +'温度: '+ e.events[i].temp + '</div>'
                                    + '<div class="event-location">' +'湿度: '+ e.events[i].humi + '</div>'
                                    + '<div class="event-location">' +'风向: '+ e.events[i].winddirect + '</div>'
                                    + '<div class="event-location">' +'风级: '+ e.events[i].windlevel + '</div>'
                                    + '</div>';
                            };
                            $(e.element).popover({
                                trigger: 'manual',
                                container: 'body',
                                html:true,
                                content: content
                            });

                            $(e.element).popover('show');
                        }
                    },
                    mouseOutDay: function(e) {
                        if(e.events.length > 0) {
                            $(e.element).popover('hide');
                        }
                    },
                    dayContextMenu: function(e) {
                        $(e.element).popover('hide');
                    },
                    //需要的数据格式
                    dataSource: colordata
                }).setYear('2019');
            },
        },
        components:{
            bottomstic
        }
    }
</script>

<style scoped>
    .calendar_header{
        width: 100%;
        height: 40px;
        background: #e3e3e3;
        font-size: 16px;
        font-weight: bold;
        border-radius: 4px;
    }
</style>