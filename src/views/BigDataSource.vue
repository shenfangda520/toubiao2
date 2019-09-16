<template>
    <div id="BigDataSource">
        <v-header :isChoose="3"></v-header>
      <div class="leftNav">
        <ul>
          <li v-for="(v,i) in leftTabs" @click="tabClick(v,i)" :class='i===isChecked && "leftchecked"'><span
            :style='"color:"+(i===isChecked ? "#11DA88" : "#fff")'>{{v.label}}</span></li>
        </ul>
      </div>
        <router-view/>
    </div>
</template>

<script>
  import {bus} from '@/js/bus.js'
  import api from '../api/index'

  export default {
    name: 'BigDataSource',
    data() {
      return {
        isChecked:0,
        leftTabs:[
          {label:'国控点均值比',path:'/BigDataSource/MeanRatioSensorNetwork'},
          {label:'区县排名',path:'/BigDataSource/CityRankings'},
          {label:'同期变化率',path:'/BigDataSource/SimultaneousRate'},
          {label:'空气质量数据',path:'/BigDataSource/ContaminantCurve'},
          {label:'控制值',path:'/BigDataSource/Warn'},
          {label:'污染日历',path:'/BigDataSource/pollution'},
        ]
      }
    },

    mounted() {

    },
    methods: {
      tabClick(v,i){
        console.log(i)
        this.isChecked = i;
        this.$router.push(v.path);
      },
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #BigDataSource {
    width: 100%;
    height: 100%;
    background-color: #141a38;
    .leftNav {
      width: 116px;
      height: calc(100% - 86px);
      background-color: #1b2143;
      float: left;
      ul {
        padding-top: 14px;
        li {
          width: 112px;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .leftchecked {
        border-right: 4px solid #12DA88;
        background-color: #151A37;
      }
    }
  }
</style>
