<script>
import axios from 'axios';
    export default{
        data(){
            return{
            //quiz
                name:"",
                description:"",
                start_date:"",
                end_date:"",
                quizArr:JSON.parse(localStorage.getItem("this.quizArr")) || [],
                quizPage:true,

            //question
                questionTitle:"",
                questionType:"",
                necessary:false,
                questionAnswer:[],
                questionArr: JSON.parse(localStorage.getItem("this.questionArr")) || [],
                // questionPage:false,

            //check
                checkPage:false,

            //nav
                navShow:true,

                addQuestionPage:false,

                key:"",
                deleIndex:null,
            }
        },
        methods:{
//新增quiz(問卷標題)
            addQuiz(){
            //檢查欄位是否為空白
                if(this.name==""||this.description==""||this.start_date==""||this.end_date==""){
                    alert("欄位不得為空，請再次檢查")
                    return;
                }
            //檢查時間
                const startDateTime = new Date(this.start_date);
                const endDateTime = new Date(this.end_date);
                if(startDateTime>=endDateTime){
                    alert("開始時間不得晚於或等於結束時間")
                    return;
                }
                this.addQuestionPage=true;
            },
//新增question(問卷選項)
            addQuestion(){
            //檢查欄位是否為空白
                if(this.questionTitle==""||this.questionAnswer==""){
                    alert("欄位不得為空，請再次檢查")
                    return;
                }

                let questionObj = {
                    title : this.questionTitle,
                    type : this.questionType,
                    is_necessary : this.necessary,
                    option : this.questionAnswer,
                }

                this.questionArr.push(questionObj);
                console.log(questionObj);
                localStorage.setItem("questionArr", JSON.stringify((this.questionArr)));

                alert("新增成功")
                this.questionTitle="";
                this.questionAnswer="";
                this.questionPage=false;
                console.log(this.questionArr);

            },
//儲存問卷未發布
            saveAndUnpublished(){
                this.addQuiz();

                let quizObj = {
                    name : this.name,
                    description : this.description,
                    start_date : this.start_date,
                    end_date : this.end_date,
                    questions : this.questionArr,
                    is_published: 0,
                }

                this.quizArr.push(quizObj);
                console.log(quizObj);
                localStorage.setItem("quizArr", JSON.stringify((this.quizArr)));

                this.addQuestionPage=true;

                axios({
                    url:'http://localhost:8080/quiz/create',
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    data:{
                        name : this.name,
                        description : this.description,
                        start_date : this.start_date,
                        end_date : this.end_date,
                        questions : this.questionArr,
                        is_published: 0,
                    },
                }).then(res=>console.log(res))
                alert("新增問卷完成，狀態為未發布")
                this.name="",
                this.description="",
                this.start_date="",
                this.end_date="",
                this.addQuestionPage=false
                //this.goBackEntryPage();
            },
//儲存問卷已發布
            saveAndPublished(){
                this.addQuiz();

                let quizObj = {
                    name : this.name,
                    description : this.description,
                    start_date : this.start_date,
                    end_date : this.end_date,
                    questions : this.questionAnswer,
                    is_published: 1,
                }

                this.quizArr.push(quizObj);
                console.log(quizObj);
                localStorage.setItem("quizArr", JSON.stringify((this.quizArr)));

                this.addQuestionPage=true;

                axios({
                    url:'http://localhost:8080/quiz/create',
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    data:{
                        name : this.name,
                        description : this.description,
                        start_date : this.start_date,
                        end_date : this.end_date,
                        questions : this.questionAnswer,
                        is_published: 1,
                    },
                }).then(res=>console.log(res))
                alert("新增問卷完成，狀態為已發布")
                this.name="",
                this.description="",
                this.start_date="",
                this.end_date="",
                this.addQuestionPage=false
                //this.goFrontEntryPage();
            },

            deleteNewOptions(questionIndex, optionIndex) {
            this.questArr[questionIndex].options.splice(optionIndex, 1);
            const optionTextArray = this.questArr[questionIndex].options.map(option => option.text);
            this.questArr[questionIndex].optionText = optionTextArray.join(';');
            },
            deleteTransaction(questionIndex){
                this.questionArr.splice(questionIndex,1)
                localStorage.setItem("questionArr",JSON.stringify(this.questionArr))
            },
            confirmDelete(){
                console.log(123)
                if(this.deleIndex!==null){
                    this.deleteTransaction(this.deleIndex)
                    this.deleIndex=null
                }
            },



            goBackEntryPage(){
                this.$router.push('/BackEntry')
            },
            goFrontEntryPage(){
                this.$router.push('/')
            },
            goTopicPage(){
                this.$router.push('/BackTopic')
            },
            closeAddQuestionPage(){
                this.addQuestionPage=false;
            },
            goCheckPage(){
                this.checkPage=true;
                this.quizPage=false;
            },
            closeCheckPage(){
                this.checkPage=false;
                this.quizPage=true;

            },
        },
        components:{
        },
    }
