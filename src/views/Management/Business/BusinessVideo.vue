
<!--后台管理-视频类型管理-->
<template>
    <div class="businessOperation">
		<!--右侧数据展示-->
		<div id="right">
			<div class="box">
                <div class="warning">
                    <a>视频类型管理</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<span>摄像头名称</span><el-input v-model="departmentVal" placeholder="请输入内容"></el-input>
				<el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>
				<el-button type="primary" class='btns' @click="openWin">添加监控点</el-button>
				<el-button type="primary" class='btns' @click="ExportVideolist">导出</el-button>
			</div>
			<!--列表部分-->
			<div class="box">
                <div class="warning">
                    <a>列表</a>
                </div>
            </div>
            <el-table
			    :data="tableData"
				border
			    style="width: 100%">
			    <el-table-column
			      prop="CameraResourceName"
			      label="摄像头资源名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="NameVideoMonitoringPoint"
			      label="视频监控点名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="Contacts"
			      label="联系人"
			      >
			    </el-table-column>
				<el-table-column
						prop="ContactInformation"
						label="联系方式"
				>
				</el-table-column>
				<el-table-column
						prop="InstallationSite"
						label="安装地点"
				>
				</el-table-column>
			    <el-table-column
			      label="操作"
			      width="180">
			      <template scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
			        <span style="color: #eee;">|</span>
			        <el-button @click="DeleteOperatorInfo(scope.row)" type="text" size="small" class='eidt'>删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		   	<div class="page" style="">
			    <span class="demonstration">共找到{{totalCount}}条记录</span>
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
				  background
			      :current-page="currentPage"
			      :page-size="pagesize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</div>
			<!--添加弹框部分-->
			<el-dialog :title="`${lokerstate}视频监控点`" :visible.sync="dialogVisible" width="80%">
				<div class="class-boxdar">
					<div class="ca-left">
						<div class="block">
							<span>视频自增ID：</span>
							<el-input v-model="videoId" placeholder="请输入ID"></el-input>
						</div>
						<div class="block">
							<span>摄像头名称：</span>
							<el-input v-model="CamName" placeholder="请输入摄像头名称"></el-input>
						</div>
						<div class="block">
							<span>摄像头编号：</span>
							<el-input v-model="CamIndexCode" placeholder="请输入摄像头编号"></el-input>
						</div>
						<div class="block">
							<span>所属设备编号：</span>
							<el-input v-model="BelongDevice" placeholder="请输入所属设备编号"></el-input>
						</div>
						<div class="block">
							<span>通道号：</span>
							<el-input v-model="Channel" placeholder="请输入通道号"></el-input>
						</div>
						<div class="block">
							<span>设备类型：</span>
							<el-input v-model="DevType" placeholder="请输入设备类型"></el-input>
						</div>
					</div>
					<div class="ca-left">
						<div class="block">
							<span>码流：</span>
							<el-input v-model="SubStream" placeholder="请输入码流"></el-input>
						</div>
						<div class="block">
							<span>所属设备编号：</span>
							<el-input v-model="DevIndexCode" placeholder="请输入所属设备编号"></el-input>
						</div>
						<div class="block">
							<span>经度：</span>
							<el-input v-model="Longitude" placeholder="请输入经度"></el-input>
						</div>
						<div class="block">
							<span>纬度：</span>
							<el-input v-model="Latitude" placeholder="请输入纬度"></el-input>
						</div>
						<div class="block">
							<span>摄像头类型：</span>
							<el-input v-model="Type" placeholder="请输入摄像头类型"></el-input>
						</div>
						<div class="block">
							<span>联系人：</span>
							<el-input v-model="Contact" placeholder="请输入联系人"></el-input>
						</div>
					</div>
					<div class="ca-left">
						<div class="block">
							<span>电话：</span>
							<el-input v-model="Phone" placeholder="请输入电话"></el-input>
						</div>
						<div class="block">
							<span>企业名称：</span>
							<el-input v-model="CompanyName" placeholder="请输入企业名称"></el-input>
						</div>
						<div class="block">
							<span>企业地址：</span>
							<el-input v-model="CompanyAddress" placeholder="请输入企业地址"></el-input>
						</div>
						<div class="block">
							<span>所属区域：</span>
							<el-input v-model="Area" placeholder="请输入所属区域"></el-input>
						</div>
						<div class="block">
							<span>区域编号：</span>
							<el-input v-model="GridCode" placeholder="请输入区域编号"></el-input>
						</div>
						<div class="block">
							<span>说明：</span>
							<el-input v-model="shuoming" placeholder="请输入说明文字"></el-input>
						</div>
					</div>
				</div>
				<!---->
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="changeEidesend">确 定</el-button>
				</span>
			</el-dialog>

		</div>
    </div>
</template>

