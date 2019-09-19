export default {
  development: [{
    site:'http://gkpt.zq12369.com',// 'http://117.119.97.150',//'http://devgkptplat.zhiscity.com',//'http://gkpt.zq12369.com:8015',//http://117.119.97.150:8063
    port: ':8016',//':8063',
    path: '/api'
  },{
    site: 'http://58.132.207.211',///.NET
    port: ':8073',
    path: '/api'
  },{
    site: 'http://58.132.207.211',//JAVA
    port: ':8061',//':8087',//':8061',//
    path: '/'
  },{
    site: 'http://120.52.157.161',//JAVA 邓浩洋
    port: ':8068',//':8087',//':8061',//
    path: '/'
  }],
  release: [{
    site:'http://gkpt.zq12369.com',// 'http://117.119.97.150',//'http://devgkptplat.zhiscity.com',//'http://gkpt.zq12369.com:8015',//http://117.119.97.150:8063
    port: ':8016',//':8063',
    path: '/api'
  },{
    site: 'http://120.52.157.162',///.NET
    port: ':8060',
    path: '/api'
  },{
    site: 'http://120.52.157.161',//JAVA
    port: ':8061',//':8087',//':8061',//
    path: '/'
  },{
    site: 'http://120.52.157.161',//JAVA 邓浩洋
    port: ':8068',//':8087',//':8061',//
    path: '/'
  }],
  getRequestUrlByType(type){
    console.log(process.env.API_ROOT);
    let apiConfig = this.release;//this.release;
    (process.env.API_ROOT === 'DEV' || process.env.API_ROOT === 'TEST') && (apiConfig = this.development);
    let url = undefined;
    let cf = undefined;
    switch (type.toUpperCase()) {
      case 'LAYER_GS'://国省控监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Monitoring/GetMonitoringPointReal';
            break;
      case 'LAYER_GS_INFO'://国省控监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Monitoring/GetJjjAnd226Detail';
        break;
      case 'LAYER_CGQ_LCS'://六参数
        cf = apiConfig[0];
        url = cf.site + cf.port + cf.path + '/SixParamAir/GetSixParamAirList';
        break;
      case 'LAYER_CGQ_LCS_INFO'://六参数图表
        cf = apiConfig[0];
        url = cf.site + cf.port + cf.path + '/SixParamAir/GetSixParamAirDetail';
        break;
      case 'LAYER_CX'://城乡监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Town/GetTownList';
        break;
      case 'LAYER_CX_INFO'://城乡监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Town/GetSingleTown';
        break;
      case 'LAYER_GD'://工地监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Dust/GetDustHourRanking_NEW';
        break;
      case 'LAYER_GD_INFO'://工地监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Dust/GetDust24Hour_NEW';
        break;
      case 'LAYER_QY'://企业监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Company/GetCompanyPointList';
        break;
      case 'LAYER_QY_INFO'://企业监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Company/GetCompanyDetai';
        break;
      case 'LAYER_QY_MSG'://企业监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Company/GetCompanyInfo?pscode=';
        break;
      case 'LAYER_CY'://餐饮监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Soot/getSootPointList';
        break;
      case 'LAYER_CY_INFO'://餐饮监测
        cf = apiConfig[1];
        url = cf.site + cf.port + cf.path + '/Soot/getSootDetail';
        break;
      case 'LAYER_SP_GD'://工地视频
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/siteDust/list';
        break;
      case 'LAYER_SP_GD_INFO'://工地视频监测
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/siteDust/info';
        break;
      case 'LAYER_SP_CY'://餐饮视频
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/company/getSootPointList';
        break;
      case 'LAYER_SP_CY_INFO'://餐饮监测
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/company/getSootDetail';
        break;
      case 'LAYER_SP_VOC'://VOC视频
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/vocs/list';
        break;
      case 'LAYER_SP_VOC_INFO'://VOC视频信息
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/vocs/info';
        break;
      // case 'LAYER_SP_SLW'://散乱污视频
      //   cf = apiConfig[3];
      //   url = cf.site + cf.port + cf.path + 'guangyang/company/getCompanyCasenum?type=2';
      //   break;
      case 'LAYER_SP_SLW_INFO'://散乱污视频信息
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/company/getCompanyCameras';
        break;
      case 'CASE_FS_GRID_RATIO'://秸秆焚烧案件二级网格占比
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/cases/selectSuperviseCaseGridRatio?companyType=4';
          break;
      case 'LAYER_SP_FS'://秸秆焚烧视频
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/company/getCompanyCasenum?type=4';
        break;
      case 'LAYER_SP_FS_INFO'://秸秆焚烧信息
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/company/getCompanyCameras';
        break;
      case 'LAYER_SP_HD'://河道视频
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/company/getCompanyCasenum?type=6';
        break;
      case 'LAYER_SP_HD_INFO'://河道视频信息
        cf = apiConfig[2];
        url = cf.site + cf.port + cf.path + '/company/getCompanyCameras';
        break;
      case 'LAYER_QM'://案件督察
        cf = apiConfig[2];
        url = cf.site + cf.port + cf.path + '/company/getCompanyCasenum1_4';
        break;
      case 'LAYER_QM_INFO'://案件督察信息
        cf = apiConfig[2];
        url = cf.site + cf.port + cf.path + '/cases/selectInspectorCasePage';
        break;
      case 'LAYER_YQD'://应急原清单
        cf = apiConfig[2];
        url = cf.site + cf.port + cf.path + 'task/gyyqdcon/selectPollutantDischargeAll';
        break;
      case 'LAYER_YQ'://油气列表
      case 'LAYER_YQ_INFO'://油气
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/stationInfo/selectAllStationByPage';
        break;
      case 'GRIDPOLLUTION':
        cf = apiConfig[1];
        url = "http://120.52.157.162:8060/api/GridForecast/GetGridForecast?wrwType=";//cf.site + cf.port + cf.path + '/GridForecast/GetGridForecast';
        break;
      case 'GRIDCHAR':
        cf = apiConfig[1];
        url = "http://120.52.157.162:8060/api/GridForecast/GetGridForecast?wrwType=";//cf.site + cf.port + cf.path + '/GridForecast/GetGridForecast';
        break;
      case 'LAYER_WQ'://尾气遥感监测
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/carInfo/getCheckPointData';
        break;
      case 'LAYER_SP_GKW'://高空五公里监控
        cf = apiConfig[3];
        url = cf.site + cf.port + cf.path + 'guangyang/highAltitude/list';
        break;
      case 'LAYER_CGQ_VOC':
        cf = apiConfig[0];
        url = 'http://gkpt.zq12369.com:8016/api/XhHb/GetXhHbPointsVoc';//cf.site + cf.port + cf.path + '/XhHb/GetXhHbPointsVoc';
        break;
        case 'LAYER_CGQ_VOC_INFO':
        cf = apiConfig[0];
        url = 'http://gkpt.zq12369.com:8016/api/XhHb/GetXhHistoriesVoc';//cf.site + cf.port + cf.path + '/XhHb/GetXhHbPointsVoc';
        break;
      case 'LAYER_SP_SLW':
        url = '../../static/data/videos.json';
        break;
    }
    return url;
  }
}
