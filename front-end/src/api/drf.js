// const BASE_URL = 'https://i7c102.p.ssafy.io/api'
const BASE_URL = 'http://localhost:8000'
const ACCOUNTS = BASE_URL + '/accounts/'
const NOTICE = BASE_URL + '/notice/'
const HOMEWORK = BASE_URL + '/homework/'

export default {
  accounts: {
    login: () => ACCOUNTS + 'login/',
    logout: () => ACCOUNTS + 'logout/',
    signup: () => ACCOUNTS + 'registration/',
    schoolInfo: () => ACCOUNTS + 'schoolinfo/',
    checkUsername: () => ACCOUNTS + 'check_username/',
    findUsername: () => ACCOUNTS + 'find_username/',
    sendEmail: () => ACCOUNTS + 'send_signup_email/',
    sendPwEmail: () => ACCOUNTS + 'send_pw_email/',
    changePw: () => ACCOUNTS + 'change_pw/',
    // changeInfo: () => ACCOUNTS + 
  },
  notice: {
    noticeList: () => NOTICE + 'main/',
    noticeDetail: () => NOTICE + 'detail/',
    noticeCreate: () => NOTICE + 'create/',
    noticeUpdate: () => NOTICE + 'update/'
  },
  task: {
    list: () => HOMEWORK + 'main/',
    create: () => HOMEWORK + 'create/',
    detail: () => HOMEWORK + 'detail/',
    check: () => HOMEWORK + 'check/',
    submit: () => HOMEWORK + 'submit/',
  },
  file: {
    path: () => BASE_URL,
  }
}