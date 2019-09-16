/**
 * Created by 96400 on 2017/7/12.
 */
import axios from 'axios';
import Qs from 'qs';
//上线正式
import {
    GetUserLoginResource,//登录接口
    GetLfAirResource,//首页面板天气模块数据
    GetLfAirPollutionResource,//首页面部累计数值
    GetMonitoringPointAccuResource, //国控点，这是累计接口
    GetMonitoringPointHourResource, //这是小时查询部分
    GetMonitoringPointRealResource,//国控点，这是实时监测点信息
    GetBulletinNoticesResource,//获取消息列表集合
    GetDustHourRankingResource,//在线源清单查询
    GetAirPieResource,//空气传感器占比统计
    GetVideoPieResource,//视频占比统计
    GetGridPieResource,//网格类型占比统计
    GetGridMemberPieResource,//网格员占比统计
    GetCompanyPointListResource,//企业在线右侧
    GetOfficeProgessResource,//企业在线右侧二
    GetycXhHbPointsRaiseResource,//扬尘在线先河
    GetXhHbPointsRaiseResource,//首页接入数据统计
    GetLfAirWinterPreResource,//空气排名预报
    GetWeatherWinterPreResource,//天气预报3天
    GetsourcetypeAllInfoResource,//静态原清单右侧
    GetallInfoBySourceTypeResource,//静态原清单类型
    GetEnterpriseDataResource,//静态原清单222
    GetCompanyStatisticsResource,//企业污染统计
    GetEmergencyListResource,//
    GetElectricityChartResource,//用电量
    GetqyWinterPreCompanyControlResource,//企业在线列表
    GetkqWinterPreAirControlResource,//空气质量检测列表
    GetgdWinterPreDustControlResource,//工地扬尘检测
    GetCompanyListResource,//应急清单企业
    GetLfAirAlertsResource,//获取今日控制目标和预警值及国控点数据
    GetWinterPreTVocControlResource,//冬防战报tvoc
    GetJingJinJiHourListResource,//京津冀城市排名
    GetElectricityChart2Resource,//大数据资源
    GetPointNameListDataResource,//国省控点数据
    GetTownListResource,//乡镇企业列表展示
    GetSingleTownResource,//乡镇企业想洗数据展示
    GetTownAnalysisListResource,//乡镇统计实时数据
    GetTownAnalysisListForDailyResource,//乡镇统计日报数据
    GetTownAnalysisListForDayResource,//乡镇统计日累计数据
    GetTownAnalysisListForQuarterResource,//乡镇统计季报数据
    GetTownAnalysisListForYearResource,//乡镇统计年报数据
    GetTownRegionResource,//乡镇区县列表
    GetTownAnalysisListForMonthResource,//乡镇统计月报数据
    GetHourConcentrationResource,//获取小时浓度及均值比
    GetDayConcentrationResource,//获取日浓度及均值比
    GetPointInfoNameResource,//获取国省控点信息
    GetCompanyHistoryDataResource,//获取一段时间内企业监测数据，包含正常、超标、异常、离线停炉标识
    ExcelHistoryDataResource,//导出一段时间内企业监测数据，包含正常、超标、异常、离线停炉标识
    GetCompanyOverLimitStatisticsResource,//获取一段时间内企业超标统计
    ExcelOverLimitStatisticsResource,//企业超标统计导出
    GetcompanyListTablaDataResource,//获取企业列表
    GetQxHourRankResource,//县区排名面板数据
    GetXhHbPointsVocResource,//voc面板
    GetVideoInfoByTypeResource,//获取高空视频监控列表
    GetTownListDataResource,//乡镇企业列表展示
    EmergencyInfoInsertResource,//新增预警信息
    GetEmergencyInfoResource,//获取预警信息
    GetEmergencyInfoUpdateResource,//编辑预警信息
    GetMonitorPointAlarmValueResource,//获取国控点预警值
    MonitorPointAlarmValueSettingResource,//国控点预警值设置
    GetTVOCAlarmValueResource,//获取TVOC预警值
    TVOCAlarmValueSettingResource,//TVOC预警值设置
    GetTVOCLevleValueResource,//获取TVOC颜色值
    TVOCLevelValueSettingResource,//TVOC颜色值设置
    GetMonthCheckResource,//获取月考核数据
    GetWinterPreComIndexMonthPcResource,//获取月度累计综指排名
    GetWinterPrePollutionDaysMonthPcResource,//月度累计空气质量
    GetWinterPreComIndexYearPcResource,//获取年度累计综指排名
    GetWinterPrePollutionDaysYearPcResource,//年度累计空气质量
    GetVideoDeviceInfoDataResource,//视频列表
    GetClassificationResource,//范测网分类查询
    GetClassificationleijiResource,//范测分类累计
    GetSixParamAirListResource,//六参数列表
    GetSixParamTypeListResource,//六参数分类
    GetEmergencyInfoListResource,//
    GetTotalCountResource,//获取视频设备接入数据统计
    GetpeortpleselectCasesResource,//全民举报列表
    GetLfAirAlertResource,//今日战报保优保良
    GetAirQualityResource, //今日战报保优保良编码
    GetBaoYouLiangResource,//今日战报保优保良切换
    GetChartByRegionResource,//EChart图表根据地址分类
    GetChartByClassificationResource,//EChart图表根据错峰类别分类
    GetFirstGridDropDownResource,//日数据管理县市区选择
    GetMonitoringDayResource,//获取日数据列表
    UpdateMonitoringDayResource,//单条修改日数据UploadFile
    UploadFileResource,//单条修改日数据
    ImportExelResource,//导出
    GetSearchAllResource,//全局搜索
    GetAssessmentResource,//乡镇考核
    GetMonitoringRankResource,//国省控点排名
    GetDustRankResource,//工地扬尘排名
    GetSixParamDayRankResource,//六参数排名
    GetTVOCRankResource,//tvoc排名
    GetSixParamCityRankResource,//城市排名
    GetEmergencyEndResource,//预警信息结束
    GetCompanyOutPutResource,//根据企业pscode获取排气口
    GetsaveEconomicDataResource,//保存经济数据
    GetselectPageDataResource,//分页查询经济数据列表
    GetselectByIdDataResource,//根据id查询经济数据
    GetFileByIdResource,//根据id下载导入的文件
    GetFileAnalysisResByIdResource,//根据id获取导入的文件解析后数据
    GetdeteletedByIdResource,//删除经济数据
    GetOperatorInfoResource,//运维记录列表
    GetOperDeviceInfoResource,//运维设备列表
    AddOperatorInfoResource,//添加运维记录
    DeleteOperatorInfoResource,//删除
    UpdateOperatorInfoResource,//编辑运维记录
    PostgfbgInsertResource,//官方报告新增数据
    PostgfbgUpdateResource,//官方报告修改数据
    GetgfbgDeleteResource,//官方报告删除数据
    GetGetListBySourceList,//官方报告前台获取列表
    GetgfbgGetListResource,//官方报告获取列表
    GetgfbgGetSourceResource,//官方报告获取来源分类
    GetgfbgSingleResource,//官方报告获取单个
    PostydInsertResource,//用电量填报
    PostydListResource,//用电量列表获取
    GetydImportExelResource,//用电量导出
    GetTownAnalysisListForCustomResource,//乡镇空气站自定义
    PostselectAllChildResource,//根据父id集合查询所有子类型
    PostselectAllParentResource,//查询所有父类型
    PostselectClassIdsGroupResource,//根据父id集合和污染源类别查询所有子类型在此项污染源上的数值(按类型分组
    PostselectByPubAndClassNetResource,//根据父id集合和污染源类别查询所有子类型在此项污染源上的数值(按网格分组
    PostselectPollutantDischargResource,//根据父id集合查询所有子类型在此项污染源上的数据
	GetCaseListResource,//案件审核列表
	GetCaseAllResource,//责任主体
	GetPollutionTypeResource,//污染类别
	GetEditCaseResource,//分配责任主体
	GetExportCaseResource,//导出案件
	GetCaseImgResource,//获取案件图片
	GetUploadImgResource,//上传案件图片
	GetEditResultResource,//处理结果
	GetDustExcelOutPutResource,//工地扬尘排名导出
	GetSixParamAirExcelOutPutResource,//六参数排名导出
	GetTVOCExcelOutPutResource,//TVOC排名导出
	DayDataUrlResource,//日数据上传
	CaseImgUpResource,//案件图片上传
    UploadAnalysisFileResource,//经济数据上传
    DianUploadFileResource,//用电量上传
	GetTownExcelOutPutResource,//乡镇空气站导出
    GetVideoScatterInfoResource,//slw
    GetVocsVideoInfoResource,//voc
    GetElectricityIndexChartResource,//大数据对比
    GetElectricityChartForDayResource,//大数据
    GetElectricityIndexChartForDayResource,//大数据对比
    GetCaseNumResource,//案件数量
    GetCaseTypeResource,//案件类型
    GetCaseTypeListResource,//案件类型占比
    GetCaseTypeExcelResource,//案件类型占比导出
    GetStaffResource,//签到统计
    GetCaseCountListResource,//案件处理率统计
    GetCaseCountListExcelResource,//案件率统计导出
    GetStarListResource,//明星巡查员列表
    GetcodeDepartmentlist,//责任部门列表
    POSTcodeDepartmentlistadd,//责任部门添加
    POSTcodeDepartmentlistdel,//责任部门删除
    POSTcodeDepartmentlistup,//责任部门添加修改
    GetsysUserlist,//巡查员管理列表接口
    POSTsysUseradd,//巡查员添加接口
    POSTsysUserdelete,//巡查员删除接口
    POSTsysUserupdate,//巡查员编辑接口
    GetStarGridNameResource,//明星巡查员姓名
    AddStarEventResource,//明星巡查员添加接口
    EditStarEventResource,//明星和通报巡查员编辑接口
    PosthtcompanyListResource,//获取企业列表（后台）
    PostAddCompanyResource,//增加企业信息
    PostupdateCompanyResource,//修改企业信息
    GetdeleteCompanyResource,//删除企业信息
    GetSingleCompanyResource,//获取单独企业信息
    GetReportListResource,//通报巡查员列表
    AddReportEventResource,//添加通报巡查员
    GetCaseAduitResource,//案件审核
    GetCaseTypePieResource,//首页案件类型占比
    GetCaseDealPerResource,//首页案件处理率同比
    GetCountyHourRankResource,//今日数据小时
    ExportStarExcelResource,//明星巡查员导出
    ExportReportExcelResource,//通报巡查员导出
    ExportResponsibilityExcel,//责任部门管理
    ExportInspector,//巡查员管理
    GetInspectorChartResource,//获取巡查员图表
    PostSchduleListResource,//获取巡查员列表
    PostSendSchduleResource,//巡查员调度
    GetsysUserPasswordResource,//巡查员管理修改密码查询
    PostchangePasswordResource,//修改密码
    GetScheduleMessageListResource,//后台调度记录列表
    GetdustResource,//沙尘天气
    GetsmogResource,//雾霾预报
    GetCountyHourAccuRankResource,//今日数据日累计
    PostjcdaddPointInfoResource,//监测点增加
    PostjcdeditPointInfoResource,//监测点编辑
    PostjcdremovePointInfoResource,//监测点删除
    GetProvincestationPageResource,//监测点列表查询
    StaffExcelOutPutResource,//签到统计导出
    ExportCountyHourRankResource,//今日数据小时导出
    GetComExcelOutPutResource,//企业污染源导出
    PostCaseInfoGroupByUserIdResource,//巡查员案件上报统计
    getCaseInfoGroupByUserIdExcelResource,//巡查员案件上报统计导出
    GetForestImgResource,//沙尘，雾霾
    GetVideoDeviceInfoResource,//获取所有监控点列表数据
    GetVideoTypeResource,//获取监控点类型
    AddVideoPointResource,//添加监控点信息
    DeleteVideoPointResource,//删除监控点信息
    UpdateVideoPointResource,//修改监控点信息
    GetVideoDeviceInfoByIdResource,//根据id获取摄像头详情
    VodeoExcelOutPutResource,//视频列表excel导出
    getAllParentResource,//获取上级姓名
	UpCaseMessage,//新增案件录入
    GetProportionResource,//同期变化率
    GetCaseListNowResource,//指挥调度案件列表
    GetLfAirProportionResource,//今日数据日月年报
    ExportProportionResource,//今日数据日月年报导出
  MonitoringExcelOutPutResource,//国省控点导出
    GetPolluteCalendarhbResource,//污染日历环比
    GetPolluteCalendartbResource,//污染日历同比
  deletedHjwfBusCaseinfoResource,//删除案件
  addappversionResource,//版本管理
} from './resource'

