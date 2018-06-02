<template>
  	<div>
        <head-top signin-up='profile'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>
        <p class="studentInfo" v-if="studentInfo">
                id:{{ studentInfo.id }}
                   username:{{studentInfo.username}} department:{{studentInfo.department}}
        </p>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState, mapMutations} from 'vuex'
import {setStore, getStore} from '../../config/mUtils'
import {getStudentById} from '../../service/getData'
export default {
    data(){
        return{
            studentInfo:null,
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

    components:{
        headTop
    },

    methods:{
        reload(){
            window.location.reload();
        },
    },
}

</script>