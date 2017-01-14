import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(Vuex)

const state = {
  currentPage: 1,
  currentSingle: 0,
  totalPosts: 0,
  searchResults: [],
  currentPost: {}
}

const mutations = {
  next: state => state.currentPage++,
  prev: state => state.currentPage--,
  nextPost: state => state.currentSingle++,
  prevPost: state => state.currentSingle--,
  setTotal: (state, amount) => state.totalPosts = amount,
  setSearchResults: (state, result) => state.searchResults = result,
  setCurrentPost: (state, post) => state.currentPost = post,
  resetCurrentPage: state => state.currentPage = 1
}

const store = new Vuex.Store({
  state,
  mutations
})

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
import TagPage from './components/TagPage'
import Tag from './components/Tag'
import AuthorPage from './components/AuthorPage'
import Menu from './components/Menu'
import SearchWidget from './components/SearchWidget'
import Aside from './components/Aside'
import SearchPage from './components/SearchPage'
import CustomPage from './components/CustomPage'
import CategoryWidget from './components/CategoryWidget'
import SinglePost from './components/SinglePost'
import NotFound from './components/NotFound'
import SvgIcons from './components/SvgIcons'
import Author from './components/Author'
import PageHeader from './components/PageHeader'
import VueVisual from 'vue-visual'
require('./assets/css/style.css')
require('vue-visual/index.css')

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
Vue.component('TagPage', TagPage)
Vue.component('Tag', Tag)
Vue.component('AuthorPage', AuthorPage)
Vue.component('Menu', Menu)
Vue.component('SearchWidget', SearchWidget)
Vue.component('Aside', Aside)
Vue.component('SearchPage', SearchPage)
Vue.component('CustomPage', CustomPage)
Vue.component('CategoryWidget', CategoryWidget)
Vue.component('SinglePost', SinglePost)
Vue.component('NotFound', NotFound)
Vue.component('SvgIcons', SvgIcons)
Vue.component('Author', Author)
Vue.component('PageHeader', PageHeader)
Vue.component('vuevisual', VueVisual)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'home',
    children: [
      {
        path: '',
        component: Posts,
        name: 'post'
      },
      {
        path: '/posts/:slug',
        component: SinglePost,
        name: 'single'
      },
      {
        path: '/categories/:slug',
        component: CategoryPage,
        name: 'term'
      },
      {
        path: '/tags/:slug',
        component: TagPage,
        name: 'term'
      },
      {
        path: '/pages/:slug',
        component: Page,
        name: 'single'
      },
      {
        path: '/author/:slug',
        component: AuthorPage,
        name: 'author'
      },
      {
        path: '/search',
        component: SearchPage,
        name: 'search'
      },
      {
        path: '/:custom/:slug?',
        component: CustomPage,
        name: 'custom'
      },
      {
        path: '*',
        // redirect: '/'
        component: NotFound
      }
    ]
  }
]

const coords = () => {
  let rect = document.querySelector('#menu').getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  return {
    x: rect.left + scrollLeft,
    y: rect.top + scrollTop
  }
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    return { x: coords().x, y: coords().y }
  },
  routes
})

export const bus = new Vue()

const app = new Vue({
  store,
  router
}).$mount('#app')

