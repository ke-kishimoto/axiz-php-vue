import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Test from '../components/Test.vue'
import Teacher from '../components/Teacher.vue'
import CsvList from '../components/CsvList.vue'
import SimpleList from '../components/SimpleList.vue'
import Calendar from '../components/Calendar.vue'

Vue.use(Router)

export default new Router({
    // デフォルトの挙動では URL に `#` が含まれる.
    // URL から hash を取り除くには `mode:history` を指定する
    mode: 'history',                  
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'login',
        component: Login
      },
      {
        path: '/test',
        name: 'test',
        component: Test 
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: Teacher
      },
      {
        path: '/csvlist/qa',
        name: 'qa',
        component: CsvList,
        props:{title: 'QA', tableName: 'QA', accountId: 1}
      }
    ]
  })
  