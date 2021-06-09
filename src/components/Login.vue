<template>
    <div class="login">
        <h1>
            研修サイトログイン
        </h1>
        <span id="errmsg"></span>
        <p>
            ID<br>
            <input type="text" id="id" name="id" v-model="id">
        </p>
        <p>
            パスワード<br>
            <input type="password" id="password" name="password" v-model="password">
        </p>
        <p>
            <select id="userType" name="userType">
                <option value="student">生徒</option>
                <option value="teacher">講師</option>
                <option value="admin">管理者</option>
            </select>
        </p>
        <p>
            <button id="btn-login" class="btn btn-primary" type="btn" @click="login">ログイン</button>
        </p>
    </div>
</template>

<script>
export default {
    name:'login',
    data: function() {
        return {
            id: '',
            password: '',
        }
    },
    methods: {
        login() {
            let params = new URLSearchParams();
            params.append('id', this.id);
            params.append('password', this.password);
            fetch('http://localhost:8888/axiz-php/login2', {
                method: 'POST',
                body: params,
            })
            .then(res => {
                res.json()
                .then(json => {
                    console.log(json);
                    console.log(json.login);
                    if (json['login'] === 'OK') {
                        console.log('ログイン成功');
                        // this.$router.push({name:'test'});
                        this.$router.push({name:'teacher'});
                    } else {
                        console.log('ログインエラー');
                    }
                 })
            })
            .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped>

</style>