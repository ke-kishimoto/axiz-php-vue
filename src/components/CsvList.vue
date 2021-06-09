<template>
    <div @click.self="closeModal">
        <div class="head">
            <div>
                <button class="btn btn-primary my-2" @click="showModal(tableName+'-regist-modal')">登録</button>
                <button class="btn btn-primary my-2" @click="showModal(tableName+'-csv-modal')">CSV取込</button>
                <button class="btn btn-primary my-2" @click="showModal(tableName+'-csv-download-modal')">CSV出力</button>
            </div>
            <div class="search">
            <select v-model="whereColumn">
                <option value="">絞り込み項目</option>
                <option v-for="column in columnList" v-bind:key="column.column_name" v-bind:value="column.column_name">{{ column.column_comment }}</option>
            </select>
            <input type="text" v-model="whereValue">
                <select v-model="order">
                    <option value="">並び替え項目</option>
                    <option v-for="column in columnList" v-bind:key="column.column_name" v-bind:value="column.column_name">{{ column.column_comment }}</option>
                </select>
                <select v-model="orderOption">
                    <option value="">並び順</option>
                    <option value="asc">昇順</option>
                    <option value="desc">降順</option>
                </select>
                <input type="text" placeholder="フリーワード検索" v-model="keyword">
                <button class="btn btn-primary my-2" @click="search">検索</button>
                <button class="btn btn-danger my-2" @click="bulkDelete">削除</button>
            </div>
        </div>
        <span>{{ msg }}</span>
        <!-- 一覧表 -->
        <table class="table table-bordered">
            <tr>
                <th v-for="column in columnList" v-bind:key="column.column_name">
                    <template v-if="column.column_name !== 'id' && column.column_name !== 'account_id'">
                        {{ column.column_comment }}
                    </template>
                </th>
                <th>更新</th>
                <th>削除</th>
            </tr>
            <tr v-for="data in list" v-bind:key="data.id">
                <td v-for="column in columnList" v-bind:key="column.column_name">
                    <template v-if="column.column_name !== 'id'">
                        <pre>{{ data[column.column_name] }}</pre>
                    </template>
                </td>
                <td>
                    <button v-if="accountId == data.account_id" class="btn btn-primary" @click="edit(data)">更新</button>
                    <button v-else class="btn btn-secondary" @click="view(data)">参照</button>
                </td>
                <td><input type="checkbox" v-model="idList" v-bind:value="data.id"></td>
            </tr>
        </table>
        <!-- CSV取込用 モーダルウィンドウ -->
        <modal :name="tableName+'-csv-modal'" :scrollable="true" height="auto">
            <div class="container">
                <h2>CSV取込</h2>
                <input type="file" name="fname" @change="selectedFile">
                <div class="modal-btn">
                    <button class="btn btn-primary my-2" @click="upload">CSV取込</button>
                    <button class="btn btn-primary my-2" @click="closeModal(tableName+'-csv-modal')">閉じる</button>
                </div>
            </div>
        </modal>
        <!-- CSV出力用 モーダルウィンドウ -->
        <modal :name="tableName+'-csv-download-modal'" :scrollable="true" height="auto">
            <div class="container">
                <h2>CSV出力</h2>
                <h4>CSVヘッダー</h4>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="csv-header" id="csv-head1" v-model="csvHeadType" value="disp">
                    <label class="form-check-label" for="csv-head1">
                        表示名
                    </label> 
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="csv-header" id="csv-head2" v-model="csvHeadType" value="column">
                    <label class="form-check-label" for="csv-head2">
                        カラム名
                    </label>
                </div>
                <br>
                <h4>出力項目</h4>
                <div v-for="column in columnList" v-bind:key="column.column_name" class="form-check">
                    <input class="form-check-input" type="checkbox" v-bind:value="column.column_name" v-model="csvOutputColumn">
                    <label class="form-check-label" v-bind:for="column.columun_name">
                        {{ column.column_comment }}
                    </label>
                </div>
                <div class="modal-btn">
                    <button class="btn btn-primary my-2" @click="downloadCSV">CSV出力</button>
                    <button class="btn btn-primary my-2" @click="closeModal(tableName+'-csv-download-modal')">閉じる</button>
                </div>
            </div>
        </modal>
        <!-- 登録用 モーダルウィンドウ -->
        <modal :name="tableName+'-regist-modal'" :scrollable="true" height="auto">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h2 v-if="createFlg">{{ title }}登録</h2>
                        <h2 v-else>{{ title }}更新</h2>
                    </div>

                    <div class="card-text">
                        <div v-for="column in columnList" v-bind:key="column.column_name">
                            <template v-if="column.column_name !== 'id' && column.column_name !== 'account_id' && column.column_name !== 'account_name'" class="form-group">
                                <label v-bind:for="column.column_name">{{column.column_comment}}</label>
                                <input v-if="column.input_type === 'text'" :list="column.column_name" class="form-control" v-model="form[column.column_name]" v-bind:maxlength="column.character_maximum_length">
                                <datalist v-if="column.column_name.indexOf('category') >= 0" :id="column.column_name">
                                    <option v-for="category in categoryList[column.column_name]" v-bind:key="category.category_value" :value="category['category_value']"></option>
                                </datalist>
                                <textarea v-if="column.input_type === 'textarea'" class="form-control" v-model="form[column.column_name]" v-bind:maxlength="column.character_maximum_length" rows="7"></textarea>
                            </template>
                        </div>
                        <div class="modal-btn">
                            <div>
                                <button v-if="createFlg" class="btn btn-primary my-2" @click="register('insert')">登録</button>
                                <div v-else>
                                    <button class="btn btn-primary my-2" @click="register('update')">更新</button>
                                    <button class="btn btn-danger my-2" @click="deleteRecord">削除</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        <!-- 参照用 モーダルウィンドウ -->
        <modal :name="tableName+'-view-modal'" :scrollable="true" height="auto">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h2>{{ title }}</h2>
                    </div>
                    <div class="card-text">
                        <div v-for="column in columnList" v-bind:key="column.column_name">
                            <template v-if="column.column_name !== 'id' && column.column_name !== 'account_id' && column.column_name !== 'account_name'">
                            <span class="text-muted">{{ column.column_comment }}</span>
                            <p>
                                <pre>{{ form[column.column_name] }}</pre>
                            </p>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name: 'CsvList',
    props: ['title', 'tableName', 'accountId'],
    data: function() {
        return {
            columnList: [],
            list: [],
            keyword: '',
            order: '',
            orderOption: '',
            form: {
                id: '',
            },
            editId: -1,
            createFlg: true,
            idList: [],
            msg: '',
            uploadFile: null,
            csvHeadType: 'disp',
            csvOutputColumn: [],
            categoryList: [],
            whereColumn: '',
            whereValue: '',
        }
    },
    methods: {
        showModal(modalName) {
            this.createFlg = true;
            this.getCategoryList();
            this.resetForm();
            this.$modal.show(modalName);
        },
        closeModal(modalName) {
            this.$modal.hide(modalName);
        },
        resetForm() {
            Object.keys(this.form).forEach(key => {
                this.form[key] = '';
            })
        },
        search() {
            let params = new URLSearchParams();
            params.append('tableName', this.tableName);
            params.append('whereColumn', this.whereColumn);
            params.append('whereValue', this.whereValue);
            params.append('keyword', this.keyword);
            let order = this.order !== '' ? this.order + ' ' + this.orderOption : '';
            params.append('order', order);
            axios.post('./searchList', params)
                .then(res => {
                    if(res.status !== 200) {
                        console.log(res.data);
                    } else {
                        this.list = res.data
                    }
                })
                .catch(errors => console.log(errors))
        },
        register(type) {
            //Axiosを使ったAJAX
            //vueでバインドされた値はmethodの中ではthisで取得できる
            let params = new URLSearchParams();
            params.append('tableName', this.tableName);
            params.append('type', type);
            Object.keys(this.form).forEach(key => {
                if(!(type === 'insert' && key === 'id') && key !== 'account_name') {
                    params.append(key, this.form[key]);
                }
            })
            params.append('account_id', this.accountId);
            //Ajaxリクエスト
            axios.post('./updateRecord', params)
                .then(res => {
                    if(res.status !== 200) {
                        console.log(res.data);
                    } else {
                        this.search();
                    }
                })
                .catch(errors => console.log(errors));
                this.$modal.hide(this.tableName+'-regist-modal');
                this.resetForm();
        },
        edit(data) {
            this.createFlg = false;
            this.editId = data.id;
            this.getCategoryList();
            this.form = Object.assign({}, data);
            this.$modal.show(this.tableName+'-regist-modal');
        },
        view(data) {
            this.form = Object.assign({}, data);
            this.$modal.show(this.tableName+'-view-modal');
        },
        deleteRecord() {
            const ans = confirm('削除してよろしいですか');
            if(!ans) return;
            params = new URLSearchParams();
            params.append('tableName', this.tableName);
            params.append('id', this.form.id);
            axios.post('./deleteById', params)
                .then(res => this.search())
                .catch(errors => console.log(errors))
            this.$modal.hide(this.tableName+'-regist-modal');
            this.resetForm();

        },
        bulkDelete() {
            const ans = confirm('削除してよろしいですか');
            if(!ans) return;
            params = new URLSearchParams();
            params.append('tableName', this.tableName);
            params.append('idList', this.idList);
            axios.post('./bulkDelete', params)
                .then(res => this.search())
                .catch(errors => console.log(errors))
        },
        selectedFile: function(e) {
            // 選択された File の情報を保存しておく
            e.preventDefault();
            let files = e.target.files;
            this.uploadFile = files[0];
        },
        upload: function() {
            // FormData を利用して File を POST する
            let formData = new FormData();
            formData.append('csvfile', this.uploadFile);
            formData.append('tableName', this.tableName);
            let config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            axios
                .post('./uploadCSV', formData, config)
                .then(res => {
                    if(res.status !== 200) {
                        console.log(res.data);
                    } else if(res.data.err_msg !== '') {
                        this.msg = res.data.err_msg
                    } else {
                        this.msg = res.data.cnt + '件登録';
                        this.search();
                    }
                    this.uploadFile = null;
                })
                .catch(error => {
                    console.log(error);
                })
                this.$modal.hide(this.tableName + '-csv-modal');
        },
        downloadCSV() {
            params = new URLSearchParams();
            params.append('tableName', this.tableName);
            params.append('csvHeadType', this.csvHeadType);
            params.append('csvOutputColumn', this.csvOutputColumn);
            axios.post('./getCSV', params)
                .then(res => {
                    csv = res.data
                    let blob = new Blob([csv], { type: 'text/csv' })
                    let link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = this.tableName + '.csv'
                    link.click()
                })
                .catch(error => { console.log(error) })
            this.$modal.hide(this.tableName+'-csv-download-modal');
        },
        getCategoryList() {
            params = new URLSearchParams();
            params.append('tableName', this.tableName);
            axios.post('./getCategoryList', params)
            .then(res => {
               this.categoryList = res.data;
            })
            .catch(error => console.log(error))
        },
    },
    created: function() {
        this.search();
        params = new URLSearchParams();
        params.append('tableName', this.tableName);
        axios.post('./getColumnList', params)
        .then(res => {
            this.columnList = res.data;
            res.data.forEach(element => {
                if(element['column_name'] !== 'account_name') {
                    this.form[element['column_name']] = '';
                }
            })
        })
        .catch(errors => console.log(errors))
    }
}
</script>