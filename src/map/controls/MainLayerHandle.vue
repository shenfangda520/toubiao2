<template>
  <div class="main-layer">
    <div class="main-layer-handle">筛选监测点</div>
    <ul class="warp-box">
      <li v-for="(item,index) in targets" :id="('Litem_'+ index)" :style="'background:'+(item.checked ? '#1b9d33' : 'rgba(0, 0, 0, 0.6)')" :data-index="index" :data-type="item.name" @click="liClick">
        <img style="width: 0" :src="item.checked ? item.checkedSrc : item.src" title=""/>
        <span class="warp-botn">{{item.value}}</span>
      </li>
    </ul>
    <ol class="kqworp" v-show="kongqi">
      <li style="width: 136px;" v-for="(item,index) in JCtargets" v-show="item.visible" :style="'background:'+(item.checked ? '#1b9d33' : 'rgba(0, 0, 0, 0.6)')" :data-parent-index="item.parentIndex" :data-parent="item.parentName" :data-index="index" :data-type="item.name" @click="OKQClick">
        <img :src="item.src" title=""/>
        <span>{{item.value}}</span>
        <select v-show="item.checked" title="" @change="targetChanged" :data-index="index" :style="'display:'+ (item.childs.length ? 'line-block' : 'none')">
          <option v-for="(c,j) in item.childs">{{c.text}}</option>
        </select>
      </li>
    </ol>
    <!--<ol class="vdworp" v-show="shiping" :style="'top:'+(kongqi ? 38*(mlength+1)+3 : 38*2+3)+'px'">-->
      <!--<li style="width: 136px;" v-for="(item,index) in JKtargets" :data-parent-index="item.parentIndex" :data-parent="item.parentName" :data-index="index" :data-type="item.name" @click="OVDClick">-->
        <!--<img :src="item.src" title=""/>-->
        <!--<span>{{item.value}}</span>-->
      <!--</li>-->
    <!--</ol>-->
    <!--<ol class="jkworp" v-show="jiankong" :style="'top:'+(shiping ? (kongqi ? 38*(mlength+3)+6 : 38*4+6) : (kongqi ? 38*(mlength+2)+6 : 38*3+6))+'px'">-->
      <!--<li style="width: 136px;" v-for="(item,index) in ZHtargets" :data-parent-index="item.parentIndex" :data-parent="item.parentName" :data-index="index" :data-type="item.name" @click="OKQClick">-->
        <!--<img :src="item.src" title=""/>-->
        <!--<span>{{item.value}}</span>-->
      <!--</li>-->
    <!--</ol>-->

    <main-handle></main-handle>
  </div>
