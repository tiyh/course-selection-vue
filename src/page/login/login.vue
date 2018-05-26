<template>
    <div class="loginContainer">
        <head-top :head-title="'密码登录'" goBack="true">
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="text" placeholder="账号" v-model.lazy="userAccount">
            </section>
            <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
                <input v-else type="text" placeholder="密码"  v-model="passWord">
                <div class="button_switch" :class="{change_to_text: showPassword}">
                    <div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg">
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </form>
        <p class="login_tips">
            温馨提示：
        </p>
        <div class="login_container" @click="userLogin">登录</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import alertTip from '../../components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {setStore} from '../../config/mUtils'

    export default {
        data(){
            return {
                showPassword: false, // 是否显示密码
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){
            this.getCaptchaCode();
        },
        components: {
            headTop,
            alertTip,
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //是否显示密码
            changePassWordType(){
                this.showPassword = !this.showPassword;
            },
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                //todo
            },
            //发送登录信息
            async userLogin(){
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入用户名';
                    return
                }else if(!this.passWord){
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return
                }else if(!this.codeNumber){
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return
                }
                //用户名登录
                console.log("开始请求。。。");

                let formdata = new FormData();
                formdata.append("username",this.userAccount);
                formdata.append("password",this.passWord);

                let fetchresult = await fetch('/login',{
                    method:"POST",
                    mode:'no-cors',
                    //headers: new Headers({
                    //'Authorization':sessionStorage.getItem("token");
                    //'Content-Type':'multipart/form-data'//Could not parse multipart servlet request;
                    //}),
                    body:formdata
                });
                let token = await fetchresult.json();
                console.log("token:"+token);
                var loginInfo = new Object();
                loginInfo.token = token;
                loginInfo.username = this.userAccount;
                this.RECORD_USERINFO(loginInfo);
                setStore('token', token);
                this.$router.go(-1);
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }

</script>