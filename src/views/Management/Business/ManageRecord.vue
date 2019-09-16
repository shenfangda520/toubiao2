<!--后台管理-调度记录-->
<template>
    <div class="CaseReview">
		<div id="right">
			<!----------调度记录-->
			<div class="box">
                <div class="warning">
                    <a>调度记录</a>
                </div>
            </div>
            <!-----------查询部分------->
			<div class="search">
				<div class="block" style="margin-top: 20px;">
				    <span class="demonstration">起始时间</span>
				    <el-date-picker
				      v-model="BeginTime"
				      type="date"
				      value-format="yyyy-MM-dd"
				      placeholder="选择日期时间"
				      @change=''>
				    </el-date-picker>
				    -
				    <el-date-picker
				      v-model="EndTime"
				      type="date"
				      value-format="yyyy-MM-dd"
				      placeholder="选择日期时间"
				      @change=''>
				    </el-date-picker>
				    <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
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
			      prop="title"
			      label="标题"
			      width="200">
			    </el-table-column>
			    <el-table-column
			      prop="content"
			      label="内容"
			      width="350">
			    </el-table-column>
			    <el-table-column
			      prop="sendtime"
			      label="下发时间"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="username"
			      label="接收人">
			    </el-table-column>
			    <el-table-column
			      prop="sendname"
			      label="下发人">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="200">
			      <template scope="scope">
			        <div>
			        	<el-button @click="handleExamineClick(scope.row)" type="text" size="small">查看</el-button>
			        </div>
			      </template>
			    </el-table-column>
			</el-table>
			<el-dialog
			  title="查看"
			  :visible.sync="centerDialogVisible"
			  width="30%"
			  >
			  <div id="content">
				  <div>
				  	<span>标题</span>
				  	<el-input type="text" class="block" v-model='title' disabled></el-input>
				  </div>
				  <div>
				  	<span style="float: left;">内容</span>
				  	<el-input type="textarea" :rows="5" class="block" v-model='content' disabled></el-input>
				  </div>
				  <div>
				  	<span>接收人</span>
				  	<el-input type="text" class="block" v-model='receivePerson' disabled></el-input>
				  </div>
				  <div>
				  	<span>下发人</span>
				  	<el-input type="text" class="block" v-model='sendPerson' disabled></el-input>
				  </div>
				  <div>
				  	<span>下发时间</span>
				  	<el-input type="text" class="block" v-model='sendTime' disabled></el-input>
				  </div>
			  </div>
			  
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			  </span>
			</el-dialog>

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
			    totalCount:1,
				//查询
				BeginTime:'',
				EndTime:'',
				InfoData:[],
				ListData:[],
//				jsonData:[{title:"哈哈",con:'胡',time:'急急急',ren:'几'}],
				pageNo:1,
				//查看
				centerDialogVisible:false,
				title:'',
				content:'',
				receivePerson:'',
				sendPerson:'',
				sendTime:''
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
        	
        	//点击查看
        	handleExamineClick(row){
        		this.centerDialogVisible = true;
        		this.title = row.title;
        		this.content = row.content;
        		this.receivePerson = row.username;
        		this.sendTime = row.sendtime;
        		this.sendPerson = row.sendname;
        		console.log(row);
        		
        	},
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
      		},
      		handleCurrentChange(val) {
      			let t = this;
      			this.pageNo = val;
        		this.GetMonitoringDay();
      		},
      		//关闭分配提示
      		closeWin(){
      			this.isUpdate = false;
      		},
      		//获取列表
      		GetMonitoringDay(){
      			let t = this;
				let beginTime = this.BeginTime;
				let endTime = this.EndTime;
				let PageSize = 10;
				let PageIndex = this.pageNo;
      			this.ListData = [];
      			api.GetScheduleMessageList(beginTime,endTime,PageIndex,PageSize).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.Data.Data;
      					t.totalCount = result.data.Data.TotlePageNum;
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = {};
								tableData.title = item.title;
		                        tableData.sendtime = item.sendtime.replace('T',' ');
		                        tableData.content = item.content;
		                        tableData.sendname = item.sendname;
		                        tableData.username = item.username;
		                        t.ListData.push(tableData);
							})
      					}
      				}
				});
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

#right{
	width: 100%;
	overflow: hidden;
	padding: 20px;
	background-color: #f6fbff;
	#content{
		padding:0 20px;
		div{
			text-align: left;
			margin-bottom: 10px;
			span{
				display: inline-block;
				width: 60px;
				text-align: right;
			}
		}
		.block{
			width: 300px;
		}
		
	}
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
     
}
</style>
