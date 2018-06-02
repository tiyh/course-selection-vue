<template>
    <header id='head_top'>
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="studentInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="studentInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录 |</span>
        </router-link>
        <router-link :to="'/register'" v-if='signinUp' class="head_register">
            <svg class="user_avatar" v-if="studentInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="register_span" v-else>注册</span>
        </router-link>
    </header>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {setStore, getStore} from '../../config/mUtils'
    import {getStudentById} from '../../service/getData'
    export default {
    	data(){
            return{
                studentInfo:null
            }
        },
        mounted(){
            getStudentById(getStore("user_id")).then(res => {
                if(res&&(!res.status))
                    {
                        this.studentInfo =res;
                        console.log("getStudentById resultjson:"+this.studentInfo);
                }
            })
        },
        
        props: ['signinUp', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },

    }

</script>