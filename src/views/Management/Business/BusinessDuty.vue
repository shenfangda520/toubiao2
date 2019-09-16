
<!--后台管理-责任部门管理-->
<template>
    <div class="businessOperation">
		<div id="right">
			<div class="box">
                <div class="warning">
                    <a>责任部门管理</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<span>部门名称</span><el-input v-model="departmentVal" placeholder="请输入内容"></el-input>
				<el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>
				<el-button type="primary" class='btns' @click="openWin">添加责任部门</el-button>
				<el-button type="primary" class='btns' @click="Export">导出</el-button>
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
			      prop="code"
			      label="部门编号"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="责任部门名称"
			      >
			    </el-table-column>
				<!--<el-table-column-->
					<!--prop="createTime"-->
					<!--label="创建时间"-->
				<!--&gt;-->
				<!--</el-table-column>-->
				<el-table-column
					prop="contact"
					label="主管领导"
				>
				</el-table-column>
			     <el-table-column
			      prop="phoneNum"
			      label="联系方式"
			      >
			    </el-table-column>
				<el-table-column
					prop="isForbidenString"
					label="是否禁用"
					width="100"
				>
				</el-table-column>
			    <el-table-column
			      label="操作"
			      width="120">
			      <template scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
			        <span style="color: #eee;">|</span>
			        <span class="OverBox">
			        	<el-button v-if="scope.row.isForbidenString==='未禁用'" @click="DeleteOperatorInfo(scope.row)" type="text" size="small" class='eidt'>禁用</el-button>
						<el-button v-if="scope.row.isForbidenString==='已禁用'" @click="ForResponsibility(scope.row)" type="text" size="small" class='eidt'>解禁</el-button>
			        </span>
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
	                    <div class="el-icon-close" @click="isNew = false"></div>
	                </div>
	                <div class="content">
						<!---->
						<!--<div class="block">-->
						    <!--<span>部门编号</span>-->
						    <!--<el-input v-model="equipmentPerson1" placeholder="请输入内容"></el-input>-->
						<!--</div>-->
						<div class="block">
							<span>部门名称</span>
							<el-input v-model="equipmentPerson2" placeholder="请输入内容"></el-input>
						</div>
						<div class="block">
							<span>主管领导</span>
							<el-input v-model="equipmentPerson3" placeholder="请输入内容"></el-input>
						</div>
						<div class="block">
							<span>联系方式</span>
							<el-input v-model="equipmentPerson4" placeholder="请输入内容"></el-input>
						</div>
						<div class="block">
							<span>联系地址</span>
							<el-input v-model="address" placeholder="请输入内容"></el-input>
						</div>
						<!--<div class="block">-->
							<!--<span>是否禁用</span>-->
							<!--<el-select v-model="isForbidenVale" filterable  @change="AddSelectName" placeholder="请选择">-->
								<!--<el-option-->
										<!--v-for="item in isForbidenOptions"-->
										<!--:key="item.value"-->
										<!--:label="item.name"-->
										<!--:value="item.value">-->
								<!--</el-option>-->
							<!--</el-select>-->
						<!--</div>-->
						<el-row style='position: absolute;bottom: 20px;right: 30px;'>
							<el-button type="primary" @click='publish'>确定</el-button>
							<el-button plain @click='isNew=false'>取消</el-button>
						</el-row>
	               </div>
	            </div>
	        </div>
	        <!--编辑弹框部分-->
			<div class="popUp" v-show="isEdit">
	            <div class="mask"></div>
	            <div class="succ-pop">
	                <div class="title">
	                    <a>编辑</a>
	                    <div class="el-icon-close" @click="isEdit=false"></div>
	                </div>
	                <div class="content">
						<!---->
						<!--<div class="block">-->
							<!--<span>部门编号</span>-->
							<!--<el-input v-model="equipmentPerson1b" placeholder="请输入内容"></el-input>-->
						<!--</div>-->
						<div class="block">
							<span>部门名称</span>
							<el-input v-model="equipmentPerson2b" placeholder="请输入内容"></el-input>
						</div>
						<div class="block">
							<span>主管领导</span>
							<el-input v-model="equipmentPerson3b" placeholder="请输入内容"></el-input>
						</div>
						<div class="block">
							<span>联系方式</span>
							<el-input v-model="equipmentPerson4b" placeholder="请输入内容"></el-input>
						</div>
						<div class="block">
							<span>联系地址</span>
							<el-input v-model="address" placeholder="请输入内容"></el-input>
						</div>
						<!--<div class="block">-->
							<!--<span>是否禁用</span>-->
							<!--<el-select v-model="isForbidenVale" filterable  @change="AddSelectName" placeholder="请选择">-->
								<!--<el-option-->
										<!--v-for="item in isForbidenOptions"-->
										<!--:key="item.value"-->
										<!--:label="item.name"-->
										<!--:value="item.value">-->
								<!--</el-option>-->
							<!--</el-select>-->
						<!--</div>-->
						<el-row style='position: absolute;bottom: 20px;right: 30px;'>
							<el-button type="primary" @click='EditUpdate'>确定</el-button>
							<el-button plain @click='isEdit=false'>取消</el-button>
						</el-row>
	               </div>
	            </div>
	        </div>

		</div>
    </div>
