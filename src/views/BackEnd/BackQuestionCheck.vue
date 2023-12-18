<script>
export default{
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>

<template>
    <div class="content">
<!-- 問卷標題 -->
        <div class="questionnaireTitle">
            <p>Title</p>
        </div>
<!-- 問卷說明 -->
        <div class="questionnaireDescription">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aut tempora illo ipsa a dolorum!</p>
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
        <div class="questionnaire">

        </div>
<!-- 按鍵區域 -->
        <div class="buttonArea">
            <button type="button">僅儲存</button>
            <button type="button" id="saveAndPostBtn">儲存並發布</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        width: 80vw;
        margin: auto;
        margin-top: 10vmin;
        border: 1px black solid;

        p{
            color: dimgray;
            text-align: center;
        }
//問卷標題
        .questionnaireTitle{
            font-size: 36pt;
        }
//問卷說明
        .questionnaireDescription{
            width: 70vw;
            height: 20vh;
            font-size: 16pt;
            border: 1px solid black;
            margin: auto;
            margin-bottom: 3vmin;
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

            #saveAndPostBtn{
                width: 7vw;
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