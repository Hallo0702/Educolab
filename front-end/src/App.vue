<template>
  <div style="height: 2000px">
    <!-- 교사 navbar -->
    <div v-if="isLoggedIn && currentUser.userflag">
      <div class="q-pa-md q-gutter-sm">
        <q-bar style="height:100px;" >
          <a href="/"><img src="@/assets/educolab.png" alt="educolab" style="width:100px; height:100px;"></a>
          <div class="button"><router-link to="/notice" class="button">공지사항</router-link></div>
          <div class="cursor-pointer"><router-link to="/teacher/task" class="button">과제</router-link></div>
          <div class="cursor-pointer"><router-link to="/quiz" class="button">퀴즈</router-link></div>
          <div class="cursor-pointer"><router-link to="/search" class="button">설문조사</router-link></div>
          <div class="cursor-pointer"><router-link to="/teacher" class="button">마이페이지</router-link></div>
          <button @click="logoutBtn">로그아웃</button>
        </q-bar>
        <hr>
      </div>
    </div>

    <!-- 학생 navbar -->
    <div v-if="isLoggedIn && !currentUser.userflag">
      <div class="q-pa-md q-gutter-sm">
        <q-bar style="height:100px;" >
          <a href="/"><img src="@/assets/educolab.png" alt="educolab" style="width:100px; height:100px;"></a>
          <div class="cursor-pointer button"><router-link to="/notice" class="button">공지사항</router-link></div>
          <div class="cursor-pointer button"><router-link to="/student/task" class="button">과제</router-link></div>
          <div class="cursor-pointer button"><router-link to="/student/writing" class="button">내 필기</router-link></div>
          <div class="cursor-pointer button"><router-link to="/student/store" class="button">포인트 상점</router-link></div>
          <div class="cursor-pointer button"><router-link to="/student" class="button">마이페이지</router-link></div>
          <button @click="logoutBtn">로그아웃</button>
        </q-bar>
        <hr>
      </div>
    </div>
  <router-view />
  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import {isEmpty} from 'lodash'


export default {
  name: 'MainPage',
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser'])
  },
  methods: {
    ...mapActions(['logout']),
    logoutBtn() {
      if (this.isLoggedIn) {
        this.logout()
      } else {
        this.$router.back()
      }
    },
  },
  setup() {
    const store = useStore()
    onBeforeMount(() => {
      // 현재 로그인이 되어있는지 확인 (토큰이 있는지 확인) -> 없으면 그대로, 있으면 main
      // 현재 사용자 타입과 로그인한 사용자 타입이 맞는지 확인 -> 맞으면 그래도, 아니면 다른 곳으로 (접근 권한 없다는 페이지? 팝업 후 메인?)
      // 리프레시 토큰
      // 
      if (isEmpty(store.getters.currentUser)) {
        // 요청 보내기
      }
    })
  }
}
</script>

<style>
/* 모든 페이지에서 공통으로 사용할 스타일 정의 */
  h3 {
    text-align: center;
  }
  .button {
    text-decoration: none;
  }
  .buttonGroup {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 10px;
  margin: 100px 0px;
  }
  .center {
    text-align: center;
  }
</style>