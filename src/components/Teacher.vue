<template>
    <div>
        <header>
            <h1>
                IT技術者養成サイト（講師）
            </h1>
            <div>
                
            </div>
        </header>

        <div v-cloak>

            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" id="document-tab" data-toggle="tab" href="#document">資料</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="text-disp-tab" data-toggle="tab" href="#text-disp">教材管理</a>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link" id="answer-tab" data-toggle="tab" href="#answer" role="tab" aria-controls="profile" aria-selected="false">
                        模範解答
                    </a>
                </li> -->
                <li class="nav-item">
                    <a class="nav-link" id="answer-tab2" href="#answer2">
                        模範解答
                    </a>
                </li>

                <li v-for="(table, index) in tableList" v-bind:key="'table-'+index" class="nav-item">
                    <!-- <a class="nav-link" v-bind:id="table.table_name+'-tab'" v-bind:href="'#'+table.table_name">
                        {{ table.table_comment }}
                    </a> -->
                    <router-link v-bind:to="table.table_name">{{ table.table_comment }}</router-link>
                </li>

                <li v-for="(calendar, index) in calendarList" v-bind:key="'calendar'+index" class="nav-item">
                    <a class="nav-link" v-bind:id="calendar.table_name+'-tab'" v-bind:href="'#'+calendar.table_name">
                        {{ calendar.table_comment }}
                    </a>
                </li>
                <li>
                    <router-link to="/csvlist/qa">QA
                    </router-link>
                </li>
            </ul>

            <div class="tab-content">
                <!-- 資料 -->
                <div class="tab-pane fade show active" id="document" role="tabpanel" aria-labelledby="document-tab">
                    <br>
                    <details>
                        <summary>
                            沖縄研修用
                        </summary>
                        <br>
                        <ul>
                            <li>
                                <a href="./template/yuru/kensyu-junbi.php" target="_blank">研修始まる前の準備作業</a>
                            </li>
                            <br>
                            <li>
                                <a href="./template/yuru/daily-schedule.php" target="_blank">1日の流れ</a>
                            </li>
                            <br>
                            <li>
                                <a href="./template/yuru/assistant.php" target="_blank">アシスタントの作業</a>
                            </li>
                            <br>
                            <li>
                                <a href="./template/yuru/report-point.php" target="_blank">報告書作成のポイント</a>
                            </li>
                            <br>
                        </ul>
                        
                    </details>
                    <br>
                    <details>
                        <summary>
                            評価用資料
                        </summary>
                        <br>
                        <ul>
                            <li>
                                週報<br>
                                <a href="./text/講師用/評価用資料/研修週報_原紙_個別指導用.xlsx" target="_blank">週報（個別指導用）</a><br>
                            </li>
                            <br>
                            <li>
                                3分間スピーチ<br>
                                <a href="./text/講師用/評価用資料/○○教室_株式会社○○○○様_3分間スピーチ評価表.xlsx" target="_blank">3分間スピーチ評価表 テンプレ</a><br>
                                <a href="./text/講師用/評価用資料/日本橋A教室_株式会社○○○○様_3分間スピーチ評価表.xlsx" target="_blank">3分間スピーチ評価表 サンプル</a>
                            </li>
                            <br>
                            <li>
                                研修評価管理ブック<br>
                                <a href="./text/講師用/評価用資料/2020_○○教室_研修評価管理ブック_A・Bコース.xlsm" target="_blank">研修評価管理ブック A・Bコース</a><br>
                                <a href="./text/講師用/評価用資料/2020_○○教室_研修評価管理ブック_Cコース.xlsm" target="_blank">研修評価管理ブック Cコース</a><br>
                                <a href="./text/講師用/評価用資料/2020_○○教室_研修評価管理ブック_記入例.xlsm" target="_blank">研修評価管理ブック 記入例</a><br>
                                <a href="./text/講師用/評価用資料/研修評価管理ブック_補足.pdf" target="_blank">補足</a><br>
                            </li>
                            <br>
                            <li>
                                一括ダウンロード<br>
                                <a href="./text/講師用/講師用.zip" target="_blank">講師用資料</a>
                            </li>
                        </ul>
                    </details>
                    <br>
                    <details>
                        <summary>
                            指導要領
                        </summary>
                        <br>
                        <ul>
                            <li>
                                <a href="./text/講師用/指導要領/べからず集.pdf" target="_blank">べからず集</a><br>
                            </li>
                            <br>
                            <li>
                                <a href="./text/講師用/指導要領/べし集.pdf" target="_blank">べし集</a><br>
                            </li>
                        </ul>
                    </details>
                    <br>
                    <details>
                        <summary>
                            テクニカル研修用資料
                        </summary>
                        <br>
                        <ul>
                            <li>
                                グループ開発関連資料<br>
                                <a href="./text/講師用/テクニカル研修資料/group開発/review観点.pdf" target="_blank">レビュー観点</a><br>
                                <a href="./text/講師用/テクニカル研修資料/group開発/group開発について(講師用).pdf" target="_blank">グループ開発について（講師用）</a><br>
                                <a href="./text/講師用/テクニカル研修資料/group開発/課題一覧.pdf" target="_blank">課題一覧</a><br>
                            </li>
                            <br>
                            <li>
                                AWSサーバー構築マニュアル（グループ開発用）<br>
                                <a href="./text/講師用/テクニカル研修資料/講師向けサーバー構築マニュアル/サーバー構築手順（共通）.html" target="_blank">サーバー構築手順（共通）</a><br>
                                <a href="./text/講師用/テクニカル研修資料/講師向けサーバー構築マニュアル/サーバー構築手順（グループ単位）.html" target="_blank">１グループ１インスタンスVer</a><br>
                                <a href="./text/講師用/テクニカル研修資料/講師向けサーバー構築マニュアル/サーバー構築手順（教室単位）.html" target="_blank">１教室１インスタンスVer（Dcoker使用）</a><br>
                            </li>
                        </ul>

                    </details>
                </div>
                <router-view />

                <!-- 教材管理 -->
                <!-- <div class="tab-pane fade " id="text-disp" role="tabpanel" aria-labelledby="text-disp-tab">
                    <custom-switch-list select-table-name="AccountRoom" list-table-name="SubjectDisp" account-id="<?php echo $_SESSION['user']['id'] ?>" flg-name1="表示" flg-name2="非表示"></custom-switch-list>
                </div> -->
            
                <!-- 模範解答 -->
                <!-- <div class="tab-pane fade" id="answer2" role="tabpanel" aria-labelledby="answer-tab2">
                    <custom-switch-list select-table-name="AccountRoom" list-table-name="AnswerDisp" account-id="<?php echo $_SESSION['user']['id'] ?>" flg-name1="表示" flg-name2="非表示"></custom-switch-list>
                </div> -->

                <!-- 
                <div v-for="(table, index) in tableList" v-bind:key="index" class="tab-pane fade" v-bind:id="table.table_name" role="tabpanel" v-bind:aria-labelledby="table.table_name+'-tab'">
                    <custom-list-csv v-bind:title="table.table_comment" v-bind:table-name="table.table_name" account-id="<?php echo $_SESSION['user']['id'] ?>"></custom-list-csv>
                </div>
                -->

                <!-- <div v-for="(calendar, index) in calendarList" v-bind:key="index" class="tab-pane fade" v-bind:id="calendar.table_name" role="tabpanel" v-bind:aria-labelledby="calendar.table_name+'-tab'">
                    <custom-calendar v-bind:table-comment="calendar.table_comment" v-bind:table-name="calendar.table_name" account-id="<?php echo $_SESSION['user']['id'] ?>"></custom-calendar>
                </div> -->

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            tableList: [],
            calendarList: [],
        }
    },
    methods: { 
        getUseTableList() {
            let params = new URLSearchParams();
            params.append('account_level', 2);
            params.append('type', 1); // マスタ
            // axios.post('./getUseTableList', params)
            // .then(res => this.tableList = res.data);
            fetch('http://localhost:8888/axiz-php/getUseTableList', {
                method: 'post',
                body: params,
            })
            .then(response => response.json()
                .then(json => this.tableList = json))
            .catch(error => console.log(error))

            params = new URLSearchParams();
            params.append('account_level', 2);
            params.append('type', 2); // カレンダー
            // axios.post('./getUseTableList', params)
            //  .then(res => this.calendarList = res.data);
            fetch('http://localhost:8888/axiz-php/getUseTableList', {
                method: 'post',
                body: params,
            })
            .then(response => response.json()
                .then(json => this.calendarList = json))
            .catch(error => console.log(error))
        },
    },
    created: function() {
        this.getUseTableList();
    }
}
</script>