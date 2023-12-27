<script>
import swal from 'sweetalert';
import { RouterLink, RouterView } from 'vue-router'
export default{
    data(){
        return{

        }
    },
    methods:{
        goFrontEntry(){
          this.$router.push('/')
        },
        goLogin(){
          this.$router.push('/Login')
        },
        login(){
            swal("權限不足", "請先登錄", "error");
            this.goLogin();
        },
    }
}
</script>

<template>
  <div class="userChange">
    <i class="fa-solid fa-users-gear" @click="login()"></i>
    <i class="fa-solid fa-share" id="frontIcon" @click="goFrontEntry()"></i>
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
    .userChange{
      width: 100vw;
      height: 2vh;
      color: #9D9D9D;
      font-size: 26pt;
      position: relative;

      i{
        position: absolute;
        right: 6%;
        margin-top: 3vmin;

        &:hover{
          color: lightslategray;
        }

        &:active{
          color: #9D9D9D;
        }
      }

      #frontIcon{
        position: absolute;
        right: 2%;

        &:hover{
          color: lightslategray;
        }

        &:active{
          color: #9D9D9D;
        }
      }
    }
</style>
