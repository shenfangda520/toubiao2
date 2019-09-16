<template>
    <div class="indexwarp">
        <!--首页部分-->
        <v-header></v-header>
        <!--地图部分-->
        <main-map></main-map>
        <!--应急信息-->
        <public-info></public-info>
        <!--右侧面板-->
        <indexpanel></indexpanel>
        <!--巡查员弹框-->
        <!---->
        <el-dialog
                title="巡查调度"
                :visible.sync="dialogVisible"
                width="25%"
                top="10%"
        >
            <div class="block">
                <span>标题：</span>
                <el-input v-model="biaoti" placeholder="请输入标题"></el-input>
                <!--<div class="tishi" v-show="classts">{{tishiyu}}</div>-->
            </div>
            <div class="block">
                <span>内容：</span>
                <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div class="block">
                <span>形式：</span>
                <el-checkbox v-model="checked">APP</el-checkbox>
            </div>
            <span slot="footer" class="dialog-footer">
                <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="submitsend">发送</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import MainMap from '@/map/MainMap' //0809
    import indexpanel from '@/components/index_new'
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
            }
        },
        created(){
        	//let t = this;
			// if(!this.getlocal('userInfo')){
   //              t.$router.push('/Login')
			// }
        },
        mounted() {
            this.openFullScreen()
            bus.$on('changesubmit', this.selectdiaodu);//
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
                    let Alert = res.data.Message;
                    let statCode = res.data.Status;
                    if( statCode > 0){
                        this.$message({showClose: true, message: Alert, type: 'success'})
                    }else {
                        this.$message({showClose: true, message: Alert, type: 'error'});
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
        components: {MainMap, indexpanel,publicInfo}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .indexwarp {
        width: 100%;
        height: 100%;
        position: relative;
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
