<script>
    export default{
        data(){
            return{

            }
        },
        components:{
        },
    }
</script>

<template>
    <div class="content">
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
        width: 100vw;
        display: flex;
        justify-content: center;
//統計結果顯示區域
        .caculateShow{
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