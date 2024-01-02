<script>
import axios from 'axios';
export default{
    data(){
        return{
            //模糊搜尋
            name:"",
            startDate:"",
            endDate:"",
            isLogin:false,

            //writer
            writerName:"",
            writerPhone:"",
            writerEmail:"",
            writerAge:"",
            writerAnswer:[],

            //問卷顯示
            upNum:0,
            upName:"",
            upStartDate:"",
            upEndDate:"",
            upDescription:"",
            upQuestionList:"",

            //分頁
            dataPages:[],
            dataArr:[],
            currentIndex:1,

            arr:[],

            obj:[]
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
                is_login:false,
            },
        }).then(res=>{
            this.arr.push(res.data.quizList)
            //console.log(this.arr);
            })
            //console.log(this.arr);
        
    },
    // created(){
    //     this.pagination(this.arr, 1)
    // },
    methods:{
//抓取問卷個別頁面
        upData(index){
            this.arr.forEach(arr=>{
                // console.log(arr);
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
            this.upQuestionList.forEach(item=>{
                this.obj.push(item.option.split(";"))
            })
            //console.log(this.obj);
            // console.log(this.upQuestionList);
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
//填寫問卷
        write(){
            const test = document.querySelectorAll('.radio')
            const test1 = document.querySelectorAll('.checkbox')
            const test2 = document.querySelectorAll('.textarea')

            this.writerAnswer = []

            //console.log(this.obj)
            //console.log(this.upQuestionList)

            this.upQuestionList.forEach(item=>{
                //console.log(item)
                console.log(item.option)
                this.obj.forEach(opp=>{
                    //console.log(item1)
                    //console.log(this.obj)
                    console.log(opp)
                  
                    if(item.option!=opp){
                        return
                    }
                    item.option=opp
                    console.log(opp)
                    //console.log(item.option)
                    
                })
            })
            // this.upQuestionList.forEach(item=>{
            //     this.obj.forEach(item1=>{
            //         if(item.option!=item1){
            //             return
            //         }
            //         console.log(obj)
            //         console.log(item.option)
            //     })
            // })


            //.upQuestionList.forEach(item=>{
                //this.obj.forEach(obj=>{
                    //if(item.option!=obj){
                       // return
                    //}
                    //console.log(obj);
                    //console.log(item.option);
                    // item.option=test
                //})
                // console.log(item);
            //})

            test.forEach((test,testIndex)=>{
                if(test.checked){
                    this.upQuestionList.forEach((question,questionIndex)=>{
                        console.log();
                        if(question.type==='單選題'){
                            const optValues = Object.values(question.option);
                            this.writerAnswer.push({qNum:questionIndex+1,optionList:[optValues[testIndex]]});
                        }
                    })
                }
            })

            test1.forEach((test1,test1Index)=>{
                if(test1.checked){
                    this.upQuestionList.forEach((question,questionIndex)=>{
                        console.log();
                        if(question.type==='多選題'){
                            const optValues = Object.values(question.option);
                            this.writerAnswer.push({qNum:questionIndex+1,optionList:[optValues[test1Index]]});
                        }
                    })
                }
            })

            test2.forEach((test2,test2Index)=>{
                if(test2.checked){
                    this.upQuestionList.forEach((question,questionIndex)=>{
                        console.log();
                        if(question.type==='簡答題'){
                            const optValues = Object.values(question.option);
                            this.writerAnswer.push({qNum:questionIndex+1,optionList:[optValues[test2Index]]});
                        }
                    })
                }
            })
            



            // axios({
            // url:'http://localhost:8080/quiz/write',
            // method:'POST',
            // headers:{
            //     'Content-Type':'application/json'
            // },
            // data:{
            //     quiz_num:this.upNum,
            //     name:this.writerName,
            //     phone:this.writerPhone,
            //     email:this.writerEmail,
            //     age:this.writerAge,
            //     answer:this.writerAnswer,
            // },
            // }).then(res=>{

            // })

        },
//抓狀態
        getStatus(startTime, endTime) {
            const now = new Date();
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);

            if (now < startDate) {
                return '尚未開始';
            } else if (now >= startDate && now <= endDate) {
                return '進行中';
            } else {
                return '已結束';
            }
        },
//狀態顯示顏色
        getStatusColor(startTime, endTime) {
            const status = this.getStatus(startTime, endTime);

            if (status === '尚未開始') {
                return 'orange'; // 设置尚未开始状态的文字颜色为橙色
            } else if (status === '進行中') {
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
        goQuestionPage(){
            this.$router.push('/FrontQuestion')
        },
        goFrontCaculate(){
            this.$router.push('/FrontCaculate')
        },
//頁面
        // pagination(data,nowPage){
        //     const dataTotal = data.length;
        //     const pageData = 10;

        //     this.dataPages = [];
        //     const pageTotal = Math.ceil(dataTotal/pageData);
        //     for(let i = 1; i<=pageTotal ; i++){
        //         this.dataPages.push(i)
        //     }
        //     console.log(this.dataPages)
        //     console.log(`全部資料:${dataTotal} 每一頁顯示:${pageData}筆 總頁數:${pageTotal}`)

        //     let currentPage = nowPage;

        //     if(currentPage>pageTotal){
        //         currentPage = pageTotal;
        //     }

        //     const minData = (currentPage * pageData) - pageData;
        //     const maxData = (currentPage * pageData);

        //     this.dataArr = this.arr.slice(minData, maxData)

        // },
        // changePages(nowPage){
        //     this.pagination(this.arr, nowPage)
        //     this.currentPage = nowPage
        // },
    },
}
</script>

<template>
    <div class="content">
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
            <tbody v-for="item in this.arr">
                <tr  v-for="(item1,index) in item">
                    <td>{{index+1}}</td>
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
                    <td @click="goFrontCaculate()">預設統計頁面</td>
                </tr>
            </tbody>
        </table>
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
                                <label for="recipient-name" class="col-form-label">姓名 :</label>
                                <input type="text" v-model="this.writerName" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">電話 :</label>
                                <input type="text" v-model="this.writerPhone" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">E-mail :</label>
                                <input type="text" v-model="this.writerEmail" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">年齡 :</label>
                                <input type="text" v-model="this.writerAge" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">問卷名稱 :</label>
                                <input type="text" v-model="this.upName" class="form-control" id="recipient-name" disabled>
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">問卷說明 :</label>
                                <textarea v-model="this.upDescription" class="form-control" id="message-text" disabled></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">開始時間 :</label>
                                <input type="date" v-model="this.upStartDate" class="form-control" id="recipient-name" disabled>
                            </div>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">結束時間 :</label>
                                <input type="date" v-model="this.upEndDate" class="form-control" id="recipient-name" disabled>
                            </div>
                            <div class="queiont" v-for="(item,index) in upQuestionList">
                                <div class="num">第{{ index+1 }}題</div>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">問題名稱 :</label>
                                        <input type="text" v-model="item.title" class="form-control" id="recipient-name" disabled>
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
                                            <label for="message-text" class="col-form-label">回答:</label>
                                            <div class="answer" v-for="op in item.option.split(';')">
                                                <input type="radio" name="單選題" id="" v-if="item.type=='單選題'" class="radio">
                                                <input type="checkbox" name="多選題" id="" v-if="item.type=='多選題'" class="checkbox">
                                                <textarea name="簡答題" id="textinput" v-if="item.type=='簡答題'" placeholder="請輸入簡答題答案" class="textarea"></textarea>
                                                <span>{{ op }}</span>
                                            </div>
                                    </div>
                                    <hr>
                                </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-light"  @click="write()">填寫</button>
                    </div>
                </div>
            </div>
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
        resize: none;
    }
</style>
