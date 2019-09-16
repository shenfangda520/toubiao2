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
  SupResponsibilityRatioResource,//查询网格员占比图
  SuperviseCaseGridRatioResource,//查询责任主体占比图
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
  GetselectPageDataResource,//分页查询经济数据列表
  GetFileByIdResource,//根据id下载导入的文件
  GetFileAnalysisResByIdResource,//根据id获取导入的文件解析后数据
  MemberListOutPutResource,//巡查员管理-网格员导出
  GetOperatorInfoResource,//运维记录列表
  GetOperDeviceInfoResource,//运维设备列表
  AddOperatorInfoResource,//添加运维记录
  DeleteOperatorInfoResource,//删除
  UpdateOperatorInfoResource,//编辑运维记录
  UpdatePasswordResource,//巡查员管理-修改密码
  ResetPasswordResource,//巡查员管理-重置密码
  DeleteGridMemberResource,//巡查员管理-删除巡查员
  UpdateGridMemberResource,//巡查员管理-修改巡查员
  GetGridMemberSingleResource,//巡查员管理-获取巡查员
  InsertGridMemberResource,//巡查员管理-新增巡查员
  GetGridMemberResource,//巡查员管理-获取巡查员列表
  PostydInsertResource,//用电量填报
  PostydListResource,//用电量列表获取
  GetydImportExelResource,//用电量导出
  GetTownAnalysisListForCustomResource,//乡镇空气站自定义
  CpostCaseListResource,//
  CgetCaseDetailResource,//
  CgetExcelOutPutResource,//
  CgetEventSourceResource,//
  CgetEventTypeResource,//
  CgetResponsibleDepartResource,//
  CgetEventStatusResource,//
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
  GetStarListResource,//明星-通报-巡查员列表
  GetcodeDepartmentlist,//责任部门列表
  POSTcodeDepartmentlistadd,//责任部门添加
  POSTcodeDepartmentlistdel,//责任部门删除
  POSTcodeDepartmentlistup,//责任部门添加修改
  ForResponsibility,//解禁责任主体
  GetStarmemberGridNameResource,//明星-通报-巡查员信息
  AddStarEventResource,//明星巡查员添加接口
  EditStarEventResource,//明星和通报巡查员-下拉
  PosthtcompanyListResource,//获取企业列表（后台）
  PostAddCompanyResource,//增加企业信息
  PostupdateCompanyResource,//修改企业信息
  GetdeleteCompanyResource,//删除企业信息
  GetSingleCompanyResource,//获取单独企业信息
  AddReportEventResource,//添加通报巡查员
  GetCaseAduitResource,//案件审核
  GetCaseTypePieResource,//首页案件类型占比
  GetCaseDealPerResource,//首页案件处理率同比
  GetCountyHourRankResource,//今日数据小时
  GetPostSelectBoxResource,//巡查员管理-获取岗位下拉
  GetOrgSelectBoxResource,//巡查员管理-获取组织下拉
  ExcelOutPutMemberResource,//通报-明星-巡查员导出
  ExportResponsibilityExcel,//责任部门管理
  GetEmergencyListsResource,//获取应急清单列表
  GetEmergencyDataResource,//获取应急清单
  InsertEmergencyResource,//新增应急清单
  DeleteEmergencyResource,//删除应急清单
  GetInspectorChartResource,//获取巡查员图表
  PostSchduleListResource,//获取巡查员列表
  PostSendSchduleResource,//巡查员调度
  POSTDeviceStatus,//后台管理设备状态
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
  addCaseListResource,//广阳添加案件
  getCompanysResource,//广阳企业列表
  getGyGridinfoResource,//广阳网格选择
  GetCompanysListResource,//查询公司违规次数列表
  GetIGyGridinfoResource,//查询所有网格信息
  GetSootPointListDataResource,//餐饮油烟-右侧列表

  getOilGasRecoveryChartResource, // 油烟回收检测-右侧列表
  getOilGasRecoveryListResource, // 油烟回收检测-右侧列表
  getTailGasMonitoringCharsResource, // 尾气监测-右侧列表
  getTailsGasMonitoringListResource, // 尾气监测-右侧列表

  PostselectAllChildResource,//大气原清单集合查询所有子类型
  PostselectAllParentResource,//大气原清单查询所有父类型
  PostselectClassIdsGroupResource,//大气原清单集合和污染源类别查询污染源上的数值
  PostselectByPubAndClassNetResource,//大气原清单根据子类型在此项污染源上的数值
  PostselectPollutantDischargResource,//大气原清单查询所有子类型在此项污染源上的数据


  SiteDustListDataResource,//工地-右侧列表
  VocsListDataResource,//VOC-右侧列表
  GetSootPointListResource,//餐饮油烟监测列表
  getCompanyCamerasResource,//企业下摄像头列表
  updateCompanyCamerasResource,//编辑摄像头
  GetCameraListResource,//视频列表获取
  GetEmergencyPlanListResource,//获取应急预案列表
  SelectBigSuperviseCaseResource,//督查案件大速记
  GetSootStatisticdataResource,//今日战报餐饮
  removeCompanyCamerasResource,//删除摄像头
  GetEmergencyResource,///应急预案详情
  GetEmergencyFileResource,//预案文件
  GetCompanyByNamedtResource,//获取企业基本信息
  GetAreaQualityRankResource,//
  /**大数据平台**/
  getGuangyangAirQualitySixPersource,//六项污染物
  GetCountySixHourResource,//
  GetGuangyangAirQualityBingResource,//
  getCountyRankingsource,//区县排名
  exportCountDatasource,//区县排名导出
  getCountyRateDatasource,//同期变化率
  getCountyRateDataExcelsource,//同期变化率导出
  GetPolluteCalendarhbResource,//污染日历
  getElectricForDaysource,//用电量
  getLFGuangyangCityListResource, // 廊坊城市列表
  getGuangyangControllValueResource, // 控制值
  getGuangyangCityListTimeDataResource, //控制值实时污染物
  getGuangyangCompareKzhResource // 对比城市
} from './resource'

