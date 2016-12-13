import Vue from 'vue'
import Vuex from 'vuex'
//import App from './App'


import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store( {
  state: {
    currentPage: 1,
    currentSingle: 0,
    totalPosts: 0,
    searchResults: []
  },

  mutations: {
    next: state => state.currentPage++,
    prev: state => state.currentPage--,
    nextPost: state => state.currentSingle++,
    prevPost: state => state.currentSingle--,
    setTotal: ( state, amount ) => state.totalPosts = amount,
    setSearchResults: ( state, result ) => state.searchResults = result
  }
} )


import Posts from './components/Posts'
import Post from './components/Post'
import Footer from './components/Footer'
import Category from './components/Category'
import CImage from './components/CImage'
import Header from './components/Header'
import Page from './components/Page'
import Home from './components/Home'
import SiteFooter from './components/SiteFooter'
import CategoryPage from './components/CategoryPage'
import Pagination from './components/Pagination'
import SinglePagination from './components/SinglePagination'
import TagPage from './components/TagPage'
import Tag from './components/Tag'
import AuthorPage from './components/AuthorPage'
import Menu from './components/Menu'
import SearchWidget from './components/SearchWidget'
import Aside from './components/Aside'
import SearchPage from './components/SearchPage'
import SEO from './components/SEO'
import CustomPage from './components/CustomPage'

Vue.component('Post', Post)
Vue.component('Posts', Posts)
Vue.component('Footer', Footer)
Vue.component('Category', Category)
Vue.component('CImage', CImage)
Vue.component('Header', Header)
Vue.component('Page', Page)
Vue.component('Home', Home)
Vue.component('SiteFooter', SiteFooter)
Vue.component('CategoryPage', CategoryPage)
Vue.component('Pagination', Pagination)
Vue.component('SinglePagination', SinglePagination)
Vue.component('TagPage', TagPage)
Vue.component('Tag', Tag)
Vue.component('AuthorPage', AuthorPage)
Vue.component('Menu', Menu)
Vue.component('SearchWidget', SearchWidget)
Vue.component('Aside', Aside)
Vue.component('SearchPage', SearchPage)
Vue.component('SEO', SEO)
Vue.component('CustomPage', CustomPage)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    children: [
      {
        path: '', 
        component: Posts
      },
      {
        path: '/posts/:slug',
        component: Post
      },
      {
        path: '/categories/:slug',
        component: CategoryPage 
      },
      {
        path: '/tags/:slug',
        component: TagPage
      },
      {
        path: '/pages/:slug',
        component: Page
      },
      {
        path: '/author/:id',
        component: AuthorPage
      },
      {
        path: '/search',
        component: SearchPage
      },
      {
        path: '/:custom/:slug?',
        component: CustomPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
	routes
})

const app = new Vue({
  store,
	router
}).$mount('#app')

const head = new Vue({
  template: '<div v-transfer-dom:seo>foo</div>',

})


