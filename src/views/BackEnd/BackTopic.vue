<script>
import BackNav from '../../components/BackNav.vue';
    export default{
        data(){
            return{
                //questionArr:[],
                questionType:["radio","checkbox","text"],
                hwquestionList:[],
                necessary:"",
                options:[],
                questionText:"",
                questionArr:JSON.parse(localStorage.getItem("this.questionArr")) || [],
            }
        },
        methods:{
            addQuestion(){
                const newQuestion={
                    questionType:"",
                    questionText:"",
                    optionText:"",
                    necessary:"",

                    question:[],
                    options:[],
                }
                this.questionArr.push(newQuestion);
                this.hwquestionList.push(newQuestion);
                console.log(newQuestion)
            },
            goAddPage(){
                this.$router.push('/BackAdd')
            },
            goQuestiionCheck(){
                this.$router.push('/BackQuestionCheck')
            }
        },
        components:{
            BackNav
        },
    }
</script>

<template>
    <div class="content">
<!-- 導覽與頁籤 -->
        <div class="backNavArea">
            <BackNav />
        </div>

<!-- 新增問卷內頁 -->
        <div class="addQuestionnaire">
<!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>新增題目</p>
            </div>
<!-- 新增問卷名稱 -->
            <div class="topicName">
                <p>問題 : </p>
                <input type="text">
<!-- 新增問卷回答類型 -->
                <div class="answerType">
                    <select name="" id="">
                        <option>單選題</option>
                        <option>複選題</option>
                        <option>簡答題</option>
                    </select>
                    <input type="checkbox" id="checkinput">
                    <label for="">必填</label>
                </div>
            </div>
<!-- 新增問卷回答選項 -->
            <div class="topicAnswer">
                <div class="notify">
                    <p>選項 : </p>
                    <p id="notifyText">(多個答案請以；分隔)</p>
                </div>
                <div class="submitArea">
                    <textarea></textarea>
                    <button type="button" @click="addQuestion">加入</button>
                </div>
            </div>

<!-- 刪除ICON -->
            <div class="deleteIcon">
                <i class="fa-solid fa-trash-can"></i>
            </div>

<!-- 問卷列表顯示區 -->
            <table>
                <tr>
                    <th></th>
                    <th>編號</th>
                    <th>問題</th>
                    <th>問題種類</th>
                    <th>必填</th>
                    <th>編輯</th>
                </tr>
                <tr>
                    <td><input type="checkbox" name="" id="tableinput"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><input type="checkbox" name="" id=""></td>
                    <td></td>
                </tr>
            </table>

<!-- 按鍵區域 -->
            <div class="topicButtonArea">
                <button type="button" @click="goAddPage()">上一步</button>
                <button type="button" @click="goQuestiionCheck()">送出</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .content{
        display: flex;
        margin-top: 10vmin;
//導覽與頁籤
        .backNavArea{
            margin-left: 40vmin;
            margin-top: 15vmin;
        }
//新增問卷內頁
        .addQuestionnaire{
            width: 50vw;
            height: 70vh;
            margin: auto;
            margin-top: 7vmin;

            p{
                color: dimgray;
            }
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
//新增問卷名稱
            .topicName{
                width: 55vw;
                display: flex;
                align-items: center;
                margin-bottom: 2vmin;

                input{
                    width: 28vw;
                    height: 4.5vh;
                    outline: none;
                    margin-left: 1vmin;
                    border-radius: 10px;
                    padding-left: 1vmin;
                    border: 2px solid #9D9D9D;
                    margin-bottom: 2vmin;
                }
//新增問卷回答類型
                .answerType{
                display: flex;
                align-items: center;
                margin-bottom: 2vmin;
                margin-left: 4vmin;

                    select{
                    width: 6vw;
                    border-radius: 5px;
                    color: dimgray;
                    outline: none;
                    margin-right: 2vmin;

                        option{
                            color: dimgray;
                            text-align: center;
                        }
                    } 

                    #checkinput{
                    width: 2.5vw;
                    height: 2vh;
                    margin: 0;
                    }

                    label{
                    color: dimgray;
                    }
                }
            }
//新增問卷回答選項
            .topicAnswer{
                margin-bottom: 3vmin;
                .notify{
                    display: flex;

                    #notifyText{
                        font-weight: bold;
                        margin-left: 2vmin;
                    }
                }
                .submitArea{
                    display: flex;
                    align-items: center;
                        
                    textarea{
                        width: 28vw;
                        height: 15vh;
                        outline: none;
                        margin-left: 6.5vmin;
                        border-radius: 10px;
                        padding-left: 1vmin;
                        border: 2px solid #9D9D9D;
                    }

                    button{
                        width: 5vw;
                        height: 4vh;
                        color: dimgray;
                        margin-left: 4vmin;
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
//刪除ICON
            .deleteIcon{

                i{
                color: #9D9D9D;
                font-size: 20pt;;
                margin-left: 1vmin;

                &:hover{
                    color: lightslategray;
                }

                &:active{
                    color: #9D9D9D;
                }
                }
            }
//問卷列表顯示區
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
//按鍵區域
            .topicButtonArea{
            width: 45vw;
            margin-top: 5vmin;
            text-align: center;

                button{
                width: 5vw;
                height: 4vh;
                color: dimgray;
                margin-left: 2vmin;
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