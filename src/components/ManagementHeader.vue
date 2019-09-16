<template>
    <div class="header">
        <div class="navbox">
            <!--环境监测-->
            <div class="logo">
                <img src="../assets/img/logo1.png" alt="logo"> <a style="color: #fff;font-size:21px;font-weight: 500;line-height: 56px;font-family: 'Microsoft YaHei' ">廊坊市广阳区网格化环境管理平台-后台</a>
            </div>
            <ul class="bnav">
                <div> <a href="#/likewinter">首页</a>
                </div>
                <div> <span class="position-p"></span>

                    <img style="padding: 0 20px" src="../assets/img/btn_intercalate.png" class="activehov">
                    <div class="Sixitem submenu">
                        <a class="tuichu" v-on:click="exit">
                            <img src="../assets/img/btn_quit1.png" alt="">退出系统</a>
                    </div>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'header',
        data () {
            return {
                houtaiSrc: '../../static/imgs/mues/header/btn_Backstage2.png',
                houtaiChesSrc: '../../static/imgs/mues/header/btn_Backstage1.png',
                tuichuSrc: '../../static/imgs/mues/header/btn_quit2.png',
                tuichuChesSrc: '../../static/imgs/mues/header/btn_quit1.png',
                userMess:'',
            }
        },
        mounted(){
            const t = this;
            //
            $(".houtai").hover(function () {$(".houtai img").attr('src', t.houtaiSrc);}, function () {$(".houtai img").attr('src', t.houtaiChesSrc);});
            //
            $(".tuichu").hover(function () {$(".tuichu img").attr('src', t.tuichuSrc);}, function () {$(".tuichu img").attr('src', t.tuichuChesSrc);});
        },
        methods: {
			exit(){
                this.$cookies.remove('auth');
                this.$router.push('/login');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .header {
        width: 100%;
        height: 56px;

        .navbox{
            width: 100%;
            height: 56px;
            background: #2494F2;
            position: absolute;
            top: 0;
            left: 0;
            box-shadow:9px 0px 28px rgba(36,148,242,0.53);
            .position-p{
                position: absolute;
                display: inline-block;
                width: 25px;
                height: 25px;
                border: 1px solid #e5e5dd;
                top: 16px;
                left: 17px;
            }
            .logo {
                float: left;
                width: auto;

                img {
                    width: 40px;
                    height: 40px;
                    margin-top: -9px;
                    margin-left: 20px;
                    margin-right: 2px;
                }

            }
            .bnav {
                float: right;
                height: 56px;
                margin-right: 2px;
                div {
                    float: left;
                    width: auto;
                    height: 56px;
                    list-style: none;
                    line-height: 56px;
                    position: relative;
                    margin-left:20px;
                    text-align: left;
                    img{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    a {
                        color: #dee9f5;
                        font-size: 16px;
                        font-family: '微软雅黑';
                        cursor: pointer;
                        padding: 0;
                    }
                    :hover {
                        text-decoration: none;
                    }
                    .Sixitem {
                        display: none;
                        z-index: 100;
                        width: 100px;
                        position: absolute;
                        overflow: hidden;
                        top: 56px;
                        right: 0;
                        background: #fff;
                        line-height: 25px;
                        padding: 16px 0;
                        box-shadow: 0 0 5px #ccc;

                        a {
                            color: #666;
                            font-size: 12px;
                            padding: 0 10px;
                            font-family: "Microsoft YaHei";
                            margin-left: -17px;
                            cursor: pointer;

                            img {
                                vertical-align: middle;
                                padding-right: 6px;
                                padding-left: 18px;
                                margin-top: -2px;
                            }

                        }
                        :hover {
                            cursor: pointer;
                            color: #1080cc;
                        }

                    }
               }
            }
        }
    }

</style>
