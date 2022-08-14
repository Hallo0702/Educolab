<template>
  <div>
    <q-input
      color="teal"
      v-model="data.username"
      label="아이디"
      lazy-rules
      :rules="[ val => val && val.length > 0 || '아이디를 입력해주세요']"
    />
    <confirm-auth-number :data="data"/>
  </div>

</template>


<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import ConfirmAuthNumber from '@/components/ConfirmAuthNumber.vue'
export default {
  name: 'SendPwEmail',
  components: {
    ConfirmAuthNumber,
    },
  setup(){
    const route = useRoute()
    const store = useStore()
    let info = computed(() => route.params.info)
    let data = computed(() => store.getters.getInfo)
    return {
      data,
      info
    }
  }
}
</script>