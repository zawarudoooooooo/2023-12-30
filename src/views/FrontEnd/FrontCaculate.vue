<script>
import axios from 'axios';
export default{
    data(){
        return{
            arr:[],

        }
    },
    mounted(){
        // axios({
        //             url:'http://localhost:8080/quiz/',
        //             method:'POST',
        //             headers:{
        //                 "Content-Type" : "application/json"
        //             },
        //             data:{
        //                 quiz_name:"",
        //                 start_date: "",
        //                 end_date:"",
        //             },
        //         }).then(res=>{
        //             res.data.quizList.forEach(element => {
        //                 this.arr.push({name:element.name,description:element.description,startDate:element.startDate,endDate:element.endDate,is_published:element.published,question:element.questionStr,num:element.num})
        //             });
        //         })
        //         console.log(this.arr)
    },
    methods:{
        goEntryPage(){
            this.$router.push('/')
        }
    },
}
</script>

<template>
        <div class="content">
<!-- 問卷時間 -->
        <div class="questionTime">
            <p>2023/12/25-2024/01/01</p>
        </div>
<!-- 問卷標題 -->
        <div class="questionTitle">
            <p>Title</p>
        </div>
<!-- 統計顯示區 -->
        <div class="caculate">

        </div>
<!-- 按鍵區域 -->
        <div class="buttonArea">
            <button type="button" @click="goEntryPage()">返回</button>
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
        }
//問卷時間
        .questionTime{
            font-size: 14pt;
            position: absolute;
            right: 2vmin;
            top: 1vmin;
        }        
//問卷標題
        .questionTitle{
            font-size: 36pt;
            margin-top: 2vmin;
        }
//統計顯示區
        .caculate{
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
            margin-top: 1vmin;

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