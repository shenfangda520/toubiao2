<template>
    <div class="heighvideos">
        <!---->
        <v-header v-show="mheader"></v-header>
        <!---->
        <div class="vidoe-float" v-show="videomodel">
            <!--视频上部控件-->
            <div class="tv-kongjian"><span></span></div>
            <!--视频-->
            <div class="shiping">
                <div class="v-title2">
                    {{casName_xt}}
                    <span @click="videoClose" title="关闭窗口" >关闭</span>
                    <span @click="onblackclick" title="停止预览视频返回首页" >返回</span>
                    <span title="点击重新载入播放" @click="btnClick(vCode,vType)">播放</span>
                </div>
                <div class="v-video2 gk1" id="box_video">
                    <!--插件視頻-->
                    <!--<div v-if="backintn" class="win_container" data-index="1" id="preview_1" style="width: 100%; height: 100%;" name="ocx_1"></div>-->
                    <!--video視頻-->
                    <video style="width: 100%;height: 100%" :src="'../../static/videos/video'+randomNum(1,6)+'.mp4'" muted autoplay loop controls>
                        <!--你就用这个浏览器有出息吗？-->
                        您的瀏覽器不支持播放視頻；請升級瀏覽器
                    </video>
                </div>
            </div>
        </div>
        <!--视频底部-->
        <div class="video-bottom">
            <!--左边-->
            <div class="v-left">
                <div class="v-l-title">实时视频监控列表</div>
                <div class="v-l-conter">
                    <!--搜索过滤-->
                    <el-input
                            placeholder="输入关键字进行过滤"
                            icon="search"
                            v-model="filterText">
                    </el-input>
                    <!--树形图-->
                    <el-tree
                            class="filter-tree"
                            :data="TreeFigureData"
                            :props="defaultProps"
                            accordion
                            @node-click="handleNodeBlickClick"
                            :filter-node-method="filterNode"
                            ref="tree2">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span> <i :class="node.icon"></i> <span style="padding-left: 2px">{{ node.label }}</span> </span>
                        </span>

                    </el-tree>
                </div>
            </div>
            <!--中间-->
            <div class="v-conent">
                <div class="vi-itemobj">
                    <div class="v-title">{{gktitle}}</div>
                    <div class="v-video" style="width: 100%;height: 100%">
                        <!--<img :src="spbjImg" style="border: none;width: 96%;height: 100%;z-index: 500;margin: 2% auto">-->
                    </div>
                </div>
            </div>
            <!--右边-->
            <div class="v-right">
                <!---->
                <div class="v-l-title">视频状态</div>
                <!---->
                <div class="v-l-selet">
                    <el-select v-model="videoval" placeholder="视频监控请选择">
                        <el-option v-for="item in VodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <!---->
                <div class="v-l-title">基本信息</div>
                <!---->
                <div class="table-from">
                    <table border="1" style="width: 100%">
                        <tr>
                            <td width="80" style="background: #ebebeb"><div class="t-item">企业名称</div></td>
                            <td><div class="t-item2">{{casName}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">行业类别</div></td>
                            <td><div class="t-item2">{{IndustryCategory}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">产品</div></td>
                            <td><div class="t-item2">{{product}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">所属区县</div></td>
                            <td><div class="t-item2">{{DistrictCounty}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">企业地址</div></td>
                            <td><div class="t-item2">{{EnterpriseAddress}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">所属网格</div></td>
                            <td><div class="t-item2">{{Grid}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">网格员</div></td>
                            <td><div class="t-item2">{{Gridman}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">网格员联系方式</div></td>
                            <td><div class="t-item2">{{GridmanPhone}}</div></td>
                        </tr>
                        <tr>
                            <td style="background: #ebebeb"><div class="t-item">监控类型</div></td>
                            <td><div class="t-item2">{{MonitoringType}}</div></td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>
        <!---->
    </div>
</template>
<script>
    import api from '../api/index'

    export default {
        name: 'heighvideos',
        data() {
            return {
                gktitle:'',//视频类型标题
                //企业信息
                casName:'',//
                IndustryCategory:'',
                product:'',
                DistrictCounty:'',
                EnterpriseAddress:'',
                Grid:'',
                Gridman:'',
                GridmanPhone:'',
                MonitoringType:'',
                videoval:'全部',
                backintn:true,
                casName_xt:'',
                VodeOptions:[
                    {label:'全部', value:'0'},
                    {label:'运行中', value:'1'},
                    {label:'异常', value:'2'}
                ],
                Cname:'',
                videomodel: false,
                //页面数据
                vCode: '',
                vType:'',
                votype: '',
                mheader: true,
                filterText: '',
                //树形图数据
                TreeFigureData: [],
                //
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

            };
        },
        created() {},

        mounted() {
            //mounted 挂载结束状态=====
            const _this = this;
            //视频插件dom初始化
            //initOcx();
            //程序初始化
            if(_this.cameraCode){
                setTimeout(()=>{
                    _this.JudgeInitializationProgram()
                },600)
            }else {
                console.log('暂无视频！！！');
                //无视频状态
                _this.mheader = true;
            };
            //获取视频页面列表数据
            api.GetCameraList().then(res =>{
                //console.log(res);
                res.data.data.forEach(item =>{
                    const latslist = {
                            label:item.typeName,
                            icon:'el-icon-menu',
                            typeName:item.typeName,
                            children:item.child.map(vt =>{
                                return{
                                    icon:'el-icon-circle-plus-outline',
                                    label:vt.companyName,
                                    CodeName:vt.companyName,
                                    children:vt.child.map(vm =>{
                                        return{
                                            code:vm.cameraCode,
                                            icon:(vm.alarmStatus==='--'||vm.alarmStatus=='1'||vm.alarmStatus=='开')?'el-icon-info':'el-icon-warning',
                                            label:vm.cameraName
                                        }
                                    })
                                }
                            })
                    };
                    _this.TreeFigureData.push(latslist);
                    //console.log(_this.TreeFigureData);
                })
            })
        },
        watch: {
            //监听过滤数据
            filterText(val) {
                this.$refs.tree2.filter(val);
            },
        },
        computed :{
            //视频类型
            cameratype(){
                return this.$route.query.type
            },
            //视频名称
            cameraname(){
                return this.$route.query.name
            },
            //视频code
            cameraCode(){
                return this.$route.query.code
            },
        },
        methods: {
            //隨機數字
            randomNum(minNum,maxNum){
                switch(arguments.length){
                    case 1:
                        return parseInt(Math.random()*minNum+1,10);
                        break;
                    case 2:
                        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
                        break;
                    default:
                        return 1;
                        break;
                }
            },
            //调用视频方法
            btnClick(Vcode,vType) {
                //调用视频方法
                const _this = this;
                _this.mheader = false;
                if(!Vcode){Vcode = _this.cameraCode;vType = _this.cameratype;}
                this.getvideo(Vcode,vType);
            },
            //视频预览
            getvideo(Vcode,vType) {
                var inc = Vcode;
                var type = vType;
                $.ajax({
                    url: "http://192.168.30.243:8074/VideoPlatform/stream/getStream",
                    type: "post",
                    data: {
                        indexCode: inc,
                        type:type
                    },
                    dataType: "text",
                    success: function (xml) {
                        console.log(xml);
                        //
                        var winindex = ocx.getSelectWindow();
                        if (ocx.startPreview(winindex, xml) == 0) {
                            if (ocx.setSelectWindow(winindex + 1) == -1) {
                                ocx.setSelectWindow(0);
                            }
                        }
                    },
                    error: function (result) {
                        console.log(result.status + "：" + result.statusText);
                    }
                });

            },
            //停止播放
            stopPreview() {
                console.log('测试关闭视频');
                ocx.stopPreview('-1');
            },
            //关闭弹出视频窗口
            btnClose() {
                const _this = this;
                _this.videomodel = false;
                if (_this.mheader == false) { _this.mheader = true;}
            },
            //返回按钮，防止返回全屏
            onblackclick() {
                const _this = this;
                //测试关闭视频
                _this.stopPreview();
                //跳转首页
                _this.$router.push({path: '/'});

            },
            //
            videoClose(){
                const _this = this;
                //测试关闭视频
                //_this.stopPreview();
                _this.videomodel = false;
                _this.mheader = true;

            },
            //列表点击事件
            handleNodeBlickClick(data) {
                //点击携带信息
                console.log(data);
                const _this = this;
                //视频编码
                let cameraCode = data.code || '';
                //保存着本地
                _this.vCode = cameraCode;
                if(data.typeName) _this.vType = data.typeName !== '秸秆焚烧'?'0':'1';
                //请求企业信息
                if(data.CodeName){_this.informationRequest(data.CodeName);}
                //如果有视频code开始播放视频
                if(cameraCode){
                    //视频弹出框
                    _this.videomodel = true;
                    //防止点击就弹出全屏
                    $(".gk1").removeClass('max');
                    //视频名称
                    _this.casName_xt = data.label;
                    _this.btnClick(cameraCode,_this.vType);
                }

            },
            //清空信息
            EmptyingInformation(){
                this.casName = '';
                this.IndustryCategory = '';
                this.product = '';
                this.DistrictCounty = '';
                this.EnterpriseAddress = '';
                this.Grid = '';
                this.Gridman = '';
                this.GridmanPhone = '';
                this.MonitoringType = '';
            },
            //请求企业信息
            informationRequest(companyname){
              api.GetCompanyByNamedata(companyname).then(res =>{
                  console.log(res);
                  let objdata = res.data.data;
                  this.casName = objdata.companyName || '--';
                  this.IndustryCategory = objdata.industry|| '--';
                  this.product = objdata.product|| '--';
                  this.DistrictCounty = objdata.county|| '--';
                  this.EnterpriseAddress = objdata.address|| '--';
                  this.Grid = objdata.gridname|| '--';
                  this.Gridman = objdata.gridmember|| '--';
                  this.GridmanPhone = objdata.gridmemberphone|| '--';
                  this.MonitoringType = objdata.monitortype|| '--';
              })
            },
            //过滤数据
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //判断初始化程序
            JudgeInitializationProgram(){
                const _this = this;
                //视频弹出框
                _this.mheader = false;
                _this.videomodel = true;
                //
                let votp = _this.cameratype;
                //视频名称
                _this.casName_xt = decodeURI(_this.cameraname);//解密文字
                //视频插件传递调用
                _this.getvideo(_this.cameraCode,votp);
            }
        },
        components: {}//
    };
</script>
<style lang="scss" scoped>
    .heighvideos {
        width: 100%;
        height: 100%;
        .el-icon-info{
            color: #1ce405;
        }
        .el-icon-warning{
            color: #c9302c;
        }
        //遮罩层
        .vidoe-float {
            width: 100%;
            height: 100%;
            position: fixed;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1000;
            padding: 0;
            margin: 0;
            .shiping {
                width: 100%;
                height: calc(100% - 44px);
                margin: 0 auto;
            }
            .v-title2 {
                width: 100%;
                height: 42px;
                background: #fff;
                text-align: center;
                font-size: 22px;
                padding-left: 11%;
                line-height: 42px;
                color: #000;
                font-weight: bold;
                span {
                    display: inline-block;
                    float: right;
                    background: #1d90e6;
                    font-size: 14px;
                    line-height: 10px;
                    padding: 10px 15px;
                    height: 30px;
                    margin-top: 5px;
                    margin-right: 16px;
                    cursor:pointer;
                    color: #fff;
                    background:linear-gradient(0deg,rgba(79,172,254,1),rgba(0,242,254,1));
                    border-image:linear-gradient(0deg, rgba(148,207,255,1), rgba(162,249,254,1)) 1 1;
                    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
                    border-radius:11px;
                }
                span:active{
                    background:linear-gradient(0deg,rgba(79,122,234,1),rgba(0,202,234,1));
                }
            }
            .v-video2 {
                width: 100%;
                /*width: calc(60% - 4px);*/
                height: 100%;
                margin: 0px auto;
            }
        }
        //新单元
        .video-bottom {
            width: 100%;
            height: calc(100% - 86px);
            overflow: hidden;
            .v-left {
                float: left;
                background: #fff;
                width: 20%;
                height: 100%;
                overflow: auto;
                .v-l-title {
                    width: 100%;
                    height: 42px;
                    background: #fff;
                    color: #666;
                    text-align: left;
                    padding-left: 4%;
                    border-bottom: solid 1px #ccc;
                    line-height: 42px;
                    font-weight: bold;
                }
                .v-l-conter {
                    width: 80%;
                    margin-left: 10%;
                    margin-top: 4%;
                }
            }
            .v-conent {
                float: left;
                width: 60%;
                height: 100%;
                background: #f5f5f5;
                .vi-itemobj {
                    width: 94%;
                    margin: 0 auto;
                    .v-title {
                        width: 100%;
                        height: 42px;
                        background: #f5f5f5;
                        text-align: left;
                        padding-left: 2%;
                        line-height: 42px;
                        color: #666;
                        border-bottom: solid 1px #ccc;
                        font-weight: bold;
                    }
                    .v-video {
                        width: 100%;
                        height: calc(100% - 42px);
                    }
                }
            }
            .v-right {
                float: left;
                background: #fff;
                width: 20%;
                height: 100%;
                .v-l-title {
                    width: 100%;
                    height: 42px;
                    background: #fff;
                    color: #666;
                    text-align: left;
                    padding-left: 4%;
                    border-bottom: solid 1px #ccc;
                    line-height: 42px;
                    font-weight: bold;
                }
                .v-l-selet{
                    padding-top: 15px;
                    padding-left: 15px;
                    text-align: left;
                }
                .table-from {
                    width: 92%;
                    margin-left: 4%;
                    margin-top: 4%;
                    table {
                        border: solid 1px #ccc;
                        color: #6d6d6d;
                        font-weight: bold;
                        tr {
                            border: solid 1px #ccc;
                        }
                        td {
                            height: 44px;
                            border: solid 1px #ccc;
                        }
                        .t-item {
                            text-align: center;
                            font-size: 16px;
                            color: #6d6d6d;
                        }
                        .t-item2 {
                            text-align: left;
                            padding-left: 15px;
                            font-size: 16px;
                            color: #6d6d6d;
                        }
                    }
                }
            }
        }
        .max {
            position: fixed !important;
            top: 42px !important;
            left: 0 !important;
            width: 100% !important;
            height: calc(100% - 42px) !important;
            margin: 0 !important;
        }
        .iconplay {
            cursor: pointer;
            display: inline-block;
            width: 36px;
            height: 36px;
            margin-top: 2px;
            margin-right: 2px;
            float: right;
            background: url("../assets/img/play.png") no-repeat center;
            background-size: cover;
        }
        //媒体查询
        @media only screen and (min-width: 1400px) {

        }

    }
</style>
