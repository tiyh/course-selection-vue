import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const register = r => require.ensure([], () => r(require('../page/register/register')), 'register')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const courseDetail = r => require.ensure([], () => r(require('../page/courseDetail/courseDetail')), 'courseDetail')




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/register',
            component: register
        },
        {
            path: '/profile',
            component: profile
        },
        {
            name: 'courseDetail',
            path: '/courseDetail/:courseId',
            component: courseDetail
        },
    ]
}]
