<template>
  <div>
    <app-navbar></app-navbar>
    <b-tabs v-model="activeTab" type="is-boxed" @input="tabChange">
      <b-tab-item label="Posts">
        <section class="section">
          <div class="columns is-multiline" v-if="!loadingPosts">
            <Post
              class="column is-6 is-offset-1 mb-5"
              v-for="(item, itx) in posts"
              :key="itx"
              :date="item.postedDate"
              :comments="item.comments"
              :desc="item.title"
              :teacher="item.teacher"
            ></Post>
          </div>
          <skeleton-post class="loading-post" v-if="loadingPosts" />
          <div v-if="noPost">No Posts available</div>
        </section>
        <div class="floating-button">
          <b-button
            type="is-primary"
            @click="isComponentModalActive = true"
            size="is-large"
            icon-right="plus"
          ></b-button>
        </div>
        <!-- <fullscreen-post/> -->
        <b-modal
          v-model="isComponentModalActive"
          trap-focus
          aria-label="Create new Post"
          aria-modal
          v-on:close="loadPosts"
        >
          <!-- <fullscreen-post :class_id="classId" :id="postedBy" /> -->
        </b-modal>
      </b-tab-item>
      <b-tab-item label="Students">
        <h1 has-text-1>Students</h1>
        <section class="section">
          <b-table :data="students" :columns="columns" default-sort="lastname" />
        </section>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import AppNavbar from "~/components/AppNavbar.vue";
import FullscreenPost from "~/components/FullscreenPost.vue";
import Post from "~/components/Post";
import SkeletonPost from "~/components/SkeletonPost.vue";

export default {
  components: { AppNavbar, Post, SkeletonPost, FullscreenPost },
  data() {
    return {
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
      // classId: this.$route.query.id,
      // postedBy: this.$auth.$state.message.id,
    };
  },
  layout: "app",
  mounted: async function () {
    console.log();
    this.loadPosts();
    this.loadStudents();
  },
  methods: {
    async loadStudents() {
      const classId = await this.$route.query.id;
      const classinfo = await this.$axios.$get(`/class/${classId}`);

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
      if (this.$route.query.length == 0) this.$router.push("/app/classroom");

      const classId = await this.$route.query.id;
      const classInfo = await this.$axios.$get(`/class?_id=${classId}`);
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
</style>
