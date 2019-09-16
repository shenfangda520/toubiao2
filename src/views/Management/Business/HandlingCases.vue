<!--后台管理-网格员巡查案件-案件处理-->
<template>
    <div class="handling-cases">
		<div id="right">
			<!--案件处理-->
			<div class="box">
                <div class="warning">
                    <a>案件处理</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<div class="block" style="margin-top: 20px;">
					<span class="demonstration">案件来源</span>
					<el-select v-model="EventSourceVal" @change="AddSelectName1" placeholder="请选择">
						<el-option
								v-for="item in EventSources"
								:key="item.Code"
								:label="item.Name"
								:value="item.Code">
						</el-option>
					</el-select>
				    <span class="demonstration">案件类型</span>
				    <el-select v-model="EventTypeVal" @change="AddSelectName2" placeholder="请选择">
					    <el-option
					      v-for="item in EventTypes"
					      :key="item.Code"
					      :label="item.Name"
					      :value="item.Code">
					    </el-option>
					</el-select>
					<span class="demonstration">案件状态</span>
					<el-select v-model="EventStatusVal" @change="AddSelectName3" placeholder="请选择">
						<el-option
								v-for="item in EventStatus"
								:key="item.Code"
								:label="item.Name"
								:value="item.Code">
						</el-option>
					</el-select>

				</div>
				<div class="block"style="margin-top: 10px;">
					<span class="demonstration">案发时间</span>
					<el-date-picker
							v-model="TimeCase"
							type="datetimerange"
                            @change="classTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期">
					</el-date-picker>
					<!---->
					<span class="demonstration">网格名称</span>
					<el-input v-model="GridName" placeholder="请输入内容"></el-input>
					<!---->
					<el-button type="primary" class='btns' @click='GetMonitoringDay'>查询</el-button>
					<el-button type="primary" class='btns' @click='ExportStarExcel'>导出</el-button>

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
						prop="EventTypeName"
						label="污染类型"
						width="">
				</el-table-column>
				<el-table-column
						prop="GridName"
						label="网格名称"
						width="">
				</el-table-column>

			    <el-table-column
			      prop="RecordingTime"
			      label="案发时间"
				  :show-overflow-tooltip="true"
				>
			    </el-table-column>
				<el-table-column
						prop="EventSource"
						label="案件来源"
						width="">
				</el-table-column>
			    <el-table-column
			      prop="Author"
			      label="提交人">
			    </el-table-column>
			    <el-table-column
			      prop="Description"
			      label="描述"
				  :show-overflow-tooltip="true"
				>
			    </el-table-column>
				<el-table-column
						prop="Location"
						label="位置"
						:show-overflow-tooltip="true"
				>
				</el-table-column>
				<el-table-column
						prop="Status"
						label="案件状态">
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
			<!--查看-->
			<el-dialog title="案件详情" :visible.sync="dialogVisible" width="500px">
				<div class="tanchuan-box">
					<div class="block">
						<span>巡查员名称</span>
						<el-input v-model="listalldata.GridMember" placeholder="请输入内容"></el-input>
					</div>
					<div class="block">
						<span>案件地址</span>
						<el-input v-model="listalldata.Location" placeholder="请输入内容"></el-input>
					</div>
					<div class="block">
						<span>案件状态</span>
						<el-input v-model="listalldata.EventStatus" placeholder="请输入内容"></el-input>
					</div>
					<div class="block">
						<span>描述</span>
						<el-input v-model="listalldata.Description" placeholder="请输入内容"></el-input>
					</div>
					<div class="block">
						<span>作者</span>
						<el-input v-model="listalldata.Author" placeholder="请输入内容"></el-input>
					</div>
					<div class="block clodfg">
						<div class="img_float">
							<span class="fix_index">案前照片</span>
							<img @click="submitImages(listalldata.AQFileUrl)" :src="listalldata.AQFileUrl[0]" alt="案前照片">
						</div>
						<div class="img_float">
							<span class="fix_index">案后照片</span>
							<img @click="submitImages(listalldata.AHFileUrl)" :src="listalldata.AHFileUrl[0]" alt="案后照片">
						</div>
					</div>
				</div>
			</el-dialog>
			<!--查看图片-->
			<el-dialog title="详情图片" :visible.sync="imgVisible" width="800px">
				<el-carousel :interval="2000" type="card" height="400px">
					<el-carousel-item v-for="(item,index) in imgdata" :key="index">
						<img style="width: 100%;height: 100%" :src="item">
					</el-carousel-item>
				</el-carousel>
			</el-dialog>
		</div>
    </div>
