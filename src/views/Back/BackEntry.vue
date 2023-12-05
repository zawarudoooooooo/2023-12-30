<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        addQuestionnaire(){
            this.$router.push('BackAdd')
        }
    }
}
</script>

<template>
    <div class="content">
<!-- 標題模糊搜尋 -->
        <div class="searchArea">
<!-- 問卷名稱 -->
            <div class="questionnaire">
                <p>問卷名稱 : </p>
                <input type="text">
            </div>
<!-- 開始/結束時間 -->
            <div class="time">
                <p>統計時間 : </p>
                <input type="date">
                <p>到</p>
                <input type="date" id="inputdate">
                <button type="button">搜尋</button>            
            </div>
        </div>
<!-- icon區域 -->
        <div class="iconArea">
            <i class="fa-solid fa-trash-can"></i>
            <i class="fa-solid fa-plus" @click="addQuestionnaire()"></i>
        </div>
<!-- 列表顯示 -->
        <table>
            <tr>
                <th></th>
                <th>編號</th>
                <th>名稱</th>
                <th>狀態</th>
                <th>開始時間</th>
                <th>結束時間</th>
                <th>結果</th>
            </tr>
            <tr>
                <td><input type="checkbox" name="" id=""></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        margin-top: 10vmin;
//標題模糊搜尋
        .searchArea{
            width: 70vw;
            height: 30vh;
            margin: auto;
            margin-bottom: 3vmin;
            border-radius: 10px;
            border: 2px solid #9D9D9D;
            box-shadow: 1px 1px 1px lightgray;

            p{
                color: dimgray;
            }
//問卷名稱
            .questionnaire{
                width: 70vw;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 5vmin;
                margin-bottom: 3vmin;
                
                input{
                    width: 40vw;
                    height: 4.5vh;
                    outline: none;
                    margin-left: 1vmin;
                    border-radius: 10px;
                    padding-left: 1vmin;
                    border: 2px solid #9D9D9D;
                    margin-bottom: 2vmin;
                }
            }
//開始 結束時間
            .time{
                width: 70vw;
                display: flex;
                align-items: center;
                justify-content: center;

                input{
                    width: 15vw;
                    height: 4.5vh;
                    outline: none;
                    margin-left: 1vmin;
                    margin-right: 2vmin;
                    border-radius: 10px;
                    padding-left: 1vmin;
                    border: 2px solid #9D9D9D;
                    margin-bottom: 2vmin;
                }

                #inputdate{
                    width: 15vw;
                    height: 4.5vh;
                    outline: none;
                    margin-left: 2vmin;
                    margin-right: 2vmin;
                    border-radius: 10px;
                    padding-left: 1vmin;
                    border: 2px solid #9D9D9D;
                    margin-bottom: 2vmin;
                }

                button{
                    width: 5vw;
                    height: 4vh;
                    color: dimgray;
                    margin-left: 2vmin;
                    border-style: none;
                    border-radius: 5px;
                    background-color: #F8F0DF;
                    box-shadow: 1px 1px 1px lightgray;
                    margin-bottom: 2vmin;

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
//icon區域
        .iconArea{
            margin-left: 30vmin;

            i{
                color: #9D9D9D;
                font-size: 24pt;;
                margin-left: 4vmin;

                &:hover{
                    color: lightslategray;
                }

                &:active{
                    color: #9D9D9D;
                }
            }
        }
//列表顯示
        table{
            width: 70vw;
            margin: auto;
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
</style>