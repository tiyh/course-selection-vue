<template>
    <div>
        <head-top signin-up='profile'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>

        <p class="chooseInfo" v-if="course">
            course.id:{{course.id}}
            orderedNum:{{course.orderedNum}}
            capacity:{{course.capacity}}
        </p>
        <p class="chooseCourse" v-if="course!=null && course.orderedNum < course.capacity" @click="tryChooseCourse()">
            chooseCourse
        </p>
        <p class="chooseResult"v-if="showResult">
            chooseResult:{{chooseResult}}
        </p>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState, mapActions} from 'vuex'
import {getCourseById,chooseCourse} from '../../service/getData'
export default {
    data(){
        return{
            showResult :false,
            course:null,
            chooseResult:false
        }
    },

    mounted(){
        this.initData();
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
            'getUserInfo',
        ]),
        async initData(){
            this.getUserInfo();
            this.course= await getCourseById(this.$route.params.courseId);
        },
        async tryChooseCourse(){
            this.chooseResult= await chooseCourse(this.userInfo.id,this.course.id);
            if(this.chooseResult) this.course.orderedNum++;
            this.showResult=true;
        }
    },
}

</script>