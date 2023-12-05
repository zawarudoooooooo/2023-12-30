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
    }
</script>

<template>
    <div class="content">
<!-- 導覽與頁籤 -->
        <div class="backNavArea">
            <BackNav />
        </div>
<!-- 統計結果顯示區域 -->
        <div class="caculateShow">
<!-- 目前位置標示 -->
            <div class="location">
                <i class="fa-solid fa-thumbtack"></i>
                <p>統計結果</p>
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
//統計結果顯示區域
        .caculateShow{
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
        }
    }
</style>