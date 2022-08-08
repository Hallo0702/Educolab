<<<<<<< HEAD
const BASE_URL = "https://i7c102.p.ssafy.io/api/";
=======
const BASE_URL = "http://3.36.69.192:8000/";
>>>>>>> embed_notice
const ACCOUNTS = BASE_URL + "accounts/";
const NOTICE = BASE_URL + "notice/";

export default {
  accounts: {
    login: () => ACCOUNTS + "login/",
    logout: () => ACCOUNTS + "logout/",
    signup: () => ACCOUNTS + "registration/",
    schoolInfo: () => ACCOUNTS + "schoolinfo/",
    checkUsername: () => ACCOUNTS + "check_username/",
    findUsername: () => ACCOUNTS + "find_username/",
    sendEmail: () => ACCOUNTS + "send_signup_email/",
    sendPwEmail: () => ACCOUNTS + "send_pw_email/",
    changePw: () => ACCOUNTS + "change_pw/",
  },
  notice: {
    noticeList: () => NOTICE + "main/",
    noticeDetail: () => NOTICE + "detail/",
    noticeCreate: () => NOTICE + "create/",
    noticeUpdate: () => NOTICE + "update/",
  },
};
