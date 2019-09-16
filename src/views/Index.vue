<template>
    <div class="index-warp">
        <!--首页部分-->
        <v-header :isChoose="0"></v-header>
        <!--地图部分-->
        <main-map></main-map>
        <!--应急信息-->
        <public-info></public-info>
        <!--右侧面板-->
        <index-panel></index-panel>
        <!--监控图例-->
        <div class="index-tuli" v-show="RightNavData != false">
            <img src="../../static/imgs/tuli/tongyong_tuli.png" v-show="$route.path==='/OnlineListPanel'||$route.path==='/SenPanel'||$route.path==='/TownshipPanel'||$route.path==='/MonitoringPoint'" alt="图例">
            <img src="../../static/imgs/tuli/ducha_tuli.png" v-show="$route.path==='/CaseSupervision'" alt="图例">
            <img src="../../static/imgs/tuli/hedao_tuli.png" v-show="$route.path==='/RiverMonitoringVideo_jk'" alt="图例">
            <img src="../../static/imgs/tuli/jiegan_tuli.png" v-show="$route.path==='/StrawBurningVideo_jk'" alt="图例">
            <img src="../../static/imgs/tuli/sanlanwu_tuli.png" v-show="$route.path==='/ScatteredDirtVideo_jk'" alt="图例">
            <img src="../../static/imgs/tuli/canying_tuli.png" v-show="$route.path==='/CookingFumeMonitoring'"/>
        </div>
        <!--巡查员弹框-->
        <el-dialog title="巡查调度" :visible.sync="dialogVisible" width="25%" top="10%">
            <div class="block"> <span>标题：</span>
                <el-input v-model="biaoti" placeholder="请输入标题"></el-input>
                <!--<div class="tishi" v-show="classts">{{tishiyu}}</div>--></div>
            <div class="block"> <span>内容：</span>
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
            </div>
            <div class="block"> <span>形式：</span>
                <el-checkbox v-model="checked">APP</el-checkbox>
            </div> <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitsend">发送</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import MainMap from '@/map/MainMap' //0809
    import indexPanel from '@/components/index_new'
    import publicInfo from '@/components/PublicInformation'//应急信息
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    export default {
        name: 'index',
        data() {
            return {
                stateType: 1,
                //
                fullscreenLoading: false,
                //
                dialogVisible:false,
                //
                codeid:'',
                //
                checked: true,
                //
                textarea:'',
                //
                biaoti:'',
                //
                RightNavData:[]
            }
        },

        mounted() {
            this.openFullScreen()
            bus.$on('changesubmit', this.selectdiaodu);//
            this.RightNavData = this.$store.state.menuData;
        },
        methods: {
            //
            submitsend(){

                let userId = this.codeid;
                let title = this.biaoti;
                let message = this.textarea;
                let sendId = this.$store.state.userId;

                api.PostSendSchduleRt(userId,title,message,sendId).then(res =>{
                    console.log(res);
                    if(res.data.Data === '成功'){
                        this.$message({showClose: true, message: '调度成功', type: 'success'})
                    }else {
                        this.$message({showClose: true, message: '调度失败', type: 'error'});
                    }

                })

                this.dialogVisible = false
            },
            //
            selectdiaodu(value){
               //测试弹框
                this.dialogVisible = true;
                console.log(value);
                this.codeid = value.Id;
                this.biaoti = '';
                this.textarea = '';
            },
            //加载动画
            openFullScreen() {
                this.fullscreenLoading = true;
                //
                setTimeout(() => {
                    this.fullscreenLoading = false;
                }, 2000);
            },
            //获取本地
		    getlocal(name) {
		        let data = sessionStorage.getItem(name)
		        if (data != null && data != '') {
		            try {
		                let obj = eval('(' + data + ')')
		                return obj
		            } catch (e) {
		                return ''
		            }
		        } else {
		            return ''
		        }
		    },
        },
        components: {MainMap, indexPanel,publicInfo}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .index-warp {
        width: 100%;
        height: 100%;
        position: relative;
        .index-tuli{
            width: 430px;
            height: 54px;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -240px;
            img{
                position: absolute;
                bottom:0;
                left: 0;
            }
        }
        .block{
            margin-top: 15px;
            .el-input{
                width: 220px;
            }
            .el-checkbox{
                text-align: left;
                width: 220px;
            }
            .el-textarea{
                width: 220px;
            }
        }

        .v-video {
            position: absolute;
            top: 200px;
            left: 200px;
        }
        .fliex {
            position: fixed;
            right: 50px;
            top: 68%;
        }
    }
</style>
