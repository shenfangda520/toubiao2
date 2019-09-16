<template>
    <div class="pollution">
        <!--首页部分-->
        <!--<v-header></v-header>-->
        <!--日历-->
        <div class="warp-content">
            <div class="con-cont">
                <div class="warp-float">
                    <el-radio-group v-model="valueTwo" @change="typechange" size="small">
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
                <!---->
            <div class="warp-calendar">
                <!--日历-->
                <div id="calendar"></div>
                <!--地下大屏幕-->
                <div class="posi-1ceng" v-if="doclientWidth > 1500">
                    <!--1月-->
                    <div class="let-01">
                      <dl class="posi-float">
                          <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{January.y_count}}</span></dt>
                          <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{January.l_count}}</span></dd>
                      </dl>
                      <dl class="posi-float">
                          <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{January.zd_count}}</span></dt>
                          <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{January.yz_count}}</span></dd>
                      </dl>
                      <dl class="posi-float">
                          <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{January.qd_count}}</span></dt>
                          <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{January.zhd_count}}</span></dd>
                      </dl>
                  </div>
                    <!--2月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{February.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{February.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{February.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{February.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{February.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{February.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--3月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{March.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{March.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{March.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{March.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{March.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{March.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--4月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{April.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{April.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{April.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{April.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{April.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{April.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--5月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{May.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{May.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{May.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{May.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{May.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{May.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--6月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{June.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{June.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{June.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{June.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{June.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{June.zhd_count}}</span></dd>
                        </dl>
                    </div>
                </div>
                <div class="posi-2ceng" v-if="doclientWidth > 1500">
                    <!--7月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{July.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{July.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{July.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{July.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{July.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{July.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--8月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{August.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{August.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{August.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{August.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{August.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{August.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--9月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{September.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{September.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{September.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{September.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{September.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{September.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--10月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{October.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{October.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{October.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{October.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{October.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{October.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--11月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{November.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{November.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{November.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{November.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{November.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{November.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--12月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{December.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{December.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{December.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{December.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{December.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{December.zhd_count}}</span></dd>
                        </dl>
                    </div>
                </div>
                <!--小屏幕日历下挂-->
                <div class="posi-smallceng1" v-if="doclientWidth < 1500">
                    <!--1月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{January.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{January.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{January.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{January.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{January.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{January.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--2月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{February.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{February.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{February.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{February.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{February.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{February.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--3月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{March.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{March.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{March.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{March.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{March.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{March.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--4月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{April.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{April.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{April.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{April.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{April.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{April.zhd_count}}</span></dd>
                        </dl>
                    </div>
                </div>
                <div class="posi-smallceng2" v-if="doclientWidth < 1500">
                    <!--5月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{May.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{May.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{May.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{May.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{May.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{May.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--6月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{June.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{June.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{June.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{June.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{June.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{June.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--7月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{July.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{July.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{July.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{July.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{July.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{July.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--8月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{August.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{August.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{August.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{August.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{August.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{August.zhd_count}}</span></dd>
                        </dl>
                    </div>
                </div>
                <div class="posi-smallceng3" v-if="doclientWidth < 1500">
                    <!--9月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{September.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{September.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{September.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{September.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{September.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{September.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--10月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{October.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{October.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{October.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{October.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{October.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{October.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--11月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{November.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{November.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{November.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{November.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{November.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{November.zhd_count}}</span></dd>
                        </dl>
                    </div>
                    <!--12月-->
                    <div class="let-01">
                        <dl class="posi-float">
                            <dt><span class="p-text">优:</span> <span class="p-backgrd" style="background:#13e613;color: #333">{{December.y_count}}</span></dt>
                            <dd><span class="p-text">良:</span> <span class="p-backgrd" style="background:rgb(239, 220, 49);color: #333">{{December.l_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">中度:</span> <span class="p-backgrd" style="background:rgb(255, 0, 0);color: #fff">{{December.zd_count}}</span></dt>
                            <dd><span class="p-text">重度:</span> <span class="p-backgrd" style="background:#de2159;color: #fff">{{December.yz_count}}</span></dd>
                        </dl>
                        <dl class="posi-float">
                            <dt><span class="p-text">轻度:</span> <span class="p-backgrd" style="background:rgb(255, 126, 0);color: #333">{{December.qd_count}}</span></dt>
                            <dd><span class="p-text">严重:</span> <span class="p-backgrd" style="background:#9e0835;color: #fff">{{December.zhd_count}}</span></dd>
                        </dl>
                    </div>
                </div>
                <!---->
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
        </div>
    </div>
</template>

<script>
    import api from '../../api/index';
    export default {
        name: "pollution",
        data(){
            return{
                valueOne: '环比',
                valueTwo: 'AQI',
                yeardata:'',
                January:{},
                February:{},
                doclientWidth:document.body.clientWidth,
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
                ceType:'pm25'
            }
        },
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
                        color:item[_this.colorChange()],
                        winddirect:item.winddirect,
                        windlevel:item.windlevel,
                        startDate:new Date(item.day.replace(/\\/g, ',')),
                        endDate:new Date(item.day.replace(/\\/g, ','))
                    }
                }));
            },
             //切换指标
            typechange(val){
                console.log(val);
                 const _this = this;
                switch (val){
                    case 'AQI':
                        _this.ceType = 'aqi';
                        break;
                    case 'PM2.5':
                        _this.ceType = 'pm25';
                        break;
                    case 'PM10':
                        _this.ceType = 'pm10';
                        break;
                    case 'SO2':
                        _this.ceType = 'so2';
                        break;
                    case 'NO2':
                        _this.ceType = 'no2';
                        break;
                    case 'CO':
                        _this.ceType = 'co';
                        break;
                    case 'O3':
                        _this.ceType = 'o3';
                        break;
                }
                _this.ChainRequest();
            },
            //颜色修改
            colorChange(){
                let types = this.valueTwo;
                let color ='';
                switch (types){
                    case 'AQI':
                        color = 'aqic';
                        break;
                    case 'PM2.5':
                        color = 'pm25c';
                        break;
                    case 'PM10':
                        color = 'pm10c';
                        break;
                    case 'SO2':
                        color = 'so2c';
                        break;
                    case 'NO2':
                        color = 'no2c';
                        break;
                    case 'CO':
                        color = 'coc';
                        break;
                    case 'O3':
                        color = 'o3c';
                        break;
                }
                return color
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
            ChainRequest(){
                let type =  this.ceType;
                let year = new Date().getFullYear();
                api.GetPolluteCalendarhb(year,type).then(res =>{
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
                            _this.ChainRequest();
                        }
                    }
                })
            });
        }
    }
</script>

<style lang="scss" scoped>
    .pollution{
        width: calc(100% - 116px);
        height:calc(100% - 86px);
        overflow-y: auto;
        box-sizing: border-box;
        padding: 30px;
        background: #fff;
        .warp-content{
            width: 98%;
            height: auto;
            margin: 0 auto;
            overflow: hidden;
            .con-cont{
                width: 95%;
                height: 58px;
                .warp-coter{

                }
                .warp-float{
                    float: left;
                    margin-left: 10px;
                }
            }
            .warp-calendar{
                position: relative;
                width: 95%;
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
                .posi-1ceng,.posi-2ceng{
                    position: absolute;
                    top: 290px;
                    width: 100%;
                    height: 80px;
                    .let-01{
                        width: calc(16.6666666% - 3px);
                        margin-left: 3px;
                        height: 80px;
                        float: left;
                        .posi-float{
                            width: 33%;
                            height: 100%;
                            float: left;
                            padding-left: 5px;
                            dt,dd{
                                width: 100%;
                                height: 40%;
                                line-height: 40px;
                                text-align: left;
                                .p-text{
                                    text-align: right;
                                    padding-left: 1px;
                                    padding-right: 8px;
                                    display: inline-block;
                                    width: 44px;
                                }
                                .p-backgrd{
                                    font-weight: 400;
                                    display: inline-block;
                                    margin-left: -10px;
                                    width: 22px;
                                    height: 22px;
                                    text-align: center;
                                    background: #3a1028;
                                    color: #fff;
                                    border-radius: 50%;
                                    line-height: 22px;
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
                }
                .posi-smallceng1,.posi-smallceng2,.posi-smallceng3{
                    position: absolute;
                    top: 290px;
                    width: 100%;
                    height: 80px;
                    .let-01{
                        width: calc(25% - 3px);
                        margin-left: 3px;
                        height: 80px;
                        float: left;
                        .posi-float{
                            width: 33%;
                            height: 100%;
                            float: left;
                            padding-left: 5px;
                            dt,dd{
                                width: 100%;
                                height: 40%;
                                line-height: 40px;
                                text-align: left;
                                .p-text{
                                    text-align: right;
                                    padding-left:1px;
                                    padding-right: 8px;
                                    display: inline-block;
                                    width: 44px;
                                }
                                .p-backgrd{
                                    font-weight: 400;
                                    display: inline-block;
                                    margin-left: -10px;
                                    width: 22px;
                                    height: 22px;
                                    text-align: center;
                                    background: #3a1028;
                                    color: #fff;
                                    border-radius: 50%;
                                    line-height: 22px;
                                }
                            }
                        }
                    }
                }
                .posi-smallceng2{
                    position: absolute;
                    top: 600px;
                    width: 100%;
                    height: 80px;
                }
                .posi-smallceng3{
                    position: absolute;
                    top: 910px;
                    width: 100%;
                    height: 80px;
                }
            }
        }

    }
</style>