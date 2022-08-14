<template>
  <div>
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
          <a href="/">
                  <router-link class="text-subtitle2 button color5 navBarLi" to="/student">마이페이지</router-link>
          </a>
              </div>
            </div>
            <q-icon @click="activeNav" class="cursor-pointer" name="mdi-menu" />
          </div>
        </div>
    </div>

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
    /* font-family: "jooa"; */
    min-width: 450px;
    height:1200px;
  }
  .testStyle {
    width: 80%;
    margin: auto;
    font-family: "jooa";
    min-width: 450px;
    height:1200px;
  }
  .surveyStyle {
    width: 80%;
    margin: auto;
    min-width: 450px;
    height:1200px;
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
