<template>
  <div class="baseStyle">
    <img src="@/assets/공지사항.png" alt="notice" style="height:150px;">
    <div class="row justify-end">
      <q-btn @click="noticeCreate" class="text-size q-mx-lg q-py-sm" 
      color="green-13" label="글 쓰기" />
    </div>

    <div class="q-pa-md">
      <q-markup-table class="notice-full">
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
          <tr v-for="(notice, index) in notice2.slice((page-1)*10, page*10)" :key="index">
            <td class="text-left text-size">{{ index+1+((page-1)*10) }}</td>

            <td v-if="notice.classification === '변경'" class="text-size text-center text-pink-13">{{ notice.classification }}</td>
            <td v-else-if="notice.classification === '공지'" class="text-size text-center text-indigo-13">{{ notice.classification }}</td>
            <td v-else-if="notice.classification === '행사'" class="text-size text-center text-green-13">{{ notice.classification }}</td>

            <td @click="noticeDetail(notice.pk)" class="cursor-pointer text-size">{{ notice.title }}</td>
            <td class="text-center text-size">{{ notice.teacher.name }}</td>
            <td class="text-center text-size">{{ timeInfo(notice.updated_at) }}</td>
            <td class="text-center text-size">{{ notice.views }}</td>
          </tr>
        </tbody>
      </q-markup-table>

      <q-markup-table class="notice-small">
        <thead>
          <tr>
            <th class="text-center text-size">분류</th>
            <th class="text-center text-size">제목</th>
            <!-- <th class="text-center text-size">등록(수정)일</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notice, index) in notice2.slice((page-1)*10, page*10)" :key="index">
            <td v-if="notice.classification === '변경'" class="text-size text-center text-pink-13">{{ notice.classification }}</td>
            <td v-else-if="notice.classification === '공지'" class="text-size text-center text-indigo-13">{{ notice.classification }}</td>
            <td v-else-if="notice.classification === '행사'" class="text-size text-center text-green-13">{{ notice.classification }}</td>

            <td @click="noticeDetail(notice.pk)" class="cursor-pointer text-size">{{ notice.title }}</td>
            <!-- <td class="text-center text-size">{{ timeInfo(notice.updated_at) }}</td> -->
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <div>
      <the-pagi-nation v-if="noticeLenth" :limit="noticeLenth" @change-page="changePage">
      </the-pagi-nation>
    </div>   

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'
import ThePagiNation from '@/components/ThePagination.vue'

export default {
  name: "NoticeView",
  components: {ThePagiNation},
  setup() {
    let page = ref(1)
    const changePage = (value) => {
      page.value = value
    }
    // length: computed(() => Math.ceil(search.list.length/10))
    return {
      page,
      changePage
    }
  },
  computed: {
    ...mapGetters(['notice2', 'noticeLenth'])
  },
  methods: {
    ...mapActions(['noticeList']),
    timeInfo(time) {
      const d = new Date(time)
      return d.getFullYear() + ". " + (d.getMonth()+1) + ". " + d.getDate()
    },
    noticeCreate() {
      this.$router.push({name : 'NoticeCreate'})
    },
    noticeDetail(noticePk) {
      this.$router.push({name: 'NoticeDetail', params:{ noticePk:noticePk }})
    }
  },
  created() {
    this.noticeList()
  }
}

</script>

<style scoped>
  .text-size{font-size: 1.4rem;}
  .searchWrap{border-radius:5px; text-align:center; padding:20px 0; margin-bottom:10px;}
  .tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
  .btn{margin-bottom:40px;}
  .notice-small {
    display: none;
  }

  @media screen and (max-width: 950px) {
    .notice-full {
      display: none;
    }
    .notice-small {
      display: block;
    }
  }
</style>