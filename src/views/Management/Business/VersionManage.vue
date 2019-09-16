
<!--后台管理-版本管理-->
<template>
    <div class="versionManage">
		<div id="right">
			<div class="box">
                <div class="warning">
                    <a>版本管理</a>
                </div>
            </div>
            <div class="content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="版本号" prop="version">
                        <el-input v-model="ruleForm.version"></el-input>
                    </el-form-item>
                    <el-form-item label="版本名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="说明" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="上传文件" prop='file'>
                        <el-upload
                            class="upload-demo"
                            :action="imgUploadUrl"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            name='uploadFile'
                            :on-success="uploadOnSuccess"
                            :on-error='uploadError'
                            :before-remove="beforeRemove"
                            :before-upload="beforeUpload"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addappversion">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
		</div>
    </div>
</template>

<script>
    import api from '../../../api/index'
    export default {
        name: 'versionManage',
        data() {
            return {
            	ruleForm: {
                    name: '',
                    desc: '',
                    version:''
                },
                 rules: {
                    version: [
                        { required: true, message: '请输入版本号', trigger: 'blur' },
                    ],
                    file: [
                        { required: true, message: '请选择文件', trigger: 'blur' },
                    ]
                },
                fileList: [],
                fileUrl:'',
                apkname:'',
                imgUploadUrl:''
            }
        },
        created(){
            this.imgUploadUrl = api.GetUploadImg();
            // console.log(this.imgUploadUrl)
        },
        mounted() {},
        computed: {},
        methods: {
             handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            beforeUpload(file){
                this.fileList.slice(-3);
            },
            uploadOnSuccess(e, file) { //上传附件
                console.log("——————————success——————————")
                console.log(file)
                this.fileUrl = file.response.data;
                this.apkname = file.name;
                console.log(this.fileUrl)
                this.pass = true;
                this.$message.success("上传成功")
                this.fileList = [{
                    url: this.fileUrl,
                    name: this.apkname
                }]
                // console.log(this.fileList)
            },
            uploadError(err, file, fileList){
                this.$message.error(err)
            },
            addappversion(){
                let versionnum = this.ruleForm.version;
                let apkurl = this.fileUrl;
                let apkname = this.apkname;
                let versioninfo = this.ruleForm.desc;
                let remark = this.ruleForm.name;
                if(versionnum && apkurl){
                    api.addappversion(versionnum,remark,apkurl,apkname,versioninfo).then(res=>{
                        // console.log(res)
                        let mess = res.data.data;
                        if(res.data.status==1){
                            this.$message.success(mess);
                            this.ruleForm.version = '';
                            this.apkname = '';
                            this.ruleForm.desc = '';
                            this.ruleForm.name = '';
                        }else{
                            this.$message.error(mess);
                        }
                    })
                }else{
                     this.$message.error('必填项不可为空！');
                }
                
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.versionManage{
    width: 100%;
    height: 100%;
    background-color: #f6fbff;
	#right{
		overflow: hidden;
		padding: 20px;
		.box {
	        width: 100%;
	        height: auto;
	        .warning {
	        	text-align: left;
	            border-bottom: solid 1px #ccc;
	            width: 100%;
	            height: 40px;
	            margin-top: 10px;
	            margin-bottom: 20px;
	            margin-left: 10px;
	            a {
	                display: inline-block;
	                height: 20px;
	                border-left: solid 3px #428bca;
	                padding-left: 13px;
	                font-size: 16px;
	                line-height: 20px;
	            }
	        }
	    }
        .content{
            width: 400px;
            height: auto;
            margin: 0 auto;
            text-align: left;
        }
	}
}
</style>
