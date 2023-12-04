<script>
import BackNav from '../../components/BackNav.vue';
    export default{
        data(){
            return{

            }
        },
        components:{
            BackNav
        }
    }
</script>

<template>
    <div class="content">
        <div class="backNavArea">
<!-- 導覽與頁籤 -->
            <BackNav />
        </div>

<!-- 新增問卷內頁 -->
        <div class="addQuestionnaire">
            <div class="addName">
                <p>問卷名稱 : </p>
                <input type="text">
            </div>
            <div class="addDescription">
                <p>問卷說明 : </p>
                <textarea></textarea>
            </div>
            <div class="addStartTime">
                <p>開始時間 : </p>
                <input type="date">
            </div>
            <div class="addEndTime">
                <p>結束時間 : </p>
                <input type="date">
            </div>
            <div class="addButtonArea">
                <button type="button">取消</button>
                <button type="button">下一步</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .content{
        //border: 1px solid black;
        display: flex;
        margin-top: 10vmin;
        //justify-content: space-around;

        .backNavArea{
            margin-left: 40vmin;
            margin-top: 15vmin;
            //border: 1px solid black;
        }

        .addQuestionnaire{
        width: 50vw;
        height: 70vh;
        margin: auto;
        margin-top: 12vmin;
        //border: 1px black solid;

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

        .addName{
            display: flex;
            margin-bottom: 2vmin;
        }

        .addDescription{
            display: flex;
            margin-bottom: 3vmin;
        }

        .addStartTime{
            display: flex;
            margin-bottom: 2vmin;
        }

        .addEndTime{
            display: flex;
            margin-bottom: 2vmin;
        }

        .addButtonArea{
            display: flex;
        }

        .addButtonArea{
            width: 48vw;
            margin-top: 5vmin;
            justify-content: center;
            align-items: center;


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