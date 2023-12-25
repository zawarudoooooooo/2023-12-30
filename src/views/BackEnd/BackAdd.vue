<script>
import axios from 'axios';
import BackNav from '../../components/BackNav.vue';
    export default{
        data(){
            return{
            //quiz
                name:"",
                description:"",
                start_date:"",
                end_date:"",
                quizArr:JSON.parse(localStorage.getItem("this.quizArr")) || [],
                quizPage:false,

            //question
                questionTitle:"",
                questionType:"",
                necessary:"",
                questionArr:JSON.parse(localStorage.getItem("this.qustionArr")) || [],
                questionPage:true,
                // //questionArr:[],
                // questionType:["radio","checkbox","text"],
                // questionList:[],
                // necessary:"",
                // options:[],
                // questionText:"",
                // questionArr:JSON.parse(localStorage.getItem("this.questionArr")) || [],
                // questionIndex:0
            }
        },
        methods:{
//檢查quiz和儲存
            checkAndSave(){
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

                const name = document.getElementById("addTitle");
                const description = document.getElementById("addDescription");
                const start_date = document.getElementById("addStartDate");
                const end_date = document.getElementById("addEndDate");
                
                let quizObj = {
                    title : this.name,
                    description : this.description,
                    startDate : this.start_date,
                    endDate : this.end_date,
                }

                this.quizArr.push(quizObj);
                console.log(quizObj);
                localStorage.setItem("quizArr", JSON.stringify((this.quizArr)));

                //this.quizPage=false;

            },
            goBackEntryPage(){
                this.$router.push('/BackEntry')
            },
            goFrontEntryPage(){
                this.$router.push('/')
            },
            goTopicPage(){
                this.$router.push('/BackTopic')
            }
            // addQuestion(){
            //     const newQuestion={
            //         questionType:"",
            //         questionText:"",
            //         optionText:"",
            //         necessary:"",

            //         question:[],
            //         options:[],
            //     }
            //     this.questionArr.push(newQuestion);
            //     this.questionList.push(newQuestion);
            // },

            // createOptions(questionIndex){
            //     const newOption={
            //         text:'',
            //     }
            //     this.questionArr[questionIndex].options.push(newOption);

            //     const optionTextArr = this.questionArr[questionIndex].options.map(option=>option.text);
            //     this.questionArr[questionIndex].optionText = optionTextArr.join(";");

            //     localStorage.setItem("questionArr", JSON.stringify((this.questionArr)));
                
            // },

            // deleteOptions(questionIndex,optionIndex){
            //     this.questionArr[questionIndex].option.splice(optionIndex,1);
            //     const optionTextArr = this.questionArr[questionIndex].option.map(option=>option.text);
            //     this.questionArr[questionIndex].optionText = optionTextArr.join(";");

            // },

            // deleteQuestion(questionIndex){
            //     if(this.questionArr.length>1){
            //         thia.questionArr.splice(questionIndex,1);
            //     }else{
            //         alert("至少保留一個問題")
            //     }

            // },
            // saveAndUnpublished(){

            // //檢查欄位是否為空白
            //     if(this.name==""||this.description==""||this.start_date==""||this.end_date==""){
            //         alert("欄位不得為空，請再次檢查")
            //         return;
            //     }
            // //檢查時間
            //     const startDateTime = new Date(this.startTime);
            //     const endDateTime = new Date(this.endTime);
            //     if(startDateTime>=endDateTime){
            //         alert("開始時間不得晚於或等於結束時間")
            //         return;
            //     }
            //檢查題目
            //     if(this.questionArr.length==0||this.questionArr.every(question=>question.questionText.trim==="")){
            //         alert("至少要有一題，且內容不得為空")
            //         return;
            //     }
            // //檢查類型
            //     for(let i=0;i<this.questionArr.length;i++){
            //         const question = this.questionArr[i];
            //         if(question.questionType.trim()===""){
            //             alert("至少給問題一個類型")
            //             return;
            //         }
        },
                //複選至少要有兩個選項
                // for(let i=0;i<this.questionArr.length;i++){
                //     const question = this.questionArr[i];
                //     if((question.questionType==='radio'||question.questionType==='checkbox')||question.options.length<2){
                //         alert("單選或多選，至少要有兩個選項")
                //         return;
                //     }
                // }
                //問題不得為空
                // for(let i=0;i<this.questionArr.length;i++){
                //     const question = this.questionArr[i];

                //     if(question.questionText.trim()===""){
                //         alert("問題不得為空")
                //         return;
                //     }

                    
                    //選項不得為空
                    // if(question.options.length>0){
                    //     for(let j=0;j<question.options.length;j++){
                    //         if(question.options[j].text.trim()==""){
                    //             alert("選項不得為空");
                    //             return;
                    //         }
                    //     }
                    // }
                // }

                // const newQuiz={
                //     hwQuestionnaire:{
                //         name:this.name,
                //         description:this.description,
                //         start_date:this.start_date,
                //         end_date:this.end_date,
                //         published:0,
                //     },
                //     questionList:this.questionList,
                // };
                // this.questionArr.forEach((question,questionIndex)=>{
                //     const optionTextArr = question.options.map(option=>option.text);
                //     this.questionArr[questionIndex].optionText = optionTextArr.join(";");
                // })
                // console.log(newQuiz)

                // fetch('http://localhost:8080/quiz/create', {
                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify(newQuiz)
                // })
                // .then(response => {
                //     if (!response.ok) {
                //         throw new Error(`HTTP error! Status: ${response.status}`);
                //     }
                //     return response.json();
                // })
                // .then(data => {
                //     console.log(data);
                // })
                // .catch(error => console.error('Error:', error));

                // alert("成功新增問卷，狀態為未發布(published=0)")

                // axios({
                //     method:"POST",
                //     url:"http://localhost:8080/api/quiz/create",
                //     headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify(newQuestionnaire)

                // })
                //     .then((response=>console.log(response.data)))
                //     .catch((error=>console.log(error)))

                // fetch('http://localhost:8080/api/quiz/create', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(newQuestionnaire)
                // })
                //     .then(response => {
                //         if (!response.ok) {
                //             throw new Error(`HTTP error! Status: ${response.status}`);
                //         }
                //         return response.json();
                //     })
                //     .then(data => {
                //         console.log(data);
                //     })
                //     .catch(error => console.error('Error:', error));
                // alert("成功新增問卷，狀態為未發布(published=0)")
                // this.goBackEntryPage()
            // },
            // saveAndPublished(){
            // //檢查欄位是否為空白
            //     if(this.questionName==""||this.description==""||this.startTime==""||this.endTime==""){
            //         alert("欄位不得為空，請再次檢查")
            //         return;
            //     }
            // //檢查時間
            //     const startDateTime = new Date(this.startTime);
            //     const endDateTime = new Date(this.endTime);
            //     if(startDateTime>=endDateTime){
            //         alert("開始時間不得晚於或等於結束時間")
            //         return;
            //     }
            // //檢查題目
            //     if(this.questionArr.length==0||this.questionArr.every(question=>question.questionText.trim==="")){
            //         alert("至少要有一題，且內容不得為空")
            //         return;
            //     }
            // //檢查類型
            //     for(let i=0;i<this.questionArr.length;i++){
            //         const question = this.questionArr[i];
            //         if(question.questionType.trim()===""){
            //             alert("至少給問題一個類型")
            //             return;
            //         }
            //     }
            //     // //複選至少要有兩個選項
            //     // for(let i=0;i<this.questionArr.length;i++){
            //     //     const question = this.questionArr[i];
            //     //     if((question.questionType==='radio'||question.questionType==='checkbox')||question.options.length<2){
            //     //         alert("單選或多選，至少要有兩個選項")
            //     //         return;
            //     //     }
            //     // }
            //     //問題不得為空
            //     for(let i=0;i<this.questionArr.length;i++){
            //         const question = this.questionArr[i];

            //         if(question.questionText.trim()===""){
            //             alert("問題不得為空")
            //             return;
            //         }

            //         //選項不得為空
            //         // if(question.options.length>0){
            //         //     for(let j=0;j<question.options.length;j++){
            //         //         if(question.options[j].text.trim()==""){
            //         //             alert("選項不得為空");
            //         //             return;
            //         //         }
            //         //     }
            //         // }
            //     }

            //     const newQuestionnaire={
            //         hwQuestionnaire:{
            //             name:this.name,
            //             description:this.description,
            //             start_date:this.start_date,
            //             end_date:this.end_date,
            //             published:1,
            //         },
            //         questionList:this.questionList,
            //     };
            //     this.questionArr.forEach((question,questionIndex)=>{
            //         const optionTextArr = question.options.map(option=>option.text);
            //         this.questionArr[questionIndex].optionText = optionTextArr.join(";");
            //     })
            //     console.log(newQuestionnaire)

            //     fetch("http://localhost:8080/quiz/create",{
            //         method:"POST",
            //         header:{
            //             "Content-Type" : "application/json"
            //         },
            //         body:JSON.stringify(newQuestionnaire)
            //     })

            //     .then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch(error => console.log(error))


            //     fetch('http://localhost:8080/quiz/create', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(newQuestionnaire)
            //     })
            //         .then(response => {
            //             if (!response.ok) {
            //                 throw new Error(`HTTP error! Status: ${response.status}`);
            //             }
            //             return response.json();
            //         })
            //         .then(data => {
            //             console.log(data);
            //         })
            //         .catch(error => console.error('Error:', error));
            //             alert("成功新增問卷，狀態為已發布(published=1)")

            //         //this.goFrontEntryPage()
            // },

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
                <input type="text" v-model="this.name" placeholder="請輸入問卷標題" id="addTitle">
            </div>
            <!-- 新增問卷說明 -->
            <div class="addDescription">
                <p>問卷說明 : </p>
                <textarea v-model="this.description" placeholder="請輸入問卷說明" id="addDescription"></textarea>
            </div>
            <!-- 新增問卷開始時間 -->
            <div class="addStartTime">
                <p>開始時間 : </p>
                <input type="date" v-model="this.start_date" id="addStartDate"> 
            </div>
            <!-- 新增問卷結束時間 -->
            <div class="addEndTime">
                <p>結束時間 : </p>
                <input type="date" v-model="this.end_date" id="addEndDate">
            </div>


            <!-- <button type="button" @click="addQuestion()">新增問題</button> -->
<!-- 新增問卷名稱 -->
            <!-- <div class="addQuestion" v-for="(question,questionIndex) in questionArr" :key="questionIndex">
                <div class="numAndTopic">
                    <p id="questionnum">{{questionIndex+1}}</p>
                    <input type="text" placeholder="請新增問卷題目" v-model="question.questionText" v-text="questionText">
                    <select name="" id="" v-model="question.questionType">
                        <option v-for="(type,index) in questionType" :key="index" :value="type">{{ type==="radio"?"單選" :type==="checkbox" ? "複選" : "簡答" }}</option>
                    </select>
                    <input type="checkbox" id="checkinput" v-model="question.necessary">
                    <label for="">必填</label>
                </div> -->
<!-- 新增問卷回答選項 -->
                <!-- <div class="topicAnswer">
                        <div class="notify">
                            <p>選項 : </p>
                            <p id="notifyText">(多個答案請以;分隔)</p>
                        </div>
                        <div class="submitArea">
                            <textarea placeholder="請輸入問卷選項"></textarea>
                    <button type="button" @click="createOptions(questionIndex)">加入</button>
                </div>
            </div>
        </div> -->
<!-- 刪除ICON -->
            <!-- <div class="deleteIcon">
                <i class="fa-solid fa-trash-can" @click="deleteQuestion(questionIndex)"></i>
            </div> -->
<!-- 問卷列表顯示區 -->
            <!-- <table>
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
                    <td></td>
                    <td></td>
                </tr>
            </table> -->
<!-- 按鍵區域 -->
            <div class="addButtonArea">
                <button type="button" @click="goBackEntryPage()">取消</button>
                <button type="button" @click="checkAndSave()">下一步</button>
                <!-- <button type="button" @click="saveAndPublished()">儲存並發布</button> -->
            </div>
        </div>


<!-- 新增問卷問題 -->
        <div class="addQuestion">
            <!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>新增題目</p>
            </div>
            <!-- 新增問卷名稱 -->
            <div class="questionName">
                <p>問題 : </p>
                <input type="text" v-model.lazy="this.questionTitle">
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
            <div class="questionAnswer">
                <div class="notify">
                    <p>選項 : </p>
                    <p id="notifyText">(多個答案請以；分隔)</p>
                </div>
                <div class="submitArea">
                    <textarea></textarea>
                    <button type="button">加入</button>
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
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <!-- 按鍵區域 -->
            <div class="questionButtonArea">
                <button type="button">僅儲存</button>
                <button type="button">儲存並發布</button>
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
        .addQuiz{
            width: 50vw;
            height: 70vh;
            margin: auto;
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

//新增問卷名稱
        .addQuestion{
            width: 50vw;
            height: 70vh;
            margin: auto;
            margin-top: 7vmin;
            p{
                color: dimgray;
            }
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
            .questionName{
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
                    margin-right: 2vmin;
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
            .questionButtonArea{
                width: 48vw;
                margin-top: 5vmin;
                justify-content: center;
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
        }
    }
</style>