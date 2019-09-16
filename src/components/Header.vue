<template>
    <div class="header">
        <div class="navbox">
            <!--环境监测-->
            <div class="logo">
                <img src="../assets/img/logo1.png" alt="logo">
                <a style="color: #fff;font-size:21px;font-weight: 500;line-height: 56px;font-family: 'Microsoft YaHei' ">固安县环境保护网格化管理平台</a>
            </div>
           <!---->
            <ul class="bnav">
                <!--<li><a href="#/">实时监测</a></li>-->
                <!--<li>-->
                    <!--<a style="padding: 0 10px" href="#/">-->
                        <!--实时监测-->
                    <!--</a>-->
                <!--</li>-->
                <!--气象预报-->
                <!--<li>-->
                    <!--<a style="padding: 0 10px">气象预报<i style="padding: 0 10px"></i></a>-->
                    <!--<div class="Fouritem submenu same">-->
                        <!--<a href="#/dynamicweather">动态风场</a><br/>-->
                        <!--<a href="#/Weather">天气预报</a><br/>-->
                        <!--<a href="#/SandDustForecast">沙尘预报</a><br/>-->
                        <!--<a href="#/FogHazeForecast">雾霾预报</a><br/>-->
                        <!--<a href="http://60.10.151.86:63317/langfang_release_web" target="_blank">空气质量</a>-->
                    <!--</div>-->
                <!--</li>-->

                <!--大数据资源-->
                <!--<li>-->
                    <!--<a style="padding: 0 10px">大数据资源<i style="padding: 0 10px"></i></a>-->
                    <!--<div class="Fiveitem submenu same">-->
                        <!--<div>-->
                            <!--<h3>排名</h3>-->
                            <!--<a href="#/StateControl">省控排名</a>-->
                            <!--<div class="line"></div>-->
                            <!--<a href="#/TvocRange">TVOC排名</a>-->
                        <!--</div>-->
						<!--<div>-->
                            <!--<h3>考核</h3>-->
                            <!--<a href="#/CountyCheck">区县考核</a>-->
                            <!--<div class="line"></div>-->
                            <!--<a href="#/CityCheck">乡镇考核</a>-->
                        <!--</div>-->
                        <!--<div>-->
                            <!--<h3>统计</h3>-->
                            <!--<a href="#/TodayData">今日数据</a>-->
                            <!--<div class="line"></div>-->
                            <!--<a href="#/SimultaneRate">同期变化率</a><br>-->
                            <!--<a href="#/RankingStatistics">排名统计</a>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</li>-->

                <!--系统后台-退出系统-->
                <!--<li style="margin-right: 0;">-->
                    <!--<span class="position-p"></span>-->
                    <!--<img style="padding: 0 20px" src="../assets/img/btn_intercalate.png" class="activehov">-->
                    <!--<div class="Sixitem submenu" v-if="isShow">-->
                        <!--<a href="#/Management/BusinessManagement/Case-Review" class="houtai"><img src="../assets/img/btn_Backstage1.png" alt="">进入后台</a><br/>-->
                        <!--<a class="tuichu" v-on:click="exit"><img src="../assets/img/btn_quit1.png" alt="">退出系统</a>-->
                    <!--</div>-->
                     <!--<div class="Sixitem submenu" v-else>-->
                        <!--<a class="tuichu" v-on:click="exit"><img src="../assets/img/btn_quit1.png" alt="">退出系统</a>-->
                    <!--</div>-->
                <!--</li>-->
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'header',
        data () {
            return {
                msg: 'App',
                houtaiSrc: '../../static/imgs/mues/header/btn_Backstage2.png',
                houtaiChesSrc: '../../static/imgs/mues/header/btn_Backstage1.png',
                tuichuSrc: '../../static/imgs/mues/header/btn_quit2.png',
                tuichuChesSrc: '../../static/imgs/mues/header/btn_quit1.png',
                userMess:'',
                isShow:true,
            }
        },
        mounted(){
        	this.isDuty = this.getlocal('userInfo').isDuty;
            //右侧收放
            const t = this;
            //
            $(".houtai").hover(function () {
                $(".houtai img").attr('src', t.houtaiSrc);
               // event.stopPropagation();
            }, function () {
                $(".houtai img").attr('src', t.houtaiChesSrc);
            });
            //
            $(".tuichu").hover(function () {
                $(".tuichu img").attr('src', t.tuichuSrc);
               // event.stopPropagation();
            }, function () {
                $(".tuichu img").attr('src', t.tuichuChesSrc);
            });

            //右侧伸缩栏模块
            $(".bnav li").hover(function () {
               //console.log($(this).find('div'))
                $(this).find('div').eq(0).css('display',"block")
            }, function () {
                $(this).find('div').eq(0).css('display',"none");
            });

        },

        methods: {
        	//获取本地
		    getlocal(name) {
		        let data = sessionStorage.getItem(name)
		        if (data != null && data != '') {
		            try {
		                let obj = eval('(' + data + ')')
		                return obj
		            } catch (e) {
		                return ''
		            }
		        } else {
		            return ''
		        }
		    },
            exit(){
                this.$cookies.remove('auth')
                setTimeout(() => {
                    //
                    this.$router.push('/login')
                })
            },

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
            background: #1b9d33;
            position: absolute;
            top: 0;
            left: 0;
            box-shadow:9px 0px 18px rgba(36,148,242,0.53);
            .position-p{
                position: absolute;
                display: inline-block;
                width: 25px;
                height: 25px;
                border: 1px solid #e5e5dd;
                top: 16px;
                left: 26px;
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
                /*width: 604px;*/
                float: right;
                height: 56px;

                h3:hover {
                    cursor: alias;
                }

                li {
                    float: left;
                    width: auto;
                    height: 56px;
                    list-style: none;
                    line-height: 56px;
                    position: relative;
                    margin-right: 15px;
                    padding: 0 10px;
                    .activehov {
                        transition: all 2s;
                    }

                    .activehov:hover {
                        transform: rotate(3600deg);
                    }

                    p {
                        margin: 0;
                    }

                    i {
                        color: #fff;
                        padding: 0 15px;
                    }

                    :active {
                        color: #0070CE;
                    }

                    a {
                        color: #dee9f5;
                        padding: 0 20px;
                        font-size: 16px;
                        font-family: '微软雅黑';
                        cursor: pointer;

                        i {
                            display: inline-block;
                            width: 9px;
                            height: 6px;
                            margin-left: 2px;
                            background: url("../assets/img/icon_sanjiao.png") no-repeat;
                        }

                    }
                    :hover {
                        text-decoration: none;
                    }

                    .line {
                        height: 10px;
                        width: 1px;
                        background: #DDDDDD;
                        margin: 0 13px;
                        display: inline-block;
                    }

                    .same {
                        z-index: 100;
                        display: none;
                        background: #fff;
                        box-shadow: 0 0 5px #ccc;
                        //border: 1px solid #ccc;
                        border-radius: 0 0 4px 4px;
                        padding: 4px 20px 20px 20px;
                        text-align: left;
                        line-height: 20px;

                        div {
                            text-align: left;
                            padding: 0;
                        }

                        a {
                            color: #666;
                            font-size: 14px;
                            padding: 0;
                            font-family: "Microsoft YaHei";
                            cursor: pointer;
                            font-weight: normal;
                        }

                        h3 {
                            margin: 16px 0 8px 0;
                            color: #333333;
                            font-size: 14px;
                            font-weight: bold;
                        }

                        :hover:not(h3) {
                            color: #0070CE;
                        }

                    }
                    .Twoitem {
                        position: absolute;
                        top: 56px;
                        left: 0;
                        width: 126px;
                    }

                    .Threeitem {
                        position: absolute;
                        top: 56px;
                        left: 0;
                        width: 277px;
                    }

                    .Fouritem {
                        text-align: left;
                        display: none;
                        z-index: 100;
                        width: 126px;
                        position: absolute;
                        top: 56px;
                        left: 0;
                        background: #fff;
                        line-height: 30px;
                        box-shadow: 0 0 5px #ccc;
                        padding: 10px 20px 10px;

                        a {
                            padding-left: 10px;
                            color: #666;
                            font-size: 14px;
                            font-family: "Microsoft YaHei";
                            cursor: pointer;

                        }

                        :hover {
                            color: #0070CE;
                        }

                    }
                    .Fiveitem {
                        width: 220px;
                        position: absolute;
                        top: 56px;
                        right: 0px;
                        box-shadow: 0 0 5px #ccc;
                    }

                    .Sixitem {
                        display: none;
                        z-index: 100;
                        width: 100px;
                        position: absolute;
                        top: 56px;
                        right: 0;
                        background: #fff;
                        line-height: 25px;
                        padding: 10px 0;
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
                    .none {
                        display: none;
                    }

                }
                >
                :hover {

                    a {
                        color: #fff;
                        font-weight: bold;
                    }

                    i {
                        font-size: 18px;
                        font-weight: bold;
                    }

                    cursor: pointer;
                    background: #0070CE;
                }
                .active {

                    a {
                        color: #FFFFFF;
                        font-weight: bold;
                    }

                    i {
                        color: #fff;
                        font-weight: bold;
                    }

                }
            }
        }
    }

</style>
