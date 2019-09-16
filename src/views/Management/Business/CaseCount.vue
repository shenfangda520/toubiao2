<!--后台管理-案件处理率统计-->
<template>
    <div class="CaseReview">
		<div id="right">
			<div class="box">
                <div class="warning">
                    <a>案件处理率统计</a>
                </div>
            </div>
            <!-----------查询部分------->
			<div class="search">
				
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
				    <div class="searchBox">
					    <span>责任部门</span>
					    <el-select v-model="DutyMainVal" @change="selectChangeDuty" clearable placeholder="请选择">
					        <el-option
					          v-for="item in optionsDuty"
					          :key="item.value"
					      	  :label="item.name"
					          :value="item.code">
					        </el-option>
					    </el-select>
					</div>
				    <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
				    <div class="InsertOrOut">
						<span>
							<el-button type="primary" @click="GetExportCase">Excel导出</el-button>
						</span>
					</div>
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
			      prop="pname"
			      label="责任部门"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="sum"
			      label="案件数量"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="notDealNum"
			      label='未处理'
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="dealNum"
			      label="已处理">
			    </el-table-column>
			    <el-table-column
			      prop="per"
			      label="结案率">
			    </el-table-column>
			</el-table>
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
            		
            	
		        //责任主体
            	optionsDuty: [],
		        //污染类别
            	optionsPollution: [],
			    currentPage: 1,
			    pagesize:10,
			    isConfirm: false,
			    Upload: false,
				//查询
				startTime:'',
				endTime:'',
				TotalRowsCount:null,
				totalCount:'',
				InfoData:[],
				ListData:[],
				pageNo:1,
	         //案件状态
	         CaseStatusVal:'',
	         //责任主体
	         DutyMainVal:'',
	         //案件时间
	         CaseStartTime:'',
	         CaseEndTime:'',
            }
        },
        created(){
        	this.GetMonitoringDay();
        },
        mounted() {
        	this.GetCaseAll();//责任主体
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
//      		this.GetMonitoringDay(10,val);
      		},
      		
      		
      		//责任主体选择
      		selectChangeDuty(val){
      			this.departmenttype = val;
      		},
      		//获取责任主体
      		GetCaseAll(){
      			let t = this;
      			api.GetCaseAll().then(result=>{
      				t.optionsDuty = result.data.data;
      				t.optionsDistributePop = result.data.data;
      			})
      		},
      		//获取列表
      		GetMonitoringDay(){
      			let t = this;
				let startTime = this.CaseStartTime?this.CaseStartTime:'';
				let endTime = this.CaseEndTime?this.CaseEndTime:'';
				let depcode = this.DutyMainVal;
				console.log(startTime)
      			this.ListData = [];
      			api.GetCaseCountList(startTime,endTime,depcode).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.data;
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = [];
								tableData.pname = item.pname;
								tableData.sum = item.sum;
								tableData.notDealNum = item.notDealNum;
								tableData.dealNum = item.dealNum;
								tableData.per = item.per;
		                        t.ListData.push(tableData);
							})
      					}
//						this.setPageTable(10000, 1);
      				}
				});
      		},
      		//导出
      		GetExportCase(){
      			let t = this;
      			let startTime = this.CaseStartTime?this.CaseStartTime:'';
				let endTime = this.CaseEndTime?this.CaseEndTime:'';
				let depcode = this.DutyMainVal;
      			api.GetCaseCountListExcel(startTime,endTime,depcode);
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

.el-input, .el-input__inner{
	width: 200px;
}
.edit-input{
	width: 100px;
}
#right{
	width: 100%;
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
