<template>
    <!--底部统计一览-->
    <div>
        <li v-for="(item,index) in BottomStatistics" :key="index">
            <div v-if="JSON.stringify(item) !== '{}'">
                <div class="l-001">
                    <div class="ll1"><a class="text">优:</a> <span :style="ChangeBackground(item.y_count)">{{item.y_count}}</span></div>
                    <div class="ll1"><a class="text">良:</a> <span :style="ChangeBackground(item.l_count)">{{item.l_count}}</span></div>
                    <div class="ll1"><a class="text">轻度:</a> <span :style="ChangeBackground(item.qd_count)">{{item.qd_count}}</span></div>
                </div>
                <div class="l-001">
                    <div class="ll1"><a class="text">中度:</a> <span :style="ChangeBackground(item.zd_count)">{{item.zd_count}}</span></div>
                    <div class="ll1"><a class="text">重度:</a> <span :style="ChangeBackground(item.yz_count)">{{item.yz_count}}</span></div>
                    <div class="ll1"><a class="text">严重:</a> <span :style="ChangeBackground(item.zhd_count)">{{item.zhd_count}}</span></div>
                </div>
            </div>
        </li>
    </div>

</template>

<script>
    export default {
        name: "bottomstic",
        props:{
            BottomStatistics:{
                type:Array,
                default:[]
            },
        },
        mounted(){
            console.log('来了老弟!')
            console.log(this.BottomStatistics);
        },
        methods:{
            //背景颜色
            ChangeBackground(val){
                let rtbgcolor = '';
                switch (val){
                    case 0:
                        rtbgcolor= 'background:#C71585;color:#fff';
                        break;
                    case 1:
                        rtbgcolor= 'background:#4169E1;color:#fff';
                        break;
                    case 2:
                        rtbgcolor= 'background:#2F4F4F;color:#fff';
                        break;
                    case 3:
                        rtbgcolor= 'background:#7CFC00;color:#666';
                        break;
                    case 4:
                        rtbgcolor= 'background:#FFFF00;color:#666';
                        break;
                    case 5:
                        rtbgcolor= 'background:#FF8C00;color:#fff';
                        break;
                    case 6:
                        rtbgcolor= 'background:#2F4F4F;color:#fff';
                        break;
                    case 7:
                        rtbgcolor= 'background:#7CFC00;color:#666';
                        break;
                    case 8:
                        rtbgcolor= 'background:#FFFF00;color:#666';
                        break;
                    case 9:
                        rtbgcolor= 'background:#FF8C00;color:#fff';
                        break;
                    default:
                        rtbgcolor = 'background:#eee;color:#fff';
                        break;
                }
                return rtbgcolor;
            },
        }
    }
</script>

<style scoped>

</style>