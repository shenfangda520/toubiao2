<template>
    <div class="pollution">
        <!--首页部分-->
        <v-header></v-header>
        <!--日历-->
        <div class="warp-content">
            <div class="con-cont">
                <div class="warp-coter" style="margin-top: 20px">
                    <el-radio-group v-model="valueOne" size="medium">
                        <el-radio-button label="环比" ></el-radio-button>
                        <el-radio-button label="同比"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="warp-float">
                    <el-radio-group v-model="valueTwo" size="small">
                        <el-radio-button label="AQI"></el-radio-button>
                        <el-radio-button label="PM2.5"></el-radio-button>
                        <el-radio-button label="PM10"></el-radio-button>
                        <el-radio-button label="SO2"></el-radio-button>
                        <el-radio-button label="NO2"></el-radio-button>
                        <el-radio-button label="CO"></el-radio-button>
                        <el-radio-button label="O3"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <!--环比界面-->
            <div class="warp-calendar" v-show="valueOne ==='环比'">
                <!--日历-->
                <div id="calendar"></div>
                <!--地下-->
                <div class="posi-1ceng">
                    <div class="let-01">
                        <div v-if="January">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(January.y_count)">{{January.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(January.l_count)">{{January.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(January.qd_count)">{{January.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(January.zd_count)">{{January.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(January.yz_count)">{{January.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(January.zhd_count)">{{January.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="February">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(February.y_count)">{{February.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(February.l_count)">{{February.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(February.qd_count)">{{February.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(February.zd_count)">{{February.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(February.yz_count)">{{February.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(February.zhd_count)">{{February.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="March">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(March.y_count)">{{March.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(March.l_count)">{{March.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(March.qd_count)">{{March.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(March.zd_count)">{{March.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(March.yz_count)">{{March.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(March.zhd_count)">{{March.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="April">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(April.y_count)">{{April.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(April.l_count)">{{April.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(April.qd_count)">{{April.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(April.zd_count)">{{April.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(April.yz_count)">{{April.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(April.zhd_count)">{{April.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="May">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(May.y_count)">{{May.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(May.l_count)">{{May.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(May.qd_count)">{{May.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(May.zd_count)">{{May.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(May.yz_count)">{{May.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(May.zhd_count)">{{May.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="June">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(June.y_count)">{{June.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(June.l_count)">{{June.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(June.qd_count)">{{June.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(June.zd_count)">{{June.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(June.yz_count)">{{June.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(June.zhd_count)">{{June.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="posi-2ceng">
                    <div class="let-01">
                        <div v-if="July">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(July.y_count)">{{July.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(July.l_count)">{{July.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(July.qd_count)">{{July.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(July.zd_count)">{{July.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(July.yz_count)">{{July.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(July.zhd_count)">{{July.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="August">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(August.y_count)">{{August.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(August.l_count)">{{August.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(August.qd_count)">{{August.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(August.zd_count)">{{August.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(August.yz_count)">{{August.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(August.zhd_count)">{{August.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="September">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(September.y_count)">{{September.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(September.l_count)">{{September.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(September.qd_count)">{{September.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(September.zd_count)">{{September.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(September.yz_count)">{{September.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(September.zhd_count)">{{September.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="October">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(October.y_count)">{{October.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(October.l_count)">{{October.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(October.qd_count)">{{October.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(October.zd_count)">{{October.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(October.yz_count)">{{October.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(October.zhd_count)">{{October.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="November">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(November.y_count)">{{November.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(November.l_count)">{{November.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(November.qd_count)">{{November.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(November.zd_count)">{{November.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(November.yz_count)">{{November.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(November.zhd_count)">{{November.zhd_count}}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="let-01">
                        <div v-if="December">
                            <div class="l-001">
                                <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(December.y_count)">{{December.y_count}}</span></div>
                                <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(December.l_count)">{{December.l_count}}</span></div>
                                <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(December.qd_count)">{{December.qd_count}}</span></div>
                            </div>
                            <div class="l-001">
                                <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(December.zd_count)">{{December.zd_count}}</span></div>
                                <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(December.yz_count)">{{December.yz_count}}</span></div>
                                <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(December.zhd_count)">{{December.zhd_count}}</span></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="posi-3ceng">
                    <p>
                        <span>全年空气质量统计：</span>
                        优：<span class="y_count">{{yeardata.y_count}}</span>
                        良：<span class="l_count">{{yeardata.l_count}}</span>
                        轻度：<span class="qd_count">{{yeardata.qd_count}}</span>
                        中度：<span class="zd_count">{{yeardata.zd_count}}</span>
                        重度：<span class="zhd_count">{{yeardata.zhd_count}}</span>
                        严重：<span class="yz_count">{{yeardata.yz_count}}</span>
                        （天）
                    </p>
                </div>
            </div>
            <!--同比界面-->
            <yaeryaerhandle v-show="valueOne ==='同比'"></yaeryaerhandle>

        </div>
    </div>
</template>

<script>
    import api from '../../api/index';
    import yaeryaerhandle from './yearyaerhandle'
    export default {
        name: "pollution",
        data(){
            return{
                valueOne: '环比',
                valueTwo: 'AQI',
                yeardata:'',
                January:{},
                February:{},
                March:{},
                April:{},
                May:{},
                June:{},
                July:{},
                August:{},
                September:{},
                October:{},
                November:{},
                December:{},
                afData:{},
                mothData:{},
            }
        },
        created(){},
        methods:{
            //环比处理数据
            LinkDataHandle(){
                const _this = this;
                //年数据
                _this.yeardata = _this.afData.Data.yearinfo.count;//统计年
                const tongji = [];
                _this.afData.Data.months.forEach(item =>{tongji.push([...item.days])});
                //统计月数据
                let falldata = Object.values(tongji).reduce((a,b) => [...a, ...b], [])
                //
                _this.showCalendar(falldata.map(item =>{
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
                }));
            },
            //环比查询底部统计
            ChainRatioStatistics(monts){
                const _this = this;
                let mouth = parseInt(monts);
                //年数据
                return _this.afData.Data.months.filter(item =>{
                    if( mouth == item['month']){
                        return item.count;//统计
                    }else {
                        return '';
                    }
                })
            },
            //环比比数据请求
            ChainRequest(year){
                api.GetPolluteCalendarhb(year).then(res =>{
                    this.afData = res.data;
                    console.log(this.afData);
                });
                //
                setTimeout(()=>{
                    this.LinkDataHandle();
                    //清空数据
                    this.wipePageData();
                    //数据复制
                    this.RingRingStatisticalReproduction();
                },1000);

            },
            //环比月数据复制
            RingRingStatisticalReproduction(){
                const _this = this;
                _this.January = _this.ChainRatioStatistics('1')[0]?_this.ChainRatioStatistics('1')[0].count:'';
                _this.February = _this.ChainRatioStatistics('2')[0]?_this.ChainRatioStatistics('2')[0].count:'';
                _this.March = _this.ChainRatioStatistics('3')[0]?_this.ChainRatioStatistics('3')[0].count:'';
                _this.April = _this.ChainRatioStatistics('4')[0]?_this.ChainRatioStatistics('4')[0].count:'';
                _this.May = _this.ChainRatioStatistics('5')[0]?_this.ChainRatioStatistics('5')[0].count:'';
                _this.June =_this.ChainRatioStatistics('6')[0]?_this.ChainRatioStatistics('6')[0].count:'';
                _this.July = _this.ChainRatioStatistics('7')[0]?_this.ChainRatioStatistics('7')[0].count:'';
                _this.August = _this.ChainRatioStatistics('8')[0]?_this.ChainRatioStatistics('8')[0].count:'';
                _this.September = _this.ChainRatioStatistics('9')[0]?_this.ChainRatioStatistics('9')[0].count:'';
                _this.October = _this.ChainRatioStatistics('10')[0]?_this.ChainRatioStatistics('10')[0].count:'';
                _this.November =_this.ChainRatioStatistics('11')[0]?_this.ChainRatioStatistics('11')[0].count:'';
                _this.December = _this.ChainRatioStatistics('12')[0]?_this.ChainRatioStatistics('12')[0].count:'';

            },
            //清空页面数据
            wipePageData(){
                const _this = this;
                _this.January = '';
                _this.February = '';
                _this.March ='';
                _this.April = '';
                _this.May = '';
                _this.June ='';
                _this.July = '';
                _this.August = '';
                _this.September = '';
                _this.October = '';
                _this.November ='';
                _this.December = '';

            },
            //背景颜色
            ChangeBackground(val){
                let rtbgcolor = '';
                switch (val){
                    case 0:
                        rtbgcolor= 'background:#C71585;color:#fff';
                        break;
                    case 1:
                        rtbgcolor= 'background:#4169E1;color:#fff';
                        break;
                    case 2:
                        rtbgcolor= 'background:#2F4F4F;color:#fff';
                        break;
                    case 3:
                        rtbgcolor= 'background:#7CFC00;color:#666';
                        break;
                    case 4:
                        rtbgcolor= 'background:#FFFF00;color:#666';
                        break;
                    case 5:
                        rtbgcolor= 'background:#FF8C00;color:#fff';
                        break;
                    case 6:
                        rtbgcolor= 'background:#2F4F4F;color:#fff';
                        break;
                    case 7:
                        rtbgcolor= 'background:#7CFC00;color:#666';
                        break;
                    case 8:
                        rtbgcolor= 'background:#FFFF00;color:#666';
                        break;
                    case 9:
                        rtbgcolor= 'background:#FF8C00;color:#fff';
                        break;
                    default:
                        rtbgcolor = 'background:#eee;color:#fff';
                        break;
                }
                return rtbgcolor;
            },
            //环比日历
            showCalendar(data){
                let colordata = data;
                $('#calendar').calendar({
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
                });
            },

        },
        mounted (){
            const _this = this;
            _this.ChainRequest(new Date().getFullYear());
            $("#calendar").on('click',function(){
                $("#calendar .calendar-header th").toArray().forEach((item,index)=>{
                    //console.log(item);
                    if($(item).hasClass('hidden-xs') === false){
                        if($(item).find('year-title').context.innerText){
                            let years = $(item).find('year-title').context.innerText;
                            _this.ChainRequest(years);
                        }
                    }
                })
            });
        },
        components:{
            yaeryaerhandle
        }
    }
</script>

<style lang="scss" scoped>
    .pollution{
        width: 100%;
        height: 100%;
        .warp-content{
            width: 100%;
            height: calc(100% - 64px);
            margin: 0 auto;
            overflow-x: hidden;
            overflow-y: auto;
            .con-cont{
                width: 95%;
                height: 100px;
                .warp-coter{}
                .warp-float{
                    float: right;
                    margin-right: 10px;
                }
            }
            .warp-calendar{
                position: relative;
                width: 95%;
                margin-left: 2.5%;
                .posi-1ceng{
                    position: absolute;
                    top: 290px;
                    width: 100%;
                    height: 80px;
                    .let-01{
                        width: calc(16.6666666% - 3px);
                        margin-left: 3px;
                        height: 80px;
                        float: left;
                        .l-001{
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            .ll1{
                                float: left;
                                width: 30%;
                                text-align: right;
                                height: auto;
                                .text{
                                    display: inline-block;
                                    text-align: right;
                                    color: #000;
                                }
                                span{
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    line-height: 20px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
                .posi-2ceng{
                    position: absolute;
                    top: 600px;
                    width: 100%;
                    height: 80px;
                    .let-01{
                        width: calc(16.6666666% - 3px);
                        margin-left: 3px;
                        height: 80px;
                        float: left;
                        .l-001{
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            .ll1{
                                float: left;
                                width: 30%;
                                height: auto;
                                text-align: right;
                                .text{
                                    display: inline-block;
                                    text-align: right;
                                    color: #000;
                                }
                                span{
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    border-radius: 50%;
                                    line-height: 20px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
                .posi-3ceng{
                    width: 98%;
                    height: 40px;
                    background: #D8EDF6;
                    margin: 0 auto;
                    border-radius: 6px;
                    line-height: 40px;
                    text-align: left;
                    padding-left: 20px;
                    .y_count{
                        color: #1ce405;
                        font-weight: bold;
                    }
                    .l_count{
                        color: #1ce405;
                        font-weight: bold;
                    }
                    .qd_count{
                        color: #2d5fa4;
                        font-weight: bold;
                    }
                    .zd_count{
                        color: #1ce405;
                        font-weight: bold;
                    }
                    .zhd_count{
                        color: #1ce405;
                        font-weight: bold;
                    }
                    .yz_count{
                        color: #2b8fe4;
                        font-weight: bold;
                    }
                }
            }
            .calendar_mom_text{
                width: 100%;
                height: auto;
                .mon_text{
                    width: 100%;height: 80px;border: solid 1px #e3e3e3;border-radius: 4px;
                }
            }

        }

    }
</style>