export default {
  /*所有接口抛出*/
  //登录地址
  GetUserLoginRes() {
    return GetUserLoginResource
  },
    //污染日历环比
    GetPolluteCalendarhb(year,type){
        return axios.get(GetPolluteCalendarhbResource+'year='+year+'&type='+type,{})
    },
   //获取通知
    GetAreaQualityRankRes() {
        return axios.get(GetAreaQualityRankResource , {})
    },
    //获取企业信息表
    GetCompanyByNamedata(companyname) {
        return axios.get(GetCompanyByNamedtResource +'companyname='+encodeURI(companyname), {})
    },
    //今日战报餐饮
    GetSootStatisticdata() {
        return axios.get(GetSootStatisticdataResource, {})
    },
    //获取应急清单列表
    GetEmergencyListsRes(Title,BeginTime,EndTime,PageIndex) {
        return axios.get(GetEmergencyListsResource +'Title='+Title+'&BeginTime='+BeginTime+'&EndTime='+EndTime+'&PageIndex='+PageIndex+'&PageSize=10', {})
    },
    //获取应急清单
    GetEmergencyDataRes(Id) {
        return axios.get(GetEmergencyDataResource +Id, {})
    },
    //新增应急清单
    InsertEmergencyRes() {
        return InsertEmergencyResource
    },
    //删除应急清单
    DeleteEmergencyRes(Id) {
        return axios.get(DeleteEmergencyResource+Id, {})
    },
    //获取治理设备状态
    GetDeviceStatus(type,name,starttime,endtime,PageIndex) {
        let params = {type,name,starttime,endtime,PageIndex};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(POSTDeviceStatus, FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //大数据督查案件
    SelectBigSuperviseCase(dataSource,companyType,type) {
        let params = {dataSource,companyType,type};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(SelectBigSuperviseCaseResource, FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //视频列表获取
    GetCameraList() {
        return axios.get(GetCameraListResource, {})
    },
    //餐饮油烟-右侧列表
    GetSootPointList() {
        return axios.get(GetSootPointListResource, {})
    },
    //餐饮油烟-右侧列表
    GetSootPointListData(data) {
        return axios.get(GetSootPointListDataResource+ encodeURI(data), {})
    },
    // 尾气检测以及油烟回收-右侧部分
    getOilGasRecoveryChartData(data) {
        return axios.get(getOilGasRecoveryChartResource+ encodeURI(data), {})
    },
    getOilGasRecoveryListData(data) {
        return axios.get(getOilGasRecoveryListResource+ encodeURI(data), {})
    },
    getTailGasMonitoringCharsData(data) {
        return axios.get(getTailGasMonitoringCharsResource+ encodeURI(data), {})
    },
    getTailsGasMonitoringListData(data) {
        return axios.get(getTailsGasMonitoringListResource+ encodeURI(data), {})
    },
    
    
    //工地-右侧列表
    SiteDustListData(data) {
        return axios.get(SiteDustListDataResource+ encodeURI(data), {})
    },
    //VOC-右侧列表
    VocsListData(data) {
        return axios.get(VocsListDataResource + encodeURI(data), {})
    },
    //查询所有网格信息
    GetIGyGridinfo() {
        let params = {};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetIGyGridinfoResource, FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //获取所有监控点列表数据
    GetCompanysList(companyName,gridid,gridName,responsibilityid,startTime,endTime,type) {
        let params = {companyName, gridid,gridName, responsibilityid,startTime,endTime, type};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(GetCompanysListResource, FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
  //获取所有监控点列表数据
  GetVideoDeviceInfoR(companyName,gridName,type) {
    let params = {
      'companyName': companyName,
      'gridName': gridName,
      'type': type,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetVideoDeviceInfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //获取监控点类型
  GetVideoTypeR() {
    return axios.get(GetVideoTypeResource, {})
  },
  //添加监控点信息
  AddVideoPointR(Id, name, cameraCode, deviceCode, channelCode, deviceType
    , flowCode, latitude, longitude, cameraType, contact, phoneNum
    , companyId, area, areaCode,status) {
    let params = {
      'Id': Id,//
      'name': name,//
      'cameraCode': cameraCode,//
      'deviceCode': deviceCode,//
      'channelCode': channelCode,//
      'deviceType': deviceType,//
      'flowCode': flowCode,//
      'latitude': latitude,//
      'longitude': longitude,//
      'cameraType': cameraType,//
      'contact': contact,//
      'phoneNum': phoneNum,//
      'companyId': companyId,//
      'area': area,//
      'areaCode': areaCode,
      'status': status,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(AddVideoPointResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //删除监控点信息
  DeleteVideoPointR(id) {
    let params = {'id': id};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(DeleteVideoPointResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //修改监控点信息
  UpdateVideoPointR(Id, name, cameraCode, deviceCode, channelCode, deviceType
    , flowCode, latitude, longitude, cameraType, contact, phoneNum
    , companyId, area, areaCode,status) {
    let params = {
      'Id': Id,//
      'name': name,//
      'cameraCode': cameraCode,//
      'deviceCode': deviceCode,//
      'channelCode': channelCode,//
      'deviceType': deviceType,//
      'flowCode': flowCode,//
      'latitude': latitude,//
      'longitude': longitude,//
      'cameraType': cameraType,//
      'contact': contact,//
      'phoneNum': phoneNum,//
      'companyId': companyId,//
      'area': area,//
      'areaCode': areaCode,//
      'status': status,//
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UpdateVideoPointResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //根据id获取摄像头详情
  GetVideoDeviceInfoByIdR(id) {
    return axios.get(GetVideoDeviceInfoByIdResource + 'id=' + id, {})
  },
  //视频企业列表导出
  VodeoExcelOutPutR(param,companyName,gridName,type) {
    window.open(VodeoExcelOutPutResource + 'param=' + param+ '&companyName=' + companyName+ '&gridName=' + gridName+ '&type=' + type, {}
    )
  },
    //案件处理列表
    CpostCaseList(RecordingTimeStart, RecordingTimeEnd, EventSource,EventTypeCode,EventStatusCode,GridName) {
        let params = {RecordingTimeStart, RecordingTimeEnd, EventSource,EventTypeCode,EventStatusCode,GridName};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(CpostCaseListResource, FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
    //案件详情
    CgetCaseDetail(Id) {
        return axios.get(CgetCaseDetailResource +Id, {})
    },
    //案件导出
    CgetExcelOutPut(RecordingTimeStart, RecordingTimeEnd, EventSource,EventTypeCode,EventStatusCode,GridName) {
        //
        window.open(CgetExcelOutPutResource + 'EventSource=' + EventSource+ 'EventTypeCode=' + EventTypeCode+ 'EventStatusCode=' + EventStatusCode+ 'RecordingTimeStart=' + RecordingTimeStart + '&RecordingTimeEnd=' + RecordingTimeEnd + '&GridName=' + GridName, {}
        )
    },
    //案件来源
    CgetEventSource() {
        return axios.get(CgetEventSourceResource, {})
    },
    //案件类型
    CgetEventType() {
        return axios.get(CgetEventTypeResource, {})
    },
    //案件责任部门
    CgetResponsibleDepart() {
        return axios.get(CgetResponsibleDepartResource, {})
    },
    //案件状态
    CgetEventStatus() {
        return axios.get(CgetEventStatusResource, {})
    },
  //巡查员案件上报统计
  PostCaseInfoGroupByUser(RecordingTimeStart, RecordingTimeEnd, LoginName) {
    let params = {
        RecordingTimeStart,//
        RecordingTimeEnd,//
        LoginName,//
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostCaseInfoGroupByUserIdResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //巡查员案件上报统计导出
  GetCaseInfoGroupByUserIdExcel(RecordingTimeStart, RecordingTimeEnd, LoginName) {
    //
    window.open(getCaseInfoGroupByUserIdExcelResource + 'RecordingTimeStart=' + RecordingTimeStart + '&RecordingTimeEnd=' + RecordingTimeEnd + '&LoginName=' + LoginName, {}
    )
  },
  //监测点列表查询
  GetProvincestationPage(condition, pageNo) {
    return axios.get(GetProvincestationPageResource + 'condition=' + condition + '&pageNo=' + pageNo + '&pageSize=10', {})
  },
  //监测点增加
  PostjcdaddPointInfo(id, name, pointtype, longitude, latitude, districtCounty, city, region) {
    let params = {id, pointtype,name, longitude, latitude, districtCounty, city, region};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostjcdaddPointInfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //监测点编辑
  PostjcdeditPointInfo(id, name, pointtype, longitude, latitude, districtCounty, city, region) {
      let params = {id, pointtype,name, longitude, latitude, districtCounty, city, region};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostjcdeditPointInfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //监测点删除
  PostjcdremovePointInfo(id) {
    let params = {id};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostjcdremovePointInfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //巡查员重置密码
  ResetPassword(id) {
      //return axios.get(ResetPasswordResource + id, {})
      let params = {id};
      let FormatParams = Qs.stringify(params);//转换数据格式
      return axios.post(ResetPasswordResource + id, FormatParams, {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
      )
  },
  //巡查员修改密码
  PostchangePassword(Id, OldPassword,NewPassword) {
    let params = {Id, OldPassword,NewPassword};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UpdatePasswordResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //指挥调度巡查员饼图
  GetInspectorChartRt(name) {
    return axios.get(GetInspectorChartResource + 'name=' + encodeURI(name), {})

  },
  //指挥调度获取巡查员列表
  PostSchduleListRt(name, PageIndex = 1, PageSize = 10) {
    let params = {
      'name': name,//
      PageIndex,
      PageSize
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostSchduleListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //指挥调度巡查员调度
  PostSendSchduleRt(userId, title, message, sendId) {
    //const _this = this;
    let params = {
      'userId': userId,//
      'title': title,//
      'message': message,//
      'sendId': sendId,//
    };
    let FormatParams = Qs.stringify(params, {arrayFormat: 'brackets'});//转换数据格式
    return axios.post(PostSendSchduleResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Auth': $cookies.get('auth')}
      }
    )
  },
  //获取企业列表
  PosthtcompanyListRt(name, PageIndex) {
    let params = {
      'name': name,//
      'PageIndex': PageIndex,//
      'PageSize': 10,//
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PosthtcompanyListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //增加企业信息
  PostAddCompany(warningColor,name, type, address, gridId, contact,
                 phoneNum, responsibilityId, jhqlx, ztgs, fjmc,
                 jhqmc, szType,latitude,longitude,industry,
                 coverarea,measures,investment,process
  ) {
    let params = {
      'warningColor': warningColor,//预警状态,
      'name': name,//企业名称,
      'type': type,//企业类型
      'address': address,//地址
      'gridId': gridId,//网格
      'contact': contact,//联系人
      'phoneNum': phoneNum,//联系电话
      'responsibilityId': responsibilityId,//责任主体
      'jhqlx': jhqlx,//净化器类型
      'ztgs': ztgs,//灶头个数
      'fjmc': fjmc,//风机名称
      'jhqmc': jhqmc,//净化器名称,
      'szType': szType,//河道水质
      'latitude': latitude,//纬度
      'longitude': longitude,//经度
      'industry': industry,
      'coverarea': coverarea,
      'measures': measures,
      'investment': investment,
      'process': process,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostAddCompanyResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //修改企业信息
  PostupdateCompany(warningColor,id,name, type, address, gridId, contact,
                    phoneNum, responsibilityId, jhqlx, ztgs, fjmc,
                    jhqmc, szType,latitude,longitude,industry,
                    coverarea,measures,investment,process,scale
  ) {
    let params = {
      'warningColor': warningColor,//预警状态
      'id': id,
      'name': name,//企业名称,
      'type': type,//企业类型
      'address': address,//地址
      'gridId': gridId,//网格
      'contact': contact,//联系人
      'phoneNum': phoneNum,//联系电话
      'responsibilityId': responsibilityId,//责任主体
      'jhqlx': jhqlx,//净化器类型
      'ztgs': ztgs,//灶头个数
      'fjmc': fjmc,//风机名称
      'jhqmc': jhqmc,//净化器名称,
      'szType': szType,//河道水质
      'latitude': latitude,//纬度
      'longitude': longitude,//经度
      'industry': industry,
      'coverarea': coverarea,
      'measures': measures,
      'investment': investment,
      'process': process,
      'scale': scale,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostupdateCompanyResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //删除企业信息
  GetdeleteCompany(id) {
    let params = {
      'id': id
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetdeleteCompanyResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //获取单独企业信息
  GetSingleCompanyRt(id) {
    return axios.get(GetSingleCompanyResource + 'id=' + id, {})
  },
  //巡查员岗位下拉列表
    GetPostSelectBoxRe(Id) {
        return axios.get(GetPostSelectBoxResource +Id, {})
    },
    //巡查员组织下拉列表
    GetOrgSelectBoxfd() {
        return axios.get(GetOrgSelectBoxResource, {})
    },
  //巡查员管理列表接口
  GetsysUserlistdt(MemberName,OrgId,PostId, PageIndex) {
    return axios.get(GetGridMemberResource +'&MemberName='+MemberName+'&OrgId='+OrgId+'&PostId='+PostId+'&PageIndex='+PageIndex+'&PageSize=10', {})
  },
    //获取巡查员
    GetGridMemberSingledata(id){
        return axios.get(GetGridMemberSingleResource + id, {})
    },
  //巡查员添加接口
  POSTsysUseraddt(LoginName, Name, Sex, Birthday, Nation, OrgId, PostId, Longitude, Latitude,Email,Address, LoginApp,LoginPC,ContactInformation,IsHandling) {
    let params = {LoginName, Name, Sex, Birthday, Nation, OrgId, PostId, Longitude, Latitude,Email,Address, LoginApp,LoginPC,ContactInformation,IsHandling};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(InsertGridMemberResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //巡查员删除接口
  POSTsysUserdeletet(Id) {
    let params = {Id};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(DeleteGridMemberResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //巡查员编辑接口
  POSTsysUserupdatet(Id, LoginName, Name, Sex, Birthday, Nation, OrgId, PostId, Longitude, Latitude,Email,Address, LoginApp,LoginPC,ContactInformation,IsHandling) {
    let params = {Id, LoginName, Name, Sex, Birthday, Nation, OrgId, PostId, Longitude, Latitude,Email,Address, LoginApp,LoginPC,ContactInformation,IsHandling};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UpdateGridMemberResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //责任部门列表
  GetcodeDepartmentlistdt(name) {
      let params = {name};
      let FormatParams = Qs.stringify(params);//转换数据格式
      return axios.post(GetcodeDepartmentlist, FormatParams, {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          }
      )
  },
  //责任部门添加接口
  POSTcodeDepartmentlistaddt(id, name, address, contact, phoneNum) {
    let params = {id, name, address, contact, phoneNum};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(POSTcodeDepartmentlistadd, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //责任部门禁用接口
  POSTcodeDepartmentlistdelt(id) {
    let params = {id};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(POSTcodeDepartmentlistdel, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //责任部门解禁接口
  POSTForResponsibility(id) {
        let params = {id};
        let FormatParams = Qs.stringify(params);//转换数据格式
        return axios.post(ForResponsibility, FormatParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        )
    },
  //责任部门编辑接口
  POSTcodeDepartmentlistupt(id, name, address, contact, phoneNum) {
    let params = {id, name, address, contact, phoneNum};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(POSTcodeDepartmentlistup, FormatParams, {
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

  //用电量填报
  PostydInsertR(time, sh, dcx, xh, ga, bz, wa, dc, kf, gy, ac, yq) {
    let params = {
      'CreateTime': time,//时间
      'sh': sh,//三河
      'dcx': dcx,//大厂县
      'xh': xh,//香河
      'ga': ga,//固安
      'bz': bz,//霸州
      'wa': wa,//文安
      'dc': dc,//大城
      'kf': kf,//开发
      'gy': gy,//广阳区
      'ac': ac,//安次区
      'yq': yq//永清县
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(PostydInsertResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //用电量列表数据
  PostydList(startTime, endTime) {
    return axios.get(PostydListResource + 'startTime=' + startTime + '&endTime=' + endTime, {}
    )
  },
  //用电量导出报表
  GetydImportExel(startTime, endTime) {
    //
    window.open(GetydImportExelResource + 'startTime=' + startTime + '&endTime=' + endTime, {}
    )
  },

  //分页查询经济数据列表
  GetsaveEconomicData1(fileName, fileType, pageSize, pageNo) {
    let params = {
      'fileName': fileName,
      'fileType': fileType,
      'pageSize': pageSize,
      'pageNo': pageNo
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetselectPageDataResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },

  //根据id下载导入的文件
  GetFileByIdResource(Id) {
    //
    window.open(GetFileByIdResource + '?id=' + Id, {}
    )
  },
  //根据id查询经济数据
  GetFileAnalysisResById(Id) {
    let params = {
      'id': Id
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetFileAnalysisResByIdResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )

  },
  //查询责任主体占比
    SupResponsibilityRatio(companyType, startTime, endTime) {
    let params = {companyType, startTime, endTime};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(SupResponsibilityRatioResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
    //查询网格员占比
    SuperviseCaseGridRatio(companyType, startTime, endTime,companyName) {
      let params = {companyType, startTime, endTime,companyName};
      let FormatParams = Qs.stringify(params);//转换数据格式
      return axios.post(SuperviseCaseGridRatioResource, FormatParams, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      )
    },
  //上传excel文件并解析
  UploadAnalysisFile() {
    let params = {
      'id': Id
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UploadAnalysisFile, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //根据企业pscode获取排气口
  GetCompanyOutPutRes(pscode) {
    return axios.get(GetCompanyOutPutResource + pscode, {}
    )
  },
  //全局搜索
  GetSearchAllRes(layer, searchname) {
    return axios.get(GetSearchAllResource + 'layer=' + layer + '&searchname=' + searchname, {}
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
    return axios.get(GetClassificationleijiResource + Classification, {}
    )
  },
  //视频列表
  GetVideoDeviceInfoData() {
    return axios.get(GetVideoDeviceInfoDataResource, {}
    )
  },
  //乡镇企业列表展示
  GetTownListDataRe(region) {
    return axios.get(GetTownListDataResource + encodeURI(region), {}
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
  GetCompanyHistoryDataResourceData(stat, endt, pscode, outputcode) {
    return axios.get(GetCompanyHistoryDataResource + "startTime=" + stat + '&endTime=' + endt + '&pscode=' + pscode + '&outputcode=' + outputcode, {}
    )
  },
  //导出一段时间内企业监测数据
  ExcelHistoryDataResourceData(stat, endt, pscode, outputcode) {
    window.open(ExcelHistoryDataResource + "startTime=" + stat + '&endTime=' + endt + '&pscode=' + pscode + '&outputcode=' + outputcode, {}
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
  GetBulletinNotices(WarningStatus, StartTime, EndTime, PageIndex) {
    let params = {
      'WarningStatus': WarningStatus,
      'StartTime': StartTime,
      'EndTime': EndTime,
      'PageIndex': PageIndex
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetBulletinNoticesResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //签到统计
  GetStaff(TownName,Name, BeginTime, EndTime, PageIndex, PageSize) {
    let params = {TownName, Name, BeginTime, EndTime, PageIndex, PageSize};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetStaffResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )

  },
  //新增预警信息
  EmergencyInfoInsert(Content, WarningStatus, BeginTime, EndTime) {
    let params = {
      'Content': Content,
      'WarningStatus': WarningStatus,
      'BeginTime': BeginTime,
      'EndTime': EndTime
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(EmergencyInfoInsertResource, FormatParams, {
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
    return axios.get(GetEmergencyEndResource + "Id=" + Id, {}
    )
  },
  //获取预警信息列表
  GetEmergencyInfoList(WarningStatus, BeginTime, EndTime,PageIndex,PageSize) {
//  	 let params = { "":""};
    let params = {
      'WarningStatus': WarningStatus,
      'StartTime': BeginTime,
      'EndTime': EndTime,
      'PageIndex': PageIndex,
      'PageSize': PageSize
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetEmergencyInfoListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //编辑预警信息
  GetEmergencyInfoUpdate(id, WarningStatus, BeginTime, EndTime, Content) {
    let params = {
      'Id': id,
      'WarningStatus': WarningStatus,
      'BeginTime': BeginTime,
      'EndTime': EndTime,
      'Content': Content
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetEmergencyInfoUpdateResource, FormatParams, {
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
  MonitorPointAlarmValueSetting(PM25, PM10, SO2, NO2, CO, O3) {
    let params = {
      'PM25': PM25,
      'PM10': PM10,
      'SO2': SO2,
      'NO2': NO2,
      'CO': CO,
      'O3': O3
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(MonitorPointAlarmValueSettingResource, FormatParams, {
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
  TVOCAlarmValueSetting(KfqTvocValue, AcqTvocValue) {
    let params = {
      'KfqTvocValue': KfqTvocValue,
      'AcqTvocValue': AcqTvocValue
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(TVOCAlarmValueSettingResource, FormatParams, {
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
  TVOCLevelValueSetting(id, Excellent_Value, Good_Value, Mild_Value, Mod_Value, Severe_Value, Serious_Value) {
    let params = {
      'id': id,
      'Excellent_Value': Excellent_Value,//优值
      'Good_Value': Good_Value,//良值
      'Mild_Value': Mild_Value,//轻度值
      'Mod_Value': Mod_Value,//中度值
      'Severe_Value': Severe_Value,//重度值
      'Serious_Value': Serious_Value,//严重值
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(TVOCLevelValueSettingResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //获取月考核数据
  GetMonthCheck(time) {
    return axios.get(GetMonthCheckResource + 'time=' + time, {}
    )
  },
  //获取月累计综指排名
  GetWinterPreComIndexMonthPc(year) {
    return axios.get(GetWinterPreComIndexMonthPcResource + 'year=' + year, {}
    )
  },
  //获取月累计空气质量
  GetWinterPrePollutionDaysMonthPc() {
    return axios.get(GetWinterPrePollutionDaysMonthPcResource, {}
    )
  },
  //获取年累计综指排名
  GetWinterPreComIndexYearPc(year) {
    return axios.get(GetWinterPreComIndexYearPcResource + 'year=' + year, {}
    )
  },
  //获取年度累计空气质量
  GetWinterPrePollutionDaysYearPc(year) {
    return axios.get(GetWinterPrePollutionDaysYearPcResource + 'year=' + year, {}
    )
  },
  //获取日数据管理县市区
  GetFirstGridDropDown() {
    return axios.get(GetFirstGridDropDownResource, {}
    )
  },
  //获取日数据
  GetMonitoringDay(start, end, gridCode) {
    return axios.get(GetMonitoringDayResource + "start=" + start + '&end=' + end + '&gridCode=' + gridCode, {}
    )
  },
  // 处理
  GetEditResult(id, handlingResult, afterPath) {
    let params = {
      'id': id,
      'handlingResult': handlingResult,
      'afterPath': afterPath,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetEditResultResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //案件数量占比
  GetCaseNum(ids, startTime, endTime) {
    var startTimestr = "";
    if (startTime) {
      startTimestr = "&startTime=" + startTime
    }
    var endTimestr = "";
    if (endTime) {
      endTimestr = "&endTime=" + endTime
    }

    return axios.get(GetCaseNumResource + "ids=" + ids + startTimestr + endTimestr, {}
    )
  },
  //案件类型占比
  GetCaseType(ids, startTime, endTime) {
    var startTimestr = "";
    if (startTime) {
      startTimestr = "&startTime=" + startTime
    }
    var endTimestr = "";
    if (endTime) {
      endTimestr = "&endTime=" + endTime
    }

    return axios.get(GetCaseTypeResource + "ids=" + ids + startTimestr + endTimestr, {}
    )
  },
  //案件处理率统计
  GetCaseCountList(startTime, endTime, depcode) {
    return axios.get(GetCaseCountListResource + "startTime=" + startTime + "&endTime=" + endTime + "&depcode=" + depcode, {}
    )
  },
  //案件处理率统计导出
  GetCaseCountListExcel(startTime, endTime, depcode) {
    window.open(GetCaseCountListExcelResource + "startTime=" + startTime + "&endTime=" + endTime + "&depcode=" + depcode, {}
    )
  },
  //获取案件审核列表
  GetCaseList(caseType, responsibilityid, startTime, endTime, pageSize, pageNo, companytype,source) {
    let params = {
      'caseType': caseType,//案件类型
      'responsibilityid': responsibilityid,//责任主体
      'startTime': startTime,//开始时间
      'endTime': endTime,//结束时间
      'pageSize': pageSize,
      'pageNo': pageNo,
      'companytype': companytype,//企业类型
      'source': source,//案件来源
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetCaseListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //添加案件
  addCaseList(companyId,name, sendPeople, feedbackPeople, caseType, sendTime, feedbackTime, videoFootage, caseDescript, feedbackDescript,feedbackFootage,source) {
    let params = {
      'companyId': companyId,//企业
      'name': name,//案件名称
      'sendPeople': sendPeople,//发送人
      'feedbackPeople': feedbackPeople,//反馈人
      'caseType': caseType,//案件类型
      'sendTime': sendTime,//发送时间
      'feedbackTime': feedbackTime,//反馈时间
      'videoFootage': videoFootage,//视频截图
      'caseDescript': caseDescript,//案情描述
      'feedbackDescript': feedbackDescript,//反馈结果
      'feedbackFootage': feedbackFootage,//案后图片
      'source': source,//案件来源
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(addCaseListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //获取案件类型占比列表
  GetCaseTypeList(startTime, endTime, responsibilityid) {
    let params = {
      'startTime': startTime,
      'endTime': endTime,
      'responsibilityid': responsibilityid,//责任主体
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetCaseTypeListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //广阳导出督查案件
  GetExportCase(caseType, responsibilityid, startTime, endTime, pageSize, pageNo, companytype) {
    window.open(GetExportCaseResource + "caseType=" + caseType + "&responsibilityid=" + responsibilityid + "&startTime=" + startTime + "&endTime=" + endTime + "&pageSize=" + pageSize + "&pageNo=" + pageNo + "&pageSize=" + pageSize + '&pageNo=' + pageNo+'&companytype='+companytype , {}
    )
  },
  //导出案件类型占比
  GetCaseTypeExcel(startTime, endTime, responsibilityid) {
    window.open(GetCaseTypeExcelResource + "startTime=" + startTime + "&endTime=" + endTime + "&responsibilityid=" + responsibilityid, {}
    )
  },
  //分配责任主体
  GetEditCase(id, zrxtCode) {
    return axios.get(GetEditCaseResource + "id=" + id + '&zrxtCode=' + zrxtCode, {}
    )
  },
  //获取案件图片
  GetCaseImg(caseCode) {
    return axios.get(GetCaseImgResource + "caseCode=" + caseCode, {}
    )
  },
  //获取案件责任主体
  GetCaseAll() {
    let params = {};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetCaseAllResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //上传案件图片
  GetUploadImg() {
    return axios.get(GetUploadImgResource, {}
    )
  },
  //获取责任主体
  GetPollutionType() {
    return axios.get(GetPollutionTypeResource, {}
    )
  },
  //乡镇空气站自定义数据
  GetTownAnalysisListForCustom(beginTime, endTime, region) {
    return axios.get(GetTownAnalysisListForCustomResource + "beginTime=" + beginTime + '&endTime=' + endTime + '&region=' + region, {}
    )
  },
  //批量导入
  UploadFile() {
    let params = {};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UploadFileResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //单条修改日数据
  UpdateMonitoringDay(id, item, itemValue) {
    let params = {
      'id': id,
      'item': item,
      'itemValue': itemValue
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UpdateMonitoringDayResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //导出
  ImportExel(start, end, gridCode) {
    window.open(ImportExelResource + "start=" + start + '&end=' + end + '&gridCode=' + gridCode, {}
    )
  },
  //工地扬尘排名导出
  GetDustExcelOutPut(ranktype, starttime, endtime, fl) {
    window.open(GetDustExcelOutPutResource + "ranktype=" + ranktype + '&starttime=' + starttime + '&endtime=' + endtime + '&fl=' + fl, {}
    )
  },
  //乡镇空气站导出
  GetTownExcelOutPut(ranktype, starttime, endtime, fl) {
    window.open(GetTownExcelOutPutResource + "ranktype=" + ranktype + '&starttime=' + starttime + '&endtime=' + endtime + '&fl=' + fl, {}
    )
  },
  //六参数排名导出
  GetSixParamAirExcelOutPut(type, starttime, endtime, fl) {
    window.open(GetSixParamAirExcelOutPutResource + "type=" + type + '&starttime=' + starttime + '&endtime=' + endtime + '&fl=' + fl, {}
    )
  },
  //TVOC排名导出
  GetTVOCExcelOutPut(ranktype, starttime, endtime, fl) {
    window.open(GetTVOCExcelOutPutResource + "ranktype=" + ranktype + '&starttime=' + starttime + '&endtime=' + endtime + '&fl=' + fl, {}
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
  AddOperatorInfo(id, DeviceId, DeviceName, DeviceParam, DeviceVersion, CheckCycle, Description, ChargeMan, CreateTime, DeviceChangeInfo) {
    let params = {
      'id': id,
      'DeviceId': DeviceId,
      'DeviceName': DeviceName,
      'DeviceParam': DeviceParam,
      'DeviceVersion': DeviceVersion,
      'CheckCycle': CheckCycle,
      'Description': Description,
      'ChargeMan': ChargeMan,
      'CreateTime': CreateTime,
      'DeviceChangeInfo': DeviceChangeInfo,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(AddOperatorInfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //编辑运维记录
  UpdateOperatorInfo(id, DeviceId, DeviceName, DeviceParam, DeviceVersion, CheckCycle, Description, ChargeMan, CreateTime, DeviceChangeInfo) {
    let params = {
      'id': id,
      'DeviceId': DeviceId,
      'DeviceName': DeviceName,
      'DeviceParam': DeviceParam,
      'DeviceVersion': DeviceVersion,
      'CheckCycle': CheckCycle,
      'Description': Description,
      'ChargeMan': ChargeMan,
      'CreateTime': CreateTime,
      'DeviceChangeInfo': DeviceChangeInfo,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(UpdateOperatorInfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //删除运维记录
  DeleteOperatorInfo(id) {
    let params = {
      '': id
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(DeleteOperatorInfoResource, FormatParams, {
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
  GetTownAnalysisListForQuarter(year, quarter, region) {
    return axios.get(GetTownAnalysisListForQuarterResource + 'year=' + year + '&quarter=' + quarter + '&region=' + region, {}
    )
  },
  //乡镇统计年报数据
  GetTownAnalysisListForYear(year, region) {
    return axios.get(GetTownAnalysisListForYearResource + 'year=' + year + '&region=' + region, {}
    )
  },
  //乡镇考核数据
  GetAssessment(Time, area, isQuarter) {
    return axios.get(GetAssessmentResource + 'Time=' + Time + '&area=' + area + '&isQuarter=' + isQuarter, {}
    )
  },
  //乡镇区县列表
  GetTownRegion() {
    return axios.get(GetTownRegionResource, {}
    )
  },
  //国省控点排名数据
  GetMonitoringRank(cityType, dataType) {
    return axios.get(GetMonitoringRankResource + "cityType=" + cityType + '&dataType=' + dataType, {}
    )
  },
  //工地扬尘排名数据
  GetDustRank(ranktype, starttime, endtime,PageIndex,PageSize) {
    return axios.get(GetDustRankResource + "ranktype=" + ranktype + '&starttime=' + starttime + '&endtime=' + endtime+ '&PageIndex=' + PageIndex+ '&PageSize=' + PageSize, {}
    )
  },
  //六参数排名数据
  GetSixParamDayRank(type, starttime, endtime) {
    return axios.get(GetSixParamDayRankResource + "type=" + type + '&starttime=' + starttime + '&endtime=' + endtime, {}
    )
  },
  //tvoc排名数据
  GetTVOCRank(ranktype, starttime, endtime) {
    return axios.get(GetTVOCRankResource + "ranktype=" + ranktype + '&starttime=' + starttime + '&endtime=' + endtime, {}
    )
  },
  //城市排名数据
  GetSixParamCityRank(type, starttime, endtime) {
    return axios.get(GetSixParamCityRankResource + "type=" + type + '&starttime=' + starttime + '&endtime=' + endtime, {}
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
  GetEnterpriseData(sourceType, pw) {
    return axios.get(GetEnterpriseDataResource + sourceType + '&pw=' + pw, {}
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
    return axios.get(GetallInfoBySourceTypeResource + type + '&pw=' + PollutionValue + "&pageIndex=" + page + "&pageSize=10", {}
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
  //明星-通报-巡查员列表
  GetStarList(townname, membername, star,PageIndex,PageSize) {
    return axios.get(GetStarListResource + 'townname='+townname+'&membername='+membername+'&star='+star+'&PageIndex='+PageIndex+'&PageSize='+PageSize, {}
    )
  },
    //通报巡查员导出-明星巡查员导出
    ExcelOutPutMemberExcel(townname, membername, star,PageIndex,PageSize) {
        window.open(ExcelOutPutMemberResource + 'townname='+townname+'&membername='+membername+'&star='+star+'&PageIndex='+PageIndex+'&PageSize='+PageSize, {})
    },
  //明星-通报-巡查员姓名
  GetStarGridName() {
    return axios.get(EditStarEventResource, {})
  },
    //明星-通报-查看信息
    GetStarmemberGridName(Id) {
        return axios.get(GetStarmemberGridNameResource +Id, {})
    },
    //明星巡查员添加
  AddStarEvent(GridMember, Deeds, Bonus, Reward, Remarks) {
      let params = {GridMember, Deeds, Bonus, Reward, Remarks};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(AddStarEventResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },

  //通报巡查员添加
  AddReportEvent(GridMember, Deeds, Bonus, Reward, Remarks) {
    let params = {GridMember, Deeds, Bonus, Reward, Remarks};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(AddReportEventResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //案件审核
  GetCaseAduit(id, state) {
    let params = {
      'id': id,
      'state': state
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetCaseAduitResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //首页案件类型占比
  GetCaseTypePie(type) {
    return axios.get(GetCaseTypePieResource + 'type=' + type, {}
    )
  },
  //首页案件处理率同比
  GetCaseDealPer() {
    return axios.get(GetCaseDealPerResource, {}
    )
  },
  //今日数据小时
  GetCountyHourRank(time,pageindex) {
    return axios.get(GetCountyHourRankResource+"time="+time+"&pageindex="+pageindex, {}
    )
  },
  //责任部门管理导出
  ExportResponsibilityExcel() {
    window.open(ExportResponsibilityExcel, {})
  },
  //巡查员管理导出
  ExportInspectorExcel(MemberName,OrgId,PostId,PageIndex) {
    window.open(MemberListOutPutResource+'&MemberName='+MemberName+'&OrgId='+OrgId+'&PostId='+PostId+'&PageIndex='+PageIndex+'&PageSize=10', {})
  },
  //后台调度记录列表
  GetScheduleMessageList(beginTime, endTime, PageIndex, PageSize) {
    let params = {
      'beginTime': beginTime,
      'endTime': endTime,
      'PageIndex': PageIndex,
      'PageSize': PageSize
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(GetScheduleMessageListResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //沙尘天气
  Getdust() {
    return axios.get(GetdustResource, {}
    )
  },
  //雾霾预报
  Getsmog() {
    return axios.get(GetsmogResource, {}
    )
  },
  //今日数据日累计
  GetCountyHourAccuRank(time,pageindex) {
    return axios.get(GetCountyHourAccuRankResource+'time='+time+'&pageindex='+pageindex, {}
    )
  },
  //签到统计导出
  StaffExcelOutPut(TownName, Name, BeginTime, EndTime, PageIndex, PageSize) {
    window.open(StaffExcelOutPutResource + 'TownName='+ TownName +'Name=' + Name + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize, {}
    )
  },
  //今日数据小时导出
  ExportCountyHourRank(time,type) {
    window.open(ExportCountyHourRankResource + 'time=' + time + '&type=' + type, {})
  },
  //企业污染源导出
  GetComExcelOutPut(name) {
    window.open(GetComExcelOutPutResource + 'name=' + name, {})
  },
  //沙尘雾霾
  GetForestImg() {
    return GetForestImgResource
  },
  GetAllParent(type) {
    let params = {
      'type': type
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(getAllParentResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //企业列表
  getCompanys() {
    let params = {};
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(getCompanysResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //网格选择
  getGyGridinfo(){
    let params = {
      'gridType':'2',//二级网格
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(getGyGridinfoResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  //企业下摄像头列表
  getCompanyCameras(companyId){
    let params = {
      'companyId':companyId,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(getCompanyCamerasResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  ///应急预案列表
  GetEmergencyPlanList(Title,BeginTime,EndTime,PageIndex,PageSize) {
   return axios.get(GetEmergencyPlanListResource+'Title='+Title+'&BeginTime='+BeginTime+'&EndTime='+EndTime+'&PageIndex='+PageIndex+'&PageSize='+PageSize, {}
  )
},
  ///应急预案详情
  GetEmergency(id) {
    return axios.get(GetEmergencyResource+'id='+id, {}
    )
  },
  GetEmergencyFile(){
    return GetEmergencyFileResource
  },
  //企业下摄像头列表
  removeCompanyCameras(id){
    let params = {
      'id':id,
    };
    let FormatParams = Qs.stringify(params);//转换数据格式
    return axios.post(removeCompanyCamerasResource, FormatParams, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    )
  },
  /***大数据平台**/
  getGuangyangAirQualitySixPersource(mmTime) {
    return axios.get(getGuangyangAirQualitySixPersource+'mmTime='+mmTime, {}
    )
  },
    //
    GetCountySixHourResourcePersource(mmTime) {
        return axios.get(GetCountySixHourResource+'ddTime='+mmTime, {}
        )
    },
    //
    GetGuangyangAirQualityBingResourcePersource(mmTime) {
        return axios.get(GetGuangyangAirQualityBingResource+'ddTime='+mmTime, {}
        )
    },
    // 控制值
     GetGuangyangControllValueResource(type) {
        return axios.get(getGuangyangControllValueResource+'type='+type, {}
        )
    },
    // 城市列表
    GetLFGuangyangCityListResource(type) {
        return axios.get(getLFGuangyangCityListResource, {})
    },
    
    GetGuangyangCityListTimeDataResource(type) {
        return axios.get(getGuangyangCityListTimeDataResource, {}
        )
    },
     GetGuangyangCompareKzhResource(type,cityCode) {
        return axios.get(getGuangyangCompareKzhResource+'type='+type+'&cityCode='+cityCode, {}
        )
    },
    
  //区县排名
    getCountyRanking(type,starttime,endtime) {
        return axios.get(getCountyRankingsource+'type='+type+'&starttime='+starttime+'&endtime='+endtime, {}
        )
    },
  //视频企业列表导出
  exportCountData(type,starttime,endtime) {
    window.open(exportCountDatasource + 'type=' + type+ '&starttime=' + starttime+ '&endtime=' + endtime+ '&type=' + type, {}
    )
  },
  //同期变化率
  getCountyRateData(type,startTime,endTime) {
    return axios.get(getCountyRateDatasource+'type='+type+'&startTime='+startTime+'&endTime='+endTime, {}
    )
  },
  //同期变化率导出
  getCountyRateDataExcel(type,starttime,endtime) {
    window.open(getCountyRateDataExcelsource + 'type=' + type+ '&starttime=' + starttime+ '&endtime=' + endtime, {}
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
  getElectricForDay(startTime) {
    return axios.get(getElectricForDaysource+'startTime='+startTime, {}
    )
  },
}
