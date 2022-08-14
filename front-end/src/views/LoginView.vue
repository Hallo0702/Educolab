<template>
  <div style="height:900px;" class="q-mx column justify-center">
    <h3>LOGIN</h3>
    <account-error-list></account-error-list>
    <!-- form 부분 -->
    <q-form
      @submit="login(credentials)"
      class="q-gutter row"
    >
    <!-- 여기에 아이디, 비밀번호 입력 창 -->
      <div class="input col-8 offset-2 col-md-3 offset-md-4">
        <q-input
          color="teal"
          v-model="credentials.username"
          label="ID"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '아이디를 입력해주세요']"
        />

        <q-input
          color="teal"
          v-model="credentials.password"
          label="Password"
          type="password"
          @keyup.enter="login(credentials)"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || '비밀번호를 입력해주세요',
          ]"
        />
      </div>
      <!-- 여기에 로그인버튼 -->
      <q-btn
        color="secondary"
        label="LOGIN"
        class="col-8 offset-2 col-md-1 offset-md-1"
        type="submit"/>
    </q-form>

    <!-- 여기에 회원가입 / ID 찾기 / 비밀번호 찾기 -->
    <button-group :currentUrl="currentUrl"/>
    <router-view></router-view>

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
  </div>
</template>

<style scoped>
  .input {
    width: 500px;
  }
  .buttonGroup {
    margin-top: 100px;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%
  }
</style>

<script>
// import { reactive } from '@vue/reactivity'
import { mapGetters, mapActions, useStore } from 'vuex'
import {onBeforeMount} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import AccountErrorList from '@/components/AccountErrorList.vue'
import ButtonGroup from '@/components/ButtonGroup.vue'

export default {
  name: 'LoginView',
  components: {
    AccountErrorList,
    ButtonGroup
  },
  data () {
    return {
      credentials: {
        username : '',
        password: '',
      },
      currentUrl: 'login',
    }
  },
  computed: {
    ...mapGetters(['authError'])
  },
  methods: {
    ...mapActions(['login'])
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    onBeforeMount(() => {
      if (store.getters.isLoggedIn) {
        console.log(router)
        console.log(route)
        // 메인 페이지로 이동
        // router.push('/signup')
      }
    })
  }
}
</script>