<template>
  <div class="card">
    <div class="card-content">
      <div class="media is-clipped" v-if="userType != 1">
        <div class="icons">
          <a @click="onClickDelete">
            <b-icon icon="delete" type="is-danger"></b-icon>
            <b-modal trap-focus v-model="isDeleteModalActive" aria-modal>
              <modal-yes-no
                label="Delete this Post?"
                title="Confirm Delete"
                yesType="is-danger"
                noType="is-success"
                @clickClose="deleteClose"
              />
            </b-modal>
          </a>
          <a @click="onClickEdit">
            <b-icon icon="pencil" type></b-icon>
          </a>
        </div>

        <figure class="image is-48x48">
          <img class="is-rounded" alt src="https://bulma.io/images/placeholders/96x96.png" />
        </figure>
        <div class="media-content ml-4">
          <p class="title is-6">{{teacher}}</p>
          <p class="subtitle is-7">
            <vue-moments-ago prefix="posted" suffix="ago" :date="date" lang="en" />
          </p>
        </div>
      </div>
      <div class="content">
        <div class="markdown-content editor" v-html="desc"></div>
      </div>
      <div class="card-footer">
        <a class="my-4" @click="isOpen=!isOpen">Comments</a>
      </div>

      <b-collapse v-model="isOpen" animation="slide">
        <div class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
            </p>
          </figure>

          <div class="media-content">
            <div class="field">
              <p class="control">
                <b-input type="textarea" maxlength="10000" rows="2"></b-input>
              </p>
            </div>
            <a class="button is-info is-pulled-right" href>Submit</a>
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>


<script>
import PostComments from "./PostComments.vue";
import VueMomentsAgo from "vue-moments-ago";
import { ModalProgrammatic as Modal } from "buefy";
import ModalYesNo from "./ModalYesNo.vue";

export default {
  components: { PostComments, VueMomentsAgo, ModalYesNo },
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
      isDeleteModalActive: false,
      userType: this.$auth.user.access,
      userId: this.$auth.user.id,
    };
  },
  methods: {
    onClickDelete() {
      this.isDeleteModalActive = true;
    },
    onClickEdit() {},
    deleteClose() {
      console.log("Delete");
      this.isDeleteModalActive = false;
    },
  },

  computed: {
    hello() {
      return {
        title: "",
      };
    },
  },
  mounted() {
    console.log(this.$auth.user);
  },
};
</script>

<style scoped lang="scss">
.markdown-content {
  max-height: 300px;
  background: #ffffff;
  overflow: auto;
  & h1 h2 h3 h4 h5 h6 {
    font-weight: bold;
    font-size: 1pt;
  }
}
.icons {
  position: absolute;
  right: 1em;
  top: 2rem;
}
</style>
