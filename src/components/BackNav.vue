<script>
    export default{
        data(){
            return{

            }
        },
        methods:{
            goAddPage(){
                this.$router.push('BackAdd')
            },
            goTopicPage(){
                this.$router.push('BackTopic')
            }
        }
    }

</script>


<template>
    <nav>
        <div class="questionnaire">
            <button type="button" @click="goAddPage()"><i class="fa-solid fa-clipboard-list"></i>問卷</button>
        </div>
        <div class="topic">
            <button type="button" @click="goTopicPage()"><i class="fa-solid fa-list-check"></i>題目</button>
        </div>
        <div class="feeback">
            <button type="button"> <i class="fa-solid fa-comments"></i>問卷回饋</button>
        </div>
        <div class="caculate">
            <button type="button"><i class="fa-solid fa-chart-simple"></i>統計</button>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    nav{
        color: #9D9D9D;
        font-size: 16pt;

        i{
            font-size: 14pt;
            margin-right: 1vmin;
        }


        button{
                width: 10vw;
                height: 5vh;
                color: dimgray;
                //margin-left: 2vmin;
                border-style: none;
                border-radius: 5px;
                background-color: #F8F0DF;
                box-shadow: 1px 1px 1px lightgray;
                margin-bottom: 3vmin;

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


</style>