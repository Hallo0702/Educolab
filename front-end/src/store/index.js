import { createStore } from 'vuex'
import { accounts } from './modules/accounts.js'
import { notice } from './modules/notice.js'
<<<<<<< HEAD
import { task } from './modules/task.js'
=======
import { survey } from './modules/survey.js'
import { quiz } from './modules/quiz.js'
>>>>>>> 43e34fd66ffc80f02b32e7d26e85587966336999

export default createStore({
  state () {
    return {
      // 서버 기본 주소
      URL: ''
    }
  },
  getters() {
  },
  mutations() {
  },
  actions() {
  },
  modules: {
<<<<<<< HEAD
    accounts,
    notice,
    task,
=======
    accounts, notice, survey, quiz
>>>>>>> 43e34fd66ffc80f02b32e7d26e85587966336999
  }
})
