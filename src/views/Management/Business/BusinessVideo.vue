<!--后台管理-视频类型管理-->
<template>
  <div class="businessOperation">
    <!--右侧数据展示-->
    <div id="right">
      <div class="box">
        <div class="warning">
          <a>视频企业</a>
        </div>
      </div>
      <!--查询部分-->
      <div class="search">
        <span>企业名称</span>
        <el-input v-model="searchParam.companyName" clearable placeholder="请输入企业名称"></el-input>
        <div>
          <span>网格名称</span>
          <el-input v-model="searchParam.gridName" clearable placeholder="请输入网格名称"></el-input>
          <span>视频类型</span>
          <el-select v-model="searchParam.videoType" clearable placeholder="请选择">
            <el-option
              v-for="item in videoTypeoptions"
              :key="item.value"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
          <div class="searchbtn">
            <el-button type="primary" class='' @click="getNotice">查询</el-button>
            <el-button type="primary" class='btns' @click="addCompany(0,null)">添加企业</el-button>
            <el-button type="primary" class='' @click="cameraChange">添加摄像头</el-button>
            <el-button type="primary" class='' @click="ExportVideolist">导出</el-button>
          </div>
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
          prop="typeString"
          label="视频类型"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="企业名称"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
        <el-table-column
          prop="gridName"
          label="所属网格"
        >
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系人"
        >
        </el-table-column>
        <el-table-column
          prop="phoneNum"
          label="联系电话"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template scope="scope">
            <el-button @click="addCompany(1,scope.row)" type="text" size="small" class='eidt'>编辑企业</el-button>
            <span style="color: #eee;">|</span>
            <el-button @click="ClickCamera(scope.row)" type="text" size="small" class='eidt'>浏览摄像头</el-button>
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
      <el-dialog :title="`${lokerstate}视频监控点`" :visible.sync="dialogVisible" width="80%">
        <div class="class-boxdar">
          <div class="ca-left">
            <div class="block">
              <span>视频自增ID：</span>
              <el-input v-model="cameraInfo.Id" placeholder="请输入ID"></el-input>
            </div>
            <div class="block">
              <span>摄像头名称：</span>
              <el-input v-model="cameraInfo.camName" placeholder="请输入摄像头名称"></el-input>
            </div>
            <div class="block">
              <span>摄像头编号：</span>
              <el-input v-model="cameraInfo.camCode" placeholder="请输入摄像头编号"></el-input>
            </div>
            <div class="block">
              <span>所属设备编号：</span>
              <el-input v-model="cameraInfo.fixingCode" placeholder="请输入所属设备编号"></el-input>
            </div>
            <div class="block">
              <span>通道号：</span>
              <el-input v-model="cameraInfo.channelCode" placeholder="请输入通道号"></el-input>
            </div>
            <div class="block">
              <span>视频状态：</span>
              <el-select v-model="cameraInfo.status" clearable placeholder="请选择视频状态">
                <el-option
                  v-for="item in CamStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="ca-left">
            <div class="block">
              <span>码流：</span>
              <el-input v-model="cameraInfo.flowCode" placeholder="请输入码流"></el-input>
            </div>
            <div class="block">
              <span>经度：</span>
              <el-input v-model="cameraInfo.longitude" placeholder="请输入经度"></el-input>
            </div>
            <div class="block">
              <span>纬度：</span>
              <el-input v-model="cameraInfo.latitude" placeholder="请输入纬度"></el-input>
            </div>
            <div class="block">
              <span>设备类型：</span>
              <el-input v-model="cameraInfo.devType" placeholder="请输入设备类型"></el-input>
            </div>
            <div class="block">
              <span>联系人：</span>
              <el-input v-model="cameraInfo.Contact" placeholder="请输入联系人"></el-input>
            </div>
          </div>
          <div class="ca-left">
            <div class="block">
              <span>电话：</span>
              <el-input v-model="cameraInfo.phone" placeholder="请输入电话"></el-input>
            </div>
            <div class="block">
              <span>企业名称：</span>
              <el-autocomplete
                v-model="cameraInfo.CompanyName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入企业名称"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
            <div class="block">
              <span>所属区域：</span>
              <el-input v-model="cameraInfo.area" placeholder="请输入所属区域"></el-input>
            </div>
            <div class="block">
              <span>区域编号：</span>
              <el-input v-model="cameraInfo.gridCode" placeholder="请输入区域编号"></el-input>
            </div>
            <div class="block">
              <span>摄像头类型：</span>
              <el-select v-model="cameraInfo.camType" clearable placeholder="请选择摄像头类型">
                <el-option
                  v-for="item in CamTypeOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

          </div>
        </div>
        <!---->
        <span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addOrEdit">确 定</el-button>
				</span>
      </el-dialog>
      <!--企业弹框-->
      <el-dialog :title="companyInfo.title" :visible.sync="isCompany" width="50%">
        <div id="companyBody" style="overflow: hidden">
          <div class="companyLeft">
            <div class="block">
              <span>督查类型</span>
              <el-select class="select" v-model="companyInfo.supervisionType" clearable placeholder="请选择督查类型">
                <el-option
                  v-for="item in supervision"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="block">
              <span>所属网格</span>
              <el-select class="select" v-model="companyInfo.gridName" clearable placeholder="请选择所属网格">
                <el-option
                  v-for="item in gridOption"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="block">
              <span>责任主体</span>
              <el-select class="select" v-model="companyInfo.responsibility" clearable placeholder="请选择责任主体">
                <el-option
                  v-for="item in responsibility"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="block">
              <span>纬度</span>
              <el-input class="select" placeholder="请输入纬度" v-model="companyInfo.latitude" clearable></el-input>
            </div>
            <div class="block" v-if="companyInfo.supervisionType ==='1'">
              <span>预警状态</span>
              <el-select class="select" v-model="companyInfo.warning" clearable placeholder="请选择责任主体">
                <el-option
                  v-for="item in warning"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="companyRight">
            <div class="block">
              <span>名称</span>
              <el-input class="select" placeholder="请输入名称" v-model="companyInfo.companyName" clearable></el-input>
            </div>
            <div class="block">
              <span>地址</span>
              <el-input class="select" placeholder="请输入地址" v-model="companyInfo.address" clearable></el-input>
            </div>
            <div class="block">
              <span>联系人</span>
              <el-input class="selectContact" placeholder="请输入联系人"
                        v-model="companyInfo.contact" clearable></el-input>
              <span>联系电话</span>
              <el-input class="selectSmall" placeholder="请输入联系电话"
                        v-model="companyInfo.phone" clearable></el-input>
            </div>

            <div class="block">
              <span>经度</span>
              <el-input class="select" placeholder="请输入经度" v-model="companyInfo.longitude" clearable></el-input>
            </div>
          </div>
        </div>
        <div id="canYin" v-if="companyInfo.supervisionType ==='3'||companyInfo.supervisionType ==='餐饮油烟'">
          <div class="block">
            <span>净化器名称</span>
            <el-input class="treater" v-model="companyInfo.treaterName" placeholder="请输入净化器名称"></el-input>
          </div>
          <div class="block">
            <span>净化器类型</span>
            <el-input class="treater" v-model="companyInfo.treaterType" placeholder="请输入净化器类型"></el-input>
          </div>
          <div class="block">
            <span>风机名称</span>
            <el-input class="treater" v-model="companyInfo.airName" placeholder="请输入风机名称"></el-input>
          </div>
          <div class="block">
            <span>灶头个数</span>
            <el-input class="treater" v-model="companyInfo.kitchenNum" placeholder="请输入灶头个数"></el-input>
          </div>
          <div class="block">
            <span>规模</span>
            <el-input class="treater" v-model="companyInfo.scale" placeholder="请输入规模"></el-input>
          </div>
        </div>
        <div id="Voc" v-if="companyInfo.supervisionType ==='1'||companyInfo.supervisionType ==='voc企业'
        ||companyInfo.supervisionType ==='5'||companyInfo.supervisionType ==='工地'">
          <div class="block">
            <span>行业类别</span>
            <el-input class="treater" v-model="companyInfo.industryClass" placeholder="请输入行业类别"></el-input>
          </div>
          <div class="block">
            <span>占地面积</span>
            <el-input class="treater" v-model="companyInfo.floorSpace" placeholder="请输入占地面积"></el-input>
          </div>
          <div class="block">
            <span>治理措施</span>
            <el-input class="treater" v-model="companyInfo.measures" placeholder="请输入治理措施"></el-input>
          </div>
          <div class="block">
            <span>治理投资</span>
            <el-input class="treater" v-model="companyInfo.governenceInvest" placeholder="请输入治理投资"></el-input>
          </div>
          <div class="block" v-if="companyInfo.supervisionType ==='1'||companyInfo.supervisionType ==='voc企业'">
            <span>治理工序</span>
            <el-input class="treater" v-model="companyInfo.controlProcess" placeholder="请输入治理工序"></el-input>
          </div>
        </div>
        <div id="Slw" v-if="companyInfo.supervisionType ==='2'||companyInfo.supervisionType ==='散乱污'">
          <div class="block">
            <span>行业类别</span>
            <el-input class="treater" v-model="companyInfo.industryClass" placeholder="请输入行业类别"></el-input>
          </div>
          <div class="block">
            <span>治理措施</span>
            <el-input class="treater" v-model="companyInfo.measures" placeholder="请输入治理措施"></el-input>
          </div>
        </div>
        <div id="river" class="block" v-if="companyInfo.supervisionType ==='6'||companyInfo.supervisionType ==='河道管理'">
          <span>河道水质</span>
          <el-select v-model="companyInfo.riverQuality" clearable placeholder="请选择河道水质">
            <el-option
              v-for="item in riverQuality"
              :key="item.value"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
					<el-button @click="isCompany = false">取 消</el-button>
					<el-button type="primary" @click="addCompanyEnter">确 定</el-button>
				</span>
      </el-dialog>
      <el-dialog :title="cameraInfo.title" :visible.sync="showCamera">
        <el-table :data="cameraData">
          <el-table-column property="cameraCode" label="摄像头编号"></el-table-column>
          <el-table-column property="name" label="摄像头名称"></el-table-column>
          <el-table-column  label="操作">
            <template scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" class='eidt'>编辑</el-button>
              <el-button @click="removeCam(scope.row)" type="text" size="small" class='eidt'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--<span slot="footer" class="dialog-footer">-->
					<!--<el-button @click="showCamera = false">取 消</el-button>-->
					<!--<el-button type="primary" @click="openWin">添加</el-button>-->
				<!--</span>-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui';
  import api from '../../../api/index'

  export default {
    name: 'businessOperation',
    data() {
      return {
        //
        departmentVal: '',
        tableData: [{CameraResourceName: '摄像头'}],
        currentPage: 1,
        pagesize: 10,
        dialogVisible: false,
        TotalRowsCount: null,
        totalCount: 1,
        InfoData: [],
        ListData: [],
        //编辑添加状态
        lokerstate: '',
        //添加
        videoId: '',
        CamName: '',
        CamIndexCode: '',
        BelongDevice: '',
        Channel: '',
        DevType: '',
        SubStream: '',
        DevIndexCode: '',
        Longitude: '',
        Latitude: '',
        Type: '',
        Contact: '',
        Phone: '',
        CompanyName: '',
        CompanyAddress: '',
        Area: '',
        GridCode: '',
        shuoming: '',
        //企业名称
        restaurants: [],
        timeout:  null,
        //查询
        searchParam: {
          companyName: '',//企业名称
          gridName: '',//网格名称
          videoType: '',//视频类型
        },
        //摄像头类型选择
        CamTypeOptions:[
          {value: 'voc', id: '1'},
          {value: '散乱污', id: '2'},
          {value: '餐饮油烟', id: '3'},
          {value: '秸秆焚烧', id: '4'},
          {value: '工地', id: '5'},
          {value: '河道', id: '6'},
        ],
        CamStatusOptions:[
          {value:'开启',label:'开启'},
          {value:'停机',label:'停机'},
          {value:'停业整顿',label:'停业整顿'},
        ],
        //视频类型选择
        videoTypeoptions: [
          {value: 'voc企业', id: '1'},
          {value: '散乱污', id: '2'},
          {value: '餐饮油烟', id: '3'},
          {value: '秸秆焚烧', id: '4'},
          {value: '工地', id: '5'},
          {value: '河道管理', id: '6'},
        ],
        //预警状态
        warning: [
          {value: '蓝色预警', id: '1'},
          {value: '黄色预警', id: '2'},
          {value: '橙色预警', id: '3'},
          {value: '红色预警', id: '4'},
        ],
        //企业
        companyInfo: {
          id:'',
          title: '',
          supervisionType: '',//督查类型
          companyName: '',//企业名称
          gridName: '',//网格
          address: '',//地址
          responsibility: '',//责任主体
          contact: '',//联系人
          phone: '',//电话
          //餐饮
          treaterName: '',//净化器名称
          treaterType: '',//净化器类型
          airName: '',//风机名称
          kitchenNum: '',//灶头个数

          // 河道
          riverQuality: '',//河道水质
          latitude:'',//纬度
          longitude:'',//经度
          warning:'',//预警状态
          industryClass:'',//行业类别
          floorSpace:'',
          measures:'',
          governenceInvest:'',
          controlProcess:'',
          scale:'',
        },
        isCompany: false,
        //督查类型选择
        supervision: [
          {value: 'voc企业', id: '1'},
          {value: '散乱污', id: '2'},
          {value: '餐饮油烟', id: '3'},
          {value: '秸秆焚烧', id: '4'},
          {value: '工地', id: '5'},
          {value: '河道管理', id: '6'},
        ],
        //所属网格选择
        gridOption: [],
        //责任主体选择
        responsibility: [],
        //河道水质选择
        riverQuality:[
          {value: '清澈', id: '1'},
          {value: '较清澈', id: '2'},
          {value: '较混浊', id: '3'},
          {value: '严重污染', id: '4'},
        ],
        cameraData:[],//摄像头列表
        showCamera:false,
        //添加或编辑摄像头信息
        cameraInfo:{
          title:'',
          Id:'',//视频自增ID
          camName:'',//摄像头名称
          camCode:'',//摄像头编号
          fixingCode:'',//所属设备编号
          channelCode:'',//通道号
          devType:'',//设备类型
          flowCode:'',//码流
          latitude:'',//纬度
          longitude:'',//经度
          camType:'',//摄像头类型
          Contact:'',//联系人
          phone:'',
          CompanyName:'',//企业名称
          companyAddress:'',//企业地址
          area:'',//所属区域
          gridCode:'',//区域编号
          companyId:'',
          status:'',//摄像头状态
        },
      }
    },
    created() {
      this.GetCaseAll();
    },
    mounted() {
      this.getNotice();
      this.getGrid();
    },
    computed: {},
    methods: {
      //点击添加或编辑摄像头
      cameraChange(){
        this.lokerstate = '添加';
        this.dialogVisible = true;
        this.cameraInfo.Id = '';//视频自增ID
        this.cameraInfo.camName = '';//摄像头名称
        this.cameraInfo.camCode = '';//摄像头编号
        this.cameraInfo.fixingCode = '';//所属设备编号
        this.cameraInfo.channelCode = '';//通道号
        this.cameraInfo.devType = '';//设备类型
        this.cameraInfo.flowCode = '';//码流
        this.cameraInfo.latitude = '';///纬度
        this.cameraInfo.longitude = '';//经度
        this.cameraInfo.camType = '';//摄像头类型
        this.cameraInfo.Contact = '';//联系人
        this.cameraInfo.phone = '';//电话
        this.cameraInfo.companyId = '';//企业名称
        this.cameraInfo.area = '';//所属区域
        this.cameraInfo.gridCode = '';//区域编号
        this.cameraInfo.status = '';//状态
      },
      //添加摄像头确定
      cameraEnter(){
        let _this = this;
        let Id = this.cameraInfo.Id;//视频自增ID
        let name = this.cameraInfo.camName;//摄像头名称
        let cameraCode = this.cameraInfo.camCode;//摄像头编号
        let deviceCode = this.cameraInfo.fixingCode;//所属设备编号
        let channelCode = this.cameraInfo.channelCode;//通道号
        let deviceType = this.cameraInfo.devType;//设备类型
        let flowCode = this.cameraInfo.flowCode;//码流
        let latitude = this.cameraInfo.latitude;///纬度
        let longitude = this.cameraInfo.longitude;//经度
        let cameraType = this.cameraInfo.camType;//摄像头类型
        let contact = this.cameraInfo.Contact;//联系人
        let phoneNum = this.cameraInfo.phone;//电话
        let companyId = this.cameraInfo.companyId;//企业名称
        let area = this.cameraInfo.area;//所属区域
        let areaCode = this.cameraInfo.gridCode;//区域编号
        let status = this.cameraInfo.status;//摄像头状态
        api.AddVideoPointR(Id, name, cameraCode, deviceCode, channelCode, deviceType
          , flowCode, latitude, longitude, cameraType, contact, phoneNum
          , companyId, area, areaCode,status).then(result => {
          console.log(result);
          if (result.data.status > 0) {
            _this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            _this.dialogVisible = false;
          } else {
            _this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            });
          }
          ;
        });
      },
      //删除摄像头
      removeCam(row){
        //console.log(row);
        let t = this;
        let id = row.id;
        this.$confirm('确定删除此摄像头吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.removeCompanyCameras(id).then(res=>{
            console.log(res);
            let mess = res.data.message;
            if(res.data.status>0){
              t.$message({
                message:mess,
                type:'success'
              })
              t.showCamera = false;
            }else{
              t.$message({
                message:mess,
                type:'error'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //点击浏览摄像头
      ClickCamera(row){
        console.log(row)
        this.cameraInfo.title = row.name;
        this.showCamera = true;
        this.getCompanyCameras(row);
      },
      //获取企业下摄像头列表
      getCompanyCameras(row){
        let t = this;
        let companyId = row.Id;
        console.log(row)
        api.getCompanyCameras(companyId).then(res=>{
          // console.log(res)
          t.cameraData = res.data.data.map(v=>{v.comName = row.name;return v});
        })
      },
      //企业名称
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        // console.log(item);
        this.cameraInfo.companyId = item.Id;
      },
      //获取责任部门
      GetCaseAll() {
        let t = this;
        api.GetCaseAll().then(result => {
          t.responsibility = result.data.data;
        })
      },
      //导出企业列表
      ExportVideolist() {
        let _this = this;
        let param = _this.searchParam;
        let companyName = param.companyName;
        let gridName = param.gridName;
        let type = param.videoType;
        api.VodeoExcelOutPutR(param,companyName,gridName,type);
      },
      //列表删除
      DeleteOperatorInfo(row) {
        const _this = this;
        console.log(row)
        let id = row.Id;
        this.$confirm('确认要删除本条数据吗？')
          .then(_ => {
            api.GetdeleteCompany(id).then(result => {
              console.log(result)
              if (result.data.status > 0) {
                _this.$message({showClose: true, message: '删除成功', type: 'success'});
              } else {
                _this.$message({showClose: true, message: '删除失败', type: 'error'});
              }
            })
            //
            setTimeout(() => {
              _this.getNotice();
            }, 200)
          })
          .catch(_ => {
            console.log('删除失败')
          });
      },
      //编辑
      handleClick(row) {
        this.lokerstate = '编辑';
        this.dialogVisible = true;
        console.log(row);
        this.cameraInfo.Id = row.id;//视频自增ID
        this.cameraInfo.camName = row.name;//摄像头名称
        this.cameraInfo.camCode = row.cameraCode;//摄像头编号
        this.cameraInfo.fixingCode = row.deviceCode;//所属设备编号
        this.cameraInfo.channelCode = row.channelCode;//通道号
        this.cameraInfo.devType = row.deviceType;//设备类型
        this.cameraInfo.flowCode = row.flowCode;//码流
        this.cameraInfo.latitude = row.latitude;///纬度
        this.cameraInfo.longitude = row.longitude;//经度
        this.cameraInfo.camType = row.cameraType;//摄像头类型
        this.cameraInfo.Contact = row.contact;//联系人
        this.cameraInfo.phone = row.phoneNum;//电话
        this.cameraInfo.companyId = row.companyId;//企业名称
        this.cameraInfo.CompanyName = row.comName;//企业名称
        //console.log(this.cameraInfo.companyName);
        this.cameraInfo.area = row.area;//所属区域
        this.cameraInfo.gridCode = row.areaCode;//区域编号
        this.cameraInfo.status = row.status;//摄像头名称
      },
      //添加或编辑确定
      addOrEdit(){
        if(this.lokerstate ==='编辑'){
          this.EditUpdate();
        }else{
          this.cameraEnter();
        }
      },
      //编辑发布
      EditUpdate() {
        let _this = this;
        let Id = this.cameraInfo.Id;//视频自增ID
        let name = this.cameraInfo.camName;//摄像头名称
        let cameraCode = this.cameraInfo.camCode;//摄像头编号
        let deviceCode = this.cameraInfo.fixingCode;//所属设备编号
        let channelCode = this.cameraInfo.channelCode;//通道号
        let deviceType = this.cameraInfo.devType;//设备类型
        let flowCode = this.cameraInfo.flowCode;//码流
        let latitude = this.cameraInfo.latitude;///纬度
        let longitude = this.cameraInfo.longitude;//经度
        let cameraType = this.cameraInfo.camType;//摄像头类型
        let contact = this.cameraInfo.Contact;//联系人
        let phoneNum = this.cameraInfo.phone;//电话
        let companyId = this.cameraInfo.companyId;//企业名称
        let area = this.cameraInfo.area;//所属区域
        let areaCode = this.cameraInfo.gridCode;//区域编号
        let status = this.cameraInfo.status;//区域编号
        api.UpdateVideoPointR(Id, name, cameraCode, deviceCode, channelCode, deviceType
          , flowCode, latitude, longitude, cameraType, contact, phoneNum
          , companyId, area, areaCode,status).then(result => {
            console.log(result);
          if (result.data.status > 0) {
            _this.$message({
              showClose: true,
              message: '编辑成功',
              type: 'success'
            });
            _this.dialogVisible = false;
            _this.showCamera = false;
          } else {
            _this.$message({
              showClose: true,
              message: '编辑失败',
              type: 'error'
            });
          }
        });
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //
      handleCurrentChange(val) {
        this.setPageTable(10, val);
      },
      //所属网格获取
      getGrid(){
        let t = this;
        api.getGyGridinfo().then(res=>{
          //console.log(res)
          t.gridOption = res.data.data;
        })
      },
      //点击添加/编辑企业
      addCompany(code, row) {
        console.log(row)
        this.isCompany = true;
        this.companyInfo.title = code ? '编辑企业' : '添加企业';
        if(code){
          this.companyInfo.supervisionType = row.type;
          this.companyInfo.companyName = row.name;
          this.companyInfo.gridName = row.gridId;
          this.companyInfo.address = row.address;
          this.companyInfo.contact = row.contact;
          this.companyInfo.phone = row.phoneNum;
          this.companyInfo.latitude = row.latitude;
          this.companyInfo.longitude = row.longitude;
          this.companyInfo.responsibility = row.responsibilityId;
          this.companyInfo.treaterName = row.treaterName;
          this.companyInfo.treaterType = row.treaterType;
          this.companyInfo.airName = row.airName;
          this.companyInfo.kitchenNum = row.kitchenNum;
          this.companyInfo.riverQuality = row.riverQuality;
          this.companyInfo.id = row.Id;
          this.companyInfo.warning = row.warningColor;
          this.companyInfo.industryClass = row.industryClass;
          this.companyInfo.floorSpace = row.floorSpace;
          this.companyInfo.measures = row.measures;
          this.companyInfo.governenceInvest = row.governenceInvest;
          this.companyInfo.controlProcess = row.controlProcess;
          this.companyInfo.scale = row.scale;
          // console.log(this.companyInfo)
        }else{
          this.companyInfo.supervisionType = '';
          this.companyInfo.companyName = '';
          this.companyInfo.gridName = '';
          this.companyInfo.address = '';
          this.companyInfo.contact = '';
          this.companyInfo.phone = '';
          this.companyInfo.latitude = '';
          this.companyInfo.longitude = '';
          this.companyInfo.responsibility = '';
          this.companyInfo.treaterName = '';
          this.companyInfo.treaterType = '';
          this.companyInfo.airName = '';
          this.companyInfo.kitchenNum = '';
          this.companyInfo.riverQuality = '';
          this.companyInfo.warning = '';
          this.companyInfo.industryClass = '';
          this.companyInfo.floorSpace = '';
          this.companyInfo.measures = '';
          this.companyInfo.governenceInvest = '';
          this.companyInfo.controlProcess = '';
          this.companyInfo.scale ='';
        }
      },
      addCompanyEnter(){
        let t = this;
        if(this.companyInfo.title==='编辑企业'){
          let companyInfo = this.companyInfo;
          let name = companyInfo.companyName;
          let type = companyInfo.supervisionType;
          let address = companyInfo.address;
          let gridId = companyInfo.gridName;
          let contact = companyInfo.contact;
          let phoneNum = companyInfo.phone;
          let responsibilityId = companyInfo.responsibility;
          let jhqmc = companyInfo.treaterName;
          let jhqlx = companyInfo.treaterType;
          let ztgs = companyInfo.kitchenNum;
          let fjmc = companyInfo.airName;
          let szType = this.changeSz(companyInfo.riverQuality);
          let latitude = companyInfo.latitude;
          let longitude = companyInfo.longitude;
          let id = companyInfo.id;
          let warningColor = companyInfo.warning;
          let industry = companyInfo.industryClass;
          let coverarea = companyInfo.floorSpace;
          let measures = companyInfo.measures;
          let investment = companyInfo.governenceInvest;
          let process = companyInfo.controlProcess;
          let scale = companyInfo.scale;
          // console.log(szType)
          if(type&&gridId&&responsibilityId&&latitude&&latitude&&longitude){
            api.PostupdateCompany(warningColor,id,name, type, address, gridId, contact, phoneNum,
              responsibilityId, jhqlx, ztgs, fjmc, jhqmc, szType,latitude,longitude,industry,
              coverarea,measures,investment,process,scale).then(res=>{
              console.log(res);
              let mess = res.data.message;
              if(res.status >0){
                t.$message({
                  message: mess,
                  type: 'success'
                });
                t.isCompany = false;
                t.getNotice();
              }else{
                t.$message({
                  message: mess,
                  type: 'warning'
                });
              }
            })
          }else{
            t.$message({
              message: '注意:督查类型,所属网格,责任主体,经度,纬度必填！',
              type: 'warning'
            });
          }
        }else{
          let companyInfo = this.companyInfo;
          let name = companyInfo.companyName;
          let type = companyInfo.supervisionType;
          let address = companyInfo.address;
          let gridId = companyInfo.gridName;
          let contact = companyInfo.contact;
          let phoneNum = companyInfo.phone;
          let responsibilityId = companyInfo.responsibility;
          let jhqmc = companyInfo.treaterName;
          let jhqlx = companyInfo.treaterType;
          let ztgs = companyInfo.kitchenNum;
          let fjmc = companyInfo.airName;
          let szType = companyInfo.riverQuality;
          let latitude = companyInfo.latitude;
          let longitude = companyInfo.longitude;
          let warningColor = companyInfo.warning;
          let industry = companyInfo.industryClass;
          let coverarea = companyInfo.floorSpace;
          let measures = companyInfo.measures;
          let investment = companyInfo.governenceInvest;
          let process = companyInfo.controlProcess;
          let scale = companyInfo.scale;
          if(type&&gridId&&responsibilityId&&latitude&&latitude&&longitude){
            api.PostAddCompany(warningColor,name, type, address, gridId, contact, phoneNum,
              responsibilityId, jhqlx, ztgs, fjmc, jhqmc, szType,latitude,longitude,industry,
              coverarea,measures,investment,process,scale).then(res=>{
              //console.log(res);
              let mess = res.data.message;
              if(res.status >0){
                t.$message({
                  message: mess,
                  type: 'success'
                });
                t.isCompany = false;
                t.getNotice();
              }else{
                t.$message({
                  message: mess,
                  type: 'warning'
                });
              }
            })
          }else{
            t.$message({
              message: '注意:督查类型,所属网格,责任主体,经度,纬度必填！',
              type: 'warning'
            });
          }
        }
      },
      //获取列表
      getNotice() {
        const _this = this;
        let param = _this.searchParam;
        let companyName = param.companyName;
        let gridName = param.gridName;
        let type = param.videoType;
        this.ListData = [];
        api.GetVideoDeviceInfoR(companyName, gridName, type).then(result => {
          let InfoData = result.data.data;
          _this.totalCount = InfoData.length;
          console.log(InfoData);
          InfoData.forEach(item => {
            let tableData = {};
            tableData.typeString = item.typeString;//视频类型
            tableData.type = item.type;//企业类型
            tableData.name = item.name;//企业名称
            tableData.address = item.address;//地址
            tableData.gridName = item.gridName;//所属网格
            tableData.contact = item.contact;//联系人
            tableData.latitude = item.latitude;
            tableData.longitude = item.longitude;
            tableData.responsibilityName = item.responsibilityName;//责任主体
            tableData.responsibilityId = item.responsibilityId;//责任主体id
            tableData.phoneNum = item.phoneNum;//联系电话
            tableData.treaterName = item.jhqmc;//净化器名称
            tableData.treaterType = item.jhqlx;//净化器类型
            tableData.airName = item.fjmc;//风机名称
            tableData.kitchenNum = item.ztgs;//灶头个数
            tableData.riverQuality = item.szTypeString;//水质
            tableData.Id = item.id;//id
            tableData.gridId = item.gridId;//39.4876601509   116.54828728
            tableData.warningColor = item.warningColor;
            tableData.industryClass = item.industry;
            tableData.floorSpace = item.coverarea;
            tableData.measures = item.measures;
            tableData.governenceInvest = item.investment;
            tableData.controlProcess = item.process;
            tableData.scale = item.scale;
            tableData.value = item.name||'--';
            _this.ListData.push(tableData);
          })
          _this.restaurants = _this.ListData;
          _this.setPageTable(10, 1);
        });
      },
      changeSz(sz){
        switch(sz){
          case '清澈':
            return '1';
            break;
          case '较清澈':
            return '2';
            break;
          case '较混浊':
            return '3';
            break;
          case '严重污染':
            return '4';
            break;
          default :
            return sz;
            break;
        }
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
  .businessOperation {
    .el-input {
      width: 215px;
    }
    .class-boxdar {
      margin: 10px 20px;
      .ca-left {
        margin-bottom: 15px;
        width: 33%;
        height: auto;
        float: left;
        .block {
          margin-top: 15px;
          span {
            display: inline-block;
            width: 100px;
            text-align: right;
          }
        }
      }
    }
    #right {
      width: 100%;
      overflow: hidden;
      padding: 20px;
      background-color: #f6fbff;
      .box {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        .warning {
          width: 100%;
          margin: 10px 0px 10px 10px;
          overflow: hidden;
          line-height: 40px;
          a {
            display: inline-block;
            padding-left: 13px;
            font-size: 16px;
            float: left;
            color: #363636;
            font-weight: bold;

          }
          .addbtn {
            display: inline-block;
            /*float: right;*/
            /*margin-bottom: 10px;*/
          }
        }
      }
      .search {
        text-align: left;
        margin-bottom: 24px;
        width: 100%;
        span {
          display: inline-block;
          width: 60px;
          text-align: right;
        }
        .searchbtn {
          margin-top: 10px;
          margin-left: 60px;
          display: inline-block;
        }
      }
      .page {
        text-align: left;
      }
      .eidt {
        color: #000;
        :hover {
          color: #20a0ff;
          text-decoration: underline;
        }
      }
      .InfoEnd {
        color: #000;
        :hover {
          color: #BF3831;
          text-decoration: underline;
        }
      }

      .el-pagination {
        display: inline-block;
        margin-left: 170px;
        padding-bottom: 90px;
      }
    }
  }

  //企业弹框
  #companyBody {
    width: 100%;
    height: 100%;
    text-align: left;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    .companyLeft, .companyRight {
      float: left;
      width: 40%;
      .block {
        margin-top: 10px;
      }
      span {
        display: inline-block;
        width: 60px;
        text-align: right;
      }
      .select {
        width: calc(100% - 65px);
      }
    }
    .companyRight {
      float: right;
      width: 60%;
      .selectContact{
        width: calc(50% - 70px);
      }
      .selectSmall{
        width: calc(50% - 65px);
      }
    }
    .Long {
      width: calc(100% - 60px);
    }
  }
  #canYin,#river,#Voc,#Slw{
    text-align: left;
    .block{
      display: inline-block;
      margin-top: 10px;
      width: 49%;
      span{
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      .treater{
        width: calc(100% - 85px);
      }
    }
  }
</style>
