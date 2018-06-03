<template>
  	<div>
        <head-top signin-up='profile'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>
        <p class="userInfo" v-if="userInfo">
                id:{{ userInfo.id }}
                   username:{{userInfo.username}} department:{{userInfo.department}}
        </p>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState, mapActions} from 'vuex'
import {setStore, getStore} from '../../config/mUtils'
export default {
    data(){
        return{
        }
    },

	mounted(){
        this.getUserInfo();
    },

    components:{
        headTop
    },
    computed: {
        ...mapState([
            'userInfo'
        ]),
    },

    methods:{
        reload(){
            window.location.reload();
        },
        ...mapActions([
            'getUserInfo'
        ]),
    },
}

</script>