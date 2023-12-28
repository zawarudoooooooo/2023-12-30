<script>
import axios from 'axios';
export default{
    data(){
        return{
            arr:[],
            questionList:[],
        }
    },
    mounted(){
        axios({
            url:'http://localhost:8080/quiz/search',
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            data:{
                // name:"",
                // start_date: "",
                // end_date:"",
                // question_list:"",
            },
        })
        .then(res=>{
            res.data.quizList.forEach(element => {
                this.arr.push({name:element.name,description:element.description,
                    startDate:element.startDate,endDate:element.endDate,published:element.published,
                    questionList:element.questionList,num:element.num})
            });
                console.log(this.arr)
        })
        // .then(res=>{
        //     res.data.quizList.questionList.forEach(element => {
        //         this.questionList.push({num:element.num,title:element.title,
        //             type:element.type,necessary:element.necessary,option:element.option})
        //     });
        //         console.log(this.questionList)
        // })
    },
    methods:{
        goBackEntry(){
            this.$router.push('/BackEntry')
        },
        goFrontCheck(){
            this.$router.push('/FrontQuestionCheck')
        }
    }
}
</script>

<template>
    <div class="content">
        <div class="quizInfo" v-for="(question,questionIndex) in arr" :key="questionIndex">
        <!-- 問卷時間 -->
            <small>{{ question.startDate }}-{{ question.endDate }}</small>
        <!-- 問卷標題 -->
            <h1>{{ question.name }}</h1>
        <!-- 問卷說明 -->
            <p>{{ question.description }}</p>
        </div>

<!-- 填答者資訊 -->
        <div class="answerInfo">
            <div class="answerName">
                <p>姓名 : </p>
                <input type="text">
            </div>
            <div class="answerNumber">
                <p>手機 : </p>
                <input type="number">
            </div>
            <div class="answerEmail">
                <p>E-mail : </p>
                <input type="text" id="emailinput">
            </div>
            <div class="answerAge">
                <p>年齡 : </p>
                <input type="number">
            </div>
        </div>
<!-- 問卷作答區 -->
        <div class="question" v-for="(question,questionIndex) in questionList" :key="questionIndex">
            <span>{{questionIndex+1}}.{{ question.title }}</span>
                <h6>{{ question.type }}</h6>
                <small>* 是否必填 : {{ question.necessary }}</small>
                
                <div class="answer" v-for="op in questionList.option.split(';')">
                    <input type="checkbox" name="" id="" v-if="question.type=='單選題'">
                    <input type="radio" name="" id="" v-if="question.type=='多選題'">
                    <input type="textarea" name="" id="textinput" v-if="question.type=='簡答題'" placeholder="請輸入簡答題答案">
                    <span>{{ op }}</span>
                </div>
        </div>
<!-- 按鍵區域 -->
        <div class="buttonArea">
            <button type="button" @click="goBackEntry()">取消</button>
            <button type="button" @click="goFrontCheck()">送出</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 80vw;
        margin: auto;
        margin-top: 10vmin;
        border: 1px black solid;
        position: relative;
        p{
            color: dimgray;
            text-align: center;
            font-size: 14pt;
        }
        small{
            position: absolute;
            right: 2vmin;
            top: 1vmin;
            color: dimgray;
        }        
        h1{
            color: dimgray;
            margin-top: 2vmin;
            text-align: center;
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
        .buttonArea{
            width: 70vw;
            margin: auto;
            //border: 1px solid black;
            text-align: center;
            margin-top: 5vmin;

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
</style>