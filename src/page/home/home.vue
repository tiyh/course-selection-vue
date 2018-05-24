<template>
  	<div>
        <head-top signin-up='home'>
            <span slot='logo' class="head_logo"  @click="reload">CourseSelectionSystem</span>
        </head-top>
    </div>
</template>

<script>
import headTop from '../../components/header/head'

export default {
    data(){
        return{
        }
    },

	mounted(){
    },

    components:{
        headTop
    },

    methods:{
        //点击图标刷新页面
        reload(){
            window.location.reload();
        }
    },
}

</script>