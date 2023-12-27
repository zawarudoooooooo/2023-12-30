<script>
import axios from 'axios';
export default{
    data(){
        return{
            searchStartDate:"",
            searchEndDate:"",
            searchText:"",
            arr:[],

            //分頁
            dataPages:[],
            dataArr:[],
            currentIndex:1,
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
                        quiz_name:"",
                        start_date: "",
                        end_date:"",
                    },
                }).then(res=>{
                    res.data.quizList.forEach(element => {
                        this.arr.push({name:element.name,description:element.description,startDate:element.startDate,endDate:element.endDate,is_published:element.published,question:element.questionStr,num:element.num})
                    });
                })
                console.log(this.arr)
    },
    created(){
        this.pagination(this.arr, 1)

    },
    methods:{
        search(){
            axios({
                    url:'http://localhost:8080/quiz/search',
                    method:'POST',
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    data:{
                        quiz_name:"",
                        start_date: "",
                        end_date:"",
                    },
                }).then(res=>console.log(res))

        },
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
        pagination(data,nowPage){
            const dataTotal = data.length;
            const pageData = 10;

            this.dataPages = [];
            const pageTotal = Math.ceil(dataTotal/pageData);
            for(let i = 1; i<=pageTotal ; i++){
                this.dataPages.push(i)
            }
            console.log(this.dataPages)
            console.log(`全部資料:${dataTotal} 每一頁顯示:${pageData}筆 總頁數:${pageTotal}`)

            let currentPage = nowPage;

            if(currentPage>pageTotal){
                currentPage = pageTotal;
            }

            const minData = (currentPage * pageData) - pageData;
            const maxData = (currentPage * pageData);

            this.dataArr = this.arr.slice(minData, maxData)

        },
        changePages(nowPage){
            this.pagination(this.arr, nowPage)
            this.currentPage = nowPage
        },
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
                <input type="text" v-model="this.searchText">
            </div>
<!-- 開始/結束時間 -->
            <div class="time">
                <p>開始時間 : </p>
                <input type="date" v-model="this.searchStartDate">
                <p>到</p>
                <input type="date" id="inputdate" v-model="this.searchEndDate">
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
            <tr v-for="(item,index) in this.arr">
                <td>{{index+1}}</td>
                <td>{{ item.name }}</td>
                <td>
                    <span :style="{ color: getStatusColor(item.startDate, item.endDate) }">
                                {{ getStatus(item.startDate, item.endDate) }}
                    </span>
                </td>
                <td>{{ item.startDate }}</td>
                <td>{{ item.endDate }}</td>
                <td @click="goFrontCaculate()">預設統計頁面</td>
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
</style>
