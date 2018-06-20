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
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import {mapState, mapActions} from 'vuex'
import {getCourseById,chooseCourse} from '../../service/getData'
export default {
    data(){
        return{
            course:null,
            chooseResult:false,
            showAlert: false,
            alertText: null
        }
    },

    mounted(){
        this.initData();
    },

    components:{
        headTop,
        alertTip
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
            if (this.chooseResult) {
                this.course.orderedNum++;
                this.showAlert = true;
                this.alertText = 'choose success';
            }else{
                this.showAlert = true;
                this.alertText = 'choose fail';
            }
        },
        closeTip(){
            this.showAlert = false;
        }
    },
}

</script>