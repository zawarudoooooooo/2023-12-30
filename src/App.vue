<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
    data(){
        return{

        }
    },
    methods:{
        goBackEntry(){
            this.$router.push('BackEntry')
        },
        goFrontEntry(){
          this.$router.push('/')
        }
    }
}
</script>

<template>
  <div class="userChange">
    <i class="fa-solid fa-users-gear" @click="goBackEntry()"></i>
    <i class="fa-solid fa-share" id="frontIcon" @click="goFrontEntry()"></i>
  </div>
      
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
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