</script>

<template>
    <div class="content">
<!-- 新增問卷標題 -->
        <div class="addQuiz" v-if="quizPage">
            <!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>新增問卷</p>
            </div>
            <!-- 新增問卷名稱 -->
            <div class="addTitle">
                <p>問卷名稱 : </p>
                <input type="text" v-model="this.name" placeholder="請輸入問卷標題" id="input">
            </div>
            <!-- 新增問卷說明 -->
            <div class="addDescription">
                <p>問卷說明 : </p>
                <textarea v-model="this.description" placeholder="請輸入問卷說明"></textarea>
            </div>
            <!-- 新增問卷開始時間 -->
            <div class="addStartTime">
                <p>開始時間 : </p>
                <input type="date" v-model="this.start_date"> 
            </div>
            <!-- 新增問卷結束時間 -->
            <div class="addEndTime">
                <p>結束時間 : </p>
                <input type="date" v-model="this.end_date">
            </div>
            <!-- 按鍵區域 -->
            <div class="addButtonArea">
                <!-- <button type="button" @click="goBackEntryPage()">取消</button> -->
                <button type="button" @click="addQuiz()">新增問題</button>
            </div>

<!-- 新增問卷問題 -->
            <div class="addQuestion" v-if="addQuestionPage">
                <i class="fa-solid fa-xmark" @click="closeAddQuestionPage()"></i>
            <!-- 目前位置標示 -->
            <!-- <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>新增題目</p>
            </div> -->
            <!-- 新增問卷名稱 -->
                <div class="questionName">
                    <p>問題 : </p>
                    <input type="text" v-model="this.questionTitle">
            <!-- 新增問卷回答類型 -->
                    <div class="answerType">
                        <select name="" v-model="this.questionType">
                            <option value="單選題">單選題</option>
                            <option value="多選題">多選題</option>
                            <option value="簡答題">簡答題</option>
                        </select>
                        <input type="checkbox" id="checkinput" value="true" v-model="this.necessary" name="necessary">
                        <label for="">必填</label>
                    </div>
                </div>
            <!-- 新增問卷回答選項 -->
                <div class="questionAnswer">
                    <div class="notify">
                        <p>選項 : </p>
                        <p> (多個答案請以；分隔)</p>
                    </div>
                    <div class="submitArea">
                        <textarea v-model="this.questionAnswer"></textarea>
                        <button type="button" @click="addQuestion()">加入</button>
                    </div>
                </div>
        </div>

            <!-- 問卷列表顯示區 -->
            <table>
                <tr>
                    <th>編號</th>
                    <th>問題</th>
                    <th>問題種類</th>
                    <th>必填</th>
                    <th>選項</th>
                    <th>刪除</th>
                </tr>
                <tr v-for="(question,questionIndex) in questionArr" :key="questionIndex" >
                    <td>{{questionIndex+1}}</td>
                    <td>{{ question.title }}</td>
                    <td>{{ question.type }}</td>
                    <td><input type="checkbox" id="tdinput" v-model="question.is_necessary" name="" disabled ></td>
                    <td>{{ question.option }}</td>
                    <td><i class="fa-solid fa-trash-can" @cilck="confirmDelete()" :key="questionIndex"></i></td>
                </tr>
            </table>
            <!-- 按鍵區域 -->
            <div class="questionButtonArea">
                <button type="button" @click="goBackEntryPage()">取消</button>
                <button type="button" @click="goCheckPage()">預覽</button>
                <button type="button" @click="saveAndUnpublished()">僅儲存</button>
                <button type="button" @click="saveAndPublished()">儲存並發布</button>
            </div>
        </div>