</template>

<script>
    //import {Message} from 'element-ui';
    import api from '../../../api/index'
    export default {
        name: 'businessOperation',
        data() {
            return {
            	//
		        tableData:[{DeviceName:'0000001'}],
				//
                ListData:[],
				//
			    currentPage: 1,
				//
			    pagesize:10,
				//
                totalCount:1,
				//
                dialogVisible:false,
				//
			    isNew: false,
			    //
			    title:'添加',
				//
                isForbidenVale:'',
                isForbidenOptions:[{name:'禁用', value:'1'}, {name:'不禁用', value:'0'}],
                isForbidenObj:{name:'禁用', value:'1'},
                //添加
                equipmentPerson1:'',
                equipmentPerson2:'',
                equipmentPerson3:'',
                equipmentPerson4:'',
                equipmentPersonid:'',
                address:'',
				//编辑
                equipmentPerson1b:'',
                equipmentPerson2b:'',
                equipmentPerson3b:'',
                equipmentPerson4b:'',
                equipmentPerson1bid:'',
				//
				isEdit:false,
				//责任部门名称
				departmentVal:'',
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
            //添加下拉选择
            AddSelectName(val){
                console.log(val)
                this.isForbidenObj = {};
                this.isForbidenObj = this.isForbidenOptions.find((item)=>{
                    if (val === item.value) {
                        return item;
                    }
                });
            },
            //查询列表
            QueryNeedsData(){
                let condata = this.departmentVal;
                this.getNotice(condata);
            },
			//责任主体解禁
			ForResponsibility(row){
                const _this = this;
                console.log(row)
                let id = row.id;
                this.$confirm('确认要解禁吗？')
                    .then(_ => {
                        // done();
                        console.log('解禁成功')
                        api.POSTForResponsibility(id).then(res=>{
                            console.log(res)
                            if(res.data.status > 0){
                                _this.$message({showClose: true, message: '解禁成功', type: 'success'});
                            }else {
                                _this.$message({showClose: true, message: '解禁失败', type: 'error'});
                            }
                        })
                        //
                        setTimeout(()=>{
                            _this.getNotice();
                        },200)
                    })
                    .catch(_ => {
                        console.log('解禁失败')
                    });
			},
        	//责任主体禁用
        	DeleteOperatorInfo(row) {
                const _this = this;
                console.log(row)
                let id = row.id;
                this.$confirm('确认要禁用吗？')
                    .then(_ => {
                        // done();
						console.log('禁用成功')
                        api.POSTcodeDepartmentlistdelt(id).then(res=>{
                        	console.log(res)
							if(res.data.status > 0){
                                _this.$message({showClose: true, message: '禁用成功', type: 'success'});
							}else {
                                _this.$message({showClose: true, message: '禁用失败', type: 'error'});
							}
                        })
						//
						setTimeout(()=>{
                            _this.getNotice();
						},200)
                    })
                    .catch(_ => {
                        console.log('禁用失败')
                    });
		    },
			//添加数据
            publish(){
                this.Insert();
                this.openWin();
                this.isNew = false;
			},
			//编辑
	        handleClick(row) {
	        	this.isEdit = true;
	        	console.log(row)
	        	if(this.isEdit){
	      			this.equipmentPerson1bid = row.id;
	      			//this.equipmentPerson1b = row.id;
	      			this.equipmentPerson2b = row.name;
	      			this.equipmentPerson3b = row.contact;
	      			this.equipmentPerson4b = row.phoneNum;
	        	}
	        	this.isNew = false;
      		},
      		//编辑发布
      		EditUpdate(){

      			const _this = this;
      			let id = this.equipmentPerson1bid;
                let name = _this.equipmentPerson2b;
                let contact = _this.equipmentPerson3b;
                let phoneNum = _this.equipmentPerson4b;
                let address = _this.address;
                //let isForbiden = _this.isForbidenObj.value;
      			api.POSTcodeDepartmentlistupt(id, name, address, contact, phoneNum).then(result=>{
      			    console.log(result);
      			    //let info = result.data.message;
      			    //let error = result.data.errorDesc;
                    if(result.data.status > 0){
                        _this.$message({showClose: true, message: '修改成功！', type: 'success'});
                    }else {
                        _this.$message({showClose: true, message:'修改失败！', type: 'error'});
                    }
                    _this.getNotice();
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
                let cona = this.departmentVal;
                //let pag = val;
                this.getNotice(cona);
      		},
			//
      		openWin(){
      			this.isEdit = false;
      			this.isNew = true;
      			this.equipmentPerson1 = '';
      			this.equipmentPerson2 = '';
				this.equipmentPerson3 = '';
				this.equipmentPerson4 = '';
      		},
      		//添加数据
      		Insert(){
                const _this = this;
                let id = _this.equipmentPerson1;
                let name = _this.equipmentPerson2;
                let contact = _this.equipmentPerson3;
                let phoneNum = _this.equipmentPerson4;
                let address = _this.address;
                //let isForbiden = _this.isForbidenObj.value;
				api.POSTcodeDepartmentlistaddt(id, name, address, contact, phoneNum).then(result=>{
                    console.log(result);
                    //let info = result.data.message;
                    //let error = result.data.errorDesc;
                    if(result.data.status > 0){
                        _this.$message({showClose: true, message: '修改成功！', type: 'success'});
                    }else {
                        _this.$message({showClose: true, message:'添加失败！', type: 'error'});
                    }
                    _this.getNotice();
				});
      		},
      		//获取列表数据
      		getNotice(name = ''){
                let tbname = name;
      			const _this = this;
      			this.tableData = [];
      			api.GetcodeDepartmentlistdt(tbname).then(result=>{
      			    console.log(result);
                    let InfoData = result.data.data;
                    _this.totalCount = result.data.data.length;
					InfoData.forEach(item=>{
						const tableData = {};
                        tableData.id = item.id;//id
                        tableData.code = item.id;//部门编码
                        tableData.name = item.name;//部门名称
						tableData.phoneNum = item.phoneNum;//联系方式
                        tableData.isForbidenString = item.isForbidenString;//禁用状态
                        tableData.contact = item.contact;//主管领导
						tableData.createTime = item.createTime;
                        _this.tableData.push(tableData);
					})
                    //_this.setPageTable(10, 1);
				});
      		},

			//倒出
            Export(){
				api.ExportResponsibilityExcel();
			}
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
