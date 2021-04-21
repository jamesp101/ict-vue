
<script>
import Post from "~/components/Post.vue";
export default {
  components: { Post },
  layout: "app",
  data() {
    return {
      postId: "607ff69e07014d00047a7a6a",
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
