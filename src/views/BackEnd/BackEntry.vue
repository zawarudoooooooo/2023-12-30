<script>
import axios from 'axios';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';
import Chart from 'chart.js/auto';

// use([
//     CanvasRenderer,
//     PieChart,
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent,
// ]);


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
            writerArr:[],
            writerInfoArr:[],
            WriterAnswer:[],


            //圓餅圖變數
            countArr:[],

            //頁面開關
            backEntryPage:true,
            backResultPage:false,

            arr:[],
            //writerList:"",

            chartDataList: [],
            labelForAns: [], ////到時候要棄用
            responseData: null,
            processedUserData: null,
            userList: null
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
                this.arr=res.data.quizList
                //console.log(this.arr);
            })
    },
    methods:{
//問卷後台頁面
    //問卷顯示頁面
        upData(index){
            this.arr.forEach((item,itemIndex)=>{  
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

//問卷後台回饋
    //問卷回饋
        goResult(index){
            //console.log(index);
            axios({
            url:'http://localhost:8080/write/feback',
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            params:{
                quizNum:index
            },
            }).then(res=>{
                //let dayTime=new Date(res.data.writerList.writeDateTime)
                //let time= dayTime.getFullYear()+"-"+(dayTime.getMonth()+1)+"-"+dayTime.getDate()+" "+dayTime.getHours()+":"+"0"+dayTime.getMinutes()
                //console.log(time)
                this.writerArr=res.data.writerList
                //console.log(this.writerArr)
            })
            this.backEntryPage=false,
            this.backResultPage=true,
            this.backFebackPage=true
            this.count(index);
        },
    //填寫者個別顯示頁面
        writer(index){
            //console.log(this.writerArr)
            this.writerArr.forEach((item,itemIndex)=>{
                if(itemIndex!=index){
                    return
                }
                this.writerInfoArr=item
                //console.log(this.writerInfoArr.answer)
                this.writerAnswer=this.writerInfoArr.answer
                //console.log(this.writerAnswer)
            })
        },
    //統計圖表
        count(index){
            axios({
            url:'http://localhost:8080/write/count',
            method:'POST',
            headers:{
                "Content-Type" : "application/json"
            },
            params:{
                quizNum:index
            },
            }).then(res=>{
                this.countArr=res
                //console.log(res)
                console.log(this.countArr)
            })
        },
//路由
        goAddQuiz(){
            this.$router.push('BackAdd')
        },
        goBackEntry(){
            this.backResultPage=false,
            this.backEntryPage=true
        },
    },
    components:{
        //VChart,
    },
    // setup(){
    //     provide(THEME_KEY, 'light');

    //     const option = ref({
    //     title: {
    //         text:'問卷名稱',
    //         left: 'center',
    //     },
    //     tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)',
    //     },
    //     // legend: {
    //     //     orient: 'vertical',
    //     //     left: 'center',
    //     //     data: [
    //     //         'Direct', 
    //     //         'Email', 
    //     //         'Ad Networks', 
    //     //         'Video Ads', 
    //     //         'Search Engines'
    //     //     ],
    //     // },
    //     series: [
    //         {
    //             type: 'pie',
    //             radius: '55%',
    //             center: ['50%', '60%'],
    //             data: [
    //                 { value: 335, name: 'Direct' },
    //                 // { value: 310, name: 'Email' },
    //                 // { value: 234, name: 'Ad Networks' },
    //                 // { value: 135, name: 'Video Ads' },
    //                 // { value: 1548, name: 'Search Engines' },
    //             ],
    //             emphasis: {
    //                 itemStyle: {
    //                     shadowBlur: 10,
    //                     shadowOffsetX: 0,
    //                     shadowColor: 'rgba(0, 0, 0, 0.5)',
    //                 },
    //             },
    //         },
    //     ],
    // });
    //     return{
    //         option,
    //         provide
    //     }
    // },
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
                <tbody>
                    <tr  v-for="(item,index) in this.arr">
                        <td>{{item.num}}</td>
                        <td>
                            <button type="button" @click="upData(index)" class="btn" data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal">{{ item.name }}
                            </button>
                        </td>
                        <td>
                            <span :style="{ color: getStatusColor(item.startDate, item.endDate) }">
                                {{ getStatus(item.startDate, item.endDate) }}
                            </span>
                        </td>
                        <td>{{ item.startDate }}</td>
                        <td>{{ item.endDate }}</td>
                        <td @click="goResult(item.num)">前往</td>
                        <td><i class="fa-solid fa-trash-can" @click="deleteQuiz(item.num)"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
<!-- 問卷結果顯示 -->
        <div class="result" v-if="backResultPage">
            <!-- icon區域 -->
            <div class="iconArea">
                <i class="fa-solid fa-chart-pie">回饋和統計</i>
            </div>
            <div class="feback">
                <table>
                    <tr>
                        <th>編號</th>
                        <th>姓名</th>
                        <th>填寫時間</th>
                        <th>回覆</th>
                    </tr>
                    <tr v-for="(item,index) in this.writerArr">
                        <td>{{ item.num }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.writeDateTime }}</td>
                        <td  @click="writer(index)" data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal1">觀看
                        </td>
                    </tr>
                </table>
            </div>
            <div class="caculate">
                <!-- <v-chart class="chart" :option="option" autoresize  /> -->
            </div>
            <!-- 按鍵區域 -->
            <div class="buttonArea">
                <button type="button" @click="goBackEntry()">返回</button>
            </div>
        </div>
    </div>

<!-- 編輯問卷Modal -->
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal" @click="edit()">確認修改</button>
                    </div>
                </div>
            </div>
        </div>

<!-- 回饋顯示Modal -->
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">回饋內容</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <!-- 問卷資訊 -->
                            <!-- <div class="quizInfo" v-for="(item,index) in this.arr" key="index">
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">問卷名稱 :</label>
                                    <p>{{ item.name }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">問卷說明 :</label>
                                    <p>{{ item.description }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">開始時間 :</label>
                                    <p>{{ item.startDate }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">結束時間 :</label>
                                    <p>{{ item.endDate }}</p>
                                </div>
                            </div> -->
                        <!-- 填答者資訊 -->
                            <div class="writerInfo">
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">姓名 : </label>
                                    <p>{{ this.writerInfoArr.name }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">手機 : </label>
                                    <p>{{ this.writerInfoArr.phone }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Email : </label>
                                    <p>{{ this.writerInfoArr.email }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">年齡 : </label>
                                    <p>{{ this.writerInfoArr.age }}</p>
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">回答 : </label>
                                    <p>{{ this.writerInfoArr.answer }}</p>
                                </div>

                            </div>

                        <!-- 題目和回答 -->
                            <!-- <div class="writerAnswer">
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">回答 : </label>
                                    <p>{{ this.writerAnswer.qNum }}</p>
                                </div>

                            </div>
                            <div class="queiont" v-for="(item,index) in this.upQuestionList">
                                <div class="num">第{{ index+1 }}題</div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">問題名稱 :</label>
                                        <p>{{ item.title }}</p>
                                    </div>
                                    <div class="mb-3">
                                        <select v-model="item.type" name="" id="" disabled>
                                            <option value="">請選擇</option>
                                            <option value="單選題">單選題</option>
                                            <option value="多選題">多選題</option>
                                            <option value="簡答題">簡答題</option>
                                        </select>
                                        <input type="checkbox" class="chBox" name="necessary" value="true" v-model="item.necessary" id="" disabled>
                                        <span>必填</span>
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label" v-for="(item,index) in this.writerArr">回答 :</label>
                                        <p>{{ item.optionList }}</p>
                                    </div>
                                    <hr>
                                </div> -->
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">關閉</button>
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
                margin-bottom: 5vmin;
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
            .buttonArea{
                width: 10vw;
                margin: auto;
                margin-top: 3vmin;
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
    .chart{
        height: 60vh;
    }
</style>