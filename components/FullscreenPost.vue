<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Create new Post</p>
      <button type="button" class="delete" @click="clickClose"></button>
    </header>
    <section class="modal-card-body">
      <b-field label="Post">
        <b-input type="textarea" rows="15" v-model="data"></b-input>
      </b-field>
      <b-field>
        <a
          href="https://www.markdownguide.org/basic-syntax"
          target="_blank"
          rel="noopener noreferrer"
        >Help</a>
      </b-field>
      <b-field>
        <b-button type="is-primary" label="Submit" @click="newPost" />
      </b-field>
    </section>
  </div>
</template>

<script>
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

  methods: {
    clickClose() {
      console.log("HELLO");
      this.$emit("close");
    },
    async newPost(e) {
      // console.log(this.id);
      // const res = await this.$axios.$post("/post", {
      //   class: this.class_id,
      //   postedBy: this.id,
      //   title: this.data,
      // });
      // console.log(res);
      // this.$emit("close");
    },
  },
};
</script>

<style scoped>
</style>
