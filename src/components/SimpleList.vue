<template>
    <div>
        <div class="head">
            <div>
                <button class="btn btn-primary my-2" @click="showModal('regist-modal-'+tableName)">登録</button>
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
                <th v-for="column in columnList" v-bind:key="column.ordinal_position">
                    <template v-if="column.column_name !== 'id' && column.column_name !== 'account_id'">
                        {{ column.column_comment }}
                    </template>
                </th>
                <th>更新</th>
                <th>削除</th>
            </tr>
            <tr v-for="data in list" v-bind:key="data.id">
                <td v-for="column in columnList" v-bind:key="column.ordinal_position">
                    <template v-if="column.column_name !== 'id' && column.column_name !== 'account_id'">
                        {{ data[column.column_name] }}
                    </template>
                </td>
                <th><button class="btn btn-primary" @click="edit(data)">更新</button></th>
                <th><input type="checkbox" v-model="idList" v-bind:value="data.id"></th>
            </tr>
        </table>
        
        <modal v-bind:name="'regist-modal-'+tableName" :scrollable="true" height="auto">
            <div class="card">
                <div class="card-body">
                    <div class="card-title">
                        <h2 v-if="createFlg">{{ title }}登録</h2>
                        <h2 v-else>{{ title }}更新</h2>
                    </div>
                    <span class="error">{{ errMsg }}</span>
                    <div class="card-text">
                        <div v-for="column in modalColumnList" v-bind:key="column.ordinal_position" class="form-group">
                            <template v-if="column.column_name !== 'id' && column.column_name !== 'account_name'">
                                <label v-bind:for="column.column_name">{{column.column_comment}}</label>
                                <input v-if="column.input_type === 'text'" class="form-control" v-model="form[column.column_name]" v-bind:maxlength="column.character_maximum_length">
                                <input v-if="column.input_type === 'number'" type="number" class="form-control" v-model="form[column.column_name]">
                                <textarea v-if="column.input_type === 'textarea'" class="form-control" v-model="form[column.column_name]" v-bind:maxlength="column.character_maximum_length"></textarea>
                                <select v-if="column.input_type === 'table'" v-model="form[column.column_name]">
                                    <option v-for="data in column.dataList" v-bind:key="data.lavel" v-bind:value="data.value">
                                        {{ data.lavel }}
                                    </option>
                                </select>
                                <select v-if="column.input_type === 'select'" v-model="form[column.column_name]">
                                    <option v-for="s in column.selectList" v-bind:key="s.label" v-bind:value="s.value">
                                    {{ s.label }}
                                    </option>
                                </select>
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
                            <button class="btn btn-primary my-2" @click="closeModal('regist-modal-'+tableName)">閉じる</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
export default {
    name: 'SimpleList',
    props: ['title', 'tableName', 'accountId'],
    data: function() {
        return {
            columnNum: 0,
            columnList: [],
            modalColumnList: [],
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
            errMsg: '',
            whereColumn: '',
            whereValue: '',
        }
    },
    methods: {
        getModalColumnList() {
            this.modalColumnList.forEach(column => {
                if(column['input_type'] === 'table') {
                    params = new URLSearchParams();
                    params.append('tableName', column['input_value']);
                    params.append('value', column['select_value']);
                    params.append('lavel',column['select_value_lavel']);
                    axios.post('./getSelectList', params)
                        .then(res => {
                            if(res.status !== 200) {
                                console.log(res.data);
                            } else {
                                column.dataList = res.data;
                            }
                        }
                    )
                }else if(column['input_type'] === 'select') {
                    let selectValueList = column['select_value'].split(',');
                    let selectLabelList = column['select_value_lavel'].split(',');
                    column.selectList = [];
                    for(let i=0; i<selectValueList.length; i++) {
                        column.selectList[i] = {
                            value : selectValueList[i], 
                            label : selectLabelList[i]
                        };
                    }
                }
            });
        },
        showModal(modalName) {
            this.createFlg = true;
            this.errMsg = '';
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
            params = new URLSearchParams();
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
                        this.list = res.data;
                    }
                }
            )
        },
        register(type) {
            //Axiosを使ったAJAX
            //vueでバインドされた値はmethodの中ではthisで取得できる
            params = new URLSearchParams();
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
                        this.errMsg = res.data.errMsg;
                    } else {
                        this.errMsg = '';
                        this.search();
                        this.$modal.hide('regist-modal-' + this.tableName);
                        this.resetForm();
                    }
                })
               
        },
        edit(data) {
            this.createFlg = false;
            this.errMsg = '';
            this.editId = data.id;
            this.form = Object.assign({}, data);
            this.$modal.show('regist-modal-' + this.tableName);
        },
        deleteRecord() {
            const ans = confirm('削除してよろしいですか');
            if(!ans) return;
            params = new URLSearchParams();
            params.append('tableName', this.tableName);
            params.append('id', this.form.id);

            axios.post('./deleteById', params)
                .then(res => this.search())
            this.$modal.hide('regist-modal-' + this.tableName);
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
        },
        
    },
    created: function() {
        this.search();
        params = new URLSearchParams();
        params.append('tableName', this.tableName);
        axios.post('./getColumnList', params)
        .then(res => {
            this.columnList = res.data;
            this.columnNum = res.data.length;
            res.data.forEach(element => {
                if(element['column_name'] !== 'account_name') {
                    this.form[element['column_name']] = '';
                }
            })
        });
        params = new URLSearchParams();
        params.append('tableName', this.tableName);
        axios.post('./getModalColumnList', params)
        .then(res => {
            this.modalColumnList = res.data;
            this.getModalColumnList();
        });

    }
}
</script>