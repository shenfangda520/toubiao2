<!--后台管理-签到统计-->
<template>
    <div class="CaseReview">
		<div id="right">
			<!----------签到统计-->
			<div class="box">
                <div class="warning">
                    <a>签到统计</a>
                </div>
            </div>
            <!-----------查询部分------->
			<div class="search">
				<div class="block" style="margin-top: 20px;">
				    <!--<span class="demonstration">村庄名称</span>
				    <el-input v-model="villageName" placeholder="请输入内容" clearable></el-input>-->
				    <span class="demonstration">巡查员姓名</span>
				    <el-input v-model="patrollerName" placeholder="请输入内容"></el-input>
				</div>
				<div class="block" style="margin-top: 20px;">
					 <span class="demonstration">起始时间</span>
					    <el-date-picker
					      v-model="CaseStartTime"
					      type="date"
					      value-format="yyyy-MM-dd"
					      placeholder="选择日期时间"
					      @change='startChange'>
					    </el-date-picker>
					    -
					    <el-date-picker
					      v-model="CaseEndTime"
					      type="date"
					      value-format="yyyy-MM-dd"
					      placeholder="选择日期时间"
					      @change='endChange'>
					    </el-date-picker>
					<el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
				    <el-button type="primary" class='btns' @click='GetExportCase'>导出</el-button>
				</div>
			</div>
			
			<!--------------列表部分---------->
			<div class="box">
                <div class="warning">
                    <a>列表</a>
                </div>
           	</div>
           	<el-table
			    :data="ListData"
			    style="width: 100%">
			    <el-table-column
			      prop="username"
			      label="巡查员姓名"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="mobile"
			      label="联系方式">
			    </el-table-column>
			    <el-table-column
			      prop="checkIn"
			      label="签到时间">
			    </el-table-column>
			    <el-table-column
			      prop="checkout"
			      label="签退时间">
			    </el-table-column>
			</el-table>
		   	<div class="page">
			    <span class="demonstration">共找到{{totalCount}}条记录</span>
			    <el-pagination
				  background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-size="pagesize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</div>
		</div>
    </div>
</template>

<script>
    import {Message} from 'element-ui';
    import api from '../../../api/index'
    export default {
        name: 'CaseReview',
        data() {
            return {
		        tableData:[],
			    currentPage: 1,
			    pagesize:10,
				TotalRowsCount:null,
				totalCount:'',
				InfoData:[],
				ListData:[],
				pageNo:1,
	         //案件时间
	         CaseStartTime:'',
	         CaseEndTime:'',
	         //网格
	         villageName:'',
	         patrollerName:''
            }
        },
        created(){

        },
        mounted() {
            this.GetMonitoringDay();
        },
        computed: {
        },
        methods: {
            //开始时间选择
        	startChange(val){
        		this.startTime = val;
        	},
        	//结束时间选择
        	endChange(val){
        		this.endTime = val;
        	},
      		//分页
      		 handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
      		handleCurrentChange(val) {
      			let t = this;
      			this.pageNo = val;
				this.GetMonitoringDay();
      		},
      		//获取列表
      		GetMonitoringDay(){
      			let t = this;
      			// let Name = encodeURI(this.patrollerName);
      			let Name = this.patrollerName;
				let BeginTime = this.CaseStartTime?this.CaseStartTime:'';
				let EndTime = this.CaseEndTime?this.CaseEndTime:'';
				let PageSize = 10;
				let PageIndex = this.pageNo;
      			this.ListData = [];
      			api.GetStaff(Name,BeginTime,EndTime,PageIndex,PageSize).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.Data.Data;
      					t.totalCount = result.data.Data.TotlePageNum;
//    					console.log(InfoData)
//    					console.log('11')
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = {};
								tableData.username = item.username;
		                        tableData.checkIn = item.checkIn;//案发时间
		                        tableData.checkout = item.checkout;
		                        tableData.mobile = item.mobile;//责任主体
		                        t.ListData.push(tableData);
							})
      					}
      				}
				});
      		},
      		
      		//导出
      		GetExportCase(){
      			let t = this;
      			let Name = encodeURI(this.patrollerName);
				let BeginTime = this.CaseStartTime?this.CaseStartTime:'';
				let EndTime = this.CaseEndTime?this.CaseEndTime:'';
				let PageSize = 10;
				let PageIndex = this.pageNo;
      			api.StaffExcelOutPut(Name,BeginTime,EndTime,PageIndex,PageSize);
      		},
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
        }, 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
