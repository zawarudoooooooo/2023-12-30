<script>
export default{
    data(){
        return{

        }
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
                <input type="text">
            </div>
            <!-- 開始/結束時間 -->
            <div class="time">
                <p>統計時間 : </p>
                <input type="date">
                <p>到</p>
                <input type="date">
                <button type="button">搜尋</button>            
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
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    .content{
        .searchArea{
            width: 80vw;
            height: 40vh;
            margin: auto;
            border-radius: 10px;
            border: 2px solid #9D9D9D;
            box-shadow: 1px 1px 1px lightgray;

            p{
                color: #9D9D9D;
            }

            .questionnaire{
                display: flex;
            }
        }
    }
</style>
