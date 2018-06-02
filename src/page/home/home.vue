<template>
  	<div>
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>
        <!--<p class="courselist" v-if="courselist">courselist:{{this.courselist}}</p>-->
        <p class="courselist" v-if="courselist">
            <li v-for="item in courselist">
                {{ item.name }}:
                    capacity:{{item.capacity}}  orderedNum:{{item.orderedNum}}
            </li>
        </p>

    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState, mapMutations} from 'vuex'
import {setStore, getStore} from '../../config/mUtils'
import {listCourses} from '../../service/getData'
export default {
    data(){
        return{
            courselist:null
        }
    },
    computed: {
    },

	mounted(){
        listCourses().then(res => {
            this.courselist = res;
        })
    },

    components:{
        headTop
    },

    methods:{
        reload(){
            window.location.reload();
        },
        /*async getStudentById(id){
            console.log("getStudentById user_id:"+id);
            if(id){
                let fetchresult = await fetch('/student/'+id,{
                    method:"GET",
                    mode:'cors',
                    headers: new Headers({
                    'Authorization':"Bearer "+
                    getStore("token"),
                    //'Content-Type':'multipart/form-data'//Could not parse multipart servlet request;
                    }),
                });
                let student = await fetchresult.json();
                if(student&&(!student.status))
                {
                    this.studentInfo =student;
                    console.log("getStudentById resultjson:"+this.studentInfo);
                }
            }
        },
        async listCourses(){
            let fetchresult = await fetch('/courses',{
                    method:"GET",
                    mode:'no-cors',
                });
                this.courselist = await fetchresult.json();
                console.log("listCourses resultjson:"+JSON.stringify(this.courselist));
        }*/
    },
}

</script>