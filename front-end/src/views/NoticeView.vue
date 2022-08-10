<template>
  <div class="baseStyle">
    <img src="@/assets/공지사항.png" alt="notice" style="height:150px;">
    <div class="row justify-end">
      <q-btn @click="noticeCreate" class="text-size q-mx-lg q-py-sm" 
      color="green-13" label="글 쓰기" />
    </div>
    <!-- <router-link to="/notice/create"><button>글쓰기</button></router-link> -->
    <div class="q-pa-md">
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left text-size">번호</th>
            <th class="text-center text-size">분류</th>
            <th class="text-center text-size">제목</th>
            <th class="text-center text-size">작성자</th>
            <th class="text-center text-size">등록(수정)일</th>
            <th class="text-center text-size">조회수</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notice in notice2" :key="notice.id">
            <td class="text-left text-size">{{ notice.pk }}</td>
            <td class="text-center text-size">{{ notice.classification }}</td>
            <td class="cursor-pointer text-size" @click="noticeDetail(notice.pk)">{{ notice.title }}</td>
            <td class="text-center text-size">{{ notice.teacher.name }}</td>
            <td class="text-center text-size">{{ timeInfo(notice.updated_at) }}</td>
            <td class="text-center text-size">{{ notice.views }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import NoticeItem from '@/components/NoticeItem.vue'

export default {
  name: "NoticeView",
  data() {
    return {
      // content: noticeList.Content,
      // searchTitle: '',
      // searchNoticeList : [],
    }
  },
  // components: {
  //   NoticeItem
  // },
  computed: {
    ...mapGetters(['notice2', 'noticeItem'])
  },
  methods: {
    ...mapActions(['noticeList', 'noticeDetail']),
    timeInfo(time) {
      const d = new Date(time)
      return d.getFullYear() + ". " + (d.getMonth()+1) + ". " + d.getDate()
    },

    noticeCreate() {
      this.$router.push({name : 'NoticeCreate'})
    },
    noticeDetail(noticePk) {
      this.$router.push({name: 'NoticeDetail', params:{noticePk:noticePk}})
    }
  },
  mounted() {
    this.noticeList()
  }
}

</script>

<style scoped>
  .text-size{font-size: 1.2rem;}
  .searchWrap{border-radius:5px; text-align:center; padding:20px 0; margin-bottom:10px;}
  .tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
  .btn{margin-bottom:40px;}
</style>