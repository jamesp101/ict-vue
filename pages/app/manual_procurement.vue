
<template>
  <Post
    class="column is-12 mb-5"
    :id="postId"
    :desc="postDetails"
    isSpecial
    @afterEdit="afterEdit"
  />
</template>

<script>
import Post from "~/components/Post.vue";
export default {
  components: { Post },
  head: { title: "I. Foreword" },
  layout: "app",
  data() {
    return {
      postId: "607e5574c8b8db0bce1fbda6",
      postDetails: ""

    };
  },
  async created() {
    this.loadPost();
  },

  methods: {
    afterEdit() {},
    async loadPost() {
      const data = await this.$axios.get(`/post/${this.postId}`);
      this.postDetails = data.data[0].title;
    }
  }
};
</script>

<style scoped></style>
