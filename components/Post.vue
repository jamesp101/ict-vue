<template>
  <div class="card">
    <div class="card-content">
      <div class="media is-clipped" v-if="userType != 1">
        <div class="icons">
          <b-button
            type="is-danger is-light"
            v-if="!isSpecial"
            @click="onClickDelete"
            icon-right="delete"
          ></b-button>
          <b-button
            type="is-primary is-light"
            v-if="!isSpecial"
            @click="onClickEdit"
            icon-right="pencil"
          ></b-button>
          <b-modal trap-focus v-model="isEdit" aria-modal v-on:close="closeEditModal">
            <ModalPost :post_id="id" />
          </b-modal>
        </div>

        <figure class="image is-48x48" v-if="!isSpecial">
          <img class="is-rounded" alt src="/bnhs-logo-128.png" />
        </figure>
        <div class="media-content ml-4">
          <p class="title is-6">{{ teacher }}</p>
          <p class="subtitle is-7">
            <vue-moments-ago v-if="date" prefix="posted" suffix="ago" :date="date" lang="en" />
          </p>
        </div>
      </div>
      <div class="content">
        <div class="markdown-content editor" v-html="desc" v-bind:class="{ maxheight: isSpecial }"></div>
      </div>
      <div class="card-footer">
        <a class="my-4" @click="isOpen = !isOpen">Comments</a>
      </div>

      <b-collapse v-model="isOpen" animation="slide">
        <div class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img class="is-rounded" src="/bnhs-logo-128.png" />
            </p>
          </figure>

          <div class="media-content">
            <div class="field">
              <p class="control">
                <b-input type="textarea" v-model="commentToBePosted" maxlength="10000" rows="2"></b-input>
              </p>
            </div>
            <b-button class="button is-info is-pulled-right" @click="createPost" href>Submit</b-button>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column is-12" v-for="(data, key) in commentData" :key="key">
            <post-comments
              class="is-size-6"
              :commenter="data.lastname + ' ' + data.firstname"
              :comment="data.title"
              :postId="id"
              :userId="data.userId"
              :datePosted="data.commentDate"
              :commentId="data.commentId"
              @onChange="commentChange"
            />
          </div>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import PostComments from "./PostComments.vue";
import VueMomentsAgo from "vue-moments-ago";
import ModalYesNo from "./ModalYesNo.vue";

export default {
  components: { PostComments, VueMomentsAgo, ModalYesNo },
  props: {
    id: String,
    teacher: String,
    date: String,
    content: String,
    subject: String,
    comments: Array,
    desc: String,
    isFull: Boolean,
    isSpecial: Boolean,
  },
  data() {
    return {
      dataId: this.id,
      isOpen: false,
      isDeleteModalActive: false,
      userType: "",
      userId: "",
      postId: "",
      isEdit: false,
      commentData: [],
      commentToBePosted: "",
      isAdmin: this.$auth.user.message.access,
    };
  },
  created() {
    console.log(`post id`, this.id);
    this.userType = this.$auth.user.message.access;
    this.loadComments();
  },
  methods: {
    async createPost() {
      try {
        const user = this.$auth.user.message.id;
        const res = await this.$axios.post(`/post/${this.dataId}/comments`, {
          user: user,
          title: this.commentToBePosted,
        });
        this.loadComments();
        this.$buefy.notification.open({
          type: "is-success",
          message: "Post created",
          hasIcon: true,
        });
      } catch (e) {
        console.log(e);
      }
    },
    async loadComments() {
      this.commentData = [];
      try {
        const res = await this.$axios.$get(`/post/${this.id}/comments`);
        const comments = res[0].comments;
        console.log(`Debug Comments`, comments);
        for (let i of comments) {
          this.commentData.push({
            commentId: i?._id,
            userId: i?.user?._id || "",
            lastname: i?.user?.person?.lastname || "Anonymous",
            firstname: i?.user?.person?.firstname || "",
            title: i?.title || "",
            commentDate: i?.commentDate || "",
          });
        }
      } catch (e) {
        console.error(`Debug Comments`, e);
      }
      console.log("HELLO");
    },
    closeEditModal() {
      this.isEdit = false;
      this.$emit("afterEdit", true);
    },
    onClickDelete() {
      if (!confirm("Are you sure you want to delete this post?")) {
        return;
      }
      this.$axios.delete(`/post/${this.id}`);
      this.$emit("onDelete", true);

      console.log(this.id);
    },
    onClickEdit() {
      this.isEdit = true;
    },
    deleteClose() {
      console.log("Delete");
      this.isDeleteModalActive = false;
    },
    commentChange() {
      this.loadComments();
    },
  },

  computed: {
    hello() {
      return {
        title: "",
      };
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
.markdown-content {
  height: 300px;
  background: #ffffff;
  overflow: auto;
  & h1 h2 h3 h4 h5 h6 {
    font-weight: bold;
    font-size: 1pt;
  }
}
.minheight {
  height: 300px;
}
.maxheight {
  height: 100%;
}
.icons {
  position: absolute;
  right: 1em;
  top: 2rem;
}
</style>
