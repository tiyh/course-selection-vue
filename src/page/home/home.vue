<template>
  	<div class="home_page">
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>
        <form class="search_form">
            <input type="search" name="search" placeholder="请输入课程名称" class="search_input" v-model="searchValue" @input="checkInput">
            <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">
        </form>


        <p class="courselist" v-if="courselist">
            <li v-for="item in courselist" @click="toCourseDetail(item)">
                {{ item.subject }}:
                    capacity:{{item.capacity}}  orderedNum:{{item.ordered}}
            </li>
        </p>
        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>

    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState, mapMutations} from 'vuex'
import {setStore, getStore} from '../../config/mUtils'
import {listCourses,searchCourse} from '../../service/getData'
export default {
    data(){
        return{
            courselist:null,
            emptyResult:false,
            searchValue:''
        }
    },
    computed: {
    },

	mounted(){
        //listCourses().then(res => {
        //    this.courselist = res;
        //})
    },

    components:{
        headTop
    },

    methods:{
        reload(){
            window.location.reload();
        },
        toCourseDetail(courseItem){
            //this.$router.push({ name: 'courseDetail', params: { courseItem: courseItem }})
            this.$router.push({ path: '/courseDetail/'+courseItem.id })
        },
        async searchTarget(value){
            if (!value) {
                this.searchValue = value;
            }else{
                return ;
            }
            console.log("searchCourse searchValue:"+this.searchValue);
            searchCourse(this.searchValue).then(res => {
                if(res==null||res.length==0) this.emptyResult=true;
                this.courselist = res;
            })
        },
        checkInput(){
            if (this.searchValue === '') {
                this.courselist = [];
                this.emptyResult = false;
            } 
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
<style lang="scss" scoped>
    .home_page{
        padding-top: 2.95rem;
        margin-bottom: 2rem;
    }
    .search_form{
        background-color: #fff;
        padding: 0.5rem;
        display: flex;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            font-size: 0.65rem;
            color: #333;
            border-radius: 0.125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem;
        }
        .search_submit{
            flex: 1;
            margin-left: .2rem;
            font-size: 0.65rem;
            color: #fff;
            border-radius: 0.125rem;
            font-weight: bold;
            padding: 0 0.25rem;
        }
    }
    .search_none{
        margin: 0 auto;
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }
</style>