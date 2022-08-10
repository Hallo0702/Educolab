<template>
  <div style="height:1500px">

      <!-- 교사 navbar -->
      <div v-if="isLoggedIn && currentUser.userflag">
        <div class="bord-bt">
          <div class="q-py-md q-px-xl row items-center jooa-font nav-size">
            <a href="/educolab"><img class="q-mx-lg" src="@/assets/educolab.png" alt="educolab" style="width:4rem; height:4rem;"></a>
            <router-link class="q-px-xl button color5" to="/notice">공지사항</router-link>
            <router-link class="q-px-xl button color5" to="/teacher/task">과제</router-link>
            <router-link class="q-px-xl button color5" to="/quiz">퀴즈</router-link>
            <router-link class="q-px-xl button color5" to="/survey">설문조사</router-link>
            <router-link class="q-px-xl button color5" to="/teacher">마이페이지</router-link>
            <button class="q-px-lg" @click="logoutBtn">로그아웃</button>
          </div>
        </div>
      </div>
  
      <!-- 학생 navbar -->
      <div v-if="isLoggedIn && !currentUser.userflag">
        <div class="bord-bt">
          <div class="q-py-md q-px-xl row items-center jooa-font nav-size">
            <a href="/educolab"><img class="q-mx-lg" src="@/assets/educolab.png" alt="educolab" style="width:4rem; height:4rem;"></a>
            <router-link class="q-px-xl button color5" to="/notice">공지사항</router-link>
            <router-link class="q-px-xl button color5" to="/student/task">과제</router-link>
            <router-link class="q-px-xl button color5" to="/student/point">포인트 상점</router-link>
            <router-link class="q-px-xl button color5" to="/student">마이페이지</router-link>
            <button class="q-px-lg" @click="logoutBtn">로그아웃</button>
          </div>
        </div>
      </div>

      <footer class="bord-top bg-blue-grey-12 q-py-sm">
        <div class="row justify-start items-center">
          <img class="q-mx-xl" src="@/assets/footerlogo.png" alt="educolab" style="width:5rem; height:5rem;">
          <div class="ftr-size">
            <span class="text-bold">"교육과 서비스의 조화" edu colab!!</span><hr>
            <span>edu colab는 학습 역량 증진 / 교육 연계 보조 / 수업의 질 향상을 목표로 합니다.</span>
            <p>교사에게는 편리한, 학생에게는 학습욕구를 팽창시켜드립니다!!</p>
          </div>
        </div>
    </footer>

  <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  data() {
    return {
      isHovering : true
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    flag() {
      const flag = this.currentUser.userflag
      return flag
    }
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
    selectedHovering() {
      this.isHovering = true
    },
    unselectedHovering() {
      this.isHovering = false
    }
  },
  created() {
    if (this.isLoggedIn === false) {
      this.$router.push({name:'login'})
    }
  }
}
</script>

<style>
/* 모든 페이지에서 공통으로 사용할 스타일 정의 */

 /* 폰트 적용 */
  @font-face {
    font-family: "jooa";
    src: url("@/assets/fonts/BMJUA_ttf.ttf");
  }

  .jooa-font {
    font-family: "jooa"
  }

  /* 컴포넌트 기본 css */
  .baseStyle {
    width: 80%;
    margin: auto;
    font-family: "jooa";
  }

  .nav-size {font-size: 1.3rem}

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
  .bord-bt {
    border-bottom: 1px solid #99DFF9;
  }
  .bord-top {
    border-top: 1px solid #99DFF9;
  }
  .color1 {color: #FF9966;}
  .color2 {color: #8BFF8B;}
  .color3 {color: #FFC000;}
  .color4 {color: #99DFF9;}
  .color5 {color: black;}

  .ftr-size {
    font-size: 0.9rem;
  } 
  footer {
    position: absolute;
    bottom: -700px;
    width: 100%
  }

</style>