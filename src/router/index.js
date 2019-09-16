import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'//登录页面
//实时监控组页面
import Index from '@/views/Index'//实时监测页面
import HighVideos from '@/views/HighVideo'//高点视频监测
//气象预报组页面
import Dynamicwindfield from '@/views/WeatherForecast/DynamicWindField'//动态风场
// import SuperStation from '@/views/WeatherForecast/SuperStation'//超级站
// import WeatherStation from '@/views/WeatherForecast/WeatherStation'//气象站
import Weather from '@/views/WeatherForecast/Weather'//天气预报
import SandDustForecast from '@/views/WeatherForecast/SandDustForecast'//沙尘预报
import FogHazeForecast from '@/views/WeatherForecast/FogHazeForecast'//雾霾预报
//大数据模块组页面
import pollution from '@/views/PollutionCalendar/pollution'//污染日历
//import LargeDataResources from '@/views/DataAnalysis/LargeDataResources'//污染物对比
//import DistrictsCounties from '@/views/DataAnalysis/DistrictsCounties'//区县打分
//import FixedSourceStatistics from '@/views/DataAnalysis/FixedSourceStatistics'//固定源统计
import SensorNetworkRanking from '@/views/DataAnalysis/SensorNetworkRanking'//传感网排名
//import MeanRatioSensorNetwork from '@/views/DataAnalysis/MeanRatioSensorNetwork'//传感网均值比
import LikeWinter from '@/views/DataAnalysis/LikeWinter'//(今日战报)冬防战报
//import AirStation from '@/views/DataAnalysis/AirStation'//乡镇空气站统计
import CityCheck from '@/views/DataAnalysis/CityCheck'//乡镇考核页面
import CountyCheck from '@/views/DataAnalysis/CountyCheck'//乡镇考核页面
import StateControl from '@/views/DataAnalysis/StateControl'//国省控排名页面
import DustRange from '@/views/DataAnalysis/DustRange'//工地扬尘排名页面
import SixParamRange from '@/views/DataAnalysis/SixParamRange'//六参数排名页面
import TvocRange from '@/views/DataAnalysis/TvocRange'//Tvoc排名页面
import CityRankings from '@/views/DataAnalysis/CityRankings'//城市排名测试页面
import TodayData from '@/views/DataAnalysis/TodayData'//今日数据页面
import RankingStatistics from '@/views/DataAnalysis/RankingStatistics'//统计排名页面
import SimultaneRate from '@/views/DataAnalysis/SimultaneRate'//同期变化率
//解决缓存以及详情页面
import ScavengingCached from '@/views/ScavengingCached/index'//不需要缓存集合页面
//后台总集成页面
import Management from '@/views/Management/Management'//后台业务数据管理
import BusinessManagement from '@/views/Management/Business/BusinessManagement'//后台业务数据管理

Vue.use(Router)

