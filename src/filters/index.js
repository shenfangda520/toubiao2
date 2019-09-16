/*
* 抛出全局过滤方法
* */
//过滤指标参数名
exports.formatGelabeltype = (type) => {
    let rtValue = type;
    switch (type.toUpperCase()) {
        case 'AQI':
            rtValue = 'AQI';
            break;
        case 'PM25':
            rtValue = 'PM2.5';
            break;
        case 'PM10':
            rtValue = 'PM10';
            break;
        case 'SO2':
            rtValue = 'SO2';
            break;
        case 'NO2':
            rtValue = 'NO2';
            break;
        case 'CO':
            rtValue = 'CO';
            break;
        case 'O3':
            rtValue = 'O3';
            break;
        case 'COMPLEXINDEX':
            rtValue = '综指';
            break;
        case 'TEMP':
            rtValue = '温度';
            break;
        case 'HUMI':
            rtValue = '湿度';
            break;
        case 'WINDANGLE':
            rtValue = '风向';
            break;
        case 'WINDSPEED':
            rtValue = '风力';
            break;
    }
};
//过滤网格员状态
exports.GridOperatorName = (val) => {
    let statusName = '';
    switch (val) {
        case 0:
            statusName = '三级网格员';
            break;
        case 1:
            statusName = '三级网格长';
            break;
        case 2:
            statusName = '二级网格员';
            break;
        case 3:
            statusName = '二级网格长';
            break;
        case 5:
            statusName = '责任主体人员';
            break;
    }
    return statusName;
};