</template>

<script>
    //import {Message} from 'element-ui';
    import api from '../../../api/index'
    export default {
        name: 'handling-cases',
        data() {
            return {
                listalldata: {
                    GridMember: '',
                    Location: '',
                    Description: '',
                    Author: '',
                    EventStatus:'',
                    AQFileUrl: [],
                    AHFileUrl: []
                },
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                totalCount: 1,
                value4:'',
                InfoData: [],
                ListData: [],
                pageNo: 1,
                imgdata:[],
                imgVisible:false,
                dialogVisible:false,
                Bonus:'',
                Deeds:'',
                Remarks:'',
                Reward:'',
                GridName:'',//网格名称
                griderName: '', //巡查员姓名
                griderOptions: [], //巡查员姓名列表
                AddGriderName: '',
                AddGriderOptions: [],
                TimeCase:[],//案发时间
                AddObj1: {},//来源
                AddObj2: {},//类型
                AddObj3: {},//状态
                AddObj4: {},//部门
                //状态
                EventStatusVal:'全部',
                EventStatus:[],
                //类型
                EventTypeVal:'全部',
                EventTypes:[],
                //部门
                ResponsibleDepartVal:'全部',
                ResponsibleDeparts:[],
                //来源
                EventSourceVal:'全部',
                EventSources:[],
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
                this.$confirm('确认关闭？').then(_ => {done();}).catch(_ => {});
            },
        	//点击查看
        	handleExamineClick(val){
                const _this = this;
                _this.dialogVisible = true;
        		console.log(val)
				let Id = val.Id;
                api.CgetCaseDetail(Id).then(res=>{
                    console.log(res.data);
                    let data = res.data.Data;
                    const  listalldata = {
                            GridMember: data.GridMember,
                            Location: data.Location,
                            Description: data.Description,
                        	EventStatus:data.EventStatus,
                            Author: data.Author,
                            AQFileUrl: data.AQFileUrl===true?data.AQFileUrl:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544595486556&di=83b00114dbfa7a49aed21a624874c42c&imgtype=0&src=http%3A%2F%2Fdingyue.nosdn.127.net%2F6IdO9FACPfxWqe%3Dnm3PV7AtMPqca9y8rUBpB7QcWHlCQf1542102570606compressflag.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544595486553&di=f1d0c55b6b054c10f51d082c89de74e5&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181203%2F04d44f5584fc4e3eb2c5a782e69fa656.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544595486532&di=357bd60a13c942d7040617b33fb9a8a4&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fe41fead4e0fc06aa9ecbbb7cc5116fea.jpeg'],
                            AHFileUrl: data.AHFileUrl===true?data.AHFileUrl:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544595486564&di=57c14845c9773c3f9ed2a6bcda383558&imgtype=0&src=http%3A%2F%2Fp1.qhimgs4.com%2Ft01d526f368e104b6e9.jpg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544595486538&di=8ad6e42978b905af38c4d9d77c9d2c1b&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181203%2F268a0afcf3314738bd0abd25a2351391.jpeg','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544595486526&di=5549d0c7cd484ea7e3b75dbc38bce467&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20181203%2F26f25d899eb54ac4b1f8aa2d08478393.jpeg']
                        };
                    _this.listalldata = listalldata;
				})
        	},
            //
            classTime(val){
                //console.log(val);
                console.log(this.TimeCase)
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
                const _this = this;
                //来源
				api.CgetEventSource().then(res=>{_this.EventSources = res.data.Data;});
                //类型
				api.CgetEventType().then(res=>{_this.EventTypes = res.data.Data;})
                //责任部门
				api.CgetResponsibleDepart().then(res=>{_this.ResponsibleDeparts = res.data.Data;})
                //状态
				api.CgetEventStatus().then(res=>{_this.EventStatus = res.data.Data;})
      		},
      		//获取列表
      		GetMonitoringDay(){
      			const _this = this;
      			let GridName = _this.GridName || '';
      			let EventStatusCode = _this.AddObj3.Code|| 0;
      			let EventTypeCode = _this.AddObj2.Code|| 0;
      			let RecordingTimeStart = _this.TimeCase[0];//明星
      			let RecordingTimeEnd = _this.TimeCase[1];
      			let EventSource = _this.AddObj1.Code|| 0;
      			_this.ListData = [];
      			api.CpostCaseList(RecordingTimeStart, RecordingTimeEnd, EventSource,EventTypeCode,EventStatusCode,GridName).then(result=>{
      				console.log(result)
      				if(result){
      					let InfoData = result.data.Data;
                        _this.totalCount = result.data.TotalRowsCount || InfoData.length;
      					if(InfoData){
      						InfoData.forEach(item=>{
								let tableData = {};
								tableData.RecordingTime = item.RecordingTime.replace('T',' ');
                                tableData.Author = item.Author;
                                tableData.Description = item.Description;
                                tableData.Id = item.Id;
                                tableData.EventSource = item.EventSource;
                                tableData.EventTypeName = item.EventTypeName;
                                tableData.GridName = item.GridName;
                                tableData.Location = item.Location;
                                tableData.ConcentrationRecord = item.ConcentrationRecord;
                                tableData.Status = item.Status;
		                        _this.ListData.push(tableData);
							})
      					}
      				}
				});
      		},
			//案件来源
            AddSelectName1(val){
                this.AddObj1 = {};
                this.AddObj1 = this.EventSources.find((item)=>{if (val === item.Code) {return item;}});
			},
            //案件类型
            AddSelectName2(val){
                this.AddObj2 = {};
                this.AddObj2 = this.EventTypes.find((item)=>{if (val === item.Code) {return item;}});
            },
            //案件状态
            AddSelectName3(val){
                this.AddObj3 = {};
                this.AddObj3 = this.EventStatus.find((item)=>{if (val === item.Code) {return item;}});
            },
            //案件部门
            AddSelectName4(val){
                this.AddObj4 = {};
                this.AddObj4 = this.ResponsibleDeparts.find((item)=>{if (val === item.Code) {return item;}});
            },
      		//点击图片轮播效果
      		submitImages(imgs){
      			const _this = this;
                _this.imgVisible = true;
                _this.imgdata = imgs;
      		},
      		//导出
      		ExportStarExcel(){
                const _this = this;
                let GridName = _this.GridName || '';
                let EventStatusCode = _this.AddObj3.Code || 0;
                let EventTypeCode = _this.AddObj2.Code || 0;
                let RecordingTimeStart = _this.TimeCase[0];//明星
                let RecordingTimeEnd = _this.TimeCase[1];
                let EventSource = _this.AddObj1.Code || 0;
      			api.CgetExcelOutPut(RecordingTimeStart, RecordingTimeEnd, EventSource,EventTypeCode,EventStatusCode,GridName)
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
		.clodfg{
			width: 100%;
			height: 180px;
			margin-left: 12px!important;
			.img_float{
				width: 200px;
				height: 180px;
				float: left;
				margin:10px;
				border: solid 1px #ccc;
				position: relative;
				.fix_index{
					position: absolute;
					display: inline-block;
					width: 60px;
					background: #cccccc;
					box-shadow: 0 0 10px #777;
					top: -5px;
					right: 0;
				}
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
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
			width: 100%;
			.el-select{
				margin-right: 30px;
				margin-left: 10px;
			}
			.el-date-editor{
				width: 514px;
				margin-left: 10px;
				margin-right: 20px;
			}
			.el-input{
				margin-left: 10px;
			}
    	}
    	.btns{
    		margin-left: 30px;
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
