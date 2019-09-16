<!--后台管理-明星巡查员-->
<template>
    <div class="CaseReview">
		<div id="right">
			<!----------明星巡查员-->
			<div class="box">
                <div class="warning">
                    <a>通报巡查员</a>
                </div>
            </div>
            <!-----------查询部分------->
			<div class="search">
				<div class="block" style="margin-top: 20px;">
				    <!--<span class="demonstration">网格名称</span>
				    <el-input v-model="gridName" placeholder="请输入内容"></el-input>-->
				    <span class="demonstration">巡查员姓名</span>
				    <!--<el-input v-model="griderName" placeholder="请输入内容"></el-input>-->
				    <el-select v-model="griderName" clearable placeholder="请选择">
					    <el-option
					      v-for="item in griderOptions"
					      :key="item.value"
					      :label="item.name"
					      :value="item.userId">
					    </el-option>
					</el-select>
				    <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
				    <el-button type="primary" class='btns' @click='ExportReportExcel'>导出</el-button>
				    <el-button type="primary" class='btns' @click='handleAdd'>添加</el-button>
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
			      prop="userName"
			      label="巡查员姓名"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="createTime"
			      label="日期">
			    </el-table-column>
			    <el-table-column
			      prop="event"
			      label="原因">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      label="罚金">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="200">
			      <template scope="scope">
			        <div>
			        	<el-button @click="handleExamineClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
			        </div>
			      </template>
			    </el-table-column>
			</el-table>
		   	<div class="page">
			    <span class="demonstration">共找到{{totalCount}}条记录</span>
			    <el-pagination
				  background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-size="pageSize"
			      layout="prev, pager, next, jumper"
			      :total="totalCount">
			    </el-pagination>
			</div>
			<!--------------添加弹框部分--------------->
			<div class="popUp" v-if="isAdd">
	            <div class="mask"></div>
	            <div class="succ-pop reply">
	                <div class="title">
	                    <a>通报巡查员</a>
	                    <div class="el-icon-close" @click="isAdd=false"></div>
	                </div>
	                <div class="content">
						<div class="block">
						    <span>巡查员姓名</span>
						    <el-select v-model="AddGriderName" @change="AddSelect" placeholder="请选择">
							    <el-option
							      v-for="item in AddGriderOptions"
							      :key="item.value"
							      :label="item.name"
							      :value="item.userId">
							    </el-option>
							</el-select>
						    <i>*</i>
					  	</div>
					  	<div class="block">
						    <span>罚金</span>
						    <el-input v-model="AddMoney" placeholder=""></el-input>
						    <i>*</i>
					  	</div>
					  	<div class="block">
					  		<span class="left">原因</span>
						  	<el-input
								type="textarea"
								:rows="3"
								placeholder=""
								v-model="AddStory"
								>
							</el-input>
						</div>
						<div class="block" style="margin-bottom: 20px;">
					  		<span class="left">备注</span>
						  	<el-input
								type="textarea"
								:rows="3"
								placeholder=""
								v-model="AddDescribe"
								>
							</el-input>
						</div>
						<el-row style='position: absolute;bottom: 30px;right: 30px;'>
							<el-button type="primary" @click='AddOver'>确定</el-button>
							<el-button plain @click='isAdd=false'>取消</el-button>
						</el-row>
	               </div>
	            </div>
	        </div>
	        <!--------------编辑弹框部分--------------->
			<div class="popUp" v-if="isEdit">
	            <div class="mask"></div>
	            <div class="succ-pop reply">
	                <div class="title">
	                    <a>编辑通报巡查员</a>
	                    <div class="el-icon-close" @click="isEdit=false"></div>
	                </div>
	                <div class="content">
						<div class="block">
						    <span>巡查员名称</span>
						    <el-select v-model="EditGriderName" @change="EditSelect" clearable placeholder="请选择">
							    <el-option
							      v-for="item in EditGriderOptions"
							      :key="item.value"
							      :label="item.name"
							      :value="item.userId">
							    </el-option>
							</el-select>
						    <i>*</i>
					  	</div>
					  	<div class="block">
						    <span>罚金</span>
						    <el-input v-model="EditMoney" clearable placeholder=""></el-input>
						    <i>*</i>
					  	</div>
					  	<div class="block">
					  		<span class="left">原因</span>
						  	<el-input
								type="textarea"
								:rows="3"
								placeholder=""
								v-model="EditStory"
								>
							</el-input>
						</div>
						<div class="block" style="margin-bottom: 20px;">
					  		<span class="left">备注</span>
						  	<el-input
								type="textarea"
								:rows="3"
								placeholder=""
								v-model="EditDescribe"
								>
							</el-input>
						</div>
						<el-row style='position: absolute;bottom: 30px;right: 30px;'>
							<el-button type="primary" @click='EditOver'>确定</el-button>
							<el-button plain @click='isEdit=false'>取消</el-button>
						</el-row>
	               </div>
	            </div>
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
			    pageSize:10,
				totalCount:'',
				InfoData:[],
				ListData:[],
				pageNo:1,
	         //网格
	         gridName:'',
	         //添加
	         griderName:'',//巡查员姓名
	         griderOptions:[],//巡查员姓名列表
	         //添加
	         AddGriderName:'',
	         AddGriderOptions:[],
	         isAdd:false,
	         AddDescribe:'',//说明
	         AddMoney:'',//奖金
	         AddStory:'',//事迹
	         AddObj:{},
	         //编辑
	         userId:'',
	         EditObj:{},
	          EditGriderName:'',
	         EditGriderOptions:[],
	         isEdit:false,
	         EditDescribe:'',//说明
	         EditMoney:'',//奖金
	         EditStory:'',//事迹
	         id:''
            }
        },
        created(){
        	this.GetMonitoringDay();
        	this.GetGridName();
        },
        mounted() {
        	
        },
        computed: {
            
        },
        methods: {
        	//点击添加
        	handleAdd(){
        		this.isAdd = true;
        		this.AddGriderName = '';
        		this.AddMoney = '';
        		this.AddStory = '';
        		this.AddDescribe = '';
        	},
        	//点击编辑
        	handleExamineClick(val){
        		console.log(val)
        		this.isEdit = true;
        		this.userId = val.userId;
        		this.EditGriderName = val.userName;
        		this.EditMoney = val.money;
        		this.EditStory = val.event;
        		this.id = val.id;
        		console.log(val);
        	},
      		//分页
      		 handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
//      		this.GetMonitoringDay(10,val);
      		},
      		handleCurrentChange(val) {
				this.pageNo = val;
				this.GetMonitoringDay();
      		},
      		//获取巡查员姓名
      		GetGridName(){
      			let t = this;
      			api.GetStarGridName().then(res=>{
      				console.log(res);
      				this.griderOptions = res.data.data;
      				this.AddGriderOptions = res.data.data;
      				this.EditGriderOptions = res.data.data;
      			})
      		},
      		//获取列表
      		GetMonitoringDay(){
      			let t = this;
      			let userId = this.griderName;
      			let pageSize = this.pageSize;
      			let pageNo = this.pageNo;
      			t.ListData = [];
      			api.GetReportList(userId,pageSize,pageNo).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.data.rows;
      					t.totalCount = result.data.data.total;
//    					console.log(InfoData)
//    					console.log('11')
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = {};
								tableData.userId = item.userId;
								tableData.userName = item.userName;
								tableData.createTime = t.Format(item.createTime);
								tableData.event = item.event;
								tableData.money = item.money;
								tableData.id = item.id;
		                        t.ListData.push(tableData);
							})
      					}
      				}
				});
      		},
      		//添加下拉选择
      		AddSelect(val){
      			console.log(val)
      			this.AddObj = {};  
			    this.AddObj = this.AddGriderOptions.find((item)=>{//this.ruleForm  
			    return item.userId === val;//筛选出匹配数据  
			    });  
      		},
      		//编辑下拉选择
      		EditSelect(val){
      			console.log(val)
      			this.EditObj = {};  
			    this.EditObj = this.EditGriderOptions.find((item)=>{//this.ruleForm  
			    return item.userId === val;//筛选出匹配数据  
			    });  
      		},
      		//添加确定
      		AddOver(){
      			let t = this;
      			let userId = this.AddObj.userId;
      			let userName = this.AddObj.name;
      			let money = this.AddMoney;
      			let event = this.AddStory;
      			let comment = this.AddDescribe;
      			if(!this.AddGriderName||this.AddMoney==''){
      				 this.$message({
				          message: '必填项不可为空',
				          type: 'warning'
				    });
      			}else{
      				api.AddReportEvent(userId,userName,money,event,comment).then(res=>{
      					t.GetMonitoringDay();
      					t.isAdd = false;
      				})
      			}
      		},
      		//编辑确定
      		EditOver(){
      			let t = this;
      			let id = this.id;
      			let userName = this.EditObj.name?this.EditObj.name:this.EditGriderName;
      			let userId = this.EditObj.userId?this.EditObj.userId:this.userId;
      			let money = this.EditMoney;
      			let event = this.EditStory;
      			let comment = this.EditDescribe;
      			console.log(userId)
      			if(!this.EditGriderName||this.EditMoney==''){
      				 this.$message({
				          message: '必填项不可为空',
				          type: 'warning'
				    });
      			}else{
      				api.EditStarEvent(id,userId,userName,money,event,comment).then(res=>{
      					t.GetMonitoringDay();
      					t.isEdit = false;
      				})
      			}
      		},
      		//导出
      		ExportReportExcel(){
      			let userId = this.griderName;
      			api.ExportReportExcel(userId);
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
            
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePreview(file) {
		        console.log(file);
		    },
		    Format(timestamp){
				//时间戳是整数，否则要parseInt转换
				var time = new Date(timestamp*1000);
				var year = time.getFullYear();
				var month = time.getMonth()+1;
				var day = time.getDate()+' ';
				var h = time.getHours() + ':';
		        var m = time.getMinutes() + ':';
		        var s = time.getSeconds();
				if(month<10){
					month = "0" + month;
				}
				if(day<10){
					day = "0" + day;
				}
				if(h<10){
					h = "0" + h;
				}
				if(m<10){
					m = "0" + m;
				}
				if(s<10){
					s = "0" + s
				}
				return year+'-'+month+'-'+day +h+m+s;
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
        /*****添加弹出框内容********/
        .reply {
            width: 400px;
            height: 500px;
            background: #fff;
            position: fixed;
            left: 50%;
            top: 50%;
            margin-left: -200px;
            margin-top: -250px;
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
            			width: 70px;
            			text-align: right;
            		}
            	}
            	.el-textarea{
					width: 200px;
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
