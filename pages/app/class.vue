<template>
  <div>
    <app-navbar></app-navbar>
    <section class="section columns">
      <Post class="column is-9 is-offset-1" />
    </section>
  </div>
</template>

<script>
import AppNavbar from "~/components/AppNavbar.vue";
import Post from "~/components/Post";
export default {
  components: { AppNavbar },
  data() {
    return {
      posts: [],
    };
  },
  layout: "app",
  async created() {
    if (this.$route.query.length == 0) this.$router.push("/app/classroom");

    const classId = this.$route.query.id;
    const classInfo = this.$axios.get(`/class/${classId}`);
    // reroute if no class id provided or error
    const posts = this.$axios.get(`/post?class=${classId}`);

    console.log(this.$route.query);
  },
};
</script>