<!-- 新增問卷確認頁 -->
        <div class="addCheck" v-if="checkPage">
            <!-- 問卷時間 -->
            <div class="quizTime">
                <p>{{ this.start_date }} - {{ this.end_date }}</p>
            </div>
            <!-- 問卷標題 -->
            <div class="quizTitle">
                <p>{{ this.name }}</p>
            </div>
            
            <!-- 問卷說明 -->
            <div class="quizDescription">
                <p>{{ this.description }}</p>
            </div>
            <!-- 填答者資訊 -->
            <div class="answerInfo">
                <div class="answerName">
                    <p>姓名 : </p>
                    <input type="text" disabled>
                </div>
                <div class="answerNumber">
                    <p>手機 : </p>
                    <input type="number" disabled>
                </div>
                <div class="answerEmail">
                    <p>E-mail : </p>
                    <input type="text" id="emailinput" disabled>
                </div>
                <div class="answerAge">
                    <p>年齡 : </p>
                    <input type="number" disabled>
                </div>
            </div>
            <!-- 問卷作答區 -->
            <div class="questionnaire" v-for="(question,questionIndex) in questionArr" :key="questionIndex">
                <span>{{questionIndex+1}}.{{ question.title }}</span>
                <span>* 是否必填 : {{ question.is_necessary }}</span>

                <p>{{ question.type }}</p>
                <div class="answer" v-for="op in question.option">
                    <input type="checkbox" name="" id="" v-if="question.type=='單選題'">
                    <input type="radio" name="" id="" v-if="question.type=='多選題'">
                    <input type="textarea" name="" id="" v-if="question.type=='簡答題'">
                    <span>{{ op }}</span>

                </div>

                
                
                <!-- <p>{{ question.option }}</p> -->
                <!-- <p><input type="checkbox">{{ question.option }}</p>
                <p><input type="radio">{{ question.option }}</p>
                <p><input type="textarea">{{ question.option }}</p> -->

                <!-- <div class="inputOptions" v-if="question.option === 'radio'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="radio" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                                :name="'question_' + index" v-model="doquestArr[question.questionId]">
                            <label :for="'q_' + index + '_o_' + optionIndex">{{ question.option }}</label>
                        </div>
                    </div>
                    <div class="inputOptions" v-else-if="question.questionType === 'checkbox'">
                        <div v-for="(option, optionIndex) in question.optionText.split(';')" :key="optionIndex">
                            <input type="checkbox" :id="'q_' + index + '_o_' + optionIndex" :value="option"
                                v-model="doquestArr[question.questionId + '_' + optionIndex]">
                            <label :for="'q_' + index + '_o_' + optionIndex">{{ option }}</label>
                        </div>
                    </div>
                    <div class="inputOptions" v-else-if="question.questionType === 'text'">
                        <input type="text" v-model="doquestArr[question.questionId]" :id="'q_' + index">
                    </div> -->


            </div>
            <!-- 按鍵區域 -->
            <div class="checkButtonArea">
                <button type="button" @click="closeCheckPage()">返回</button>
                <button type="button">編輯</button>
            </div>
        </div>


    </div>
</template>


