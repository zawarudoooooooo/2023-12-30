<script>
    export default{
        data(){
            return{

            }
        },
        components:{
        },
        methods:{
            goAnswerFeback(){
                this.$router.push('BackAnswerFeback')
            },
            goBackEntry(){
                this.$router.push('/BackEntry')
            }
        }
    }
</script>

<template>
    <div class="content">
<!-- 問卷回饋區域 -->
        <div class="febackList">
<!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>問卷回饋</p>
            </div>
<!-- 列表回饋顯示區 -->
            <table>
                <tr>
                    <th>編號</th>
                    <th>姓名</th>
                    <th>填寫時間</th>
                    <th>觀看回覆</th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td @click="goAnswerFeback()">前往</td>
                </tr>
            </table>
            <button type="button" @click="goBackEntry()">取消</button>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 100vw;
        display: flex;
        justify-content: center;
//問卷回饋區域
        .febackList{
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
//問卷回饋顯示區
            table{
                width: 45vw;
                margin-top: 3vmin;
                text-align: center;
            
                tr{
                    th{
                        color: dimgray;
                        border: 2px solid #9D9D9D;
                    }

                    td{
                            color: dimgray;
                            border: 2px solid #9D9D9D;
                    }
                }
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
</style>