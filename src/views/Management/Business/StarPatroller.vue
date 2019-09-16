<!--后台管理-明星巡查员-->
<template>
    <div class="CaseReview">
		<div id="right">
			<!--明星巡查员-->
			<div class="box">
                <div class="warning">
                    <a>明星巡查员</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<div class="block" style="margin-top: 20px;">
				    <span class="demonstration">乡镇名称</span>
				    <el-input v-model="xiangzhenName" placeholder="请输入内容"></el-input>
				    <span class="demonstration">巡查员姓名</span>
				    <el-select v-model="griderName" filterable  @change="AddSelectName" placeholder="请选择">
					    <el-option
					      v-for="item in griderOptions"
					      :key="item.value"
					      :label="item.Name"
					      :value="item.Id">
					    </el-option>
					</el-select>
				    <el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
				    <el-button type="primary" class='btns' @click='ExportStarExcel'>导出</el-button>
				    <el-button type="primary" class='btns' @click='handleAdd'>添加</el-button>
				</div>
			</div>
			<!--列表部分-->
			<div class="box">
                <div class="warning">
                    <a>列表</a>
                </div>
           	</div>
           	<el-table
			    :data="ListData"
				border
			    style="width: 100%">
				<el-table-column
						prop="TownName"
						label="所属乡镇"
						width="">
				</el-table-column>
				<el-table-column
						prop="VillageName"
						label="所属村庄"
						width="">
				</el-table-column>
			    <el-table-column
			      prop="MemberName"
			      label="巡查员姓名"
			      width="">
			    </el-table-column>
			    <el-table-column
			      prop="CreatedTime"
			      label="日期">
			    </el-table-column>
			    <el-table-column
			      prop="Deeds"
			      label="事迹"
				  :show-overflow-tooltip="true"
				>
			    </el-table-column>
			    <el-table-column
			      prop="Bonus"
			      label="奖金">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="100">
			      <template scope="scope">
			        <div>
			        	<el-button @click="handleExamineClick(scope.row)" type="text" size="small" class='eidt'>查看</el-button>
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
			<!--添加-查看-部分-->
			<el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
				<div class="tanchuan-box">
					<div class="block">
						<span>巡查员名称：</span>
						<el-select v-model="AddGriderName" @change="AddSelect" placeholder="请选择">
							<el-option
									v-for="item in AddGriderOptions"
									:key="item.value"
									:label="item.Name"
									:value="item.Id">
							</el-option>
						</el-select>
					</div>
					<div class="block">
						<span>奖金：</span>
						<el-input v-model="Bonus" placeholder="请输入内容"></el-input>
					</div>
					<div class="block kysay">
						<span>事迹：</span>
						<el-input
								type="textarea"
								:rows="4"
								placeholder="请输入内容"
								v-model="Deeds">
						</el-input>
					</div>
					<div class="block kysay">
						<span>备注：</span>
						<el-input
								type="textarea"
								:rows="4"
								placeholder="请输入内容"
								v-model="Remarks">
						</el-input>
					</div>
				</div>
				<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="AddOver">确 定</el-button>
			  </span>
			</el-dialog>
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
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                totalCount: 1,
                InfoData: [],
                ListData: [],
                pageNo: 1,
                dialogVisible:false,
                //乡镇名称
                xiangzhenName: '',
                //添加
                Bonus:'',
                Deeds:'',
                Remarks:'',
                Reward:'',
                griderName: '', //巡查员姓名
                griderOptions: [], //巡查员姓名列表
                AddGriderName: '',
                AddGriderOptions: [],
                AddObj: {}
            }
        },
        created(){

        },
        mounted() {
            this.GetMonitoringDay();
            this.GetGridName();
        },
        computed: {
            
        },
        methods: {
            //
            handleAdd(){
                this.Bonus = '';
                this.Deeds = '';
                this.Remarks = '';
                this.AddGriderName = '';
                this.dialogVisible = true;
			},
            //
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
        	//点击查看
        	handleExamineClick(val){
                const _this = this;
                _this.dialogVisible = true;
        		console.log(val)
				let Id = val.Id;
                api.GetStarmemberGridName(Id).then(res=>{
                    console.log(res.data);
                    _this.Bonus = res.data.Data.Bonus;
                    _this.Deeds = res.data.Data.Deeds;
                    _this.Remarks = res.data.Data.Remarks;
                    _this.AddGriderName = res.data.Data.GridMember;
				})
        	},
      		//分页
      		 handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
			//
      		handleCurrentChange(val) {
				this.pageNo = val;
				this.GetMonitoringDay();
      		},
      		//获取巡查员姓名
      		GetGridName(){
				//
      			api.GetStarGridName().then(res=>{
      				console.log(res);
					this.griderOptions = res.data.Data;
      				this.AddGriderOptions = res.data.Data;
      			})
      		},
      		//获取列表
      		GetMonitoringDay(){
      			const _this = this;
      			let townname = _this.xiangzhenName || '';
      			let membername = _this.AddObj.Name || '';
      			let star = 1;//明星
      			let PageSize = _this.pageSize;
      			let PageIndex = _this.pageNo;
      			_this.ListData = [];
      			api.GetStarList(townname, membername, star,PageIndex,PageSize).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.Data;
                        _this.totalCount = result.data.TotalRowsCount;
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = {};
								tableData.CreatedTime = item.CreatedTime.replace('T',' ');
                                tableData.Deeds = item.Deeds;
                                tableData.Bonus = item.Bonus;
                                tableData.Id = item.Id;
                                tableData.MemberName = item.MemberName;
                                tableData.TownName = item.TownName;
                                tableData.VillageName = item.VillageName;
		                        _this.ListData.push(tableData);
							})
      					}
      				}
				});
      		},
			//
            AddSelectName(val){
                this.AddObj = {};
                this.AddObj = this.griderOptions.find((item)=>{
					//console.log(item);
					if (val === item.Id) {
					    return item;
					}
                });
                console.log(this.AddObj);
			},
      		//添加下拉选择
      		AddSelect(val){
      			console.log(val)
      			this.AddObj = {};  
			    this.AddObj = this.AddGriderOptions.find((item)=>{return item.Id === val});
      		},
      		//添加确定
      		AddOver(){
      			const _this = this;
      			let GridMember = _this.AddObj.Id;//巡查员
      			let Deeds = _this.Deeds;//事迹
      			let Bonus = _this.Bonus;//奖金
      			let Reward = _this.Reward;//奖罚
      			let Remarks = _this.Remarks;//备注
      			if(!_this.AddGriderName||_this.Bonus==''){
                    _this.$message({message: '必填项不可为空', type: 'warning'});
      			}else{
      				api.AddStarEvent(GridMember, Deeds, Bonus, Reward, Remarks).then(res=>{
                        if (res.data.Status === 1) {
                            _this.$message({showClose: true, message: '添加成功', type: 'success'});
                            _this.GetMonitoringDay();
                        } else {
                            _this.$message({showClose: true, message: '添加失败', type: 'error'});
                        }
                        _this.dialogVisible = false;
      				})
      			}
      		},
      		//导出
      		ExportStarExcel(){
                const _this = this;
                let townname = _this.xiangzhenName || '';
                let membername = _this.AddObj.Name || '';
                let star = 1;//明星
                let PageSize = _this.pageSize;
                let PageIndex = _this.pageNo;
      			api.ExcelOutPutMemberExcel(townname, membername, star,PageIndex,PageSize);
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
	.tanchuan-box{
		width: 100%;
		height: auto;
		.block{
			width: 96%;
			margin-top: 15px;
			margin-left: -20px;
			span{
				display: inline-block;
				width: 100px;
				text-align: right;
			}
			.el-textarea{
				width: 200px;
			}
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
