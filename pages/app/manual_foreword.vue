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
  layout: "app",
  data() {
    return {
      postId: "607ff40707014d00047a7a64",
      postDetails: "",
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
    },
  },
};
</script>

<style scoped>
</style>
