<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Create new Post</p>
      <button type="button" class="delete" @click="clickClose"></button>
    </header>
    <section class="modal-card-body">
      <markdown-editor @textChange="textChange" />
      <b-field class="is-pulled-right mt-4" type="is-large">
        <b-button type="is-primary" label="Submit" @click="newPost" />
        <b-button type="is-primary" label="Demo" @click="demo" />
      </b-field>
    </section>
  </div>
</template>

<script>
import MarkdownEditor from "./MarkdownEditor.vue";
export default {
  props: {
    id: String,
    class_id: String,
  },
  data() {
    return {
      data: "",
    };
  },
  components: { MarkdownEditor },
  mounted() {},
  beforeDestroy() {},

  methods: {
    textChange(data) {
      this.data = data;
    },
    demo() {
      console.log(this.data);
    },
    clickClose() {
      this.$parent.close();
    },
    async newPost(e) {
      console.log("HEE", this.data);
      const res = await this.$axios.$post("/post", {
        class: this.class_id,
        postedBy: this.id,
        title: this.data,
      });
      this.$parent.close();
    },
  },
};
</script>

<style scoped>
.modal-card {
  width: 100%;
}
.markdown-content {
  background: #fff;
  overflow: auto;
}
</style>
