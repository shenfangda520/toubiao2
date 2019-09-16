<template>
    <!--挂图作战-->
    <div class="Like-winter">
        <div class="like-header">
            <!--首页部分-->
            <v-header :isChoose="1"></v-header>
        </div>
        <!---->
        <div class="warp-gtzz">
            <!--左边部分-->
            <div class="warp-left">
                <!--空气质量天数-->
                <div class="kq-num comclass">
                    <div class="title">
                        <div class="titleText">
                            <span class="line"></span>空气质量天数等级分布
                        </div>
                    </div>
                  <div class="selecFine">
                    <span v-for="(v,i) in [{label:'优良天'},{label:'重污染天'}]" @click="Select(v,i)" :style="'color:'+(isSelect===i?'#12DA88':'#fff')">{{v.label}}</span>
                  </div>
                    <div id="airQuality"></div>
                </div>
                <!--空气质量预报-->
                <div class="kq-yb comclass">
                    <div class="title">
                        <div class="titleText">
                            <span class="line"></span>空气质量预报
                        </div>
                    </div>
                    <div class="yichu">
                        <div class="data_water1">
                            <p v-if="WeatherWinterPre[0].date">{{WeatherWinterPre[0].date}}</p>
                            <a>AQI日报范围<span>{{WeatherWinterPre[0].minaqi}}-{{WeatherWinterPre[0].maxaqi}}</span></a><br/>
                            <!---->
                            <a>级别 <span class="tian"></span><span v-show="onelan"><img
                                    :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[0].minQuality)+'.png'"
                                    alt=""><i>~</i></span><span><img
                                    :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[0].maxQuality)+'.png'"
                                    alt=""></span></a><br/>
                            <a>首要污染物<span>{{WeatherWinterPre[0].mainpoll}}</span></a>
                            <a>天气 <span style="font-size: 14px;padding-left: 20px">{{WeatherWinterPre[0].tq}}</span></a>
                            <a :title="`${WeatherWinterPre[0].temp}℃，${WeatherWinterPre[0].wd}，${WeatherWinterPre[0].ws}`">{{WeatherWinterPre[0].temp}}℃，{{WeatherWinterPre[0].wd}}，{{WeatherWinterPre[0].ws}}</a>
                        </div>
                        <div class="data_water2">
                            <p v-if="WeatherWinterPre[1].date">{{WeatherWinterPre[1].date}}</p>
                            <a>AQI日报范围<span>{{WeatherWinterPre[1].minaqi}}-{{WeatherWinterPre[1].maxaqi}}</span></a><br/>
                            <!---->
                            <a>级别 <span class="tian"></span><span v-show="twolan"><img
                                    :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[1].minQuality)+'.png'"
                                    alt=""><i>~</i></span><span><img
                                    :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[1].maxQuality)+'.png'"
                                    alt=""></span></a><br/>
                            <a>首要污染物<span>{{WeatherWinterPre[1].mainpoll}}</span></a>
                            <a>天气 <span style="font-size: 14px;padding-left: 20px">{{WeatherWinterPre[1].tq}}</span></a>
                            <a :title="`${WeatherWinterPre[1].temp}℃，${WeatherWinterPre[1].wd}，${WeatherWinterPre[1].ws}`">{{WeatherWinterPre[1].temp}}℃，{{WeatherWinterPre[1].wd}}，{{WeatherWinterPre[1].ws}}</a>
                        </div>
                        <div class="data_water3" v-if="WeatherWinterPre[2]">
                            <p v-if="WeatherWinterPre[2].date">{{WeatherWinterPre[2].date}}</p>
                            <a>AQI日报范围<span>{{WeatherWinterPre[2].minaqi}}-{{WeatherWinterPre[2].maxaqi}}</span></a><br/>
                            <!---->
                            <a>级别 <span class="tian"></span><span v-show="treelan"><img
                                    :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[2].minQuality)+'.png'"
                                    alt=""><i>~</i></span><span><img
                                    :src="'../../../static/imgs/mues/cainuan/'+this.getImagesTarget(WeatherWinterPre[2].maxQuality)+'.png'"
                                    alt=""></span></a><br/>
                            <a>首要污染物<span>{{WeatherWinterPre[2].mainpoll}}</span></a>
                            <a>天气 <span style="font-size: 14px;padding-left: 20px">{{WeatherWinterPre[2].tq}}</span></a>
                            <a :title="`${WeatherWinterPre[2].temp}℃，${WeatherWinterPre[2].wd}，${WeatherWinterPre[2].ws}`">{{WeatherWinterPre[2].temp}}℃，{{WeatherWinterPre[2].wd}}，{{WeatherWinterPre[2].ws}}</a>
                        </div>
                    </div>

                </div>
            </div>
            <!--中间部分-->
            <div class="warp-conter">
                <!--地图模块-->
                <div class="map-was comclass">
                    <div class="class-fx">
                        <weather></weather>
                    </div>
                    <!---->
                    <battle-map style="width: 100%;height: 100%"></battle-map>
                </div>
                <!--数据报表-->
                <div class="table-was comclass">
                    <!--空气质量、工地扬尘、企业在线监测、餐饮监测-->
                    <div class="choose">
                        <ul>
                            <li v-for="(v,i) in timeTabs" @click="timeClick(v,i+1)"><span
                                    :style='"color:"+(i+1===isChoose ? "#11DA88" : "#fff")'>{{v.label}}</span>
                                <div :class='i+1===isChoose && "checked"'></div>
                            </li>
                        </ul>
                        <div class="inline" :style="'display:'+(isCustom ? 'inline-block':'none')"></div>
                        <!---->
                        <div class="table-sleect" v-if="isChoose===1">
                            <el-select v-model="rankingVal" size="mini" class="select" @change="handleClickKKK">
                                <el-option
                                        v-for="item in rankingOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="table-sleect" v-if="isChoose===2">
                            <el-select v-model="rankingVal2" size="mini" class="select">
                                <el-option
                                        v-for="item in rankingOptions2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <!--空气质量-->
                    <div class="tab_container" v-if="isChoose===1">
                        <el-table :data="kongqiData" border stripe :row-class-name="tableRowClassName">
                            <el-table-column property="xuhao" label="排名" width="80"></el-table-column>
                            <el-table-column property="wlname" label="网格名称"></el-table-column>
                            <el-table-column property="jiancedian" label="监测点"></el-table-column>
                            <el-table-column property="chaowrw" :label="arAQI"></el-table-column>
                        </el-table>
                    </div>
                    <!--工地扬尘pm25-->
                    <div class="tab_container" v-if="isChoose===2&&rankingVal2==='pm25'">
                        <el-table :data="PM25Data" border stripe :row-class-name="tableRowClassName">
                            <el-table-column property="ranking" label="排名" width="80"></el-table-column>
                            <el-table-column property="gridName" label="网格名称" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="stationname" label="工地" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="pm25" label="PM2.5"></el-table-column>
                        </el-table>
                    </div>
                    <!--工地扬尘pm10-->
                    <div class="tab_container" v-if="isChoose===2&&rankingVal2==='pm10'">
                        <el-table :data="PM10Data" border stripe :row-class-name="tableRowClassName">
                            <el-table-column property="ranking" label="排名" width="80"></el-table-column>
                            <el-table-column property="gridName" label="网格名称" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="stationname" label="工地" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="pm10" label="PM10"></el-table-column>
                        </el-table>
                    </div>
                    <!--企业在线监测-->
                    <div class="tab_container" v-if="false">
                        <el-table :data="EnterpriseData" border stripe :row-class-name="tableRowClassName">
                            <el-table-column property="SerialNumber" label="序号" width="80"></el-table-column>
                            <el-table-column property="gridName" label="网格名称" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="stationname" label="企业" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="overItem" label="超标指标"></el-table-column>
                        </el-table>
                    </div>
                    <!--餐饮监测-->
                    <div class="tab_container" v-if="isChoose===3">
                        <el-table :data="TvocData" border stripe :row-class-name="tableRowClassName">
                            <el-table-column property="SerialNumber" label="排名" width="80"></el-table-column>
                            <el-table-column property="gridName" label="网格名称" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="stationname" label="饭店名称" :show-overflow-tooltip="true"></el-table-column>
                            <el-table-column property="overItem" label="实时浓度"></el-table-column>
                        </el-table>
                    </div>

                </div>
            </div>
            <!--右边部分-->
            <div class="warp-right">
                <!--预警控制-->
                <div class="yj-was comclass">
                    <div class="yj-title">预警控制</div>
                    <!--保优保良菜单-->
                    <div class="tt-tab" v-show="hengtab">
                        <div class="tt-tab-l">
                            今日控制目标:
                        </div>
                        <div class="tt-tab-r">
                            <el-tabs v-model="activeName_b" @tab-click="actvieChange">
                                <el-tab-pane v-for="(item,index) in SouDataList" :label="item"  :name="item"></el-tab-pane>
                                <!---->
                            </el-tabs>
                        </div>
                    </div>
                    <!--显示内容部分-->
                    <div class="item_text4">
                        <!--选择控制指标时候启用-->
                        <div class="item-kz-class">

                            <!--今日若保-->
                            <div class="rb-class" v-show="activeName_jrrb">
                                <!---->

                                <div class="title">
                                    <div class="titleText">
                                        <span class="line"></span><span v-if="iscallData">{{iscallData.Time}}时，我区累计AQI为{{iscallData.LfAccuAqi}}，首要污染物为{{iscallData.PrimaryPollution || '--'}}</span>
                                    </div>
                                </div>
                                <!--站点控制-->
                                <div class="winter_bao_top">
                                    <div class="bao_left" style="line-height: 30px">
                                        <dl>
                                            <dt><span style="display:inline-block;width: 80px;height: 14px"></span></dt>
                                            <dd><span style="display:inline-block;width: 80px;font-size: 12px">今日控制目标</span></dd>
                                            <dd><span style="display:inline-block;width: 60px;font-size: 12px">当前累计</span></dd>
                                            <dd><span style="display:inline-block;width: 60px;font-size: 12px">剩余控制</span></dd>
                                        </dl>
                                    </div>
                                    <div class="bao_right">

                                        <dl>
                                            <dt><span class="w_title">PM2.5</span></dt>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.alarmPm25,'PM2.5')">{{iscallData.alarmPm25}}</span><i class="jb_dian" v-show="red_dian"></i></dd>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.AccuPm25,'PM2.5')">{{iscallData.AccuPm25}}</span><i class="jb_dian" v-show="red_dian"></i></dd>
                                            <dd><span class="w_value" :style="backroundlicolor(iscallData.AccuPm25,iscallData.FutureControlPm25Value)">{{iscallData.FutureControlPm25Value}}</span><i class="jb_dian" v-show="red_dian"></i></dd>
                                        </dl>
                                        <dl>
                                            <dt><span class="w_title">PM10</span></dt>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.alarmPm10,'PM10')">{{iscallData.alarmPm10}}</span><i class="jb_dian" v-show="red_dian"></i></dd>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.AccuPm10,'PM10')">{{iscallData.AccuPm10}}</span><i class="jb_dian" v-show="red_dian"></i></dd>
                                            <dd><span class="w_value" :style="backroundlicolor(iscallData.AccuPm10,iscallData.FutureControlPm10Value)">{{iscallData.FutureControlPm10Value}}</span><i class="jb_dian" v-show="red_dian"></i></dd>
                                        </dl>
                                        <dl>
                                            <dt><span class="w_title">SO2</span></dt>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.alarmSo2,'SO2')">{{iscallData.alarmSo2}}</span></dd>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.AccuSo2,'SO2')">{{iscallData.AccuSo2}}</span></dd>
                                            <dd><span class="w_value" :style="backroundlicolor(iscallData.AccuSo2,iscallData.FutureControlSo2Value)">{{iscallData.FutureControlSo2Value}}</span></dd>
                                        </dl>
                                        <dl>
                                            <dt><span class="w_title">NO2</span></dt>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.alarmNo2,'NO2')">{{iscallData.alarmNo2}}</span></dd>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.AccuNo2,'NO2')">{{iscallData.AccuNo2}}</span></dd>
                                            <dd><span class="w_value" :style="backroundlicolor(iscallData.AccuNo2,iscallData.FutureControlNo2Value)">{{iscallData.FutureControlNo2Value}}</span></dd>
                                        </dl>
                                        <dl>
                                            <dt><span class="w_title">CO</span></dt>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.alarmCo,'CO')">{{iscallData.alarmCo}}</span></dd>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.AccuCo,'CO')">{{iscallData.AccuCo}}</span></dd>
                                            <dd><span class="w_value" :style="backroundlicolor(iscallData.AccuCo,iscallData.FutureControlCoValue)">{{iscallData.FutureControlCoValue}}</span></dd>
                                        </dl>
                                        <dl>
                                            <dt><span class="w_title">O3</span></dt>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.alarmO3,'O3')">{{iscallData.alarmO3}}</span></dd>
                                            <dd><span class="w_value" :style="AqiBackgroundsColor(iscallData.AccuO3,'O3')">{{iscallData.AccuO3}}</span></dd>
                                            <dd><span class="w_value" :style="backroundlicolor(iscallData.AccuO3,iscallData.FutureControlO3Value)">{{iscallData.FutureControlO3Value}}</span></dd>
                                        </dl>
                                    </div>
                                </div>
                                <!---->
                                <div class="qxtable_bottom">
                                   <!---->
                                    <div class="title">
                                        <div class="titleText">
                                            <span class="line"></span>站点累计
                                        </div>
                                    </div>
                                    <!--选择器-->
                                    <div class="pp_tab">
                                        <ul class="tb_ul">
                                            <li v-for="(cell,index) in items" @click="selectStyle(cell,index)"
                                                :class="{'bottomColor': (index === selected)}">
                                                {{cell.select}}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <!--累计站点-->
                                <div class="winter_top_table" style="width: 100%;">
                                    <table border="1" style="width: 100%;border-color:#000">
                                        
                                        <tr>
                                            <td><span>站点</span></td>
                                            <td><span>累计值</span></td>
                                            <td><span>达标状态</span></td>
                                            <!--<td><span>后续控制值</span></td>-->
                                            <td><span>实时浓度</span></td>
                                        </tr>
                                        <tr v-for="(item,index) in xuanzeData">
                                            <td>
                                                <span>{{item.PointName}}</span>
                                            </td>
                                            <td>
                                                <span>{{item.AccuValue}}</span>
                                            </td>
                                            <td>
                                                <span v-if="item.StandardState < 0" style="color: #00B83F">↓{{item.StandardState}}</span>
                                                <span v-if="item.StandardState > 0" style="color: red">↑{{item.StandardState}}</span>
                                            </td>

                                            <td>
                                                <span>{{item.RealValue}}</span>
                                            </td>
                                        </tr>

                                    </table>
                                </div>
                                <!--tuli-->
                                <img style="float: left;margin-top: 4px;margin-bottom:50px;" src="../../assets/img/dabiao1_03.jpg" alt="">
                                <!---->
                            </div>
                        </div>
                        <!---->
                    </div>
                </div>
                <!--六项污染物贡献率-->
                <div class="gxl-was comclass">
                    <div class="title">
                        <div class="titleText">
                            <span class="line"></span>用电量统计
                        </div>
                      <div class="monthSelect">
                        <el-date-picker
                          v-model="MonthVal"
                          type="date"
                          size="mini"
                          @change="getSixPollution"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </div>
                    </div>
                  <div id="sixPollution"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {bus} from '@/js/bus.js'
    import api from '../../api/index'
    import BattleMap from '@/map/BattleMap'
    import WinterProgress from '@/components/WinterProgress'
    import Weather from '@/map/controls/WeatherCom'

    export default {
        name: 'likewinter',
        data() {
            return {
                //
                arAQI:'AQI',
                //
                activeName_AQI:'aqi',
                //下拉列表
                selectrb:true,
                //横类型tab
                hengtab:false,
                //今日控制值页面
                activeName_jrkz:false,
                //今日若保页面
                activeName_jrrb:true,
                //页面默认数据
                left: '',
                //记录当前页面宽度
                screenWidth: document.body.clientWidth,
                //今日控制目标默认展示
                activeName_b:'PM2.5',
                //默认选中模块三廊坊市秋冬季采暖期考核
                activeName_s: 'first_s',
                //默认选中模块四大气污染改善
                activeName_t: 'first_t',
                //默认选中模块五空气质量监测
                activeName_f: 'first_f',
                //默认选中模块三县市区周考核
                activeName_z: 'first_z',
                //默认选中模块三采暖考核全期
                activeName_a: 'first_a',
                //默认选中模块五中工地扬尘pm2.5
                activeName_w: 'first_w',
                //默认选中经济数据
                activeName_j: 'first_j',
                isChoose: 1,
                isCustom: false,
                timeTabs: [
                    {label: '空气质量监测'},
                    {label: '工地扬尘监测'}, 
                   // {label: '企业在线监测'},
                    {label: '餐饮监测'}
                 ],
                //
                rankingOptions: [
                    {value: 'aqi', label: 'AQI'},
                    {value: 'no2', label: 'NO2'},
                    {value: 'so2', label: 'SO2'},
                    {value: 'pm25', label: 'PM2.5'},
                    {value: 'pm10', label: 'PM10'},
                    {value: 'co', label: 'CO'},
                    {value: 'o3', label: 'O3'}
                ],
                rankingVal: 'aqi',
                //
                rankingOptions2: [
                    {value: 'pm25', label: 'PM2.5'},
                    {value: 'pm10', label: 'PM10'},
                ],
                rankingVal2: 'pm25',
                //天气预报板块01
                onelan: true,
                //天气预报板块02
                twolan: true,
                //天气预报板块03
                treelan: true,
                //暂时无用
                currentRow: null,
                //
                pagesize: 10,
                //
                currentPage: 1,
                //
                totalCount: 0,
                //我市74城市年倒排截止时间
                onetime: '',
                //我市实时AQI为截止时间
                twotime: '',
                //空气质量监测数据
                kongqiData: [],
                //pm2.5数据
                PM25Data: [],
                //pm10数据
                PM10Data: [],
                //企业数据
                EnterpriseData: [],
                //目标控制值
                SoutypeData: [],
                //
                LfAirWinterPre: {},
                //
                WeatherWinterPre: [],
                //市区组数据
                shiQuData:[],
                //环京县市组
                huanJingData:[],
                //南部县市组
                nanBuData:[],
                //用电量数据
                Diandata: {},
                //控制目标数据
                SouDataList: [],
                //预警数据
                yujingAallData: [],
                //市三区考核数据
                shisanquData: [],
                //南部县市考核数据
                nanbuData: [],
                //环京县市考核数据
                huanjingData: [],
                //能源消耗数据
                nenyuanData: [],
                //区县用电量时间
                DianTime: '',
                //距离年底时间
                timeShow: '',
                //距离冬防时间
                timeShow2: '',
                //大气污染类型
                DaqiType: 'PM2.5',
                //大气污染单位
                DaqiDanw: '(微克/立方米)',
                //tvoc数据
                TvocData: [],
                //模块一控制目标数据
                //默认tab样式选择
                selected:0,
                //选择器元素
                items: [{select:'PM2.5'}, {select:'PM10'}, {select:'SO2'}, {select:'NO2'}, {select:'CO'}, {select:'O3'}],
                //提示点
                red_dian:true,
                //要保选项
                qualitys:[],
                //要保值所以数据
                iscallData:{},
                //保值列表
                listDataTable:[],
                //筛选后数据
                xuanzeData:[],
                //预警数据保存
                yujingData:{},
                //储存选中对象
                devcell:{},
				//月累计综指
				sevenMonthComplex:[],
				eightMonthComplex:[],
				//月累计排名
				sevenMonthRange:[],
				eightMonthRange:[],
				//月累计空气质量(优良)
				sevenFine:[],
				eightFine:[],
				//月累计空气质量(重污染)
				sevenBad:[],
				eightBad:[],
				//年累计综指
				sevenYearComplex:[],
				eightYearComplex:[],
				//年累计排名
				sevenYearRange:[],
				eightYearRange:[],
				//年累计空气质量(优良)
				sevenYearFine:[],
				eightYearFine:[],
				//年累计空气质量(重污染)
				sevenYearBad:[],
				eightYearBad:[],
				year:'2018',
				//乡镇月考核
				CountySelectVal:'全市',
		        area:'',
		        WholeCityData:[],
		        CityTableData:[],
		        type:'1',
		        TypeLengedData:[],//案件类型占比数据
		        allData:[],
		        month:'',
		        day:'',
		        active_tab:'all',
		        all:'all',
		        mid:'mid',
		        guan:'guan',
                hjpaim:'',
              /*gy*/
              MonthVal:'',
              sixPollutionData:[],
              isSelect:0,
              fineData:[],
              badData:[],
              xAxis:[],
            };

        },
        created() {
          this.MonthVal = this.getYesterday(); //前一天
        },
        mounted() {
            const _this = this;
            //初始化页面所有数据
            _this.getInitDataList();
            //默认选中优
            _this.getbaoliangyouRes('0501');
            //
            _this.GetCurrentMonth();
            //获取月考核数据
            // _this.GetMonthCheck();
            //冬防倒计时
            _this.WinterCountDown();
            //获取乡镇月考核数据
            // _this.GetCountyCheckData();
            //
            _this.intekqzlChange('aqi');
            //
            setTimeout(()=>{
                //初始化显示预警控制优
                _this.selectStyle ({select:'PM2.5'},0);
                //初始化控制目标
                _this.actvieChange({name:"PM2.5"});
                // _this.GetCaseTypePie();//督查案件占比饼图
                //_this.renderSixPie();//六项污染物贡献率饼图
              _this.getAirQualityData();
              _this.getSixPollution();

            },1200)
            //更新时间
            _this.OneTimesData(-1);
            //时间更新
            _this.TwoTimesData();
			//reisze事件
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    _this.screenWidth = window.screenWidth;
                })()
            }
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val;
                    this.timer = true;
                    let that = this;
                    setTimeout(function () {
                        //监测屏幕大于1700重新运行图例
                        if(that.screenWidth > 1700){
//                          console.log('执行次参照')
                            //刷新页面
                            window.location.reload();
                        }
                        //监测屏幕小于1400重新运行图例
                        if(that.screenWidth < 1400){
//                          console.log('执行次参照')
                            //刷新页面
                            window.location.reload();
                        }
                        that.timer = false
                    }, 400)
                }
            }
        },
        methods: {
        	//获取当前月日
        	GetCurrentMonth(){
        		let now = new Date();
        		this.month = now.getMonth()+1;
        		this.day = now.getDate()-1;
        	},
          getYesterday(){
            let day1 = new Date();
            day1.setTime(day1.getTime()-24*60*60*1000);
            let month = (day1.getMonth()+1)<10?('0'+(day1.getMonth()+1)):(day1.getMonth()+1);
            let day = day1.getDate()<10?('0'+(day1.getDate())):(day1.getDate());
            let s1 = day1.getFullYear()+"-" + month + "-" + day;
            return s1;
          },
            //获取乡镇月考核数据
			GetCountyCheckData(){
				switch (this.active_tab){
        			case 'all':
        				this.area = '';
        			break;
        			case 'mid':
        				this.area = '中';
        			break;
        			case 'guan':
        				this.area = '广';
        			break;
        			default:
        			break;
        		}
        		let t = this;
        		let Time = '';
        		let isQuarter = true;
        		t.WholeCityData = [];
        		let area = encodeURI(this.area);
        		api.GetAssessment(Time,area,isQuarter).then(res=>{
        		  //console.log(res)
        			let i = 1;
        			if(res&&isQuarter){
        				let allData = res.data.Data;
        				this.totalCount = allData.length;
        				allData.forEach(item=>{
        					let table = {};
        					table.Range = i++;
        					table.Com_Index = item.Com_Index;
   							table.list = item.list;
   							table.Name = item.Name;
   							table.Waring_Num = item.Com_IndexRank;
   							//table.Waring_Num = item.Waring_Num;
   							t.WholeCityData.push(table);
        				})
        			}
        			this.setPageTable(10, 1);
        		})
			},
			 //每页显示数据量变更
            handleSizeChange(val) {
            },
            //点击页码换页
            handleCurrentChange(val) {
                this.setPageTable(10, val);
            },
			 //分页数据
            setPageTable(pageSize, pageNum) {
                let i = 1;
                let rtValue = [];
                let startNum = pageSize * (pageNum - 1);
                for (let i = 0; i < pageSize; i++) {
                    if ((startNum + i + 1) > this.WholeCityData.length)
                        break;
                    rtValue.push(this.WholeCityData[startNum + i]);
                }
                this.CityTableData = rtValue;
            },
            //
            backroundlicolor(shinum,shengnum){
                let kcolor = ''
                if(shinum > shengnum){
                    kcolor = 'background:rgb(255,0,0);color:#fff'
                }else if(shinum < shengnum){
                    kcolor = 'background:rgb(0,228,0);color:#fff'
                }else if(shinum = shengnum){
                    kcolor = 'background:rgb(225,126,0);color:#000'
                }
                //console.log(kcolor)
                return kcolor
            },
            //
            handleClickKKK(val){
                //
                console.log(val)
                this.arAQI = val==='pm25'?'PM2.5':val.toUpperCase();
                this.intekqzlChange(val);
            },
            //今日控制目标切换事件
            selectStyle (cell,index) {
                const _this = this;
                //选中数据
                let value = cell.select;
                //控制显示选中样式
                _this.selected = index;
                //存储当前选中对象
                _this.devcell = cell;
                //分类数据展示请求
                _this.xuanzeData = _this.getPointByType(value);
            },
            //今日控制目标选项
            actvieChange(value){
                const _this = this;
//              console.log(value.name);
                let data = value.name;
//              console.log(_this.getPointByTypekey(data));
                //保存预警数据
                _this.yujingData = _this.getPointByTypekey(data);
            },
            //今日若保选项
            TodayPacketValue(){
                const _this = this;
                let value = $("#selectrb").val();
//              console.log(value);
                switch (value){
                    case "----":
//                      console.log('今日控制');
                        _this.activeName_jrkz = true;
                        _this.activeName_jrrb = false;
                        _this.hengtab = true;
                        break;

                    default:
//                      console.log('今日若保');
                        _this.activeName_jrkz = false;
                        _this.activeName_jrrb = true;
                        _this.hengtab = false;
                        break;
                }
                //请求数据若保
                if(value != '----'){
                    //请求若保值更改项
                    this.getbaoliangyouRes(value);
                    //若保值改变站点累计更改
                    setTimeout(() =>{
                        _this.selectStyle (this.devcell,this.selected)
                    },500)
                }
            },
            //跟新数据时间1
            OneTimesData(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1;//获取当前月份的日期
                var d = dd.getDate();
                this.onetime = m + '月' + d + '日';
            },
            //跟新数据时间2
            TwoTimesData() {
                var date = new Date(), Y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), H = date.getHours() - 1, i = date.getMinutes(), s = date.getSeconds();
                if (m < 10) {m = '0' + m;}
                if (d < 10) {d = '0' + d;}
                if (H < 10) {H = '0' + H;}
                if (i < 10) {i = '0' + i;}
                if (s < 10) {s = '0' + s;}
                var p = H + '时';
                this.twotime = p;
            },
            //冬防战报倒计时
            WinterCountDown() {
                let t = this;
                var times = new Date();
                //据冬防结束
                var timesout = new Date("2018/11/15 00:00:00");
                //据年底
                var timesout2 = new Date("2018/12/31 00:00:00");
                //现在时间
                var timesg = times.getTime();
                //结束时间1
                var timeoutg = timesout.getTime();
                //结束时间2
                var timeoutg2 = timesout2.getTime();
                //001
                var timescha = parseFloat(timeoutg) - parseFloat(timesg);
                var days = Math.floor(timescha / 1000 / 60 / 60 / 24);
                //002
                var timescha2 = parseFloat(timeoutg2) - parseFloat(timesg);
                var days2 = Math.floor(timescha2 / 1000 / 60 / 60 / 24);
                setTimeout(() => {
                    t.timeShow = days;
                    t.timeShow2 = days2;
                }, 100)

            },
            //冬防战报切换地图
            BusTableClick() {
                //0:空气  1:工地  2:企业 3:tvoc
                let typecode
                if (this.activeName_f == 'first_f') {
                    //0:空气
                    typecode = 0;
                } else if (this.activeName_f == 'second_f') {
                    //1:工地
                    typecode = 1;
                } else if (this.activeName_f == 'third_f') {
                    //2:企业
                    typecode = 2;
                } else if (this.activeName_f == 'fourth_f') {
                    //3:tvoc
                    typecode = 3;
                }

               // bus.$emit('targetPollution', typecode);
            },

            //案件类型占比数据
            GetCaseTypePie(){
            	const _this = this;
            	let type = $('#TypeSelect option:selected').val()?$('#TypeSelect option:selected').val():'3';
            	//分类待定
                api.GetIGyGridinfo().then(result=>{
                    console.log(result.data.data);
                    let resultData = result.data.data.map(v=>{return{value:v.id, name:v.name}})
                    let resultLend = result.data.data.map(v=>{return{name:v.name}})
                    //图表
                    _this.DataConsumptionType(resultData,resultLend);
                });
            },
            // 案件类型占比
            DataConsumptionType(data1,data2) {
        	    let value1 = data1;
                let value2 = data2;
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('CaseType'));
                // 指定图表的配置项和数据
                let option = {
					title : {
				        //text: '案件类型占比',
				        x:'left',
				        textStyle: {
                            color: '#fff'
                        },
				    },
				     tooltip : {
				        trigger: 'item',
				        formatter: "{b} : {c} ({d}%)"
				    },
				    legend: {
				    	type: 'scroll',
                        orient: 'vertical',
                        top:10,
        				right:0,
        				bottom:60,
						data:value2,
                        textStyle: {
                            color: '#fff'
                        },
                        pageTextStyle:{
                        	color:'#fff'
                        },
                    },
                    series: [
                        {
                            name: '--',
                            type: 'pie',
                            //图大小
                            radius: ['0%', '65%'],
                            //图上下
                            center:['130','40%'],
                            hoverAnimation: false,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                        position: 'inside',
                                        formatter: '{d}%'
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data:value1,
                        },

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            //获取更改要保值
            getbaoliangyouRes(qualityCode){
                api.GetBaoYouLiangRes(qualityCode).then(res =>{
                    let data = res.data.Data;
                    //console.log(data);
                    //全补数据
                    this.iscallData = data;
                    //
                    this.listDataTable = data.GskAlarms;
                })
            },
            //数据筛选要保值
            getPointByType(type) {
                let rtValue = [];
                let dt = this.listDataTable;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
                        if (item.ItemName === type) {
                            rtValue.push(dt[i]);
                        }
                    }
                }
                return rtValue;
            },
            //数据筛选要保值
            getPointByTypekey(type) {
                let rtValue = [];
                let dt = this.SoutypeData;
                if (dt) {
                    for (let i = 0, length = dt.length; i < length; i++) {
                        let item = dt[i];
                        if (item.ControlItem === type) {
                            rtValue.push(dt[i]);
                        }
                    }
                }
                return rtValue;
            },
            //排序
            compare(propertyName) {
                return function (object1, object2) {
                    let value1 = object1[propertyName];
                    let value2 = object2[propertyName];
                    return value2 - value1
                }
            },
            //切换指标筛选
            intekqzlChange(val){
                let datakey = val;
                this.kongqiData = [];
                //空气检测列表
                api.GetkqWinterPreAirControl().then(res => {

                    let data1 = res.data.Data;
                    let i = 1;
                    let data2 = data1.sort(this.compare(datakey));
                    data2.forEach(item => {
                        const tableData1 = {};
                        tableData1.xuhao = i++;//排名
                        tableData1.wlname = item.gridName ? item.gridName : '----';//城市id
                        tableData1.jiancedian = item.stationname;//纬度
                        tableData1.chaowrw = item[datakey];//经度
                        this.kongqiData.push(tableData1);
                    })
                })
            },
            //今日战报默认展示数据初始化话
            getInitDataList() {
                //获取今日控制目标和预警值及国控点数据
                // api.GetLfAirAlerts().then(res => {
                //     let data = res.data.Data;
                //     this.yujingAallData = data.data;
                // })
                //今日战报控制目标页面需要展示数据
                // api.GetLfAirAlert().then(res => {
                //     //
                //     let data = res.data.Data;
                //     //
                //     this.SoutypeData = data;
                //     //
                //     data.forEach(item =>{
                //         //今日控制目标
                //         this.SouDataList.push(item.ControlItem);
                //         //
                //     })
                // })
                //获取要保值编码
                // api.GetAirQualityRes().then(res =>{
                //     let codedata = res.data.Data;
                //     //console.log(codedata);
                //    this.qualitys = codedata;
                // })
                //模块四空气排名
                // api.GetLfAirWinterPre().then(res => {
                //     let data = res.data.Data;
                //     this.LfAirWinterPre = data;
                // })
                //模块五未来三天天气
                api.GetWeatherWinterPre().then(res => {
                    //
                    let data = res.data.Data;
                    if (data[0].minQuality == data[0].maxQuality) {this.onelan = false;}
                    if (data[1].minQuality == data[1].maxQuality) {this.twolan = false;}
                    if(data[2]){if (data[2].minQuality == data[2].maxQuality) {this.treelan = false;}}
                    this.WeatherWinterPre = data;
                });
                //企业列表数据
                api.GetqyWinterPreCompanyControl().then(res => {

                    let data2 = res.data.Data;
                    let i = 1;
                    data2.forEach(item => {
                        const tableData3 = {};
                        tableData3.SerialNumber = i++;//排名
                        tableData3.gridName = item.gridName;//城市id
                        tableData3.stationname = item.stationname;//纬度
                        tableData3.overItem = item.overItem;//经度
                        this.EnterpriseData.push(tableData3);
                    })
                })
               // 工地列表数据
             api.GetgdWinterPreDustControl().then(res => {
                 //console.log('工地数据')
                 //console.log(res)
                 let pm2510data = res.data.Data;
                 let pm25data = pm2510data.sort(this.compare('pm25'));
                 let pm10data = pm2510data.sort(this.compare('pm10'));
                 let i = 1;
                 pm25data.forEach(item => {
                     const tableData1 = {};
                     tableData1.ranking = i++;//排名
                     tableData1.gridName = item.firstgridname;//城市id
                     tableData1.stationname = item.name;//纬度
                     tableData1.pm10 = item.pm10;//经度
                     this.PM10Data.push(tableData1);
                 })
                //pm10
                 pm10data.forEach(item => {
                     const tableData2 = {};
                     tableData2.ranking = (i++) -pm2510data.length;
                     tableData2.gridName = item.firstgridname;//城市id
                     tableData2.stationname = item.name;//纬度
                     tableData2.pm25 = item.pm25;//经度
                     this.PM25Data.push(tableData2);
                 })
             })
                //Tvoc列表数据
             // api.GetWinterPreTVocControl().then(res => {
             //     let data4 = res.data.Data;
             //     let i = 1;
             //     data4.forEach(item => {
             //         const tableData4 = {};
             //         tableData4.SerialNumber = i++;//排名
             //         tableData4.gridName = item.gridName;//城市id
             //         tableData4.stationname = item.pointName;//纬度
             //         tableData4.overItem = item.tvoc;//经度
             //         this.TvocData.push(tableData4);
             //     })
             // })
                //餐饮油烟数据
                api.GetSootStatisticdata().then(res => {
                    let data4 = res.data.Data;
                    console.log('数据测试演员');
                    console.log(data4);
                    let i = 1;
                    data4.forEach((item,index) => {
                        const tableData4 = {};
                        if(index <= 9){
                            tableData4.SerialNumber = i++;//排名
                            tableData4.gridName = item.thirdGridName || '---';//城市id
                            tableData4.stationname = item.name || '---';//纬度
                            tableData4.overItem = item.concentrationOut|| '---';//经度
                        }else {
                            return false;
                        }

                        this.TvocData.push(tableData4);
                    })
                })
            },
            //获取月考核数据
           	GetMonthCheck(){
//         		let date = new Date();
//         		let month = date.getMonth()+1;
				let time = '';
//         		let year = date.getFullYear();
           		let t = this;
//         		console.log(month,year)
           		api.GetMonthCheck(time).then(res => {
           			let allData = res.data.Data;
           			console.log(allData);
           			allData.forEach(item=>{
           				item.group == '市区组'&&t.shiQuData.push(item);
           				item.group == '环京县(市)组'&&t.huanJingData.push(item);
           				item.group == '南部县(市)'&&t.nanBuData.push(item);
                        if(item.gridname === '固安县'){
                            t.hjpaim = item.rank_total;
                        }
           			})
                    // console.log(`传送石:${t.hjpaim}`);
                    // console.log(`传送石:${t.huanJingData}`);
                });
                //

           	},
            //图片背景跟换
            getImagesTarget(type) {
                let rtValue;
                if(type.indexOf('严重')!=-1){
                    rtValue = 'du-yz';
                }else if(type.indexOf('中度')!=-1){
                    rtValue = 'du-zz';
                }else if(type.indexOf('优')!=-1){
                    rtValue = 'du-y';
                }else if(type.indexOf('良')!=-1){
                    rtValue = 'du-l';
                }else if(type.indexOf('轻度')!=-1){
                    rtValue = 'du-qd';
                }else if(type.indexOf('重度')!=-1){
                    rtValue = 'du-zd';
                }
                return rtValue;
            },
            //非co进度条颜色值
            FcoBackgroundsColor(val) {
                let Degrees = val;
                let Vcolor;
                if (Degrees > 5) {

                    Vcolor = '#0f0'
                } else if (0 <= Degrees && Degrees <= 5) {

                    Vcolor = '#ff0'
                } else if (Degrees <= 0) {

                    Vcolor = '#f00'
                }
                return Vcolor;
            },
            //Co进度条颜色值
            CoBackgroundsColor(val) {
                let Degrees = val;
                let Vcolor;
                if (Degrees > 0.5) {

                    Vcolor = '#0f0'
                } else if (0 <= Degrees && Degrees <= 0.5) {

                    Vcolor = '#ff0'
                } else if (Degrees <= 0) {

                    Vcolor = '#f00'
                }
                return Vcolor;
            },
            //Co进度条颜色值
            AqiBackgroundsColor(val,type) {
                let TYPE = type;//pm2.5
                let Degrees = val;//数值
                let Vcolor;//返回颜色
                ////
                switch (TYPE){
                            case 'PM2.5':
                                if (0 <= Degrees && Degrees <= 35) {
                                    //绿色
                                    Vcolor = 'background:rgb(0,228,0);color:#fff'
                                } else if (35 <= Degrees && Degrees <= 75) {
                                    //黄色
                                    Vcolor = 'background:rgb(255,255,0);color:#000'
                                } else if (75 <= Degrees && Degrees <= 115) {
                                    //橙色
                                    Vcolor = 'background:rgb(225,126,0);color:#fff'
                                }else if (115 <= Degrees && Degrees <= 150) {
                                    //红色
                                    Vcolor = 'background:rgb(255,0,0);color:#fff'
                                }else if (150 <= Degrees && Degrees <= 250) {
                                    //紫色
                                    Vcolor = 'background:rgb(153,0,76);color:#fff'
                                }else if (Degrees >= 250) {
                                    ///黑红
                                    Vcolor = 'background:rgb(126,0,35);color:#fff'
                                }
                                break;
                            case 'PM10':
                                if (0 <= Degrees && Degrees <= 50) {
                                    //绿色
                                    Vcolor = 'background:rgb(0,228,0);color:#fff'
                                } else if (50 <= Degrees && Degrees <= 150) {
                                    //黄色
                                    Vcolor = 'background:rgb(255,255,0);color:#000'
                                } else if (150 <= Degrees && Degrees <= 250) {
                                    //橙色
                                    Vcolor = 'background:rgb(225,126,0);color:#fff'
                                }else if (250 <= Degrees && Degrees <= 350) {
                                    //红色
                                    Vcolor = 'background:rgb(255,0,0);color:#fff'
                                }else if (350 <= Degrees && Degrees <= 420) {
                                    //紫色
                                    Vcolor = 'background:rgb(153,0,76);color:#fff'
                                }else if (Degrees >= 420) {
                                    ///黑红
                                    Vcolor = 'background:rgb(126,0,35);color:#fff'
                                }
                                break;
                            case 'SO2':
                                if (0 <= Degrees && Degrees <= 50) {
                                    //绿色
                                    Vcolor = 'background:rgb(0,228,0);color:#fff'
                                } else if (50 <= Degrees && Degrees <= 150) {
                                    //黄色
                                    Vcolor = 'background:rgb(255,255,0);color:#000'
                                } else if (150 <= Degrees && Degrees <= 475) {
                                    //橙色
                                    Vcolor = 'background:rgb(225,126,0);color:#fff'
                                }else if (475 <= Degrees && Degrees <= 800) {
                                    //红色
                                    Vcolor = 'background:rgb(255,0,0);color:#fff'
                                }else if (800 <= Degrees && Degrees <= 1600) {
                                    //紫色
                                    Vcolor = 'background:rgb(153,0,76);color:#fff'
                                }else if (Degrees >= 1600) {
                                    ///黑红
                                    Vcolor = 'background:rgb(126,0,35);color:#fff'
                                }
                                break;
                            case 'CO':
                                if (0 <= Degrees && Degrees <= 2) {
                                    //绿色
                                    Vcolor = 'background:rgb(0,228,0);color:#fff'
                                } else if (2 <= Degrees && Degrees <= 4) {
                                    //黄色
                                    Vcolor = 'background:rgb(255,255,0);color:#000'
                                } else if (4 <= Degrees && Degrees <= 14) {
                                    //橙色
                                    Vcolor = 'background:rgb(225,126,0);color:#fff'
                                }else if (14 <= Degrees && Degrees <= 24) {
                                    //红色
                                    Vcolor = 'background:rgb(255,0,0);color:#fff'
                                }else if (24 <= Degrees && Degrees <= 36) {
                                    //紫色
                                    Vcolor = 'background:rgb(153,0,76);color:#fff'
                                }else if (Degrees >= 36) {
                                    ///黑红
                                    Vcolor = 'background:rgb(126,0,35);color:#fff'
                                }
                                break;
                            case 'O3':
                                if (0 <= Degrees && Degrees <= 100) {
                                    //绿色
                                    Vcolor = 'background:rgb(0,228,0);color:#fff'
                                } else if (100 <= Degrees && Degrees <= 160) {
                                    //黄色
                                    Vcolor = 'background:rgb(255,255,0);color:#000'
                                } else if (160 <= Degrees && Degrees <= 215) {
                                    //橙色
                                    Vcolor = 'background:rgb(225,126,0);color:#fff'
                                }else if (215 <= Degrees && Degrees <= 265) {
                                    //红色
                                    Vcolor = 'background:rgb(255,0,0);color:#fff'
                                }else if (265 <= Degrees && Degrees <= 800) {
                                    //紫色
                                    Vcolor = 'background:rgb(153,0,76);color:#fff'
                                }else if (Degrees >= 800) {
                                    ///黑红
                                    Vcolor = 'background:rgb(126,0,35);color:#fff'
                                }
                                break;
                            case 'NO2':
                                ///
                                if (0 <= Degrees && Degrees <= 40) {
                                    //绿色
                                    Vcolor = 'background:rgb(0,228,0);color:#fff'
                                } else if (40 <= Degrees && Degrees <= 80) {
                                    //黄色
                                    Vcolor = 'background:rgb(255,255,0);color:#000'
                                } else if (80 <= Degrees && Degrees <= 180) {
                                    //橙色
                                    Vcolor = 'background:rgb(225,126,0);color:#fff'
                                }else if (180 <= Degrees && Degrees <= 280) {
                                    //红色
                                    Vcolor = 'background:rgb(255,0,0);color:#fff'
                                }else if (280 <= Degrees && Degrees <= 565) {
                                    //紫色
                                    Vcolor = 'background:rgb(153,0,76);color:#fff'
                                }else if (Degrees >= 565) {
                                    ///黑红
                                    Vcolor = 'background:rgb(126,0,35);color:#fff'
                                }
                                break;
                        }
                        //console.log(Vcolor);
                return Vcolor;
            },
          /*gy*/
          renderSixPie() {
            let myChart = echarts.init(document.getElementById('sixPollution'));
            let option = {
              tooltip : {
                trigger: 'axis',
              },
              grid: {
                top:20,
                left: '7%',
                right: '4%',
                containLabel: false
              },
              xAxis : [
                {
                  type : 'category',
                  // data : ['固安县','安次区','开发区','广阳区','永清县','香河县','大城县','文安县','大厂县','霸州市','三河市'],
                  data : this.xAxis,
                  splitLine:{show: false},//去除网格线
                  axisPointer: {
                    type: ''
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#cccdd3'
                    }
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    rotate:45,
                    interval: 0,
                    textStyle: {
                      color: '#eee',//坐标值得具体的颜色
                    }
                  },
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  splitLine:{
                    show: true,
                    lineStyle:{
                      color:'#3e4260'
                    }
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#cccdd3'
                    }
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    textStyle: {
                      color: '#eee',//坐标值得具体的颜色

                    }
                  },
                }
              ],
              series : [
                {
                  name:'',
                  type:'bar',
                  data:this.sixPollutionData,
                  itemStyle:{
                    normal:{
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                          offset: 0,
                          color: '#ff7f12' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#fec47f' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                      },
                      barBorderRadius: [5, 5, 0, 0],
                    },
                  },
                  barWidth:10,
                },
              ]
            };
            myChart.setOption(option);

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
          getSixPollution(){
            /*获取六项污染物贡献率*/
            this.sixPollutionData = [];
            this.xAxis = [];
            let mmTime = this.MonthVal;
            api.getElectricForDay(mmTime).then(result=>{
              if(result.data.status===1){
                let res = result.data.data;
                console.log(res)
                for ( let key in res){
                  if(key!='id'&&key!='time'){
                    this.xAxis.push(this.keyChange(key));
                    this.sixPollutionData.push(res[key]);
                  }
                }
                this.renderSixPie();
              }
            })
          },
          keyChange(key){
            switch (key) {
              case 'ga':
                return '固安县';
                break;
              case 'ac':
                return '安次区';
                break;
              case 'kf':
                return '开发区';
                break;
              case 'gy':
                return '广阳区';
                break;
              case 'yq':
                return '永清县';
                break;
              case 'xh':
                return '香河县';
                break;
              case 'dcheng':
                return '大城县';
                break;
              case 'wa':
                return '文安县';
                break;
              case 'dchang':
                return '大厂县';
                break;
              case 'bz':
                return '霸州市';
                break;
              case 'sh':
                return '三河市';
                break;
            }
          },
            //切换
            timeClick(v, i) {
                this.isChoose = i;
            },
          getAirQualityData(){
            /*获取优良天数据*/
            api.GetWinterPrePollutionDaysMonthPc().then(result=>{
              console.log(result);
              if(result.data.Status===1){
                let res = result.data.Data;
                  console.log(res);
                  if(this.isSelect){
                    this.fineData = res.filter(item=>item.name==='重污染');
                    this.getAirQuality();
                  }else{
                    this.fineData = res.filter(item=>item.name==='优良天');
                    this.getAirQuality();
                  }

              }
            })
          },
          getAirQuality(){
            let myChart = echarts.init(document.getElementById('airQuality'));
            let option = {
              tooltip : {
                trigger: 'axis',
              },
              legend: {
                data:[this.fineData[0].legend+'年',this.fineData[1].legend+'年'],
                textStyle: {
                  color: '#eee'          // 图例文字颜色
                },
                itemHeight: 4,
                borderRadius: 2,
                left: 30,
                top: 0
              },
              grid: {
                top:40,
                left: '7%',
                right: '4%',
                containLabel: false
              },
              xAxis : [
                {
                  type : 'category',
                  data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                  splitLine:{show: false},//去除网格线
                  axisPointer: {
                    type: ''
                  },
                  axisLine:{
                    lineStyle:{
                      color:'#cccdd3'
                    }
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    interval: 0,
                    textStyle: {
                      color: '#eee',//坐标值得具体的颜色

                    }
                  },
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  splitLine:{
                    show: true,
                    lineStyle:{
                      color:'#3e4260'
                    }
                  },//去除网格线
                  // min: 0,
                  // max: 50,
                  // interval: 5,
                  axisLine:{
                    lineStyle:{
                      color:'#cccdd3'
                    }
                  },
                  axisTick:{
                    show:false
                  },
                  axisLabel: {
                    textStyle: {
                      color: '#eee',//坐标值得具体的颜色

                    }
                  },
                }
              ],
              series : [
                {
                  name:this.fineData[0].legend+'年',
                  type:'bar',
                  data:this.fineData[0].series.map(item=>{return item.value}),
                  itemStyle:{
                    normal:{
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                          offset: 0,
                          color: '#ff7f12' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#fec47f' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                      },
                      barBorderRadius: [5, 5, 0, 0],
                    },
                  },
                  barWidth:10,
                },
                {
                  name:this.fineData[1].legend+'年',
                  type:'bar',
                  data:this.fineData[1].series.map(item=>{return item.value}),
                  itemStyle:{
                    normal:{
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                          offset: 0,
                          color: '#4eadfd' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#05f2fe' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                      },
                      barBorderRadius: [5, 5, 0, 0],
                    },
                  },
                  barWidth:10,
                },

              ]
            };
            myChart.setOption(option);
          },
          Select(item,i){
            console.log(i);
            this.isSelect = i;
            this.getAirQualityData();
          }
        },
        components: {BattleMap, WinterProgress ,Weather},
    };


