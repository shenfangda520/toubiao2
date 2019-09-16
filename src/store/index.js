/**
 * Created by 96400 on 2017/7/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// import movie from './modules/movie'
// import activities from './modules/activities'
// import book from './modules/book'
// import subject from './modules/subject'
// import group from './modules/group'
// import search from './modules/search'
// import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
	state : {
		userData : false,
		//责任主体
        responsibility : false,
		//超级管理员
        Superadministrator : false,
		//普通人员
        OrdinaryUser : false,
        //全局右侧面板菜单
        menuData : [],
		//全局token
        token:'',
        userId:''
	},
	actions : {
		
	},
	mutations : {
		setUserData(state,msg){
			state.userData = msg
		}
	},
    modules: {
        // movie,
        // activities,
        // book,
        // subject,
        // group,
        // search,
        // user
    }
})
