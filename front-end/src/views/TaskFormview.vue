<template>
  <main class="baseStyle">
    <h4>과제 {{type}}</h4>
    <q-form
      @reset="onReset">
      <div class="row">
        <span class="q-py-md q-mr-lg text-size" style="width:70px; text-align:center">제목</span>
        <q-input class="text-size" outlined v-model="task.title" label="title" style="width: 700px;" required/>
      </div>
      <hr>
      <div class="row">
        <span class="q-py-md q-mr-lg text-size" style="width:70px; text-align:center">내용</span>
        <div style="width:700px">
          <q-editor
            class="text-size"
            style="min-height:500px; max-height:100%;"
            v-model="task.content"
            label="content"
            :definitions="{
              bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
            }"
            required/>
        </div>
      </div>
      <hr>
      <!-- 교사에게만 보임 -->
      <div v-if="isTeacher">
        <div class="row">
          <span class="q-py-md q-mr-lg text-size" style="width:70px; text-align:center">과목 </span>
          <q-select
            class="text-size"
            style="width: 300px;"
            outlined
            v-model="task.subject" label="과목" :options="subjectOptions" required/>
        </div>
        <hr>
        <div class="row">
          <span class="q-py-md q-mr-lg text-size" style="width:70px; text-align:center">학년</span>
          <q-input
            outlined
            style="width: 300px;"
            type="number"
            :min="1"
            :max="3"
            v-model="task.grade"
            required
          />
          <span class="q-py-md q-mr-lg text-size" style="width:70px; text-align:center">반</span>
          <q-input
            outlined
            style="width: 300px;"
            type="number"
            :min="1"
            :max="10"
            v-model="task.class_field"
            required
          />
        </div>
        <hr>
      </div>
      <div class="row">
        <span class="q-py-md q-ml-sm q-mr-lg text-size" style="width: 70px; text-align:center">제출기한</span>
        <q-input
          outlined
          stack-label
          type="date"
          v-model="task.deadline"
        />
      </div>
      <hr>
      <div class="row items-center">
        <span class="q-py-md q-ml-sm q-mr-lg text-size" style="width: 70px; text-align:center">첨부파일</span>
        <q-file outlined label="첨부 파일" v-model="task.files" style="width: 700px;" multiple/>
      </div>
      <hr>
      <div class="row justify-center q-mt-xl q-gutter-md">
        <q-btn label="초기화" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn :label="type" color="primary" @click="onSubmit(false)"  class="text-size q-px-xl q-py-md" />
        <q-btn v-if="!isTeacher" label="제출" color="primary" @click="onSubmit(true)"  class="text-size q-px-xl q-py-md"/>
        <router-link class="button" :to="{name:'TaskListView', params: {userType,}}">
          <q-btn label="목록" color="primary"  class="text-size q-px-xl q-py-md" />
        </router-link>
      </div>
    </q-form>
  </main>
</template>

<script>
import { reactive, computed, onBeforeMount} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from 'vuex'
export default {
  name: 'TaskFormView',
  setup () {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    let {userType, taskPk} = route.params
    onBeforeMount(() => {
      if (!store.getters.isLoggedIn) {
      router.push('/educolab/login')
    } else if (taskPk) {
        store.dispatch('initTask')
        store.dispatch('taskDetail', {pk: taskPk, teacher_flag: userType === 'teacher'? 1:0})
    }
    })
    const subjectOptions = store.getters.getSubject
    let isTeacher = computed(() => userType === 'teacher')
    let type = computed(() => taskPk? '수정':'등록')
    const storeTask = computed(() => store.getters.getTask)
    const computedTask = reactive({
      subject: computed(() => storeTask.value.homework?.subject),
      title: computed(() => storeTask.value.homework?.title || storeTask.value.title),
      content: computed(() => storeTask.value.homework?.content || storeTask.value.content),
      grade: computed(() => storeTask.value.homework?.grade),
      class_field: computed(() => storeTask.value.homework?.class_field),
      files: computed(() => storeTask.value.homework?.files || storeTask.value['student_file']),
      deadline: computed(() => storeTask.value.homework?.deadline || storeTask.value.deadline),
    })
    const task = reactive({
      teacher_flag: isTeacher.value? 1:0,
      subject: taskPk? computedTask.subject: '',
      title: taskPk? computedTask.title: '',
      content: taskPk? computedTask.content : '',
      grade: taskPk? computedTask.grade : '',
      class_field: taskPk? computedTask.class_field : '',
      files: taskPk? computedTask.files : '',
      deadline: taskPk? computedTask.deadline : '',
    })
    const onSubmit = (arg) => {
      let form = new FormData()
      for (let key in task) {
        if (key === 'files' && task[key]) {
          for (let i=0; i < task.files.length; i++) {
            form.append(key, task[key][i])
          }
        } else {
          form.append(key, task[key])
        }
      }
      if (arg) {
        form.append('submit_pk', storeTask.value['my_submit'][0].id)
        store.dispatch('submitTask', form)
      } else if (taskPk) {
        form.append('pk', taskPk)
        store.dispatch('taskUpdate', form)
        console.log('update')
      } else {
        store.dispatch('createTask', form)
        console.log('create')
      }
    }
    const onReset = (event) => {
      event.preventDefault()
      if (taskPk) {
        for (let key in task) {
          if (key === 'teacher') {
              task[key] = store.getters.currentUser.username
            } else if (key === 'subject') {
              task[key] = store.getters.currentUser.subject
            } else {
            task[key] = storeTask.value[key]
          }
        }
      } else {
        for (let key in task) {
          task[key] = ''
        }
      }
    }
    return {
      task,
      storeTask,
      userType,
      taskPk,
      type,
      isTeacher,
      onSubmit,
      onReset,
      subjectOptions,
      computedTask
    }
  }
}
</script>

<style scoped>
  p {
    margin: 0;
  }
  .text-size {
    font-size: 1rem;
  }
</style>
