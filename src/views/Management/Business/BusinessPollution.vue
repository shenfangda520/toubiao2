
<!--后台管理-企业污染源管理-->
<template>
    <div class="businessOperation">
		<!--企业污染源-->
		<div id="right">
			<!--运维记录管理-->
			<div class="box">
                <div class="warning">
                    <a>企业污染源</a>
                </div>
            </div>
            <!--查询部分-->
			<div class="search">
				<span>企业名称</span><el-input v-model="componyName" placeholder="请输入内容"></el-input>
				<!--<span>网格名称</span><el-input v-model="gridName" placeholder="请输入内容"></el-input>-->
				<el-button type="primary" class='btns' @click="QueryNeedsData">查询</el-button>
				<el-button type="primary" class='btns' @click="openWin">添加企业</el-button>
				<el-button type="primary" class='btns' @click="GetComExcelOutPut">导出</el-button>
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
			      prop="psname"
			      label="企业名称"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="pollutionAddress"
			      label="地址"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="contactPerson"
			      label="联系人"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="mobilePhone"
			      label="联系方式"
			      >
			    </el-table-column>

			    <el-table-column
			      prop="latitude"
			      label="经度"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="longitude"
			      label="纬度"
			      >
			    </el-table-column>

			    <el-table-column
			      label="操作"
			      width="160">
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
			<!---->
			<el-dialog title="企业污染源管理" :visible.sync="dialogVisible" width="30%">
				<!---->
				<el-tabs v-model="activeName">
					<el-tab-pane label="排放口编辑" name="first">
						<div class="addpaiqikou">
							<ul>
								<li style="list-style: none;margin-top: 10px;height: 40px" v-for="(Vent, index) in todos">
									<div class="block">
										<div style="float: left;margin-left: 10px">
											<span>排放口编号：</span>
											<el-input v-model="Vent.outputcode" placeholder="请输入排气口编号"></el-input>
										</div>
										<div style="float: left;margin-left: 20px">
											<span>排放口名称：</span>
											<el-input v-model="Vent.outputname" placeholder="请输入排气口名称"></el-input>
										</div>

									</div>
								</li>
							</ul>
						</div>
						<div class="add-pqbtn" style="margin-top: 10px">
							<el-button type="primary" @click="addVent">添加排气口</el-button>
							<el-button type="primary" @click="delVent">删除排气口</el-button>
						</div>
					<!---->
					</el-tab-pane>
					<el-tab-pane label="企业信息编辑" name="second">
						<!---->
						<div class="qiye-table" style="margin: 25px 10px">
							<!---->
							<table border="1" class="table-up">
								<!---->
								<tr><th bgcolor="#f6f6f6"><div class="caeel">污染源名称</div></th><th colspan="4"><span class="cael"><el-input type="textarea" autosize placeholder="请输入内容" v-model="wryName"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">企业编码</div></th><th colspan="2"><span class="cael"> <el-input size="small" placeholder="请输入内容" v-model="frdm"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">法定代表人</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="frdb"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">污染源地址</div></th><th colspan="4"><span class="cael"><el-input type="textarea" autosize placeholder="请输入内容" v-model="wrydz"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">行政区域</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="xzqy"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">污染源规模</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="wrygm"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">行政类型</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="xzlx"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">污染源类别</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="wrylb"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">单位类型</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="dwlx"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">投产日期</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="tcrq"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">占地面积(m2)</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="zdmj"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">地区名称</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="dqmc"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">是否30千瓦电力企业</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="sfdlqy"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">启用状态</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="qyzt"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">关注程度</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="gzcd"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">运行状态</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="yxzt"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">流域</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="ly"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">在线状态</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="zxzt"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">emial</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="txdz2"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">通讯地址</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="txdz"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">联系人</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="lxr"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">移动电话</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="yddh"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">办公电话</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="bgdh"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">污染源网址</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="wrywz"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">中心经度</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="zxjd"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">中心纬度</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="zxwd"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">污染源环保部门</div></th><th colspan="4"><span class="cael"><el-input type="textarea" autosize placeholder="请输入内容" v-model="wryhbbm"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">专职环保人员数</div></th><th colspan="2"><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="zzhbrys"></el-input></span></th><th bgcolor="#f6f6f6"><div class="caeel">环保负责人</div></th><th><span class="cael"><el-input size="small" placeholder="请输入内容" v-model="hbfzr"></el-input></span></th></tr>
								<tr><th bgcolor="#f6f6f6"><div class="caeel">备注</div></th><th colspan="4"><span class="cael"><el-input type="textarea" autosize placeholder="请输入内容" v-model="bz"></el-input></span></th></tr>
								<!---->
							</table>
						</div>
						<!---->
					</el-tab-pane>

				</el-tabs>
				<!---->
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitbtn">确 定</el-button>
			  	</span>
			</el-dialog>
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
                //企业信息表
                wryName:'',//污染源名称
				frdm:'',//企业编码
				frdb:'',//法人代表
				wrydz:'',//污染源地址
				xzqy:'',//行政区域
				wrygm:'',//污染源规模
				xzlx:'',//行政类型
				wrylb:'',//污染源类别
				dwlx:'',//单位类型
				tcrq:'',//投产日期
				zdmj:'',//占地面积
				dqmc:'',//地区名称
				sfdlqy:'',//是否30千瓦
				qyzt:'',//启用状态
				gzcd:'',//关注程度
				yxzt:'',//运行状态
				ly:'',//流域
				zxzt:'',//在线状态
				txdz:'',//通讯地址
				txdz2:'',//emial
				lxr:'',//联系人
				yddh:'',//移动电话
				bgdh:'',//办公电话
				wrywz:'',//污染源网址
				zxjd:'',//中心经度
				zxwd:'',//中心纬度
				wryhbbm:'',//污染源环保部门
				zzhbrys:'',//专职环保人员数
				hbfzr:'',//环保负责人
				bz:'',//备注
				//
                dialogVisible:false,
				//
		        tableData:[{DeviceName:'0000'}],
				//
			    currentPage: 1,
				//
			    pagesize:10,
				//
                activeName:'first',
			    isNew: false,
			    textarea: '',
			    title:'添加',
				//
				TotalRowsCount:null,
				//
				totalCount:1,
				//
				InfoData:[],
				//
				ListData:[],
				//排气口添加数组
                todos:[{outputcode:'001',outputname:'刘强东'}],
				//企业名称
				componyName:'',
				//
				gridName:'',
				//记录点击传递id
                codeid:'',
				//
                zhuangtai:'',
            }
        },
        created(){

        },
        mounted() {
            $(".el-dialog").css("width","700px");
            this.getNotice();
        },
        computed: {
            
        },
        methods: {
        	GetComExcelOutPut(){
        		let name = this.componyName;
        		api.GetComExcelOutPut(name);
        	},
            //
            submitbtn(){
                if(this.zhuangtai === '编辑'){
                    this.EditUpdate();
				}else {
                    this.Insert();
				}
			},
            //添加企业排气口dom
            addVent(){
                //
                let kname = '';
                let kcode = '';
				//
				this.todos.push({outputcode:kcode,outputname:kname});
				//
				console.log(this.todos);
			},
			//
            delVent(){
                console.log('删除')
                this.todos.pop();
                console.log(this.todos);
			},
			//查询数据
            QueryNeedsData(){
                let condata = this.componyName;
                this.getNotice(condata);
            },
            //列表删除
            DeleteOperatorInfo(row) {
                const _this = this;
                console.log(row)
                let id = row.pscode;
                this.$confirm('确认要删除本条数据吗？')
                    .then(_ => {
                        // done();
                        console.log('删除成功')
                        api.GetdeleteCompanyRt(id).then(res=>{
                            console.log(res)
                            if(res.data.Status === 1){
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
                this.zhuangtai = '添加';
        		this.Insert();
        		this.closeWin();
        		this.getNotice();
        	},
			//
        	closeWin(){
      			this.dialogVisible = false;
      		},
			//编辑
	        handleClick(row) {
                const _this = this;
	        	_this.dialogVisible = true;
	        	_this.zhuangtai = '编辑';
	        	_this.todos =[];
	        	console.log(row)
                this.codeid = row.pscode;
                api.GetSingleCompanyRt(row.pscode).then(res =>{
                    console.log(res.data.Data);
                    let Data = res.data.Data;//
                    this.wryName= Data.psname;//污染源名称
                    this.frdm=Data.pscode;//企业编码
                    this.frdb=Data.legalperson;//法人代表
                    this.wrydz=Data.pollutionAddress;//污染源地址
                    this.xzqy=Data.region;//行政区域
                    this.wrygm=Data.pollutionScale;//污染源规模
                    this.xzlx=Data.industryType;//行政类型
                    this.wrylb=Data.pollutionType;//污染源类别
                    this.dwlx=Data.companyType;//单位类型
                    this.tcrq=Data.commissioningDate;//投产日期
                    this.zdmj=Data.floorSpace;//占地面积
                    this.dqmc=Data.areaName;//地区名称
                    this.sfdlqy=Data.is30Company;//是否30千瓦
                    this.qyzt=Data.enabled;//启用状态
                    this.gzcd=Data.concernExtent;//关注程度
                    this.yxzt=Data.runningStatus;//运行状态
                    this.ly =Data.drainageBasin;//流域
                    this.zxzt =Data.isOnline;//在线状态
                    this.txdz =Data.contactAddress;//通讯地址
                    this.txdz2 =Data.emial;//emial
                    this.lxr =Data.contactPerson;//联系人
                    this.yddh =Data.mobilePhone;//移动电话
                    this.bgdh =Data.officePhone;//办公电话
                    this.wrywz =Data.pollutionUrl;//污染源网址
                    this.zxjd =Data.longitude;//中心经度
                    this.zxwd = Data.latitude;//中心纬度
                    this.wryhbbm = Data.pollutionOffice;//污染源环保部门
                    this.zzhbrys = Data.pollutionPersonCount;//专职环保人员数
                    this.hbfzr = Data.pollutionPerson;//环保负责人
                    this.bz = Data.remarks;//备注
					this.todos = Data.outlet;//排气口集合
				})

	        	// this.dialogVisible = false;
      		},
      		//编辑发布
      		EditUpdate(){
      			const _this = this;
                let code0 = this.codeid;//
                let data1 = this.wryName || '';//污染源名称
                let data2 = this.frdb ||'';//法人代表
                let data3 = this.wrydz ||'';//污染源地址
                let data4 = this.xzqy ||'';//行政区域
                let data7 = this.wrygm ||'';//污染源规模
                let data5 = this.xzlx ||'';//行政类型
                let data9 = this.wrylb ||'';//污染源类别
                let data6 = this.dwlx ||'';//单位类型
                let data11 =this.tcrq ||'';//投产日期
                let data8 =this.zdmj ||'';//占地面积
                let data13 =this.dqmc ||'';//地区名称
                let data10 =this.sfdlqy ||'';//是否30千瓦
                let data15 =this.qyzt ||'';//启用状态
                let data12 =this.gzcd ||'';//关注程度
                let data17 =this.yxzt ||'';//运行状态
                let data14 =this.ly ||'';//流域
                let data16 =this.zxzt ||'';//在线状态
                let data18 =this.txdz  ||'';//通讯地址
                let data20 =this.txdz2  ||'';//emial
                let data19 =this.lxr  ||'';//联系人
                let data22 =this.yddh ||'';//移动电话
                let data21 =this.bgdh ||'';//办公电话
                let data23 =this.wrywz ||'';//污染源网址
                let data29 =this.zxjd ||'';//中心经度
                let data28 =this.zxwd ||'';//中心纬度
                let data24 =this.wryhbbm ||'';//污染源环保部门
                let data26 =this.zzhbrys ||'';//专职环保人员数
                let data25 =this.hbfzr ||'';//环保负责人
                let data27 =this.bz ||'';//备注
                let data30 = this.todos || [];//排气口集合
				//if(_this.zhuangtai === '编辑'){
					api.PostupdateCompanyRt(code0,
						data1,data2,data3,data4,data5,
						data6,data7,data8,data9,data10,
						data11,data12,data13,data14,data15,
						data16,data17,data18,data19,data20,
						data21,data22,data23,data24,data25,
						data26,data27,data28,data29,data30
					).then(result=>{
						console.log(result);
						_this.getNotice();
					});
                //}
				_this.dialogVisible = false;
      		},
      		//分页
      		 handleSizeChange(val) {
        		console.log(`每页 ${val} 条`);
      		},
			//
      		handleCurrentChange(val) {
        		// this.setPageTable(10, val);
                this.getNotice('',val);
      		},
			//
      		openWin(){
					this.isEdit = false;
					this.dialogVisible = true;
					this.wryName='';//污染源名称
                    this.frdm='';//企业编码
                    this.frdb='';//法人代表
                    this.wrydz='';//污染源地址
                    this.xzqy='';//行政区域
                    this.wrygm='';//污染源规模
                    this.xzlx='';//行政类型
                    this.wrylb='';//污染源类别
                    this.dwlx='';//单位类型
                    this.tcrq='';//投产日期
                    this.zdmj='';//占地面积
                    this.dqmc='';//地区名称
                    this.sfdlqy='';//是否30千瓦
                    this.qyzt='';//启用状态
                    this.gzcd='';//关注程度
                    this.yxzt='';//运行状态
                    this.ly ='';//流域
                    this.zxzt ='';//在线状态
                    this.txdz ='';//通讯地址
                    this.txdz2 ='';//emial
                    this.lxr ='';//联系人
                    this.yddh ='';//移动电话
                    this.bgdh ='';//办公电话
                    this.wrywz ='';//污染源网址
                    this.zxjd ='';//中心经度
                    this.zxwd = '';//中心纬度
                    this.wryhbbm = '';//污染源环保部门
                    this.zzhbrys = '';//专职环保人员数
                    this.hbfzr = '';//环保负责人
                    this.bz = '';//备注
                	this.todos = [];//排气口集合
      		},

      		//添加
      		Insert(){
      			const _this = this;
                let code0 = this.codeid;//
                let data1 = this.wryName || '';//污染源名称
                let data2 = this.frdb ||'';//法人代表
                let data3 = this.wrydz ||'';//污染源地址
                let data4 = this.xzqy ||'';//行政区域
                let data7 = this.wrygm ||'';//污染源规模
                let data5 = this.xzlx ||'';//行政类型
                let data9 = this.wrylb ||'';//污染源类别
                let data6 = this.dwlx ||'';//单位类型
                let data11 =this.tcrq ||'';//投产日期
                let data8 = this.zdmj ||'';//占地面积
                let data13 =this.dqmc ||'';//地区名称
                let data10 =this.sfdlqy ||'';//是否30千瓦
                let data15 =this.qyzt ||'';//启用状态
                let data12 =this.gzcd ||'';//关注程度
                let data17 =this.yxzt ||'';//运行状态
                let data14 =this.ly ||'';//流域
                let data16 =this.zxzt ||'';//在线状态
                let data18 =this.txdz  ||'';//通讯地址
                let data20 =this.txdz2  ||'';//emial
                let data19 =this.lxr  ||'';//联系人
                let data22 =this.yddh ||'';//移动电话
                let data21 =this.bgdh ||'';//办公电话
                let data23 =this.wrywz ||'';//污染源网址
                let data29 =this.zxjd ||'';//中心经度
                let data28 =this.zxwd ||'';//中心纬度
                let data24 =this.wryhbbm ||'';//污染源环保部门
                let data26 =this.zzhbrys ||'';//专职环保人员数
                let data25 =this.hbfzr ||'';//环保负责人
                let data27 =this.bz ||'';//备注
                let data30 = this.todos || [];//排气口集合
      			//if(_this.zhuangtai === '添加'){
      			    //
                    api.PostAddCompanyRt(code0,
                        data1,data2,data3,data4,data5,
                        data6,data7,data8,data9,data10,
                        data11,data12,data13,data14,data15,
                        data16,data17,data18,data19,data20,
                        data21,data22,data23,data24,data25,
                        data26,data27,data28,data29,data30
                    ).then(result=>{
						console.log(result)
						_this.getNotice();
                    });
				//}
                _this.dialogVisible = false;
      		},
      		//获取列表
      		getNotice(name = '',PageIndex = '1'){
        	    let nm =name;
        	    let page = PageIndex;
      			const _this = this;
      			this.tableData = [];
      			api.PosthtcompanyListRt(nm,page).then(result=>{
      			    console.log(result)
					let InfoData = result.data.Data.Data;

                    _this.totalCount = result.data.Data.TotlePageNum;
					InfoData.forEach(item=>{
						let tableData = {};
                        tableData.psname = item.psname;//设备名称
                        tableData.contactPerson = item.contactPerson;//设备名称
                        tableData.mobilePhone = item.mobilePhone;//设备名称
                        tableData.pollutionAddress = item.pollutionAddress;//设备名称
                        tableData.pscode = item.pscode;//设备名称
                        tableData.latitude = item.latitude;//设备名称
                        tableData.longitude = item.longitude;//设备名称
                        _this.tableData.push(tableData);
					})

				});
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
	.table-up{
		border-color: #e0e0e0;
		.caeel{
			width: 100px;
			font-size: 12px;
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
