
<!--后台管理-监测点管理-->
<template>
    <div class="businessOperation">
		<!--监测点管理右侧数据展示-->
		<div id="right">
			<!--监测点管理-->
			<div class="box">
                <div class="warning">
                    <a>监测点管理</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<!--<span>监测点名称</span><el-input v-model="departmentVal" placeholder="请输入内容"></el-input>-->
				<!--<el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>-->
				<el-button type="primary" class='btns' @click="openWin">添加监测点</el-button>
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
			      prop="name"
			      label="监测点名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="pointtype"
			      label="监测点类别"
			      >
			    </el-table-column>
				<el-table-column
						prop="districtCounty"
						label="所属区县"
				>
				</el-table-column>
			    <el-table-column
			      prop="latitude"
			      label="纬度"
			      >
			    </el-table-column>
				<el-table-column
						prop="longitude"
						label="经度"
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
			<div class="popUp" v-show="isNew">
	            <div class="mask"></div>
	            <div class="succ-pop">
	                <div class="title">
	                    <a>添加</a>
	                    <div class="el-icon-close" @click="isNew=false"></div>
	                </div>
					<div class="content">
						<div class="block">
							<span>监测点编码：</span>
							<el-input v-model="pointId" placeholder="请输入监测点编码"></el-input>
						</div>
						<div class="block">
							<span>监测点名称：</span>
							<el-input v-model="pointName" placeholder="请输入监测点名称"></el-input>
						</div>
						<div class="block">
							<span>监测点类别：</span>
							<!--<el-input v-model="jiancedianType" placeholder="请输入监测点类别"></el-input>-->
							<el-select v-model="pointType"
									   clearable
									   placeholder="请选择"
									   @change='DeviceNameChange1'>
								<el-option key="1" label="国控点" value="1"></el-option>
								<el-option key="2" label="省控点" value="2"></el-option>
								<el-option key="3" label="乡镇" value="3"></el-option>
							</el-select>
						</div>
						<div class="block">
							<span>监测点经度：</span>
							<el-input v-model="pointlongitude" placeholder="请输入监测点经度"></el-input>
						</div>
						<div class="block">
							<span>监测点纬度：</span>
							<el-input v-model="pointlatitude" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>所属区县：</span>
							<el-input v-model="pointdistrictCounty" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>所属城市：</span>
							<el-input v-model="pointcity" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>所属区域：</span>
							<el-input v-model="pointRegion" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>说明：</span>
							<el-input
									type="textarea"
									:rows="4"
									placeholder="请输入内容"
									v-model="textareaConten">
							</el-input>
						</div>
						<span slot="footer" class="dialog-footer">
							<!--<el-button @click="isEdit = false">取 消</el-button>-->
							<el-button type="primary" @click="publish">确 定</el-button>
						</span>
					</div>
	            </div>
	        </div>
	        <!--编辑弹框部分-->
			<div class="popUp" v-show="isEdit">
	            <div class="mask"></div>
	            <div class="succ-pop">
	                <div class="title">
	                    <a id="newCreate">编辑</a>
	                    <div class="el-icon-close" @click="isEdit=false"></div>
	                </div>
	                <div class="content">
						<div class="block">
							<span>监测点编码：</span>
							<el-input v-model="pointId" placeholder="请输入监测点编码"></el-input>
						</div>
						<div class="block">
							<span>监测点名称：</span>
							<el-input v-model="pointName" placeholder="请输入监测点名称"></el-input>
						</div>
						<div class="block">
							<span>监测点类别：</span>
							<!--<el-input v-model="jiancedianType" placeholder="请输入监测点类别"></el-input>-->
							<el-select v-model="pointType"
									   clearable
									   placeholder="请选择"
									   @change='DeviceNameChange2'>
								<el-option key="1" label="国控点" value="1"></el-option>
								<el-option key="2" label="省控点" value="2"></el-option>
								<el-option key="3" label="乡镇" value="3"></el-option>
							</el-select>
						</div>
						<div class="block">
							<span>监测点经度：</span>
							<el-input v-model="pointlongitude" placeholder="请输入监测点经度"></el-input>
						</div>
						<div class="block">
							<span>监测点纬度：</span>
							<el-input v-model="pointlatitude" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>所属区县：</span>
							<el-input v-model="pointdistrictCounty" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>所属城市：</span>
							<el-input v-model="pointcity" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>所属区域：</span>
							<el-input v-model="pointRegion" placeholder="请输入监测点纬度"></el-input>
						</div>
						<div class="block">
							<span>说明：</span>
							<el-input
									type="textarea"
									:rows="4"
									placeholder="请输入内容"
									v-model="textareaConten">
							</el-input>
						</div>
						<span slot="footer" class="dialog-footer">
							<!--<el-button @click="isEdit = false">取 消</el-button>-->
							<el-button type="primary" @click="EditUpdate">确 定</el-button>
						</span>
	               </div>
	            </div>
	        </div>
		</div>
    </div>
</template>

