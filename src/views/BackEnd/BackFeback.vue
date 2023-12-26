<script>
    export default{
        data(){
            return{

            }
        },
        components:{
        },
        methods:{
            goAnswerFebackPage(){
                this.$router.push('BackAnswerFeback')
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
                    <td @click="goAnswerFebackPage()">前往</td>
                </tr>
            </table>
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
    }
</style>