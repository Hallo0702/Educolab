<template>
  <div style="height:1200px">
      <!-- 교사 navbar -->
      <div v-if="isLoggedIn && currentUser.userflag" class="jooa-font">
        <div class="navBar q-px-xl q-py-md bord-bt">
          <a href="/educolab"><img src="@/assets/educolab.png" alt="educolab" style="width:4rem; height:4rem;"></a>
          <div class="navBarUi nav-size">
            <router-link class="q-ml-xl button color5 navBarLi" to="/notice">공지사항</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/teacher/task">과제</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/quiz">퀴즈</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/survey">설문조사</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/teacher">마이페이지</router-link>
            <button @click="logoutBtn" class="q-ml-xl">로그아웃</button>
          </div>
          
          <div class="navBar_tool">
            <div v-if="onNavList">
              <div @click="activeNav" class="column items-center q-px-md bg-grey-13">
                <router-link class="text-subtitle2 button color5 navBarLi" to="/notice" flat>공지사항</router-link>
                <router-link class="text-subtitle2 button color5 navBarLi" to="/student/task" flat>과제</router-link>
                <router-link class="text-subtitle2 button color5 navBarLi" to="/student/point" flat>포인트 상점</router-link>
                <router-link class="text-subtitle2 button color5 navBarLi" to="/student">마이페이지</router-link>
              </div>
            </div>
            <q-icon @click="activeNav" class="cursor-pointer" name="mdi-menu" />
          </div>
        </div>
      </div>
  
      <!-- 학생 navbar -->
      <div class="jooa-font" v-if="isLoggedIn && !currentUser.userflag">
        <div class="navBar q-px-xl q-py-md bord-bt">
          <a href="/educolab"><img src="@/assets/educolab.png" alt="educolab" style="width:4rem; height:4rem;"></a>
          <div class="navBarUi nav-size">
            <router-link class="q-ml-xl button color5 navBarLi" to="/notice" flat>공지사항</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/student/task" flat>과제</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/student/point" flat>포인트 상점</router-link>
            <router-link class="q-ml-xl button color5 navBarLi" to="/student">마이페이지</router-link>
            <button @click="logoutBtn" class="q-ml-xl">로그아웃</button>
          </div>
 
          <div class="navBar_tool">
            <div v-if="onNavList">
              <div @click="activeNav" class="column items-center q-px-md bg-grey-13">
                <router-link class="text-subtitle2 button color5 navBarLi" to="/notice" flat>공지사항</router-link>
                <router-link class="text-subtitle2 button color5 navBarLi" to="/student/task" flat>과제</router-link>
                <router-link class="text-subtitle2 button color5 navBarLi" to="/student/point" flat>포인트 상점</router-link>
                <router-link class="text-subtitle2 button color5 navBarLi" to="/student">마이페이지</router-link>
              </div>
            </div>
            <q-icon @click="activeNav" class="cursor-pointer" name="mdi-menu" />
          </div>
        </div>
      </div>

      <!-- <footer class="bord-top bg-blue-grey-12 q-py-sm">
        <div class="row justify-start items-center">
          <img class="q-mx-xl" src="@/assets/footerlogo.png" alt="educolab" style="width:5rem; height:5rem;">
          <div class="ftr-size">
            <span class="text-bold">"교육과 서비스의 조화" edu colab!!</span><hr>
            <span>edu colab는 학습 역량 증진 / 교육 연계 보조 / 수업의 질 향상을 목표로 합니다.</span>
            <p>교사에게는 편리한, 학생에게는 학습욕구를 팽창시켜드립니다!!</p>
          </div>
        </div>
    </footer> -->
    
  <router-view />
  </div>
</template>

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

  .navBar {
    display: flex;
    flex-direction: row;
  }
  
  .navBarUi {
    display: flex;
    align-items: center;
  }

  /* 컴포넌트 기본 css */
  .baseStyle {
    width: 80%;
    margin: auto;
    font-family: "jooa";
    min-width: 450px;
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
    bottom: -1000px;
    width: 100%
  }
  .navBarLi:hover {
    border-bottom: 2px solid #8BFF8B;
  }
  .navBar_tool {
    position: absolute;
    right: 32px;
    font-size: 2rem;
    color: #FF9966;
    display : none;
  }

  @media screen and (max-width: 840px) {
    .navBar {
      display: flex;
      flex-direction: column;
    }
    .navBarUi {
      display: flex;
      flex-direction: column;
      display: none;
    }
    .navBar_tool {
      display: flex;
    }
  }
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainPage',
  data() {
    return {
      isHovering : true,
      onNavList : false,
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    flag() {
      const flag = this.currentUser.userflag
      return flag
    },
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
    },
    activeNav() {
      if(this.onNavList == true) {
        this.onNavList = false
      } else {
        this.onNavList = true
      }
    }
  },
  created() {
    if (this.isLoggedIn === false) {
      this.$router.push({name:'login'})
    }
  }
}
</script>
