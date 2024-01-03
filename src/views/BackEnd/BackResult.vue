<script>
import axios from 'axios';
export default{
    data(){
        return{
            //統計
            cacuNum:0,
            cacuName:"",
            cacuStartDate:"",
            cacuEndDate:"",
            cacuDescription:"",
            cacuQuestionList:"",

            cacuArr:[],

            //回饋
            writeIndex:0,
            writeQuizNum:"",
            writeName:"",
            writePhone:"",
            writeEmail:"",
            writeAge:"",
            writeAnswer:"",
            writeDateTime:"",

            writerArr:[],
        }
    },
    mounted(){
        axios({
            url:'http://localhost:8080/quiz/search',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                num:this.cacuNum,
                name : this.cacuName,
                description : this.cacuDescription,
                start_date : this.cacuStartDate,
                end_date : this.cacuEndDate,
                questions: this.cacuQuestionList,
                is_login:true,
            },
        }).then(res=>{
            this.cacuArr.push(res.data.quizList)
            console.log(this.cacuArr);
            }),
            //console.log(this.cacuArr);

        axios({
            url:'http://localhost:8080/write/feback',
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            params:{
                quiz_Num:this.writeIndex
            },
            data:{
                num : this.writeIndex,
                quizNum: this.writeQuizNum,
                name : this.writeName,
                phone : this.writePhone,
                email : this.writeEmail,
                age: this.writeAge,
                answer: this.writeAge,
                writeDateTime: this.writeDateTime
            },
            }).then(res=>{                
                console.log(res.data)
            })
    },
    methods:{
//抓回饋狀態
        getFeback(num){
            axios({
                url:'http://localhost:8080/write/feback',
                method:'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                params:{
                    quiz_Num:num
                },
                data:{
                    num : this.writeIndex,
                    quizNum: this.writeQuizNum,
                    name : this.writeName,
                    phone : this.writePhone,
                    email : this.writeEmail,
                    age: this.writeAge,
                    answer: this.writeAge,
                    writeDateTime: this.writeDateTime
                },
            }).then(res=>{                
                console.log(res.data)
            })
            this.backEntryPage=false,
            this.backResultPage=true
        },
        goBackEntry(){
            this.$router.push('/BackEntry')
        }
    }
}
</script>

<template>
    <div class="content">
        <!-- icon區域 -->
        <div class="iconArea">
            <i class="fa-solid fa-comments" @click="getFeback()">回饋</i>
            <i class="fa-solid fa-chart-pie">統計</i>
        </div>
        <div class="feback">
            <table>
                <tr>
                    <th>編號</th>
                    <th>姓名</th>
                    <th>填寫時間</th>
                    <th>觀看回覆</th>
                </tr>
                <tr>
                    <th>{{ this.writeIndex+1 }}</th>
                    <th>{{ this.writeName }}</th>
                    <th>{{ this.writeDateTime }}</th>
                    <th></th>
                </tr>
            </table>
        </div>
        <div class="caculate">
            </div>

            <!-- 按鍵區域 -->
            <div class="buttonArea">
                <button type="button" @click="goBackEntry()">返回</button>
            </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        margin-top: 10vmin;
        //icon區域
        .iconArea{
            text-align: center;
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
            width: 45vw;
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
        //按鍵區域
        .buttonArea{
            button{
                width: 10vw;
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