<script>
    import {Message} from 'element-ui';
    import api from '../../../api/index'
    export default {
        name: 'businessOperation',
        data() {
            return {
            	//
                departmentVal:'',
		        tableData:[{CameraResourceName:'摄像头'}],
			    currentPage: 1,
			    pagesize:10,
                dialogVisible: false,
				TotalRowsCount:null,
				totalCount:1,
				InfoData:[],
				ListData:[],
				//编辑添加状态
                lokerstate:'',
				//添加
                videoId:'',
                CamName:'',
                CamIndexCode:'',
                BelongDevice:'',
                Channel:'',
                DevType:'',
                SubStream:'',
                DevIndexCode:'',
                Longitude:'',
                Latitude:'',
                Type:'',
                Contact:'',
                Phone:'',
                CompanyName:'',
                CompanyAddress:'',
                Area:'',
                GridCode:'',
				shuoming:''
            }
        },
        created(){

        },
        mounted() {
            this.getNotice();
            //获取视频类型
			api.GetVideoTypeR().then(res=>{
			    console.log(res);
			});
        },
        computed: {
            
        },
        methods: {
            //查询列表
            QueryNeedsData(){
                let condata = this.departmentVal;
                this.getNotice(condata);
			},
			//导出视频列表
            ExportVideolist(){
                let condata = this.departmentVal;
                api.VodeoExcelOutPutR(condata);
			},
            //列表删除
            DeleteOperatorInfo(row) {
                const _this = this;
                console.log(row)
                let id = row.Id;
                this.$confirm('确认要删除本条数据吗？')
                    .then(_ => {
                        // done();
                        console.log('删除成功')
                        api.DeleteVideoPointR(id).then(result=>{
                            console.log(res)
                            if(result.data.Status > 0){
                                _this.$message({showClose: true, message: '删除成功', type: 'success'});
                            }else {
                                _this.$message({showClose: true, message: '删除失败', type: 'error'});
                            }
                        })
                        //
                        setTimeout(()=>{
                            _this.getNotice();
                        },200)
                    })
                    .catch(_ => {
                        console.log('删除失败')
                    });
            },
        	///新建预警信息发布
        	publish(){
        		this.Insert();
        		this.getNotice();
        	},
			//编辑
	        handleClick(row) {
	        	this.lokerstate = '编辑';
                this.dialogVisible = true;
	        	//console.log(row);
				let id = row.Id;
                api.GetVideoDeviceInfoByIdR(id).then(res =>{
                    //console.log(res);
					let data = res.data.Data;
                    this.videoId = data.Id;
                    this.CamName = data.CamName;
                    this.CamIndexCode = data.CamIndexCode;
                    this.BelongDevice = data.BelongDevice;
                    this.Channel = data.Channel;
                    this.DevType = data.DevType;
                    this.SubStream = data.SubStream;
                    this.DevIndexCode = data.DevIndexCode;
                    this.Longitude = data.Longitude;
                    this.Latitude = data.Latitude;
                    this.Type = data.Type;
                    this.Contact = data.Contact;
                    this.Phone = data.Phone;
                    this.CompanyName = data.CompanyName;
                    this.CompanyAddress = data.CompanyAddress;
                    this.Area = data.Area;
                    this.GridCode = data.GridCode;
				})

      		},
      		//编辑发布
      		EditUpdate(){
      			const _this = this;
                let Id = _this.videoId;
                let CamName = _this.CamName;
                let CamIndexCode = _this.CamIndexCode;
                let BelongDevice = _this.BelongDevice;
                let Channel = _this.Channel;
                let DevType = _this.DevType;
                let SubStream = _this.SubStream;
                let DevIndexCode = _this.DevIndexCode;
                let Longitude = _this.Longitude;
                let Latitude = _this.Latitude;
                let Type = _this.Type;
                let Contact = _this.Contact;
                let Phone = _this.Phone;
                let CompanyName = _this.CompanyName;
                let CompanyAddress = _this.CompanyAddress;
                let Area = _this.Area;
                let GridCode = _this.GridCode;
                //let shuoming = _this.shuoming ;
      			api.UpdateVideoPointR(Id,CamName,CamIndexCode,BelongDevice,Channel,DevType
                    ,SubStream,DevIndexCode,Longitude,Latitude,Type,Contact
                    ,Phone,CompanyName,CompanyAddress,Area,GridCode).then(result=>{
                    if(result.data.Status > 0){
                        _this.$message({showClose: true, message: '编辑成功', type: 'success'});
                    }else {
                        _this.$message({showClose: true, message: '编辑失败', type: 'error'});
                    }
					_this.getNotice();
				});

      		},
			//添加编辑发布
            changeEidesend(){
                const _this = this;
                if(_this.lokerstate === '添加'){
                    //添加发布
                    _this.publish();
				}else {
                    //编辑发布
                    _this.EditUpdate();
				}
				//关闭弹窗
				setTimeout(()=>{
                    _this.dialogVisible = false;
				},600)
			},
      		//分页
      		handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
			//
      		handleCurrentChange(val) {
                //
        		this.setPageTable(10, val);
      		},
			//新建添加监控点
      		openWin(){
      			this.lokerstate = '添加';
      			this.dialogVisible = true;
                this.videoId = '';
                this.CamName = '';
                this.CamIndexCode = '';
                this.BelongDevice = '';
                this.Channel = '';
                this.DevType = '';
                this.SubStream = '';
                this.DevIndexCode = '';
                this.Longitude = '';
                this.Latitude = '';
                this.Type = '';
                this.Contact = '';
                this.Phone = '';
                this.CompanyName = '';
                this.CompanyAddress = '';
                this.Area = '';
                this.GridCode = '';
                this.shuoming = '' ;
            },
      		//添加发送
      		Insert(){
                const _this = this;
                let Id = _this.videoId;
                let CamName = _this.CamName;
                let CamIndexCode = _this.CamIndexCode;
                let BelongDevice = _this.BelongDevice;
                let Channel = _this.Channel;
                let DevType = _this.DevType;
                let SubStream = _this.SubStream;
                let DevIndexCode = _this.DevIndexCode;
                let Longitude = _this.Longitude;
                let Latitude = _this.Latitude;
                let Type = _this.Type;
                let Contact = _this.Contact;
                let Phone = _this.Phone;
                let CompanyName = _this.CompanyName;
                let CompanyAddress = _this.CompanyAddress;
                let Area = _this.Area;
                let GridCode = _this.GridCode;
                //let shuoming = _this.shuoming ;
                api.AddVideoPointR(Id,CamName,CamIndexCode,BelongDevice,Channel,DevType
                    ,SubStream,DevIndexCode,Longitude,Latitude,Type,Contact
                    ,Phone,CompanyName,CompanyAddress,Area,GridCode).then(result=>{
                    if(result.data.Status > 0){
                        _this.$message({showClose: true, message: '添加成功', type: 'success'});
                    }else {
                        _this.$message({showClose: true, message: '添加失败', type: 'error'});
                    };
				});
      		},
      		//获取列表
      		getNotice(name = ''){
      			const _this = this;
                let nm =name;
      			this.ListData = [];
      			api.GetVideoDeviceInfoR(nm).then(result=>{
					let InfoData = result.data.Data;
                    _this.totalCount = InfoData.length;
                    //console.log(InfoData);
					InfoData.forEach(item=>{
						let tableData = {};
                        tableData.CameraResourceName = item.CamName;//摄像头名称
                        tableData.NameVideoMonitoringPoint = item.CompanyName;//监控点名称
                        tableData.Contacts = item.Contact || '----';//联系人
                        tableData.ContactInformation = item.Phone || '----';//联系方式
                        tableData.InstallationSite = item.CompanyAddress || '----';//安装地点
                        tableData.Latitude = item.Latitude;//纬度
                        tableData.Longitude = item.Longitude;//经度
                        tableData.TypeName = item.TypeName;//类型
                        tableData.Id = item.Id;//id
                        _this.ListData.push(tableData);
					})
                    _this.setPageTable(10, 1);
				});
      		},
      		 //分页数据
            setPageTable(pageSize, pageNum) {
                let i = 1;
                let rtValue = [];
                let startNum = pageSize * (pageNum - 1);
                for (let i = 0; i < pageSize; i++) {
                    if ((startNum + i + 1) > this.ListData.length)
                        break;
                    rtValue.push(this.ListData[startNum + i]);
                }
                this.tableData = rtValue;
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.businessOperation{
	.el-input{
		width: 215px;
	}
	.class-boxdar{
		margin: 10px 20px;
		.ca-left{
			margin-bottom: 15px;
			width: 33%;
			height: auto;
			float: left;
			.block{
				margin-top: 15px;
				span{
					display: inline-block;
					width: 100px;
					text-align: right;
				}
			}
		}
	}
	#right{
		width: 100%;
		overflow: hidden;
		padding: 20px;
		background-color: #f6fbff;
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
	    .search{
	    	text-align: left;
	    	margin-bottom: 24px;
	    	.searchBox{
	    		display: inline-block; 
	    		margin-right: 20px;
	    	}
	    	.block{
	    		display: inline-block;
	    	}
	    	.btns{
	    		margin-left: 40px;
	    	}
	    }
	    .page{
	    	text-align: left;
	    }
	    .eidt{
			color: #000;
			:hover{
		    	color: #20a0ff;
		    	text-decoration: underline;
	    	}
	    }
	    .InfoEnd{
	    	color: #000;
	    	:hover{
	    		color: #BF3831;
		    	text-decoration: underline;
	    	}
	    }
	    
	    .el-pagination{
	    	display: inline-block;
	    	margin-left: 170px;
	    	padding-bottom: 90px;
	    }
	}
}
</style>
