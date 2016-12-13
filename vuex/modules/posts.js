import { RECEIVE_ALL_POSTS } from '../mutations'

const state = {
	all: []
}

const mutations = {
	[RECEIVE_ALL_POSTS] (state, posts) {
		state.all = posts
	}
}

export default {
	state,
	mutations
}