<style lang="scss" scoped>
    .content{
        width: 100vw;
        display: flex;
        justify-content: center;
//新增問卷內頁
        .addQuiz{
            margin-top: 7vmin;
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

            p{
                color: dimgray;
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
            //新增問卷名稱
            .addTitle{
                display: flex;
                margin-bottom: 2vmin;
                align-items: center;
            }
            //新增問卷說明
            .addDescription{
                display: flex;
                margin-bottom: 3vmin;

                textarea{
                        width: 28vw;
                        height: 15vh;
                        outline: none;
                        margin-left: 2vmin;
                        border-radius: 10px;
                        padding-left: 1vmin;
                        border: 2px solid #9D9D9D;
                }
            }
            //新增問卷開始時間
            .addStartTime{
                display: flex;
                margin-bottom: 2vmin;
                align-items: center;
            }
            //新增問卷結束時間
            .addEndTime{
                display: flex;
                margin-bottom: 2vmin;
                align-items: center;
            }
            .addButtonArea{
                width: 48vw;
                margin-top: 5vmin;
                justify-content: center;
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

            //刪除ICON
            .deleteIcon{
                i{
                    color: #9D9D9D;
                    font-size: 20pt;;
                    margin-left: 1vmin;
                    margin-top: 5vmin;
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
                        #tdinput{
                            width: 2.5vw;
                            height: 2vh;
                            margin: 0;
                        }
                        i{
                            color: #9D9D9D;
                            &:hover{
                                color: lightslategray;
                            }
                            &:active{
                                color: #9D9D9D;
                            }
                        }
                    }
                } 
            }
            //按鍵區域
            .questionButtonArea{
                width: 45vw;
                margin-top: 5vmin;
                justify-content: space-around;
                align-items: center;
                display: flex;

                button{
                    width: 9vw;
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


            //新增問卷名稱
            .addQuestion{
                width: 47vw;
                height: 40vh;
                margin: auto;
                margin-top: 4vmin;
                box-shadow: 12px 12px 2px 1px rgba(100, 83, 94, 0.2);;
                border: 1px solid dimgray;
                border-radius: 5px;
                position: relative;

                i{
                    color: dimgray;
                    position: absolute;
                    font-size: 15pt;
                    right: 1%;
                    top: 2%;
                }
                p{
                    color: dimgray;
                }
                .questionName{
                    width: 50vw;
                    display: flex;
                    align-items: center;
                    margin-bottom: 2vmin;
                    margin-top: 6vmin;
                    margin-left: 2vmin;

                    input{
                        width: 28vw;
                        height: 4.5vh;
                        outline: none;
                        margin-left: 1vmin;
                        border-radius: 10px;
                        padding-left: 1vmin;
                        border: 2px solid #9D9D9D;
                        //margin-right: 1vmin;
                        margin-bottom: 2vmin;
                    }

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
                .questionAnswer{
                    margin-bottom: 3vmin;
                    margin-left: 0.5vmin;
                    .notify{           
                        width:15vw ;  
                        display: flex;
                        justify-content: space-around;

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
            }
        }




        .addCheck{
        width: 80vw;
        margin: auto;
        margin-top: 10vmin;
        border: 1px black solid;

        p{
            color: dimgray;
            text-align: center;
        }
//問卷時間
        .quizTime{
            font-size: 14pt;
            position: absolute;
            right: 23vmin;
            top: 13vmin;
        } 
//問卷標題
        .quizTitle{
            font-size: 36pt;
        }
//問卷說明
        .quizDescription{
            width: 70vw;
            height: 15vh;
            font-size: 16pt;
            //border: 1px solid black;
            margin: auto;
            margin-bottom: 3vmin;
        }
//填答者資訊
        .answerInfo{
            width: 70vw;
            margin: auto;
            margin-bottom: 2vmin;
            //border: 1px solid black;

            input{
                width: 60vw;
                height: 4.5vh;
                outline: none;
                margin-left: 1vmin;
                border-radius: 10px;
                padding-left: 1vmin;
                border: 2px solid #9D9D9D;
                margin-bottom: 2vmin;
            }

            #emailinput{
                width: 60vw;
                height: 4.5vh;
                outline: none;
                margin-left: 1vmin;
                border-radius: 10px;
                padding-left: 1vmin;
                border: 2px solid #9D9D9D;
                margin-bottom: 2vmin;
                margin-right: 2vmin;
            }

            p{
                font-size: 12pt;
            }
            .answerName{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .answerNumber{
                display: flex;
                align-items: center;
                justify-content: center;
                
            }
            .answerEmail{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .answerAge{
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
//問卷作答區
        .questionnaire{
            width: 70vw;
            height: 100vh;
            border: 1px solid black;
            margin: auto;
        }
//按鍵區域 
        .checkButtonArea{
            width: 70vw;
            margin: auto;
            //border: 1px solid black;
            text-align: center;
            margin-top: 5vmin;

            button{
                width: 8vw;
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