import drf from "@/api/drf.js"
import router from "@/router"
import axios from "axios"

export const accounts = {
  state() {
    return {
      studentInfo: {
        username: null,
        password1: null,
        password2: null,
        name: null,
        school: null, // code
        grade: null,
        class_field: null,
        phone_number: null,
        birthday: "2008-01-01",
        email: null,
        userflag: false,
      },
      teacherInfo: {
        username: null,
        password1: null,
        password2: null,
        name: null,
        school: null, // code
        subject: null,
        phone_number: null,
        birthday: "1972-01-01",
        email: null,
        userflag: true,
      },
      userType: null,
      access: localStorage.getItem("access") || "",
      currentUser: {},
      authError: null,
      subjectOptions : [
        '국어', '수학', '사회', '과학', '보건', '기술가정', '기타'
      ],
      emailOptions: [
        '@gmail.com', '@naver.com', '@hanmail.com', '@nate.com', '직접 입력'
      ],
      userInfo: {
        username: null,
        password1: null,
        password2: null,
        name: null,
        school: null,
        homeroom_teacher_flag: null,
        grade: null,
        class_field: null,
        subject: null,
        phone_number: null,
        birthday: null,
        email: null,
        userflag: null,
        plus_point: null,
        minus_point: null,
        profil: null,
      },
      findPw: {
        name: null,
        email: null,
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.access, 
    currentUser: state => state.currentUser,
    authError: state => state.authError,
    authHeader: state => ({ Authorization: `Bearer ${state.access}` }),
    getUserType: state => state.userType,
    getSubject: state => state.subjectOptions,
    getEmail: state => state.emailOptions,
    getUserInfo: state => state.userInfo,
    getInfo: state => state.findPw,
  },
  mutations: {
    SET_TOKEN: (state, access) => (state.access = access),
    SET_CURRENT_USER: (state, user) => (state.currentUser = user),
    SET_AUTH_ERROR: (state, error) => (state.authError = error),
    CHANGE_DATA(state, data) {
      if (state.userType === "student") {
        for (let key in data) {
          state.studentInfo[key] = data[key]
        }
      } else {
        for (let key in data) {
          state.teacherInfo[key] = data[key]
        }
      }
    },
    SET_USER_TYPE: (state, userType) => (state.userType = userType),
    CHANGE_INFO(state, data) {
      for (let key in data) {
        state.userInfo[key] = data[key]
      }
    },
    CHANGE_PW_INFO(state, data) {
      for (let key in data) {
        state.findPw[key] = data[key]
      }
    }
  },
  actions: {
    saveToken({ commit }, access) {
      commit("SET_TOKEN", access);
      localStorage.setItem("access", access)
    },
    removeToken({ commit }) {
      commit("SET_TOKEN", "");
      localStorage.setItem("access", "")
    },
    login({ commit, dispatch }, credentials) {
      // 로그인 함수 구현
      axios({
        url: drf.accounts.login(),
        method: "post",
        data: credentials,
      })
        .then((res) => {
          const access = res.data.access
          dispatch("saveToken", access)
          console.log(res.data)
          commit("SET_CURRENT_USER",res.data)
          // 새로고침 -> 로그인 정보 날리기
          router.push({ name: "educolab" })
        })
        .catch((err) => {
          commit("SET_AUTH_ERROR", err.response.data)
        });
    },
    signup({state, getters}) {
      let data = null
      if (getters.getUserType == "student") {
        data = state.studentInfo
      } else {
        data = state.teacherInfo
      }
      axios.post(drf.accounts.signup(), data)
        .then(() => {
          window.alert("회원가입이 완료되었습니다")
          // 새로고침 -> vuex에 있는 정보 날려버리기 -> 이동
          router.push({ name: "login" })
        })
        .catch(({response}) => {
          if (response.data?.email) {
            window.alert(response.data.email[0])
          } else {
            window.alert('필수 항목이 빠져 있거나, 올바르지 않습니다')
          }
        })
    },
    logout({ dispatch }) {
      dispatch("removeToken")
      // 새로고침까지 (vuex 데이터 모두 제거하고 싶음)
      router.push({ name: "login" })
      router.go(1)
    },
    setUserType({ commit }, userType) {
      // 로그인할 때
      // 회원가입 페이지
      commit("SET_USER_TYPE", userType)
    },
    changeData({ commit }, data) {
      commit("CHANGE_DATA", data)
    },
    changeInfo({commit}, data) {
      commit("CHANGE_INFO", data)
    },
    changePwInfo({commit}, data) {
      commit("CHANGE_PW_INFO", data)
    }
    // back에 현재 사용자 정보 요청 (토큰 보내면 )
  },
};