export default new Router({
    routes: [
        //登录页面
        // {
        //     path: '/Login',
        //     name: 'Login',
        //     component: Login
        // },
        //实时监控页面（主页面）
        {
            path: '/',
            name: 'index',
            meta: { keepAlive: true },
            component: Index,
            //实时监控子路由模块
            children:[
                //国省控点右侧
                {
                  path:'MonitoringPoint',
                  meta: { keepAlive: true },
                  component:resolve => require(['@/components/Monitoringpoint_new'], resolve)
                },
                //乡镇页面右侧
                {
                    path:'TownshipPanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/Township_new'], resolve)
                },
                //TVOC页面有车右侧
                {
                    path:'tvocPanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/Tvoc_new'], resolve)
                },
                //六参数页面右侧
                {
                    path:'SenPanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/Sensornetwork_new'], resolve)
                },
                //工地（在线扬尘）右侧
                {
                    path:'OnlineListPanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/OnlineList_new'], resolve)
                },
                //应急清单右侧
                {
                    path:'EmergencylistPanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/Emergencylist_new'], resolve)
                },
                //静态原清单右侧
                {
                    path:'StaticdustPanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/Staticdust_new'], resolve)
                },
                //企业部分右侧
                {
                    path:'EnterprisePanel',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/Enterprise_new'], resolve)
                },
                //散乱污视频右侧
                {
                    path:'ScatteredDirtData',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/ScatteredDirtVideo_new'], resolve)
                },
                //VOCs视频右侧
                {
                    path:'VocsVideoData',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/VocsVideo_new'], resolve)
                },
                //全民举报
                {
                    path:'ReportWholePeople',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/ReportWholePeople_new'], resolve)
                },
                //指挥 案件
                {
                    path:'ZH_Case',
                    meta: { keepAlive: true },
                    component:resolve => require(['@/components/ZH_Case'], resolve)
                },
            ]
        },
        //乡镇统计
        // {
        //     path: '/AirStation',
        //     name: 'AirStation',
        //     meta: { keepAlive: false },
        //     component: AirStation,
        // },
        //城市排名页面
        {
            path: '/CityRankings',
            name: 'cityrankings',
            meta: { keepAlive: false },
            component: CityRankings,
        },
         //工地扬尘排名页面
        {
            path: '/DustRange',
            name: 'DustRange',
            meta: { keepAlive: false },
            component: DustRange,
        },
        //污染日历
        {
            path:'/pollution',
            name: 'pollution',
            meta: { keepAlive: false },
            component: pollution,
        },
         //六参数排名页面
        {
            path: '/SixParamRange',
            name: 'SixParamRange',
            meta: { keepAlive: false },
            component: SixParamRange,
        },
         //tvoc排名页面
        {
            path: '/TvocRange',
            name: 'TvocRange',
            meta: { keepAlive: false },
            component: TvocRange,
        },
        //乡镇考核
        {
            path: '/CountyCheck',
            name: 'CountyCheck',
            meta: { keepAlive: false },
            component: CountyCheck,
        },
        //区县考核
        {
            path: '/CityCheck',
            name: 'CityCheck',
            meta: { keepAlive: false },
            component: CityCheck,
        },
        //国省控排名
        {
            path: '/StateControl',
            name: 'StateControl',
            meta: { keepAlive: false },
            component: StateControl,
        },
        //城市排名
        {
            path: '/CityRankings',
            name: 'CityRankings',
            meta: { keepAlive: false },
            component: CityRankings,
        },
         //城市排名
        {
            path: '/TodayData',
            name: 'TodayData',
            meta: { keepAlive: false },
            component: TodayData,
        },
      {
        path: '/RankingStatistics',
        name: 'RankingStatistics',
        meta: { keepAlive: false },
        component: RankingStatistics,
      },
        //传感网均值比
        // {
        //     path: '/MeanRatioSensorNetwork',
        //     name: 'Meanratiosensornetwork',
        //     meta: { keepAlive: false },
        //     component: MeanRatioSensorNetwork
        // },
        //大数据资源
        // {
        //     path: '/LargeDataResources',
        //     name: 'LargeDataResources',
        //     meta: { keepAlive: false },
        //     component: LargeDataResources
        // },
        //高点监控（视频监控页面）
        {
            path: '/HighVideos',
            name: 'heighvideos',
            component: HighVideos,
            meta: { keepAlive: false }
        },
        //同期变化率
        {
            path: '/SimultaneRate',
            name: 'Simultane-rate',
            component: SimultaneRate,
            meta: { keepAlive: false },

        },
        //解决缓存页面
        {
            path:'/ScavengingCached',
            name: 'ScavengingCached',
            component:ScavengingCached,
            meta: { keepAlive: false },
            children:[
                //官方报告详情页面
                {
                    path:'/ScavengingCached/repDetail',
                    name: 'repDetail',
                    component:resolve => require(['@/views/DataAnalysis/repDetail/detail'], resolve)
                },
            ]
        },
        //固定源统计
        // {
        //     path: '/FixedSourceStatistics',
        //     name: 'Fixedsourcestatistics',
        //     meta: { keepAlive: false },
        //     component: FixedSourceStatistics
        // },
        //传感网排名
        {
            path: '/SensorNetworkRanking',
            name: 'Sensornetworkranking',
            meta: { keepAlive: false },
            component: SensorNetworkRanking
        },
        //动态风场页面
        {
            path: '/dynamicweather',
            name: 'dynamicweather',
            meta: { keepAlive: false },
            component: Dynamicwindfield
        },
        //气象站
        // {
        //     path: '/weatherstation',
        //     name: 'weatherstation',
        //     meta: { keepAlive: false },
        //     component: WeatherStation
        // },
        //超级站
        // {
        //     path: '/superstation',
        //     name: 'superstation',
        //     meta: { keepAlive: false },
        //     component: SuperStation
        // },
        //天气预报
        {
            path: '/Weather',
            name: 'Weather',
            meta: { keepAlive: false },
            component: Weather
        },
        //区县打分
        // {
        //     path: '/DistrictsCounties',
        //     name: 'DistrictsCounties',
        //     meta: { keepAlive: false },
        //     component: DistrictsCounties
        // },
        //冬防战报（今日战报）
        {
            path: '/likewinter',
            name: 'likewinter',
            meta: { keepAlive: false },
            component: LikeWinter
        },
        //后台数据管理
        {
            path: '/Management',
            name: 'management',
            component: Management,
            meta: { keepAlive: true },
            redirect: '/Management/BusinessManagement',
            children:[
            	//基础数据管理
            	{
                    path:'/Management/BasisManagement',
                    component:resolve => require(['@/views/Management/Basis/BasisManagement'], resolve)
                },
 				//业务数据管理
				{
		            path: '/Management/BusinessManagement',
		            name: 'BusinessManagement',
		            component: BusinessManagement,
		            redirect: '/Management/BusinessManagement/Case-Review',
		            children:[
		            	//预警信息
		            	{
	                    	path:'/Management/BusinessManagement/Business-Warning',
	                    	component:resolve => require(['@/views/Management/Business/BusinessWarning'], resolve)
                		},
                		//运维记录
		            	{
	                    	path:'/Management/BusinessManagement/Business-Operation',
	                    	component:resolve => require(['@/views/Management/Business/BusinessOperation'], resolve)
                		},
                		//预警值
                		{
	                    	path:'/Management/BusinessManagement/Business-WarningVal',
	                    	component:resolve => require(['@/views/Management/Business/BusinessWarningVal'], resolve)
                		},
                		//TVOC值设置
                		{
	                    	path:'/Management/BusinessManagement/Business-TVOCVal',
	                    	component:resolve => require(['@/views/Management/Business/BusinessTVOCVal'], resolve)
                		},
                		//日数据管理
                		{
	                    	path:'/Management/BusinessManagement/Business-DayData',
	                    	component:resolve => require(['@/views/Management/Business/BusinessDayData'], resolve)
                		},
                        //官方报告
                        {
                            path:'/Management/BusinessManagement/Business-Presentation',
                            component:resolve => require(['@/views/Management/Business/BusinessPresentation'], resolve)
                        },
                        //经济数据
                        {
                            path:'/Management/BusinessManagement/Business-Economic',
                            component:resolve => require(['@/views/Management/Business/BusinessEconomicData'], resolve)
                        },
                        //运维记录
                        {
                            path:'/Management/BusinessManagement/Business-operation',
                            component:resolve => require(['@/views/Management/Business/BusinessOperation'], resolve)
                        },
                        //责任部门管理
                        {
                            path:'/Management/BusinessManagement/Business-Duty',
                            component:resolve => require(['@/views/Management/Business/BusinessDuty'], resolve)
                        },
                        //巡查员管理
                        {
                            path:'/Management/BusinessManagement/Business-Patroller',
                            component:resolve => require(['@/views/Management/Business/BusinessPatroller'], resolve)
                        },
                        //视频类型管理
                        {
                            path:'/Management/BusinessManagement/Business-Video',
                            component:resolve => require(['@/views/Management/Business/BusinessVideo'], resolve)
                        },
                        //企业污染源
                        {
                            path:'/Management/BusinessManagement/Business-Pollution',
                            component:resolve => require(['@/views/Management/Business/BusinessPollution'], resolve)
                        },
                        //饭店
                        {
                            path:'/Management/BusinessManagement/Business-Hotel',
                            component:resolve => require(['@/views/Management/Business/BusinessHotel'], resolve)
                        },
                        //工地
                        {
                            path:'/Management/BusinessManagement/Business-Slite',
                            component:resolve => require(['@/views/Management/Business/BusinessSlite'], resolve)
                        },
                        //渣土车
                        {
                            path:'/Management/BusinessManagement/Business-Car',
                            component:resolve => require(['@/views/Management/Business/BusinessCar'], resolve)
                        },
                        //BusinessElectricity.vue
                        {
                            path:'/Management/BusinessManagement/Business-Electricity',
                            component:resolve => require(['@/views/Management/Business/BusinessElectricity'], resolve)
                        },
                        //案件
                        //案件处理
                		{
	                    	path:'/Management/BusinessManagement/Case-Review',
	                    	component:resolve => require(['@/views/Management/Business/CaseReview'], resolve)
                		},
                  {
                    path:'/Management/BusinessManagement/Case-Input',
                    component:resolve => require(['@/views/Management/Business/CaseInput'], resolve)
                  },
                		//案件类型占比
                		{
	                    	path:'/Management/BusinessManagement/Case-Type',
	                    	component:resolve => require(['@/views/Management/Business/CaseType'], resolve)
                		},
                		//案件统计
                		{
	                    	path:'/Management/BusinessManagement/Case-Count',
	                    	component:resolve => require(['@/views/Management/Business/CaseCount'], resolve)
                		},
                		//调度记录
                		{
	                    	path:'/Management/BusinessManagement/Manage-Record',
	                    	component:resolve => require(['@/views/Management/Business/ManageRecord'], resolve)
                		},
                		////绩效考核
                		//明星巡查员
                		{
	                    	path:'/Management/BusinessManagement/Star-Patroller',
	                    	component:resolve => require(['@/views/Management/Business/StarPatroller'], resolve)
                		},
                		//通报巡查员
                		{
	                    	path:'/Management/BusinessManagement/Report-Patroller',
	                    	component:resolve => require(['@/views/Management/Business/ReportPatroller'], resolve)
                		},
                		{
	                    	path:'/Management/BusinessManagement/Sign-Count',
	                    	component:resolve => require(['@/views/Management/Business/SignCount'], resolve)
                		},
                		{
	                    	path:'/Management/BusinessManagement/Report-Search',
	                    	component:resolve => require(['@/views/Management/Business/ReportSearch'], resolve)
                        },
                        //版本管理
                        {
	                    	path:'/Management/BusinessManagement/Business-Version',
	                    	component:resolve => require(['@/views/Management/Business/VersionManage'], resolve)
                		},
		            ]
		        },
                
               
            
            ]
        },
        //雾霾预报
        {
            path: '/FogHazeForecast',
            name: 'foghazeforecast',
            meta: { keepAlive: false },
            component: FogHazeForecast
        },
        //沙尘预报
        {
            path: '/SandDustForecast',
            name: 'sanddustforecast',
            meta: { keepAlive: false },
            component: SandDustForecast
        }

    ]
})
