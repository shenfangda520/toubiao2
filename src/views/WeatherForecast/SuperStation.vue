<template>
    <div class="superstation">
        <!--超级站-->
        <v-header></v-header>
        <iframe
                frameborder="0"
                width="100%"
                height="100%"
                :src="SuperStationUrl"
                scrolling="no"
        >
        </iframe>
    </div>
</template>

<script>
    //import api from '../../api/index'
    export default {
        name: 'superstation',
        data() {
            return {
                //
                SuperStationUrl: 'http://222.222.116.203:8090/new/module/superpoint_new.php',
                //
                fullscreenLoading: false
            }
        },
        mounted() {

        },
        methods: {
            //加载动画
            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                }, 4000);
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .superstation {
        width: 100%;
        height: calc(100% - 64px);
        position: relative;
        .dingwei {
            position: absolute;
            right: 30px;
            bottom: -48px;
        }
        .gfbg-tables{
            .page{
                .demonstration{
                    float: left;
                }
            }
        }
    }
</style>