export default {
    /*所有接口抛出*/
    //登录地址
    GetUserLoginRes() {
        return GetUserLoginResource
    },
    //污染日历环比
    GetPolluteCalendarhb(year){
        return axios.get(GetPolluteCalendarhbResource+'year='+year,{})
    },
    //污染日历同比
    GetPolluteCalendartb(start,end){
        return axios.get(GetPolluteCalendartbResource+'start='+start+'&end='+end,{})
    },
    //同期变化率
    GetProportionRes(type){
        return axios.get(GetProportionResource+type,{})
    },
    //获取所有监控点列表数据
    GetVideoDeviceInfoR(name){
        return axios.get(GetVideoDeviceInfoResource+'name='+name,{})
    },
    //获取监控点类型
    GetVideoTypeR(){
        return axios.get(GetVideoTypeResource,{})
    },
    //添加监控点信息
    AddVideoPointR(Id,CamName,CamIndexCode,BelongDevice,Channel,DevType
                   ,SubStream,DevIndexCode,Longitude,Latitude,Type,Contact
                   ,Phone,CompanyName,CompanyAddress,Area,GridCode) {
        let params = {
            'Id':Id,//
            'CamName':CamName,//
            'CamIndexCode':CamIndexCode,//
            'BelongDevice':BelongDevice,//
            'Channel':Channel,//
            'DevType':DevType,//
            'SubStream':SubStream,//
            'DevIndexCode':DevIndexCode,//
            'Longitude':Longitude,//
            'Latitude':Latitude,//
            'Type':Type,//
            'Phone':Phone,//
            'CompanyName':CompanyName,//
            'CompanyAddress':CompanyAddress,//
            'Area':Area,//
            'GridCode':GridCode,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(AddVideoPointResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //删除监控点信息
    DeleteVideoPointR(id) {
        let params = {'id':id};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(DeleteVideoPointResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //修改监控点信息
    UpdateVideoPointR(Id,CamName,CamIndexCode,BelongDevice,Channel,DevType
        ,SubStream,DevIndexCode,Longitude,Latitude,Type,Contact
        ,Phone,CompanyName,CompanyAddress,Area,GridCode) {
        let params = {
            'Id':Id,//
            'CamName':CamName,//
            'CamIndexCode':CamIndexCode,//
            'BelongDevice':BelongDevice,//
            'Channel':Channel,//
            'DevType':DevType,//
            'SubStream':SubStream,//
            'DevIndexCode':DevIndexCode,//
            'Longitude':Longitude,//
            'Latitude':Latitude,//
            'Type':Type,//
            'Phone':Phone,//
            'CompanyName':CompanyName,//
            'CompanyAddress':CompanyAddress,//
            'Area':Area,//
            'GridCode':GridCode,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(UpdateVideoPointResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //根据id获取摄像头详情
    GetVideoDeviceInfoByIdR(id){
        return axios.get(GetVideoDeviceInfoByIdResource+'id='+ id,{})
    },
    //视频excel导出
    VodeoExcelOutPutR(name){
        window.open(VodeoExcelOutPutResource +'name='+name, {}
        )
    },
    //巡查员案件上报统计
    PostCaseInfoGroupByUser(startTime,endTime,name) {
        let params = {
            'startTime':startTime,//
            'endTime':endTime,//
            'name':name,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostCaseInfoGroupByUserIdResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //巡查员案件上报统计导出
    GetCaseInfoGroupByUserIdExcel(startTime,endTime,name) {
        //
        window.open(getCaseInfoGroupByUserIdExcelResource +'startTime='+ startTime +'&endTime='+ endTime+'&name='+name, {}
        )
    },
    //监测点列表查询
    GetProvincestationPage(condition,pageNo){
        return axios.get(GetProvincestationPageResource+'condition='+ condition+'&pageNo='+ pageNo + '&pageSize=10',{})
    },
    //监测点增加
    PostjcdaddPointInfo(id,name,pointtype,longitude,latitude,districtCounty,city,region) {
        let params = {
            'id':id,//
            'pointtype':pointtype,//
            'name':name,//
            'longitude':longitude,//
            'latitude':latitude,//
            'districtCounty':districtCounty,//
            'city':city,//
            'region':region,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostjcdaddPointInfoResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //监测点编辑
    PostjcdeditPointInfo(id,name,pointtype,longitude,latitude,districtCounty,city,region) {
        let params = {
            'id':id,//
            'pointtype':pointtype,//
            'name':name,//
            'longitude':longitude,//
            'latitude':latitude,//
            'districtCounty':districtCounty,//
            'city':city,//
            'region':region,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostjcdeditPointInfoResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //监测点删除
    PostjcdremovePointInfo(id) {
        let params = {'id':id};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostjcdremovePointInfoResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //巡查员修改密码
    GetsysUserPassword(password){
        return axios.get(GetsysUserPasswordResource+'?password='+ password ,{})
    },
    //巡查员修改密码
    PostchangePassword(userId) {
        let params = {
            'userId':userId,//
            //'password':password,//
            // 'message':message,//
            // 'sendId':sendId,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostchangePasswordResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //指挥调度巡查员饼图
    GetInspectorChartRt(name){
        return axios.get(GetInspectorChartResource+'name='+ encodeURI(name) ,{})

    },
    //指挥调度获取巡查员列表
    PostSchduleListRt(name,PageIndex=1,PageSize=10) {
        let params = {
            'name':name,//
          PageIndex,
          PageSize
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostSchduleListResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //指挥调度巡查员调度
    PostSendSchduleRt(userId,title,message,sendId) {
        //const _this = this;
        let params = {
            'userId':userId,//
            'title':title,//
            'message':message,//
            'sendId':sendId,//
        };
        let FormatParams = Qs.stringify(params,{arrayFormat: 'brackets'});//转换数据格式
        return axios.post(PostSendSchduleResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Auth':$cookies.get('auth')}
            }
        )
    },
    //获取企业列表
    PosthtcompanyListRt(name,PageIndex) {
        let params = {
            'name':name,//
            'PageIndex':PageIndex,//
            'PageSize':10,//
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PosthtcompanyListResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //增加企业信息
    PostAddCompanyRt(pscode,psname,legalperson,pollutionAddress,region,
                     industryType,companyType,pollutionScale,floorSpace,pollutionType,
                     is30Company,commissioningDate,concernExtent,areaName,drainageBasin,
                     enabled,isOnline,runningStatus,contactAddress,contactPerson,
                     emial,officePhone,mobilePhone,pollutionUrl,pollutionOffice,
                     pollutionPerson,pollutionPersonCount,remarks,latitude,
                     longitude,outlet
                     ) {
        let params = {
            'pscode':pscode,//企业编码,
            'psname':psname,//企业名称
            'legalperson':legalperson,//法定代表人
            'pollutionAddress':pollutionAddress,//污染源地址
            'region':region,//行政区划

            'industryType':industryType,//企业编码,
            'companyType':companyType,//企业名称
            'pollutionScale':pollutionScale,//法定代表人
            'floorSpace':floorSpace,//污染源地址
            'pollutionType':pollutionType,//行政区划

            'is30Company':is30Company,//企业编码,
            'commissioningDate':commissioningDate,//企业名称
            'concernExtent':concernExtent,//法定代表人
            'areaName':areaName,//污染源地址
            'drainageBasin':drainageBasin,//行政区划

            'enabled':enabled,//企业编码,
            'isOnline':isOnline,//企业名称
            'runningStatus':runningStatus,//法定代表人
            'contactAddress':contactAddress,//污染源地址
            'contactPerson':contactPerson,//行政区划

            'emial':emial,//企业编码,
            'officePhone':officePhone,//企业名称
            'mobilePhone':mobilePhone,//法定代表人
            'pollutionUrl':pollutionUrl,//污染源地址
            'pollutionOffice':pollutionOffice,//行政区划

            'pollutionPerson':pollutionPerson,//企业编码,
            'pollutionPersonCount':pollutionPersonCount,//企业名称
            'remarks':remarks,//法定代表人
            'latitude':latitude,//污染源地址
            'longitude':longitude,//行政区划

            'outlet':outlet//集合
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostAddCompanyResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //修改企业信息
    PostupdateCompanyRt(pscode,psname,legalperson,pollutionAddress,region,
                        industryType,companyType,pollutionScale,floorSpace,pollutionType,
                        is30Company,commissioningDate,concernExtent,areaName,drainageBasin,
                        enabled,isOnline,runningStatus,contactAddress,contactPerson,
                        emial,officePhone,mobilePhone,pollutionUrl,pollutionOffice,
                        pollutionPerson,pollutionPersonCount,remarks,latitude,
                        longitude,outlet
                        ) {
        let params = {
            'pscode':pscode,//企业编码,
            'psname':psname,//企业名称
            'legalperson':legalperson,//法定代表人
            'pollutionAddress':pollutionAddress,//污染源地址
            'region':region,//行政区划

            'industryType':industryType,//企业编码,
            'companyType':companyType,//企业名称
            'pollutionScale':pollutionScale,//法定代表人
            'floorSpace':floorSpace,//污染源地址
            'pollutionType':pollutionType,//行政区划

            'is30Company':is30Company,//企业编码,
            'commissioningDate':commissioningDate,//企业名称
            'concernExtent':concernExtent,//法定代表人
            'areaName':areaName,//污染源地址
            'drainageBasin':drainageBasin,//行政区划

            'enabled':enabled,//企业编码,
            'isOnline':isOnline,//企业名称
            'runningStatus':runningStatus,//法定代表人
            'contactAddress':contactAddress,//污染源地址
            'contactPerson':contactPerson,//行政区划

            'emial':emial,//企业编码,
            'officePhone':officePhone,//企业名称
            'mobilePhone':mobilePhone,//法定代表人
            'pollutionUrl':pollutionUrl,//污染源地址
            'pollutionOffice':pollutionOffice,//行政区划

            'pollutionPerson':pollutionPerson,//企业编码,
            'pollutionPersonCount':pollutionPersonCount,//企业名称
            'remarks':remarks,//法定代表人
            'latitude':latitude,//污染源地址
            'longitude':longitude,//行政区划

            'outlet':outlet//集合
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostupdateCompanyResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //删除企业信息
    GetdeleteCompanyRt(id) {
        return axios.get(GetdeleteCompanyResource  +'id='+id, {})
    },
    //获取单独企业信息
    GetSingleCompanyRt(id) {
        return axios.get(GetSingleCompanyResource  +'id='+id, {})
    },
    //巡查员管理列表接口
    GetsysUserlistdt(name,pageNo) {
        return axios.get(GetsysUserlist  +'?name='+name +'&pageNo='+pageNo+'&pageSize=10', {})
    },
    //巡查员添加接口
    POSTsysUseraddt(userId,username,status,role,name,longitude,latitude,mobile,responsibilityDepartment,parentId) {
        let params = {
            'userId':userId,//部门ID,
            'username':username,//部门编码
            'status':status,//部门名称
            'role':role,//主管领导
            'name':name,//联系方式
            'longitude':longitude,//经度
            'latitude':latitude,//纬度
            'mobile':mobile,//联系方式
            'responsibilityDepartment':responsibilityDepartment,
            'parentId':parentId,//上级
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTsysUseradd ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //巡查员删除接口
    POSTsysUserdeletet(userId,username,status,role,name) {
        let params = {
            'userId':userId,//部门ID,
            'username':username,//部门编码
            'status':status,//部门名称
            'role':role,//主管领导
            'name':name//联系方式
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTsysUserdelete ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //巡查员编辑接口
    POSTsysUserupdatet(userId,username,status,role,name,longitude,latitude,mobile,responsibilityDepartment,parentId) {
        let params = {
            'userId':userId,//部门ID,
            'username':username,//部门编码
            'status':status,//部门名称
            'role':role,//主管领导
            'name':name,//name
            'longitude':longitude,//经度
            'latitude':latitude,//纬度
            'mobile':mobile,//联系方式
            'responsibilityDepartment':responsibilityDepartment,
            'parentId': parentId,//上级
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTsysUserupdate ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //责任部门列表
    GetcodeDepartmentlistdt(name,pageNo) {
        return axios.get(GetcodeDepartmentlist +'?name='+name+'&pageNo='+pageNo+'&pageSize=10', {})
    },
    //责任部门添加接口
    POSTcodeDepartmentlistaddt(id,code,name,leader,contacts) {
        let params = {
            'id':id,//部门ID,
            'code':code,//部门编码
            'name':name,//部门名称
            'leader':leader,//主管领导
            'contacts':contacts//联系方式
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTcodeDepartmentlistadd ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //责任部门删除接口
    POSTcodeDepartmentlistdelt(id,code,name,leader,contacts) {
        let params = {
            'id':id,//部门ID,
            'code':code,//部门编码
            'name':name,//部门名称
            'leader':leader,//主管领导
            'contacts':contacts//联系方式
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTcodeDepartmentlistdel ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //责任部门编辑接口
    POSTcodeDepartmentlistupt(id,code,name,leader,contacts) {
        let params = {
            'id':id,//部门ID,
            'code':code,//部门编码
            'name':name,//部门名称
            'leader':leader,//主管领导
            'contacts':contacts//联系方式
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTcodeDepartmentlistup ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //slw视频企业信息
    GetVideoScatterInfoRes() {
        return GetVideoScatterInfoResource
    },
    //voc视频企业信息
    GetVocsVideoInfoRes() {
        return GetVocsVideoInfoResource
    },
    //大数据资源对比小时
    GetElectricityIndexChartRes(index, startTime, endTime) {
        return axios.get(GetElectricityIndexChartResource + 'index=' + index + '&startTime=' + startTime + '&endTime=' + endTime, {}
        )
    },
    //天大数据资源
    GetElectricityChartForDayRes(pointName, startTime, endTime) {
        return axios.get(GetElectricityChartForDayResource + 'pointName=' + pointName + '&startTime=' + startTime + '&endTime=' + endTime, {}
        )
    },
    //天大数据对比
    GetElectricityIndexChartForDayRes(index, startTime, endTime) {
        return axios.get(GetElectricityIndexChartForDayResource + 'index=' + index + '&startTime=' + startTime + '&endTime=' + endTime, {}
        )
    },
    //国省控小时浓度
    GetHourConcentrationRes() {
        return GetHourConcentrationResource
    },
    //经济数据上传
    UploadAnalysisFileRes() {
        return UploadAnalysisFileResource
    },
    //用电量上传
    DianUploadFileRes() {
        return DianUploadFileResource
    },
    //国省控日浓度
    GetDayConcentrationRes() {
        return GetDayConcentrationResource
    },
    //日数据上传
    DayDataUrl() {
        return DayDataUrlResource
    },
    //案件图片上传
    CaseImgUp() {
        return CaseImgUpResource
    },
    //首页天气面板数据
    GetLfAirData() {
        return axios.get(GetLfAirResource, {}
        )
    },
    //根据父id集合和污染源类别查询所有子类型在此项污染源上的数值
    PostselectClassIdsGroup(ids,pubCode) {
        let params = {
            'ids':ids,
            'pubCode':pubCode
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostselectClassIdsGroupResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //根据父id集合和污染源类别查询所有子类型在此项污染源上的数值
    PostselectByPubAndClassNet(ids,pubCode) {
        let params = {
            'ids':ids,
            'pubCode':pubCode
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostselectByPubAndClassNetResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //根据父id集合查询所有子类型在此项污染源上的数据
    PostselectPollutantDischarg(ids,page) {
        ///
        let params = {
            'ids':ids,
            "pageNo": page,
            "pageSize": 10
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostselectPollutantDischargResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //根据父id集合查询所有子类型
    PostselectAllChild(ids) {
        let params = {
            'ids':ids,
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostselectAllChildResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //查询所有父类型
    PostselectAllParent() {

        return axios.post(PostselectAllParentResource , {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //用电量填报
    PostydInsertR(time,sh,dcx,xh,ga,bz,wa,dc,kf,gy,ac,yq) {
        let params = {
            'CreateTime':time,//时间
            'sh':sh,//三河
            'dcx':dcx,//大厂县
            'xh':xh,//香河
            'ga':ga,//固安
            'bz':bz,//霸州
            'wa':wa,//文安
            'dc':dc,//大城
            'kf':kf,//开发
            'gy':gy,//广阳区
            'ac':ac,//安次区
            'yq':yq//永清县
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostydInsertResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //用电量列表数据
    PostydList(startTime,endTime) {
        //-------
        return axios.get(PostydListResource +'startTime='+startTime +'&endTime='+endTime, {}
        )
    },
    //用电量导出报表
    GetydImportExel(startTime,endTime) {
        //
        window.open(GetydImportExelResource +'startTime='+ startTime +'&endTime='+ endTime, {}
        )
    },
    //官方报告获取来源分类
    GetgfbgGetSourcer() {
        return axios.get(GetgfbgGetSourceResource, {}
        )
    },
    //官方报告获取单个
    GetgfbgSingleRe(Id) {
        return axios.get(GetgfbgSingleResource +Id, {}
        )
    },
    //官方报告删除数据
    GetgfbgDeleteR(Id) {
        return axios.get(GetgfbgDeleteResource +Id, {}
        )
    },
    //官方报告获取前台列表
    GetgfbgGetListQ(Source,Category,Title) {
        return axios.get(GetGetListBySourceList +'Source='+Source+'&Category='+Category +'&Title='+Title, {}
        )
    },
    //官方报告获取后台列表
    GetgfbgGetListR(Source,Category,Title) {
        return axios.get(GetgfbgGetListResource +'Source='+Source+'&Category='+Category +'&Title='+Title, {}
        )
    },
    //官方报告新增数据
    PostgfbgInsertR(Source,Category,Content,Title) {
        let params = {
            'Source':Source,//Source 是文件来源
            'Category':Category,//Category是文件类别
            'Content':Content,//Content  内容
            'Title':Title//Title  标题
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostgfbgInsertResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //官方报告修改数据
    PostgfbgUpdateR(ID,Source,Category,Content,Title) {
        let params = {
            'ID':ID,//ID
            'Source':Source,//Source 是文件来源
            'Category':Category,//Category是文件类别
            'Content':Content,//Content  内容
            'Title':Title//Title  标题
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(PostgfbgUpdateResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //分页查询经济数据列表
    GetsaveEconomicData1(fileName,fileType,pageSize,pageNo) {
        let params = {
            'fileName':fileName,
            'fileType':fileType,
            'pageSize':pageSize,
            'pageNo':pageNo
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetselectPageDataResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //保存经济数据
    GetsaveEconomicData2(fileName,fileType,filePath,remark) {
        let params = {
            'fileName':fileName,
            'fileType':fileType,
            'filePath':filePath,
            'remark':remark
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetsaveEconomicDataResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //根据id查询经济数据
    GetsaveEconomicData3(Id) {
        let params = {
            'id':Id
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetselectByIdDataResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )

    },
    //根据id下载导入的文件
    GetFileByIdResource(Id) {
       //
        window.open(GetFileByIdResource +'?id='+ Id, {}
        )
    },
    //根据id查询经济数据
    GetFileAnalysisResById(Id) {
        let params = {
            'id':Id
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetFileAnalysisResByIdResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )

    },
    //删除经济数据
    GetdeteletedById(Id) {
        let params = {
            'id':Id
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetdeteletedByIdResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //上传excel文件并解析
    UploadAnalysisFile() {
        let params = {
            'id':Id
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(UploadAnalysisFile ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //根据企业pscode获取排气口
    GetCompanyOutPutRes(pscode) {
        return axios.get(GetCompanyOutPutResource +pscode, {}
        )
    },
    //全局搜索
    GetSearchAllRes(layer,searchname) {
        return axios.get(GetSearchAllResource +'layer='+layer+'&searchname='+searchname, {}
        )
    },
    //EChart图表根据地址分类
    GetChartByRegion() {
        return axios.get(GetChartByRegionResource, {}
        )
    },
    //EChart图表根据错峰类别分类
    GetChartByClassification() {
        return axios.get(GetChartByClassificationResource, {}
        )
    },
    //今日战报 保优保良
    GetBaoYouLiangRes(qualityCode) {
        return axios.get(GetBaoYouLiangResource + qualityCode, {}
        )
    },
    //今日战报获取空气质量等级及编码
    GetAirQualityRes() {
        return axios.get(GetAirQualityResource, {}
        )
    },
    //全民举报列表
    GetpeortpleselectCases() {
        return axios.get(GetpeortpleselectCasesResource +'uname=&status=&pollutiontype=&departmenttype=&starttime=&endtime=', {}
        )
    },
    //获取视频设备接入数据统计
    GetTotalCountRes() {
        return axios.get(GetTotalCountResource, {}
        )
    },
    //六参数分类
    GetSixParamTypeListRes() {
        return axios.get(GetSixParamTypeListResource, {}
        )
    },
    //六参数列表
    GetSixParmAirListRes() {
        return axios.get(GetSixParamAirListResource, {}
        )
    },
    //查询六实时参数
    GetClassification(Classification) {
        return axios.get(GetClassificationResource + Classification, {}
        )
    },
    //六参数分类累计
    GetClassificationleijiR(Classification) {
        return axios.get(GetClassificationleijiResource + Classification , {}
        )
    },
    //视频列表
    GetVideoDeviceInfoData() {
        return axios.get(GetVideoDeviceInfoDataResource, {}
        )
    },
    //乡镇企业列表展示
    GetTownListDataRe(region) {
        return axios.get(GetTownListDataResource +encodeURI(region), {}
        )
    },
    //获取高空视频监控列表
    GetVideoInfoByTypeResourceData() {
        return axios.get(GetVideoInfoByTypeResource, {}
        )
    },
    //县区小时排名列表
    GetQxHourRankData() {
        return axios.get(GetQxHourRankResource, {}
        )
    },
    //voc右侧面板列表
    GetXhHbPointsVocData() {
        return axios.get(GetXhHbPointsVocResource, {}
        )
    },
    //获取企业列表
    GetcompanyListTablaDataName() {
        return axios.get(GetcompanyListTablaDataResource, {}
        )
    },
    //获取一段时间内企业监测数据
    GetCompanyHistoryDataResourceData(stat, endt, pscode ,outputcode) {
        return axios.get(GetCompanyHistoryDataResource + "startTime=" + stat + '&endTime=' + endt + '&pscode=' + pscode +'&outputcode='+ outputcode, {}
        )
    },
    //导出一段时间内企业监测数据
    ExcelHistoryDataResourceData(stat, endt, pscode ,outputcode) {
        window.open(ExcelHistoryDataResource + "startTime=" + stat + '&endTime=' + endt + '&pscode=' + pscode +'&outputcode='+ outputcode, {}
        )
    },
    //获取一段时间内企业超标统计
    GetCompanyOverLimitResourceData(stat, endt, pscode) {
        return axios.get(GetCompanyOverLimitStatisticsResource + "startTime=" + stat + '&endTime=' + endt + '&pscode=' + pscode, {}
        )
    },
    //企业超标统计导出
    ExcelOverLimitStatisticsResourceData(stat, endt, pscode) {
         window.open(ExcelOverLimitStatisticsResource + "startTime=" + stat + '&endTime=' + endt + '&pscode=' + pscode, {}
        )
    },
    //获取国省控点信息
    GetPointInfoName() {
        return axios.get(GetPointInfoNameResource, {}
        )
    },
    //获取消息列表集合
    GetBulletinNotices(WarningStatus,StartTime,EndTime,PageIndex) {
        let params = {
            'WarningStatus':WarningStatus,
            'StartTime':StartTime,
            'EndTime':EndTime,
            'PageIndex':PageIndex
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetBulletinNoticesResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //签到统计
     GetStaff(Name,BeginTime,EndTime,PageIndex,PageSize) {
        let params = {
            'Name':Name,
            'BeginTime':BeginTime,
            'EndTime':EndTime,
            'PageIndex':PageIndex,
            'PageSize':PageSize
        };
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetStaffResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )

    },
    //新增预警信息
    EmergencyInfoInsert(Content,WarningStatus,BeginTime,EndTime) {
		let params = {
			'Content':Content,
			'WarningStatus':WarningStatus,
			'BeginTime':BeginTime,
			'EndTime':EndTime
		};
		let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(EmergencyInfoInsertResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //获取预警信息
    GetEmergencyInfo() {
        return axios.get(GetEmergencyInfoResource, {}
        )
    },
    //预警信息结束
    GetEmergencyEnd(Id) {
        return axios.get(GetEmergencyEndResource+ "Id=" + Id, {}
        )
    },
    //获取预警信息列表
    GetEmergencyInfoList(WarningStatus,BeginTime,EndTime){
//  	 let params = { "":""};
		let params = {
			'WarningStatus':WarningStatus,
			'StartTime':BeginTime,
			'EndTime':EndTime
		};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetEmergencyInfoListResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //编辑预警信息
     GetEmergencyInfoUpdate(id,WarningStatus,BeginTime,EndTime,Content){
    	 let params = {
    	 	'Id':id,
        	'WarningStatus':WarningStatus,
        	'BeginTime':BeginTime,
        	'EndTime':EndTime,
        	'Content':Content
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetEmergencyInfoUpdateResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //获取国控点预警值
    GetMonitorPointAlarmValue() {
        return axios.get(GetMonitorPointAlarmValueResource, {}
        )
    },
    //国控点预警值设置
     MonitorPointAlarmValueSetting(PM25,PM10,SO2,NO2,CO,O3){
    	 let params = {
    	 	'PM25':PM25,
        	'PM10':PM10,
        	'SO2':SO2,
        	'NO2':NO2,
        	'CO':CO,
        	'O3':O3
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(MonitorPointAlarmValueSettingResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //获取TVOC预警值
    GetTVOCAlarmValue() {
        return axios.get(GetTVOCAlarmValueResource, {}
        )
    },
    //TVOC预警值设置
     TVOCAlarmValueSetting(KfqTvocValue,AcqTvocValue){
    	 let params = {
    	 	'KfqTvocValue':KfqTvocValue,
        	'AcqTvocValue':AcqTvocValue
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(TVOCAlarmValueSettingResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //获取TVOC颜色值
    GetTVOCLevleValue() {
        return axios.get(GetTVOCLevleValueResource, {}
        )
    },
    //TVOC颜色值设置
    TVOCLevelValueSetting(id,Excellent_Value,Good_Value,Mild_Value,Mod_Value,Severe_Value,Serious_Value){
    	 let params = {
    	 	'id':id,
    	 	'Excellent_Value':Excellent_Value,//优值
        	'Good_Value':Good_Value,//良值
        	'Mild_Value':Mild_Value,//轻度值
        	'Mod_Value':Mod_Value,//中度值
        	'Severe_Value':Severe_Value,//重度值
        	'Serious_Value':Serious_Value,//严重值
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(TVOCLevelValueSettingResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //获取月考核数据
    GetMonthCheck(time) {
        return axios.get(GetMonthCheckResource+'time='+time, {}
        )
    },
    //获取月累计综指排名
    GetWinterPreComIndexMonthPc(year) {
        return axios.get(GetWinterPreComIndexMonthPcResource+'year='+year, {}
        )
    },
    //获取月累计空气质量
    GetWinterPrePollutionDaysMonthPc(year) {
        return axios.get(GetWinterPrePollutionDaysMonthPcResource+'year='+year, {}
        )
    },
    //获取年累计综指排名
    GetWinterPreComIndexYearPc(year) {
        return axios.get(GetWinterPreComIndexYearPcResource+'year='+year, {}
        )
    },
    //获取年度累计空气质量
    GetWinterPrePollutionDaysYearPc(year) {
        return axios.get(GetWinterPrePollutionDaysYearPcResource+'year='+year, {}
        )
    },
     //获取日数据管理县市区
    GetFirstGridDropDown() {
        return axios.get(GetFirstGridDropDownResource, {}
        )
    },
     //获取日数据
    GetMonitoringDay(start,end,gridCode) {
        return axios.get(GetMonitoringDayResource+ "start=" + start + '&end=' + end+ '&gridCode=' + gridCode, {}
        )
    },
     // 处理
    GetEditResult(id,handlingResult,afterPath){
    	 let params = {
    	 	'id':id,
    	 	'handlingResult':handlingResult,
        	'afterPath':afterPath,
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetEditResultResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
//  GetEditResult(id,handlingResult,afterPath) {
//      return axios.get(GetEditResultResource+ "id=" + id + '&handlingResult=' + handlingResult+ '&afterPath=' + afterPath, {}
//      )
//  },
    //案件数量占比
    GetCaseNum(ids,startTime,endTime) {
    	var startTimestr="";
    	if(startTime){
    		startTimestr="&startTime="+startTime
    	}
    	var endTimestr="";
    	if(endTime){
    		endTimestr="&endTime="+endTime
    	}

        return axios.get(GetCaseNumResource+"ids=" + ids+ startTimestr+endTimestr, {}
        )
    },
    //案件类型占比
    GetCaseType(ids,startTime,endTime) {
    	var startTimestr="";
    	if(startTime){
    		startTimestr="&startTime="+startTime
    	}
    	var endTimestr="";
    	if(endTime){
    		endTimestr="&endTime="+endTime
    	}

        return axios.get(GetCaseTypeResource+"ids=" + ids+ startTimestr+endTimestr, {}
        )
    },
    //案件处理率统计
    GetCaseCountList(startTime,endTime,depcode){
    	return axios.get(GetCaseCountListResource+"startTime=" + startTime+"&endTime=" + endTime+"&depcode=" + depcode, {}
        )
    },
    //案件处理率统计导出
    GetCaseCountListExcel(startTime,endTime,depcode){
    	window.open(GetCaseCountListExcelResource+"startTime=" + startTime+"&endTime=" + endTime+"&depcode=" + depcode, {}
        )
    },
     //获取案件审核列表
    GetCaseList(userId,type,datasource,fkDepartmenttype,fkPollutiontype,location,startTime,endTime,pageSize,pageNo,casecode) {
        return axios.get(GetCaseListResource+"type=" + type+"&userId=" + userId+"&datasource=" + datasource+"&fkDepartmenttype=" + fkDepartmenttype+"&fkPollutiontype=" + fkPollutiontype+"&location="+location+"&startTime=" + startTime+"&endTime=" + endTime+"&pageSize=" + pageSize + '&pageNo=' + pageNo+ '&casecode=' + casecode, {}
        )
    },
    GetCaseListNow(status,datasource,fkDepartmenttype,fkPollutiontype,location,startTime,endTime,pageSize,pageNo) {
  return axios.get(GetCaseListNowResource+"status=" + status+"&datasource=" + datasource+"&fkDepartmenttype=" + fkDepartmenttype+"&fkPollutiontype=" + fkPollutiontype+"&location="+location+"&startTime=" + startTime+"&endTime=" + endTime+"&pageSize=" + pageSize + '&pageNo=' + pageNo, {}
  )
},
     //获取案件类型占比列表
    GetCaseTypeList(startTime,endTime,depcode) {
        return axios.get(GetCaseTypeListResource+"startTime=" + startTime+"&endTime=" + endTime+"&depcode=" + depcode, {}
        )
    },
     //导出案件
    GetExportCase(userId,type,datasource,fkDepartmenttype,fkPollutiontype,location,startTime,endTime,pageSize,pageNo) {
        window.open(GetExportCaseResource+"type=" + type+"&userId=" + userId+"&datasource=" + datasource+"&fkDepartmenttype=" + fkDepartmenttype+"&fkPollutiontype=" + fkPollutiontype+"&location="+location+"&startTime=" + startTime+"&endTime=" + endTime+"&pageSize=" + pageSize + '&pageNo=' + pageNo, {}
        )
    },
    //导出案件类型占比
    GetCaseTypeExcel(startTime,endTime,depcode) {
        window.open(GetCaseTypeExcelResource+"startTime=" + startTime+"&endTime=" + endTime+"&depcode=" + depcode, {}
        )
    },
     //分配责任主体
    GetEditCase(id,zrxtCode) {
        return axios.get(GetEditCaseResource+ "id=" + id + '&zrxtCode=' + zrxtCode, {}
        )
    },
    //获取案件图片
    GetCaseImg(caseCode ) {
        return axios.get(GetCaseImgResource+ "caseCode=" + caseCode, {}
        )
    },
    //获取案件责任主体
    GetCaseAll() {
        return axios.get(GetCaseAllResource, {}
        )
    },
    //上传案件图片
    GetUploadImg() {
      return GetUploadImgResource
    },
    //获取责任主体
    GetPollutionType() {
        return axios.get(GetPollutionTypeResource, {}
        )
    },
    //乡镇空气站自定义数据
    GetTownAnalysisListForCustom(beginTime,endTime,region) {
        return axios.get(GetTownAnalysisListForCustomResource+ "beginTime=" + beginTime + '&endTime=' + endTime+ '&region=' + region, {}
        )
    },
     //批量导入
    UploadFile(){
    	 let params = {};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(UploadFileResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //单条修改日数据
    UpdateMonitoringDay(id,item,itemValue){
    	 let params = {
    	 	'id':id,
        	'item':item,
        	'itemValue':itemValue
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(UpdateMonitoringDayResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //导出
    ImportExel(start,end,gridCode) {
        window.open(ImportExelResource+ "start=" + start + '&end=' + end+ '&gridCode=' + gridCode, {}
        )
    },
     //工地扬尘排名导出
    GetDustExcelOutPut(ranktype,starttime,endtime,fl) {
        window.open(GetDustExcelOutPutResource+ "ranktype="+ranktype+'&starttime='+ starttime+'&endtime='+endtime+'&fl='+fl, {}
        )
    },
     //乡镇空气站导出
    GetTownExcelOutPut(ranktype,starttime,endtime,fl) {
        window.open(GetTownExcelOutPutResource+ "ranktype="+ranktype+'&starttime='+ starttime+'&endtime='+endtime+'&fl='+fl, {}
        )
    },
     //六参数排名导出
    GetSixParamAirExcelOutPut(type,starttime,endtime,fl) {
        window.open(GetSixParamAirExcelOutPutResource+ "type="+type+'&starttime='+ starttime+'&endtime='+endtime+'&fl='+fl, {}
        )
    },
     //TVOC排名导出
    GetTVOCExcelOutPut(ranktype,starttime,endtime,fl) {
        window.open(GetTVOCExcelOutPutResource+ "ranktype="+ranktype+'&starttime='+ starttime+'&endtime='+endtime+'&fl='+fl, {}
        )
    },
    //乡镇企业列表展示
    GetTownList() {
        return axios.get(GetTownListResource, {}
        )
    },
    //运维记录列表
    GetOperatorInfo() {
        return axios.get(GetOperatorInfoResource, {}
        )
    },
    //运维设备列表
    GetOperDeviceInfo() {
        return axios.get(GetOperDeviceInfoResource, {}
        )
    },
    //添加运维记录
 	AddOperatorInfo(id,DeviceId,DeviceName,DeviceParam,DeviceVersion,CheckCycle,Description,ChargeMan,CreateTime,DeviceChangeInfo){
    	 let params = {
    	 	'id':id,
    	 	'DeviceId':DeviceId,
        	'DeviceName':DeviceName,
        	'DeviceParam':DeviceParam,
        	'DeviceVersion':DeviceVersion,
        	'CheckCycle':CheckCycle,
        	'Description':Description,
        	'ChargeMan':ChargeMan,
        	'CreateTime':CreateTime,
        	'DeviceChangeInfo':DeviceChangeInfo,
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(AddOperatorInfoResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //编辑运维记录
 	UpdateOperatorInfo(id,DeviceId,DeviceName,DeviceParam,DeviceVersion,CheckCycle,Description,ChargeMan,CreateTime,DeviceChangeInfo){
    	 let params = {
    	 	'id':id,
    	 	'DeviceId':DeviceId,
        	'DeviceName':DeviceName,
        	'DeviceParam':DeviceParam,
        	'DeviceVersion':DeviceVersion,
        	'CheckCycle':CheckCycle,
        	'Description':Description,
        	'ChargeMan':ChargeMan,
        	'CreateTime':CreateTime,
        	'DeviceChangeInfo':DeviceChangeInfo,
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(UpdateOperatorInfoResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //删除运维记录
 	DeleteOperatorInfo(id){
    	 let params = {
    	 	'':id
    	 };
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(DeleteOperatorInfoResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //乡镇企业详细数据展示
    GetSingleTown(StationId) {
        return axios.get(GetSingleTownResource + StationId, {}
        )
    },
    //乡镇统计实时数据
    GetTownAnalysisList(region) {
        return axios.get(GetTownAnalysisListResource + region, {}
        )
    },
    //乡镇统计月报数据
    GetTownAnalysisListForMonth(time, region) {
        return axios.get(GetTownAnalysisListForMonthResource + "time=" + time + '&region=' + region, {}
        )
    },
    //乡镇统计日报数据
    GetTownAnalysisListForDaily(Time, region) {
        return axios.get(GetTownAnalysisListForDailyResource + "Time=" + Time + '&region=' + region, {}
        )
    },
    //乡镇统计日累计数据
    GetTownAnalysisListForDay(region) {
        return axios.get(GetTownAnalysisListForDayResource + region, {}
        )
    },
    //乡镇统计季报数据
    GetTownAnalysisListForQuarter(year,quarter,region){
    	return axios.get(GetTownAnalysisListForQuarterResource +'year='+year+'&quarter='+quarter + '&region=' + region, {}
        )
    },
     //乡镇统计年报数据
    GetTownAnalysisListForYear(year,region){
    	return axios.get(GetTownAnalysisListForYearResource +'year='+year + '&region=' + region, {}
        )
    },
    //乡镇考核数据
    GetAssessment(Time,area,isQuarter) {
        return axios.get(GetAssessmentResource+'Time='+Time+ '&area=' + area + '&isQuarter=' + isQuarter, {}
        )
    },
    //乡镇区县列表
    GetTownRegion() {
        return axios.get(GetTownRegionResource, {}
        )
    },
     //国省控点排名数据
    GetMonitoringRank(ranktype, starttime,endtime) {
        return axios.get(GetMonitoringRankResource + "ranktype=" + ranktype + '&starttime=' + starttime+ '&endtime=' + endtime, {}
        )
    },
     //工地扬尘排名数据
    GetDustRank(ranktype, starttime,endtime) {
        return axios.get(GetDustRankResource + "ranktype=" + ranktype + '&starttime=' + starttime+ '&endtime=' + endtime, {}
        )
    },
     //六参数排名数据
    GetSixParamDayRank(type, starttime,endtime) {
        return axios.get(GetSixParamDayRankResource + "type=" + type + '&starttime=' + starttime+ '&endtime=' + endtime, {}
        )
    },
      //tvoc排名数据
    GetTVOCRank(ranktype, starttime,endtime) {
        return axios.get(GetTVOCRankResource + "ranktype=" + ranktype + '&starttime=' + starttime+ '&endtime=' + endtime, {}
        )
    },
    //城市排名数据
    GetSixParamCityRank(type, starttime,endtime) {
        return axios.get(GetSixParamCityRankResource + "type=" + type + '&starttime=' + starttime+ '&endtime=' + endtime, {}
        )
    },
    //国省控点数据
    GetPointNameListData() {
        return axios.get(GetPointNameListDataResource, {}
        )
    },
    //大数据资源
    GetElectricityChart2(a, b, c) {
        return axios.get(GetElectricityChart2Resource + 'pointName=' + a + '&startTime=' + b + '&endTime=' + c, {}
        )
    },
    //京津冀城市排名
    GetJingJinJiHourList() {
        return axios.get(GetJingJinJiHourListResource, {}
        )
    },
    //获取冬防战报tvoc
    GetWinterPreTVocControl() {
        return axios.get(GetWinterPreTVocControlResource, {}
        )
    },
    //获取今日控制目标和预警值及国控点数据
    GetLfAirAlerts() {
        return axios.get(GetLfAirAlertsResource, {}
        )
    },
    //应急清单企业
    GetCompanyList() {
        return axios.get(GetCompanyListResource, {}
        )
    },
    //企业在线列表
    GetqyWinterPreCompanyControl() {
        return axios.get(GetqyWinterPreCompanyControlResource, {}
        )
    },
    //空气质量检测列表
    GetkqWinterPreAirControl() {
        return axios.get(GetkqWinterPreAirControlResource, {}
        )
    },
    //工地扬尘检测
    GetgdWinterPreDustControl() {
        return axios.get(GetgdWinterPreDustControlResource, {}
        )
    },
    //用电量
    GetElectricityChart() {
        return axios.get(GetElectricityChartResource, {}
        )
    },
    //应急清单
    GetEmergencyList() {
        return axios.get(GetEmergencyListResource, {}
        )
    },
    //企业污染统计
    GetCompanyStatistics() {
        return axios.get(GetCompanyStatisticsResource, {}
        )
    },
    //静态原清单饼图
    GetEnterpriseData(sourceType ,pw) {
        return axios.get(GetEnterpriseDataResource +sourceType+ '&pw='+pw, {}
        )
    },
    //空气排名预报
    GetLfAirWinterPre() {
        return axios.get(GetLfAirWinterPreResource, {}
        )
    },
    //天气预报3天
    GetWeatherWinterPre() {
        return axios.get(GetWeatherWinterPreResource, {}
        )
    },
    //静态原清单类型
    GetallInfoBySourceType(type, PollutionValue, page) {
        return axios.get(GetallInfoBySourceTypeResource + type + '&pw='+ PollutionValue + "&pageIndex=" + page + "&pageSize=10", {}
        )
    },
    //静态原清单右侧
    GetsourcetypeAllInfo(type) {
        return axios.get(GetsourcetypeAllInfoResource + type, {}
        )
    },
    //今日控制目标，预警 ，保优保良
    GetLfAirAlert() {
        return axios.get(GetLfAirAlertResource, {}
        )
    },
    //在线扬尘先河
    GetycXhHbPointsRaise() {
        return axios.get(GetycXhHbPointsRaiseResource, {}
        )
    },
    //企业在线右侧
    GetCompanyPointList() {
        return axios.get(GetCompanyPointListResource, {}
        )
    },
    //企业在线右侧二
    GetOfficeProgess() {
        return axios.get(GetOfficeProgessResource, {}
        )
    },
    //首页接入数据统计
    GetXhHbPoints() {
        return axios.get(GetXhHbPointsRaiseResource, {}
        )
    },
    //首页传感器统计
    GetAirPie() {
        return axios.get(GetAirPieResource, {}
        )
    },
    //首页视频统计
    GetVideoPie() {
        return axios.get(GetVideoPieResource, {}
        )
    },
    //首页网格类型占比统计
    GetGridPie() {
        return axios.get(GetGridPieResource, {}
        )
    },
    //首页网格员占比统计
    GetGridMemberPie() {
        return axios.get(GetGridMemberPieResource, {}
        )
    },
    //首页面部累计数值
    GetLfAirPollution() {
        return axios.get(GetLfAirPollutionResource, {}
        )
    },
    //国控点，这是累计接口默认不传pointlevel参数，返回国控点和省控点全部数据
    GetMonitoringPointAccu() {
        return axios.get(GetMonitoringPointAccuResource, {}
        )
    },
    //这是小时查询部分，默认pointlevel不传，返回所有国控点和省控点
    GetMonitoringPointHour(time) {
        return axios.get(GetMonitoringPointHourResource + time + "&pointLevel=", {}
        )
    },
    //国控点，这是实时监测点信息，默认pointlevel不传，返回所有监测点
    GetMonitoringPointReal() {
        return axios.get(GetMonitoringPointRealResource, {}
        )
    },
    //传感网数据查询
    GetDustHourRanking(requestTime) {
        return axios.get(GetDustHourRankingResource + 'requestTime=' + requestTime, {}
        )
    },
    //明星巡查员列表
    GetStarList(userId,pageSize,pageNo){
    	return axios.get(GetStarListResource + 'userId=' + userId+"&pageSize="+pageSize+"&pageNo="+pageNo, {}
        )
    },
     //明星巡查员姓名
 	GetStarGridName(){
 		let params = {};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetStarGridNameResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    AddStarEvent(userId,userName,money,event,comment){
    	let params = {
    		'userId':userId,
    		'userName':userName,
    		'event':event,
    		'comment':comment,
    		'money':money
    	};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(AddStarEventResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    EditStarEvent(id,userId,userName,money,event,comment){
    	let params = {
    		'id':id,
    		'userId':userId,
    		'userName':userName,
    		'event':event,
    		'comment':comment,
    		'money':money
    	};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(EditStarEventResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //通报巡查员列表
    GetReportList(userId,pageSize,pageNo){
    	return axios.get(GetReportListResource + 'userId=' + userId+"&pageSize="+pageSize+"&pageNo="+pageNo, {}
        )
    },
    //添加通报巡查员
    AddReportEvent(userId,userName,money,event,comment){
    	let params = {
    		'userId':userId,
    		'userName':userName,
    		'event':event,
    		'comment':comment,
    		'money':money
    	};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(AddReportEventResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //案件审核
    GetCaseAduit(id,state){
    	let params = {
    		'id':id,
    		'state':state
    	};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetCaseAduitResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //首页案件类型占比
    GetCaseTypePie(type){
    	return axios.get(GetCaseTypePieResource + 'type=' + type, {}
        )
    },
    //首页案件处理率同比
    GetCaseDealPer(){
    	return axios.get(GetCaseDealPerResource, {}
        )
    },
    //今日数据小时
    GetCountyHourRank(){
    	return axios.get(GetCountyHourRankResource, {}
        )
    },
    //明星巡查员导出
    ExportStarExcel(userId){
    	window.open(ExportStarExcelResource+'userId='+ userId,{})
    },
    //通报巡查员导出
    ExportReportExcel(userId){
    	window.open(ExportReportExcelResource+'userId='+ userId,{})
    },
    //责任部门管理导出
    ExportResponsibilityExcel(){
        window.open(ExportResponsibilityExcel,{})
    },
    //巡查员管理导出
    ExportInspectorExcel(){
        window.open(ExportInspector,{})
    },
    //后台调度记录列表
    GetScheduleMessageList(beginTime,endTime,PageIndex,PageSize){
    	let params = {
    		'beginTime':beginTime,
    		'endTime':endTime,
    		'PageIndex':PageIndex,
    		'PageSize':PageSize
    	};
    	 let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetScheduleMessageListResource ,FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //沙尘天气
    Getdust(){
    	return axios.get(GetdustResource, {}
        )
    },
    //雾霾预报
    Getsmog(){
    	return axios.get(GetsmogResource, {}
        )
    },
    //今日数据日累计
    GetCountyHourAccuRank(){
    	return axios.get(GetCountyHourAccuRankResource, {}
        )
    },
    //签到统计导出
    StaffExcelOutPut(Name,BeginTime,EndTime,PageIndex,PageSize){
    	window.open(StaffExcelOutPutResource+'Name=' + Name + '&BeginTime=' + BeginTime+ '&EndTime=' + EndTime+ '&PageIndex=' + PageIndex+ '&PageSize=' + PageSize, {}
        )
    },
    //今日数据小时导出
    ExportCountyHourRank(type){
    	window.open(ExportCountyHourRankResource+'type='+type,{})
    },
    //企业污染源导出
    GetComExcelOutPut(name){
    	window.open(GetComExcelOutPutResource+'name='+name,{})
    },
    //沙尘雾霾
    GetForestImg() {
        return GetForestImgResource
    },
    GetAllParent(type){
      let params = {
        'type':type
      };
      let FormatParams = Qs.stringify(params);//转换数据格式
      return axios.post(getAllParentResource ,FormatParams, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      )
    },
		//新增案件录入
		addCaseList(userId,creater,casecode, netname, createtime, dispatchTime, closeTime, datasource, fkDepartmenttype, fkPollutiontype, description,handlingResult,urls,aftercaseimg,location,status) {
			let params = {
				'creater': creater,//上报人
				'casecode': casecode,//案件序号
				'netname': netname,//乡镇名称
				'createtime': createtime,//案发时间
				'dispatchTime': dispatchTime,//派发时间
				'closeTime': closeTime,//结案时间
				'datasource': datasource,//案件来源
				'fkDepartmenttype': fkDepartmenttype,//责任主体
				'fkPollutiontype': fkPollutiontype,//污染类型
				'description': description,//案前描述
				'handlingResult': handlingResult,//案后描述
				'urls': urls,//案前照片
				'aftercaseimg': aftercaseimg,//案后照片
				'location': location,//地址
				'status': status,//地址
        'userId': userId,//录入人Id
			};
			let FormatParams = Qs.stringify(params);//转换数据格式
			return axios.post(UpCaseMessage, FormatParams, {
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}
			)
		},
  //今日数据日月年报
  GetProportion(type,time){
    return axios.get(GetLfAirProportionResource+'time='+time+'&type='+type,{})
  },
  //今日数据日月年报导出
  ExportProportion(type,time){
    window.open(ExportProportionResource+'time='+time+'&type='+type,{})
  },
  //国省控日月年报导出
  MonitoringExcelOutPut(ranktype,starttime,endtime){
    window.open(MonitoringExcelOutPutResource+'ranktype='+ranktype+'&starttime='+starttime+'&endtime='+endtime,{})
  },
  //删除案件
  addappversion(versionnum,remark,apkurl,apkname,versioninfo){
    let params = {
      'versionnum':versionnum,
      'remark':remark,
      'apkurl':apkurl,
      'apkname':apkname,
      'versioninfo':versioninfo
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(addappversionResource ,FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },

}
