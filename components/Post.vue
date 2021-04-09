<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <figure class="image is-48x48">
          <img alt src="https://bulma.io/images/placeholders/96x96.png" />
        </figure>
        <div class="media-content ml-4">
          <p class="title is-6">{{teacher}}</p>
          <p class="subtitle is-7">
            <vue-moments-ago prefix="posted" suffix="ago" :date="date" lang="en" />
          </p>
        </div>
      </div>
      <div class="content">
        <div class="markdown-content" v-html="$md.render(desc)"></div>
        <p>Subject</p>
      </div>
      <div class="card-footer">
        <b-button class="my-4" @click="isOpen=!isOpen">Comments</b-button>
      </div>
      <b-collapse v-model="isOpen" animation="slide">
        <b-field label="Comment">
          <b-input maxlength="10000" rows="1" type="textarea" />
        </b-field>
        <b-field>
          <b-button type="is-primary">Send</b-button>
        </b-field>
      </b-collapse>
    </div>
  </div>
</template>


<script>
import samplemd from "~/static/README2.md";
import PostComments from "./PostComments.vue";
import VueMomentsAgo from "vue-moments-ago";

export default {
  components: { PostComments, VueMomentsAgo },
  props: {
    teacher: String,
    date: String,
    content: String,
    subject: String,
    comments: Array,
    desc: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    hello() {
      return this.title;
    },
  },
  mounted() {
    console.log(this.$props);
  },
};
</script>

<style scoped>
.markdown-content {
  max-height: 300px;
  background: #ffffff;
  overflow: auto;
}
</style>
