<script>
  import Axios from 'axios'
  import BMap from 'BMap'
  import Coordtransform from 'coordtransform'
  import RequestHandle from '@/request/'
  import {bus} from '@/js/bus.js'
  // import debounce from 'lodash.debounce';

  // const hideLabel = debounce(function (_this) {
  //   _this.labelSymbol1.hide();
  // }, 300);
  export default {
    name: 'BdPolygon',
    render() {
    },
    data() {
      return {
        layers: [{
          url: '/static/data/TY1.json',
          hasVisible: true,
          displayFieldName: 'FCNAME',
          geometry: []
        }, {
          url: '/static/data/TE1.json',
          hasVisible: false,
          displayFieldName: 'FCNAME',
          geometry: []
        }, {
          url: '/static/data/TS1.json',
          hasVisible: false,
          displayFieldName: 'FCNAME',
          geometry: []
        }],
        menuLayer: undefined,
        menuLayerIndex: 1,
        labelSymbol: new BMap.Label(),
        checkLayerIndex: 0,
        hasLoaded: false,
        hasRequest: false,
        // labelSymbol1: null,
        // geometriesOfLabel: []

      }
    },
    watch: {
      // geometriesOfLabel(newValue) {
      //   if (newValue && newValue.length) {
      //     const {center, text} = newValue[newValue.length - 1];
      //     this.labelSymbol1.setPosition(center);
      //     this.labelSymbol1.setContent(text);
      //     this.labelSymbol1.show();
      //     hideLabel.cancel();
      //   }else{
      //     hideLabel(this);
      //   }
      // }
    },
    create() {

    },

    mounted() {
      // let t = this;
      // setTimeout(function () {
      //   t.map = t.$parent.$parent.$parent.$parent.map;
      //
      //   if (t.map) {
      //     t.map.addOverlay(t.labelSymbol);
      //     t.labelSymbol.hide();
      //     t.labelSymbol.setStyle({color: '#333', backgroundColor: '#fff', border: 'solid 1px #333'});
      //    t.ready();
      //   }
      // }, 10);
      bus.$once('setPolygonMap', this.setMap);
      bus.$on('setVisible', this.setLayerVisible);
      bus.$on('setOpacity', this.setOpacity);//setLayerHide
      bus.$on('setLayerHide', this.setLayerHide);//setLayerHide
      bus.$on('setMenuLayer', this.setMenusLayerStyle);//setLayerHide
    },

    activated() {
//       this.hasRequest = false;
//       this.checkLayerIndex = 0;
//       this.clearOverlay();
//       let checkLayer = this.$parent.$parent.$parent.$parent.$parent.layerId || 0;
//       let index = 0;
// //      if (checkLayer === 'EW')
// //        index = 1;
// //      else if (checkLayer === 'SW')
// //        index = 2;
//       let t = this;
//       for (let i = 0, length = this.layers.length; i < length; i++) {
//         let l = this.layers[i];
//         l.hasVisible = i === index;
//       }
//
//       !this.hasLoaded && this.ready();
    },

    methods: {
      setMap(map) {
        this.map = map;
        this.map.addOverlay(this.labelSymbol);
        this.labelSymbol.hide();
        this.labelSymbol.setStyle({color: '#333', backgroundColor: '#fff', border: 'solid 1px #333'});
        this.menuLayer = {...this.layers[this.menuLayerIndex], geometry: []};
        this.ready();
      },

      //初始化
      ready() {
        this.labelSymbol1 = new BMap.Label();
        this.labelSymbol1.setStyle({color: '#333', backgroundColor: '#fff', border: 'solid 1px #333'});
        this.labelSymbol1.hide();
        this.map.addOverlay(this.labelSymbol1);
        let t = this;
        for (let j = 0, count = this.layers.length; j < count; j++) {
          let sle = this.getLeaveColor(j);
          let layer = t.layers[j];
          let url = layer.url;
          let visible = layer.hasVisible;
          if (layer.hasVisible) {
            let displayFieldName = layer.displayFieldName;
            Axios({
              url: url,
              method: 'GET',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              data: {}
            }).then(function (result) {
              if (result.status === 200) {
//                  console.log(result.data);
                t.createPolygon(result.data, layer.geometry, displayFieldName, sle);
                for (let i = 0, length = layer.geometry.length; i < length; i++) {
                  let ply = layer.geometry[i];
                  t.map.addOverlay(ply);
                  visible ? ply.show() : ply.hide();
                }
//                bus.$emit('myAjaxLoad')
              }
            }).catch(function (ex) {
//            console.log(ex)
            })
          }
        }
      },

      //设置图层显隐
      setLayerVisible(index, hasVisible) {
        let t = this;
        this.clearOverlay();
        if (hasVisible) {
          t.hasRequest = t.checkLayerIndex === index;
          if (!t.hasRequest) {
            this.checkLayerIndex = index;
            let layer = this.layers[index];
            let geometry = layer.geometry;
            for (let i = 0, length = this.layers.length; i < length; i++) {
              this.layers[i].hasVisible = i === parseInt(index);
            }
            this.ready();
          }
        }
        //for (let i = 0, length = geometry.length; i < length; i++) {
        //hasVisible ? geometry[i].show() : geometry[i].hide();
        //}
      },

      //清除面覆盖层
      clearOverlay() {
        let t = this;
        this.layers.forEach(function (v) {
          v && (v.geometry.forEach(function (ol) {
            t.map.removeOverlay(ol);
          }));
          v.geometry = [];
        });
      },

      //设置覆盖层透明度
      setOpacity(index, opacity) {
        let layer = this.layers[index];
        let geometry = layer.geometry;
        for (let i = 0, length = geometry.length; i < length; i++) {
          geometry[i].setFillOpacity(opacity);
          geometry[i].setStrokeOpacity(opacity);
        }
      },

      //设置图层隐藏
      setLayerHide(hasVisible = false) {
        for (let i = 0, length = this.layers.length; i < length; i++) {
          let geometry = this.layers[i].geometry;
          for (let j = 0, count = geometry.length; j < count; j++) {
            hasVisible ? geometry[j].show() : geometry[j].hide();
          }
        }
      },

      //创建面
      createPolygon(data, layer, displayFieldName, polygonStyle, listSource ) {
        let transformRing = this.getBdPolygon(data);
        let t = this;
        for (let i = 0, length = transformRing.length; i < length; i++) {
          let lsRings = transformRing[i];
          let geometry = lsRings.geometry;
          let attributes = lsRings.attributes;
          if(listSource){
            let gridcasesum = listSource.find(v => v.id === attributes.gridcode).casenum || 0;
            attributes.casenum=gridcasesum;
          }

          //let fillColor = color || this.getRandomColor();
          for (let j = 0, count = geometry.length; j < count; j++) {
            let polygon = this.getStringPolygon(geometry[j]);
            let ply = new BMap.Polygon(polygon, polygonStyle);
            ply.attributes = attributes;
            ply.displayFieldName = displayFieldName;

            layer.push(ply);
//            this.map.addOverlay(ply);
//            hasVisible ? ply.show() : ply.hide();
//            ply.addEventListener('click', function (e) {
////              console.log(e);
//            });
            ply.addEventListener('mouseover', function (e) {
              //  t.labelSymbol.show();
              // console.log('ss',t.labelSymbol);
            });
            ply.addEventListener('click', this.mouseClickEvent);
            ply.addEventListener('mouseout', function (e) {
              t.labelSymbol.hide();
//              console.log(t.labelSymbol);
            });
          }
        }
      },

      //设置指定网格样式
      setMenusLayerStyle(layerIndex, hasVisible, listSource = []) {
        const _this = this;
        let layer = _this.menuLayer;
        let url = layer.url;
        let displayFieldName = layer.displayFieldName;
        !layer.geometry.length ? (Axios({
          url: url,
          method: 'GET',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: {}
        }).then(function (result) {
          if (result.status === 200) {
            _this.createPolygon(result.data, _this.menuLayer.geometry, displayFieldName, _this.getLeaveColor(_this.menuLayerIndex), listSource);
            _this.menuLayer.geometry.forEach(g => {
              let grid = listSource.find(v => v.id === g.attributes.gridcode).casenum || 0;
              g.setFillColor(_this.getFillColor(_this.getFillLevel(grid)));
              g.setFillOpacity(1);
              g.show();
              _this.map.addOverlay(g);
              // g.addEventListener('mouseover', function (e) {
              //   console.log('mouseover',_this.geometriesOfLabel.length)
              //   _this.geometriesOfLabel.push({g,center: g.getBounds().getCenter(), text: g.attributes.FCNAME + grid});
              // });
              // g.addEventListener('mouseout', function (e) {
              //   // if (!g.getBounds().containsPoint(e.point)){
              //   console.log('mouseout',_this.geometriesOfLabel.length)
              //   const index = _this.geometriesOfLabel.findIndex(i => i.g === g);
              //   if (index > -1) {
              //     _this.geometriesOfLabel.splice(index, 1);
              //   }
              //   // }
              //
              // });
              // g.addEventListener('remove', function (e) {
              //   _this.hideLabel();
              //   // _this.map.removeOverlay(labelSymbol1);
              //
              // });
            });
          }
        }).catch(function (ex) {
        })) : _this.menuLayer.geometry.forEach(g => {
          let grid = listSource.find(v => v.id === g.attributes.gridcode).casenum || {count: 0};
          g.setFillColor(_this.getFillColor(_this.getFillLevel(grid)));
          g.setFillOpacity(1);
          hasVisible ? g.show() : g.hide();
        });
      },

      getFillLevel(count) {
        let level = 1;
        if (count >= 5 && count < 15) {
          level = 2;
        }
        else if (count >= 15 && count < 20) {
          level = 3;
        }
        else if (count >= 20 && count < 25) {
          level = 4;
        }
        else if (count >= 25 && count < 30) {
          level = 5;
        }
        else if (count >= 30) {
          level = 6;
        }
        return level;
      },

      getFillColor(index) {
        var color = '#43ce17';
        switch (index) {
          case 0:
            color = '#999'
            break
          case 1:
            color = '#13e613'
            break
          case 2:
            color = '#ffe915'
            break
          case 3:
            color = '#ffb41b'
            break
          case 4:
            color = '#ff5c3b'
            break
          case 5:
            color = '#de2159'
            break
          case 6:
            color = '#9e0835'
            break
          default:
            color = '#43ce17';
            break;
        }
        return color
      },


      //面点击事件
      mouseClickEvent(e) {
        let t = this;
        t.labelSymbol.show();
        t.labelSymbol.setPosition(e.point);
        let displayFieldName = e.target.displayFieldName;
        let attributes = e.target.attributes;
//        console.log(e);
        (attributes && displayFieldName) && (t.labelSymbol.setContent(attributes[displayFieldName]+(attributes['casenum']?attributes['casenum']:'')));
        (attributes && displayFieldName) && (t.setSearchInfoWindow(e.point, attributes, displayFieldName));
      },

      //设置弹出层
      setSearchInfoWindow(point, attributes, displayFieldName) {
        let t = this;
        let res = t.setSearchInfoStyle(attributes);
        if (res) {
          let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res || '无数据', {
            title: '<sapn style="font-size:16px" ><b title="' + (attributes[displayFieldName] || '') + '">' + (attributes[displayFieldName] || '') + '</b>' + '</span>',             //标题
            width: '450',
            height: 'auto',
            enableAutoPan: true,
            enableSendToPhone: false,
            searchTypes: []
          });
          let m = new BMap.Marker(point, {
            offset: new BMap.Size(-attributes[displayFieldName].length * 6, 48)
          });
          searchInfoWindow.open(m);
        }
//        let t = this;
//        let path = RequestHandle.getRequestUrl('');
//        let url = path + '?code=' + attributes['code'];
//        let params = {url: url, type: 'GET', pms: null};
//        RequestHandle.request(params, function (result) {
//          let res = t.setSearchInfoStyle(result.obj);
//          if (res) {
//            let searchInfoWindow = new BMapLib.SearchInfoWindow(t.map, res || '无数据', {
//              title: '<sapn style="font-size:16px" ><b title="' + (attributes[displayFieldName] || '') + '">' + (attributes[displayFieldName] || '') + '</b>' + '</span>',             //标题
//              width: '120',
//              height: 'auto',
//              enableAutoPan: true,
//              enableSendToPhone: false,
//              searchTypes: []
//            });
//            searchInfoWindow.open(point);
//          }
//        }, function (e) {
//          console.error(e);
//        });
      },

      //设置弹出层样式
      setSearchInfoStyle(attributes) {
        let url = undefined;
        if (attributes.hasOwnProperty('gridcode')) {
          switch (parseInt(this.checkLayerIndex)) {
            case 0:
              url = 'static/alert3/one.html' + '?gridcode=' + attributes.gridcode;
              break;
            case 1:
              url = 'static/alert3/two.html' + '?gridcode=' + attributes.gridcode;
              break;
            case 2:
              url = 'static/alert3/three.html' + '?gridcode=' + attributes.gridcode;
              break;
          }
        }
        return url ? '<iframe style="height:100%;min-height: 260px;width:100%;border:none;" src="' + url + '"></iframe>' : undefined;
      },

      //获取面数据
      getBdPolygon(data) {
        let rtValue = [];
        let features = data.features || [];
        for (let i = 0, length = features.length; i < length; i++) {
          let feature = features[i];
          let attributes = feature.attributes || {};
          let geometry = feature.geometry;
          let rings = geometry.rings || [];
          rtValue.push({attributes: attributes, geometry: this.ringsTransform(rings)});//坐标转换
          // rtValue.push({attributes: attributes, geometry: rings});//转换后坐标
        }
        return rtValue
      },

      //面图层转换
      ringsTransform: function (data) {
        if (!data) {
          return undefined;
        }
        let rtValue = [];
        for (let i = 0, length = data.length; i < length; i++) {
          let item = data[i];
          if (Array.isArray(item)) {
            let bdPoints = this.wgsPointToBd(data[i]);
            rtValue.push(bdPoints);
          }
        }
        return rtValue;
      },

      //WGS坐标转百度坐标
      wgsPointToBd: function (data) {
        let lsTransPoints = [];
        if (!this.convert) {
          this.convert = new BMap.Convertor();
        }
        for (let i = 0, length = data.length; i < length; i++) {
          let pts = data[i];
          let transPoint = this.transformFun(pts);
          let bdPoint = new BMap.Point(transPoint[0], transPoint[1]);
          lsTransPoints.push(bdPoint);
        }
        return lsTransPoints;
      },

      //坐标转换
      transformFun: function (path) {
        let gcPoint = Coordtransform.wgs84togcj02(path[0], path[1]);
        return Coordtransform.gcj02tobd09(gcPoint[0], gcPoint[1]);
      },

      //获取面字符串
      getStringPolygon: function (ring) {
        let rtValue = '';
        for (let i = 0; i < ring.length; i++) {
          let pt = ring[i];
          if (rtValue === '') {
            rtValue = (pt.lng || pt[0]) + ',' + (pt.lat || pt[1]);
          } else {
            rtValue += ';' + (pt.lng || pt[0]) + ',' + (pt.lat || pt[1]);
          }
        }
        return rtValue;
      },

      //获取随机颜色
      getRandomColor: function () {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
      },

      //获取等级颜色
      getLeaveColor: function (type) {
        let sle = {};
        switch (type) {
          case 0:
            sle = {
              strokeWeight: 1,
              strokeStyle: 'solid',//dashed
              // strokeColor: '#0070CE',
              // fillColor: '#2D96EF',
              strokeColor: '#FEFCFD',
              fillColor: '#E7E6E6',
              fillOpacity: 0.5
            };
            break;
          case 1:
            sle = {
              strokeWeight: 1,
              strokeStyle: 'solid',
              strokeColor: '#B8B9B8',
              fillColor: '#E7E6E6',
              // strokeColor: '#1C7B2A',
              // fillColor: '#6FB779',
              fillOpacity: 0.6
            };
            break;
          case 2:
            sle = {
              strokeWeight: 1,
              strokeStyle: 'dashed',
              strokeColor: '#8441c9',
              fillColor: '#E8AAFF',
              fillOpacity: 0.2
            };
            break;
        }
        return sle;
      }
    }
  }

</script>
