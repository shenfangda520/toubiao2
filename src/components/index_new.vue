<template>
    <div class="Paneldataindex">
        <!--首页面板-->
        <div class="radiolist">
            <el-radio-group v-model="radio1">
              <el-radio-button label="TVOC在线监测"></el-radio-button>
              <el-radio-button label="VOC视频监控"></el-radio-button>
              <el-radio-button label="分配记电系统"></el-radio-button>
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
               radio1:'TVOC在线监测'
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
