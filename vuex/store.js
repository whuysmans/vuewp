import Vue from 'vue'
import Vuex from 'vuex'

import posts from './modules/posts'

Vue.use( vuex )

export default new Vuex.store( { 
	modules: {
		posts
	}
} )