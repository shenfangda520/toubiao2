<template>
    <div class="foghazeforecast">
        <!--雾霾预报-->
        <v-header></v-header>
        <!---->
        <img :src="ImgSrc" />
    </div>
</template>

<script>
	import api from '../../api/index'
    export default {
        name: 'foghazeforecast',
        data() {
            return {
                fullscreenLoading: false,
                ImgSrc:''
            }
        },
        mounted() {
            this.openFullScreen();
			this.Getsmog();
        },
        methods: {
            //加载动画
            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                }, 2000);
            },
            Getsmog(){
            	api.Getsmog().then(res=>{
            		let url = res.data.Data;
            		this.ImgSrc = api.GetForestImg()+url;
            	})
            },
        },
        components: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .foghazeforecast {
        width: 100%;
        height: 100%;
        img{
        	width: 686px;
        	height: 500px;
        	margin-top: 40px;
        }
    }
</style>