</script>
<style lang="scss" scoped>

   .Like-winter{
       width: 100%;
       height: 100%;
       color: #fff;
       background-color: #151A37;
       .warp-gtzz{
           width: 100%;
           height: calc(100% - 86px);
           .title {
               text-align: left;
               padding: 10px;
               color: rgba(18, 218, 136, 1);
               font-size: 16px;
               .line {
                   display: inline-block;
                   font-style: normal;
                   margin: -2px 8px;
                   width: 4px;
                   height: 15px;
                   background: rgba(18, 218, 136, 1);
               }
           }
           .comclass{
               background:rgba(27,33,67,1);
               box-shadow:0px 6px 13px 0px rgba(27,33,67,0.44);
               border-radius:10px;
               margin-top: 20px;
           }
           .warp-left{
               width: 30%;
               height: 100%;
               margin-left: 1%;
               float: left;

               .kq-num{
                   width: 100%;
                   height: calc(50% - 20px);
                 position: relative;
                 overflow: hidden;
                 .selecFine{
                   position: absolute;
                   right: 30px;
                   z-index: 99999;
                   span{
                     padding: 10px;
                     &:hover{
                       cursor: pointer;
                     }
                   }
                 }
                  #airQuality{
                    width: 100%;
                    height: calc(100% - 10px);
                    /*height: 100%;*/
                  }
               }
               .kq-yb{
                   width: 100%;
                   height: calc(48% - 20px);
                   overflow-y: hidden;
                   .yichu{
                       width: 570px;
                       overflow-y: hidden;
                       overflow-x: auto;
                   }
                   .data_water1,.data_water2,.data_water3 {
                       margin-top: 2%;
                       width: 33.3%;
                       height: auto;
                       padding:0 4%;
                       border-right: solid 1px #1080cc;
                       float: left;
                       p {
                           color: #fff;
                           font-size: 14px;
                           padding-bottom: 4px;
                       }
                       a {
                           display: inline-block;
                           width: 100%;
                           margin-top: 4px;
                           padding-left: 14px;
                           color: #9ea9c7;
                           font-size: 12px;
                           line-height: 16px;
                           text-align: left;
                           overflow:hidden; //超出的文本隐藏
                           text-overflow:ellipsis; //溢出用省略号显示
                           white-space:nowrap; //溢出不换行
                       }
                       span {
                           color: #fff;
                       }
                   }
                   .data_water3{
                       border-right: none;
                   }

               }
           }
           .warp-conter{
               width: 36%;
               height: 100%;
               margin: 0 1%;
               float: left;

               .map-was{
                   width: 100%;
                   height: calc(50% - 20px);
                   overflow: hidden;
                   position: relative;
                   .class-fx{
                       width: 130px;
                       height: 38px;
                       position: absolute;
                       top: 10px;
                       overflow: hidden;
                       z-index: 9999;
                       left: 10px;
                       .weather_panel{
                           margin-top: -4px;
                       }
                   }
               }
               .table-was{
                   width: 100%;
                   height: calc(48% - 20px);
                   overflow: hidden;
                   .choose{
                       width: 100%;
                       height: 80px;
                       .table-sleect{
                           width: 100%;
                           padding-top: 7px;
                           text-align: right;
                       }
                       ul {
                           width: 100%;
                           text-align: left;
                           display: inline-block;
                           border-bottom: 1px solid rgba(10, 15, 42, 1);
                           padding-left: 20px;
                           li {
                               width: 85px;
                               display: inline-block;
                               font-size: 14px;
                               font-family: MicrosoftYaHei;
                               font-weight: 400;
                               text-align: center;
                               line-height: 36px;
                               margin-right: 15px;
                           }
                           li:last-child{
                               margin-right: 0;
                           }

                           :hover {
                               cursor: pointer;
                           }
                       }
                       .checked {
                           border-bottom: 2px solid rgba(18, 218, 136, 1);
                       }

                   }
                   .tab_container{
                       width: 100%;
                       height: calc(100% - 80px);
                       overflow-y: auto;
                       overflow-x: hidden;
                   }
               }
           }
           .warp-right{
               width: 30%;
               height: 100%;
               margin-right: 1%;
               float: left;

               .yj-was{
                   width: 100%;
                   height: calc(55% - 20px);
                   .yj-title{
                       font-size:18px;
                       font-family:MicrosoftYaHei;
                       font-weight:400;
                       color:rgba(18,218,136,1);
                       line-height:46px;
                       width: 100%;
                       height: 46px;
                       text-align: center;
                       background:rgba(21,26,55,0.5);
                       box-shadow:0px 4px 6px 0px rgba(27,33,67,0.59);
                   }
                   .tt-tab{
                       width: 100%;
                       height: 40px;
                       line-height: 40px;
                       .tt-tab-l{
                           float: left;
                           font-size: 12px;
                           width: 94px;
                           height: 40px;
                           padding-left: 0px;
                           border-bottom: 1px solid #ccc;
                       }
                       .tt-tab-r{
                           float: left;
                           width:  calc(100% - 94px);
                       }
                   }
                   .item_text4{
                       overflow-x: hidden;
                       overflow-y: auto;
                       height: calc(100% - 50px);
                       .winter_bao_top{
                           width: 100%;
                           height: 90px;
                           overflow: hidden;
                           .bao_left{
                               margin-top: 3px;
                               float: left;
                               width: 80px;
                               margin-right: 0px;
                               dl{
                                   width: 80px;
                               }
                           }
                           .bao_right{
                               float: left;
                               width: calc(100% - 80px);
                               height: 60px;
                               dl{
                                   width: 15%;
                                   float: left;
                                   margin-left: 3px;
                                   .w_title{
                                       font-size: 13px;
                                   }
                                   .w_value{
                                       display: inline-block;
                                       width: 100%;
                                       height: 18px;
                                       color: #494949;
                                       line-height: 18px;
                                       border-radius: 3px;
                                   }
                                   dd{
                                       margin-top: 2px;
                                       position: relative;
                                       .jb_dian{
                                           border: solid 1px #fff;
                                           position: absolute;
                                           top:calc(50% - 3px);
                                           right: -1px;
                                           display: inline-block;
                                           width: 6px;
                                           height: 6px;
                                           border-radius: 50%;
                                           background: red;
                                       }

                                   }

                               }
                           }
                       }
                       .qxtable_bottom{
                           width: 100%;
                           height: 22px;
                           text-align: left;
                           margin-bottom: 4px;
                           color: #BECBEC;
                           .pp_tab{
                               width: 100%;
                               float: left;
                               margin:5px 0 8px 6px ;
                               line-height: 20px
                           }
                           .tb_ul{
                               float: right;
                               width: 100%;
                               height: 30px;
                               margin-right:0px;
                               overflow: hidden;
                               li{
                                   list-style: none;
                                   text-align: center;
                                   float: left;
                                   font-size: 12px;
                                   cursor: pointer;
                                   width:16.3%;
                                   border-bottom: solid 1px #000;
                               }
                               .bottomColor{
                                   border-bottom: solid 2px rgba(18,218,136,1);
                                   color: rgba(18,218,136,1);
                               }
                           }
                           i {
                               display: inline-block;
                               width: 3px;
                               height: 12px;
                               margin-right: 5px;
                               margin-top: 4px;
                               margin-left: 10px;
                               float: left;
                               background: #005BEA;
                               background: -webkit-linear-gradient(top, #00C6FB, #005BEA);
                           }
                           a {
                               padding: 0 4px;
                               color: #ccc;
                           }
                       }
                       .winter_top_table{
                           table{
                               td{
                                   height: 28px;
                               }
                               tr:nth-child(2n) {
                                   background-color: #1E254F;
                               }
                               tr:nth-child(2n+1) {
                                   background-color: #161C3A;
                               }
                           }
                       }
                       .item-kz-class{
                           width: 94%;
                           margin: 0 auto;
                           .kz-class{
                               margin-top: 10px;
                           }
                           .rb-class{
                               margin-top: 10px;
                           }
                       }
                   }
               }
               .gxl-was{
                 width: 100%;
                 height: calc(43% - 20px);
                 overflow: hidden;
                 .titleText{
                   float: left;
                 }
                 .monthSelect{
                   float: right;
                 }
                 #sixPollution{
                   width: 100%;
                   float: left;
                   height: calc(100% - 30px);
                 }
               }
           }
       }
   }


   //媒体查询
   @media only screen and (min-width: 1500px) {
       .data_water1,.data_water2,.data_water3{
           margin-top: 16%!important;
       }
   }
</style>
