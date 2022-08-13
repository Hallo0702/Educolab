import drf from "@/api/drf.js"
import router from "@/router"
// import router from "@/router"
import axios from "axios"

export const quiz = {
  state() {
    return {
      quiz: {},
      quizDetail : {},
      quizData: [{}, {}],
      online:{
        username:'',
        socket:null,
        RoomNumber:0,
        quizPK:0,
        ans_list:[],
        cnt_flag:true,
        ans_good_num:0,
        ranking_list:[],
        quizDetail_len:0,
      }
    }
  },

  getters: {
    quiz : state => state.quiz,
    quizDetail : state => state.quizDetail,
    quizData : state => state.quizData,
    socket: state=>state.online.socket,
    ans_list: state=>state.online.ans_list,
    RoomNumber: state=>state.online.RoomNumber,
    ans_good_num: state=>state.online.ans_good_num,
    quizDetail_len: state=>state.online.quizDetail_len,
    username: state=>state.online.username,
    ranking_list:state=>state.online.ranking_list,
  },

  mutations: {
    SURVEY_LIST : (state, quiz) => state.quiz = quiz,
    QUIZ_DETAIL : (state, quizDetail) => state.quizDetail = quizDetail,
    QUIZ_DETAIL_LEN : (state, quizDetail) => state.online.quizDetail_len = quizDetail.length,
    QUIZ_DATA : (state, data) => state.quizData[data.question_number-1] = data,
    SOCKET_COUNT_FLAG : (state,flag)=>{
      state.online_cnt_flag=flag
    },
    ANS_GOOD_NUM:(state,data)=>state.online.ans_good_num=data,
    RANKING_LIST:(state,data)=>state.online.ranking_list=data,
    SOCKET_ON : (state, data) =>{
      console.log("Starting connection to WebSocket Server")
      state.online.socket=new WebSocket(data.url)
      state.online.RoomNumber=data.RoomNumber
      state.online.quizPK=data.quizPK
      state.online.username=data.username
      state.online.ans_list=[]
      
      state.online.socket.addEventListener("message", (event) => {
        state.online.result = JSON.parse(event.data)//['message'] //test용
        console.log(state.online.result)
        // console.log(state.online.result.split('/'))
        if (state.online.cnt_flag===true && state.online.result['message']==="등록 성공"){
            state.online.ans_list.unshift(state.online.result['nickname'])
        }
      })
      state.online.socket.onclose = function(event) {
          console.log(event)
          console.error('Chat socket closed unexpectedly')
      }
      state.online.socket.addEventListener("open", (event) => {
        console.log(event)
        console.log("Successfully connected to the echo websocket server...")
        state.online.socket.send(JSON.stringify({
          message: '방 입장',
          id:state.online.username, //수정해야함
          room_num: state.online.RoomNumber,
          quiz_num: state.online.quizPK
        }));
      })
    },
    SOCKET_SEND :(state, data)=>{
      // console.log(data)
      state.online.socket.send(JSON.stringify(data));
    },
    SOCKET_CLOSE :(state)=>{
      state.online.socket.close()
    }
  },

  actions: {
    // 퀴즈 조회
    quizList( { getters, commit }) {
      axios({
        url: drf.quiz.quizList(),
        method: 'get',
        headers: getters.authHeader,
      })
        .then(res => {
          commit('SURVEY_LIST', res.data)
        })
    },

    // 퀴즈 상세
    getQuizDetail({ getters, commit }, quizPk) {
      axios({
        url: drf.quiz.quizDetail(),
        method: 'get',
        headers: getters.authHeader,
        params: {
          quiz_num : quizPk
        }
      })
        .then(res => {
          console.log(res.data)
          for (var i=1; i < res.data.length; i++) {
            const bogi = res.data[i].multiple_bogi.split('/')
            res.data[i].multiple_bogi = bogi
          }
          commit('QUIZ_DETAIL', res.data)
          commit('QUIZ_DETAIL_LEN', res.data)
        })
    },

    // 퀴즈 번호, 보기, 답 가져오기 
    onQuiz( { commit }, data) {
      console.log(data)
      commit('QUIZ_DATA', data)
    },

    createQuiz( { getters }, credentials) {
      credentials.question = getters.quizData
      console.log(credentials)
      axios({
        url: drf.quiz.quizCreate(),
        method: 'post',
        headers: getters.authHeader,
        data : credentials
      })
        .then(router.push({ name: 'Quiz'}))
    },

    deleteQuiz({ getters }, quizPk) {
      axios({
        url: drf.quiz.quizDetail(),
        method: 'delete',
        headers: getters.authHeader,
        params: {
          quiz_num : quizPk
        }
      })
        .then(alert('퀴즈가 삭제되었습니다.')),
        router.push({ name: 'Quiz'})
        .catch(err => {
          console.log(err)
        })
    },

    updateQuiz({ getters }, {credentials, quizPk}) {
      axios({
        url: drf.quiz.quizDetail(),
        method: 'put',
        headers: getters.authHeader,
        data : credentials,
        params: {
          quiz_num : quizPk
        }
      })
        .then(res => {
          console.log(res)
        })
    },
    ////////////////////////////////
    ansgoodQuiz({getters,commit}, data) {
      console.log(data)
      axios({
        url: drf.quiz.quizScore(),
        method: 'get',
        headers: getters.authHeader,
        params: {
          quiz_question_id : data.probPk,
          room_num: data.room_num
        }
      })
        .then(res=>{
          commit('ANS_GOOD_NUM', res.data.ans_cnt)
        })
    },
    rankQuiz({getters,commit},roomNum) {
      axios({
        url: drf.quiz.quizRank(),
        method: 'get',
        headers: getters.authHeader,
        params: {
          room_num: roomNum
        }
      })
        .then(res=>{
          // console.log(res.data)
          commit('RANKING_LIST', res.data.ranks) //임시
        })
    },
    ///////////////////////////
  }
}