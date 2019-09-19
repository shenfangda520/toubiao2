<template>
    <div class="Paneldataindex">
        <!--首页面板-->
        <div class="radiolist">
            <el-radio-group v-model="radioValue" @change="changeEvent">
              <el-radio-button label="1">TVOC在线监测</el-radio-button>
              <el-radio-button label="2">VOC视频监控</el-radio-button>
              <el-radio-button label="3">分配记电系统</el-radio-button>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'
    //页面图例组件

    export default {
        name: 'paneldata',
        data() {
            return {
              radioValue:'1'
            }
        },
        activated() {},
        mounted() {
        },
        updated(){
           
        },
        computed:{

        },
        watch:{
            
        },
        methods: {
          changeEvent(l){
            switch(parseInt(l)){
              case 1:
                bus.$emit('targetMainLayer', 'layer_cgq_voc', true);
                bus.$emit('targetMainLayer', 'LAYER_SP_SLW', false);
                break;
              case 2:
                bus.$emit('targetMainLayer', 'layer_cgq_voc', false);
                bus.$emit('targetMainLayer', 'LAYER_SP_SLW', true);
                break;
              case 3:
                break;
            }
          }
        },
        components: {}
    }
 </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .radiolist {
        width: 410px;
       float: right;
       margin-top: 20px;
       margin-right: 20px; 
    }


</style>
