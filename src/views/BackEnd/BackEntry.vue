<script>
import axios from 'axios';
export default{
    data(){
        return{
            //模糊搜尋
            name:"",
            startDate:"",
            endDate:"",
            isLogin:true,

            //問卷顯示
            upNum:0,
            upName:"",
            upStartDate:"",
            upEndDate:"",
            upDescription:"",
            upQuestionList:"",

            //回饋頁面
            writerNum:0,
            writerQuizNum:"",
            writerName:"",
            writerPhone:"",
            writerEmail:"",
            writerAge:"",
            writerAnswer:"",
            writerDateTime:"",

            //頁面開關
            backEntryPage:true,
            backResultPage:false,

            arr:[],
            writerArr:[],
            writerList:"",
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
                num:this.upNum,
                name : this.upName,
                description : this.upDescription,
                start_date : this.upStartDate,
                end_date : this.upEndDate,
                questions: this.upQuestionList,
                is_login:true,
            },
            }).then(res=>{
                this.arr.push(res.data.quizList)
                //console.log(this.arr);
            })
            //console.log(this.arr);

            // axios({
            // url:'http://localhost:8080/quiz/write',
            // method:'POST',
            // headers:{
            //     'Content-Type':'application/json'
            // },
            // data:{
            //     quiz_num:this.writerQuizNum,
            //     name:this.writerName,
            //     phone:this.writerPhone,
            //     email:this.writerEmail,
            //     age:this.writerAge,
            //     answer:this.writerAnswer,
            // },
            // }).then(res=>{
            //     console.log(res)
            // })


            axios({
            url:'http://localhost:8080/write/feback',
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            params:{
                quizNum:this.writerQuizNum
            },
            data:{
                num : this.writerNum,
                quizNum: this.writerQuizNum,
                name : this.writerName,
                phone : this.writerPhone,
                email : this.writerEmail,
                age: this.writerAge,
                answer: this.writerAge,
                writeDateTime: this.writerDateTime
            },
            }).then(res=>{          
                this.writerArr.push(res.data.writerList)
                console.log(writeArr);
            })
    },
    methods:{
//問卷顯示頁面
    upData(index){
            this.arr.forEach(arr=>{
                arr.forEach((item,itemIndex)=>{  
                    if(itemIndex!=index){
                        return
                    }
                let test=item.questionList

                this.upNum=item.num
                this.upName=item.name
                this.upDescription=item.description
                this.upStartDate=item.startDate
                this.upEndDate=item.endDate

            if(this.upQuestionList!=""){
                this.upQuestionList=""
            }
            this.upQuestionList=JSON.parse(test)
            console.log(this.upQuestionList);
            })
        })
    },
//搜尋問卷
    search(){
            axios({
            url:'http://localhost:8080/quiz/search',
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                quiz_name:this.name,
                start_date:this.startDate,
                end_date:this.endDate,
                is_login:true,
            },
            }).then(res=>{
                if(this.arr.length!=0){
                    this.arr.length=0
                    this.arr.push(res.data.quizList)
                    this.name=""
                    this.startDate=""
                    this.endDate=""
                    return
                }
            })
        },
//刪除問卷
        deleteQuiz(num){
            axios({
                url:'http://localhost:8080/quiz/delete',
                method:'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                params:{
                    quiz_num_list:num
                },
            }).then(res=>{
                this.search()
            })
        },
//編輯問卷(只有未發布可更改)
        edit(){
            axios({
                url:'http://localhost:8080/quiz/update',
                method:'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                params:{
                    quiz_num:this.upNum
                },
                data:{
                    name : this.upName,
                    description : this.upDescription,
                    start_date : this.upStartDate,
                    end_date : this.upEndDate,
                    question_list: this.upQuestionList,
                    is_published: 0,
                },
            }).then(res=>{                
                console.log(res.data)
            })
        },
//抓狀態
        getStatus(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);

            if (now < startDate) {
                return '尚未發布';
            } else if (now >= startDate && now <= endDate) {
                return '已發布';
            } else {
                return '已結束';
            }
        },
//狀態顯示顏色
        getStatusColor(startTime, endTime) {
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未發布') {
                return 'orange'; // 设置尚未开始状态的文字颜色为橙色
            } else if (status === '已發布') {
                return 'green'; // 设置进行中状态的文字颜色为绿色
            } else if (status === '已結束') {
                return 'red'; // 设置已结束状态的文字颜色为红色
            } else {
                return 'black'; // 默认颜色为黑色
            }
        },
        isLinkEnabled(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未開始' || (status === '已結束' && now < endDate)) {
                return false;
            } else {
                return true;
            }
        },
        isLinkEnabledForDoPage(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未開始' || status === '已結束') {
                return false;
            }
            else {
                return true;
            }
        },
