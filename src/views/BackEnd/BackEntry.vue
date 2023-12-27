<script>
import axios from 'axios';
export default{
    data(){
        return{
            arr:[],

        }
    },
    mounted(){
        axios({
                url:'http://localhost:8080/quiz/getAll',
                method:'GET',
                headers:{
                    "Content-Type" : "application/json"
                },
                data:{
                    num: "",
                    name: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    questionStr: "",
                    published: ""
                },
            }).then(res=>{
                res.data.quizList.forEach(element => {
                    this.arr.push({name:element.name,description:element.description,startDate:element.startDate,endDate:element.endDate,is_published:element.published,question:element.questionStr,num:element.num})
                });
            })
            console.log(this.arr)
    },
    methods:{
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
        addQuiz(){
            this.$router.push('BackAdd')
        },
        goFeback(){
            this.$router.push('/BackFeback')
        },
        goBackCaculate(){
            this.$router.push('/BackCaculate')
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
<!-- icon區域 -->
        <div class="iconArea">
            <i class="fa-solid fa-plus" @click="addQuiz()"></i>
            <i class="fa-solid fa-comments" @click="goFeback()"></i>
            <i class="fa-solid fa-chart-simple" @click="goBackCaculate()"></i>
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
                <td>前往</td>
                <td><i class="fa-solid fa-trash-can"></i></td>
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
</style>