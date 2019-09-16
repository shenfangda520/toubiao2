<!--后台管理-上报查询-->
<template>
    <div class="CaseReview">
		<!--上报查询右侧数据展示-->
		<div id="right">
			<!--上报查询-->
			<div class="box">
                <div class="warning">
                    <a>上报查询</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<div class="block" style="margin-top: 20px;">
				    <span class="demonstration">巡查员姓名</span>
				    <el-input v-model="patrollerName" placeholder="请输入内容" clearable></el-input>
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
			      prop="Town"
			      label="所属乡镇"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="Country"
			      label="所属村庄"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="GridMember"
			      label="巡查员姓名"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="SubmitCount"
			      label="上报案件数量">
			    </el-table-column>
				<!--<el-table-column-->
						<!--prop="distortNum"-->
						<!--label="误报案件数量">-->
				<!--</el-table-column>-->
			    <!--<el-table-column-->
			      <!--prop="per"-->
			      <!--label="误报率">-->
			    <!--</el-table-column>-->
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
                //
                patrollerName:'',
                CaseStartTime:'',
                CaseEndTime:'',
		        tableData:[],
			    currentPage: 1,
			    pagesize:10,
				startTime:'',
				endTime:'',
				totalCount:1,
                allData:[],
				InfoData:[]
            }
        },
        mounted() {
            this.GetMonitoringDay();
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
			//
            handleCurrentChange(val){
        	    console.log(`这是 ${val} 页码`);
                this.setPageTable(10, val);
			},
      		//获取列表
      		GetMonitoringDay(){
      			const _this = this;
                let startTime = this.startTime;
                let endTime = this.endTime;
                let name = this.patrollerName;
      			this.allData = [];
                //巡查员案件上报统计
                api.PostCaseInfoGroupByUser(startTime,endTime,name).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.Data;
      					_this.totalCount = result.data.Data.length;
      					console.log(InfoData)
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = {};
                                 tableData.Country = item.Country || '--';//
                                 tableData.GridMember = item.GridMember || '--';//
                                 tableData.SubmitCount = item.SubmitCount || '--';//
								 tableData.Town = item.Town || '--';//
		                        _this.allData.push(tableData);
							})
      					}

      				}
                    this.setPageTable(10, 1);
				});
      		},
            //分页效果
            setPageTable(pageSize, pageNum) {
                let rtValue = [];
                let startNum = pageSize * (pageNum - 1);
                for (let i = 0; i < pageSize; i++) {
                    if ((startNum + i + 1) > this.allData.length)
                        break;
                    rtValue.push(this.allData[startNum + i]);
                }
                this.tableData = rtValue;
            },
      		//导出
      		GetExportCase(){
				let startTime = this.startTime;
                let endTime = this.endTime;
                let name = this.patrollerName;
				//巡查员案件上报统计导出
                api.GetCaseInfoGroupByUserIdExcel(startTime,endTime,name);
      		}
        }, 
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

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

	border:1px solid #d1dbe5;

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

}
</style>
