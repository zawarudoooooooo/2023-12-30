<script>
import BackNav from '../../components/BackNav.vue';
    export default{
        data(){
            return{

            }
        },
        components:{
            BackNav
        },
        methods:{
            goTopicPage(){
                this.$router.push('/BackTopic')
            },
            goBackEntryPage(){
                this.$router.push('/BackEntry')
            }
        }
    }
</script>

<template>
    <div class="content">
<!-- 導覽與頁籤 -->
        <div class="backNavArea">
            <BackNav />
        </div>

<!-- 新增問卷內頁 -->
        <div class="addQuestionnaire">
<!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>新增問卷</p>
            </div>
<!-- 新增問卷名稱 -->
            <div class="addName">
                <p>問卷名稱 : </p>
                <input type="text">
            </div>
<!-- 新增問卷說明 -->
            <div class="addDescription">
                <p>問卷說明 : </p>
                <textarea></textarea>
            </div>
<!-- 新增問卷開始時間 -->
            <div class="addStartTime">
                <p>開始時間 : </p>
                <input type="date">
            </div>
<!-- 新增問卷結束時間 -->
            <div class="addEndTime">
                <p>結束時間 : </p>
                <input type="date">
            </div>
<!-- 按鍵區域 -->
            <div class="addButtonArea">
                <button type="button" @click="goBackEntryPage()">取消</button>
                <button type="button" @click="goTopicPage()">下一步</button>
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
        .addQuestionnaire{
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

        textarea{
            width: 40vw;
            height: 20vh;
            outline: none;
            margin-left: 1vmin;
            border-radius: 10px;
            padding-left: 1vmin;
            border: 2px solid #9D9D9D;
        }
//新增問卷名稱
        .addName{
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
//按鍵區域
        .addButtonArea{
            width: 48vw;
            margin-top: 5vmin;
            justify-content: center;
            align-items: center;
            display: flex;

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
    }
</style>