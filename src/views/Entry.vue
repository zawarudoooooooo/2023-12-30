<script>
export default{
    data(){
        return{

        }
    },
    methods:{
        goQuestionPage(){
            this.$router.push('/FrontQuestion')
        },
        goFrontCaculate(){
            this.$router.push('/FrontCaculate')
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
                <p>開始時間 : </p>
                <input type="date">
                <p>到</p>
                <input type="date" id="inputdate">
                <button type="button">搜尋</button>            
            </div>
        </div>
<!-- 列表顯示 -->
        <table>
            <tr>
                <th>編號</th>
                <th>名稱</th>
                <th>狀態</th>
                <th>開始時間</th>
                <th>結束時間</th>
                <th>結果</th>
            </tr>
            <tr>
                <td></td>
                <td @click="goQuestionPage()">預設顯示頁面</td>
                <td></td>
                <td></td>
                <td></td>
                <td @click="goFrontCaculate()">預設統計頁面</td>
            </tr>
        </table>
    </div>
<!-- 分頁顯示 pagination -->
    <!-- <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item"><a class="page-link" href="#">6</a></li>
            <li class="page-item"><a class="page-link" href="#">7</a></li>
            <li class="page-item"><a class="page-link" href="#">8</a></li>
            <li class="page-item"><a class="page-link" href="#">9</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav> -->
</template>

<style lang="scss" scoped>
    .content{
        margin-top: 10vmin;

//標題模糊搜尋
        .searchArea{
            width: 70vw;
            height: 30vh;
            margin: auto;
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
    // .pagination{
        
    //     .page-link{
    //         background-color: transparent;
    //         color: dimgray;
    //         border: none;
    //         text-decoration: none;
    //         border-style: none;
    //         outline: none;
    //     }
    // }
</style>