//問卷回饋
        goResult(){
            this.arr.forEach(arr=>{
                arr.forEach(item=>{
                    this.writerQuizNum=item.num
                })
            // //     arr.forEach((item,itemIndex)=>{  
            // //     //     if(itemIndex!=index){
            // //     //         return
            // //     //     }
            // //     // let test=item.questionList

            // //     this.writeQuizNum=item.num
            // //     // this.upName=item.name
            // //     // this.upDescription=item.description
            // //     // this.upStartDate=item.startDate
            // //     // this.upEndDate=item.endDate

            // //     // if(this.upQuestionList!=""){
            // //     //     this.upQuestionList=""
            // //     // }
            // //     // this.upQuestionList=JSON.parse(test)
            // // //console.log(this.upQuestionList);
            // //     })
            })
            
            axios({
            url:'http://localhost:8080/write/feback',
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            params:{
                quizNum:this.writerQuizNum
            },
            data:{
                num : this.writerNum,
                quizNum: this.writerQuizNum,
                name : this.writerName,
                phone : this.writerPhone,
                email : this.writerEmail,
                age: this.writerAge,
                answer: this.writerAnswer,
                writeDateTime: this.writerDateTime
            },
            }).then(res=>{          
                //this.writeArr.push(res)
                console.log(res);
            })
            this.backEntryPage=false,
            this.backResultPage=true
        },
//路由
        goAddQuiz(){
            this.$router.push('BackAdd')
        },
        goBackEntry(){
            this.backResultPage=false,
            this.backEntryPage=true
        },
    }
}
</script>

<template>
    <div class="content">
<!-- 後台入口頁面 -->
        <div class="backEntry" v-if="backEntryPage">
            <!-- 標題模糊搜尋 -->
            <div class="searchArea">
            <!-- 問卷名稱 -->
                <div class="questionnaire">
                    <p>問卷名稱 : </p>
                    <input type="text" v-model="this.name">
                </div>
                <!-- 開始/結束時間 -->
                <div class="time">
                    <p>開始時間 : </p>
                    <input type="date" v-model="this.startDate">
                    <p>到</p>
                    <input type="date" id="inputdate" v-model="this.endDate">
                    <button type="button" @click="search()">搜尋</button>            
                </div>
            </div>
            <!-- icon區域 -->
            <div class="iconArea">
                <i class="fa-solid fa-plus" @click="goAddQuiz()"></i>
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
                    <th>刪除</th>
                </tr>
                <tbody v-for="item in this.arr">
                    <tr  v-for="(item1,index) in item">
                        <td>{{item1.num}}</td>
                        <td>
                            <button type="button" @click="upData(index)" class="btn" data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal">{{ item1.name }}
                            </button>
                        </td>
                        <td>
                            <span :style="{ color: getStatusColor(item1.startDate, item1.endDate) }">
                                {{ getStatus(item1.startDate, item1.endDate) }}
                            </span>
                        </td>
                        <td>{{ item1.startDate }}</td>
                        <td>{{ item1.endDate }}</td>
                        <td @click="goResult(index)">前往</td>
                        <td><i class="fa-solid fa-trash-can" @click="deleteQuiz(item1.num)"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
<!-- 問卷結果顯示 -->
        <div class="result" v-if="backResultPage">
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
                        <th>{{ this.writerNum }}</th>
                        <th>{{ this.writerName }}</th>
                        <th>{{ this.writerDateTime }}</th>
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
    </div>

<!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">問卷內容</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">問卷名稱 :</label>
                                <input type="text" v-model="this.upName" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">問卷說明 :</label>
                                <textarea v-model="this.upDescription" class="form-control" id="message-text"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">開始時間 :</label>
                                <input type="date" v-model="this.upStartDate" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">結束時間 :</label>
                                <input type="date" v-model="this.upEndDate" class="form-control" id="recipient-name">
                            </div>
                            <div class="queiont" v-for="(item,index) in upQuestionList">
                                <div class="num">第{{ index+1 }}題</div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">問題名稱 :</label>
                                        <input type="text" v-model="item.title" class="form-control" id="recipient-name">
                                    </div>
                                    <div class="mb-3">
                                        <select v-model="item.type" name="" id="">
                                            <option value="">請選擇</option>
                                            <option value="單選題">單選題</option>
                                            <option value="多選題">多選題</option>
                                            <option value="簡答題">簡答題</option>
                                        </select>
                                        <input type="checkbox" class="chBox" name="necessary" value="true" v-model="item.necessary" id="">
                                        <span>必填</span>
                                    </div>
                                    <div class="mb-3">
                                            <label for="message-text" class="col-form-label">選項 ( 請以 ; 分隔 ) :</label>
                                            <textarea v-model="item.option" class="form-control" id="message-text"></textarea>
                                    </div>
                                    <hr>
                                </div>
                        </form>
                    </div>
                    <div class="modal-footer" v-for="item in arr">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal" @click="edit()">確認修改</button>
                    </div>
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
    .content{
        margin-top: 10vmin;
//後台入口
        .backEntry{
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
//問卷結果
        .result{
            .iconArea{
                text-align: center;
                i{
                    color: #9D9D9D;
                    font-size: 24pt;;
                    margin-right: 10vmin;
                    &:hover{
                        color: lightslategray;
                    }
                    &:active{
                        color: #9D9D9D;
                    }
                }
            }
            .buttonArea{
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
//modal
    select{
        margin-right: 3vmin;
    }
    textarea{
        width: 27.5vw;
        height: 10vh;
        border-radius: 5px;
        outline: none;
        padding-left: 1vmin;
    }
</style>