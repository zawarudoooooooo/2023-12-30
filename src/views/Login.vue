<script>
import axios from 'axios';
import swal from 'sweetalert';
    export default{
        data(){
            return{

            }
        },
        methods:{
            login(){
                axios({
                    url:'http://localhost:8080/api/login',
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    data:{
                        account : "",
                        password:"",
                    },
                }).then(res=>console.log(res))
                swal("登錄成功", "歡迎回來", "success");
                this.goBackEntry();
            },
            goBackEntry(){
                this.$router.push('/BackEntry')

            },

        },
        components:{
        },
    }
</script>

<template>
    <div class="content">
        <div class="login">
<!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>後台登錄</p>
            </div>
            <div class="account">
                <p>帳號</p>
                <input type="text" placeholder="請輸入帳號"> 
            </div>
            <div class="password">
                <p>密碼</p>
                <input type="password" placeholder="請輸入密碼"> 
            </div>
            <div class="buttonArea">
                <button type="button">取消</button>
                <button type="button" @click="login()">登錄</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 100vw;
        display: flex;
        justify-content: center;
        .login{
            margin-top: 7vmin;
            .location{
                width: 45vw;
                display: flex;
                color: dimgray;
                font-weight: bold;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 5vmin;

                i{
                    font-size: 12pt;
                }

                p{
                    font-size: 18pt;
                    margin: 0;
                }
            }
            .account{
                display: flex;
                margin-bottom: 2vmin;
                align-items: center;
                margin-left: 2vmin;
            }
            .password{
                display: flex;
                margin-bottom: 2vmin;
                align-items: center;
                margin-left: 2vmin;
            }

            input{
                width: 40vw;
                height: 5vh;
                outline: none;
                margin-left: 1vmin;
                border-radius: 10px;
                padding-left: 1vmin;
                border: 2px solid #9D9D9D;
                margin-bottom: 2vmin;
            }
            .buttonArea{
                width: 45vw;
                margin-top: 5vmin;
                justify-content: space-around;
                align-items: center;
                display: flex;

                button{
                    width: 9vw;
                    height: 4vh;
                    color: dimgray;
                    //margin-left: 2vmin;
                    border-style: none;
                    border-radius: 5px;
                    background-color: #F8F0DF;
                    box-shadow: 1px 1px 1px lightgray;
                    &:hover{
                        color: #F8F0DF;
                        background-color: #9D9D9D;
                    }
                    &:active{
                        color: dimgray;
                        background-color: #F8F0DF;
                    }
                }
            }
        }
    }
</style>
