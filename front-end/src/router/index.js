// import { AppFullscreen } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  
  // 메인페이지 
  {
    path: '/educolab',
    name: 'educolab',
    component: () => import('@/views/MainPageView')
  },
  // 아이디 & 비밀번호 찾기
  {
    path: '/find/:info',
    name: 'findInfo',
    component: () => import('@/views/FindView')
  },
  // 비밀번호 & 회원정보 변경
  {
    path: '/change/:userData',
    name: 'changeInfo',
    component: () => import('@/views/FindView')
  },
  // 회원정보 조회
  {
    path: '/myinfo',
    name: 'ReadMyInfo',
    component: () => import('@/views/FindView')
  },
  // 회원가입
  {
    path: '/signup/:userType',
    name: 'signup',
    component: () => import ('@/views/SignupView')
  },
  // 회원가입 동의 페이지
  {
    path: '/signup',
    name: 'agree',
    component: () => import ('@/views/SignupAgreeView')
  },
  // 공지사항
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/NoticeView')
  },
  {
    path: '/notice/create',
    name: 'NoticeForm',
    component: () => import('@/views/NoticeFormView')
  },

  // 과제(교사)
  {
    path: '/teacher/task',
    name: 'TeacherTask',
    component: () => import('@/views/TeacherTaskView')
  },

  // 퀴즈(교사)
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('@/views/QuizView')
  },

  // 설문조사(교사)
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/SearchView')
  },

  // 마이페이지(교사)
  {
    path: '/teacher',
    name: 'TeacherPage',
    component: () => import('@/views/TeacherPageView')
  },

  // 과제(학생)
  {
    path: '/student/task',
    name: 'StudentTaskListView',
    component: () => import('@/views/StudentTaskListView')
  },

  // 내 필기(학생)
  {
    path: '/student/writing',
    name: 'StudentWritingView.vue',
    component: () => import('@/views/StudentWritingView')
  },

  // 포인트 상점(학생)
  {
    path: '/student/store',
    name: 'StudentStoreView.vue',
    component: () => import('@/views/StudentStoreView')
  },
  
  // 마이 페이지(학생)
  {
    path: '/student',
    name: 'StudentPageView',
    component: () => import('@/views/StudentPageView')
  },
  // 회원 관리
  {
    path: '/',
    name: 'login',
    component: () => import ('@/views/LoginView')
  },
  // 404 에러
  {
    path: '/404',
    name: 'notFound',
    component: () => import ('@/views/NotFoundView')
  },
  // 존재하지 않는 페이지
  {
    path: '/:anything',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
