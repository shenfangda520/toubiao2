<template>
    <div class="YBweather">
        <!--城市天气预报-->
        <v-header></v-header>
        <iframe frameborder="0" width="100%" height="100%" :src="WeatherForecastUrl"></iframe>
    </div>
</template>

<script>
    export default {
        name: 'YBweather',
        data() {
            return {
                WeatherForecastUrl:'http://www.nmc.cn/publish/forecast/AHE/langfang.html'
               }
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .YBweather {
        width: 100%;
        height: calc(100% - 64px);
    }
</style>
