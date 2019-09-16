<template>
    <!--散乱污视频右侧面板-->
    <div class="main">
        <div class="tables">
            <!--选项-->
            <a id="shishi">视频监控</a>
            <div class="xian"></div>
        </div>
        <div class="shiping-warp">
            <div class="sp-uk">
                <p style="font-weight: bold">友情提示</p>
                <p>视频管理需要IE浏览器或者360浏览器兼容模式</p>
            </div>
            <img class="sp-li" src="../assets/img/jiankong.png" alt="">
            <div class="sp-up">
                <a target="_blank" href="https://auth.ys7.com/signIn?from=4e4148ba90184a7cbd81&r=6184882762854148900&returnUrl=plugin">点击查看视频管理页面</a>
            </div>
        </div>
    </div>
</template>
<!---->
<script>
    import {bus} from '@/js/bus.js'
    import api from '../api/index'

    export default {
        name: 'scattereddirtvideo',
        data() {
            return {

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {

        },
        components: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

   .main {
       width:430px;
       height: auto;
       .tables {
           width: 100%;
           line-height: 38px;
           a {
               margin-left: -310px;
               display: inline-block;
               color: #4696FF;
               font-size: 16px;
               border-bottom: solid 2px #4696FF;
               padding: 0 20px;
               margin-bottom: -2px;
           }
           .xian {
               width: 100%;
               border: solid 1px #ccc;
           }
       }
       .shiping-warp{
           width: 100%;
           height: 80px;
            .sp-uk{
                width: 90%;
                height: 90px;
                margin: 0 auto;
                p{
                    font-size: 18px;
                    padding: 10px 0;
                }
            }
           .sp-li{
               width: 90%;
               display: block;
               margin: 0 auto;
           }
           .sp-up{
               width:90%;
               height: 60px;
               margin: 20px auto;
               a{
                   font-size: 16px;
                   background: rgb(67,137,243);
                   color: #fff;
                   display: block;
                   width: 60%;
                   line-height: 0px;
                   height: 40px;
                   padding: 20px 30px;
                   margin: 0 auto;
                   border-radius: 4px;
               }
           }
       }
   }
</style>