*{
	box-sizing: border-box;
}
.img-list{
	overflow:hidden;
	width:100%;
}
.img-list .img-content{
	float:left;
	text-align:left;
	position:relative;
	display:inline-block;
	width:200px;
	height:200px;
	/*padding:5px;*/
	/*margin:5px 20px 20px 0;*/
	border:1px solid #d1dbe5;
	/*border-radius:4px;*/
	/*transition:all .3s;*/
	/*box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);*/
}
.img-list .img-upload{
	float:left;
	width:200px;
	height:200px;
	display:table;
	text-align:center;
}
.img-list .uploader{
	width:100%;
	display:table-cell;
	vertical-align:middle;
}
.img-list .img-progress{
	text-align:center;
	padding-top:30px;
}
.img-list .img-content img{
	display:block;
	width:100%;
	height:200px;
	margin:0 auto;
	/*border-radius:4px;*/
}
.img-list .img-content .name{
	margin-top:10px;
}
.img-list .img-content .name>div{
	width:90%;
	text-overflow:ellipsis;
	overflow:hidden;
	height:25px;
	line-height:25px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
	opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
	opacity:0;
	transition:all .3s;
}
.img-list .img-content .del{
	position:absolute;
	bottom:10px;
	right:10px;
	color:#8492a6;
	cursor:pointer;
	font-size:1.1em;
}
.img-list .img-content .layer{
	position:absolute;
	left:0;
	right:0;
	top:0;
	height:200px;
	color:#fff;
	text-align:center;
	z-index:5;
	background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
	font-size:1.6em;
	margin-top:80px;
}


.el-input, .el-input__inner{
	width: 200px;
}
.edit-input{
	width: 100px;
}
#right{
	width:100%;
	overflow: hidden;
	padding: 20px;
	background-color: #f6fbff;
	.left{
		float: left;
	}
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
    	margin-left: 20px;
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
    	.InsertOrOut{
    		display: inline-block;
    		margin-left: 40px;
    		span{
    			a{
	    			color: #000000;
	    			font-size: 14px;
	    			margin-right: 40px;
    			}
    			:hover{
    				cursor: pointer;
    				color: #1797ff;
    				text-decoration: underline;
	    		}
    		}
    		
    	}
    }
    .page{
    	text-align: left;
    }  
    .el-pagination{
    	display: inline-block;
    	margin-left: 170px;
    	padding-bottom: 90px;
    }
    /*************弹出框**********/
    .popUp {
        /*灰色遮罩层*/
        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 998;
        }
        /*****回复弹出框内容********/
        .reply {
            width: 655px;
            height: 690px;
            background: #fff;
            position: fixed;
            left: 50%;
            top: 50%;
            margin-left: -327px;
            margin-top: -345px;
            z-index: 999;
            border-radius: 10px;
            .title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: left;
                border-bottom: 2px solid #3a90b3;
                a {
                    color: #3a90b3;
                    font-size: 18px;
                    padding-left: 20px;
                }
                div {
                    margin-top: 15px;
                    float: right;
                    width: 24px;
                    height: 24px;
                    color: #363636;
                    margin-right: 6px;
                }
            }
            .content{
            	padding: 0 40px;
            	text-align: right;
            	.block{
            		float:left;
            		margin-top:20px;
            		span{
            			display: inline-block;
            			width: 60px;
            			text-align: right;
            		}
            	}
            	.el-textarea{
					width: 506px;
				}
				.el-upload .el-upload--picture-card{
					width: 200px!important;
					height: 200px!important;

				}
            }
            
        }
        /*//分配弹框*/
        .distribute{
        	width: 400px;
        	height: 224px;
        	margin-left: -200px;
	    	margin-top: -112px;
	    	background: #fff;
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 999;
            border-radius: 10px;
            .title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: left;
                border-bottom: 2px solid #3a90b3;
                /*margin-bottom:26px;*/
                a {
                    color: #3a90b3;
                    font-size: 18px;
                    padding-left: 20px;
                }
                div {
                    margin-top: 15px;
                    float: right;
                    width: 24px;
                    height: 24px;
                    color: #363636;
                    margin-right: 6px;
                }
            }
	    	.content{
	    		margin-left: 30px;
	    		margin-top: 20px;
	    	}
        }
        /*查看弹框*/
        .examine{
        	width: 655px;
            height: 690px;
            background: #fff;
            position: fixed;
            left: 50%;
            top: 50%;
            margin-left: -327px;
            margin-top: -345px;
            z-index: 999;
            border-radius: 10px;
            .title {
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: left;
                border-bottom: 2px solid #3a90b3;
                /*margin-bottom:26px;*/
                a {
                    color: #3a90b3;
                    font-size: 18px;
                    padding-left: 20px;
                }
                div {
                    margin-top: 15px;
                    float: right;
                    width: 24px;
                    height: 24px;
                    color: #363636;
                    margin-right: 6px;
                }
            }
            .content{
            	padding: 0 40px;
            	text-align: right;
            	.block{
            		float:left;
            		margin-top:20px;
            		span{
            			display: inline-block;
            			width: 60px;
            			text-align: right;
            		}
            	}
            	.el-textarea{
					width: 506px;
				}
	    	}
        	
        } 
        .imgBox{
			img{
				width: 200px;
				height: 200px;
			}
			span{
				vertical-align: top;
			}
			
		}
		.secSpan{
			margin-left: 35px;
		}  
    } 
      
}
</style>
