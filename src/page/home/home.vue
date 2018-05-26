<template>
  	<div>
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>
        <!--<p class="token" v-if="getToken()">token:{{getToken()}}</p>-->
        <p class="courselist" v-if="courselist">courselist:{{this.courselist}}</p>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState, mapMutations} from 'vuex'
import {setStore, getStore} from '../../config/mUtils'
export default {
    data(){
        return{
            studentInfo:null,
            courselist:null
        }
    },
    computed: {
    //...mapState([
    //           'userInfo',
    //        ]),
    },

	mounted(){
        this.listCourses();
    },

    components:{
        headTop
    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        },
        async getStudentById(){
            if(this.userInfo){
                let fetchresult = await fetch('/student/1',{
                    method:"GET",
                    mode:'cors',
                    headers: new Headers({
                    'Authorization':this.userInfo.token,
                    //'Content-Type':'multipart/form-data'//Could not parse multipart servlet request;
                    }),
                });
                this.studentInfo = await fetchresult.text();//.json();
                console.log("resultjson:"+studentInfo);
            }
        },
        async listCourses(){
            let fetchresult = await fetch('/courses',{
                    method:"GET",
                    mode:'no-cors',
                });
                this.courselist = await fetchresult.json();
                console.log("resultjson:"+this.courselist);
        },
        getToken(){
            return getStore("token");
        }
    },
}

</script>