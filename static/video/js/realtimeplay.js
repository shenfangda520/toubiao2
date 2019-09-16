var ocx;
var preWindowIndex = 0;
var indexcodes = [];
var pictype = "jpeg";
var picpath = "C:\Users\Public\Pictures\\";
var videosize = "256";
var videopath = "C:\Users\Public\Videos\\";
var decode = "5";
var PTZ_CMD_ZOOM_IN = 11 /* 焦距以速度SS变大(倍率变大) */
var PTZ_CMD_ZOOM_OUT = 12 /* 焦距以速度SS变小(倍率变小) */
var PTZ_CMD_FOCUS_NEAR = 13 /* 焦点以速度SS前调 */
var PTZ_CMD_FOCUS_FAR = 14 /* 焦点以速度SS后调 */
var PTZ_CMD_IRIS_OPEN = 15 /* 光圈以速度SS扩大 */
var PTZ_CMD_IRIS_CLOSE = 16 /* 光圈以速度SS缩小 */
var PTZ_CMD_TILT_UP = 21 /* 云台以SS的速度上仰 */
var PTZ_CMD_TILT_DOWN = 22 /* 云台以SS的速度下俯 */
var PTZ_CMD_PAN_LEFT = 23 /* 云台以SS的速度左转 */
var PTZ_CMD_PAN_RIGHT = 24 /* 云台以SS的速度右转 */
var PTZ_CMD_UP_LEFT = 25 /* 云台以SS的速度上仰和左转 */
var PTZ_CMD_UP_RIGHT = 26 /* 云台以SS的速度上仰和右转 */
var PTZ_CMD_DOWN_LEFT = 27 /* 云台以SS的速度下俯和左转 */
var PTZ_CMD_DOWN_RIGHT = 28 /* 云台以SS的速度下俯和右转 */
var PTZ_CMD_PAN_AUTO = 29 /* 云台以SS的速度左右自动扫描 */
var PRESET_CMD_SET_PRESET = 8 /* 设置预置点 */
var PRESET_CMD_CLE_PRESET = 9 /* 清除预置点 */
var PRESET_CMD_GOTO_PRESET = 39 /* 转到预置点 */
var PTZ_CMD_START = 0; /* 开始命令 */
var PTZ_CMD_STOP = 1; /* 结束命令 */
var SUCCESS = 0; /* 控件操作成功 */
var FAILED = 1; /* 控件操作失败 */
var ERROR = -1; /* 控件操作错误 */
var ISPREVIEW = 1; /* 正在预览 */
var NOTPREVIEW = 0; /* 没在预览 */
var OPRATION_PTZ = 10004;
var OPRATION_CUTVIDEO = 10003;
var OPRATION_VIDEOPARAM = 10002;
var theme = "Red";
// 添加注释，开发时不需要这个方法


//token设置事件通知，这个必须有
	function tokenCallEvent(reqID) {

		$.ajax({
			url : "/api/stream/getVmsTokenAction",
			type : "post",
			dataType : "text",
			success : function(token) {
				//alert(token);
				ocx.setToken(reqID, token);
			}
		});
	}


// 窗口交换改变事件通知

 function windowExchangeEvent(index) { 

	 }
 
// 控件初始化完成事件通知

 function windowInitOK() { 

	 var layoutType =Number(1);
	  if(ocx.setWindowsLayout(layoutType)!=SUCCESS){
		 alert('窗口布局设置失败', '窗口布局', 'error'); 
	  }else{
		  //print("窗口布局设置成功");
	  }
	 }

// 开始预览事件通知
function startPreviewEvent() {
	var windIndex = showptz();

}

// 选择窗口布局

 function selectWindowType() { 

 var layoutType =Number(1);
  if(ocx.setWindowsLayout(layoutType)!=SUCCESS){
	 alert('窗口布局设置失败', '窗口布局', 'error'); 
  }else{
	  // print("窗口布局设置成功");
  }
 }

// 选择当前窗口

 function selectWindow() {

 var wndIndex = Number($("#windowselect").val());
 if(ocx.setSelectWindow(wndIndex)==ERROR){
  $("#windowselect").val(preWindowIndex) 
  } }

// 把要放置控件的div的id以参数赋予这个对象，赋予全局变量ocx。
function initOcx() {
	var preview = {
		divId : "preview_1",
		// theme属性如果不用的话，得把preview.js里面初始化时相关的方法删掉；
		theme : theme
	}
	//debugger;
	ocx = new PreviewOCX(preview);

	// 下面的回调函数除了token回调，其他都是可选的，用户选取自己的业务需要做适当的增删方法；

	// 设置token回调
	ocx.registerCallback(PREVIEW_EVENT_TOKEN, tokenCallEvent);
	// 抓图回调函数
	//ocx.registerCallback(PREVIEW_EVENT_SNAP, picCutEvent);
	// 录像回调
	//ocx.registerCallback(PREVIEW_EVENT_VEDIO, videoCutEvent);
	// 开始预览回调
	//ocx.registerCallback(PREVIEW_EVENT_START, startPreviewEvent);
	// 停止预览回调
	//ocx.registerCallback(PREVIEW_EVENT_STOP, stopPreviewEvent);
	// 窗口选中改变回调
	//ocx.registerCallback(PREVIEW_EVENT_SELECTED, windowChangeEvent);
	// 窗口交换改变
	ocx.registerCallback(PREVIEW_EVENT_CHANGE, windowExchangeEvent);
	// 控件初始化完毕消息
	ocx.registerCallback(PREVIEW_EVENT_INIT_OK, windowInitOK);


}
