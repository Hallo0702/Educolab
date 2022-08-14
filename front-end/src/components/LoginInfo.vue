<template>
  <section>
    <article class="row justify-between" v-if="!changeMode">
      <q-input
        color="teal"
        label="아이디"
        v-model="userData.username"
        lazy-rules
        class="col-9"
        maxlength="20"
        :rules="[ val => val && val.length > 0 || '아이디를 입력해주세요',
        val => val && val.length > 4 ||'아이디는 최소 5자리 이상이어야 합니다'
        ]"
      />
      <q-btn label="중복 확인" color="teal" @click="confirmUsername" class="col-2" />
      <message-pop-up
        v-if="computedData.confirm"
        :message="computedData.message"
        @reverse="userData.confirm = false"
      />
    </article>
    <q-input
      color="teal"
      label="비밀번호"
      type="password"
      v-model="userData.password1"
      maxlength="20"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || '비밀번호를 입력해주세요',
        val => val.length > 5 ||'비밀번호는 최소 6자리 이상이어야 합니다'
      ]"
    />
    <q-input
      color="teal"
      label="비밀번호 확인"
      type="password"
      v-model="userData.password2"
      @keyup="isCorrect"
      minlength="5"
      maxlength="20"
      lazy-rules
      :rules="[
        val => val !== null && val !== '' || '비밀번호를 다시 입력해주세요',
      ]"
    />
    <!-- 비밀번호 일치 여부 확인 -->
    <p v-if="userData.password2">
      <span v-show="computedData.samePassword">비밀번호가 일치합니다</span>
      <span v-show="!computedData.samePassword">비밀번호가 일치하지 않습니다</span>
    </p>
    <article v-if="changeMode">
      <q-btn label="비밀번호 변경" color="amber" @click="changePw"/>
      <message-pop-up
        v-if="password.popUpFlag"
        :message="password.message"
        path="/"
        :reload="true"
      />
    </article>
  </section>
</template>

<script>
import {reactive} from '@vue/reactivity'
import {computed} from 'vue'
import axios from 'axios'
import drf from '@/api/drf.js'
import {useStore} from 'vuex'
import MessagePopUp from './MessagePopUp.vue'
export default {
  name: 'LoginInfo',
  props: {
    changeMode: Boolean,
  },
  components: {
    MessagePopUp
  },
  setup (props) {
    const store = useStore()
    const userData = reactive({
      username: null,
      password1: null,
      password2: null,
      correct: null,
      confirm: null,
      valid: null,
    })
    const computedData = reactive({
      samePassword: computed(() => userData.correct),
      validUsername: computed(() => userData.valid),
      confirm: computed(() => userData.confirm),
      message: computed(() => computedData.validUsername? '사용 가능한 아이디입니다':'중복된 아이디입니다. 다른 아이디를 입력해주세요')
    })
    const password = reactive({
      message: null,
      success: false,
      prompt: false,
      popUpFlag:computed(() => password?.prompt),
      samePassword: computed(() => password.one === password.two)
    })
    const confirmUsername = () => {
      // 아이디 중복 여부 확인
      if (userData.username && userData.username.length > 4) {
        axios({
          url: drf.accounts.checkUsername(),
          method: 'get',
          params : {username: userData.username}
        })
          .then((res) => {
            userData.confirm = true
            userData.valid = res.data.dup === 'success'
            if (computedData.validUsername) {
              store.dispatch('changeData', {username: userData.username})
            }
          })
      }
    }
    const isCorrect = () => {
      if (userData.password1 === userData.password2) {
        userData.correct = true
        if (userData.password1.length > 5) {
          if (!props?.changeMode) {
            store.dispatch('changeData', {password1: userData.password1, password2: userData.password2})
          }
        }
      } else {
        userData.correct = false
      }
    }
    const changePw = () => {
      axios({
        url: drf.accounts.changePw(),
        method: 'post',
        data: {
          ...store.getters.getInfo,
          password1: userData.password1,
          password2: userData.password2
          }
      })
      .then(({data}) => {
        console.log(data)
        password.message = data.message
      })
      .catch(({response}) => {
        password.message = response.data.message
      })
      .finally(() => {
        password.prompt = true
      })
    }
    return {
      userData,
      computedData,
      confirmUsername,
      isCorrect,
      password,
      changePw,
    }
  }
}
</script>