<script>
    // import {Message} from 'element-ui';
    import api from '../../../api/index'
    export default {
        name: 'businessOperation',
        data() {
            return {
				//
                departmentVal:'',
		        tableData:[{DeviceName:'00000'}],
			    currentPage: 1,
			    pagesize:10,
			    isNew: false,
			    title:'添加',
				TotalRowsCount:null,
				totalCount:1,
				InfoData:[],
				ListData:[],
				isend:false,
				//添加/编辑
                pointId:'',
                pointName:'',
                pointType:'',
                pointlongitude:'',
                pointlatitude:'',
                pointdistrictCounty:'',
                pointcity:'',
                pointRegion:'',
                textareaConten:'',
				//
				defualtData:{},
				isEdit:false
            }
        },
        created(){

        },
        mounted() {
            this.getNotice();
        },
        computed: {
            
        },
        methods: {

            //列表删除
            DeleteOperatorInfo(row) {
                const _this = this;
                console.log(row)
                let id = row.id;
                this.$confirm('确认要删除本条数据吗？')
                    .then(_ => {
                        // done();
                        console.log('删除成功')
                        api.PostjcdremovePointInfo(id).then(res=>{
                            console.log(res)
                            if(res.data.message === 'true'){
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
        		this.closeWin();
        		this.getNotice();
        	},
        	closeWin(){
      			this.isNew = false;
      		},
			//编辑
	        handleClick(row) {
	        	this.isEdit = true;
	        	console.log(row)
	        	if(this.isEdit){
                    this.pointId = row.id;
                    this.pointName = row.name;
                    this.pointType = row.pointtype;
                    this.pointlongitude = row.longitude;
                    this.pointlatitude = row.latitude;
                    this.pointdistrictCounty = row.districtCounty;
                    this.pointcity = row.city;
                    this.pointRegion = row.region;
                    //this.textareaConten = '';
	        	}
	        	this.isNew = false;
      		},
			//查询
            QueryNeedsData(){
                let condition = this.departmentVal;
                let pageNo = 1;
                this.getNotice(condition,pageNo);
			},
      		//编辑发布
      		EditUpdate(){
      			const _this = this;
      			let id = _this.pointId;
      			let name = _this.pointName;
      			let pointtype = _this.contenterChange(_this.pointType);
      			let longitude = _this.pointlongitude;
      			let latitude = _this.pointlatitude;
      			let districtCounty = _this.pointdistrictCounty;
      			let city = _this.pointcity;
      			let region = _this.pointRegion;

                api.PostjcdeditPointInfo(id,name,pointtype,longitude,latitude,districtCounty,city,region).then(result=>{
					_this.getNotice();
                    console.log(result)
				});
				_this.isEdit = false;
      		},
      		//分页
      		 handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
			//
      		handleCurrentChange(val) {
        		//this.setPageTable(10, val);
				let condition = this.departmentVal;
				let pageNo = val;
                this.getNotice(condition,pageNo);
      		},
			//
      		openWin(){
      			this.isEdit = false;
      			this.isNew = true;
                this.pointId = '';
                this.pointName = '';
                this.pointType = '';
                this.pointlongitude = '';
                this.pointlatitude = '';
                this.pointdistrictCounty = '';
                this.pointcity = '';
                this.pointRegion = '';
                this.textareaConten = '';
      		},
      		//
            DeviceNameChange1(val){
				console.log(val);
                this.pointType = val;
      		},
            //
            DeviceNameChange2(val){
                console.log(val);
                this.pointType = val;
            },
            //转换状态传值
            contenterChange(val){
                let keydata = val;
                let data = null;
                if(keydata === '国控点'){
                    data = 1;
                }else if (keydata === '省控点'){
                    data = 2;
                } else if (keydata === '乡镇'){
                    data = 3;
                }else {
                    data = keydata;
                }
                //isNaN(val) === true && return val;
                return data;
            },
      		//添加确定
      		Insert(){
                const _this = this;
                let id = _this.pointId;
                let name = _this.pointName;
                let pointtype = _this.pointType;
                let longitude = _this.pointlongitude;
                let latitude = _this.pointlatitude;
                let districtCounty = _this.pointdistrictCounty;
                let city = _this.pointcity;
                let region = _this.pointRegion;
				api.PostjcdaddPointInfo(id,name,pointtype,longitude,latitude,districtCounty,city,region).then(result=>{
                    //_this.getNotice();
					console.log(result);
				});

      		},
      		//获取运维记录列表
      		getNotice(condition = '',pageNo = 1){
      			const _this = this;
      			let cn = condition;
      			let pag = pageNo;
      			this.tableData = [];
      			api.GetProvincestationPage(cn,pag).then(result=>{
					let InfoData = result.data.data.rows;
                    _this.totalCount = result.data.data.total;
					InfoData.forEach(item=>{
						let tableData = {};
                        tableData.name = item.name;//
                        tableData.latitude = item.latitude;//
                        tableData.longitude = item.longitude;//
                        tableData.pointtype = item.pointtype === '1'?'国控点':(item.pointtype==='2'?'省控点':'乡镇');//
                        tableData.id = item.id;//
                        tableData.districtCounty = item.districtCounty;//
                        _this.tableData.push(tableData);
					})
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
	@import "../../../styles/houtaitanchuang";
.businessOperation{
	.el-input{
		width: 215px;
	}
	.el-textarea{
		width: 220px;
	}
	.dialog-footer{
		width: 100%;
		margin-top: 15px;
		float: right!important;
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
