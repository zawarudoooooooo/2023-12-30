<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            goBackEntry(){
                this.$router.push('/BackEntry')
            }
        },
        components:{
        },
    }
</script>

<template>
    <div class="content">
<!-- 統計結果顯示區域 -->
        <div class="caculateShow">
<!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>統計結果</p>
            </div>
            <button type="button" @click="goBackEntry()">取消</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 100vw;
        display: flex;
        justify-content: center;
//統計結果顯示區域
        .caculateShow{
            margin-top: 7vmin;
//目前位置標示
            .location{
                width: 45vw;
                display: flex;
                color: dimgray;
                font-weight: bold;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 2vmin;

                i{
                    font-size: 12pt;
                }

                p{
                    font-size: 18pt;
                    margin: 0;
                }
            }
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
</style>