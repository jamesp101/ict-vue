<template>
  <div class="post-page">
    <div class="has-background-primary has-text-white p-5"> 
    <h1 class="is-size-3">
      <b>{{classInfo.subject}}</b>
    </h1>
    <h1 class="is-size-4">{{classInfo.yearLevel}} - {{classInfo.section}}</h1>
    <h1 class="is-size-5">{{classInfo.lastname}}, {{classInfo.firstname}} {{classInfo.middlename}}</h1>
    <h1 class="is-size-6">{{classInfo.schedule}}</h1>
    </div>
    <template v-if="this.$auth.user.message.access == 4">
      <div class="is-pulled-right mr-6">
        <b-button icon-left="pencil" type="is-primary" @click="isEdit = true" label="Edit"></b-button>
        <b-button icon-left="trash-can" type="is-danger" @click="deleteClass" label></b-button>
      </div>
      <b-modal trap-focus v-model="isEdit" aria-modal v-on:close="loadClassInfo">
        <modal-create-class
          :userId="teacherId"
          isEdit
          :classId="classId"
          :psection="classInfo.section"
          :psubject="classInfo.subject"
          :pschedule="classInfo.schedule"
          :pyear="classInfo.yearLevel"
          v-on:close="loadPosts"
        />
      </b-modal>
    </template>
    <b-tabs v-model="activeTab" type="is-boxed" @input="tabChange">
      <b-tab-item label="Posts">
        <section class="section">
          <div class="columns is-multiline" v-if="!loadingPosts">
            <Post
              class="column is-10 is-offset-1 mb-5"
              v-for="(item, itx) in posts"
              :key="itx"
              :id="item.id"
              :date="item.postedDate"
              :comments="item.comments"
              :desc="item.title"
              :teacher="item.teacher"
              @onDelete="onDeletePost"
              @afterEdit="afterEdit"
            ></Post>
          </div>
          <skeleton-post class="loading-post" v-if="loadingPosts" />
          <div v-if="noPost">No Posts available</div>
        </section>
        <div class="floating-button" v-if="!isAStudent">
          <b-button
            type="is-primary"
            @click="isComponentModalActive = true"
            size="is-large"
            icon-right="plus"
          ></b-button>
        </div>
        <!-- <fullscreen-post/> -->
        <b-modal
          trap-focus
          v-model="isComponentModalActive"
          aria-label="Create new post"
          aria-modal
          v-on:close="loadPosts"
        >
          <!-- <fullscreen-post :class_id="classId" :id="postedBy" /> -->
          <ModalPost :id="userId" :class_id="classId" />
        </b-modal>
      </b-tab-item>
      <b-tab-item label="Students">
        <h1 has-text-1>Students</h1>
        <section class="section">
          <b-table :data="students" :columns="columns" default-sort="lastname" />
        </section>
      </b-tab-item>
    </b-tabs>
    <b-modal
      trap-focus
      v-model="isEditStudents"
      has-modal-card
      aria-modal
      v-on:close="loadStudents"
    >
      <modal-class-students :students="students" />
    </b-modal>
  </div>
</template>

<script>
import AppNavbar from "~/components/AppNavbar.vue";
import ModalClassStudents from "~/components/ModalClassStudents.vue";
import ModalCreateClass from "~/components/ModalCreateClass.vue";
import ModalPost from "~/components/ModalPost.vue";
import Post from "~/components/Post";
import SkeletonPost from "~/components/SkeletonPost.vue";

export default {
  components: {
    AppNavbar,
    Post,
    SkeletonPost,
    ModalPost,
    ModalCreateClass,
    ModalClassStudents,
  },
  data() {
    return {
      isEditStudents: false,
      isEdit: false,
      userId: "",
      classId: "",
      posts: [],
      loadingPosts: true,
      noPost: false,
      isAStudent: true,
      isComponentModalActive: false,
      activeTab: 0,
      students: [],
      columns: [
        { field: "lastname", label: "Last Name" },
        { field: "firstname", label: "First Name" },
        { field: "gender", label: "Gender" },
        { field: "street", label: "Address" },
        { field: "barangay", label: "Barangay" },
        { field: "city", label: "City" },
        { field: "province", label: "Province" },
      ],
      isAdmin: this.$auth.$state.user.message.access,
      classInfo: {},
      teacherId: String,
      // classId: this.$route.query.id,
      // postedBy: this.$auth.$state.message.id,
    };
  },
  layout: "app",
  created() {
    this.loadClassInfo();
  },
  mounted: async function () {
    if (this.$route.query.length == 0) {
      this.$router.push("/app/classroom");
      return;
    }

    this.userId = this.$auth.$state.user.message.id;
    this.classId = await this.$route.query.id;
    this.isAStudent = this.$auth.$state.user.message.access == 1;
    this.loadPosts();
    this.loadStudents();
  },
  methods: {
    async onDeletePost(arg) {
      try {
        this.$buefy.notification.open({
          type: "is-success",
          hasIcon: true,
          position: "is-bottom-right",
          message: "Post is deleted",
        });
        await this.loadPosts();
      } catch {
        this.$buefy.notification.open({
          type: "is-danger",
          hasIcon: true,
          position: "is-bottom-right",
          message: "Something went wrong",
        });
      }
    },
    async loadStudents() {
      const classId = await this.$route.query.id;
      const classinfo = await this.$axios.$get(`/class/${classId}`);
      console.log(classinfo);

      const students = classinfo[0].students;

      students.forEach((st) => {
        this.students.push({
          lastname: st.person.lastname,
          firstname: st.person.firstname,
          birthdate: st.person.birthdate,
          gender: st.person.gender,
          street: st.person.address.street,
          barangay: st.person.address.barangay,
          city: st.person.address.city,
          province: st.person.address.province,
        });
      });
    },
    async loadPosts() {
      this.posts = [];

      const classId = await this.$route.query.id;
      // reroute if no class id provided or error
      const posts = await this.$axios.$get(`/post?class=${classId}`);
      posts.forEach((it) => {
        this.posts.push({
          id: it._id,
          title: it.title,
          comments: it.comments,
          postedDate: it.postedDate,
          teacher: `${it.postedBy.person.firstname} ${it.postedBy.person.lastname}`,
        });
      });

      this.loadingPosts = false;

      if (posts.length == 0) {
        this.noPost = true;
      }
    },
    tabChange() {
      console.log(this.activeTab);
    },

    createPost(e) {
      console.log(this.$parent.close());
    },
    afterEdit(e) {
      this.loadPosts();
    },
    async loadClassInfo() {
      const classId = await this.$route.query.id;
      const classinfo = await this.$axios.$get(`/class/${classId}`);
      this.classInfo = {
        teacherId: classinfo[0].teacher._id,
        lastname: classinfo[0].teacher.person.lastname,
        firstname: classinfo[0].teacher.person.firstname,
        subject: classinfo[0].subject,
        section: classinfo[0].section,
        yearLevel: classinfo[0].yearLevel,
        schedule: classinfo[0].schedule,
      };
      this.teacherId = classinfo[0].teacher._id;
    },
    async deleteClass() {
      if (!confirm("Delete this class")) {
        return;
      }
      const classId = await this.$route.query.id;
      const x = await this.$axios.$delete(`/class/${classId}`);
      console.log("");
      this.$router.push("/app/dashboard");
    },
  },
};
</script>

<style scoped lang="scss">
.floating-button {
  position: fixed;
  bottom: 1em;
  right: 1em;
  button {
    border-radius: 50%;
  }
}
.post-page {
  overflow: auto;
  height: 100vh;
}
</style>
