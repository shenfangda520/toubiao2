<!--后台管理-业务数据管理-->
<template>
    <div class="businessmanagement">
        <!---->
        <div style="float:left;width:200px;height:calc(100% - 64px);overflow-x: hidden;overflow-y: auto">
            <business-side-bar></business-side-bar>
        </div>
  		<!---->
   		<div style="float:left;width:calc(100% - 200px);height:calc(100% - 64px);overflow-x: hidden;">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import BusinessSideBar from '@/views/Management/Business/BusinessSideBar'
    export default {
        name: 'businessmanagement',
        data() {
            return {
      
            }
        },
        created(){
        	
        },
        mounted() {
        	
        },
        computed: {
            
        },
        methods: {
        },
        components:{BusinessSideBar}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.businessmanagement{
	width: 100%;
	height: 100%;
}
</style>