</template>
<script>
  import MainHandle from '@/map/handle/MainHandle'
  import {bus} from '@/js/bus'

  export default {
    name: 'MainLayerHandle',
    data () {
      return {
        hasSelect:false,
        kongqi: true,
        jiankong:true,
        shiping: true,
        aclink:false,
        mlength:4,
        defaultType:'LAYER_GS',
        clicksrc:'static/imgs/main/left.png',
        clickchesrc:'static/imgs/main/right.png',
        targets: [
          {
            name: 'layer_jc',
            value: '实时监测',
            src: 'static/imgs/main/left.png',
            checkedSrc: 'static/imgs/main/right.png',
            checked:false
          },
          //   {
          //   name: 'layer_jk',
          //   value: '实时监控',
          //   src: 'static/imgs/main/left.png',
          //   checkedSrc: 'static/imgs/main/right.png',
          //   checked:false
          // },
          // {
          //   name: 'layer_zh',
          //   value: '指挥调度',
          //   src: 'static/imgs/main/left.png',
          //   checkedSrc: 'static/imgs/main/right.png',
          //   checked:false
          // }

        ],
        //实时监测
        JCtargets: [
          {
            name: 'layer_gs',
            code:'layer_gs',
            value: '国省控监测',
            parentName: 'layer_jc',
            src: 'static/imgs/main/gs.png',
            checkedSrc: 'static/imgs/main/gs_c.png',
            checked:false,
            visible:true,
            displayName: 'pointname',
            childs:[{
              text: 'AQI',
              fieldName: 'aqi'
            }, {
              text: 'PM2.5',
              fieldName: 'pm25'
            }, {
              text: 'PM10',
              fieldName: 'pm10'
            }, {
              text: 'SO2',
              fieldName: 'so2'
            }, {
              text: 'NO2',
              fieldName: 'no2'
            }, {
              text: 'CO',
              fieldName: 'co'
            }, {
              text: 'O3',
              fieldName: 'o3'
            }, {
              text: '综指',
              fieldName: 'complexindex'
            }, {
              text: '温度',
              fieldName: 'temp'
            }, {
              text: '湿度',
              fieldName: 'humi'
            }, {
              text: '风向',
              fieldName: 'windangle'
            }, {
              text: '风力',
              fieldName: 'windspeed'
            }]
          },{
            name: 'layer_cgq_lcs',
            parentName: 'layer_jc',
            value: '六参数传感器',
            src: 'static/imgs/main/cg.png',
            checkedSrc: 'static/imgs/main/cg_c.png',
            checked:false,
            visible:false,
            childs: [{
              text: 'AQI',
              fieldName: 'aqi'
            }, {
              text: 'PM2.5',
              fieldName: 'pm25'
            }, {
              text: 'PM10',
              fieldName: 'pm10'
            }, {
              text: 'SO2',
              fieldName: 'so2'
            }, {
              text: 'NO2',
              fieldName: 'no2'
            }, {
              text: 'CO',
              fieldName: 'co'
            }, {
              text: 'O3',
              fieldName: 'o3'
            }]
          },
          {
            name: 'layer_cx',
            parentName: 'layer_jc',
            value: '乡镇空气站监测',
            src: 'static/imgs/main/m_cx.png',
            checkedSrc: 'static/imgs/main/cx_c.png',
            checked:false,
            visible:true,
            childs: [
                // {
                //   text: 'PM2.5',
                //   fieldName: 'pm25'
                // }, {
                //   text: 'SO2',
                //   fieldName: 'so2'
                // },{
                //   text: '综指',
                //   fieldName: 'com_index'
                // }
            ]
          },
          {
            name: 'layer_gd',
            value: '工地扬尘监测',
            parentName: 'layer_jc',
            src: 'static/imgs/main/gd.png',
            checkedSrc: 'static/imgs/main/gd_c.png',
            checked:false,
            visible:false,
            childs:[{
              text: 'PM2.5',
              fieldName: 'pm25'
            }, {
              text: 'PM10',
              fieldName: 'pm10'
            }]
          },
          {
            name: 'layer_qy',
            value: '企业污染源监测',
            parentName: 'layer_jc',
            src: 'static/imgs/main/qy.png',
            checkedSrc: 'static/imgs/main/qy_c.png',
            checked:false,
            visible:false,
            childs:[{
              text: '烟尘',
              fieldName: 'smokeStatus'
            }, {
              text: 'NOX',
              fieldName: 'noxStatus'
            }, {
              text: 'SO2',
              fieldName: 'so2Status'
            }]
          },
          {
            name: 'layer_zt',
            value: '渣土车GPS',
            parentName: 'layer_jc',
            src: 'static/imgs/main/zt.png',
            checkedSrc: 'static/imgs/main/zt_c.png',
            checked:false,
            visible:false,
            childs:[]
          },{
            name: 'layer_cgq_vocs',
            parentName: 'layer_jc',
            value: 'VOCs监测',
            src: 'static/imgs/mues/sixzb/vocw.png',
            checkedSrc: 'static/imgs/mues/sixzb/vocw_c.png',
            checked:false,
            visible:false,
            childs: []
          },{
            name: 'layer_cy',
            parentName: 'layer_jc',
            value: '餐饮油烟监测',
            src: 'static/imgs/main/cyyy.png',
            checkedSrc: 'static/imgs/main/cyyy_c.png',
            checked:false,
            visible:false,
            childs: []
          },
        ],
        //指挥调度
        ZHtargets: [
          {
            name: 'layer_qm',
            value: '案件',
            parentName: 'layer_zh',
            parentIndex: '2',
            src: 'static/imgs/main/anjian.png',
            checkedSrc: 'static/imgs/main/anjian_c.png'
          },
          {
            name: 'layer_xcy',
            value: '巡查员',
            parentName: 'layer_zh',
            parentIndex: '2',
            src: 'static/imgs/main/xuncha.png',
            checkedSrc: 'static/imgs/main/xuncha_c.png'
          }
        ],
        //视频监控
        JKtargets: [
          {
            name: 'layer_sp_slw',
            value: '散乱污企业',
            parentName: 'layer_jk',
            from:'0',
            parentIndex: '1',
            src: 'static/imgs/mues/video/slw.png',
            checkedSrc: 'static/imgs/mues/video/slw_c.png'
          },
          {
            name: 'layer_sp_voc',
            value: '秸秆焚烧',
            parentName: 'layer_jk',
            from:'1',
            parentIndex: '1',
            src: 'static/imgs/mues/video/jg.png',
            checkedSrc: 'static/imgs/mues/video/jg_c.png'
          }
        ]
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {

      //指标切换点击事件
      liClick(e){
        let t = this;
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let targets = this.$data.targets;
        let item = targets[index];
        let hasChecked = false;
        let mt = 0;
        if (parseInt(index) === 0) {
          t.kongqi = !t.kongqi;
          t.getParentStyle(index);
          mt = t.kongqi ? 38*(this.mlength - 1)+3 : 0;
        }
        else if (parseInt(index) === 1) {
          t.shiping = !t.shiping;
          t.getParentStyle(index);
          mt = t.shiping ? 38+3 : 0;
        }
        else if (parseInt(index) === 2) {
          t.jiankong = !t.jiankong;
          t.getParentStyle(index);
          mt = t.jiankong ? 38 : 0;
        }

        childElement.style.marginBottom = mt + 'px';

      },

      //指标切换点击事件
      OKQClick(e){
        let _this = this;
        if (e.target.nodeName === 'SELECT' || _this.hasSelect) {
          _this.hasSelect = false;
          return;
        }
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let parentName = childElement.getAttribute('data-parent');
        let parentIndex = childElement.getAttribute('data-parent-index');
        let targets = parentName.toUpperCase() === 'LAYER_JC' ? this.$data.JCtargets : this.$data.ZHtargets;
        let item = targets[index];

        let hasChecked = false;
        item.childs && (item.childs.length && (item.checked = !item.checked));
        imgElement.getAttribute('src') !== item.src ? (imgElement.src = item.src, childElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)') : (imgElement.src = item.checkedSrc, childElement.style.backgroundColor = '#1b9d33', hasChecked = true);

        let hasParentChecked = this.hasCheckedChildElement(parentName) || false;
        this.setParentStates(parentIndex, hasParentChecked, parentName);

        bus.$emit('targetMainLayer', type, hasChecked);
        this.rightPanel(hasChecked,type);
      },

      //指标切换点击事件
      OVDClick(e){
        let t = this;
        let childElement = e.currentTarget;
        let imgElement = childElement.querySelector('img');
        let index = childElement.getAttribute('data-index');
        let type = childElement.getAttribute('data-type');
        let parentName = childElement.getAttribute('data-parent');
        let parentIndex = childElement.getAttribute('data-parent-index');
        let targets = this.$data.JKtargets;
        let item = targets[index];
        let hasChecked = false;
        let from = item.from;
        if (parseInt(index) === 0 || parseInt(index) === 1) {
              t.aclink = !t.aclink;
        }
        imgElement.getAttribute('src') !== item.src ? (imgElement.src = item.src, childElement.style.backgroundColor = 'rgba(0, 0, 0, 0.6)') : (imgElement.src = item.checkedSrc, childElement.style.backgroundColor = '#1b9d33', hasChecked = true);
        let hasParentChecked = this.hasCheckedChildElement('SP') || false;
        this.setParentStates(parentIndex, hasParentChecked, parentName);
        bus.$emit('targetMainLayer', type, hasChecked,from);
        this.rightPanel(hasChecked,type);
      },

      //删除指定对象
      removeObjWithArr(_arr, _obj) {
            let length = _arr.length;
            for (let i = 0; i < length; i++) {
                if (_arr[i] == _obj) {
                    if (i == 0) {
                        _arr.shift(); //删除并返回数组的第一个元素
                        return;
                    }
                    else if (i == length - 1) {
                        _arr.pop();  //删除并返回数组的最后一个元素
                        return;
                    }
                    else {
                        _arr.splice(i, 1); //删除下标为i的元素
                        return;
                    }
                }
            }
        },

      //设置父节点状态
      setParentStates(index, hasChecked, name){
        let item = this.$data.targets[index];
        let element = document.querySelectorAll('ul>li[data-type="' + name + '"]');
        if (element && element.length) {
          let el = element[0];
          let imgElement = el.querySelector('img');
          !hasChecked ? el.style.backgroundColor = 'rgba(0, 0, 0, 0.6)' : el.style.backgroundColor = '#1b9d33';
        }
      },

      //二级菜单栏父级背景切换
      getParentStyle(index){
          let t = this;
          let id = ('Litem_'+index);
          let backgroundimg = document.getElementById(id).getElementsByTagName("img")[0];
          if (backgroundimg.src.indexOf(t.clicksrc) != -1) {
              backgroundimg.src = t.clickchesrc;
          }
          else {
              backgroundimg.src = t.clicksrc;
          }
      },

      //判断父节点是否选中
      hasCheckedChildElement(type){
        let childTarget = (type.toUpperCase() === 'LAYER_JC' ? this.$data.JCtargets : (type.toUpperCase() === 'LAYER_ZH' ? this.$data.ZHtargets : this.$data.JKtargets)) || [];
        let childElement = (type.toUpperCase() === 'LAYER_JC' ? $('ol[class="kqworp"] li') : (type.toUpperCase() === 'LAYER_ZH'?$('ol[class="jkworp"] li'):$('ol[class="vdworp"] li'))) || [];
        for (let i = 0, length = childElement.length; i < length; i++) {
          let childItem = childTarget[i];
          let elementItem = childElement[i];
          let imgElement = elementItem.querySelector('img');
          if (imgElement.getAttribute('src') === childItem.checkedSrc) {
            return true;
          }
        }
        return false;
      },

      rightPanel(hasChecked,type){
          //已有对象不添加
          if(this.$store.state.menuData){
              //console.log(Array.isArray(this.$store.state.menuData));
              for(let i=0;i<this.$store.state.menuData.length;i++){
                  let item = this.$store.state.menuData[i];
                  if(item.show_xs === type){
                      //删除选项
                      let keyarr = this.$store.state.menuData;
                      for (let k = 0; k < keyarr.length; k++) {
                          if (keyarr[k].show_xs == type) {
                              // 删除指定对象
                              this.removeObjWithArr(keyarr, keyarr[k])
                          }
                      }
                  }
              }
          };
        //动态添加右侧菜单
        if (hasChecked && type != 'layer_lk' && type != 'layer_zt' && type != 'layer_hw' && type != 'layer_jy') {
          //添加对应右侧菜单
          switch (type) {
            case 'layer_gs':
              this.$store.state.menuData.unshift({
                title: '国省',
                title_tx: '国省控点',
                show_xs: 'layer_gs',
                url: 'static/imgs/indeximgs/morenimg/icon_fang.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_fang.png'
              });
              bus.$emit('menuative', '国省');
              break;
            case 'layer_cgq_lcs':
              this.$store.state.menuData.unshift({
                title: '六参',
                title_tx: '六参数',
                show_xs: 'layer_cgq_lcs',
                url: 'static/imgs/indeximgs/morenimg/icon_yuan1.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_yuan1.png'
              });
              bus.$emit('menuative', '六参');
              break;
            case 'layer_cgq_vocs':
              this.$store.state.menuData.unshift({
                title: 'VOC',
                title_tx: 'VOC监测',
                show_xs: 'layer_cgq_vocs',
                url: 'static/imgs/indeximgs/morenimg/icon_Triangle_3.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_Triangle_3.png'
              });
              bus.$emit('menuative', 'VOC');
              break;
            case 'layer_cx':
              this.$store.state.menuData.unshift({
                title: '乡镇',
                title_tx: '乡镇统计',
                show_xs: 'layer_cx',
                url: 'static/imgs/indeximgs/morenimg/icon_ditu2.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_ditu2.png'
              });
              bus.$emit('menuative', '乡镇');
              break;
            case 'layer_gd':
              this.$store.state.menuData.unshift({
                title: '工地',
                title_tx: '工地扬尘',
                show_xs: 'layer_gd',
                url: 'static/imgs/indeximgs/morenimg/icon_gd.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_gd.png'
              });
              bus.$emit('menuative', '工地');
              break;
            case 'layer_qy':
              this.$store.state.menuData.unshift({
                title: '企业',
                title_tx: '企业监测',
                show_xs: 'layer_qy',
                url: 'static/imgs/indeximgs/morenimg/icon_enterprise.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_enterprise.png'
              });
              bus.$emit('menuative', '企业');
              break;
            case 'layer_yqd':
              this.$store.state.menuData.unshift({
                title: '静态',
                title_tx: '大气排放源清单',
                show_xs: 'layer_yqd',
                url: 'static/imgs/indeximgs/morenimg/icon_jiayou.png',
                url_one: 'static/imgs/indeximgs/morenimg/icon_jiayou.png'
              });
              bus.$emit('menuative', '静态');
              break;
            case 'layer_qm':
              this.$store.state.menuData.unshift({
                title: '案件',
                title_tx: '案件',
                show_xs: 'layer_qm',
                url: 'static/imgs/indeximgs/morenimg/anjian.png',
                url_one: 'static/imgs/indeximgs/morenimg/anjian.png'
              });
              bus.$emit('menuative', '案件');
              break;
            case 'layer_sp_slw':
              this.$store.state.menuData.unshift({
                title: '散乱视频',
                title_tx: '散乱污视频',
                show_xs: 'layer_sp_slw',
                url: 'static/imgs/indeximgs/morenimg/slw.png',
                url_one: 'static/imgs/indeximgs/morenimg/slw.png'
              });
              bus.$emit('menuative', '散乱视频');
              break;
            case 'layer_sp_jg':
              // this.$store.state.menuData.unshift({
              //   title: '秸秆焚烧',
              //   title_tx: '秸秆焚烧',
              //   show_xs: 'layer_sp_jg',
              //   url: 'static/imgs/mues/video/jg.png',
              //   url_one: 'static/imgs/mues/video/jg_c.png'
              // });
              //bus.$emit('menuative', '秸秆焚烧');
              break;
            case 'layer_xcy':
              this.$store.state.menuData.unshift({
                title: '巡查员',
                title_tx: '巡查员',
                show_xs: 'layer_xcy',
                url: 'static/imgs/indeximgs/morenimg/xcy.png',
                url_one: 'static/imgs/indeximgs/morenimg/xcy.png'
              });
              bus.$emit('menuative', '巡查员');
              break;
            default:
              bus.$emit('menuative', '统计');
              break;
          }
          console.log(type);
        } else {
          //删除选项
          let keyarr = this.$store.state.menuData;
          for (let i = 0; i < keyarr.length; i++) {
            //console.log(keyarr[i]);
            if (keyarr[i].show_xs == type) {
              // console.log('该删除我了')
              console.log(keyarr[i])
              // 删除指定对象
              this.removeObjWithArr(keyarr, keyarr[i])
            }
          }
        }
      },

      //删除指定对象
      removeObjWithArr(_arr, _obj) {
        let length = _arr.length;
        for (let i = 0; i < length; i++) {
          if (_arr[i] == _obj) {
            if (i == 0) {
              _arr.shift(); //删除并返回数组的第一个元素
              return;
            }
            else if (i == length - 1) {
              _arr.pop();  //删除并返回数组的最后一个元素
              return;
            }
            else {
              _arr.splice(i, 1); //删除下标为i的元素
              return;
            }
          }
        }
      },
      //
      targetChanged(e) {
        this.hasSelect = true;
        let childElement = e.currentTarget;
        let index = childElement.getAttribute('data-index');
        let selectedIndex = childElement.selectedIndex;
        let targets = this.$data.JCtargets;
        let item = targets[index];
        let ckItem = item.childs[selectedIndex];
        let displayName = item.displayName;
        let primaryKey = item.primaryKey;
        //let type = item.code;
        let fieldName = ckItem.fieldName;
        let type = item.name;
        let legends = ['AQI','PM25','PM10','CO','SO2','O3','NO2'];
        legends.includes(fieldName.toUpperCase()) && bus.$emit('targetLegend',fieldName.toUpperCase());
        // console.log(type);
        bus.$emit('targetPollution', type, ckItem.fieldName, displayName, primaryKey);
      },
    },
    components: {MainHandle}
  };
</script>
<style lang="scss" scoped>
  .main-layer {
    position: absolute;
    left: 0;
    border-radius: 4px;
    top: 50px;
    z-index: 1;
    .warp-box{
        margin-left: 6px;
        li{
          width: 135px;
          margin-right: 5px;
          margin-top: 1px;
          border-radius: 19px;
          box-shadow:9px 0px 18px rgba(36,148,242,0.53);
          span{
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            color: #fff;
          }

          img{
            margin: 14px 0;
            float: right;
            padding-right: 6px;
          }
        }
        li:nth-child(1){
          margin-bottom:114px;
        }
        li:nth-child(2){
          margin-bottom: 38px;
        }
    }
  }

  .kqworp {
    position: absolute;
    top: 38px;
    left: 150px;
    color: #fff;

    border-radius:10px;
    box-shadow:9px 0px 18px rgba(36,148,242,0.53);

  }
  .ACvideo{
      position: fixed;
      display: inline-block;
      padding: 5px 15px;
      color: #fff;
      background:rgba(0, 0, 0, 0.6) ;
      left: calc(50% - 100px);
      bottom:20px;
  }
  .vdworp {
    position: absolute;
    top: 342px;
    left: 150px;
    color: #fff;
    border-radius:10px;
    box-shadow:9px 0px 18px rgba(36,148,242,0.53);

  }

  .jkworp {
    position: absolute;
    top: 456px;
    left: 150px;
    color: #fff;
    border-radius:10px;
    box-shadow:9px 0px 18px rgba(36,148,242,0.53);

  }

  .main-layer-handle {
    width: 148px;
    background: #fff;
    color: #1b9d33;
    font-weight: bold;
    line-height: 38px;
    visibility: hidden;
    opacity: 0.8;
  }

  .main-layer ul {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    width: 148px;
    color: #fff;
  }

  .main-layer li {
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    background-color: rgba(0, 0, 0, 0.6);
    list-style: none;
    line-height: 38px;
    width: 148px;
    padding: 0;
    cursor: pointer;
  }
  .main-layer li img {
    margin: 8px 0;
  }
  .main-layer li span {
    display: inline-block;
    width: calc(100% - 40px);
    vertical-align: baseline;
    text-align: left;
    font-size: 12px;
    font-family: "Microsoft YaHei";
  }

  .kqworp select, .kqworp option {
    width: 64px;
    height: 38px;
    left: 136px;
    border: none;
    position: absolute;
  }
</style>
